//! Reverb effect
//!
//! Simple algorithmic reverb based on Freeverb algorithm.
//! Uses comb filters and allpass filters for realistic room simulation.

use crate::{clamp, Effect, EffectError};
use audiaw_types::{Sample, SampleRate};

/// Comb filter for reverb
#[derive(Debug, Clone)]
struct CombFilter {
    buffer: Vec<f32>,
    index: usize,
    feedback: f32,
    damping: f32,
    filter_state: f32,
}

impl CombFilter {
    fn new(size: usize) -> Self {
        Self {
            buffer: vec![0.0; size],
            index: 0,
            feedback: 0.5,
            damping: 0.5,
            filter_state: 0.0,
        }
    }
    
    fn set_feedback(&mut self, feedback: f32) {
        self.feedback = feedback;
    }
    
    fn set_damping(&mut self, damping: f32) {
        self.damping = damping;
    }
    
    #[inline]
    fn process(&mut self, input: f32) -> f32 {
        let output = self.buffer[self.index];
        
        // One-pole lowpass filter for damping
        self.filter_state = output * (1.0 - self.damping) + self.filter_state * self.damping;
        
        self.buffer[self.index] = input + self.filter_state * self.feedback;
        self.index = (self.index + 1) % self.buffer.len();
        
        output
    }
    
    fn reset(&mut self) {
        self.buffer.fill(0.0);
        self.index = 0;
        self.filter_state = 0.0;
    }
}

/// Allpass filter for reverb
#[derive(Debug, Clone)]
struct AllpassFilter {
    buffer: Vec<f32>,
    index: usize,
}

impl AllpassFilter {
    fn new(size: usize) -> Self {
        Self {
            buffer: vec![0.0; size],
            index: 0,
        }
    }
    
    #[inline]
    fn process(&mut self, input: f32) -> f32 {
        let buffered = self.buffer[self.index];
        let output = -input + buffered;
        
        self.buffer[self.index] = input + buffered * 0.5;
        self.index = (self.index + 1) % self.buffer.len();
        
        output
    }
    
    fn reset(&mut self) {
        self.buffer.fill(0.0);
        self.index = 0;
    }
}

/// Reverb effect using Freeverb algorithm
#[derive(Debug, Clone)]
pub struct ReverbEffect {
    /// Sample rate
    _sample_rate: SampleRate,
    
    // Left channel filters
    comb_l: [CombFilter; 8],
    allpass_l: [AllpassFilter; 4],
    
    // Right channel filters
    comb_r: [CombFilter; 8],
    allpass_r: [AllpassFilter; 4],
    
    /// Room size (0.0-1.0)
    room_size: f32,
    /// Damping (0.0-1.0)
    damping: f32,
    /// Wet level (0.0-1.0)
    wet_level: f32,
    /// Dry level (0.0-1.0)
    dry_level: f32,
    
    /// Bypass state
    bypassed: bool,
}

impl ReverbEffect {
    // Freeverb tuning constants (scaled for 44.1kHz)
    const COMB_TUNING: [usize; 8] = [1116, 1188, 1277, 1356, 1422, 1491, 1557, 1617];
    const ALLPASS_TUNING: [usize; 4] = [556, 441, 341, 225];
    const STEREO_SPREAD: usize = 23;
    
    /// Create a new reverb effect
    pub fn new(
        sample_rate: SampleRate,
        room_size: f32,
        damping: f32,
        wet_level: f32,
        dry_level: f32,
    ) -> Self {
        let scale = sample_rate as f32 / 44100.0;
        
        // Create comb filters for left channel
        let comb_l = [
            CombFilter::new((Self::COMB_TUNING[0] as f32 * scale) as usize),
            CombFilter::new((Self::COMB_TUNING[1] as f32 * scale) as usize),
            CombFilter::new((Self::COMB_TUNING[2] as f32 * scale) as usize),
            CombFilter::new((Self::COMB_TUNING[3] as f32 * scale) as usize),
            CombFilter::new((Self::COMB_TUNING[4] as f32 * scale) as usize),
            CombFilter::new((Self::COMB_TUNING[5] as f32 * scale) as usize),
            CombFilter::new((Self::COMB_TUNING[6] as f32 * scale) as usize),
            CombFilter::new((Self::COMB_TUNING[7] as f32 * scale) as usize),
        ];
        
        // Create comb filters for right channel (slightly detuned for stereo)
        let comb_r = [
            CombFilter::new(((Self::COMB_TUNING[0] + Self::STEREO_SPREAD) as f32 * scale) as usize),
            CombFilter::new(((Self::COMB_TUNING[1] + Self::STEREO_SPREAD) as f32 * scale) as usize),
            CombFilter::new(((Self::COMB_TUNING[2] + Self::STEREO_SPREAD) as f32 * scale) as usize),
            CombFilter::new(((Self::COMB_TUNING[3] + Self::STEREO_SPREAD) as f32 * scale) as usize),
            CombFilter::new(((Self::COMB_TUNING[4] + Self::STEREO_SPREAD) as f32 * scale) as usize),
            CombFilter::new(((Self::COMB_TUNING[5] + Self::STEREO_SPREAD) as f32 * scale) as usize),
            CombFilter::new(((Self::COMB_TUNING[6] + Self::STEREO_SPREAD) as f32 * scale) as usize),
            CombFilter::new(((Self::COMB_TUNING[7] + Self::STEREO_SPREAD) as f32 * scale) as usize),
        ];
        
        // Create allpass filters for left channel
        let allpass_l = [
            AllpassFilter::new((Self::ALLPASS_TUNING[0] as f32 * scale) as usize),
            AllpassFilter::new((Self::ALLPASS_TUNING[1] as f32 * scale) as usize),
            AllpassFilter::new((Self::ALLPASS_TUNING[2] as f32 * scale) as usize),
            AllpassFilter::new((Self::ALLPASS_TUNING[3] as f32 * scale) as usize),
        ];
        
        // Create allpass filters for right channel (slightly detuned)
        let allpass_r = [
            AllpassFilter::new(((Self::ALLPASS_TUNING[0] + Self::STEREO_SPREAD) as f32 * scale) as usize),
            AllpassFilter::new(((Self::ALLPASS_TUNING[1] + Self::STEREO_SPREAD) as f32 * scale) as usize),
            AllpassFilter::new(((Self::ALLPASS_TUNING[2] + Self::STEREO_SPREAD) as f32 * scale) as usize),
            AllpassFilter::new(((Self::ALLPASS_TUNING[3] + Self::STEREO_SPREAD) as f32 * scale) as usize),
        ];
        
        let mut effect = Self {
            _sample_rate: sample_rate,
            comb_l,
            allpass_l,
            comb_r,
            allpass_r,
            room_size: clamp(room_size, 0.0, 1.0),
            damping: clamp(damping, 0.0, 1.0),
            wet_level: clamp(wet_level, 0.0, 1.0),
            dry_level: clamp(dry_level, 0.0, 1.0),
            bypassed: false,
        };
        
        effect.update_parameters();
        effect
    }
    
    /// Update filter parameters based on room size and damping
    fn update_parameters(&mut self) {
        let feedback = 0.28 + self.room_size * 0.7;
        
        for comb in &mut self.comb_l {
            comb.set_feedback(feedback);
            comb.set_damping(self.damping);
        }
        
        for comb in &mut self.comb_r {
            comb.set_feedback(feedback);
            comb.set_damping(self.damping);
        }
    }
    
    /// Process a single sample through the reverb
    #[inline]
    fn process_sample(&mut self, input_l: f32, input_r: f32) -> (f32, f32) {
        // Mix input to mono for reverb processing
        let input = (input_l + input_r) * 0.5;
        
        // Process through comb filters (parallel)
        let mut output_l = 0.0;
        let mut output_r = 0.0;
        
        for i in 0..8 {
            output_l += self.comb_l[i].process(input);
            output_r += self.comb_r[i].process(input);
        }
        
        // Process through allpass filters (series)
        for i in 0..4 {
            output_l = self.allpass_l[i].process(output_l);
            output_r = self.allpass_r[i].process(output_r);
        }
        
        // Mix wet and dry signals
        let out_l = input_l * self.dry_level + output_l * self.wet_level;
        let out_r = input_r * self.dry_level + output_r * self.wet_level;
        
        (out_l, out_r)
    }
}

impl Effect for ReverbEffect {
    fn process(&mut self, left: &mut [Sample], right: &mut [Sample]) {
        if self.bypassed {
            return;
        }
        
        let len = left.len().min(right.len());
        
        for i in 0..len {
            let (out_l, out_r) = self.process_sample(left[i], right[i]);
            left[i] = out_l;
            right[i] = out_r;
        }
    }
    
    fn reset(&mut self) {
        for comb in &mut self.comb_l {
            comb.reset();
        }
        for comb in &mut self.comb_r {
            comb.reset();
        }
        for allpass in &mut self.allpass_l {
            allpass.reset();
        }
        for allpass in &mut self.allpass_r {
            allpass.reset();
        }
    }
    
    fn name(&self) -> &str {
        "Reverb"
    }
    
    fn is_bypassed(&self) -> bool {
        self.bypassed
    }
    
    fn set_bypass(&mut self, bypass: bool) {
        self.bypassed = bypass;
    }
    
    fn set_parameter(&mut self, name: &str, value: f32) -> Result<(), EffectError> {
        match name {
            "room_size" => {
                if value < 0.0 || value > 1.0 {
                    return Err(EffectError::InvalidValue(name.to_string(), value));
                }
                self.room_size = value;
                self.update_parameters();
                Ok(())
            }
            "damping" => {
                if value < 0.0 || value > 1.0 {
                    return Err(EffectError::InvalidValue(name.to_string(), value));
                }
                self.damping = value;
                self.update_parameters();
                Ok(())
            }
            "wet_level" => {
                if value < 0.0 || value > 1.0 {
                    return Err(EffectError::InvalidValue(name.to_string(), value));
                }
                self.wet_level = value;
                Ok(())
            }
            "dry_level" => {
                if value < 0.0 || value > 1.0 {
                    return Err(EffectError::InvalidValue(name.to_string(), value));
                }
                self.dry_level = value;
                Ok(())
            }
            _ => Err(EffectError::ParameterNotFound(name.to_string())),
        }
    }
    
    fn get_parameter(&self, name: &str) -> Result<f32, EffectError> {
        match name {
            "room_size" => Ok(self.room_size),
            "damping" => Ok(self.damping),
            "wet_level" => Ok(self.wet_level),
            "dry_level" => Ok(self.dry_level),
            _ => Err(EffectError::ParameterNotFound(name.to_string())),
        }
    }
    
    fn parameter_names(&self) -> Vec<String> {
        vec![
            "room_size".to_string(),
            "damping".to_string(),
            "wet_level".to_string(),
            "dry_level".to_string(),
        ]
    }
    
    fn clone_box(&self) -> Box<dyn Effect> {
        Box::new(self.clone())
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_reverb_effect_creation() {
        let effect = ReverbEffect::new(48000, 0.5, 0.5, 0.3, 0.7);
        assert_eq!(effect.name(), "Reverb");
        assert!(!effect.is_bypassed());
    }

    #[test]
    fn test_reverb_parameter_setting() {
        let mut effect = ReverbEffect::new(48000, 0.5, 0.5, 0.3, 0.7);
        
        assert!(effect.set_parameter("room_size", 0.8).is_ok());
        assert_eq!(effect.get_parameter("room_size").unwrap(), 0.8);
        
        assert!(effect.set_parameter("wet_level", 0.5).is_ok());
        assert_eq!(effect.get_parameter("wet_level").unwrap(), 0.5);
    }

    #[test]
    fn test_reverb_processing() {
        let mut effect = ReverbEffect::new(48000, 0.5, 0.5, 0.5, 0.5);
        let mut left = vec![0.5; 1000];
        let mut right = vec![0.5; 1000];
        
        effect.process(&mut left, &mut right);
        
        // After processing, samples should be modified by reverb
        // The output should be different from input
        assert_ne!(left[500], 0.5);
    }
}

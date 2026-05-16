//! 3-band parametric EQ effect
//!
//! Uses biquad filters for low, mid, and high frequency bands.

use crate::{clamp, db_to_gain, Effect, EffectError};
use audiaw_types::{Sample, SampleRate};
use std::f32::consts::PI;

/// Biquad filter for EQ bands
#[derive(Debug, Clone)]
struct BiquadFilter {
    // Filter coefficients
    b0: f32,
    b1: f32,
    b2: f32,
    a1: f32,
    a2: f32,
    
    // State variables (for left channel)
    x1_l: f32,
    x2_l: f32,
    y1_l: f32,
    y2_l: f32,
    
    // State variables (for right channel)
    x1_r: f32,
    x2_r: f32,
    y1_r: f32,
    y2_r: f32,
}

impl BiquadFilter {
    fn new() -> Self {
        Self {
            b0: 1.0,
            b1: 0.0,
            b2: 0.0,
            a1: 0.0,
            a2: 0.0,
            x1_l: 0.0,
            x2_l: 0.0,
            y1_l: 0.0,
            y2_l: 0.0,
            x1_r: 0.0,
            x2_r: 0.0,
            y1_r: 0.0,
            y2_r: 0.0,
        }
    }
    
    /// Configure as a peaking EQ filter
    fn set_peaking(&mut self, sample_rate: SampleRate, freq: f32, gain_db: f32, q: f32) {
        let a = db_to_gain(gain_db / 2.0);
        let omega = 2.0 * PI * freq / sample_rate as f32;
        let sin_omega = omega.sin();
        let cos_omega = omega.cos();
        let alpha = sin_omega / (2.0 * q);
        
        let a0 = 1.0 + alpha / a;
        self.b0 = (1.0 + alpha * a) / a0;
        self.b1 = (-2.0 * cos_omega) / a0;
        self.b2 = (1.0 - alpha * a) / a0;
        self.a1 = (-2.0 * cos_omega) / a0;
        self.a2 = (1.0 - alpha / a) / a0;
    }
    
    /// Process a single sample (left channel)
    #[inline]
    fn process_left(&mut self, input: f32) -> f32 {
        let output = self.b0 * input + self.b1 * self.x1_l + self.b2 * self.x2_l
            - self.a1 * self.y1_l - self.a2 * self.y2_l;
        
        self.x2_l = self.x1_l;
        self.x1_l = input;
        self.y2_l = self.y1_l;
        self.y1_l = output;
        
        output
    }
    
    /// Process a single sample (right channel)
    #[inline]
    fn process_right(&mut self, input: f32) -> f32 {
        let output = self.b0 * input + self.b1 * self.x1_r + self.b2 * self.x2_r
            - self.a1 * self.y1_r - self.a2 * self.y2_r;
        
        self.x2_r = self.x1_r;
        self.x1_r = input;
        self.y2_r = self.y1_r;
        self.y1_r = output;
        
        output
    }
    
    /// Reset filter state
    fn reset(&mut self) {
        self.x1_l = 0.0;
        self.x2_l = 0.0;
        self.y1_l = 0.0;
        self.y2_l = 0.0;
        self.x1_r = 0.0;
        self.x2_r = 0.0;
        self.y1_r = 0.0;
        self.y2_r = 0.0;
    }
}

/// 3-band parametric EQ effect
#[derive(Debug, Clone)]
pub struct EqEffect {
    /// Sample rate
    sample_rate: SampleRate,
    
    /// Low band filter
    low_filter: BiquadFilter,
    /// Low frequency (20-500 Hz)
    low_freq: f32,
    /// Low gain (-12 to +12 dB)
    low_gain: f32,
    
    /// Mid band filter
    mid_filter: BiquadFilter,
    /// Mid frequency (500-5000 Hz)
    mid_freq: f32,
    /// Mid gain (-12 to +12 dB)
    mid_gain: f32,
    
    /// High band filter
    high_filter: BiquadFilter,
    /// High frequency (5000-20000 Hz)
    high_freq: f32,
    /// High gain (-12 to +12 dB)
    high_gain: f32,
    
    /// Bypass state
    bypassed: bool,
}

impl EqEffect {
    /// Create a new EQ effect
    pub fn new(
        sample_rate: SampleRate,
        low_freq: f32,
        low_gain: f32,
        mid_freq: f32,
        mid_gain: f32,
        high_freq: f32,
        high_gain: f32,
    ) -> Self {
        let mut effect = Self {
            sample_rate,
            low_filter: BiquadFilter::new(),
            low_freq: clamp(low_freq, 20.0, 500.0),
            low_gain: clamp(low_gain, -12.0, 12.0),
            mid_filter: BiquadFilter::new(),
            mid_freq: clamp(mid_freq, 500.0, 5000.0),
            mid_gain: clamp(mid_gain, -12.0, 12.0),
            high_filter: BiquadFilter::new(),
            high_freq: clamp(high_freq, 5000.0, 20000.0),
            high_gain: clamp(high_gain, -12.0, 12.0),
            bypassed: false,
        };
        
        effect.update_filters();
        effect
    }
    
    /// Update all filter coefficients
    fn update_filters(&mut self) {
        const Q: f32 = 1.0; // Q factor for peaking filters
        
        self.low_filter.set_peaking(self.sample_rate, self.low_freq, self.low_gain, Q);
        self.mid_filter.set_peaking(self.sample_rate, self.mid_freq, self.mid_gain, Q);
        self.high_filter.set_peaking(self.sample_rate, self.high_freq, self.high_gain, Q);
    }
    
    /// Set low band parameters
    pub fn set_low_band(&mut self, freq: f32, gain: f32) {
        self.low_freq = clamp(freq, 20.0, 500.0);
        self.low_gain = clamp(gain, -12.0, 12.0);
        self.update_filters();
    }
    
    /// Set mid band parameters
    pub fn set_mid_band(&mut self, freq: f32, gain: f32) {
        self.mid_freq = clamp(freq, 500.0, 5000.0);
        self.mid_gain = clamp(gain, -12.0, 12.0);
        self.update_filters();
    }
    
    /// Set high band parameters
    pub fn set_high_band(&mut self, freq: f32, gain: f32) {
        self.high_freq = clamp(freq, 5000.0, 20000.0);
        self.high_gain = clamp(gain, -12.0, 12.0);
        self.update_filters();
    }
}

impl Effect for EqEffect {
    fn process(&mut self, left: &mut [Sample], right: &mut [Sample]) {
        if self.bypassed {
            return;
        }
        
        let len = left.len().min(right.len());
        
        for i in 0..len {
            // Process through all three bands in series
            let mut l = left[i];
            let mut r = right[i];
            
            // Low band
            l = self.low_filter.process_left(l);
            r = self.low_filter.process_right(r);
            
            // Mid band
            l = self.mid_filter.process_left(l);
            r = self.mid_filter.process_right(r);
            
            // High band
            l = self.high_filter.process_left(l);
            r = self.high_filter.process_right(r);
            
            left[i] = l;
            right[i] = r;
        }
    }
    
    fn reset(&mut self) {
        self.low_filter.reset();
        self.mid_filter.reset();
        self.high_filter.reset();
    }
    
    fn name(&self) -> &str {
        "EQ"
    }
    
    fn is_bypassed(&self) -> bool {
        self.bypassed
    }
    
    fn set_bypass(&mut self, bypass: bool) {
        self.bypassed = bypass;
    }
    
    fn set_parameter(&mut self, name: &str, value: f32) -> Result<(), EffectError> {
        match name {
            "low_freq" => {
                if value < 20.0 || value > 500.0 {
                    return Err(EffectError::InvalidValue(name.to_string(), value));
                }
                self.low_freq = value;
                self.update_filters();
                Ok(())
            }
            "low_gain" => {
                if value < -12.0 || value > 12.0 {
                    return Err(EffectError::InvalidValue(name.to_string(), value));
                }
                self.low_gain = value;
                self.update_filters();
                Ok(())
            }
            "mid_freq" => {
                if value < 500.0 || value > 5000.0 {
                    return Err(EffectError::InvalidValue(name.to_string(), value));
                }
                self.mid_freq = value;
                self.update_filters();
                Ok(())
            }
            "mid_gain" => {
                if value < -12.0 || value > 12.0 {
                    return Err(EffectError::InvalidValue(name.to_string(), value));
                }
                self.mid_gain = value;
                self.update_filters();
                Ok(())
            }
            "high_freq" => {
                if value < 5000.0 || value > 20000.0 {
                    return Err(EffectError::InvalidValue(name.to_string(), value));
                }
                self.high_freq = value;
                self.update_filters();
                Ok(())
            }
            "high_gain" => {
                if value < -12.0 || value > 12.0 {
                    return Err(EffectError::InvalidValue(name.to_string(), value));
                }
                self.high_gain = value;
                self.update_filters();
                Ok(())
            }
            _ => Err(EffectError::ParameterNotFound(name.to_string())),
        }
    }
    
    fn get_parameter(&self, name: &str) -> Result<f32, EffectError> {
        match name {
            "low_freq" => Ok(self.low_freq),
            "low_gain" => Ok(self.low_gain),
            "mid_freq" => Ok(self.mid_freq),
            "mid_gain" => Ok(self.mid_gain),
            "high_freq" => Ok(self.high_freq),
            "high_gain" => Ok(self.high_gain),
            _ => Err(EffectError::ParameterNotFound(name.to_string())),
        }
    }
    
    fn parameter_names(&self) -> Vec<String> {
        vec![
            "low_freq".to_string(),
            "low_gain".to_string(),
            "mid_freq".to_string(),
            "mid_gain".to_string(),
            "high_freq".to_string(),
            "high_gain".to_string(),
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
    fn test_eq_effect_creation() {
        let effect = EqEffect::new(48000, 100.0, 0.0, 1000.0, 0.0, 10000.0, 0.0);
        assert_eq!(effect.name(), "EQ");
        assert!(!effect.is_bypassed());
    }

    #[test]
    fn test_eq_parameter_setting() {
        let mut effect = EqEffect::new(48000, 100.0, 0.0, 1000.0, 0.0, 10000.0, 0.0);
        
        assert!(effect.set_parameter("low_gain", 6.0).is_ok());
        assert_eq!(effect.get_parameter("low_gain").unwrap(), 6.0);
        
        assert!(effect.set_parameter("mid_freq", 2000.0).is_ok());
        assert_eq!(effect.get_parameter("mid_freq").unwrap(), 2000.0);
    }

    #[test]
    fn test_eq_processing() {
        let mut effect = EqEffect::new(48000, 100.0, 6.0, 1000.0, 0.0, 10000.0, 0.0);
        let mut left = vec![0.1; 100];
        let mut right = vec![0.1; 100];
        
        effect.process(&mut left, &mut right);
        
        // After processing, samples should be modified by the filter
        // We can't predict exact values, but they should be different
        assert_ne!(left[50], 0.1);
    }
}

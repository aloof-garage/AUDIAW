//! Gain/Volume effect
//!
//! Simple gain adjustment with dB control and parameter smoothing.

use crate::{clamp, db_to_gain, Effect, EffectError};
use audiaw_types::Sample;

/// Gain effect for volume adjustment
#[derive(Debug, Clone)]
pub struct GainEffect {
    /// Gain in dB (-60 to +12)
    gain_db: f32,
    /// Current linear gain (smoothed)
    current_gain: f32,
    /// Target linear gain
    target_gain: f32,
    /// Bypass state
    bypassed: bool,
    /// Smoothing coefficient (for parameter changes)
    smoothing: f32,
}

impl GainEffect {
    /// Create a new gain effect
    ///
    /// # Arguments
    /// * `gain_db` - Initial gain in dB (-60 to +12)
    pub fn new(gain_db: f32) -> Self {
        let clamped_db = clamp(gain_db, -60.0, 12.0);
        let gain = db_to_gain(clamped_db);
        
        Self {
            gain_db: clamped_db,
            current_gain: gain,
            target_gain: gain,
            bypassed: false,
            smoothing: 0.999, // Smooth over ~1000 samples at 48kHz
        }
    }
    
    /// Set gain in dB
    pub fn set_gain_db(&mut self, gain_db: f32) {
        self.gain_db = clamp(gain_db, -60.0, 12.0);
        self.target_gain = db_to_gain(self.gain_db);
    }
    
    /// Get current gain in dB
    pub fn gain_db(&self) -> f32 {
        self.gain_db
    }
}

impl Effect for GainEffect {
    fn process(&mut self, left: &mut [Sample], right: &mut [Sample]) {
        if self.bypassed {
            return;
        }
        
        let len = left.len().min(right.len());
        
        for i in 0..len {
            // Smooth gain changes to avoid clicks
            self.current_gain = self.current_gain * self.smoothing 
                + self.target_gain * (1.0 - self.smoothing);
            
            // Apply gain
            left[i] *= self.current_gain;
            right[i] *= self.current_gain;
        }
    }
    
    fn reset(&mut self) {
        // Reset smoothing
        self.current_gain = self.target_gain;
    }
    
    fn name(&self) -> &str {
        "Gain"
    }
    
    fn is_bypassed(&self) -> bool {
        self.bypassed
    }
    
    fn set_bypass(&mut self, bypass: bool) {
        self.bypassed = bypass;
    }
    
    fn set_parameter(&mut self, name: &str, value: f32) -> Result<(), EffectError> {
        match name {
            "gain_db" => {
                if value < -60.0 || value > 12.0 {
                    return Err(EffectError::InvalidValue(name.to_string(), value));
                }
                self.set_gain_db(value);
                Ok(())
            }
            _ => Err(EffectError::ParameterNotFound(name.to_string())),
        }
    }
    
    fn get_parameter(&self, name: &str) -> Result<f32, EffectError> {
        match name {
            "gain_db" => Ok(self.gain_db),
            _ => Err(EffectError::ParameterNotFound(name.to_string())),
        }
    }
    
    fn parameter_names(&self) -> Vec<String> {
        vec!["gain_db".to_string()]
    }
    
    fn clone_box(&self) -> Box<dyn Effect> {
        Box::new(self.clone())
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_gain_effect_creation() {
        let effect = GainEffect::new(0.0);
        assert_eq!(effect.gain_db(), 0.0);
        assert!(!effect.is_bypassed());
    }

    #[test]
    fn test_gain_effect_processing() {
        let mut effect = GainEffect::new(6.0); // +6dB = 2x gain
        let mut left = vec![0.5; 100];
        let mut right = vec![0.5; 100];
        
        effect.process(&mut left, &mut right);
        
        // After processing, samples should be amplified (approaching 2x)
        // Due to smoothing, it won't be exactly 1.0 immediately
        assert!(left[99] > 0.5);
        assert!(right[99] > 0.5);
    }

    #[test]
    fn test_gain_effect_bypass() {
        let mut effect = GainEffect::new(6.0);
        effect.set_bypass(true);
        
        let mut left = vec![0.5; 100];
        let mut right = vec![0.5; 100];
        let original_left = left.clone();
        
        effect.process(&mut left, &mut right);
        
        // When bypassed, samples should be unchanged
        assert_eq!(left, original_left);
    }

    #[test]
    fn test_gain_parameter_setting() {
        let mut effect = GainEffect::new(0.0);
        
        assert!(effect.set_parameter("gain_db", 6.0).is_ok());
        assert_eq!(effect.get_parameter("gain_db").unwrap(), 6.0);
        
        // Test invalid parameter
        assert!(effect.set_parameter("invalid", 0.0).is_err());
        
        // Test out of range
        assert!(effect.set_parameter("gain_db", 100.0).is_err());
    }
}

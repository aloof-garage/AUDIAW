//! # AUDIAW Effects
//!
//! Audio effects processing for AUDIAW.
//! Provides real-time audio effects with parameter automation support.

use audiaw_types::{Sample, SampleRate};
use serde::{Deserialize, Serialize};
use std::fmt::Debug;

pub mod gain;
pub mod eq;
pub mod reverb;

pub use gain::GainEffect;
pub use eq::EqEffect;
pub use reverb::ReverbEffect;

/// Effect trait for audio processing
pub trait Effect: Send + Sync + Debug {
    /// Process stereo audio in-place
    /// 
    /// # Arguments
    /// * `left` - Left channel samples
    /// * `right` - Right channel samples
    /// 
    /// # Safety
    /// This method must be real-time safe (no allocations, no locks)
    fn process(&mut self, left: &mut [Sample], right: &mut [Sample]);
    
    /// Reset effect state (clear buffers, etc.)
    fn reset(&mut self);
    
    /// Get effect name
    fn name(&self) -> &str;
    
    /// Check if effect is bypassed
    fn is_bypassed(&self) -> bool;
    
    /// Set bypass state
    fn set_bypass(&mut self, bypass: bool);
    
    /// Update a parameter by name
    fn set_parameter(&mut self, name: &str, value: f32) -> Result<(), EffectError>;
    
    /// Get a parameter value by name
    fn get_parameter(&self, name: &str) -> Result<f32, EffectError>;
    
    /// Get all parameter names
    fn parameter_names(&self) -> Vec<String>;
    
    /// Clone the effect into a boxed trait object
    fn clone_box(&self) -> Box<dyn Effect>;
}

/// Effect types that can be instantiated
#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
#[serde(tag = "type", content = "params")]
pub enum EffectType {
    /// Gain/volume effect
    Gain {
        /// Gain in dB (-60 to +12)
        gain_db: f32,
    },
    /// 3-band parametric EQ
    Eq {
        /// Low frequency (20-500 Hz)
        low_freq: f32,
        /// Low gain (-12 to +12 dB)
        low_gain: f32,
        /// Mid frequency (500-5000 Hz)
        mid_freq: f32,
        /// Mid gain (-12 to +12 dB)
        mid_gain: f32,
        /// High frequency (5000-20000 Hz)
        high_freq: f32,
        /// High gain (-12 to +12 dB)
        high_gain: f32,
    },
    /// Reverb effect
    Reverb {
        /// Room size (0.0-1.0)
        room_size: f32,
        /// Damping (0.0-1.0)
        damping: f32,
        /// Wet level (0.0-1.0)
        wet_level: f32,
        /// Dry level (0.0-1.0)
        dry_level: f32,
    },
}

impl EffectType {
    /// Create an effect instance from this type
    pub fn create_effect(&self, sample_rate: SampleRate) -> Box<dyn Effect> {
        match self {
            EffectType::Gain { gain_db } => {
                Box::new(GainEffect::new(*gain_db))
            }
            EffectType::Eq {
                low_freq,
                low_gain,
                mid_freq,
                mid_gain,
                high_freq,
                high_gain,
            } => {
                Box::new(EqEffect::new(
                    sample_rate,
                    *low_freq,
                    *low_gain,
                    *mid_freq,
                    *mid_gain,
                    *high_freq,
                    *high_gain,
                ))
            }
            EffectType::Reverb {
                room_size,
                damping,
                wet_level,
                dry_level,
            } => {
                Box::new(ReverbEffect::new(
                    sample_rate,
                    *room_size,
                    *damping,
                    *wet_level,
                    *dry_level,
                ))
            }
        }
    }
}

/// Effect error types
#[derive(Debug, thiserror::Error)]
pub enum EffectError {
    /// Parameter not found
    #[error("Parameter not found: {0}")]
    ParameterNotFound(String),
    
    /// Invalid parameter value
    #[error("Invalid parameter value for {0}: {1}")]
    InvalidValue(String, f32),
    
    /// Effect processing error
    #[error("Effect processing error: {0}")]
    ProcessingError(String),
}

/// Effect instance with metadata
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct EffectInstance {
    /// Effect type and parameters
    pub effect_type: EffectType,
    /// Whether the effect is bypassed
    pub bypassed: bool,
    /// Effect name/label
    pub name: String,
}

impl EffectInstance {
    /// Create a new effect instance
    pub fn new(effect_type: EffectType, name: String) -> Self {
        Self {
            effect_type,
            bypassed: false,
            name,
        }
    }
    
    /// Create the actual effect processor
    pub fn create_processor(&self, sample_rate: SampleRate) -> Box<dyn Effect> {
        let mut effect = self.effect_type.create_effect(sample_rate);
        effect.set_bypass(self.bypassed);
        effect
    }
}

/// Utility function to convert dB to linear gain
#[inline]
pub fn db_to_gain(db: f32) -> f32 {
    10.0_f32.powf(db / 20.0)
}

/// Utility function to convert linear gain to dB
#[inline]
pub fn gain_to_db(gain: f32) -> f32 {
    20.0 * gain.log10()
}

/// Clamp a value between min and max
#[inline]
pub fn clamp(value: f32, min: f32, max: f32) -> f32 {
    value.max(min).min(max)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_db_conversion() {
        assert!((db_to_gain(0.0) - 1.0).abs() < 0.001);
        assert!((db_to_gain(6.0) - 2.0).abs() < 0.01);
        assert!((db_to_gain(-6.0) - 0.5).abs() < 0.01);
    }

    #[test]
    fn test_effect_type_creation() {
        let gain_effect = EffectType::Gain { gain_db: 0.0 };
        let effect = gain_effect.create_effect(48000);
        assert_eq!(effect.name(), "Gain");
    }
}

// Made with Bob

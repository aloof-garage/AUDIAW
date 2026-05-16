//! Effects management for audio engine
//!
//! Manages effect processors for tracks, handling creation, updates, and processing.

use audiaw_effects::{Effect, EffectType};
use audiaw_types::{SampleRate, TrackId};
use std::collections::HashMap;

/// Manages effect processors for all tracks
pub struct EffectsManager {
    /// Effect processors per track
    track_effects: HashMap<TrackId, Vec<Box<dyn Effect>>>,
    /// Sample rate for creating effects
    sample_rate: SampleRate,
}

impl EffectsManager {
    /// Create a new effects manager
    pub fn new(sample_rate: SampleRate) -> Self {
        Self {
            track_effects: HashMap::new(),
            sample_rate,
        }
    }
    
    /// Add an effect to a track
    pub fn add_effect(&mut self, track_id: TrackId, effect_type: EffectType) {
        let effect = effect_type.create_effect(self.sample_rate);
        self.track_effects
            .entry(track_id)
            .or_insert_with(Vec::new)
            .push(effect);
    }
    
    /// Remove an effect from a track
    pub fn remove_effect(&mut self, track_id: TrackId, effect_index: usize) -> bool {
        if let Some(effects) = self.track_effects.get_mut(&track_id) {
            if effect_index < effects.len() {
                effects.remove(effect_index);
                return true;
            }
        }
        false
    }
    
    /// Update an effect parameter
    pub fn update_effect_param(
        &mut self,
        track_id: TrackId,
        effect_index: usize,
        param_name: &str,
        value: f32,
    ) -> Result<(), String> {
        if let Some(effects) = self.track_effects.get_mut(&track_id) {
            if let Some(effect) = effects.get_mut(effect_index) {
                return effect
                    .set_parameter(param_name, value)
                    .map_err(|e| e.to_string());
            }
        }
        Err(format!("Effect not found: track {} index {}", track_id, effect_index))
    }
    
    /// Bypass/unbypass an effect
    pub fn bypass_effect(
        &mut self,
        track_id: TrackId,
        effect_index: usize,
        bypass: bool,
    ) -> bool {
        if let Some(effects) = self.track_effects.get_mut(&track_id) {
            if let Some(effect) = effects.get_mut(effect_index) {
                effect.set_bypass(bypass);
                return true;
            }
        }
        false
    }
    
    /// Process effects for a track
    pub fn process_track_effects(
        &mut self,
        track_id: TrackId,
        left: &mut [f32],
        right: &mut [f32],
    ) {
        if let Some(effects) = self.track_effects.get_mut(&track_id) {
            for effect in effects.iter_mut() {
                effect.process(left, right);
            }
        }
    }
    
    /// Remove all effects for a track
    pub fn remove_track(&mut self, track_id: TrackId) {
        self.track_effects.remove(&track_id);
    }
    
    /// Get number of effects on a track
    pub fn effect_count(&self, track_id: TrackId) -> usize {
        self.track_effects
            .get(&track_id)
            .map(|e| e.len())
            .unwrap_or(0)
    }
}

// Made with Bob

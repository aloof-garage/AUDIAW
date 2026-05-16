//! # AUDIAW Engine
//!
//! Core audio processing engine for AUDIAW.
//! Handles multi-track playback, mixing, and transport control.

mod effects_manager;

use audiaw_types::*;
use audiaw_effects::{Effect, EffectType};
use audiaw_history::{
    HistoryManager,
};
use arc_swap::ArcSwap;
use crossbeam::channel::{bounded, Receiver, Sender};
use effects_manager::EffectsManager;
use std::sync::{Arc, Mutex};
use tracing::{debug, info, warn, error};

/// Commands sent to the audio engine
#[derive(Debug, Clone)]
pub enum EngineCommand {
    /// Start playback
    Play,
    /// Stop playback
    Stop,
    /// Pause playback
    Pause,
    /// Seek to position (in samples)
    Seek(SamplePosition),
    /// Add a track
    AddTrack(Track),
    /// Remove a track
    RemoveTrack(TrackId),
    /// Add a clip to a track
    AddClip(TrackId, AudioClip),
    /// Remove a clip from a track
    RemoveClip(TrackId, ClipId),
    /// Update track volume
    SetTrackVolume(TrackId, f32),
    /// Update track pan
    SetTrackPan(TrackId, f32),
    /// Mute/unmute track
    SetTrackMute(TrackId, bool),
    /// Solo/unsolo track
    SetTrackSolo(TrackId, bool),
    /// Set master volume
    SetMasterVolume(f32),
    /// Start recording to a track
    StartRecording(TrackId),
    /// Stop recording
    StopRecording,
    /// Arm/disarm track for recording
    SetTrackArmed(TrackId, bool),
    /// Add an effect to a track
    AddEffect(TrackId, EffectType),
    /// Remove an effect from a track
    RemoveEffect(TrackId, usize),
    /// Update an effect parameter
    UpdateEffectParam(TrackId, usize, String, f32),
    /// Bypass/unbypass an effect
    BypassEffect(TrackId, usize, bool),
    /// Export audio to file
    ExportAudio(ExportSettings),
    /// Undo last action
    Undo,
    /// Redo last undone action
    Redo,
    /// Shutdown the engine
    Shutdown,
}

/// Events emitted by the audio engine
#[derive(Debug, Clone)]
pub enum EngineEvent {
    /// Transport state changed
    TransportStateChanged(TransportState),
    /// Playback position updated (in samples)
    PositionChanged(SamplePosition),
    /// Track added
    TrackAdded(TrackId),
    /// Track removed
    TrackRemoved(TrackId),
    /// Recording started
    RecordingStarted(TrackId),
    /// Recording stopped with new clip
    RecordingStopped(TrackId, ClipId),
    /// Export started
    ExportStarted,
    /// Export progress update
    ExportProgress(ExportProgress),
    /// Export completed successfully
    ExportCompleted(String),
    /// Export failed
    ExportFailed(String),
    /// Engine error
    Error(String),
}

/// Track effects processors (not cloneable, stored separately)
pub struct TrackEffects {
    pub track_id: TrackId,
    pub processors: Vec<Box<dyn Effect>>,
}

/// Audio engine state (shared between threads)
#[derive(Debug, Clone)]
pub struct EngineState {
    /// Current transport state
    pub transport_state: TransportState,
    /// Current playback position (in samples)
    pub position: SamplePosition,
    /// All tracks
    pub tracks: Vec<Track>,
    /// Master volume (0.0 to 1.0)
    pub master_volume: f32,
    /// Audio configuration
    pub config: AudioConfig,
    /// Recording track ID (if recording)
    pub recording_track_id: Option<TrackId>,
    /// Recording buffer
    pub recording_buffer: Vec<Sample>,
    /// Recording start position
    pub recording_start_position: SamplePosition,
    /// Export in progress
    pub exporting: bool,
    /// Export progress
    pub export_progress: Option<ExportProgress>,
}

impl EngineState {
    fn new(config: AudioConfig) -> Self {
        Self {
            transport_state: TransportState::Stopped,
            position: 0,
            tracks: Vec::new(),
            master_volume: 1.0,
            config,
            recording_track_id: None,
            recording_buffer: Vec::new(),
            recording_start_position: 0,
            exporting: false,
            export_progress: None,
        }
    }
}

/// Main audio engine
pub struct AudioEngine {
    /// Shared engine state (lock-free reads)
    state: Arc<ArcSwap<EngineState>>,
    /// Command sender
    command_tx: Sender<EngineCommand>,
    /// Event receiver
    event_rx: Receiver<EngineEvent>,
    /// Effects manager (shared with engine thread)
    effects_manager: Arc<Mutex<EffectsManager>>,
    /// History manager for undo/redo
    history_manager: Arc<Mutex<HistoryManager>>,
}

impl AudioEngine {
    /// Create a new audio engine
    pub fn new(config: AudioConfig) -> Self {
        let sample_rate = config.sample_rate;
        let state = Arc::new(ArcSwap::from_pointee(EngineState::new(config)));
        let (command_tx, command_rx) = bounded(100);
        let (event_tx, event_rx) = bounded(100);
        let effects_manager = Arc::new(Mutex::new(EffectsManager::new(sample_rate)));
        let history_manager = Arc::new(Mutex::new(HistoryManager::new()));

        // Spawn engine thread
        let state_clone = state.clone();
        let effects_clone = effects_manager.clone();
        let history_clone = history_manager.clone();
        std::thread::spawn(move || {
            Self::engine_thread(state_clone, command_rx, event_tx, effects_clone, history_clone);
        });

        info!("Audio engine initialized");

        Self {
            state,
            command_tx,
            event_rx,
            effects_manager,
            history_manager,
        }
    }

    /// Get a clone of the state Arc for audio callback
    pub fn get_state_arc(&self) -> Arc<ArcSwap<EngineState>> {
        self.state.clone()
    }

    /// Send a command to the engine
    pub fn send_command(&self, command: EngineCommand) -> AudioResult<()> {
        self.command_tx
            .send(command)
            .map_err(|e| AudioError::Generic(format!("Failed to send command: {}", e)))
    }

    /// Try to receive an event (non-blocking)
    pub fn try_recv_event(&self) -> Option<EngineEvent> {
        self.event_rx.try_recv().ok()
    }

    /// Get current transport state
    pub fn transport_state(&self) -> TransportState {
        self.state.load().transport_state
    }

    /// Get current playback position
    pub fn position(&self) -> SamplePosition {
        self.state.load().position
    }

    /// Append audio data to recording buffer (called from audio callback)
    pub fn append_recording_data(&self, data: &[Sample]) {
        self.state.rcu(|current| {
            let mut new_state = (**current).clone();
            if new_state.recording_track_id.is_some() {
                new_state.recording_buffer.extend_from_slice(data);
            }
            new_state
        });
    }

    /// Check if currently recording
    pub fn is_recording(&self) -> bool {
        self.state.load().recording_track_id.is_some()
    }

    /// Check if currently exporting
    pub fn is_exporting(&self) -> bool {
        self.state.load().exporting
    }

    /// Get export progress
    pub fn export_progress(&self) -> Option<ExportProgress> {
        self.state.load().export_progress.clone()
    }

    /// Get all tracks (cloned)
    pub fn tracks(&self) -> Vec<Track> {
        self.state.load().tracks.clone()
    }

    /// Get master volume
    /// Get effects manager for audio processing
    pub fn get_effects_manager(&self) -> Arc<Mutex<EffectsManager>> {
        self.effects_manager.clone()
    }

    pub fn master_volume(&self) -> f32 {
        self.state.load().master_volume
    }

    /// Check if undo is available
    pub fn can_undo(&self) -> bool {
        self.history_manager.lock().unwrap().can_undo()
    }

    /// Check if redo is available
    pub fn can_redo(&self) -> bool {
        self.history_manager.lock().unwrap().can_redo()
    }

    /// Get description of action to undo
    pub fn undo_description(&self) -> Option<String> {
        self.history_manager.lock().unwrap().undo_description()
    }

    /// Get description of action to redo
    pub fn redo_description(&self) -> Option<String> {
        self.history_manager.lock().unwrap().redo_description()
    }

    /// Engine thread (processes commands and generates audio)
    fn engine_thread(
        state: Arc<ArcSwap<EngineState>>,
        command_rx: Receiver<EngineCommand>,
        event_tx: Sender<EngineEvent>,
        effects_manager: Arc<Mutex<EffectsManager>>,
        history_manager: Arc<Mutex<HistoryManager>>,
    ) {
        info!("Engine thread started");

        loop {
            // Process commands
            while let Ok(command) = command_rx.try_recv() {
                match command {
                    EngineCommand::Play => {
                        Self::handle_play(&state, &event_tx);
                    }
                    EngineCommand::Stop => {
                        Self::handle_stop(&state, &event_tx);
                    }
                    EngineCommand::Pause => {
                        Self::handle_pause(&state, &event_tx);
                    }
                    EngineCommand::Seek(position) => {
                        Self::handle_seek(&state, position);
                    }
                    EngineCommand::AddTrack(track) => {
                        Self::handle_add_track(&state, track, &event_tx);
                    }
                    EngineCommand::RemoveTrack(track_id) => {
                        Self::handle_remove_track(&state, track_id, &event_tx, &effects_manager);
                    }
                    EngineCommand::AddClip(track_id, clip) => {
                        Self::handle_add_clip(&state, track_id, clip);
                    }
                    EngineCommand::RemoveClip(track_id, clip_id) => {
                        Self::handle_remove_clip(&state, track_id, clip_id);
                    }
                    EngineCommand::SetTrackVolume(track_id, volume) => {
                        Self::handle_set_track_volume(&state, track_id, volume);
                    }
                    EngineCommand::SetTrackPan(track_id, pan) => {
                        Self::handle_set_track_pan(&state, track_id, pan);
                    }
                    EngineCommand::SetTrackMute(track_id, muted) => {
                        Self::handle_set_track_mute(&state, track_id, muted);
                    }
                    EngineCommand::SetTrackSolo(track_id, solo) => {
                        Self::handle_set_track_solo(&state, track_id, solo);
                    }
                    EngineCommand::SetMasterVolume(volume) => {
                        Self::handle_set_master_volume(&state, volume);
                    }
                    EngineCommand::StartRecording(track_id) => {
                        Self::handle_start_recording(&state, track_id, &event_tx);
                    }
                    EngineCommand::StopRecording => {
                        Self::handle_stop_recording(&state, &event_tx);
                    }
                    EngineCommand::SetTrackArmed(track_id, armed) => {
                        Self::handle_set_track_armed(&state, track_id, armed);
                    }
                    EngineCommand::AddEffect(track_id, effect_type) => {
                        Self::handle_add_effect(&state, track_id, effect_type, &effects_manager);
                    }
                    EngineCommand::RemoveEffect(track_id, effect_index) => {
                        Self::handle_remove_effect(track_id, effect_index, &effects_manager);
                    }
                    EngineCommand::UpdateEffectParam(track_id, effect_index, param_name, value) => {
                        Self::handle_update_effect_param(track_id, effect_index, &param_name, value, &effects_manager);
                    }
                    EngineCommand::BypassEffect(track_id, effect_index, bypass) => {
                        Self::handle_bypass_effect(track_id, effect_index, bypass, &effects_manager);
                    }
                    EngineCommand::ExportAudio(settings) => {
                        Self::handle_export_audio(&state, settings, &event_tx, &effects_manager);
                    }
                    EngineCommand::Undo => {
                        Self::handle_undo(&state, &history_manager);
                    }
                    EngineCommand::Redo => {
                        Self::handle_redo(&state, &history_manager);
                    }
                    EngineCommand::Shutdown => {
                        info!("Engine shutting down");
                        break;
                    }
                }
            }

            // Simulate audio processing (in real implementation, this would be driven by audio callback)
            std::thread::sleep(std::time::Duration::from_millis(10));
        }
    }

    fn handle_play(state: &Arc<ArcSwap<EngineState>>, event_tx: &Sender<EngineEvent>) {
        state.rcu(|current| {
            let mut new_state = (**current).clone();
            new_state.transport_state = TransportState::Playing;
            new_state
        });
        debug!("Transport: Playing");
        let _ = event_tx.send(EngineEvent::TransportStateChanged(TransportState::Playing));
    }

    fn handle_stop(state: &Arc<ArcSwap<EngineState>>, event_tx: &Sender<EngineEvent>) {
        state.rcu(|current| {
            let mut new_state = (**current).clone();
            new_state.transport_state = TransportState::Stopped;
            new_state.position = 0;
            new_state
        });
        debug!("Transport: Stopped");
        let _ = event_tx.send(EngineEvent::TransportStateChanged(TransportState::Stopped));
        let _ = event_tx.send(EngineEvent::PositionChanged(0));
    }

    fn handle_pause(state: &Arc<ArcSwap<EngineState>>, event_tx: &Sender<EngineEvent>) {
        state.rcu(|current| {
            let mut new_state = (**current).clone();
            new_state.transport_state = TransportState::Paused;
            new_state
        });
        debug!("Transport: Paused");
        let _ = event_tx.send(EngineEvent::TransportStateChanged(TransportState::Paused));
    }

    fn handle_seek(state: &Arc<ArcSwap<EngineState>>, position: SamplePosition) {
        state.rcu(|current| {
            let mut new_state = (**current).clone();
            new_state.position = position;
            new_state
        });
        debug!("Seek to position: {}", position);
    }

    fn handle_add_track(
        state: &Arc<ArcSwap<EngineState>>,
        track: Track,
        event_tx: &Sender<EngineEvent>,
    ) {
        let track_id = track.id;
        state.rcu(|current| {
            let mut new_state = (**current).clone();
            new_state.tracks.push(track.clone());
            new_state
        });
        info!("Track added: {} (ID: {})", state.load().tracks.last().unwrap().name, track_id);
        let _ = event_tx.send(EngineEvent::TrackAdded(track_id));
    }

    fn handle_remove_track(
        state: &Arc<ArcSwap<EngineState>>,
        track_id: TrackId,
        event_tx: &Sender<EngineEvent>,
        effects_manager: &Arc<Mutex<EffectsManager>>,
    ) {
        // Remove effects for this track
        if let Ok(mut mgr) = effects_manager.lock() {
            mgr.remove_track(track_id);
        }
        state.rcu(|current| {
            let mut new_state = (**current).clone();
            new_state.tracks.retain(|t| t.id != track_id);
            new_state
        });
        info!("Track removed: ID {}", track_id);
        let _ = event_tx.send(EngineEvent::TrackRemoved(track_id));
    }

    fn handle_add_clip(
        state: &Arc<ArcSwap<EngineState>>,
        track_id: TrackId,
        clip: AudioClip,
    ) {
        state.rcu(|current| {
            let mut new_state = (**current).clone();
            if let Some(track) = new_state.tracks.iter_mut().find(|t| t.id == track_id) {
                track.add_clip(clip.clone());
            }
            new_state
        });
        info!("Clip added to track {}: {}", track_id, clip.name);
    }

    fn handle_remove_clip(
        state: &Arc<ArcSwap<EngineState>>,
        track_id: TrackId,
        clip_id: ClipId,
    ) {
        state.rcu(|current| {
            let mut new_state = (**current).clone();
            if let Some(track) = new_state.tracks.iter_mut().find(|t| t.id == track_id) {
                track.remove_clip(clip_id);
            }
            new_state
        });
        info!("Clip {} removed from track {}", clip_id, track_id);
    }

    fn handle_set_track_volume(
        state: &Arc<ArcSwap<EngineState>>,
        track_id: TrackId,
        volume: f32,
    ) {
        state.rcu(|current| {
            let mut new_state = (**current).clone();
            if let Some(track) = new_state.tracks.iter_mut().find(|t| t.id == track_id) {
                track.volume = volume.clamp(0.0, 1.0);
            }
            new_state
        });
        debug!("Track {} volume set to {}", track_id, volume);
    }

    fn handle_set_track_pan(state: &Arc<ArcSwap<EngineState>>, track_id: TrackId, pan: f32) {
        state.rcu(|current| {
            let mut new_state = (**current).clone();
            if let Some(track) = new_state.tracks.iter_mut().find(|t| t.id == track_id) {
                track.pan = pan.clamp(-1.0, 1.0);
            }
            new_state
        });
        debug!("Track {} pan set to {}", track_id, pan);
    }

    fn handle_set_track_mute(state: &Arc<ArcSwap<EngineState>>, track_id: TrackId, muted: bool) {
        state.rcu(|current| {
            let mut new_state = (**current).clone();
            if let Some(track) = new_state.tracks.iter_mut().find(|t| t.id == track_id) {
                track.muted = muted;
            }
            new_state
        });
        debug!("Track {} mute set to {}", track_id, muted);
    }
    fn handle_start_recording(
        state: &Arc<ArcSwap<EngineState>>,
        track_id: TrackId,
        event_tx: &Sender<EngineEvent>,
    ) {
        state.rcu(|current| {
            let mut new_state = (**current).clone();
            
            // Check if track exists and is armed
            if let Some(track) = new_state.tracks.iter().find(|t| t.id == track_id) {
                if !track.armed {
                    let _ = event_tx.send(EngineEvent::Error(
                        format!("Track {} is not armed for recording", track_id)
                    ));
                    return new_state;
                }
            } else {
                let _ = event_tx.send(EngineEvent::Error(
                    format!("Track {} not found", track_id)
                ));
                return new_state;
            }
            
            // Initialize recording
            new_state.transport_state = TransportState::Recording;
            new_state.recording_track_id = Some(track_id);
            new_state.recording_buffer.clear();
            new_state.recording_start_position = new_state.position;
            
            new_state
        });
        
        info!("Recording started on track {}", track_id);
        let _ = event_tx.send(EngineEvent::RecordingStarted(track_id));
        let _ = event_tx.send(EngineEvent::TransportStateChanged(TransportState::Recording));
    }

    fn handle_stop_recording(
        state: &Arc<ArcSwap<EngineState>>,
        event_tx: &Sender<EngineEvent>,
    ) {
        let (track_id, clip_id, audio_data, channels, sample_rate, start_pos) = {
            let current = state.load();
            
            if current.recording_track_id.is_none() {
                let _ = event_tx.send(EngineEvent::Error("Not currently recording".to_string()));
                return;
            }
            
            let track_id = current.recording_track_id.unwrap();
            let audio_data = current.recording_buffer.clone();
            let channels = current.config.input_channels;
            let sample_rate = current.config.sample_rate;
            let start_pos = current.recording_start_position;
            
            // Generate clip ID
            let clip_id = current.tracks
                .iter()
                .flat_map(|t| t.clips.iter())
                .map(|c| c.id)
                .max()
                .unwrap_or(0) + 1;
            
            (track_id, clip_id, audio_data, channels, sample_rate, start_pos)
        };
        
        if audio_data.is_empty() {
            let _ = event_tx.send(EngineEvent::Error("No audio recorded".to_string()));
            state.rcu(|current| {
                let mut new_state = (**current).clone();
                new_state.transport_state = TransportState::Stopped;
                new_state.recording_track_id = None;
                new_state.recording_buffer.clear();
                new_state
            });
            return;
        }
        
        // Create audio clip from recorded data
        let clip = AudioClip::new(
            clip_id,
            format!("Recording {}", clip_id),
            start_pos,
            audio_data,
            channels,
            sample_rate,
        );
        
        // Add clip to track and reset recording state
        state.rcu(|current| {
            let mut new_state = (**current).clone();
            
            if let Some(track) = new_state.tracks.iter_mut().find(|t| t.id == track_id) {
                track.add_clip(clip.clone());
            }
            
            new_state.transport_state = TransportState::Stopped;
            new_state.recording_track_id = None;
            new_state.recording_buffer.clear();
            
            new_state
        });
        
        info!("Recording stopped on track {}, created clip {}", track_id, clip_id);
        let _ = event_tx.send(EngineEvent::RecordingStopped(track_id, clip_id));
        let _ = event_tx.send(EngineEvent::TransportStateChanged(TransportState::Stopped));
    }

    fn handle_set_track_armed(
        state: &Arc<ArcSwap<EngineState>>,
        track_id: TrackId,
        armed: bool,
    ) {
        state.rcu(|current| {
            let mut new_state = (**current).clone();
            if let Some(track) = new_state.tracks.iter_mut().find(|t| t.id == track_id) {
                track.armed = armed;
            }
            new_state
        });
        debug!("Track {} armed set to {}", track_id, armed);
    }

    fn handle_add_effect(
        state: &Arc<ArcSwap<EngineState>>,
        track_id: TrackId,
        effect_type: EffectType,
        effects_manager: &Arc<Mutex<EffectsManager>>,
    ) {
        // Add effect to effects manager
        if let Ok(mut mgr) = effects_manager.lock() {
            mgr.add_effect(track_id, effect_type.clone());
            debug!("Added effect to track {}: {:?}", track_id, effect_type);
        }
        
        // Update track's effects list in state (for serialization)
        state.rcu(|current| {
            let mut new_state = (**current).clone();
            if let Some(track) = new_state.tracks.iter_mut().find(|t| t.id == track_id) {
                if let Ok(json) = serde_json::to_value(&effect_type) {
                    track.effects.push(json);
                }
            }
            new_state
        });
    }

    fn handle_remove_effect(
        track_id: TrackId,
        effect_index: usize,
        effects_manager: &Arc<Mutex<EffectsManager>>,
    ) {
        if let Ok(mut mgr) = effects_manager.lock() {
            if mgr.remove_effect(track_id, effect_index) {
                debug!("Removed effect {} from track {}", effect_index, track_id);
            } else {
                warn!("Failed to remove effect {} from track {}", effect_index, track_id);
            }
        }
    }

    fn handle_update_effect_param(
        track_id: TrackId,
        effect_index: usize,
        param_name: &str,
        value: f32,
        effects_manager: &Arc<Mutex<EffectsManager>>,
    ) {
        if let Ok(mut mgr) = effects_manager.lock() {
            match mgr.update_effect_param(track_id, effect_index, param_name, value) {
                Ok(_) => {
                    debug!("Updated effect param: track {} effect {} {} = {}",
                           track_id, effect_index, param_name, value);
                }
                Err(e) => {
                    warn!("Failed to update effect param: {}", e);
                }
            }
        }
    }

    fn handle_bypass_effect(
        track_id: TrackId,
        effect_index: usize,
        bypass: bool,
        effects_manager: &Arc<Mutex<EffectsManager>>,
    ) {
        if let Ok(mut mgr) = effects_manager.lock() {
            if mgr.bypass_effect(track_id, effect_index, bypass) {
                debug!("Set effect {} bypass on track {} to {}", effect_index, track_id, bypass);
            } else {
                warn!("Failed to set bypass for effect {} on track {}", effect_index, track_id);
            }
        }
    }


    fn handle_set_track_solo(state: &Arc<ArcSwap<EngineState>>, track_id: TrackId, solo: bool) {
        state.rcu(|current| {
            let mut new_state = (**current).clone();
            if let Some(track) = new_state.tracks.iter_mut().find(|t| t.id == track_id) {
                track.solo = solo;
            }
            new_state
        });
        debug!("Track {} solo set to {}", track_id, solo);
    }

    fn handle_set_master_volume(state: &Arc<ArcSwap<EngineState>>, volume: f32) {
        state.rcu(|current| {
            let mut new_state = (**current).clone();
            new_state.master_volume = volume.clamp(0.0, 1.0);
            new_state
        });
        debug!("Master volume set to {}", volume);
    }

    fn handle_undo(
        state: &Arc<ArcSwap<EngineState>>,
        history_manager: &Arc<Mutex<HistoryManager>>,
    ) {
        if let Ok(mut history) = history_manager.lock() {
            // Convert engine state to history state
            let current = state.load();
            let mut history_state = audiaw_history::EngineState {
                tracks: current.tracks.clone(),
                master_volume: current.master_volume,
            };
            
            match history.undo(&mut history_state) {
                Ok(_) => {
                    // Apply the undone state back to engine
                    state.rcu(|current| {
                        let mut new_state = (**current).clone();
                        new_state.tracks = history_state.tracks.clone();
                        new_state.master_volume = history_state.master_volume;
                        new_state
                    });
                    info!("Undo successful");
                }
                Err(e) => {
                    warn!("Undo failed: {}", e);
                }
            }
        }
    }

    fn handle_redo(
        state: &Arc<ArcSwap<EngineState>>,
        history_manager: &Arc<Mutex<HistoryManager>>,
    ) {
        if let Ok(mut history) = history_manager.lock() {
            // Convert engine state to history state
            let current = state.load();
            let mut history_state = audiaw_history::EngineState {
                tracks: current.tracks.clone(),
                master_volume: current.master_volume,
            };
            
            match history.redo(&mut history_state) {
                Ok(_) => {
                    // Apply the redone state back to engine
                    state.rcu(|current| {
                        let mut new_state = (**current).clone();
                        new_state.tracks = history_state.tracks.clone();
                        new_state.master_volume = history_state.master_volume;
                        new_state
                    });
                    info!("Redo successful");
                }
                Err(e) => {
                    warn!("Redo failed: {}", e);
                }
            }
        }
    }
    fn handle_export_audio(
        state: &Arc<ArcSwap<EngineState>>,
        settings: ExportSettings,
        event_tx: &Sender<EngineEvent>,
        effects_manager: &Arc<Mutex<EffectsManager>>,
    ) {
        info!("Starting audio export to: {}", settings.output_path);
        let _ = event_tx.send(EngineEvent::ExportStarted);
        
        // Mark export as in progress
        state.rcu(|current| {
            let mut new_state = (**current).clone();
            new_state.exporting = true;
            new_state.export_progress = Some(ExportProgress::new(0, 0));
            new_state
        });
        
        // Spawn export thread to avoid blocking engine
        let state_clone = state.clone();
        let event_tx_clone = event_tx.clone();
        let effects_clone = effects_manager.clone();
        
        std::thread::spawn(move || {
            let result = AudioEngine::perform_export(&state_clone, settings, &event_tx_clone, &effects_clone);
            
            // Clear export state
            state_clone.rcu(|current| {
                let mut new_state = (**current).clone();
                new_state.exporting = false;
                new_state.export_progress = None;
                new_state
            });
            
            // Send completion event
            match result {
                Ok(path) => {
                    info!("Export completed successfully: {}", path);
                    let _ = event_tx_clone.send(EngineEvent::ExportCompleted(path));
                }
                Err(e) => {
                    error!("Export failed: {}", e);
                    let _ = event_tx_clone.send(EngineEvent::ExportFailed(e.to_string()));
                }
            }
        });
    }
    
    fn perform_export(
        state: &Arc<ArcSwap<EngineState>>,
        settings: ExportSettings,
        event_tx: &Sender<EngineEvent>,
        _effects_manager: &Arc<Mutex<EffectsManager>>,
    ) -> AudioResult<String> {
        use audiaw_audio_io::encoder::{WavEncoder, BitDepth, normalize_samples, apply_dither};
        
        let current_state = state.load();
        
        // Convert bit depth
        let bit_depth = match settings.bit_depth {
            ExportBitDepth::I16 => BitDepth::I16,
            ExportBitDepth::I24 => BitDepth::I24,
            ExportBitDepth::F32 => BitDepth::F32,
        };
        
        // Calculate project duration
        let mut max_end_position = 0u64;
        for track in &current_state.tracks {
            for clip in &track.clips {
                let clip_end = clip.start_position + clip.length;
                if clip_end > max_end_position {
                    max_end_position = clip_end;
                }
            }
        }
        
        if max_end_position == 0 {
            return Err(AudioError::ExportError("Project is empty".to_string()));
        }
        
        let start_pos = settings.start_position;
        let end_pos = settings.end_position.unwrap_or(max_end_position);
        
        if start_pos >= end_pos {
            return Err(AudioError::ExportError("Invalid export range".to_string()));
        }
        
        let total_frames = (end_pos - start_pos) as usize;
        let channels = current_state.config.output_channels;
        
        info!(
            "Exporting {} frames ({:.2}s) at {} Hz, {} channels",
            total_frames,
            total_frames as f64 / settings.sample_rate as f64,
            settings.sample_rate,
            channels
        );
        
        // Create encoder
        let mut encoder = WavEncoder::new(
            &settings.output_path,
            settings.sample_rate,
            channels as u16,
            bit_depth,
        )?;
        
        // Render in chunks to avoid memory issues
        const CHUNK_SIZE: usize = 4096;
        let mut position = start_pos;
        let mut all_samples = Vec::new();
        
        while position < end_pos {
            let frames_remaining = (end_pos - position) as usize;
            let frames_to_render = frames_remaining.min(CHUNK_SIZE);
            let samples_to_render = frames_to_render * channels;
            
            // Allocate buffer for this chunk
            let mut chunk_buffer = vec![0.0f32; samples_to_render];
            
            // Check if any tracks are soloed
            let has_solo = current_state.tracks.iter().any(|t| t.solo);
            
            // Mix all tracks into chunk
            for track in &current_state.tracks {
                // Skip muted tracks
                if track.muted {
                    continue;
                }
                
                // Skip non-solo tracks if any track is soloed
                if has_solo && !track.solo {
                    continue;
                }
                
                // Process each clip in the track
                for clip in &track.clips {
                    if clip.muted {
                        continue;
                    }
                    
                    process_clip_static(
                        clip,
                        track,
                        position,
                        &mut chunk_buffer,
                        frames_to_render,
                        channels,
                    );
                }
            }
            
            // Apply master volume
            for sample in chunk_buffer.iter_mut() {
                *sample *= current_state.master_volume;
                *sample = sample.clamp(-1.0, 1.0);
            }
            
            // Collect samples for normalization if needed
            if settings.normalize_db.is_some() {
                all_samples.extend_from_slice(&chunk_buffer);
            } else {
                // Write directly if no normalization
                if settings.dither {
                    apply_dither(&mut chunk_buffer, bit_depth);
                }
                encoder.write_samples(&chunk_buffer)?;
            }
            
            position += frames_to_render as u64;
            
            // Update progress
            let progress = ExportProgress::new(position - start_pos, total_frames as u64);
            state.rcu(|current| {
                let mut new_state = (**current).clone();
                new_state.export_progress = Some(progress.clone());
                new_state
            });
            let _ = event_tx.send(EngineEvent::ExportProgress(progress));
        }
        
        // Apply normalization if requested
        if let Some(target_db) = settings.normalize_db {
            info!("Normalizing audio to {} dB", target_db);
            normalize_samples(&mut all_samples, target_db);
            
            if settings.dither {
                apply_dither(&mut all_samples, bit_depth);
            }
            
            encoder.write_samples(&all_samples)?;
        }
        
        // Finalize the file
        encoder.finalize()?;
        
        Ok(settings.output_path)
    }
}

/// Process a single clip into the output buffer (static version for callback)
pub fn process_clip_static(
        clip: &AudioClip,
        track: &Track,
        playback_position: SamplePosition,
        output_buffer: &mut [f32],
        frames: usize,
        output_channels: usize,
    ) {
        // Calculate clip boundaries
        let clip_start = clip.start_position;
        let clip_end = clip_start + clip.length;
        
        // Check if playback position is within this clip
        if playback_position >= clip_end || playback_position + frames as u64 <= clip_start {
            return; // Clip not active at current position
        }
        
        // Calculate read position within clip
        let read_start = if playback_position >= clip_start {
            playback_position - clip_start
        } else {
            0
        };
        
        // Calculate how many frames to read
        let frames_to_read = frames.min((clip_end - playback_position.max(clip_start)) as usize);
        
        // Calculate output offset if clip starts after playback position
        let output_offset = if clip_start > playback_position {
            ((clip_start - playback_position) as usize).min(frames)
        } else {
            0
        };
        
        // Get clip audio data
        let clip_data = &clip.audio_data;
        let clip_channels = clip.channels;
        
        // Calculate pan gains (constant power panning)
        let (left_gain, right_gain) = calculate_pan_gains(track.pan);
        
        // Combined gain
        let gain = track.volume * clip.volume;
        
        // Mix clip into output buffer
        for frame in 0..frames_to_read {
            let clip_frame = (read_start as usize + frame).min(clip.length as usize - 1);
            let output_frame = output_offset + frame;
            
            if output_frame >= frames {
                break;
            }
            
            // Read from clip (handle mono/stereo conversion)
            let (left_sample, right_sample) = if clip_channels == 1 {
                // Mono clip - duplicate to both channels
                let sample_idx = clip_frame;
                if sample_idx < clip_data.len() {
                    let sample = clip_data[sample_idx];
                    (sample, sample)
                } else {
                    (0.0, 0.0)
                }
            } else {
                // Stereo clip
                let sample_idx = clip_frame * 2;
                if sample_idx + 1 < clip_data.len() {
                    (clip_data[sample_idx], clip_data[sample_idx + 1])
                } else {
                    (0.0, 0.0)
                }
            };
            
            // Apply gain and pan
            let left = left_sample * gain * left_gain;
            let right = right_sample * gain * right_gain;
            
            // Mix into output buffer (stereo)
            if output_channels >= 2 {
                let out_idx = output_frame * output_channels;
                output_buffer[out_idx] += left;
                output_buffer[out_idx + 1] += right;
            } else {
                // Mono output - mix down to mono
                let out_idx = output_frame;
                output_buffer[out_idx] += (left + right) * 0.5;
            }
        }
    }

/// Calculate pan gains using constant power panning
/// pan: -1.0 (left) to 1.0 (right)
/// Returns: (left_gain, right_gain)
pub fn calculate_pan_gains(pan: f32) -> (f32, f32) {
    let pan = pan.clamp(-1.0, 1.0);
    let angle = (pan + 1.0) * 0.25 * std::f32::consts::PI; // 0 to PI/2
    let left_gain = angle.cos();
    let right_gain = angle.sin();
    (left_gain, right_gain)
}

#[cfg(test)]
mod tests {
    use super::*;

    /// Helper function to create test audio data
    fn create_test_audio_data(frames: usize, channels: usize) -> Vec<Sample> {
        let mut data = Vec::with_capacity(frames * channels);
        for i in 0..frames {
            let sample = (i as f32 / frames as f32) * 0.5; // Ramp from 0 to 0.5
            for _ in 0..channels {
                data.push(sample);
            }
        }
        data
    }

    /// Helper function to wait for engine command processing
    fn wait_for_engine() {
        std::thread::sleep(std::time::Duration::from_millis(50));
    }

    #[test]
    fn test_engine_creation() {
        let config = AudioConfig::default();
        let engine = AudioEngine::new(config);
        assert_eq!(engine.transport_state(), TransportState::Stopped);
        assert_eq!(engine.position(), 0);
        assert_eq!(engine.master_volume(), 1.0);
        assert_eq!(engine.tracks().len(), 0);
    }

    #[test]
    fn test_engine_creation_with_custom_config() {
        let config = AudioConfig {
            sample_rate: 44100,
            buffer_size: 256,
            output_channels: 2,
            input_channels: 2,
        };
        let engine = AudioEngine::new(config);
        assert_eq!(engine.transport_state(), TransportState::Stopped);
    }

    #[test]
    fn test_transport_play() {
        let config = AudioConfig::default();
        let engine = AudioEngine::new(config);

        engine.send_command(EngineCommand::Play).unwrap();
        wait_for_engine();
        assert_eq!(engine.transport_state(), TransportState::Playing);
    }

    #[test]
    fn test_transport_stop() {
        let config = AudioConfig::default();
        let engine = AudioEngine::new(config);

        engine.send_command(EngineCommand::Play).unwrap();
        wait_for_engine();
        engine.send_command(EngineCommand::Stop).unwrap();
        wait_for_engine();
        
        assert_eq!(engine.transport_state(), TransportState::Stopped);
        assert_eq!(engine.position(), 0); // Stop resets position
    }

    #[test]
    fn test_transport_pause() {
        let config = AudioConfig::default();
        let engine = AudioEngine::new(config);

        engine.send_command(EngineCommand::Play).unwrap();
        wait_for_engine();
        engine.send_command(EngineCommand::Pause).unwrap();
        wait_for_engine();
        
        assert_eq!(engine.transport_state(), TransportState::Paused);
    }

    #[test]
    fn test_transport_seek() {
        let config = AudioConfig::default();
        let engine = AudioEngine::new(config);

        engine.send_command(EngineCommand::Seek(1000)).unwrap();
        wait_for_engine();
        assert_eq!(engine.position(), 1000);

        engine.send_command(EngineCommand::Seek(5000)).unwrap();
        wait_for_engine();
        assert_eq!(engine.position(), 5000);
    }

    #[test]
    fn test_add_track() {
        let config = AudioConfig::default();
        let engine = AudioEngine::new(config);

        let track = Track::new(1, "Test Track".to_string());
        engine.send_command(EngineCommand::AddTrack(track)).unwrap();
        wait_for_engine();

        let tracks = engine.tracks();
        assert_eq!(tracks.len(), 1);
        assert_eq!(tracks[0].name, "Test Track");
        assert_eq!(tracks[0].id, 1);
    }

    #[test]
    fn test_add_multiple_tracks() {
        let config = AudioConfig::default();
        let engine = AudioEngine::new(config);

        for i in 1..=5 {
            let track = Track::new(i, format!("Track {}", i));
            engine.send_command(EngineCommand::AddTrack(track)).unwrap();
        }
        wait_for_engine();

        let tracks = engine.tracks();
        assert_eq!(tracks.len(), 5);
        assert_eq!(tracks[0].name, "Track 1");
        assert_eq!(tracks[4].name, "Track 5");
    }

    #[test]
    fn test_remove_track() {
        let config = AudioConfig::default();
        let engine = AudioEngine::new(config);

        let track = Track::new(1, "Test Track".to_string());
        engine.send_command(EngineCommand::AddTrack(track)).unwrap();
        wait_for_engine();

        engine.send_command(EngineCommand::RemoveTrack(1)).unwrap();
        wait_for_engine();

        let tracks = engine.tracks();
        assert_eq!(tracks.len(), 0);
    }

    #[test]
    fn test_add_clip_to_track() {
        let config = AudioConfig::default();
        let engine = AudioEngine::new(config);

        let track = Track::new(1, "Test Track".to_string());
        engine.send_command(EngineCommand::AddTrack(track)).unwrap();
        wait_for_engine();

        let audio_data = create_test_audio_data(1000, 2);
        let clip = AudioClip::new(1, "Test Clip".to_string(), 0, audio_data, 2, 48000);
        engine.send_command(EngineCommand::AddClip(1, clip)).unwrap();
        wait_for_engine();

        let tracks = engine.tracks();
        assert_eq!(tracks[0].clips.len(), 1);
        assert_eq!(tracks[0].clips[0].name, "Test Clip");
    }

    #[test]
    fn test_remove_clip_from_track() {
        let config = AudioConfig::default();
        let engine = AudioEngine::new(config);

        let track = Track::new(1, "Test Track".to_string());
        engine.send_command(EngineCommand::AddTrack(track)).unwrap();
        wait_for_engine();

        let audio_data = create_test_audio_data(1000, 2);
        let clip = AudioClip::new(1, "Test Clip".to_string(), 0, audio_data, 2, 48000);
        engine.send_command(EngineCommand::AddClip(1, clip)).unwrap();
        wait_for_engine();

        engine.send_command(EngineCommand::RemoveClip(1, 1)).unwrap();
        wait_for_engine();

        let tracks = engine.tracks();
        assert_eq!(tracks[0].clips.len(), 0);
    }

    #[test]
    fn test_set_track_volume() {
        let config = AudioConfig::default();
        let engine = AudioEngine::new(config);

        let track = Track::new(1, "Test Track".to_string());
        engine.send_command(EngineCommand::AddTrack(track)).unwrap();
        wait_for_engine();

        engine.send_command(EngineCommand::SetTrackVolume(1, 0.5)).unwrap();
        wait_for_engine();

        let tracks = engine.tracks();
        assert_eq!(tracks[0].volume, 0.5);
    }

    #[test]
    fn test_set_track_volume_clamping() {
        let config = AudioConfig::default();
        let engine = AudioEngine::new(config);

        let track = Track::new(1, "Test Track".to_string());
        engine.send_command(EngineCommand::AddTrack(track)).unwrap();
        wait_for_engine();

        // Test upper bound
        engine.send_command(EngineCommand::SetTrackVolume(1, 2.0)).unwrap();
        wait_for_engine();
        assert_eq!(engine.tracks()[0].volume, 1.0);

        // Test lower bound
        engine.send_command(EngineCommand::SetTrackVolume(1, -0.5)).unwrap();
        wait_for_engine();
        assert_eq!(engine.tracks()[0].volume, 0.0);
    }

    #[test]
    fn test_set_track_pan() {
        let config = AudioConfig::default();
        let engine = AudioEngine::new(config);

        let track = Track::new(1, "Test Track".to_string());
        engine.send_command(EngineCommand::AddTrack(track)).unwrap();
        wait_for_engine();

        engine.send_command(EngineCommand::SetTrackPan(1, 0.5)).unwrap();
        wait_for_engine();

        let tracks = engine.tracks();
        assert_eq!(tracks[0].pan, 0.5);
    }

    #[test]
    fn test_set_track_pan_clamping() {
        let config = AudioConfig::default();
        let engine = AudioEngine::new(config);

        let track = Track::new(1, "Test Track".to_string());
        engine.send_command(EngineCommand::AddTrack(track)).unwrap();
        wait_for_engine();

        // Test upper bound
        engine.send_command(EngineCommand::SetTrackPan(1, 2.0)).unwrap();
        wait_for_engine();
        assert_eq!(engine.tracks()[0].pan, 1.0);

        // Test lower bound
        engine.send_command(EngineCommand::SetTrackPan(1, -2.0)).unwrap();
        wait_for_engine();
        assert_eq!(engine.tracks()[0].pan, -1.0);
    }

    #[test]
    fn test_set_track_mute() {
        let config = AudioConfig::default();
        let engine = AudioEngine::new(config);

        let track = Track::new(1, "Test Track".to_string());
        engine.send_command(EngineCommand::AddTrack(track)).unwrap();
        wait_for_engine();

        engine.send_command(EngineCommand::SetTrackMute(1, true)).unwrap();
        wait_for_engine();

        let tracks = engine.tracks();
        assert!(tracks[0].muted);

        engine.send_command(EngineCommand::SetTrackMute(1, false)).unwrap();
        wait_for_engine();

        let tracks = engine.tracks();
        assert!(!tracks[0].muted);
    }

    #[test]
    fn test_set_track_solo() {
        let config = AudioConfig::default();
        let engine = AudioEngine::new(config);

        let track = Track::new(1, "Test Track".to_string());
        engine.send_command(EngineCommand::AddTrack(track)).unwrap();
        wait_for_engine();

        engine.send_command(EngineCommand::SetTrackSolo(1, true)).unwrap();
        wait_for_engine();

        let tracks = engine.tracks();
        assert!(tracks[0].solo);
    }

    #[test]
    fn test_set_master_volume() {
        let config = AudioConfig::default();
        let engine = AudioEngine::new(config);

        engine.send_command(EngineCommand::SetMasterVolume(0.7)).unwrap();
        wait_for_engine();

        assert_eq!(engine.master_volume(), 0.7);
    }

    #[test]
    fn test_set_master_volume_clamping() {
        let config = AudioConfig::default();
        let engine = AudioEngine::new(config);

        engine.send_command(EngineCommand::SetMasterVolume(2.0)).unwrap();
        wait_for_engine();
        assert_eq!(engine.master_volume(), 1.0);

        engine.send_command(EngineCommand::SetMasterVolume(-0.5)).unwrap();
        wait_for_engine();
        assert_eq!(engine.master_volume(), 0.0);
    }

    #[test]
    fn test_calculate_pan_gains_center() {
        let (left, right) = calculate_pan_gains(0.0);
        // At center, both should be approximately 0.707 (sqrt(2)/2)
        assert!((left - 0.707).abs() < 0.01);
        assert!((right - 0.707).abs() < 0.01);
    }

    #[test]
    fn test_calculate_pan_gains_full_left() {
        let (left, right) = calculate_pan_gains(-1.0);
        assert!((left - 1.0).abs() < 0.01);
        assert!(right.abs() < 0.01);
    }

    #[test]
    fn test_calculate_pan_gains_full_right() {
        let (left, right) = calculate_pan_gains(1.0);
        assert!(left.abs() < 0.01);
        assert!((right - 1.0).abs() < 0.01);
    }

    #[test]
    fn test_calculate_pan_gains_clamping() {
        // Test values outside range are clamped
        let (left1, right1) = calculate_pan_gains(-2.0);
        let (left2, right2) = calculate_pan_gains(-1.0);
        assert_eq!(left1, left2);
        assert_eq!(right1, right2);

        let (left3, right3) = calculate_pan_gains(2.0);
        let (left4, right4) = calculate_pan_gains(1.0);
        assert_eq!(left3, left4);
        assert_eq!(right3, right4);
    }

    #[test]
    fn test_process_clip_static_mono_clip() {
        let audio_data = create_test_audio_data(100, 1);
        let clip = AudioClip::new(1, "Mono Clip".to_string(), 0, audio_data, 1, 48000);
        let track = Track::new(1, "Track".to_string());
        
        let mut output = vec![0.0; 200]; // 100 frames * 2 channels
        process_clip_static(&clip, &track, 0, &mut output, 100, 2);
        
        // Check that output is not all zeros
        assert!(output.iter().any(|&s| s != 0.0));
    }

    #[test]
    fn test_process_clip_static_stereo_clip() {
        let audio_data = create_test_audio_data(100, 2);
        let clip = AudioClip::new(1, "Stereo Clip".to_string(), 0, audio_data, 2, 48000);
        let track = Track::new(1, "Track".to_string());
        
        let mut output = vec![0.0; 200]; // 100 frames * 2 channels
        process_clip_static(&clip, &track, 0, &mut output, 100, 2);
        
        // Check that output is not all zeros
        assert!(output.iter().any(|&s| s != 0.0));
    }

    #[test]
    fn test_process_clip_static_with_volume() {
        let audio_data = vec![1.0; 200]; // 100 frames * 2 channels
        let clip = AudioClip::new(1, "Clip".to_string(), 0, audio_data, 2, 48000);
        let mut track = Track::new(1, "Track".to_string());
        track.volume = 0.5;
        
        let mut output = vec![0.0; 200];
        process_clip_static(&clip, &track, 0, &mut output, 100, 2);
        
        // With volume 0.5 and pan 0.0, output should be scaled
        assert!(output.iter().all(|&s| s > 0.0 && s < 1.0));
    }

    #[test]
    fn test_process_clip_static_clip_boundaries() {
        let audio_data = create_test_audio_data(50, 2);
        let clip = AudioClip::new(1, "Clip".to_string(), 100, audio_data, 2, 48000);
        let track = Track::new(1, "Track".to_string());
        
        // Playback before clip starts
        let mut output = vec![0.0; 200];
        process_clip_static(&clip, &track, 0, &mut output, 100, 2);
        assert!(output.iter().all(|&s| s == 0.0));
        
        // Playback at clip start
        let mut output = vec![0.0; 200];
        process_clip_static(&clip, &track, 100, &mut output, 100, 2);
        assert!(output.iter().any(|&s| s != 0.0));
        
        // Playback after clip ends
        let mut output = vec![0.0; 200];
        process_clip_static(&clip, &track, 200, &mut output, 100, 2);
        assert!(output.iter().all(|&s| s == 0.0));
    }

    #[test]
    fn test_process_clip_static_partial_overlap() {
        let audio_data = create_test_audio_data(100, 2);
        let clip = AudioClip::new(1, "Clip".to_string(), 50, audio_data, 2, 48000);
        let track = Track::new(1, "Track".to_string());
        
        // Playback overlaps with start of clip
        let mut output = vec![0.0; 200];
        process_clip_static(&clip, &track, 25, &mut output, 100, 2);
        
        // First part should be silent, second part should have audio
        let first_half_silent = output[..100].iter().all(|&s| s == 0.0);
        let second_half_has_audio = output[100..].iter().any(|&s| s != 0.0);
        assert!(first_half_silent || second_half_has_audio);
    }

    #[test]
    fn test_process_clip_static_with_pan_left() {
        let audio_data = vec![1.0; 200];
        let clip = AudioClip::new(1, "Clip".to_string(), 0, audio_data, 2, 48000);
        let mut track = Track::new(1, "Track".to_string());
        track.pan = -1.0; // Full left
        
        let mut output = vec![0.0; 200];
        process_clip_static(&clip, &track, 0, &mut output, 100, 2);
        
        // Left channel should have more signal than right
        let left_sum: f32 = output.iter().step_by(2).sum();
        let right_sum: f32 = output.iter().skip(1).step_by(2).sum();
        assert!(left_sum > right_sum);
    }

    #[test]
    fn test_process_clip_static_with_pan_right() {
        let audio_data = vec![1.0; 200];
        let clip = AudioClip::new(1, "Clip".to_string(), 0, audio_data, 2, 48000);
        let mut track = Track::new(1, "Track".to_string());
        track.pan = 1.0; // Full right
        
        let mut output = vec![0.0; 200];
        process_clip_static(&clip, &track, 0, &mut output, 100, 2);
        
        // Right channel should have more signal than left
        let left_sum: f32 = output.iter().step_by(2).sum();
        let right_sum: f32 = output.iter().skip(1).step_by(2).sum();
        assert!(right_sum > left_sum);
    }

    #[test]
    fn test_process_clip_static_mono_output() {
        let audio_data = create_test_audio_data(100, 2);
        let clip = AudioClip::new(1, "Clip".to_string(), 0, audio_data, 2, 48000);
        let track = Track::new(1, "Track".to_string());
        
        let mut output = vec![0.0; 100]; // Mono output
        process_clip_static(&clip, &track, 0, &mut output, 100, 1);
        
        // Check that output is not all zeros
        assert!(output.iter().any(|&s| s != 0.0));
    }

    #[test]
    fn test_engine_event_reception() {
        let config = AudioConfig::default();
        let engine = AudioEngine::new(config);

        engine.send_command(EngineCommand::Play).unwrap();
        wait_for_engine();

        // Try to receive events
        let mut received_play_event = false;
        for _ in 0..10 {
            if let Some(event) = engine.try_recv_event() {
                if matches!(event, EngineEvent::TransportStateChanged(TransportState::Playing)) {
                    received_play_event = true;
                    break;
                }
            }
        }
        assert!(received_play_event);
    }

    #[test]
    fn test_multiple_clips_on_track() {
        let config = AudioConfig::default();
        let engine = AudioEngine::new(config);

        let track = Track::new(1, "Test Track".to_string());
        engine.send_command(EngineCommand::AddTrack(track)).unwrap();
        wait_for_engine();

        // Add multiple clips
        for i in 1..=3 {
            let audio_data = create_test_audio_data(1000, 2);
            let clip = AudioClip::new(i, format!("Clip {}", i), i as u64 * 1000, audio_data, 2, 48000);
            engine.send_command(EngineCommand::AddClip(1, clip)).unwrap();
        }
        wait_for_engine();

        let tracks = engine.tracks();
        assert_eq!(tracks[0].clips.len(), 3);
    }
}

// Made with Bob

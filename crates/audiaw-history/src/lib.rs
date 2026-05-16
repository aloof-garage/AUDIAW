//! # AUDIAW History
//!
//! Undo/redo functionality for AUDIAW using the Command pattern.
//! Provides a history manager and undoable commands for all editing operations.

use audiaw_types::*;
use serde::{Deserialize, Serialize};
use std::collections::VecDeque;
use thiserror::Error;

/// Maximum number of undo actions to keep in history
const MAX_HISTORY_SIZE: usize = 100;

/// Errors that can occur during history operations
#[derive(Debug, Error)]
pub enum HistoryError {
    #[error("No action to undo")]
    NothingToUndo,
    #[error("No action to redo")]
    NothingToRedo,
    #[error("Command execution failed: {0}")]
    ExecutionFailed(String),
    #[error("Track not found: {0}")]
    TrackNotFound(TrackId),
    #[error("Clip not found: {0}")]
    ClipNotFound(ClipId),
}

pub type HistoryResult<T> = Result<T, HistoryError>;

/// Trait for undoable commands
pub trait Command: Send + Sync {
    /// Execute the command, modifying the engine state
    fn execute(&mut self, state: &mut EngineState) -> HistoryResult<()>;
    
    /// Undo the command, reverting the engine state
    fn undo(&mut self, state: &mut EngineState) -> HistoryResult<()>;
    
    /// Get a human-readable description of the command
    fn description(&self) -> String;
    
    /// Clone the command into a Box
    fn box_clone(&self) -> Box<dyn Command>;
}

/// Engine state that can be modified by commands
#[derive(Debug, Clone)]
pub struct EngineState {
    pub tracks: Vec<Track>,
    pub master_volume: f32,
}

impl EngineState {
    pub fn new() -> Self {
        Self {
            tracks: Vec::new(),
            master_volume: 1.0,
        }
    }
    
    /// Find a track by ID
    pub fn find_track(&self, track_id: TrackId) -> Option<&Track> {
        self.tracks.iter().find(|t| t.id == track_id)
    }
    
    /// Find a mutable track by ID
    pub fn find_track_mut(&mut self, track_id: TrackId) -> Option<&mut Track> {
        self.tracks.iter_mut().find(|t| t.id == track_id)
    }
}

impl Default for EngineState {
    fn default() -> Self {
        Self::new()
    }
}

/// Command to add a track
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct AddTrackCommand {
    pub track: Track,
}

impl AddTrackCommand {
    pub fn new(track: Track) -> Self {
        Self { track }
    }
}

impl Command for AddTrackCommand {
    fn execute(&mut self, state: &mut EngineState) -> HistoryResult<()> {
        state.tracks.push(self.track.clone());
        Ok(())
    }
    
    fn undo(&mut self, state: &mut EngineState) -> HistoryResult<()> {
        state.tracks.retain(|t| t.id != self.track.id);
        Ok(())
    }
    
    fn description(&self) -> String {
        format!("Add Track '{}'", self.track.name)
    }
    
    fn box_clone(&self) -> Box<dyn Command> {
        Box::new(self.clone())
    }
}

/// Command to remove a track
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct RemoveTrackCommand {
    pub track_id: TrackId,
    pub removed_track: Option<Track>,
}

impl RemoveTrackCommand {
    pub fn new(track_id: TrackId) -> Self {
        Self {
            track_id,
            removed_track: None,
        }
    }
}

impl Command for RemoveTrackCommand {
    fn execute(&mut self, state: &mut EngineState) -> HistoryResult<()> {
        let index = state.tracks.iter().position(|t| t.id == self.track_id)
            .ok_or(HistoryError::TrackNotFound(self.track_id))?;
        
        self.removed_track = Some(state.tracks.remove(index));
        Ok(())
    }
    
    fn undo(&mut self, state: &mut EngineState) -> HistoryResult<()> {
        if let Some(track) = self.removed_track.take() {
            state.tracks.push(track);
            Ok(())
        } else {
            Err(HistoryError::ExecutionFailed("No track to restore".to_string()))
        }
    }
    
    fn description(&self) -> String {
        if let Some(track) = &self.removed_track {
            format!("Remove Track '{}'", track.name)
        } else {
            format!("Remove Track {}", self.track_id)
        }
    }
    
    fn box_clone(&self) -> Box<dyn Command> {
        Box::new(self.clone())
    }
}

/// Command to add a clip to a track
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct AddClipCommand {
    pub track_id: TrackId,
    pub clip: AudioClip,
}

impl AddClipCommand {
    pub fn new(track_id: TrackId, clip: AudioClip) -> Self {
        Self { track_id, clip }
    }
}

impl Command for AddClipCommand {
    fn execute(&mut self, state: &mut EngineState) -> HistoryResult<()> {
        let track = state.find_track_mut(self.track_id)
            .ok_or(HistoryError::TrackNotFound(self.track_id))?;
        
        track.add_clip(self.clip.clone());
        Ok(())
    }
    
    fn undo(&mut self, state: &mut EngineState) -> HistoryResult<()> {
        let track = state.find_track_mut(self.track_id)
            .ok_or(HistoryError::TrackNotFound(self.track_id))?;
        
        track.clips.retain(|c| c.id != self.clip.id);
        Ok(())
    }
    
    fn description(&self) -> String {
        format!("Add Clip '{}'", self.clip.name)
    }
    
    fn box_clone(&self) -> Box<dyn Command> {
        Box::new(self.clone())
    }
}

/// Command to remove a clip from a track
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct RemoveClipCommand {
    pub track_id: TrackId,
    pub clip_id: ClipId,
    pub removed_clip: Option<AudioClip>,
}

impl RemoveClipCommand {
    pub fn new(track_id: TrackId, clip_id: ClipId) -> Self {
        Self {
            track_id,
            clip_id,
            removed_clip: None,
        }
    }
}

impl Command for RemoveClipCommand {
    fn execute(&mut self, state: &mut EngineState) -> HistoryResult<()> {
        let track = state.find_track_mut(self.track_id)
            .ok_or(HistoryError::TrackNotFound(self.track_id))?;
        
        let index = track.clips.iter().position(|c| c.id == self.clip_id)
            .ok_or(HistoryError::ClipNotFound(self.clip_id))?;
        
        self.removed_clip = Some(track.clips.remove(index));
        Ok(())
    }
    
    fn undo(&mut self, state: &mut EngineState) -> HistoryResult<()> {
        let track = state.find_track_mut(self.track_id)
            .ok_or(HistoryError::TrackNotFound(self.track_id))?;
        
        if let Some(clip) = self.removed_clip.take() {
            track.clips.push(clip);
            Ok(())
        } else {
            Err(HistoryError::ExecutionFailed("No clip to restore".to_string()))
        }
    }
    
    fn description(&self) -> String {
        if let Some(clip) = &self.removed_clip {
            format!("Remove Clip '{}'", clip.name)
        } else {
            format!("Remove Clip {}", self.clip_id)
        }
    }
    
    fn box_clone(&self) -> Box<dyn Command> {
        Box::new(self.clone())
    }
}

/// Command to move a clip
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct MoveClipCommand {
    pub track_id: TrackId,
    pub clip_id: ClipId,
    pub old_position: SamplePosition,
    pub new_position: SamplePosition,
}

impl MoveClipCommand {
    pub fn new(track_id: TrackId, clip_id: ClipId, old_position: SamplePosition, new_position: SamplePosition) -> Self {
        Self {
            track_id,
            clip_id,
            old_position,
            new_position,
        }
    }
}

impl Command for MoveClipCommand {
    fn execute(&mut self, state: &mut EngineState) -> HistoryResult<()> {
        let track = state.find_track_mut(self.track_id)
            .ok_or(HistoryError::TrackNotFound(self.track_id))?;
        
        let clip = track.clips.iter_mut().find(|c| c.id == self.clip_id)
            .ok_or(HistoryError::ClipNotFound(self.clip_id))?;
        
        clip.start_position = self.new_position;
        Ok(())
    }
    
    fn undo(&mut self, state: &mut EngineState) -> HistoryResult<()> {
        let track = state.find_track_mut(self.track_id)
            .ok_or(HistoryError::TrackNotFound(self.track_id))?;
        
        let clip = track.clips.iter_mut().find(|c| c.id == self.clip_id)
            .ok_or(HistoryError::ClipNotFound(self.clip_id))?;
        
        clip.start_position = self.old_position;
        Ok(())
    }
    
    fn description(&self) -> String {
        format!("Move Clip")
    }
    
    fn box_clone(&self) -> Box<dyn Command> {
        Box::new(self.clone())
    }
}

/// Command to set track volume
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SetTrackVolumeCommand {
    pub track_id: TrackId,
    pub old_volume: f32,
    pub new_volume: f32,
}

impl SetTrackVolumeCommand {
    pub fn new(track_id: TrackId, old_volume: f32, new_volume: f32) -> Self {
        Self {
            track_id,
            old_volume,
            new_volume,
        }
    }
}

impl Command for SetTrackVolumeCommand {
    fn execute(&mut self, state: &mut EngineState) -> HistoryResult<()> {
        let track = state.find_track_mut(self.track_id)
            .ok_or(HistoryError::TrackNotFound(self.track_id))?;
        
        track.volume = self.new_volume;
        Ok(())
    }
    
    fn undo(&mut self, state: &mut EngineState) -> HistoryResult<()> {
        let track = state.find_track_mut(self.track_id)
            .ok_or(HistoryError::TrackNotFound(self.track_id))?;
        
        track.volume = self.old_volume;
        Ok(())
    }
    
    fn description(&self) -> String {
        format!("Set Track Volume")
    }
    
    fn box_clone(&self) -> Box<dyn Command> {
        Box::new(self.clone())
    }
}

/// Command to set track pan
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SetTrackPanCommand {
    pub track_id: TrackId,
    pub old_pan: f32,
    pub new_pan: f32,
}

impl SetTrackPanCommand {
    pub fn new(track_id: TrackId, old_pan: f32, new_pan: f32) -> Self {
        Self {
            track_id,
            old_pan,
            new_pan,
        }
    }
}

impl Command for SetTrackPanCommand {
    fn execute(&mut self, state: &mut EngineState) -> HistoryResult<()> {
        let track = state.find_track_mut(self.track_id)
            .ok_or(HistoryError::TrackNotFound(self.track_id))?;
        
        track.pan = self.new_pan;
        Ok(())
    }
    
    fn undo(&mut self, state: &mut EngineState) -> HistoryResult<()> {
        let track = state.find_track_mut(self.track_id)
            .ok_or(HistoryError::TrackNotFound(self.track_id))?;
        
        track.pan = self.old_pan;
        Ok(())
    }
    
    fn description(&self) -> String {
        format!("Set Track Pan")
    }
    
    fn box_clone(&self) -> Box<dyn Command> {
        Box::new(self.clone())
    }
}

/// History manager for undo/redo functionality
pub struct HistoryManager {
    /// Stack of executed commands (for undo)
    undo_stack: VecDeque<Box<dyn Command>>,
    /// Stack of undone commands (for redo)
    redo_stack: VecDeque<Box<dyn Command>>,
    /// Maximum history size
    max_size: usize,
    /// Current transaction (for grouping commands)
    current_transaction: Option<Vec<Box<dyn Command>>>,
}

impl HistoryManager {
    /// Create a new history manager
    pub fn new() -> Self {
        Self::with_capacity(MAX_HISTORY_SIZE)
    }
    
    /// Create a new history manager with custom capacity
    pub fn with_capacity(max_size: usize) -> Self {
        Self {
            undo_stack: VecDeque::with_capacity(max_size),
            redo_stack: VecDeque::with_capacity(max_size),
            max_size,
            current_transaction: None,
        }
    }
    
    /// Execute a command and add it to history
    pub fn execute(&mut self, mut command: Box<dyn Command>, state: &mut EngineState) -> HistoryResult<()> {
        command.execute(state)?;
        
        // If we're in a transaction, add to transaction instead of undo stack
        if let Some(transaction) = &mut self.current_transaction {
            transaction.push(command);
        } else {
            self.add_to_undo_stack(command);
        }
        
        // Clear redo stack when new command is executed
        self.redo_stack.clear();
        
        Ok(())
    }
    
    /// Undo the last command
    pub fn undo(&mut self, state: &mut EngineState) -> HistoryResult<()> {
        let mut command = self.undo_stack.pop_back()
            .ok_or(HistoryError::NothingToUndo)?;
        
        command.undo(state)?;
        self.redo_stack.push_back(command);
        
        Ok(())
    }
    
    /// Redo the last undone command
    pub fn redo(&mut self, state: &mut EngineState) -> HistoryResult<()> {
        let mut command = self.redo_stack.pop_back()
            .ok_or(HistoryError::NothingToRedo)?;
        
        command.execute(state)?;
        self.add_to_undo_stack(command);
        
        Ok(())
    }
    
    /// Check if undo is available
    pub fn can_undo(&self) -> bool {
        !self.undo_stack.is_empty()
    }
    
    /// Check if redo is available
    pub fn can_redo(&self) -> bool {
        !self.redo_stack.is_empty()
    }
    
    /// Get description of the command that would be undone
    pub fn undo_description(&self) -> Option<String> {
        self.undo_stack.back().map(|cmd| cmd.description())
    }
    
    /// Get description of the command that would be redone
    pub fn redo_description(&self) -> Option<String> {
        self.redo_stack.back().map(|cmd| cmd.description())
    }
    
    /// Begin a transaction (group multiple commands)
    pub fn begin_transaction(&mut self) {
        self.current_transaction = Some(Vec::new());
    }
    
    /// End a transaction and add all commands as a single undo action
    pub fn end_transaction(&mut self) {
        if let Some(commands) = self.current_transaction.take() {
            if !commands.is_empty() {
                let transaction = Box::new(TransactionCommand::new(commands));
                self.add_to_undo_stack(transaction);
            }
        }
    }
    
    /// Cancel the current transaction without adding to history
    pub fn cancel_transaction(&mut self) {
        self.current_transaction = None;
    }
    
    /// Clear all history
    pub fn clear(&mut self) {
        self.undo_stack.clear();
        self.redo_stack.clear();
        self.current_transaction = None;
    }
    
    /// Add command to undo stack, maintaining max size
    fn add_to_undo_stack(&mut self, command: Box<dyn Command>) {
        if self.undo_stack.len() >= self.max_size {
            self.undo_stack.pop_front();
        }
        self.undo_stack.push_back(command);
    }
}

impl Default for HistoryManager {
    fn default() -> Self {
        Self::new()
    }
}

/// Transaction command that groups multiple commands
struct TransactionCommand {
    commands: Vec<Box<dyn Command>>,
}

impl TransactionCommand {
    fn new(commands: Vec<Box<dyn Command>>) -> Self {
        Self { commands }
    }
}

impl Command for TransactionCommand {
    fn execute(&mut self, state: &mut EngineState) -> HistoryResult<()> {
        for command in &mut self.commands {
            command.execute(state)?;
        }
        Ok(())
    }
    
    fn undo(&mut self, state: &mut EngineState) -> HistoryResult<()> {
        // Undo in reverse order
        for command in self.commands.iter_mut().rev() {
            command.undo(state)?;
        }
        Ok(())
    }
    
    fn description(&self) -> String {
        if self.commands.len() == 1 {
            self.commands[0].description()
        } else {
            format!("{} actions", self.commands.len())
        }
    }
    
    fn box_clone(&self) -> Box<dyn Command> {
        Box::new(Self {
            commands: self.commands.iter().map(|c| c.box_clone()).collect(),
        })
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_add_track_command() {
        let mut state = EngineState::new();
        let track = Track::new(1, "Test Track".to_string());
        let mut cmd = AddTrackCommand::new(track.clone());
        
        cmd.execute(&mut state).unwrap();
        assert_eq!(state.tracks.len(), 1);
        assert_eq!(state.tracks[0].name, "Test Track");
        
        cmd.undo(&mut state).unwrap();
        assert_eq!(state.tracks.len(), 0);
    }
    
    #[test]
    fn test_remove_track_command() {
        let mut state = EngineState::new();
        let track = Track::new(1, "Test Track".to_string());
        state.tracks.push(track);
        
        let mut cmd = RemoveTrackCommand::new(1);
        cmd.execute(&mut state).unwrap();
        assert_eq!(state.tracks.len(), 0);
        
        cmd.undo(&mut state).unwrap();
        assert_eq!(state.tracks.len(), 1);
        assert_eq!(state.tracks[0].name, "Test Track");
    }
    
    #[test]
    fn test_history_manager_undo_redo() {
        let mut manager = HistoryManager::new();
        let mut state = EngineState::new();
        
        let track = Track::new(1, "Test Track".to_string());
        let cmd = Box::new(AddTrackCommand::new(track));
        
        manager.execute(cmd, &mut state).unwrap();
        assert_eq!(state.tracks.len(), 1);
        assert!(manager.can_undo());
        assert!(!manager.can_redo());
        
        manager.undo(&mut state).unwrap();
        assert_eq!(state.tracks.len(), 0);
        assert!(!manager.can_undo());
        assert!(manager.can_redo());
        
        manager.redo(&mut state).unwrap();
        assert_eq!(state.tracks.len(), 1);
        assert!(manager.can_undo());
        assert!(!manager.can_redo());
    }
    
    #[test]
    fn test_history_manager_max_size() {
        let mut manager = HistoryManager::with_capacity(2);
        let mut state = EngineState::new();
        
        for i in 1..=3 {
            let track = Track::new(i, format!("Track {}", i));
            let cmd = Box::new(AddTrackCommand::new(track));
            manager.execute(cmd, &mut state).unwrap();
        }
        
        // Should only be able to undo 2 times (max size)
        manager.undo(&mut state).unwrap();
        manager.undo(&mut state).unwrap();
        assert!(manager.undo(&mut state).is_err());
    }
    
    #[test]
    fn test_transaction() {
        let mut manager = HistoryManager::new();
        let mut state = EngineState::new();
        
        manager.begin_transaction();
        
        let track1 = Track::new(1, "Track 1".to_string());
        let cmd1 = Box::new(AddTrackCommand::new(track1));
        manager.execute(cmd1, &mut state).unwrap();
        
        let track2 = Track::new(2, "Track 2".to_string());
        let cmd2 = Box::new(AddTrackCommand::new(track2));
        manager.execute(cmd2, &mut state).unwrap();
        
        manager.end_transaction();
        
        assert_eq!(state.tracks.len(), 2);
        
        // Single undo should undo both commands
        manager.undo(&mut state).unwrap();
        assert_eq!(state.tracks.len(), 0);
        
        // Single redo should redo both commands
        manager.redo(&mut state).unwrap();
        assert_eq!(state.tracks.len(), 2);
    }
}

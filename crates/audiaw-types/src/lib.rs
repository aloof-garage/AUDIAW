//! # AUDIAW Types
//!
//! Shared type definitions for the AUDIAW audio engine.
//! This crate provides core data structures used across all AUDIAW components.

use serde::{Deserialize, Serialize};
use std::sync::Arc;

/// Sample rate in Hz (e.g., 44100, 48000)
pub type SampleRate = u32;

/// Audio sample value (32-bit float, range -1.0 to 1.0)
pub type Sample = f32;

/// Time position in samples
pub type SamplePosition = u64;

/// Time position in seconds
pub type TimeSeconds = f64;

/// Unique identifier for tracks
pub type TrackId = u32;

/// Unique identifier for clips
pub type ClipId = u32;

/// Audio buffer containing interleaved samples
pub type AudioBuffer = Vec<Sample>;

/// Shared reference to an audio buffer (for zero-copy sharing)
pub type SharedAudioBuffer = Arc<Vec<Sample>>;

/// Transport state of the audio engine
#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
pub enum TransportState {
    /// Engine is stopped
    Stopped,
    /// Engine is playing
    Playing,
    /// Engine is recording
    Recording,
    /// Engine is paused
    Paused,
}

/// Audio file metadata
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct AudioMetadata {
    /// Sample rate in Hz
    pub sample_rate: SampleRate,
    /// Number of channels
    pub channels: usize,
    /// Duration in samples
    pub duration_samples: SamplePosition,
    /// Duration in seconds
    pub duration_seconds: TimeSeconds,
    /// File format (e.g., "WAV", "MP3")
    pub format: String,
    /// Bit depth (if applicable)
    pub bit_depth: Option<u32>,
}

/// Audio clip containing audio data and metadata
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct AudioClip {
    /// Unique identifier
    pub id: ClipId,
    /// Clip name
    pub name: String,
    /// Original file path (if imported from file)
    pub file_path: Option<String>,
    /// Start position in samples (relative to track)
    pub start_position: SamplePosition,
    /// Length in samples
    pub length: SamplePosition,
    /// Audio data (shared reference for efficiency)
    #[serde(skip)]
    pub audio_data: SharedAudioBuffer,
    /// Number of channels
    pub channels: usize,
    /// Sample rate
    pub sample_rate: SampleRate,
    /// Volume (0.0 to 1.0, default 1.0)
    pub volume: f32,
    /// Muted state
    pub muted: bool,
}

impl AudioClip {
    /// Create a new audio clip
    pub fn new(
        id: ClipId,
        name: String,
        start_position: SamplePosition,
        audio_data: Vec<Sample>,
        channels: usize,
        sample_rate: SampleRate,
    ) -> Self {
        let length = (audio_data.len() / channels) as SamplePosition;
        Self {
            id,
            name,
            file_path: None,
            start_position,
            length,
            audio_data: Arc::new(audio_data),
            channels,
            sample_rate,
            volume: 1.0,
            muted: false,
        }
    }

    /// Create a new audio clip from an imported file
    pub fn from_file(
        id: ClipId,
        name: String,
        file_path: String,
        start_position: SamplePosition,
        audio_data: Vec<Sample>,
        channels: usize,
        sample_rate: SampleRate,
    ) -> Self {
        let length = (audio_data.len() / channels) as SamplePosition;
        Self {
            id,
            name,
            file_path: Some(file_path),
            start_position,
            length,
            audio_data: Arc::new(audio_data),
            channels,
            sample_rate,
            volume: 1.0,
            muted: false,
        }
    }
}

/// Audio track containing multiple clips
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Track {
    /// Unique identifier
    pub id: TrackId,
    /// Track name
    pub name: String,
    /// Audio clips on this track
    pub clips: Vec<AudioClip>,
    /// Track volume (0.0 to 1.0, default 1.0)
    pub volume: f32,
    /// Track pan (-1.0 left to 1.0 right, default 0.0)
    pub pan: f32,
    /// Muted state
    pub muted: bool,
    /// Solo state
    pub solo: bool,
    /// Armed for recording
    pub armed: bool,
    /// Effects chain (serializable effect instances)
    #[serde(default)]
    pub effects: Vec<serde_json::Value>,
}

impl Track {
    /// Create a new empty track
    pub fn new(id: TrackId, name: String) -> Self {
        Self {
            id,
            name,
            clips: Vec::new(),
            volume: 1.0,
            pan: 0.0,
            muted: false,
            solo: false,
            armed: false,
            effects: Vec::new(),
        }
    }

    /// Add a clip to the track
    pub fn add_clip(&mut self, clip: AudioClip) {
        self.clips.push(clip);
    }

    /// Remove a clip by ID
    pub fn remove_clip(&mut self, clip_id: ClipId) {
        self.clips.retain(|c| c.id != clip_id);
    }
}

/// Audio engine configuration
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct AudioConfig {
    /// Sample rate in Hz
    pub sample_rate: SampleRate,
    /// Buffer size in samples
    pub buffer_size: usize,
    /// Number of output channels
    pub output_channels: usize,
    /// Number of input channels
    pub input_channels: usize,
}

impl Default for AudioConfig {
    fn default() -> Self {
        Self {
            sample_rate: 48000,
            buffer_size: 512,
            output_channels: 2,
            input_channels: 2,
        }
    }
}

/// Project metadata
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ProjectMetadata {
    /// Project name
    pub name: String,
    /// Project author
    pub author: String,
    /// Creation timestamp
    pub created_at: String,
    /// Last modified timestamp
    pub modified_at: String,
    /// Project version
    pub version: String,
}

impl Default for ProjectMetadata {
    fn default() -> Self {
        let now = chrono::Utc::now().to_rfc3339();
        Self {
            name: "Untitled Project".to_string(),
            author: "AUDIAW User".to_string(),
            created_at: now.clone(),
            modified_at: now,
            version: "0.1.0".to_string(),
        }
    }
}

/// Error types for AUDIAW operations
#[derive(Debug, thiserror::Error)]
pub enum AudioError {
    /// Audio I/O error
    #[error("Audio I/O error: {0}")]
    IoError(String),

    /// Invalid audio format
    #[error("Invalid audio format: {0}")]
    InvalidFormat(String),

    /// Buffer underrun/overrun
    #[error("Buffer error: {0}")]
    BufferError(String),

    /// Track not found
    #[error("Track not found: {0}")]
    TrackNotFound(TrackId),

    /// Clip not found
    #[error("Clip not found: {0}")]
    ClipNotFound(ClipId),

    /// Generic error
    #[error("Audio error: {0}")]
    Generic(String),

    /// Export error
    #[error("Export error: {0}")]
    ExportError(String),
}

/// Result type for AUDIAW operations
pub type AudioResult<T> = Result<T, AudioError>;

/// Bit depth options for audio export
#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
pub enum ExportBitDepth {
    /// 16-bit integer PCM
    I16,
    /// 24-bit integer PCM
    I24,
    /// 32-bit float PCM
    F32,
}

/// Audio export settings
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ExportSettings {
    /// Output file path
    pub output_path: String,
    /// Sample rate (44100, 48000, 96000)
    pub sample_rate: u32,
    /// Bit depth
    pub bit_depth: ExportBitDepth,
    /// Start position in samples
    pub start_position: SamplePosition,
    /// End position in samples (None = end of project)
    pub end_position: Option<SamplePosition>,
    /// Normalize audio to target dB (None = no normalization)
    pub normalize_db: Option<f32>,
    /// Apply dither for bit depth reduction
    pub dither: bool,
}

impl Default for ExportSettings {
    fn default() -> Self {
        Self {
            output_path: String::new(),
            sample_rate: 48000,
            bit_depth: ExportBitDepth::I16,
            start_position: 0,
            end_position: None,
            normalize_db: Some(-0.1), // -0.1 dB default
            dither: true,
        }
    }
}

/// Export progress information
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ExportProgress {
    /// Current position in samples
    pub current_position: SamplePosition,
    /// Total samples to export
    pub total_samples: SamplePosition,
    /// Progress percentage (0.0 to 1.0)
    pub progress: f32,
    /// Estimated time remaining in seconds
    pub estimated_seconds_remaining: f32,
}

impl ExportProgress {
    /// Create new export progress
    pub fn new(current: SamplePosition, total: SamplePosition) -> Self {
        let progress = if total > 0 {
            current as f32 / total as f32
        } else {
            0.0
        };

        Self {
            current_position: current,
            total_samples: total,
            progress,
            estimated_seconds_remaining: 0.0,
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_track_creation() {
        let track = Track::new(1, "Track 1".to_string());
        assert_eq!(track.id, 1);
        assert_eq!(track.name, "Track 1");
        assert_eq!(track.volume, 1.0);
        assert_eq!(track.pan, 0.0);
        assert!(!track.muted);
    }

    #[test]
    fn test_audio_clip_creation() {
        let audio_data = vec![0.0; 1000];
        let clip = AudioClip::new(1, "Clip 1".to_string(), 0, audio_data, 2, 48000);
        assert_eq!(clip.id, 1);
        assert_eq!(clip.channels, 2);
        assert_eq!(clip.sample_rate, 48000);
        assert_eq!(clip.length, 500); // 1000 samples / 2 channels
    }

    #[test]
    fn test_track_add_remove_clip() {
        let mut track = Track::new(1, "Track 1".to_string());
        let audio_data = vec![0.0; 1000];
        let clip = AudioClip::new(1, "Clip 1".to_string(), 0, audio_data, 2, 48000);
        
        track.add_clip(clip);
        assert_eq!(track.clips.len(), 1);
        
        track.remove_clip(1);
        assert_eq!(track.clips.len(), 0);
    }
}

// Made with Bob

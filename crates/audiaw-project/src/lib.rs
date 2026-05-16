//! # AUDIAW Project
//!
//! Project file format and serialization for AUDIAW.
//! Handles saving and loading project files in JSON format.

use audiaw_types::*;
use serde::{Deserialize, Serialize};
use std::fs;
use std::path::Path;

/// AUDIAW project file format
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Project {
    /// Project metadata
    pub metadata: ProjectMetadata,
    /// Audio configuration
    pub config: AudioConfig,
    /// All tracks in the project
    pub tracks: Vec<Track>,
    /// Master volume
    pub master_volume: f32,
    /// Tempo (BPM)
    pub tempo: f32,
    /// Time signature numerator
    pub time_signature_numerator: u32,
    /// Time signature denominator
    pub time_signature_denominator: u32,
}

impl Project {
    /// Create a new empty project
    pub fn new(name: String) -> Self {
        let mut metadata = ProjectMetadata::default();
        metadata.name = name;

        Self {
            metadata,
            config: AudioConfig::default(),
            tracks: Vec::new(),
            master_volume: 1.0,
            tempo: 120.0,
            time_signature_numerator: 4,
            time_signature_denominator: 4,
        }
    }

    /// Add a track to the project
    pub fn add_track(&mut self, track: Track) {
        self.tracks.push(track);
        self.update_modified_time();
    }

    /// Remove a track by ID
    pub fn remove_track(&mut self, track_id: TrackId) -> AudioResult<()> {
        let initial_len = self.tracks.len();
        self.tracks.retain(|t| t.id != track_id);
        
        if self.tracks.len() == initial_len {
            return Err(AudioError::TrackNotFound(track_id));
        }
        
        self.update_modified_time();
        Ok(())
    }

    /// Get a track by ID
    pub fn get_track(&self, track_id: TrackId) -> Option<&Track> {
        self.tracks.iter().find(|t| t.id == track_id)
    }

    /// Get a mutable track by ID
    pub fn get_track_mut(&mut self, track_id: TrackId) -> Option<&mut Track> {
        self.tracks.iter_mut().find(|t| t.id == track_id)
    }

    /// Update the modified timestamp
    fn update_modified_time(&mut self) {
        self.metadata.modified_at = chrono::Utc::now().to_rfc3339();
    }

    /// Save project to file
    pub fn save<P: AsRef<Path>>(&mut self, path: P) -> AudioResult<()> {
        self.update_modified_time();

        let json = serde_json::to_string_pretty(self)
            .map_err(|e| AudioError::Generic(format!("Failed to serialize project: {}", e)))?;

        fs::write(path.as_ref(), json)
            .map_err(|e| AudioError::IoError(format!("Failed to write project file: {}", e)))?;

        Ok(())
    }

    /// Load project from file
    pub fn load<P: AsRef<Path>>(path: P) -> AudioResult<Self> {
        let json = fs::read_to_string(path.as_ref())
            .map_err(|e| AudioError::IoError(format!("Failed to read project file: {}", e)))?;

        let project: Project = serde_json::from_str(&json)
            .map_err(|e| AudioError::InvalidFormat(format!("Failed to parse project file: {}", e)))?;

        Ok(project)
    }

    /// Export project metadata as JSON string
    pub fn export_metadata(&self) -> AudioResult<String> {
        serde_json::to_string_pretty(&self.metadata)
            .map_err(|e| AudioError::Generic(format!("Failed to export metadata: {}", e)))
    }

    /// Get next available track ID
    pub fn next_track_id(&self) -> TrackId {
        self.tracks
            .iter()
            .map(|t| t.id)
            .max()
            .unwrap_or(0)
            + 1
    }

    /// Get next available clip ID across all tracks
    pub fn next_clip_id(&self) -> ClipId {
        self.tracks
            .iter()
            .flat_map(|track| track.clips.iter())
            .map(|clip| clip.id)
            .max()
            .unwrap_or(0)
            + 1
    }

    /// Get project duration in samples
    pub fn duration_samples(&self) -> SamplePosition {
        self.tracks
            .iter()
            .flat_map(|track| track.clips.iter())
            .map(|clip| clip.start_position + clip.length)
            .max()
            .unwrap_or(0)
    }

    /// Get project duration in seconds
    pub fn duration_seconds(&self) -> TimeSeconds {
        let samples = self.duration_samples();
        samples as f64 / self.config.sample_rate as f64
    }

    /// Validate project integrity
    pub fn validate(&self) -> AudioResult<()> {
        // Check for duplicate track IDs
        let mut track_ids = std::collections::HashSet::new();
        for track in &self.tracks {
            if !track_ids.insert(track.id) {
                return Err(AudioError::Generic(format!(
                    "Duplicate track ID: {}",
                    track.id
                )));
            }
        }

        // Check for duplicate clip IDs within tracks
        for track in &self.tracks {
            let mut clip_ids = std::collections::HashSet::new();
            for clip in &track.clips {
                if !clip_ids.insert(clip.id) {
                    return Err(AudioError::Generic(format!(
                        "Duplicate clip ID: {} in track {}",
                        clip.id, track.id
                    )));
                }
            }
        }

        Ok(())
    }
}

impl Default for Project {
    fn default() -> Self {
        Self::new("Untitled Project".to_string())
    }
}

/// Project builder for fluent API
pub struct ProjectBuilder {
    project: Project,
}

impl ProjectBuilder {
    /// Create a new project builder
    pub fn new(name: String) -> Self {
        Self {
            project: Project::new(name),
        }
    }

    /// Set project author
    pub fn author(mut self, author: String) -> Self {
        self.project.metadata.author = author;
        self
    }

    /// Set sample rate
    pub fn sample_rate(mut self, sample_rate: SampleRate) -> Self {
        self.project.config.sample_rate = sample_rate;
        self
    }

    /// Set tempo
    pub fn tempo(mut self, tempo: f32) -> Self {
        self.project.tempo = tempo;
        self
    }

    /// Set time signature
    pub fn time_signature(mut self, numerator: u32, denominator: u32) -> Self {
        self.project.time_signature_numerator = numerator;
        self.project.time_signature_denominator = denominator;
        self
    }

    /// Add a track
    pub fn add_track(mut self, track: Track) -> Self {
        self.project.tracks.push(track);
        self
    }

    /// Build the project
    pub fn build(self) -> Project {
        self.project
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use tempfile::NamedTempFile;

    /// Helper function to create test audio data
    fn create_test_audio_data(frames: usize, channels: usize) -> Vec<Sample> {
        vec![0.5; frames * channels]
    }

    #[test]
    fn test_project_creation() {
        let project = Project::new("Test Project".to_string());
        assert_eq!(project.metadata.name, "Test Project");
        assert_eq!(project.tracks.len(), 0);
        assert_eq!(project.tempo, 120.0);
        assert_eq!(project.master_volume, 1.0);
        assert_eq!(project.time_signature_numerator, 4);
        assert_eq!(project.time_signature_denominator, 4);
    }

    #[test]
    fn test_project_default() {
        let project = Project::default();
        assert_eq!(project.metadata.name, "Untitled Project");
        assert_eq!(project.tempo, 120.0);
        assert_eq!(project.config.sample_rate, 48000);
    }

    #[test]
    fn test_add_track() {
        let mut project = Project::new("Test Project".to_string());
        let track = Track::new(1, "Track 1".to_string());

        project.add_track(track);
        assert_eq!(project.tracks.len(), 1);
        assert_eq!(project.tracks[0].name, "Track 1");
        assert_eq!(project.tracks[0].id, 1);
    }

    #[test]
    fn test_add_multiple_tracks() {
        let mut project = Project::new("Test Project".to_string());
        
        for i in 1..=5 {
            let track = Track::new(i, format!("Track {}", i));
            project.add_track(track);
        }

        assert_eq!(project.tracks.len(), 5);
        assert_eq!(project.tracks[0].name, "Track 1");
        assert_eq!(project.tracks[4].name, "Track 5");
    }

    #[test]
    fn test_remove_track() {
        let mut project = Project::new("Test Project".to_string());
        let track = Track::new(1, "Track 1".to_string());

        project.add_track(track);
        assert_eq!(project.tracks.len(), 1);

        project.remove_track(1).unwrap();
        assert_eq!(project.tracks.len(), 0);
    }

    #[test]
    fn test_remove_nonexistent_track() {
        let mut project = Project::new("Test Project".to_string());
        let result = project.remove_track(999);
        
        assert!(result.is_err());
        match result {
            Err(AudioError::TrackNotFound(id)) => assert_eq!(id, 999),
            _ => panic!("Expected TrackNotFound error"),
        }
    }

    #[test]
    fn test_get_track() {
        let mut project = Project::new("Test Project".to_string());
        let track = Track::new(1, "Track 1".to_string());
        project.add_track(track);

        let found_track = project.get_track(1);
        assert!(found_track.is_some());
        assert_eq!(found_track.unwrap().name, "Track 1");

        let not_found = project.get_track(999);
        assert!(not_found.is_none());
    }

    #[test]
    fn test_get_track_mut() {
        let mut project = Project::new("Test Project".to_string());
        let track = Track::new(1, "Track 1".to_string());
        project.add_track(track);

        if let Some(track) = project.get_track_mut(1) {
            track.name = "Modified Track".to_string();
            track.volume = 0.5;
        }

        assert_eq!(project.tracks[0].name, "Modified Track");
        assert_eq!(project.tracks[0].volume, 0.5);
    }

    #[test]
    fn test_next_track_id_empty() {
        let project = Project::new("Test Project".to_string());
        assert_eq!(project.next_track_id(), 1);
    }

    #[test]
    fn test_next_track_id_sequential() {
        let mut project = Project::new("Test Project".to_string());
        assert_eq!(project.next_track_id(), 1);

        project.add_track(Track::new(1, "Track 1".to_string()));
        assert_eq!(project.next_track_id(), 2);

        project.add_track(Track::new(2, "Track 2".to_string()));
        assert_eq!(project.next_track_id(), 3);
    }

    #[test]
    fn test_next_track_id_gaps() {
        let mut project = Project::new("Test Project".to_string());
        
        project.add_track(Track::new(1, "Track 1".to_string()));
        project.add_track(Track::new(5, "Track 5".to_string()));
        project.add_track(Track::new(3, "Track 3".to_string()));
        
        assert_eq!(project.next_track_id(), 6);
    }

    #[test]
    fn test_next_clip_id_empty() {
        let project = Project::new("Test Project".to_string());
        assert_eq!(project.next_clip_id(), 1);
    }

    #[test]
    fn test_next_clip_id_with_clips() {
        let mut project = Project::new("Test Project".to_string());
        let mut track = Track::new(1, "Track 1".to_string());
        
        let audio_data = create_test_audio_data(1000, 2);
        let clip1 = AudioClip::new(1, "Clip 1".to_string(), 0, audio_data.clone(), 2, 48000);
        let clip2 = AudioClip::new(3, "Clip 2".to_string(), 1000, audio_data, 2, 48000);
        
        track.add_clip(clip1);
        track.add_clip(clip2);
        project.add_track(track);
        
        assert_eq!(project.next_clip_id(), 4);
    }

    #[test]
    fn test_next_clip_id_multiple_tracks() {
        let mut project = Project::new("Test Project".to_string());
        
        let mut track1 = Track::new(1, "Track 1".to_string());
        let audio_data = create_test_audio_data(1000, 2);
        track1.add_clip(AudioClip::new(1, "Clip 1".to_string(), 0, audio_data.clone(), 2, 48000));
        project.add_track(track1);
        
        let mut track2 = Track::new(2, "Track 2".to_string());
        track2.add_clip(AudioClip::new(5, "Clip 5".to_string(), 0, audio_data, 2, 48000));
        project.add_track(track2);
        
        assert_eq!(project.next_clip_id(), 6);
    }

    #[test]
    fn test_duration_samples_empty() {
        let project = Project::new("Test Project".to_string());
        assert_eq!(project.duration_samples(), 0);
    }

    #[test]
    fn test_duration_samples_single_clip() {
        let mut project = Project::new("Test Project".to_string());
        let mut track = Track::new(1, "Track 1".to_string());
        
        let audio_data = create_test_audio_data(1000, 2);
        let clip = AudioClip::new(1, "Clip 1".to_string(), 100, audio_data, 2, 48000);
        track.add_clip(clip);
        project.add_track(track);
        
        // Duration should be start_position + length = 100 + 1000 = 1100
        assert_eq!(project.duration_samples(), 1100);
    }

    #[test]
    fn test_duration_samples_multiple_clips() {
        let mut project = Project::new("Test Project".to_string());
        let mut track = Track::new(1, "Track 1".to_string());
        
        let audio_data = create_test_audio_data(1000, 2);
        track.add_clip(AudioClip::new(1, "Clip 1".to_string(), 0, audio_data.clone(), 2, 48000));
        track.add_clip(AudioClip::new(2, "Clip 2".to_string(), 2000, audio_data, 2, 48000));
        project.add_track(track);
        
        // Longest clip ends at 2000 + 1000 = 3000
        assert_eq!(project.duration_samples(), 3000);
    }

    #[test]
    fn test_duration_seconds() {
        let mut project = Project::new("Test Project".to_string());
        project.config.sample_rate = 48000;
        
        let mut track = Track::new(1, "Track 1".to_string());
        let audio_data = create_test_audio_data(48000, 2); // 1 second of audio
        let clip = AudioClip::new(1, "Clip 1".to_string(), 0, audio_data, 2, 48000);
        track.add_clip(clip);
        project.add_track(track);
        
        let duration = project.duration_seconds();
        assert!((duration - 1.0).abs() < 0.01);
    }

    #[test]
    fn test_project_save_load() {
        let mut project = Project::new("Test Project".to_string());
        project.tempo = 140.0;
        project.master_volume = 0.8;
        project.add_track(Track::new(1, "Track 1".to_string()));

        let temp_file = NamedTempFile::new().unwrap();
        let path = temp_file.path();

        project.save(&path).unwrap();

        let loaded_project = Project::load(&path).unwrap();
        assert_eq!(loaded_project.metadata.name, "Test Project");
        assert_eq!(loaded_project.tempo, 140.0);
        assert_eq!(loaded_project.master_volume, 0.8);
        assert_eq!(loaded_project.tracks.len(), 1);
        assert_eq!(loaded_project.tracks[0].name, "Track 1");
    }

    #[test]
    fn test_project_save_updates_modified_time() {
        let mut project = Project::new("Test Project".to_string());
        let original_modified = project.metadata.modified_at.clone();
        
        std::thread::sleep(std::time::Duration::from_millis(10));
        
        let temp_file = NamedTempFile::new().unwrap();
        project.save(temp_file.path()).unwrap();
        
        assert_ne!(project.metadata.modified_at, original_modified);
    }

    #[test]
    fn test_project_load_nonexistent_file() {
        let result = Project::load("nonexistent_file.json");
        assert!(result.is_err());
    }

    #[test]
    fn test_project_load_invalid_json() {
        let temp_file = NamedTempFile::new().unwrap();
        std::fs::write(temp_file.path(), "invalid json content").unwrap();
        
        let result = Project::load(temp_file.path());
        assert!(result.is_err());
    }

    #[test]
    fn test_export_metadata() {
        let project = Project::new("Test Project".to_string());
        let metadata_json = project.export_metadata().unwrap();
        
        assert!(metadata_json.contains("Test Project"));
        assert!(metadata_json.contains("name"));
    }

    #[test]
    fn test_validate_valid_project() {
        let mut project = Project::new("Test Project".to_string());
        project.add_track(Track::new(1, "Track 1".to_string()));
        project.add_track(Track::new(2, "Track 2".to_string()));
        
        assert!(project.validate().is_ok());
    }

    #[test]
    fn test_validate_duplicate_track_ids() {
        let mut project = Project::new("Test Project".to_string());
        project.add_track(Track::new(1, "Track 1".to_string()));
        project.add_track(Track::new(1, "Track 2".to_string()));

        let result = project.validate();
        assert!(result.is_err());
        assert!(result.unwrap_err().to_string().contains("Duplicate track ID"));
    }

    #[test]
    fn test_validate_duplicate_clip_ids() {
        let mut project = Project::new("Test Project".to_string());
        let mut track = Track::new(1, "Track 1".to_string());
        
        let audio_data = create_test_audio_data(1000, 2);
        track.add_clip(AudioClip::new(1, "Clip 1".to_string(), 0, audio_data.clone(), 2, 48000));
        track.add_clip(AudioClip::new(1, "Clip 2".to_string(), 1000, audio_data, 2, 48000));
        
        project.add_track(track);
        
        let result = project.validate();
        assert!(result.is_err());
        assert!(result.unwrap_err().to_string().contains("Duplicate clip ID"));
    }

    #[test]
    fn test_project_builder_minimal() {
        let project = ProjectBuilder::new("Test Project".to_string()).build();
        
        assert_eq!(project.metadata.name, "Test Project");
        assert_eq!(project.tempo, 120.0);
        assert_eq!(project.tracks.len(), 0);
    }

    #[test]
    fn test_project_builder_full() {
        let project = ProjectBuilder::new("Test Project".to_string())
            .author("Test Author".to_string())
            .sample_rate(44100)
            .tempo(140.0)
            .time_signature(3, 4)
            .add_track(Track::new(1, "Track 1".to_string()))
            .add_track(Track::new(2, "Track 2".to_string()))
            .build();

        assert_eq!(project.metadata.name, "Test Project");
        assert_eq!(project.metadata.author, "Test Author");
        assert_eq!(project.config.sample_rate, 44100);
        assert_eq!(project.tempo, 140.0);
        assert_eq!(project.time_signature_numerator, 3);
        assert_eq!(project.time_signature_denominator, 4);
        assert_eq!(project.tracks.len(), 2);
    }

    #[test]
    fn test_project_builder_chaining() {
        let project = ProjectBuilder::new("Test".to_string())
            .tempo(100.0)
            .tempo(150.0) // Should override
            .build();
        
        assert_eq!(project.tempo, 150.0);
    }

    #[test]
    fn test_add_track_updates_modified_time() {
        let mut project = Project::new("Test Project".to_string());
        let original_modified = project.metadata.modified_at.clone();
        
        std::thread::sleep(std::time::Duration::from_millis(10));
        
        project.add_track(Track::new(1, "Track 1".to_string()));
        
        assert_ne!(project.metadata.modified_at, original_modified);
    }

    #[test]
    fn test_remove_track_updates_modified_time() {
        let mut project = Project::new("Test Project".to_string());
        project.add_track(Track::new(1, "Track 1".to_string()));
        
        let original_modified = project.metadata.modified_at.clone();
        std::thread::sleep(std::time::Duration::from_millis(10));
        
        project.remove_track(1).unwrap();
        
        assert_ne!(project.metadata.modified_at, original_modified);
    }

    #[test]
    fn test_project_with_clips_serialization() {
        let mut project = Project::new("Test Project".to_string());
        let mut track = Track::new(1, "Track 1".to_string());
        
        let audio_data = create_test_audio_data(100, 2);
        let clip = AudioClip::new(1, "Clip 1".to_string(), 0, audio_data, 2, 48000);
        track.add_clip(clip);
        project.add_track(track);
        
        let temp_file = NamedTempFile::new().unwrap();
        project.save(temp_file.path()).unwrap();
        
        let loaded = Project::load(temp_file.path()).unwrap();
        assert_eq!(loaded.tracks.len(), 1);
        assert_eq!(loaded.tracks[0].clips.len(), 1);
        assert_eq!(loaded.tracks[0].clips[0].name, "Clip 1");
    }

    #[test]
    fn test_project_time_signature_values() {
        let mut project = Project::new("Test Project".to_string());
        
        project.time_signature_numerator = 6;
        project.time_signature_denominator = 8;
        
        assert_eq!(project.time_signature_numerator, 6);
        assert_eq!(project.time_signature_denominator, 8);
    }

    #[test]
    fn test_project_config_preservation() {
        let mut project = Project::new("Test Project".to_string());
        project.config.sample_rate = 96000;
        project.config.buffer_size = 1024;
        project.config.output_channels = 8;
        
        let temp_file = NamedTempFile::new().unwrap();
        project.save(temp_file.path()).unwrap();
        
        let loaded = Project::load(temp_file.path()).unwrap();
        assert_eq!(loaded.config.sample_rate, 96000);
        assert_eq!(loaded.config.buffer_size, 1024);
        assert_eq!(loaded.config.output_channels, 8);
    }
}

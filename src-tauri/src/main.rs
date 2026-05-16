// Prevents additional console window on Windows in release builds
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use audiaw_audio_io::{decoder, AudioIO};
use audiaw_engine::{AudioEngine, EngineCommand, process_clip_static};
use audiaw_project::Project;
use audiaw_types::*;
use std::sync::{Arc, Mutex};
use tauri::State;
use tracing::{error, info};

/// Application state shared across Tauri commands
struct AppState {
    /// Audio engine instance
    engine: Arc<Mutex<AudioEngine>>,
    /// Current project
    project: Arc<Mutex<Option<Project>>>,
}

/// Initialize a new project
#[tauri::command]
fn new_project(name: String, state: State<AppState>) -> Result<String, String> {
    let project = Project::new(name);
    let metadata = project.metadata.clone();
    
    *state.project.lock().unwrap() = Some(project);
    
    serde_json::to_string(&metadata).map_err(|e| e.to_string())
}

/// Load a project from file
#[tauri::command]
async fn load_project(path: String, state: State<'_, AppState>) -> Result<String, String> {
    let project = Project::load(&path).map_err(|e| e.to_string())?;
    let metadata = project.metadata.clone();
    
    *state.project.lock().unwrap() = Some(project);
    
    serde_json::to_string(&metadata).map_err(|e| e.to_string())
}

/// Save the current project to file
#[tauri::command]
async fn save_project(path: String, state: State<'_, AppState>) -> Result<(), String> {
    let mut project_guard = state.project.lock().unwrap();
    
    if let Some(project) = project_guard.as_mut() {
        project.save(&path).map_err(|e| e.to_string())?;
        Ok(())
    } else {
        Err("No project loaded".to_string())
    }
}

/// Get current project metadata
#[tauri::command]
fn get_project_metadata(state: State<AppState>) -> Result<String, String> {
    let project_guard = state.project.lock().unwrap();
    
    if let Some(project) = project_guard.as_ref() {
        serde_json::to_string(&project.metadata).map_err(|e| e.to_string())
    } else {
        Err("No project loaded".to_string())
    }
}

/// Get all tracks in the current project
#[tauri::command]
fn get_tracks(state: State<AppState>) -> Result<String, String> {
    let project_guard = state.project.lock().unwrap();
    
    if let Some(project) = project_guard.as_ref() {
        serde_json::to_string(&project.tracks).map_err(|e| e.to_string())
    } else {
        Err("No project loaded".to_string())
    }
}

/// Add a new track to the project
#[tauri::command]
fn add_track(name: String, state: State<AppState>) -> Result<u32, String> {
    let mut project_guard = state.project.lock().unwrap();
    
    if let Some(project) = project_guard.as_mut() {
        let track_id = project.next_track_id();
        let track = Track::new(track_id, name);
        
        // Add to project
        project.add_track(track.clone());
        
        // Add to engine
        let engine = state.engine.lock().unwrap();
        engine
            .send_command(EngineCommand::AddTrack(track))
            .map_err(|e| e.to_string())?;
        
        Ok(track_id)
    } else {
        Err("No project loaded".to_string())
    }
}

/// Remove a track from the project
#[tauri::command]
fn remove_track(track_id: u32, state: State<AppState>) -> Result<(), String> {
    let mut project_guard = state.project.lock().unwrap();
    
    if let Some(project) = project_guard.as_mut() {
        project.remove_track(track_id).map_err(|e| e.to_string())?;
        
        // Remove from engine
        let engine = state.engine.lock().unwrap();
        engine
            .send_command(EngineCommand::RemoveTrack(track_id))
            .map_err(|e| e.to_string())?;
        
        Ok(())
    } else {
        Err("No project loaded".to_string())
    }
}

/// Start playback
#[tauri::command]
fn play(state: State<AppState>) -> Result<(), String> {
    let engine = state.engine.lock().unwrap();
    engine
        .send_command(EngineCommand::Play)
        .map_err(|e| e.to_string())
}

/// Stop playback
#[tauri::command]
fn stop(state: State<AppState>) -> Result<(), String> {
    let engine = state.engine.lock().unwrap();
    engine
        .send_command(EngineCommand::Stop)
        .map_err(|e| e.to_string())
}

/// Pause playback
#[tauri::command]
fn pause(state: State<AppState>) -> Result<(), String> {
    let engine = state.engine.lock().unwrap();
    engine
        .send_command(EngineCommand::Pause)
        .map_err(|e| e.to_string())
}

/// Get current transport state
#[tauri::command]
fn get_transport_state(state: State<AppState>) -> Result<String, String> {
    let engine = state.engine.lock().unwrap();
    let transport_state = engine.transport_state();
    serde_json::to_string(&transport_state).map_err(|e| e.to_string())
}

/// Get current playback position
#[tauri::command]
fn get_position(state: State<AppState>) -> Result<u64, String> {
    let engine = state.engine.lock().unwrap();
    Ok(engine.position())
}

/// Seek playback to a sample position
#[tauri::command]
fn seek(position: u64, state: State<AppState>) -> Result<(), String> {
    let engine = state.engine.lock().unwrap();
    engine
        .send_command(EngineCommand::Seek(position))
        .map_err(|e| e.to_string())
}

/// Set track volume
#[tauri::command]
fn set_track_volume(track_id: u32, volume: f32, state: State<AppState>) -> Result<(), String> {
    let engine = state.engine.lock().unwrap();
    engine
        .send_command(EngineCommand::SetTrackVolume(track_id, volume))
        .map_err(|e| e.to_string())
}

/// Set track pan
#[tauri::command]
fn set_track_pan(track_id: u32, pan: f32, state: State<AppState>) -> Result<(), String> {
    let engine = state.engine.lock().unwrap();
    engine
        .send_command(EngineCommand::SetTrackPan(track_id, pan))
        .map_err(|e| e.to_string())
}

/// Set track mute
#[tauri::command]
fn set_track_mute(track_id: u32, muted: bool, state: State<AppState>) -> Result<(), String> {
    let engine = state.engine.lock().unwrap();
    engine
        .send_command(EngineCommand::SetTrackMute(track_id, muted))
        .map_err(|e| e.to_string())
}

/// Set track solo
#[tauri::command]
fn set_track_solo(track_id: u32, solo: bool, state: State<AppState>) -> Result<(), String> {
    let engine = state.engine.lock().unwrap();
    engine
        .send_command(EngineCommand::SetTrackSolo(track_id, solo))
        .map_err(|e| e.to_string())
}

/// Set master volume
#[tauri::command]
fn set_master_volume(volume: f32, state: State<AppState>) -> Result<(), String> {
    let engine = state.engine.lock().unwrap();
    engine
        .send_command(EngineCommand::SetMasterVolume(volume))
        .map_err(|e| e.to_string())
}

/// Import an audio file and add it to a track
#[tauri::command]
async fn import_audio_file(
    file_path: String,
    track_id: u32,
    state: State<'_, AppState>,
) -> Result<String, String> {
    info!("Importing audio file: {} to track {}", file_path, track_id);
    
    // Decode the audio file
    let (samples, metadata) = decoder::decode_audio_file(&file_path)
        .map_err(|e| {
            error!("Failed to decode audio file: {}", e);
            format!("Failed to decode audio file: {}", e)
        })?;
    
    info!(
        "Decoded {} samples, {} channels, {} Hz",
        samples.len(),
        metadata.channels,
        metadata.sample_rate
    );
    
    // Get the next clip ID
    let mut project_guard = state.project.lock().unwrap();
    let project = project_guard
        .as_mut()
        .ok_or_else(|| "No project loaded".to_string())?;
    
    let clip_id = project.next_clip_id();
    
    // Extract filename for clip name
    let clip_name = std::path::Path::new(&file_path)
        .file_stem()
        .and_then(|s| s.to_str())
        .unwrap_or("Audio Clip")
        .to_string();
    
    // Create audio clip
    let clip = AudioClip::from_file(
        clip_id,
        clip_name,
        file_path.clone(),
        0, // Start at beginning of track
        samples,
        metadata.channels,
        metadata.sample_rate,
    );
    
    // Add clip to track in project
    let track = project
        .tracks
        .iter_mut()
        .find(|t| t.id == track_id)
        .ok_or_else(|| format!("Track {} not found", track_id))?;
    
    track.add_clip(clip.clone());
    
    // Send clip to engine
    let engine = state.engine.lock().unwrap();
    engine
        .send_command(EngineCommand::AddClip(track_id, clip.clone()))
        .map_err(|e| e.to_string())?;
    
    // Return metadata as JSON
    serde_json::to_string(&metadata).map_err(|e| e.to_string())
}
/// Get available input devices
#[tauri::command]
fn get_input_devices() -> Result<Vec<String>, String> {
    let config = AudioConfig::default();
    let audio_io = AudioIO::new(config).map_err(|e| e.to_string())?;
    audio_io.list_input_devices().map_err(|e| e.to_string())
}

/// Start recording to a track
#[tauri::command]
fn start_recording(track_id: u32, state: State<AppState>) -> Result<(), String> {
    let engine = state.engine.lock().unwrap();
    engine
        .send_command(EngineCommand::StartRecording(track_id))
        .map_err(|e| e.to_string())
}

/// Stop recording
#[tauri::command]
fn stop_recording(state: State<AppState>) -> Result<(), String> {
    let engine = state.engine.lock().unwrap();
    engine
        .send_command(EngineCommand::StopRecording)
        .map_err(|e| e.to_string())
}

/// Arm/disarm track for recording
#[tauri::command]
fn set_track_armed(track_id: u32, armed: bool, state: State<AppState>) -> Result<(), String> {
    let engine = state.engine.lock().unwrap();
    engine
        .send_command(EngineCommand::SetTrackArmed(track_id, armed))
        .map_err(|e| e.to_string())
}

/// Check if currently recording
#[tauri::command]
fn is_recording(state: State<AppState>) -> Result<bool, String> {
    let engine = state.engine.lock().unwrap();
    Ok(engine.is_recording())
}

/// Undo last action
#[tauri::command]
fn undo(state: State<AppState>) -> Result<(), String> {
    let engine = state.engine.lock().unwrap();
    engine
        .send_command(EngineCommand::Undo)
        .map_err(|e| e.to_string())
}

/// Redo last undone action
#[tauri::command]
fn redo(state: State<AppState>) -> Result<(), String> {
    let engine = state.engine.lock().unwrap();
    engine
        .send_command(EngineCommand::Redo)
        .map_err(|e| e.to_string())
}

/// Check if undo is available
#[tauri::command]
fn can_undo(state: State<AppState>) -> Result<bool, String> {
    let engine = state.engine.lock().unwrap();
    Ok(engine.can_undo())
}

/// Check if redo is available
#[tauri::command]
fn can_redo(state: State<AppState>) -> Result<bool, String> {
    let engine = state.engine.lock().unwrap();
    Ok(engine.can_redo())
}

/// Get description of action to undo
#[tauri::command]
fn get_undo_description(state: State<AppState>) -> Result<Option<String>, String> {
    let engine = state.engine.lock().unwrap();
    Ok(engine.undo_description())
}

/// Get description of action to redo
#[tauri::command]
fn get_redo_description(state: State<AppState>) -> Result<Option<String>, String> {
    let engine = state.engine.lock().unwrap();
    Ok(engine.redo_description())
}

/// Export audio to WAV file
#[tauri::command]
async fn export_audio(settings: String, state: State<'_, AppState>) -> Result<(), String> {
    let export_settings: ExportSettings = serde_json::from_str(&settings)
        .map_err(|e| format!("Failed to parse export settings: {}", e))?;
    
    info!("Starting audio export to: {}", export_settings.output_path);
    
    let engine = state.engine.lock().unwrap();
    engine
        .send_command(EngineCommand::ExportAudio(export_settings))
        .map_err(|e| e.to_string())
}

/// Check if export is in progress
#[tauri::command]
fn is_exporting(state: State<AppState>) -> Result<bool, String> {
    let engine = state.engine.lock().unwrap();
    Ok(engine.is_exporting())
}

/// Get current export progress
#[tauri::command]
fn get_export_progress(state: State<AppState>) -> Result<Option<String>, String> {
    let engine = state.engine.lock().unwrap();
    if let Some(progress) = engine.export_progress() {
        serde_json::to_string(&progress).map(Some).map_err(|e| e.to_string())
    } else {
        Ok(None)
    }
}

fn main() {
    // Initialize tracing
    tracing_subscriber::fmt()
        .with_max_level(tracing::Level::INFO)
        .init();

    info!("Starting AUDIAW v{}", env!("CARGO_PKG_VERSION"));

    // Initialize audio engine
    let config = AudioConfig::default();
    let engine = AudioEngine::new(config.clone());
    
    // Get state reference for audio callbacks
    let state_arc = engine.get_state_arc();
    let state_arc_input = state_arc.clone();
    
    // Initialize audio I/O
    let mut audio_io = AudioIO::new(config).expect("Failed to initialize audio I/O");
    audio_io.init_output().expect("Failed to initialize output device");
    
    // Initialize input device for recording
    if let Err(e) = audio_io.init_input() {
        error!("Failed to initialize input device: {}", e);
        info!("Recording will not be available");
    } else {
        // Start input stream for recording
        if let Err(e) = audio_io.start_input(move |input_buffer: &[f32]| {
            // This callback runs in the audio input thread - must be real-time safe!
            let state = state_arc_input.load();
            
            // Only capture if recording
            if state.recording_track_id.is_some() {
                // Append input data to recording buffer
                state_arc_input.rcu(|current| {
                    let mut new_state = (**current).clone();
                    if new_state.recording_track_id.is_some() {
                        new_state.recording_buffer.extend_from_slice(input_buffer);
                    }
                    new_state
                });
            }
        }) {
            error!("Failed to start input stream: {}", e);
            info!("Recording will not be available");
        } else {
            info!("Input stream started - recording available");
        }
    }
    
    // Start output stream with callback
    audio_io.start_output(move |output_buffer: &mut [f32]| {
        // This callback runs in the audio thread - must be real-time safe!
        let state = state_arc.load();
        
        let channels = state.config.output_channels;
        let frames = output_buffer.len() / channels;
        
        // Clear output buffer
        output_buffer.fill(0.0);
        
        // Only process if playing or recording
        if state.transport_state == TransportState::Playing ||
           state.transport_state == TransportState::Recording {
            
            // Check if any tracks are soloed
            let has_solo = state.tracks.iter().any(|t| t.solo);
            
            // Mix all tracks
            for track in &state.tracks {
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
                        state.position,
                        output_buffer,
                        frames,
                        channels,
                    );
                }
            }
            
            // Apply master volume and clipping
            for sample in output_buffer.iter_mut() {
                *sample *= state.master_volume;
                *sample = sample.clamp(-1.0, 1.0);
            }
            
            // Advance playback position
            state_arc.rcu(|current| {
                let mut new_state = (**current).clone();
                if new_state.transport_state == TransportState::Playing ||
                   new_state.transport_state == TransportState::Recording {
                    new_state.position += frames as u64;
                }
                new_state
            });
        }
    }).expect("Failed to start audio stream");
    
    info!("Audio stream started");
    
    let engine = Arc::new(Mutex::new(engine));
    
    // Initialize app state
    let app_state = AppState {
        engine,
        project: Arc::new(Mutex::new(None)),
    };

    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_fs::init())
        .manage(app_state)
        .invoke_handler(tauri::generate_handler![
            new_project,
            load_project,
            save_project,
            get_project_metadata,
            get_tracks,
            add_track,
            remove_track,
            import_audio_file,
            play,
            stop,
            pause,
            get_transport_state,
            get_position,
            seek,
            set_track_volume,
            set_track_pan,
            set_track_mute,
            set_track_solo,
            set_master_volume,
            get_input_devices,
            start_recording,
            stop_recording,
            set_track_armed,
            is_recording,
            export_audio,
            is_exporting,
            get_export_progress,
            undo,
            redo,
            can_undo,
            can_redo,
            get_undo_description,
            get_redo_description,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

// Made with Bob

import { create } from 'zustand';
import { invoke } from '@tauri-apps/api/core';
import { open } from '@tauri-apps/plugin-dialog';

/**
 * Project Store
 * Manages project state, tracks, clips, and selections
 */

interface AudioMetadata {
  sample_rate: number;
  channels: number;
  duration_samples: number;
  duration_seconds: number;
  format: string;
  bit_depth?: number;
}

export interface Clip {
  id: string;
  name: string;
  trackId: string;
  startTime: number; // in samples
  duration: number;  // in samples
  color: string;
  audioFile?: string;
}

export interface Track {
  id: string;
  name: string;
  color: string;
  type: 'audio' | 'midi' | 'group' | 'return';
  
  // Track controls
  muted: boolean;
  solo: boolean;
  armed: boolean;
  
  // Mix settings
  volume: number;  // 0.0 to 1.0
  pan: number;     // -1.0 (left) to 1.0 (right)
  
  // Visual
  height: number;  // in pixels
  
  // Clips
  clips: Clip[];
}

export interface ExportSettings {
  output_path: string;
  sample_rate: number;
  bit_depth: 'I16' | 'I24' | 'F32';
  start_position: number;
  end_position: number | null;
  normalize_db: number | null;
  dither: boolean;
}

export interface ExportProgress {
  current_position: number;
  total_samples: number;
  progress: number;
  estimated_seconds_remaining: number;
}

export interface ProjectState {
  // Project info
  name: string;
  tempo: number;
  sampleRate: number;
  
  // Tracks
  tracks: Track[];
  
  // Selection
  selectedTrackIds: string[];
  selectedClipIds: string[];
  
  // Recording
  isRecording: boolean;
  recordingTrackId: string | null;
  inputDevices: string[];
  selectedInputDevice: string | null;
  
  // Export
  isExporting: boolean;
  exportProgress: number; // 0-100
  
  // Undo/Redo
  canUndo: boolean;
  canRedo: boolean;
  undoDescription: string | null;
  redoDescription: string | null;
  
  // Actions - Project
  setProjectName: (name: string) => void;
  setTempo: (tempo: number) => void;
  
  // Actions - Tracks
  addTrack: (name: string, type?: Track['type']) => void;
  removeTrack: (trackId: string) => void;
  updateTrack: (trackId: string, updates: Partial<Track>) => void;
  
  setTrackMute: (trackId: string, muted: boolean) => void;
  setTrackSolo: (trackId: string, solo: boolean) => void;
  setTrackArmed: (trackId: string, armed: boolean) => void;
  setTrackVolume: (trackId: string, volume: number) => void;
  setTrackPan: (trackId: string, pan: number) => void;
  setTrackHeight: (trackId: string, height: number) => void;
  
  // Actions - Clips
  addClip: (trackId: string, clip: Omit<Clip, 'id' | 'trackId'>) => void;
  removeClip: (clipId: string) => void;
  updateClip: (clipId: string, updates: Partial<Clip>) => void;
  importAudioFile: (trackId: string) => Promise<void>;
  
  // Actions - Recording
  startRecording: (trackId: string) => Promise<void>;
  stopRecording: () => Promise<void>;
  loadInputDevices: () => Promise<void>;
  selectInputDevice: (deviceName: string) => void;
  
  // Actions - Export
  exportAudio: (settings: ExportSettings) => Promise<void>;
  checkExportProgress: () => Promise<void>;
  
  // Actions - Undo/Redo
  undo: () => Promise<void>;
  redo: () => Promise<void>;
  updateUndoRedoState: () => Promise<void>;
  
  // Actions - Selection
  selectTrack: (trackId: string, addToSelection?: boolean) => void;
  selectClip: (clipId: string, addToSelection?: boolean) => void;
  clearSelection: () => void;
  
  // Utility
  getTrackById: (trackId: string) => Track | undefined;
  getClipById: (clipId: string) => Clip | undefined;
}

const TRACK_COLORS = [
  '#3b82f6', // blue
  '#8b5cf6', // purple
  '#10b981', // green
  '#f59e0b', // orange
  '#ef4444', // red
  '#06b6d4', // cyan
  '#ec4899', // pink
];

let trackCounter = 0;
let clipCounter = 0;

const trackNumber = (trackId: string) => Number.parseInt(trackId.replace('track-', ''), 10);

const reportWorkflowError = (label: string, error: unknown) => {
  console.error(label, error);
  alert(`${label}: ${error instanceof Error ? error.message : String(error)}`);
};

const isTauriRuntime = () => '__TAURI_INTERNALS__' in window;

const invokeOptional = async (command: string, payload?: Record<string, unknown>) => {
  if (!isTauriRuntime()) return;

  try {
    await invoke(command, payload);
  } catch (error) {
    console.error(`Backend command failed: ${command}`, error);
  }
};

export const useProjectStore = create<ProjectState>((set, get) => ({
  // Initial state
  name: 'Untitled Project',
  tempo: 120,
  sampleRate: 48000,
  tracks: [],
  selectedTrackIds: [],
  selectedClipIds: [],
  
  // Recording state
  isRecording: false,
  recordingTrackId: null,
  inputDevices: [],
  selectedInputDevice: null,
  
  // Export state
  isExporting: false,
  exportProgress: 0,
  
  // Undo/Redo state
  canUndo: false,
  canRedo: false,
  undoDescription: null,
  redoDescription: null,
  
  // Project actions
  setProjectName: (name) => set({ name }),
  
  setTempo: (tempo) => {
    if (tempo >= 20 && tempo <= 999) {
      set({ tempo });
    }
  },
  
  // Track actions
  addTrack: (name, type = 'audio') => {
    const idNumber = ++trackCounter;
    const newTrack: Track = {
      id: `track-${idNumber}`,
      name,
      color: TRACK_COLORS[trackCounter % TRACK_COLORS.length],
      type,
      muted: false,
      solo: false,
      armed: false,
      volume: 0.8,
      pan: 0,
      height: 64,
      clips: [],
    };
    
    set((state) => ({
      tracks: [...state.tracks, newTrack],
    }));

    if (type === 'audio') {
      void invokeOptional('add_track', { name });
    }
  },
  
  removeTrack: (trackId) => {
    set((state) => ({
      tracks: state.tracks.filter((t) => t.id !== trackId),
      selectedTrackIds: state.selectedTrackIds.filter((id) => id !== trackId),
    }));
    void invokeOptional('remove_track', { trackId: trackNumber(trackId) });
  },
  
  updateTrack: (trackId, updates) => {
    set((state) => ({
      tracks: state.tracks.map((track) =>
        track.id === trackId ? { ...track, ...updates } : track
      ),
    }));
  },
  
  setTrackMute: (trackId, muted) => {
    get().updateTrack(trackId, { muted });
    void invokeOptional('set_track_mute', { trackId: trackNumber(trackId), muted });
  },
  
  setTrackSolo: (trackId, solo) => {
    get().updateTrack(trackId, { solo });
    void invokeOptional('set_track_solo', { trackId: trackNumber(trackId), solo });
  },
  
  setTrackArmed: (trackId, armed) => {
    get().updateTrack(trackId, { armed });
    void invokeOptional('set_track_armed', { trackId: trackNumber(trackId), armed });
  },
  
  setTrackVolume: (trackId, volume) => {
    const clampedVolume = Math.max(0, Math.min(1, volume));
    get().updateTrack(trackId, { volume: clampedVolume });
    void invokeOptional('set_track_volume', {
      trackId: trackNumber(trackId),
      volume: clampedVolume,
    });
  },
  
  setTrackPan: (trackId, pan) => {
    const clampedPan = Math.max(-1, Math.min(1, pan));
    get().updateTrack(trackId, { pan: clampedPan });
    void invokeOptional('set_track_pan', {
      trackId: trackNumber(trackId),
      pan: clampedPan,
    });
  },
  
  setTrackHeight: (trackId, height) => {
    const clampedHeight = Math.max(48, Math.min(200, height));
    get().updateTrack(trackId, { height: clampedHeight });
  },
  
  // Clip actions
  addClip: (trackId, clipData) => {
    const newClip: Clip = {
      id: `clip-${++clipCounter}`,
      trackId,
      ...clipData,
    };
    
    set((state) => ({
      tracks: state.tracks.map((track) =>
        track.id === trackId
          ? { ...track, clips: [...track.clips, newClip] }
          : track
      ),
    }));
  },
  
  removeClip: (clipId) => {
    set((state) => ({
      tracks: state.tracks.map((track) => ({
        ...track,
        clips: track.clips.filter((c) => c.id !== clipId),
      })),
      selectedClipIds: state.selectedClipIds.filter((id) => id !== clipId),
    }));
  },
  
  updateClip: (clipId, updates) => {
    set((state) => ({
      tracks: state.tracks.map((track) => ({
        ...track,
        clips: track.clips.map((clip) =>
          clip.id === clipId ? { ...clip, ...updates } : clip
        ),
      })),
    }));
  },
  
  importAudioFile: async (trackId) => {
    try {
      if (!isTauriRuntime()) {
        throw new Error('Audio import is available in the Tauri desktop runtime.');
      }

      // Open file picker dialog
      const filePath = await open({
        multiple: false,
        filters: [{
          name: 'Audio Files',
          extensions: ['wav', 'mp3']
        }]
      });
      
      if (!filePath) {
        return; // User cancelled
      }
      
      // Call Tauri backend to import the file
      const metadataJson = await invoke<string>('import_audio_file', {
        filePath: filePath as string,
        trackId: trackNumber(trackId)
      });
      
      const metadata: AudioMetadata = JSON.parse(metadataJson);
      
      // Extract filename for clip name
      const fileName = (filePath as string).split(/[\\/]/).pop()?.replace(/\.[^/.]+$/, '') || 'Audio Clip';
      
      // Add clip to the store
      get().addClip(trackId, {
        name: fileName,
        startTime: 0,
        duration: metadata.duration_samples,
        color: get().getTrackById(trackId)?.color || '#3b82f6',
        audioFile: filePath as string,
      });
      
    } catch (error) {
      reportWorkflowError('Failed to import audio file', error);
    }
  },
  
  // Recording actions
  startRecording: async (trackId: string) => {
    try {
      const track = get().getTrackById(trackId);
      if (!track) {
        throw new Error('Track not found');
      }
      
      if (!track.armed) {
        throw new Error('Track must be armed for recording');
      }
      
      // Arm the track in the backend
      await invoke('set_track_armed', {
        trackId: trackNumber(trackId),
        armed: true
      });
      
      // Start recording
      await invoke('start_recording', {
        trackId: trackNumber(trackId)
      });
      
      set({ isRecording: true, recordingTrackId: trackId });
    } catch (error) {
      reportWorkflowError('Failed to start recording', error);
    }
  },
  
  stopRecording: async () => {
    try {
      const { recordingTrackId } = get();
      
      if (!recordingTrackId) {
        return;
      }
      
      // Stop recording
      await invoke('stop_recording');
      
      set({ isRecording: false, recordingTrackId: null });
      
      // Note: The backend will create a new clip automatically
      // We might want to refresh the track's clips here
    } catch (error) {
      reportWorkflowError('Failed to stop recording', error);
    }
  },
  
  // Export actions
  exportAudio: async (settings: ExportSettings) => {
    try {
      set({ isExporting: true, exportProgress: 0 });
      
      // Start export
      await invoke('export_audio', {
        settings: JSON.stringify(settings)
      });
      
      // Poll for progress
      const progressInterval = setInterval(async () => {
        await get().checkExportProgress();
        
        // Stop polling when export is complete
        if (!get().isExporting) {
          clearInterval(progressInterval);
        }
      }, 500); // Check every 500ms
      
    } catch (error) {
      console.error('Failed to start export:', error);
      set({ isExporting: false, exportProgress: 0 });
      reportWorkflowError('Failed to start export', error);
    }
  },
  
  checkExportProgress: async () => {
    try {
      const isExporting = await invoke<boolean>('is_exporting');
      
      if (!isExporting) {
        set({ isExporting: false, exportProgress: 100 });
        return;
      }
      
      const progressJson = await invoke<string | null>('get_export_progress');
      
      if (progressJson) {
        const progress: ExportProgress = JSON.parse(progressJson);
        set({ exportProgress: Math.round(progress.progress * 100) });
      }
    } catch (error) {
      console.error('Failed to check export progress:', error);
    }
  },
  
  loadInputDevices: async () => {
    try {
      if (!isTauriRuntime()) {
        return;
      }

      const devices = await invoke<string[]>('get_input_devices');
      set({ inputDevices: devices });
      
      // Auto-select first device if none selected
      if (devices.length > 0 && !get().selectedInputDevice) {
        set({ selectedInputDevice: devices[0] });
      }
      
    } catch (error) {
      console.error('Failed to load input devices:', error);
    }
  },
  
  selectInputDevice: (deviceName: string) => {
    set({ selectedInputDevice: deviceName });
  },
  
  // Undo/Redo actions
  undo: async () => {
    try {
      if (!isTauriRuntime()) return;

      await invoke('undo');
      await get().updateUndoRedoState();
    } catch (error) {
      reportWorkflowError('Failed to undo', error);
    }
  },
  
  redo: async () => {
    try {
      if (!isTauriRuntime()) return;

      await invoke('redo');
      await get().updateUndoRedoState();
    } catch (error) {
      reportWorkflowError('Failed to redo', error);
    }
  },
  
  updateUndoRedoState: async () => {
    try {
      if (!isTauriRuntime()) {
        set({
          canUndo: false,
          canRedo: false,
          undoDescription: null,
          redoDescription: null,
        });
        return;
      }

      const canUndo = await invoke<boolean>('can_undo');
      const canRedo = await invoke<boolean>('can_redo');
      const undoDescription = await invoke<string | null>('get_undo_description');
      const redoDescription = await invoke<string | null>('get_redo_description');
      
      set({
        canUndo,
        canRedo,
        undoDescription,
        redoDescription,
      });
    } catch (error) {
      console.error('Failed to update undo/redo state:', error);
    }
  },
  
  // Selection actions
  selectTrack: (trackId, addToSelection = false) => {
    set((state) => ({
      selectedTrackIds: addToSelection
        ? [...state.selectedTrackIds, trackId]
        : [trackId],
    }));
  },
  
  selectClip: (clipId, addToSelection = false) => {
    set((state) => ({
      selectedClipIds: addToSelection
        ? [...state.selectedClipIds, clipId]
        : [clipId],
    }));
  },
  
  clearSelection: () => {
    set({ selectedTrackIds: [], selectedClipIds: [] });
  },
  
  // Utility functions
  getTrackById: (trackId) => {
    return get().tracks.find((t) => t.id === trackId);
  },
  
  getClipById: (clipId) => {
    for (const track of get().tracks) {
      const clip = track.clips.find((c) => c.id === clipId);
      if (clip) return clip;
    }
    return undefined;
  },
}));

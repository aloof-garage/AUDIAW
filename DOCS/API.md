# AUDIAW API Reference

> Complete API documentation for AUDIAW's Tauri commands, events, stores, and components

## Table of Contents

- [Tauri Commands](#tauri-commands)
- [Tauri Events](#tauri-events)
- [Zustand Stores](#zustand-stores)
- [Component Props](#component-props)
- [Type Definitions](#type-definitions)
- [Usage Examples](#usage-examples)

---

## Tauri Commands

All Tauri commands are invoked from the frontend using:

```typescript
import { invoke } from '@tauri-apps/api/core';

const result = await invoke<ReturnType>('command_name', { param: value });
```

### Project Management

#### `new_project`

Create a new project.

**Parameters**:
- `name: string` - Project name

**Returns**: `Promise<string>` - JSON-serialized project metadata

**Example**:
```typescript
const metadata = await invoke<string>('new_project', { 
  name: 'My New Project' 
});
const parsed = JSON.parse(metadata);
console.log(parsed.name); // "My New Project"
```

**Errors**:
- Serialization error if metadata cannot be converted to JSON

---

#### `load_project`

Load a project from file.

**Parameters**:
- `path: string` - Full path to project file

**Returns**: `Promise<string>` - JSON-serialized project metadata

**Example**:
```typescript
try {
  const metadata = await invoke<string>('load_project', { 
    path: '/path/to/project.audiaw' 
  });
  console.log('Project loaded:', JSON.parse(metadata));
} catch (error) {
  console.error('Failed to load project:', error);
}
```

**Errors**:
- File not found
- Invalid project format
- Deserialization error

---

#### `save_project`

Save the current project to file.

**Parameters**:
- `path: string` - Full path where to save project

**Returns**: `Promise<void>`

**Example**:
```typescript
await invoke('save_project', { 
  path: '/path/to/project.audiaw' 
});
console.log('Project saved successfully');
```

**Errors**:
- No project loaded
- File write error
- Serialization error

---

#### `get_project_metadata`

Get current project metadata.

**Parameters**: None

**Returns**: `Promise<string>` - JSON-serialized project metadata

**Example**:
```typescript
const metadata = await invoke<string>('get_project_metadata');
const { name, author, created_at } = JSON.parse(metadata);
```

**Errors**:
- No project loaded

---

### Track Management

#### `get_tracks`

Get all tracks in the current project.

**Parameters**: None

**Returns**: `Promise<string>` - JSON-serialized array of tracks

**Example**:
```typescript
const tracksJson = await invoke<string>('get_tracks');
const tracks = JSON.parse(tracksJson);
tracks.forEach(track => {
  console.log(`Track ${track.id}: ${track.name}`);
});
```

**Errors**:
- No project loaded

---

#### `add_track`

Add a new track to the project.

**Parameters**:
- `name: string` - Track name

**Returns**: `Promise<number>` - New track ID

**Example**:
```typescript
const trackId = await invoke<number>('add_track', { 
  name: 'Vocals' 
});
console.log('Created track with ID:', trackId);
```

**Errors**:
- No project loaded
- Engine command failed

---

#### `remove_track`

Remove a track from the project.

**Parameters**:
- `trackId: number` - ID of track to remove

**Returns**: `Promise<void>`

**Example**:
```typescript
await invoke('remove_track', { trackId: 1 });
console.log('Track removed');
```

**Errors**:
- No project loaded
- Track not found
- Engine command failed

---

### Transport Control

#### `play`

Start playback.

**Parameters**: None

**Returns**: `Promise<void>`

**Example**:
```typescript
await invoke('play');
console.log('Playback started');
```

**Errors**:
- Engine command failed

---

#### `stop`

Stop playback and reset position to 0.

**Parameters**: None

**Returns**: `Promise<void>`

**Example**:
```typescript
await invoke('stop');
console.log('Playback stopped');
```

**Errors**:
- Engine command failed

---

#### `pause`

Pause playback (keeps current position).

**Parameters**: None

**Returns**: `Promise<void>`

**Example**:
```typescript
await invoke('pause');
console.log('Playback paused');
```

**Errors**:
- Engine command failed

---

#### `get_transport_state`

Get current transport state.

**Parameters**: None

**Returns**: `Promise<string>` - JSON-serialized transport state

**Example**:
```typescript
const stateJson = await invoke<string>('get_transport_state');
const state = JSON.parse(stateJson);
// state is one of: "Stopped", "Playing", "Recording", "Paused"
```

**Errors**:
- Serialization error

---

#### `get_position`

Get current playback position in samples.

**Parameters**: None

**Returns**: `Promise<number>` - Position in samples

**Example**:
```typescript
const position = await invoke<number>('get_position');
const seconds = position / 48000; // Assuming 48kHz sample rate
console.log(`Position: ${seconds.toFixed(2)}s`);
```

**Errors**: None

---

### Mixer Control

#### `set_track_volume`

Set track volume.

**Parameters**:
- `trackId: number` - Track ID
- `volume: number` - Volume (0.0 to 1.0)

**Returns**: `Promise<void>`

**Example**:
```typescript
await invoke('set_track_volume', { 
  trackId: 1, 
  volume: 0.8 
});
```

**Errors**:
- Engine command failed

---

#### `set_track_pan`

Set track pan.

**Parameters**:
- `trackId: number` - Track ID
- `pan: number` - Pan (-1.0 left to 1.0 right)

**Returns**: `Promise<void>`

**Example**:
```typescript
await invoke('set_track_pan', { 
  trackId: 1, 
  pan: -0.5  // 50% left
});
```

**Errors**:
- Engine command failed

---

#### `set_track_mute`

Mute or unmute a track.

**Parameters**:
- `trackId: number` - Track ID
- `muted: boolean` - Mute state

**Returns**: `Promise<void>`

**Example**:
```typescript
await invoke('set_track_mute', { 
  trackId: 1, 
  muted: true 
});
```

**Errors**:
- Engine command failed

---

#### `set_track_solo`

Solo or unsolo a track.

**Parameters**:
- `trackId: number` - Track ID
- `solo: boolean` - Solo state

**Returns**: `Promise<void>`

**Example**:
```typescript
await invoke('set_track_solo', { 
  trackId: 1, 
  solo: true 
});
```

**Errors**:
- Engine command failed

---

#### `set_master_volume`

Set master output volume.

**Parameters**:
- `volume: number` - Volume (0.0 to 1.0)

**Returns**: `Promise<void>`

**Example**:
```typescript
await invoke('set_master_volume', { 
  volume: 0.9 
});
```

**Errors**:
- Engine command failed

---

## Tauri Events

Events are emitted from the backend to the frontend. Subscribe using:

```typescript
import { listen } from '@tauri-apps/api/event';

const unlisten = await listen<PayloadType>('event-name', (event) => {
  console.log('Event received:', event.payload);
});

// Later: unlisten();
```

### Available Events (Future)

Currently, events are polled via commands. Future versions will use proper event emission:

- `transport-state-changed` - Transport state changed
- `position-changed` - Playback position updated
- `track-added` - Track added to project
- `track-removed` - Track removed from project
- `engine-error` - Engine error occurred

---

## Zustand Stores

### projectStore

Manages project state, tracks, and clips.

**Import**:
```typescript
import { useProjectStore } from './stores/projectStore';
```

#### State

```typescript
interface ProjectState {
  // Project info
  name: string;
  tempo: number;
  sampleRate: number;
  
  // Tracks
  tracks: Track[];
  
  // Selection
  selectedTrackIds: string[];
  selectedClipIds: string[];
}
```

#### Actions

##### `setProjectName(name: string): void`

Set project name.

```typescript
const setProjectName = useProjectStore(state => state.setProjectName);
setProjectName('My Project');
```

---

##### `setTempo(tempo: number): void`

Set project tempo (20-999 BPM).

```typescript
const setTempo = useProjectStore(state => state.setTempo);
setTempo(120);
```

---

##### `addTrack(name: string, type?: 'audio' | 'midi' | 'group' | 'return'): void`

Add a new track.

```typescript
const addTrack = useProjectStore(state => state.addTrack);
addTrack('Vocals', 'audio');
```

---

##### `removeTrack(trackId: string): void`

Remove a track.

```typescript
const removeTrack = useProjectStore(state => state.removeTrack);
removeTrack('track-1');
```

---

##### `updateTrack(trackId: string, updates: Partial<Track>): void`

Update track properties.

```typescript
const updateTrack = useProjectStore(state => state.updateTrack);
updateTrack('track-1', { name: 'New Name', volume: 0.8 });
```

---

##### `setTrackMute(trackId: string, muted: boolean): void`

Mute/unmute track.

```typescript
const setTrackMute = useProjectStore(state => state.setTrackMute);
setTrackMute('track-1', true);
```

---

##### `setTrackSolo(trackId: string, solo: boolean): void`

Solo/unsolo track.

```typescript
const setTrackSolo = useProjectStore(state => state.setTrackSolo);
setTrackSolo('track-1', true);
```

---

##### `setTrackArmed(trackId: string, armed: boolean): void`

Arm/disarm track for recording.

```typescript
const setTrackArmed = useProjectStore(state => state.setTrackArmed);
setTrackArmed('track-1', true);
```

---

##### `setTrackVolume(trackId: string, volume: number): void`

Set track volume (0.0-1.0).

```typescript
const setTrackVolume = useProjectStore(state => state.setTrackVolume);
setTrackVolume('track-1', 0.8);
```

---

##### `setTrackPan(trackId: string, pan: number): void`

Set track pan (-1.0 to 1.0).

```typescript
const setTrackPan = useProjectStore(state => state.setTrackPan);
setTrackPan('track-1', -0.5);
```

---

##### `setTrackHeight(trackId: string, height: number): void`

Set track height in pixels (48-200).

```typescript
const setTrackHeight = useProjectStore(state => state.setTrackHeight);
setTrackHeight('track-1', 128);
```

---

##### `addClip(trackId: string, clip: Omit<Clip, 'id' | 'trackId'>): void`

Add a clip to a track.

```typescript
const addClip = useProjectStore(state => state.addClip);
addClip('track-1', {
  name: 'Audio Clip',
  startTime: 0,
  duration: 48000,
  color: '#3b82f6',
});
```

---

##### `removeClip(clipId: string): void`

Remove a clip.

```typescript
const removeClip = useProjectStore(state => state.removeClip);
removeClip('clip-1');
```

---

##### `updateClip(clipId: string, updates: Partial<Clip>): void`

Update clip properties.

```typescript
const updateClip = useProjectStore(state => state.updateClip);
updateClip('clip-1', { startTime: 48000, duration: 96000 });
```

---

##### `selectTrack(trackId: string, addToSelection?: boolean): void`

Select a track.

```typescript
const selectTrack = useProjectStore(state => state.selectTrack);
selectTrack('track-1'); // Replace selection
selectTrack('track-2', true); // Add to selection
```

---

##### `selectClip(clipId: string, addToSelection?: boolean): void`

Select a clip.

```typescript
const selectClip = useProjectStore(state => state.selectClip);
selectClip('clip-1');
```

---

##### `clearSelection(): void`

Clear all selections.

```typescript
const clearSelection = useProjectStore(state => state.clearSelection);
clearSelection();
```

---

##### `getTrackById(trackId: string): Track | undefined`

Get track by ID.

```typescript
const getTrackById = useProjectStore(state => state.getTrackById);
const track = getTrackById('track-1');
```

---

##### `getClipById(clipId: string): Clip | undefined`

Get clip by ID.

```typescript
const getClipById = useProjectStore(state => state.getClipById);
const clip = getClipById('clip-1');
```

---

### transportStore

Manages playback state and transport controls.

**Import**:
```typescript
import { useTransportStore } from './stores/transportStore';
```

#### State

```typescript
interface TransportState {
  // Playback state
  isPlaying: boolean;
  isPaused: boolean;
  isRecording: boolean;
  
  // Position (in samples)
  position: number;
  
  // Tempo and time signature
  tempo: number;
  timeSignature: {
    numerator: number;
    denominator: number;
  };
  
  // Loop state
  loopEnabled: boolean;
  loopStart: number;
  loopEnd: number;
  
  // Metronome
  metronomeEnabled: boolean;
  
  // Sample rate
  sampleRate: number;
}
```

#### Actions

##### `play(): void`

Start playback.

```typescript
const play = useTransportStore(state => state.play);
play();
```

---

##### `pause(): void`

Pause playback.

```typescript
const pause = useTransportStore(state => state.pause);
pause();
```

---

##### `stop(): void`

Stop playback and reset position.

```typescript
const stop = useTransportStore(state => state.stop);
stop();
```

---

##### `togglePlayPause(): void`

Toggle between play and pause.

```typescript
const togglePlayPause = useTransportStore(state => state.togglePlayPause);
togglePlayPause();
```

---

##### `startRecording(): void`

Start recording.

```typescript
const startRecording = useTransportStore(state => state.startRecording);
startRecording();
```

---

##### `stopRecording(): void`

Stop recording.

```typescript
const stopRecording = useTransportStore(state => state.stopRecording);
stopRecording();
```

---

##### `setPosition(position: number): void`

Set playback position in samples.

```typescript
const setPosition = useTransportStore(state => state.setPosition);
setPosition(48000); // 1 second at 48kHz
```

---

##### `setTempo(tempo: number): void`

Set tempo (20-999 BPM).

```typescript
const setTempo = useTransportStore(state => state.setTempo);
setTempo(120);
```

---

##### `setTimeSignature(numerator: number, denominator: number): void`

Set time signature.

```typescript
const setTimeSignature = useTransportStore(state => state.setTimeSignature);
setTimeSignature(4, 4); // 4/4 time
```

---

##### `toggleLoop(): void`

Toggle loop on/off.

```typescript
const toggleLoop = useTransportStore(state => state.toggleLoop);
toggleLoop();
```

---

##### `setLoopRegion(start: number, end: number): void`

Set loop region in samples.

```typescript
const setLoopRegion = useTransportStore(state => state.setLoopRegion);
setLoopRegion(0, 192000); // 4 seconds at 48kHz
```

---

##### `toggleMetronome(): void`

Toggle metronome on/off.

```typescript
const toggleMetronome = useTransportStore(state => state.toggleMetronome);
toggleMetronome();
```

---

##### `getPositionInBars(): { bars: number; beats: number; ticks: number }`

Get position in musical time.

```typescript
const getPositionInBars = useTransportStore(state => state.getPositionInBars);
const { bars, beats, ticks } = getPositionInBars();
console.log(`${bars}:${beats}:${ticks}`);
```

---

##### `samplesToSeconds(samples: number): number`

Convert samples to seconds.

```typescript
const samplesToSeconds = useTransportStore(state => state.samplesToSeconds);
const seconds = samplesToSeconds(48000); // 1.0
```

---

##### `secondsToSamples(seconds: number): number`

Convert seconds to samples.

```typescript
const secondsToSamples = useTransportStore(state => state.secondsToSamples);
const samples = secondsToSamples(1.0); // 48000
```

---

### uiStore

Manages UI state (zoom, scroll, etc.).

**Import**:
```typescript
import { useUIStore } from './stores/uiStore';
```

#### State

```typescript
interface UIState {
  // Zoom level (pixels per second)
  zoom: number;
  
  // Scroll position
  scrollX: number;
  scrollY: number;
  
  // Selected tool
  selectedTool: 'select' | 'draw' | 'erase' | 'cut';
  
  // Panel visibility
  mixerVisible: boolean;
  browserVisible: boolean;
}
```

---

## Component Props

### Button

```typescript
interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
}
```

---

### Fader

```typescript
interface FaderProps {
  value: number;        // 0.0 to 1.0
  onChange: (value: number) => void;
  label?: string;
  orientation?: 'vertical' | 'horizontal';
  className?: string;
}
```

---

### Knob

```typescript
interface KnobProps {
  value: number;        // -1.0 to 1.0 (for pan) or 0.0 to 1.0
  onChange: (value: number) => void;
  label?: string;
  min?: number;
  max?: number;
  className?: string;
}
```

---

### Meter

```typescript
interface MeterProps {
  level: number;        // 0.0 to 1.0
  peakLevel?: number;   // 0.0 to 1.0
  orientation?: 'vertical' | 'horizontal';
  className?: string;
}
```

---

## Type Definitions

### Track

```typescript
interface Track {
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
  pan: number;     // -1.0 to 1.0
  
  // Visual
  height: number;  // pixels
  
  // Clips
  clips: Clip[];
}
```

---

### Clip

```typescript
interface Clip {
  id: string;
  name: string;
  trackId: string;
  startTime: number;   // samples
  duration: number;    // samples
  color: string;
  audioFile?: string;
}
```

---

## Usage Examples

### Complete Playback Example

```typescript
import { invoke } from '@tauri-apps/api/core';
import { useTransportStore } from './stores/transportStore';

function PlaybackControl() {
  const { isPlaying, play, pause, stop } = useTransportStore();
  
  const handlePlay = async () => {
    try {
      await invoke('play');
      play(); // Update local state
    } catch (error) {
      console.error('Failed to start playback:', error);
    }
  };
  
  const handleStop = async () => {
    try {
      await invoke('stop');
      stop(); // Update local state
    } catch (error) {
      console.error('Failed to stop playback:', error);
    }
  };
  
  return (
    <div>
      <button onClick={handlePlay} disabled={isPlaying}>
        Play
      </button>
      <button onClick={handleStop}>
        Stop
      </button>
    </div>
  );
}
```

---

### Complete Track Management Example

```typescript
import { invoke } from '@tauri-apps/api/core';
import { useProjectStore } from './stores/projectStore';

function TrackManager() {
  const { tracks, addTrack, removeTrack, setTrackVolume } = useProjectStore();
  
  const handleAddTrack = async () => {
    const name = prompt('Track name:');
    if (!name) return;
    
    try {
      const trackId = await invoke<number>('add_track', { name });
      addTrack(name); // Update local state
      console.log('Track added with ID:', trackId);
    } catch (error) {
      console.error('Failed to add track:', error);
    }
  };
  
  const handleRemoveTrack = async (trackId: string) => {
    try {
      await invoke('remove_track', { trackId: Number(trackId) });
      removeTrack(trackId); // Update local state
    } catch (error) {
      console.error('Failed to remove track:', error);
    }
  };
  
  const handleVolumeChange = async (trackId: string, volume: number) => {
    try {
      await invoke('set_track_volume', { 
        trackId: Number(trackId), 
        volume 
      });
      setTrackVolume(trackId, volume); // Update local state
    } catch (error) {
      console.error('Failed to set volume:', error);
    }
  };
  
  return (
    <div>
      <button onClick={handleAddTrack}>Add Track</button>
      {tracks.map(track => (
        <div key={track.id}>
          <span>{track.name}</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={track.volume}
            onChange={(e) => handleVolumeChange(track.id, Number(e.target.value))}
          />
          <button onClick={() => handleRemoveTrack(track.id)}>Remove</button>
        </div>
      ))}
    </div>
  );
}
```

---

**Last Updated**: 2026-05-15  
**Version**: 0.1.0 MVP  
**Maintainers**: AUDIAW Contributors
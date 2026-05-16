# AUDIAW Architecture

> Comprehensive technical architecture documentation for the AUDIAW Digital Audio Workstation

## Table of Contents

- [System Overview](#system-overview)
- [Design Philosophy](#design-philosophy)
- [Technology Stack](#technology-stack)
- [Monorepo Structure](#monorepo-structure)
- [Rust Crate Architecture](#rust-crate-architecture)
- [Frontend Architecture](#frontend-architecture)
- [IPC Communication Layer](#ipc-communication-layer)
- [Data Flow](#data-flow)
- [Audio Engine Design](#audio-engine-design)
- [State Management](#state-management)
- [Performance Considerations](#performance-considerations)
- [Scalability](#scalability)

---

## System Overview

AUDIAW is a professional-grade Digital Audio Workstation built with a hybrid architecture combining Rust's performance and safety for audio processing with React's flexibility for the user interface.

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     AUDIAW Application                       │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌─────────────────────────────────────────────────────┐   │
│  │           React Frontend (TypeScript)                │   │
│  │  ┌──────────────┐  ┌──────────────┐  ┌───────────┐ │   │
│  │  │  Components  │  │    Stores    │  │   Hooks   │ │   │
│  │  │  (UI Layer)  │  │  (Zustand)   │  │ (Effects) │ │   │
│  │  └──────────────┘  └──────────────┘  └───────────┘ │   │
│  └─────────────────────────────────────────────────────┘   │
│                           │                                  │
│                           │ Tauri IPC                        │
│                           ▼                                  │
│  ┌─────────────────────────────────────────────────────┐   │
│  │          Tauri Application Shell (Rust)              │   │
│  │  ┌──────────────┐  ┌──────────────┐  ┌───────────┐ │   │
│  │  │   Commands   │  │    Events    │  │   State   │ │   │
│  │  │  (16 APIs)   │  │  (Emitters)  │  │ (AppState)│ │   │
│  │  └──────────────┘  └──────────────┘  └───────────┘ │   │
│  └─────────────────────────────────────────────────────┘   │
│                           │                                  │
│                           │ Direct Calls                     │
│                           ▼                                  │
│  ┌─────────────────────────────────────────────────────┐   │
│  │         Audio Engine (Rust Crates)                   │   │
│  │  ┌──────────────┐  ┌──────────────┐  ┌───────────┐ │   │
│  │  │ audiaw-engine│  │audiaw-audio-io│ │audiaw-types│ │   │
│  │  │ (Processing) │  │  (CPAL I/O)  │  │  (Shared) │ │   │
│  │  └──────────────┘  └──────────────┘  └───────────┘ │   │
│  │  ┌──────────────┐                                    │   │
│  │  │audiaw-project│                                    │   │
│  │  │(Persistence) │                                    │   │
│  │  └──────────────┘                                    │   │
│  └─────────────────────────────────────────────────────┘   │
│                           │                                  │
│                           │ System Calls                     │
│                           ▼                                  │
│  ┌─────────────────────────────────────────────────────┐   │
│  │         Operating System Audio Layer                 │   │
│  │    (WASAPI / CoreAudio / ALSA / PulseAudio)         │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

---

## Design Philosophy

### Core Principles

1. **Performance First**: Audio processing requires real-time performance with minimal latency
2. **Type Safety**: Leverage Rust's type system to prevent runtime errors in critical paths
3. **Lock-Free Design**: Avoid locks in audio thread to prevent priority inversion
4. **Separation of Concerns**: Clear boundaries between UI, business logic, and audio processing
5. **Developer Experience**: Easy to understand, modify, and extend
6. **Cross-Platform**: Single codebase for Windows, macOS, and Linux

### Why This Architecture?

- **Rust for Audio**: Memory safety without garbage collection, zero-cost abstractions
- **React for UI**: Component-based architecture, rich ecosystem, fast development
- **Tauri Bridge**: Lightweight, secure, native performance
- **Monorepo**: Shared code, consistent versioning, simplified development

---

## Technology Stack

### Backend (Rust)

| Technology | Purpose | Version |
|------------|---------|---------|
| **Rust** | Core language | 1.75+ |
| **Tauri** | Desktop framework | 2.0 |
| **CPAL** | Cross-platform audio I/O | 0.15 |
| **crossbeam** | Lock-free data structures | 0.8 |
| **arc-swap** | Atomic reference counting | 1.6 |
| **serde** | Serialization | 1.0 |
| **tracing** | Logging and diagnostics | 0.1 |

### Frontend (TypeScript/React)

| Technology | Purpose | Version |
|------------|---------|---------|
| **React** | UI framework | 18.2 |
| **TypeScript** | Type safety | 5.3 |
| **Zustand** | State management | 4.4 |
| **Tailwind CSS** | Styling | 3.4 |
| **Vite** | Build tool | 5.0 |

### Justification

- **Rust**: Required for real-time audio processing with predictable performance
- **Tauri over Electron**: 10x smaller bundle, native performance, better security
- **Zustand over Redux**: Simpler API, less boilerplate, better TypeScript support
- **Tailwind**: Rapid UI development, consistent design system

---

## Monorepo Structure

```
audiaw/
├── crates/                    # Rust workspace
│   ├── audiaw-types/         # Shared type definitions
│   ├── audiaw-engine/        # Core audio processing
│   ├── audiaw-audio-io/      # Audio I/O abstraction
│   └── audiaw-project/       # Project file format
├── src-tauri/                # Tauri application
│   ├── src/main.rs          # Entry point, IPC handlers
│   └── Cargo.toml           # Dependencies
├── src/                      # React frontend
│   ├── components/          # UI components
│   ├── stores/              # Zustand stores
│   └── styles/              # Theme and styles
├── docs/                     # Documentation
└── package.json             # Frontend dependencies
```

### Benefits

- **Code Sharing**: Types shared between Rust crates
- **Atomic Changes**: Update multiple crates in single commit
- **Consistent Versioning**: All crates version together
- **Simplified CI/CD**: Single build pipeline

---

## Rust Crate Architecture

### 1. audiaw-types

**Purpose**: Shared type definitions used across all crates

**Key Types**:
```rust
// Core types
pub type Sample = f32;              // Audio sample (-1.0 to 1.0)
pub type SampleRate = u32;          // Hz (44100, 48000, etc.)
pub type SamplePosition = u64;      // Position in samples
pub type TrackId = u32;             // Unique track identifier
pub type ClipId = u32;              // Unique clip identifier

// Transport state
pub enum TransportState {
    Stopped,
    Playing,
    Recording,
    Paused,
}

// Audio data structures
pub struct AudioClip { ... }        // Audio clip with metadata
pub struct Track { ... }            // Multi-clip track
pub struct AudioConfig { ... }      // Engine configuration
```

**Design Decisions**:
- Use `f32` for samples (industry standard, SIMD-friendly)
- Use `u64` for positions (supports hours of audio at any sample rate)
- Derive `Serialize`/`Deserialize` for IPC communication

### 2. audiaw-engine

**Purpose**: Core audio processing engine

**Architecture**:
```rust
pub struct AudioEngine {
    state: Arc<ArcSwap<EngineState>>,  // Lock-free state
    command_tx: Sender<EngineCommand>,  // Command channel
    event_rx: Receiver<EngineEvent>,    // Event channel
}

// Commands (UI → Engine)
pub enum EngineCommand {
    Play, Stop, Pause,
    AddTrack(Track),
    SetTrackVolume(TrackId, f32),
    // ... 11 total commands
}

// Events (Engine → UI)
pub enum EngineEvent {
    TransportStateChanged(TransportState),
    PositionChanged(SamplePosition),
    TrackAdded(TrackId),
    // ...
}
```

**Key Features**:
- **Lock-Free State**: Uses `arc-swap` for atomic state updates
- **Command Pattern**: Decouples UI from audio thread
- **Event-Driven**: Async notifications to UI
- **Thread-Safe**: Separate command processing and audio threads

**Processing Flow**:
```
UI Thread          Command Thread       Audio Thread
    │                    │                    │
    ├─ Command ────────→ │                    │
    │                    ├─ Process           │
    │                    ├─ Update State ────→│
    │                    │                    ├─ Read State
    │                    │                    ├─ Process Audio
    │                    │                    ├─ Output
    │                    ├─ Event ───────────→│
    ←─ Event ───────────┤                    │
```

### 3. audiaw-audio-io

**Purpose**: Cross-platform audio I/O abstraction

**Responsibilities**:
- Initialize audio devices
- Configure sample rate and buffer size
- Handle platform-specific audio APIs
- Provide callback interface for audio processing

**Platform Support**:
- **Windows**: WASAPI
- **macOS**: CoreAudio
- **Linux**: ALSA / PulseAudio

### 4. audiaw-project

**Purpose**: Project file format and persistence

**Features**:
- Save/load project files
- JSON-based format (human-readable)
- Metadata management
- Track and clip serialization

**File Format**:
```json
{
  "metadata": {
    "name": "My Project",
    "version": "0.1.0",
    "created_at": "2026-05-15T10:00:00Z"
  },
  "tracks": [
    {
      "id": 1,
      "name": "Track 1",
      "volume": 0.8,
      "clips": []
    }
  ]
}
```

---

## Frontend Architecture

### Component Hierarchy

```
App
├── Header
│   └── ProjectInfo
├── TransportBar
│   ├── PlayButton
│   ├── StopButton
│   ├── RecordButton
│   └── TempoControl
├── MainContent
│   ├── TrackList
│   │   └── TrackControls (per track)
│   │       ├── Fader
│   │       ├── Knob (pan)
│   │       ├── Meter
│   │       └── Buttons (mute/solo/arm)
│   └── ArrangementArea
│       ├── Timeline
│       │   └── TimelineRuler
│       └── ArrangementView
│           └── TrackLane (per track)
│               └── AudioClip (per clip)
└── Footer
    └── StatusBar
```

### Component Design Principles

1. **Single Responsibility**: Each component has one clear purpose
2. **Composition**: Build complex UIs from simple components
3. **Reusability**: UI primitives (Button, Fader, Knob) used everywhere
4. **Type Safety**: Full TypeScript coverage with strict mode
5. **Performance**: React.memo for expensive components

### Key Components

**TransportBar** (`src/components/Transport/TransportBar.tsx`)
- Controls playback state
- Displays position and tempo
- Keyboard shortcuts (Space, Esc, R)

**TrackList** (`src/components/TrackList/TrackList.tsx`)
- Displays all tracks
- Track controls (volume, pan, mute, solo, arm)
- Add/remove tracks

**ArrangementView** (`src/components/ArrangementView/ArrangementView.tsx`)
- Visual timeline
- Drag-and-drop clips
- Zoom and scroll

**Timeline** (`src/components/Timeline/Timeline.tsx`)
- Time ruler
- Bar/beat markers
- Playhead position

---

## IPC Communication Layer

### Tauri Commands (Frontend → Backend)

All 16 commands defined in `src-tauri/src/main.rs`:

```rust
// Project Management
new_project(name: String) -> Result<String, String>
load_project(path: String) -> Result<String, String>
save_project(path: String) -> Result<(), String>
get_project_metadata() -> Result<String, String>

// Track Management
get_tracks() -> Result<String, String>
add_track(name: String) -> Result<u32, String>
remove_track(track_id: u32) -> Result<(), String>

// Transport Control
play() -> Result<(), String>
stop() -> Result<(), String>
pause() -> Result<(), String>
get_transport_state() -> Result<String, String>
get_position() -> Result<u64, String>

// Mixer Control
set_track_volume(track_id: u32, volume: f32) -> Result<(), String>
set_track_pan(track_id: u32, pan: f32) -> Result<(), String>
set_track_mute(track_id: u32, muted: bool) -> Result<(), String>
set_track_solo(track_id: u32, solo: bool) -> Result<(), String>
set_master_volume(volume: f32) -> Result<(), String>
```

### Usage Example

```typescript
import { invoke } from '@tauri-apps/api/core';

// Add a track
const trackId = await invoke<number>('add_track', { 
  name: 'New Track' 
});

// Set volume
await invoke('set_track_volume', { 
  trackId, 
  volume: 0.8 
});
```

### Error Handling

```typescript
try {
  await invoke('play');
} catch (error) {
  console.error('Failed to start playback:', error);
  // Show user-friendly error message
}
```

---

## Data Flow

### Playback Flow

```
User clicks Play
    │
    ├─→ React onClick handler
    │
    ├─→ transportStore.play()
    │
    ├─→ invoke('play')
    │
    ├─→ Tauri command handler
    │
    ├─→ engine.send_command(EngineCommand::Play)
    │
    ├─→ Command channel
    │
    ├─→ Engine thread processes command
    │
    ├─→ Update state (lock-free)
    │
    ├─→ Audio thread reads state
    │
    └─→ Start audio processing
```

### State Update Flow

```
Engine state changes
    │
    ├─→ Emit EngineEvent
    │
    ├─→ Event channel
    │
    ├─→ Tauri event emitter
    │
    ├─→ Frontend event listener
    │
    ├─→ Update Zustand store
    │
    └─→ React re-renders
```

---

## Audio Engine Design

### Lock-Free Architecture

**Problem**: Locks in audio thread cause priority inversion and dropouts

**Solution**: Lock-free data structures

```rust
// Lock-free state updates
pub struct AudioEngine {
    state: Arc<ArcSwap<EngineState>>,  // Atomic pointer swap
}

// Update state (command thread)
state.rcu(|current| {
    let mut new_state = (**current).clone();
    new_state.volume = 0.8;
    new_state
});

// Read state (audio thread) - NO LOCKS!
let state = self.state.load();
let volume = state.volume;
```

### Real-Time Safety

**Rules**:
1. No allocations in audio thread
2. No locks in audio thread
3. No system calls in audio thread
4. Bounded execution time

**Implementation**:
- Pre-allocate all buffers
- Use lock-free channels for commands
- Process audio in fixed-size chunks
- Use `arc-swap` for state updates

### Audio Processing Pipeline

```
Input Buffer
    │
    ├─→ For each track:
    │   ├─→ Read clips at current position
    │   ├─→ Apply volume
    │   ├─→ Apply pan
    │   ├─→ Mix to track buffer
    │   └─→ Check mute/solo
    │
    ├─→ Sum all tracks
    │
    ├─→ Apply master volume
    │
    ├─→ Clip to [-1.0, 1.0]
    │
    └─→ Output Buffer
```

---

## State Management

### Zustand Stores

**projectStore** (`src/stores/projectStore.ts`)
- Project metadata (name, tempo, sample rate)
- Track list
- Clip data
- Selection state

**transportStore** (`src/stores/transportStore.ts`)
- Playback state (playing, paused, recording)
- Position
- Tempo and time signature
- Loop settings
- Metronome

**uiStore** (`src/stores/uiStore.ts`)
- Zoom level
- Scroll position
- Selected tools
- Panel visibility

### State Synchronization

```typescript
// Frontend state
const { isPlaying } = useTransportStore();

// Sync with backend
useEffect(() => {
  const interval = setInterval(async () => {
    const state = await invoke<string>('get_transport_state');
    const parsed = JSON.parse(state);
    transportStore.setState({ isPlaying: parsed === 'Playing' });
  }, 100);
  
  return () => clearInterval(interval);
}, []);
```

---

## Performance Considerations

### Audio Thread Performance

- **Target Latency**: < 10ms (512 samples @ 48kHz)
- **CPU Usage**: < 50% per core for 8 tracks
- **Memory**: Pre-allocated buffers, no runtime allocation

### UI Performance

- **Target FPS**: 60fps for smooth animations
- **React Optimization**: 
  - `React.memo` for expensive components
  - `useMemo` for computed values
  - `useCallback` for event handlers
- **Virtual Scrolling**: For large track lists

### IPC Performance

- **Command Latency**: < 1ms
- **Batch Updates**: Group related commands
- **Async Operations**: Non-blocking UI

---

## Scalability

### Current Limits (v0.1 MVP)

- **Tracks**: 8 tracks
- **Clips per Track**: Unlimited (memory-bound)
- **Sample Rate**: 48kHz
- **Bit Depth**: 32-bit float

### Future Scalability (v1.0+)

- **Tracks**: 128+ tracks
- **Plugin Support**: VST3, CLAP
- **Multi-threading**: Parallel track processing
- **Disk Streaming**: Large audio files
- **GPU Acceleration**: FFT, convolution

### Architecture Extensibility

The modular architecture supports:
- New audio effects (add to processing pipeline)
- New instruments (implement trait)
- New file formats (add to project crate)
- New UI components (React composition)

---

## Conclusion

AUDIAW's architecture prioritizes:
1. **Real-time Performance**: Lock-free, allocation-free audio processing
2. **Type Safety**: Rust and TypeScript prevent entire classes of bugs
3. **Maintainability**: Clear separation of concerns, modular design
4. **Extensibility**: Easy to add features without breaking existing code

This architecture provides a solid foundation for building a professional DAW while maintaining code quality and developer productivity.

---

**Last Updated**: 2026-05-15  
**Version**: 0.1.0 MVP  
**Maintainers**: AUDIAW Contributors
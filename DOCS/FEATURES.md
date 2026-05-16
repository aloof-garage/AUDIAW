# AUDIAW Features

> Complete feature documentation for AUDIAW v0.1.0 MVP

## Table of Contents

- [Current Features (v0.1 MVP)](#current-features-v01-mvp)
- [Feature Details](#feature-details)
- [Keyboard Shortcuts](#keyboard-shortcuts)
- [UI Components Guide](#ui-components-guide)
- [Workflow Examples](#workflow-examples)
- [Tips and Tricks](#tips-and-tricks)
- [Known Limitations](#known-limitations)

---

## Current Features (v0.1 MVP)

### ✅ Core Audio Engine

- **Multi-track Audio Processing**
  - Support for up to 8 audio tracks
  - Real-time audio mixing
  - Lock-free audio processing for glitch-free playback
  - 48kHz sample rate, 32-bit float precision

- **Transport Controls**
  - Play, pause, and stop functionality
  - Position tracking in samples
  - Transport state management

- **Track Management**
  - Add and remove tracks dynamically
  - Individual track controls (volume, pan, mute, solo, arm)
  - Track naming and organization

### ✅ User Interface

- **Professional DAW Layout**
  - Header with project information
  - Transport bar with playback controls
  - Track list sidebar with mixer controls
  - Arrangement view with timeline
  - Status bar with system information

- **Transport Bar**
  - Play/Pause/Stop buttons
  - Record button
  - Position display (bars:beats:ticks)
  - Tempo control
  - Time signature display

- **Track List**
  - Vertical fader for volume control
  - Rotary knob for pan control
  - Mute/Solo/Arm buttons
  - Level meters (visual feedback)
  - Track name display

- **Arrangement View**
  - Timeline ruler with bar/beat markers
  - Track lanes for audio clips
  - Horizontal scrolling
  - Visual track representation

- **Timeline**
  - Bar and beat markers
  - Time ruler
  - Playhead position indicator

### ✅ Project Management

- **Project Operations**
  - Create new projects
  - Save projects to disk (JSON format)
  - Load existing projects
  - Project metadata (name, author, timestamps)

- **Project State**
  - Track configuration persistence
  - Tempo and time signature
  - Sample rate configuration

### ✅ State Management

- **Zustand Stores**
  - Project store (tracks, clips, selection)
  - Transport store (playback state, position)
  - UI store (zoom, scroll, tool selection)

- **Real-time Synchronization**
  - Frontend-backend state sync via IPC
  - Reactive UI updates
  - Optimistic UI updates

### ✅ Cross-Platform Support

- **Windows**: WASAPI audio backend
- **macOS**: CoreAudio backend
- **Linux**: ALSA/PulseAudio backend

---

## Feature Details

### Audio Engine

#### Multi-Track Processing

The audio engine supports simultaneous playback of multiple tracks with individual processing:

```
Track 1 (Vocals)    → Volume → Pan → Mute/Solo →┐
Track 2 (Guitar)    → Volume → Pan → Mute/Solo →├→ Master Mix → Output
Track 3 (Drums)     → Volume → Pan → Mute/Solo →┘
```

**Specifications**:
- **Sample Rate**: 48,000 Hz
- **Bit Depth**: 32-bit float
- **Buffer Size**: 512 samples (~10.7ms latency)
- **Channels**: Stereo (2 channels)
- **Max Tracks**: 8 (MVP), expandable in future

#### Lock-Free Design

The audio engine uses lock-free data structures to ensure:
- No audio dropouts or glitches
- Consistent low latency
- Real-time safe operation
- No priority inversion

**Technical Details**:
- Uses `arc-swap` for atomic state updates
- Command/event pattern for thread communication
- Pre-allocated buffers (no runtime allocation)
- Bounded execution time in audio thread

### Transport Controls

#### Play/Pause/Stop

**Play**:
- Starts playback from current position
- Continues from paused position
- Keyboard shortcut: `Space`

**Pause**:
- Pauses playback at current position
- Maintains position for resume
- Keyboard shortcut: `Space` (toggle)

**Stop**:
- Stops playback
- Resets position to 0
- Keyboard shortcut: `Esc`

#### Position Tracking

Position is tracked in multiple formats:
- **Samples**: Raw sample count (e.g., 48000 = 1 second @ 48kHz)
- **Seconds**: Time in seconds (e.g., 1.5s)
- **Musical Time**: Bars:Beats:Ticks (e.g., 1:1:0)

**Conversion**:
```typescript
// Samples to seconds
const seconds = samples / sampleRate;

// Seconds to samples
const samples = seconds * sampleRate;

// Samples to musical time
const beatsPerSecond = tempo / 60;
const totalBeats = (samples / sampleRate) * beatsPerSecond;
const bars = Math.floor(totalBeats / timeSignature.numerator);
const beats = Math.floor(totalBeats % timeSignature.numerator);
```

### Track Management

#### Track Types

Currently supported:
- **Audio Tracks**: For audio clips and recordings

Future support (v0.5+):
- **MIDI Tracks**: For MIDI notes and instruments
- **Group Tracks**: For submixing
- **Return Tracks**: For send effects

#### Track Controls

**Volume Fader**:
- Range: 0.0 (silence) to 1.0 (unity gain)
- Linear scale
- Visual feedback via level meter
- Real-time adjustment

**Pan Knob**:
- Range: -1.0 (full left) to 1.0 (full right)
- Center: 0.0 (equal balance)
- Constant power panning law

**Mute Button**:
- Silences track output
- Visual indicator when active
- Does not affect recording

**Solo Button**:
- Mutes all other tracks
- Multiple tracks can be soloed
- Visual indicator when active

**Arm Button**:
- Prepares track for recording
- Visual indicator when active
- Required for recording (future feature)

### Project Management

#### Project File Format

Projects are saved as JSON files with `.audiaw` extension:

```json
{
  "metadata": {
    "name": "My Project",
    "author": "AUDIAW User",
    "created_at": "2026-05-15T10:00:00Z",
    "modified_at": "2026-05-15T11:30:00Z",
    "version": "0.1.0"
  },
  "config": {
    "sample_rate": 48000,
    "tempo": 120,
    "time_signature": {
      "numerator": 4,
      "denominator": 4
    }
  },
  "tracks": [
    {
      "id": 1,
      "name": "Track 1",
      "volume": 0.8,
      "pan": 0.0,
      "muted": false,
      "solo": false,
      "armed": false,
      "clips": []
    }
  ]
}
```

**Benefits**:
- Human-readable format
- Easy to version control
- Extensible structure
- Cross-platform compatible

---

## Keyboard Shortcuts

### Global Shortcuts

| Shortcut | Action | Description |
|----------|--------|-------------|
| `Space` | Play/Pause | Toggle playback |
| `Esc` | Stop | Stop playback and reset position |
| `R` | Record | Start/stop recording |

### Transport Shortcuts (Future)

| Shortcut | Action | Description |
|----------|--------|-------------|
| `Home` | Go to Start | Jump to position 0 |
| `End` | Go to End | Jump to end of project |
| `←` | Rewind | Move backward |
| `→` | Fast Forward | Move forward |
| `L` | Toggle Loop | Enable/disable loop |

### Track Shortcuts (Future)

| Shortcut | Action | Description |
|----------|--------|-------------|
| `Ctrl+T` | New Track | Add new audio track |
| `Delete` | Delete Track | Remove selected track |
| `M` | Mute | Toggle mute on selected track |
| `S` | Solo | Toggle solo on selected track |
| `A` | Arm | Toggle arm on selected track |

### Edit Shortcuts (Future)

| Shortcut | Action | Description |
|----------|--------|-------------|
| `Ctrl+Z` | Undo | Undo last action |
| `Ctrl+Y` | Redo | Redo last undone action |
| `Ctrl+X` | Cut | Cut selection |
| `Ctrl+C` | Copy | Copy selection |
| `Ctrl+V` | Paste | Paste clipboard |

---

## UI Components Guide

### Transport Bar

Located at the top of the window, below the header.

**Components**:
1. **Play Button** (▶️) - Start playback
2. **Pause Button** (⏸️) - Pause playback
3. **Stop Button** (⏹️) - Stop and reset
4. **Record Button** (⏺️) - Start recording
5. **Position Display** - Shows current position
6. **Tempo Control** - Adjust project tempo
7. **Time Signature** - Display time signature

**Visual States**:
- **Playing**: Green indicator, play button highlighted
- **Paused**: Yellow indicator, pause button highlighted
- **Recording**: Red indicator, record button pulsing
- **Stopped**: No indicator, all buttons normal

### Track List

Located on the left side of the window.

**Per-Track Components**:
1. **Track Name** - Editable track name
2. **Volume Fader** - Vertical slider (0-100%)
3. **Pan Knob** - Rotary control (L-C-R)
4. **Level Meter** - Visual level display
5. **Mute Button** (M) - Toggle mute
6. **Solo Button** (S) - Toggle solo
7. **Arm Button** (R) - Toggle record arm

**Visual Feedback**:
- **Muted**: Track grayed out, M button highlighted
- **Soloed**: Track highlighted, S button highlighted
- **Armed**: Track red border, R button highlighted
- **Level Meter**: Green (safe), yellow (loud), red (clipping)

### Arrangement View

Located in the center, taking up most of the window.

**Components**:
1. **Timeline Ruler** - Bar/beat markers at top
2. **Track Lanes** - Horizontal lanes per track
3. **Audio Clips** - Visual representation of audio
4. **Playhead** - Vertical line showing position
5. **Scroll Bars** - Horizontal and vertical scrolling

**Interactions** (Future):
- Click to place playhead
- Drag to select region
- Double-click to add clip
- Right-click for context menu

### Timeline

Located at the top of the arrangement view.

**Features**:
- Bar numbers (1, 2, 3, ...)
- Beat markers (|, |, |, |)
- Playhead position indicator
- Zoom controls (future)

---

## Workflow Examples

### Example 1: Creating a New Project

1. Launch AUDIAW
2. Project automatically created with default name
3. Add tracks using "Add Track" button
4. Name your tracks (Vocals, Guitar, Drums, etc.)
5. Adjust track settings (volume, pan)
6. Save project: File → Save As

### Example 2: Basic Playback

1. Open or create a project
2. Add audio clips to tracks (future feature)
3. Click Play button or press Space
4. Adjust volume faders while playing
5. Use Mute/Solo to focus on specific tracks
6. Press Stop or Esc to stop playback

### Example 3: Mixing Tracks

1. Start playback
2. Adjust volume faders to balance tracks
3. Use pan knobs to position tracks in stereo field
4. Watch level meters to avoid clipping
5. Use solo to isolate individual tracks
6. Use mute to temporarily remove tracks

### Example 4: Recording (Future)

1. Create or open a project
2. Add a new audio track
3. Click Arm button on the track
4. Click Record button or press R
5. Perform your recording
6. Click Stop to finish recording
7. New audio clip appears on track

---

## Tips and Tricks

### Performance Tips

1. **Reduce Latency**:
   - Use smaller buffer sizes (future setting)
   - Close unnecessary applications
   - Use ASIO drivers on Windows (future)

2. **Optimize CPU Usage**:
   - Freeze tracks you're not editing (future)
   - Use fewer tracks when possible
   - Disable unused plugins (future)

3. **Prevent Audio Dropouts**:
   - Don't run CPU-intensive tasks while recording
   - Increase buffer size if experiencing dropouts
   - Use SSD for audio files (future)

### Workflow Tips

1. **Organization**:
   - Name tracks descriptively
   - Use consistent color coding (future)
   - Group related tracks (future)

2. **Mixing**:
   - Start with volume balancing
   - Use pan to create space
   - Leave headroom (don't clip)
   - Reference on different speakers

3. **Project Management**:
   - Save frequently (Ctrl+S)
   - Use version numbers in filenames
   - Keep project files organized
   - Back up important projects

### Keyboard Efficiency

1. **Learn Shortcuts**:
   - Space for play/pause
   - Esc for stop
   - R for record

2. **Use Both Hands**:
   - Left hand on keyboard
   - Right hand on mouse
   - Faster workflow

---

## Known Limitations

### Current MVP Limitations

1. **Audio Clips**:
   - Audio files can be imported through the Browser or expanded track controls
   - Clips can be selected and dragged in the arrangement
   - Waveform previews are deterministic visual previews, not full-resolution waveform caches yet
   - Advanced clip editing such as split, fades, and time-stretch is still pending

2. **Recording**:
   - Armed-track recording is wired through the Tauri backend
   - Input device discovery is available where the OS exposes devices
   - Input monitoring, punch-in, loop recording, and take management are still pending

3. **Effects**:
   - Built-in Rust effects crates exist for gain, EQ, and reverb
   - Full per-track effect chain UI is still pending
   - Third-party plugin support is not implemented yet

4. **MIDI**:
   - No MIDI support
   - No virtual instruments

5. **Automation**:
   - No parameter automation
   - No envelope editing

6. **Editing**:
   - Undo/redo backend foundations and toolbar controls are present
   - No copy/paste
   - No time selection

7. **Export**:
   - WAV export is available through the toolbar Export action
   - Stem export and advanced render queues are still pending

8. **UI**:
   - Horizontal zoom controls are available in the timeline
   - Session View, Piano Roll, Channel Rack, Device Rack, Automation, Routing, and Preferences surfaces are available
   - Workspace presets support arrange, performance, edit, and mix layouts
   - Limited customization
   - No themes

### Planned Improvements

See [ROADMAP.md](ROADMAP.md) for planned features and timeline.

---

## Feature Requests

Have an idea for a new feature? We'd love to hear it!

1. Check the [roadmap](ROADMAP.md) first
2. Search [existing issues](https://github.com/audiaw/audiaw/issues)
3. Create a [feature request](https://github.com/audiaw/audiaw/issues/new?template=feature_request.md)

---

## Feedback

Your feedback helps make AUDIAW better!

- **Bug Reports**: [GitHub Issues](https://github.com/audiaw/audiaw/issues)
- **Feature Requests**: [GitHub Issues](https://github.com/audiaw/audiaw/issues)
- **General Feedback**: [GitHub Discussions](https://github.com/audiaw/audiaw/discussions)

---

**Last Updated**: 2026-05-15  
**Version**: 0.1.0 MVP  
**Maintainers**: AUDIAW Contributors

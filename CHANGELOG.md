# Changelog

All notable changes to AUDIAW will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Planned for v0.5.0 (Q3 2026)
- Audio file import (WAV, MP3, FLAC, OGG)
- Audio recording from input devices
- Built-in effects (EQ, compressor, reverb, delay)
- Waveform display and editing
- Undo/redo system
- Audio export/mixdown

## [0.1.0] - 2026-05-15

### Added - Initial MVP Release

#### Core Audio Engine
- Multi-track audio processing (8 tracks)
- Real-time audio mixing
- Lock-free audio processing architecture
- Transport controls (play, pause, stop)
- Position tracking in samples
- 48kHz sample rate, 32-bit float precision
- Cross-platform audio I/O (WASAPI, CoreAudio, ALSA)

#### User Interface
- Professional DAW layout
- Transport bar with playback controls
- Track list with mixer controls
- Arrangement view with timeline
- Timeline ruler with bar/beat markers
- Status bar with system information
- Dark theme optimized for long sessions
- Responsive design with smooth animations

#### Track Management
- Add and remove tracks dynamically
- Track naming and organization
- Individual track controls:
  - Volume faders (0.0 to 1.0)
  - Pan knobs (-1.0 to 1.0)
  - Mute buttons
  - Solo buttons
  - Arm buttons (visual only)
- Level meters with visual feedback

#### Project Management
- Create new projects
- Save projects to disk (JSON format)
- Load existing projects
- Project metadata (name, author, timestamps)
- Human-readable project file format
- Version control friendly

#### State Management
- Zustand stores for state management:
  - Project store (tracks, clips, selection)
  - Transport store (playback state, position)
  - UI store (zoom, scroll, tool selection)
- Real-time state synchronization
- Reactive UI updates

#### Developer Experience
- Comprehensive documentation (5,000+ lines)
- Architecture documentation
- Development guide
- API reference
- Contributing guidelines
- Installation guide
- Quick start tutorial

#### Technical Implementation
- Rust backend with 4 custom crates:
  - audiaw-types (shared type definitions)
  - audiaw-engine (core audio processing)
  - audiaw-audio-io (audio I/O abstraction)
  - audiaw-project (project file format)
- React frontend with TypeScript
- Tauri 2.0 for desktop framework
- 16 Tauri commands for IPC
- 15+ React components
- Lock-free data structures (arc-swap, crossbeam)

#### Keyboard Shortcuts
- `Space` - Play/Pause toggle
- `Esc` - Stop playback
- `R` - Record indicator

### Technical Highlights
- Lock-free audio thread (no mutex in audio processing)
- Type-safe across the stack (Rust + TypeScript)
- Small bundle size (~10MB vs ~100MB for Electron)
- Cross-platform from day one
- Modular, scalable architecture

### Known Limitations
- No audio file import yet
- No recording functionality yet
- No effects or plugins yet
- No MIDI support yet
- No automation yet
- No undo/redo yet
- Limited to 8 tracks (MVP scope)

### Documentation
- README.md - Project overview
- INSTALL.md - Installation guide
- QUICKSTART.md - 5-minute tutorial
- CONTRIBUTING.md - Contribution guidelines
- docs/ARCHITECTURE.md - System architecture
- docs/DEVELOPMENT.md - Developer guide
- docs/API.md - API reference
- docs/FEATURES.md - Feature documentation
- docs/ROADMAP.md - Product roadmap
- docs/HACKATHON.md - Hackathon submission
- docs/DEMO.md - Demo script

### Built With
- Rust 1.75+
- React 18.2
- TypeScript 5.3
- Tauri 2.0
- Zustand 4.4
- Tailwind CSS 3.4
- CPAL 0.15
- Vite 5.0

### Contributors
- AUDIAW Contributors
- Built with IBM BOB

---

## Release Notes Format

### [Version] - YYYY-MM-DD

#### Added
- New features

#### Changed
- Changes to existing functionality

#### Deprecated
- Soon-to-be removed features

#### Removed
- Removed features

#### Fixed
- Bug fixes

#### Security
- Security improvements

---

## Links

- [Repository](https://github.com/audiaw/audiaw)
- [Documentation](https://github.com/audiaw/audiaw/tree/main/docs)
- [Issues](https://github.com/audiaw/audiaw/issues)
- [Releases](https://github.com/audiaw/audiaw/releases)

---

**Note**: This project is in active development. Features and APIs may change between versions until v1.0.0 stable release.
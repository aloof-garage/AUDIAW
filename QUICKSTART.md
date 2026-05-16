# AUDIAW Quick Start Guide

> Get up and running with AUDIAW in 5 minutes

## Table of Contents

- [5-Minute Setup](#5-minute-setup)
- [Your First Project](#your-first-project)
- [Basic Workflow](#basic-workflow)
- [Key Features Overview](#key-features-overview)
- [Next Steps](#next-steps)

---

## 5-Minute Setup

### Prerequisites Check

Before starting, ensure you have:
- ✅ Rust 1.75+ installed ([rustup.rs](https://rustup.rs/))
- ✅ Node.js 20+ installed ([nodejs.org](https://nodejs.org/))
- ✅ pnpm 8+ installed (`npm install -g pnpm`)

### Quick Install

```bash
# 1. Clone the repository
git clone https://github.com/audiaw/audiaw.git
cd audiaw

# 2. Install dependencies (takes ~2 minutes)
pnpm install

# 3. Start AUDIAW (takes ~1 minute first time)
pnpm dev
```

**That's it!** AUDIAW should now be running on your machine.

---

## Your First Project

### Step 1: Launch AUDIAW

When you run `pnpm dev`, AUDIAW automatically:
- Creates a new project called "Untitled Project"
- Sets tempo to 120 BPM
- Sets time signature to 4/4
- Configures sample rate to 48kHz

### Step 2: Understand the Interface

```
┌─────────────────────────────────────────────────────────┐
│  AUDIAW - Untitled Project                    v0.1.0   │ ← Header
├─────────────────────────────────────────────────────────┤
│  ▶️ ⏸️ ⏹️ ⏺️  |  0:0:0  |  120 BPM  |  4/4           │ ← Transport Bar
├──────────┬──────────────────────────────────────────────┤
│  Track 1 │  ═══════════════════════════════════════    │
│  [Fader] │  Timeline with bars and beats               │ ← Main Area
│  [Pan]   │                                              │
│  M S R   │                                              │
├──────────┴──────────────────────────────────────────────┤
│  Ready  |  48kHz  |  512 samples  |  Made with Bob    │ ← Status Bar
└─────────────────────────────────────────────────────────┘
```

**Key Areas**:
1. **Header**: Project name and version
2. **Transport Bar**: Playback controls
3. **Track List** (left): Mixer controls per track
4. **Arrangement View** (center): Timeline and clips
5. **Status Bar**: System information

---

## Basic Workflow

### Adding Tracks

1. **Click "Add Track" button** (in track list)
2. **Enter track name** (e.g., "Vocals", "Guitar", "Drums")
3. **Track appears** in both track list and arrangement view

```bash
# Keyboard shortcut (future):
Ctrl+T  # Add new track
```

### Playback Controls

**Play/Pause**:
- Click ▶️ button or press `Space`
- Playback starts from current position
- Press `Space` again to pause

**Stop**:
- Click ⏹️ button or press `Esc`
- Playback stops and position resets to 0

**Record**:
- Click ⏺️ button or press `R`
- Arm an audio track first
- Captures audio through the Tauri backend when an input device is available

### Adjusting Track Volume

1. **Locate the vertical fader** on the track
2. **Click and drag** up (louder) or down (quieter)
3. **Watch the level meter** for visual feedback
4. **Avoid red zone** (clipping)

**Volume Range**:
- Top (1.0): Unity gain (100%)
- Middle (0.5): Half volume (50%)
- Bottom (0.0): Silence (0%)

### Panning Tracks

1. **Locate the pan knob** on the track
2. **Click and drag** left or right
3. **Center position**: Equal left/right
4. **Full left**: -1.0 (100% left)
5. **Full right**: +1.0 (100% right)

### Mute/Solo/Arm

**Mute (M)**:
- Click to silence track
- Track grayed out when muted
- Useful for comparing mixes

**Solo (S)**:
- Click to hear only this track
- Other tracks automatically muted
- Multiple tracks can be soloed

**Arm (R)**:
- Click to prepare for recording
- Required before starting recording on a track

---

## Key Features Overview

### ✅ What You Can Do Now (v0.1 MVP)

1. **Multi-Track Playback**
   - Add up to 8 tracks
   - Individual volume and pan control
   - Real-time mixing

2. **Transport Control**
   - Play, pause, stop
   - Position tracking
   - Tempo display

3. **Mixer Controls**
   - Volume faders (0-100%)
   - Pan knobs (L-C-R)
   - Mute/solo buttons
   - Level meters

4. **Project Management**
   - Create new projects
   - Save projects to disk
   - Load existing projects

5. **Professional UI**
   - DAW-style layout
   - Keyboard shortcuts
   - Real-time visual feedback

### Current Alpha Surface

- Audio file import from the Browser or expanded track controls
- Armed-track audio recording through Tauri
- Deterministic waveform previews for clips
- Built-in Rust effects foundations for gain, EQ, and reverb
- Undo/redo backend foundations with toolbar controls
- WAV export from the toolbar
- Session View, Piano Roll, Channel Rack, Device Rack, Automation, Routing, and Preferences workspaces
- Workspace presets: arrange, perform, edit, and mix

See [ROADMAP.md](docs/ROADMAP.md) for complete feature timeline.

---

## Example Workflows

### Workflow 1: Setting Up a Mix

```
1. Add tracks:
   - Track 1: "Vocals"
   - Track 2: "Guitar"
   - Track 3: "Bass"
   - Track 4: "Drums"

2. Set initial levels:
   - Vocals: 80%
   - Guitar: 70%
   - Bass: 75%
   - Drums: 85%

3. Pan tracks:
   - Vocals: Center (0)
   - Guitar: Slight right (+0.3)
   - Bass: Center (0)
   - Drums: Slight left (-0.3)

4. Test playback:
   - Press Space to play
   - Adjust levels while playing
   - Use solo to check individual tracks

5. Save project:
   - File → Save (future)
   - Choose location
   - Name your project
```

### Workflow 2: Exploring the Interface

```
1. Launch AUDIAW
2. Add 3-4 tracks
3. Try each control:
   - Move volume faders
   - Rotate pan knobs
   - Click mute/solo buttons
   - Press play/pause/stop
4. Watch visual feedback:
   - Level meters respond to volume
   - Transport state indicators
   - Track highlighting
5. Experiment with keyboard shortcuts:
   - Space: Play/Pause
   - Esc: Stop
   - R: Record armed track
   - B/M/I: Toggle Browser, Mixer, Inspector
   - Ctrl+E: Export
```

---

## Keyboard Shortcuts Reference

| Key | Action | Description |
|-----|--------|-------------|
| `Space` | Play/Pause | Toggle playback |
| `Esc` | Stop | Stop and reset position |
| `R` | Record | Toggle recording for an armed track |
| `B` | Browser | Toggle browser panel |
| `M` | Mixer | Toggle mixer panel |
| `I` | Inspector | Toggle inspector panel |
| `Ctrl+E` | Export | Open export dialog |
| `1`-`4` | Workspace | Arrange, perform, edit, mix presets |
| `P` | Piano Roll | Open MIDI editor |
| `C` | Channel Rack | Open pattern sequencer |
| `A` | Automation | Open automation lanes |

**More shortcuts coming in future versions!**

---

## Tips for Beginners

### 1. Start Simple
- Begin with 2-3 tracks
- Learn the basic controls first
- Experiment without fear (can't break anything!)

### 2. Use Your Ears
- Trust your ears over meters
- Take breaks to avoid ear fatigue
- Reference on different speakers/headphones

### 3. Organize Your Tracks
- Name tracks descriptively
- Group similar instruments
- Keep your project tidy

### 4. Save Frequently
- Save after major changes
- Use version numbers (Project_v1, Project_v2)
- Keep backups of important projects

### 5. Learn Keyboard Shortcuts
- Faster workflow
- Less mouse movement
- More efficient editing

---

## Common Questions

### Q: Can I import audio files?
**A**: Yes. Use the Browser import action or expand an audio track strip and use Import.

### Q: Can I record audio?
**A**: Yes, in the Tauri desktop runtime. Arm a track first, then press `R` or the record button.

### Q: Can I add effects?
**A**: Gain, EQ, and reverb crates exist in Rust. The full per-track effect chain UI is still pending.

### Q: Can I use VST plugins?
**A**: Not yet. Plugin support coming in v1.0 (Q1 2027).

### Q: How do I export my mix?
**A**: Use the toolbar Export button or `Ctrl+E`, then choose WAV settings and an output path.

### Q: Is MIDI supported?
**A**: Not yet. MIDI support coming in v1.0 (Q1 2027).

See [ROADMAP.md](docs/ROADMAP.md) for complete feature timeline.

---

## Troubleshooting

### Application Won't Start

```bash
# Check prerequisites
rustc --version  # Should be 1.75+
node --version   # Should be 20+
pnpm --version   # Should be 8+

# Try clean install
rm -rf node_modules
pnpm install
pnpm dev
```

### No Audio Output

1. Check system audio settings
2. Verify audio device is connected
3. Check volume is not at 0
4. Restart AUDIAW

### Build Errors

```bash
# Update dependencies
rustup update
pnpm update

# Clean build
cargo clean
pnpm clean
pnpm install
pnpm dev
```

**More help**: See [INSTALL.md](INSTALL.md#troubleshooting)

---

## Next Steps

### Learn More

1. **Read the Documentation**
   - [Features Guide](docs/FEATURES.md) - Complete feature documentation
   - [Architecture](docs/ARCHITECTURE.md) - System design
   - [API Reference](docs/API.md) - Developer API

2. **Explore the Interface**
   - Try all the controls
   - Experiment with different settings
   - Create test projects

3. **Join the Community**
   - [GitHub Discussions](https://github.com/audiaw/audiaw/discussions)
   - [Discord](https://discord.gg/audiaw) (coming soon)
   - [Twitter](https://twitter.com/audiaw_daw) (coming soon)

### Contribute

Want to help build AUDIAW?

1. **Report Bugs**: [GitHub Issues](https://github.com/audiaw/audiaw/issues)
2. **Request Features**: [Feature Requests](https://github.com/audiaw/audiaw/issues/new?template=feature_request.md)
3. **Contribute Code**: [Contributing Guide](CONTRIBUTING.md)
4. **Improve Docs**: Documentation PRs welcome!

---

## Getting Help

### Resources

- **Documentation**: [docs/](docs/)
- **Installation Help**: [INSTALL.md](INSTALL.md)
- **Development Guide**: [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md)
- **FAQ**: [GitHub Discussions](https://github.com/audiaw/audiaw/discussions)

### Support Channels

- **Bug Reports**: [GitHub Issues](https://github.com/audiaw/audiaw/issues)
- **Questions**: [GitHub Discussions](https://github.com/audiaw/audiaw/discussions)
- **Email**: support@audiaw.org (coming soon)

---

## Feedback

We'd love to hear from you!

- **What do you like?**
- **What's confusing?**
- **What features do you need?**
- **How can we improve?**

Share your feedback:
- [GitHub Discussions](https://github.com/audiaw/audiaw/discussions)
- [Feature Requests](https://github.com/audiaw/audiaw/issues/new?template=feature_request.md)

---

**Welcome to AUDIAW!** 🎵

We're excited to have you here. Whether you're a musician, producer, or developer, we hope AUDIAW helps you create amazing music.

Happy music making! 🎶

---

**Last Updated**: 2026-05-15  
**Version**: 0.1.0 MVP  
**Maintainers**: AUDIAW Contributors

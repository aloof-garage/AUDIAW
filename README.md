<div align="center">

# 🎵 AUDIAW

### Professional Open-Source Digital Audio Workstation

**Making professional music production accessible to everyone, forever free.**

[![License: GPL-3.0](https://img.shields.io/badge/License-GPL%203.0-blue.svg)](LICENSE)
[![Rust](https://img.shields.io/badge/Rust-1.75+-orange.svg)](https://www.rust-lang.org/)
[![React](https://img.shields.io/badge/React-18-61dafb.svg)](https://reactjs.org/)
[![Tauri](https://img.shields.io/badge/Tauri-2.0-ffc131.svg)](https://tauri.app/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

[Features](#-features) • [Quick Start](#-quick-start) • [Documentation](#-documentation) • [Roadmap](#-roadmap) • [Contributing](#-contributing)

![AUDIAW Interface](https://via.placeholder.com/800x450/1a1a1a/ffffff?text=AUDIAW+Interface+Screenshot)

</div>

---

## 🌟 Why AUDIAW?

Professional Digital Audio Workstations (DAWs) like Pro Tools, Logic Pro, and Ableton Live cost **$200-$600+**, creating barriers for:

- 🎓 **Students** learning music production
- 🎸 **Aspiring musicians** starting their journey
- 🎹 **Independent artists** on a budget
- 🏫 **Educational institutions** with limited funding

**AUDIAW changes this.** Built with modern technology (Rust + React + Tauri), AUDIAW provides professional-grade audio production tools that are:

- ✅ **Completely Free** - No cost, no subscriptions, no trials
- ✅ **Open Source** - GPL-3.0 licensed, fully transparent
- ✅ **Cross-Platform** - Windows, macOS, and Linux
- ✅ **High Performance** - Lock-free real-time audio processing
- ✅ **Modern Architecture** - Type-safe, maintainable codebase

---

## ✨ Features

### Current (v0.1.0 MVP)

#### 🎚️ Multi-Track Audio Engine
- **8 audio tracks** with independent processing
- **Real-time mixing** with zero-latency monitoring
- **Lock-free architecture** for glitch-free playback
- **48kHz sample rate**, 32-bit float precision

#### 🎛️ Professional Mixer
- **Volume faders** (0-100% range)
- **Pan controls** (stereo positioning)
- **Mute/Solo/Arm** buttons per track
- **Level meters** with visual feedback

#### ⏯️ Transport Controls
- **Play/Pause/Stop** with keyboard shortcuts
- **Position tracking** (samples, seconds, bars:beats:ticks)
- **Tempo control** (20-999 BPM)
- **Time signature** display

#### 💾 Project Management
- **Save/Load projects** (human-readable JSON format)
- **Project metadata** (name, author, timestamps)
- **Version control friendly** file format

#### 🎨 Professional UI
- **DAW-style layout** familiar to Pro Tools/Logic users
- **Dark theme** optimized for long sessions
- **Responsive design** with smooth animations
- **Keyboard shortcuts** for efficient workflow

### Current Alpha Surface

See our [detailed roadmap](DOCS/ROADMAP.md) for planned features:

- Audio import through the browser or track strip
- Armed-track recording through the Tauri audio backend
- WAV export with bit-depth, sample-rate, normalize, and dither options
- Browser, mixer, inspector, arrangement, timeline, and transport panels
- Undo/redo backend foundations with toolbar controls
- Built-in Rust effects crates for gain, EQ, and reverb

---

## 🚀 Quick Start

### Prerequisites

- **Rust** 1.75+ ([install](https://rustup.rs/))
- **Node.js** 20+ ([install](https://nodejs.org/))
- **pnpm** 8+ (`npm install -g pnpm`)

### Installation

```bash
# Clone repository
git clone https://github.com/audiaw/audiaw.git
cd audiaw

# Install dependencies
pnpm install

# Run development server
pnpm dev
```

**That's it!** AUDIAW will launch with a new project ready to go.

For detailed installation instructions, see [INSTALL.md](INSTALL.md).

### First Steps

1. **Add or use starter tracks** - AUDIAW opens with a demo-ready three-track session
2. **Import audio** - Use the Browser import action or an expanded audio track strip
3. **Adjust mixer** - Use faders and knobs to set levels and pan
4. **Control playback** - Press `Space` to play/pause, `Esc` to stop
5. **Export** - Use `Ctrl+E` or the toolbar Export action

See [QUICKSTART.md](QUICKSTART.md) for a complete 5-minute tutorial.

---

## 🏗️ Architecture

AUDIAW uses a modern hybrid architecture:

```
┌─────────────────────────────────────────┐
│     React Frontend (TypeScript)         │
│   Components • Stores • Hooks           │
└─────────────────┬───────────────────────┘
                  │ Tauri IPC
┌─────────────────▼───────────────────────┐
│      Tauri Application (Rust)           │
│   Commands • Events • State             │
└─────────────────┬───────────────────────┘
                  │ Direct Calls
┌─────────────────▼───────────────────────┐
│      Audio Engine (Rust Crates)         │
│   Lock-Free • Real-Time • Safe          │
└─────────────────┬───────────────────────┘
                  │ System Calls
┌─────────────────▼───────────────────────┐
│         OS Audio Layer                  │
│   WASAPI • CoreAudio • ALSA             │
└─────────────────────────────────────────┘
```

### Key Technical Highlights

- **Lock-Free Audio Processing** - No locks in audio thread, preventing dropouts
- **Type Safety** - Rust + TypeScript catch errors at compile time
- **Small Bundle** - 10MB vs 100MB+ for Electron apps
- **Cross-Platform** - Single codebase for all platforms
- **Modular Design** - 4 custom Rust crates + Tauri app

Read the complete [Architecture Documentation](docs/ARCHITECTURE.md).

---

## 📁 Project Structure

```
audiaw/
├── crates/                    # Rust workspace
│   ├── audiaw-types/         # Shared type definitions
│   ├── audiaw-engine/        # Core audio processing
│   ├── audiaw-audio-io/      # Audio I/O abstraction
│   └── audiaw-project/       # Project file format
├── src-tauri/                # Tauri application
│   └── src/main.rs          # 16 Tauri commands
├── src/                      # React frontend
│   ├── components/          # 15+ UI components
│   ├── stores/              # Zustand state stores
│   └── styles/              # Theme and animations
├── docs/                     # Comprehensive documentation
├── INSTALL.md               # Installation guide
├── QUICKSTART.md            # Quick start tutorial
└── CONTRIBUTING.md          # Contribution guidelines
```

---

## 🛠️ Tech Stack

### Backend (Rust)

| Technology | Purpose | Version |
|------------|---------|---------|
**Rust** | Core language | 1.75+ |
**Tauri** | Desktop framework | 2.0 |
**CPAL** | Cross-platform audio | 0.15 |
**crossbeam** | Lock-free structures | 0.8 |
**arc-swap** | Atomic state updates | 1.6 |
**serde** | Serialization | 1.0 |

### Frontend (TypeScript/React)

| Technology | Purpose | Version |
|------------|---------|---------|
**React** | UI framework | 18.2 |
**TypeScript** | Type safety | 5.3 |
**Zustand** | State management | 4.4 |
**Tailwind CSS** | Styling | 3.4 |
**Vite** | Build tool | 5.0 |

---

## 📖 Documentation

We believe great documentation is as important as great code.

### For Users

- 📘 [**Quick Start Guide**](QUICKSTART.md) - Get started in 5 minutes
- 📗 [**Installation Guide**](INSTALL.md) - Detailed setup for all platforms
- 📙 [**Features Guide**](docs/FEATURES.md) - Complete feature documentation
- 📕 [**Keyboard Shortcuts**](docs/FEATURES.md#keyboard-shortcuts) - Efficiency tips

### For Developers

- 🏗️ [**Architecture**](docs/ARCHITECTURE.md) - System design and technical details
- 💻 [**Development Guide**](docs/DEVELOPMENT.md) - Setup and workflow
- 📚 [**API Reference**](docs/API.md) - Complete API documentation
- 🤝 [**Contributing Guide**](CONTRIBUTING.md) - How to contribute

### For Hackathon Judges

- 🏆 [**Hackathon Submission**](docs/HACKATHON.md) - Project overview and achievements
- 🎬 [**Demo Script**](docs/DEMO.md) - Presentation guide
- 🗺️ [**Roadmap**](docs/ROADMAP.md) - Future plans and vision

**Total Documentation**: 5,000+ lines across 15+ files

---

## 🗺️ Roadmap

### v0.1.0 MVP ✅ (Current - May 2026)

- ✅ Multi-track audio engine (8 tracks)
- ✅ Real-time mixing and transport controls
- ✅ Professional UI with mixer controls
- ✅ Project save/load functionality
- ✅ Cross-platform support (Windows, macOS, Linux)

### v0.5.0 Alpha 📋 (Q3 2026)

- 📋 Audio file import (WAV, MP3, FLAC, OGG)
- 📋 Audio recording from input devices
- 📋 Built-in effects (EQ, compressor, reverb, delay)
- 📋 Waveform display and editing
- 📋 Undo/redo system
- 📋 Audio export/mixdown

### v1.0.0 Stable 🔮 (Q1 2027)

- 🔮 MIDI support (recording, editing, piano roll)
- 🔮 VST3/CLAP plugin hosting
- 🔮 Parameter automation
- 🔮 Advanced mixing (sends, returns, routing)
- 🔮 Virtual instruments
- 🔮 Production-ready quality

### v2.0.0 Future 💭 (2028+)

- 💭 AI-powered mixing and mastering
- 💭 Video support for scoring
- 💭 Live performance mode
- 💭 Cloud collaboration features

See the complete [Roadmap](docs/ROADMAP.md) for details.

---

## 🤝 Contributing

We welcome contributions from everyone! Whether you're fixing bugs, adding features, or improving documentation, your help makes AUDIAW better.

### Ways to Contribute

- 🐛 **Report Bugs** - [Create an issue](https://github.com/audiaw/audiaw/issues/new?template=bug_report.md)
- 💡 **Request Features** - [Share your ideas](https://github.com/audiaw/audiaw/issues/new?template=feature_request.md)
- 💻 **Write Code** - [Submit a pull request](https://github.com/audiaw/audiaw/pulls)
- 📖 **Improve Docs** - Documentation PRs are always welcome
- 🌍 **Translate** - Help make AUDIAW accessible worldwide (future)

### Getting Started

1. Read the [Contributing Guide](CONTRIBUTING.md)
2. Check [good first issues](https://github.com/audiaw/audiaw/labels/good%20first%20issue)
3. Join the discussion on [GitHub Discussions](https://github.com/audiaw/audiaw/discussions)
4. Fork, code, and submit a PR!

### Code of Conduct

We are committed to providing a welcoming and inclusive environment. Please read our [Code of Conduct](CONTRIBUTING.md#code-of-conduct).

---

## 📊 Project Stats

- **Lines of Code**: ~5,000 (Rust + TypeScript)
- **Documentation**: 5,000+ lines
- **Rust Crates**: 4 custom + dependencies
- **React Components**: 15+
- **Tauri Commands**: 16 APIs
- **Zustand Stores**: 3 state stores
- **Development Time**: 8 days (MVP)

---

## 🏆 Built for IBM BOB Hackathon 2026

AUDIAW was created for the IBM BOB Hackathon 2026, demonstrating:

- ✅ **Real-world problem solving** - Democratizing music production
- ✅ **Technical excellence** - Modern architecture, high performance
- ✅ **Complete implementation** - Functional MVP, not just a prototype
- ✅ **Future potential** - Clear roadmap and scalability
- ✅ **Open source impact** - Accessible to everyone, forever

See our [Hackathon Submission](docs/HACKATHON.md) for details.

---

## 📄 License

AUDIAW is licensed under the **GNU General Public License v3.0** (GPL-3.0).

This means:
- ✅ You can use AUDIAW for any purpose
- ✅ You can study and modify the source code
- ✅ You can distribute copies
- ✅ You can distribute modified versions
- ⚠️ Modified versions must also be open source (GPL-3.0)

See [LICENSE](LICENSE) for full details.

---

## 🙏 Acknowledgments

- **IBM BOB** - AI-assisted development platform
- **Rust Community** - Amazing language and ecosystem
- **Tauri Team** - Excellent desktop framework
- **React Team** - Powerful UI library
- **Open Source Community** - Inspiration and support

---

## 📞 Contact & Community

- **GitHub**: [github.com/audiaw/audiaw](https://github.com/audiaw/audiaw)
- **Issues**: [Report bugs or request features](https://github.com/audiaw/audiaw/issues)
- **Discussions**: [Join the conversation](https://github.com/audiaw/audiaw/discussions)
- **Email**: contact@audiaw.org (coming soon)
- **Discord**: [discord.gg/audiaw](https://discord.gg/audiaw) (coming soon)
- **Twitter**: [@audiaw_daw](https://twitter.com/audiaw_daw) (coming soon)

---

## ⭐ Show Your Support

If you find AUDIAW useful, please consider:

- ⭐ **Starring the repository** on GitHub
- 🐦 **Sharing on social media**
- 📝 **Writing about your experience**
- 🤝 **Contributing to the project**
- 💬 **Joining the community**

Every star, share, and contribution helps make professional music production accessible to more people!

---

<div align="center">

**AUDIAW: Professional music production for everyone, forever free.** 🎵

Made with ❤️ by the AUDIAW community

[Get Started](QUICKSTART.md) • [Documentation](docs/) • [Contribute](CONTRIBUTING.md)

</div>

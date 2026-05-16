# AUDIAW Installation Guide

> Complete installation instructions for all platforms

## Table of Contents

- [System Requirements](#system-requirements)
- [Quick Install](#quick-install)
- [Detailed Installation](#detailed-installation)
  - [Windows](#windows)
  - [macOS](#macos)
  - [Linux](#linux)
- [Verification](#verification)
- [Troubleshooting](#troubleshooting)
- [Uninstallation](#uninstallation)

---

## System Requirements

### Minimum Requirements

| Component | Requirement |
|-----------|-------------|
| **OS** | Windows 10+, macOS 10.15+, Linux (Ubuntu 20.04+) |
| **CPU** | Dual-core 2.0 GHz |
| **RAM** | 4 GB |
| **Storage** | 500 MB free space |
| **Audio** | Audio interface or built-in audio |

### Recommended Requirements

| Component | Requirement |
|-----------|-------------|
| **OS** | Windows 11, macOS 12+, Linux (Ubuntu 22.04+) |
| **CPU** | Quad-core 3.0 GHz or better |
| **RAM** | 8 GB or more |
| **Storage** | 2 GB free space (SSD recommended) |
| **Audio** | Dedicated audio interface with ASIO/CoreAudio |

---

## Quick Install

### For End Users (Pre-built Binaries)

**Coming Soon**: Pre-built binaries will be available on the [releases page](https://github.com/audiaw/audiaw/releases).

1. Download the installer for your platform
2. Run the installer
3. Follow the installation wizard
4. Launch AUDIAW

### For Developers (Build from Source)

```bash
# Prerequisites: Rust 1.75+, Node.js 20+, pnpm 8+

# Clone repository
git clone https://github.com/audiaw/audiaw.git
cd audiaw

# Install dependencies
pnpm install

# Run development build
pnpm dev

# Or build for production
pnpm build
```

---

## Detailed Installation

### Windows

#### Prerequisites

1. **Install Rust**

   Download and run [rustup-init.exe](https://rustup.rs/)
   
   ```powershell
   # Verify installation
   rustc --version
   cargo --version
   ```

2. **Install Node.js**

   Download from [nodejs.org](https://nodejs.org/) (LTS version recommended)
   
   ```powershell
   # Verify installation
   node --version
   npm --version
   ```

3. **Install pnpm**

   ```powershell
   npm install -g pnpm
   
   # Verify installation
   pnpm --version
   ```

4. **Install Visual Studio Build Tools**

   Download from [Visual Studio Downloads](https://visualstudio.microsoft.com/downloads/)
   
   - Select "Desktop development with C++"
   - Install Windows 10 SDK
   - Install MSVC v142 or later

#### Installation Steps

1. **Clone Repository**

   ```powershell
   git clone https://github.com/audiaw/audiaw.git
   cd audiaw
   ```

2. **Install Dependencies**

   ```powershell
   pnpm install
   ```

3. **Build Application**

   ```powershell
   # Development build
   pnpm dev
   
   # Production build
   pnpm build
   ```

4. **Locate Executable**

   Production build location:
   ```
   src-tauri\target\release\audiaw.exe
   ```

5. **Optional: Create Desktop Shortcut**

   Right-click `audiaw.exe` → Send to → Desktop (create shortcut)

#### Windows-Specific Notes

- **WASAPI**: Windows uses WASAPI for audio I/O
- **Antivirus**: May need to add exception for AUDIAW
- **Firewall**: No network access required
- **Admin Rights**: Not required for normal operation

---

### macOS

#### Prerequisites

1. **Install Xcode Command Line Tools**

   ```bash
   xcode-select --install
   ```

2. **Install Homebrew** (optional but recommended)

   ```bash
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```

3. **Install Rust**

   ```bash
   curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
   
   # Restart terminal, then verify
   rustc --version
   cargo --version
   ```

4. **Install Node.js**

   ```bash
   # Using Homebrew
   brew install node@20
   
   # Or download from nodejs.org
   
   # Verify installation
   node --version
   npm --version
   ```

5. **Install pnpm**

   ```bash
   npm install -g pnpm
   
   # Verify installation
   pnpm --version
   ```

#### Installation Steps

1. **Clone Repository**

   ```bash
   git clone https://github.com/audiaw/audiaw.git
   cd audiaw
   ```

2. **Install Dependencies**

   ```bash
   pnpm install
   ```

3. **Build Application**

   ```bash
   # Development build
   pnpm dev
   
   # Production build
   pnpm build
   ```

4. **Locate Application**

   Production build location:
   ```
   src-tauri/target/release/bundle/macos/AUDIAW.app
   ```

5. **Install to Applications**

   ```bash
   cp -r src-tauri/target/release/bundle/macos/AUDIAW.app /Applications/
   ```

#### macOS-Specific Notes

- **CoreAudio**: macOS uses CoreAudio for audio I/O
- **Gatekeeper**: May need to allow app in System Preferences → Security
- **Permissions**: Grant microphone access if recording
- **Apple Silicon**: Builds natively for M1/M2/M3 chips

---

### Linux

#### Ubuntu/Debian

1. **Install Prerequisites**

   ```bash
   sudo apt update
   sudo apt install -y \
     build-essential \
     curl \
     wget \
     file \
     libwebkit2gtk-4.0-dev \
     libssl-dev \
     libgtk-3-dev \
     libayatana-appindicator3-dev \
     librsvg2-dev \
     libasound2-dev \
     pkg-config
   ```

2. **Install Rust**

   ```bash
   curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
   source $HOME/.cargo/env
   
   # Verify installation
   rustc --version
   cargo --version
   ```

3. **Install Node.js**

   ```bash
   # Using NodeSource repository
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt install -y nodejs
   
   # Verify installation
   node --version
   npm --version
   ```

4. **Install pnpm**

   ```bash
   npm install -g pnpm
   
   # Verify installation
   pnpm --version
   ```

5. **Clone and Build**

   ```bash
   git clone https://github.com/audiaw/audiaw.git
   cd audiaw
   pnpm install
   pnpm build
   ```

6. **Locate Executable**

   ```
   src-tauri/target/release/audiaw
   ```

7. **Optional: Create Desktop Entry**

   ```bash
   cat > ~/.local/share/applications/audiaw.desktop << EOF
   [Desktop Entry]
   Name=AUDIAW
   Exec=/path/to/audiaw/src-tauri/target/release/audiaw
   Icon=/path/to/audiaw/icon.png
   Type=Application
   Categories=AudioVideo;Audio;
   EOF
   ```

#### Fedora

1. **Install Prerequisites**

   ```bash
   sudo dnf install -y \
     gcc-c++ \
     curl \
     wget \
     file \
     openssl-devel \
     webkit2gtk4.0-devel \
     gtk3-devel \
     libappindicator-gtk3-devel \
     librsvg2-devel \
     alsa-lib-devel
   ```

2. **Follow steps 2-7 from Ubuntu/Debian**

#### Arch Linux

1. **Install Prerequisites**

   ```bash
   sudo pacman -S --needed \
     base-devel \
     curl \
     wget \
     file \
     openssl \
     webkit2gtk \
     gtk3 \
     libappindicator-gtk3 \
     librsvg \
     alsa-lib
   ```

2. **Follow steps 2-7 from Ubuntu/Debian**

#### Linux-Specific Notes

- **Audio Backend**: Uses ALSA or PulseAudio
- **Permissions**: May need to add user to `audio` group
  ```bash
  sudo usermod -a -G audio $USER
  ```
- **Real-time Priority**: For best performance, configure real-time audio
  ```bash
  sudo nano /etc/security/limits.conf
  # Add:
  @audio - rtprio 95
  @audio - memlock unlimited
  ```

---

## Verification

### Verify Installation

1. **Check Version**

   ```bash
   # Development
   pnpm dev
   # Look for version in window title
   
   # Production
   ./audiaw --version  # (future feature)
   ```

2. **Test Audio**

   - Launch AUDIAW
   - Create new project
   - Add a track
   - Click Play button
   - Verify no errors in console

3. **Check Audio Devices**

   - Go to Settings (future feature)
   - Verify audio input/output devices detected
   - Test audio playback

### Common Issues

See [Troubleshooting](#troubleshooting) section below.

---

## Troubleshooting

### Build Errors

#### "rustc not found"

**Solution**:
```bash
# Ensure Rust is in PATH
source $HOME/.cargo/env  # Linux/macOS
# Or restart terminal
```

#### "node not found"

**Solution**:
```bash
# Verify Node.js installation
node --version
# If not found, reinstall Node.js
```

#### "pnpm install fails"

**Solution**:
```bash
# Clear cache and retry
pnpm store prune
rm -rf node_modules
pnpm install
```

#### "cargo build fails"

**Solution**:
```bash
# Update Rust
rustup update

# Clean build
cargo clean
cargo build
```

### Runtime Errors

#### "Audio device not found"

**Solution**:
- Check audio device is connected
- Verify device is not in use by another application
- Restart AUDIAW
- Check system audio settings

#### "Failed to initialize audio"

**Solution**:
- **Windows**: Check WASAPI is available
- **macOS**: Grant microphone permissions
- **Linux**: Check ALSA/PulseAudio is running
  ```bash
  pulseaudio --check
  pulseaudio --start
  ```

#### "Application won't start"

**Solution**:
- Check console for error messages
- Verify all dependencies installed
- Try running from terminal to see errors
- Check system requirements met

### Platform-Specific Issues

#### Windows: "VCRUNTIME140.dll missing"

**Solution**:
Install [Visual C++ Redistributable](https://aka.ms/vs/17/release/vc_redist.x64.exe)

#### macOS: "App is damaged and can't be opened"

**Solution**:
```bash
xattr -cr /Applications/AUDIAW.app
```

#### Linux: "error while loading shared libraries"

**Solution**:
```bash
# Install missing libraries
sudo apt install -y libwebkit2gtk-4.0-37
# Or equivalent for your distro
```

### Getting Help

If you're still having issues:

1. **Check Documentation**: [docs/](docs/)
2. **Search Issues**: [GitHub Issues](https://github.com/audiaw/audiaw/issues)
3. **Ask for Help**: [GitHub Discussions](https://github.com/audiaw/audiaw/discussions)
4. **Report Bug**: [New Issue](https://github.com/audiaw/audiaw/issues/new)

---

## Uninstallation

### Remove Application

**Windows**:
```powershell
# Delete application folder
Remove-Item -Recurse -Force C:\Path\To\audiaw
```

**macOS**:
```bash
# Remove from Applications
rm -rf /Applications/AUDIAW.app

# Remove user data (optional)
rm -rf ~/Library/Application\ Support/com.audiaw.app
```

**Linux**:
```bash
# Remove executable
rm /path/to/audiaw

# Remove desktop entry
rm ~/.local/share/applications/audiaw.desktop

# Remove user data (optional)
rm -rf ~/.config/audiaw
```

### Remove Dependencies

**Optional**: Remove development dependencies if no longer needed

```bash
# Uninstall pnpm
npm uninstall -g pnpm

# Uninstall Rust (if not needed for other projects)
rustup self uninstall

# Node.js uninstallation varies by platform
```

---

## Next Steps

After installation:

1. **Read Quick Start**: [QUICKSTART.md](QUICKSTART.md)
2. **Explore Features**: [docs/FEATURES.md](docs/FEATURES.md)
3. **Learn Keyboard Shortcuts**: [docs/FEATURES.md#keyboard-shortcuts](docs/FEATURES.md#keyboard-shortcuts)
4. **Join Community**: [GitHub Discussions](https://github.com/audiaw/audiaw/discussions)

---

## Updates

### Checking for Updates

**Manual Check** (current):
```bash
cd audiaw
git pull origin main
pnpm install
pnpm build
```

**Automatic Updates** (future):
- In-app update notifications
- One-click updates
- Release notes display

---

**Last Updated**: 2026-05-15  
**Version**: 0.1.0 MVP  
**Maintainers**: AUDIAW Contributors
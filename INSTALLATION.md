# Installation

This guide covers installing AUDIAW as an end user and setting up the repository for development.

## Download a Release

Download the latest app from [GitHub Releases](https://github.com/aloof-garage/AUDIAW/releases/latest).

| Platform | File |
| --- | --- |
| Windows | `AUDIAW-windows-x64-setup.exe` |
| Windows portable | `AUDIAW-windows-x64-portable.exe` |
| macOS | `AUDIAW-macos.dmg` |
| Linux | `AUDIAW-linux-x86_64.AppImage` |

## Development Requirements

- Git
- Node.js 20+
- pnpm 9+
- Rust 1.75+
- Tauri platform dependencies

## Platform Dependencies

### Windows

Install:

- Node.js 20+
- Rust from [rustup.rs](https://rustup.rs/)
- Microsoft Visual Studio Build Tools with "Desktop development with C++"

### macOS

Install:

```bash
xcode-select --install
```

Then install Node.js, pnpm, and Rust.

### Ubuntu / Debian

```bash
sudo apt-get update
sudo apt-get install -y \
  build-essential \
  curl \
  file \
  libwebkit2gtk-4.1-dev \
  libayatana-appindicator3-dev \
  librsvg2-dev \
  patchelf
```

## Clone and Install

```bash
git clone https://github.com/aloof-garage/AUDIAW.git
cd AUDIAW
pnpm install
```

## Run in Development

```bash
pnpm dev
```

## Verify Setup

```bash
npm run build:frontend
cargo check
```

## Build a Desktop App

Build for the current platform:

```bash
npm run build
```

Platform-specific scripts:

```bash
npm run build:windows
npm run build:macos
npm run build:linux
```

Generated bundles are written under `target/release/bundle/`.

## Troubleshooting

- If `pnpm install` fails, run `pnpm store prune` and install again.
- If Rust fails to compile, run `rustup update` and retry.
- If Linux packaging fails, verify the WebKitGTK and AppIndicator packages are installed.
- If a Windows build cannot find C++ tools, repair Visual Studio Build Tools and include the C++ workload.

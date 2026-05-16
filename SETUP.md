# AUDIAW Setup Guide

## Prerequisites

Before you begin, ensure you have the following installed:

1. **Rust** (1.75 or later)
   ```bash
   # Install via rustup
   curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
   ```

2. **Node.js** (20 or later)
   ```bash
   # Download from https://nodejs.org/
   # Or use nvm:
   nvm install 20
   nvm use 20
   ```

3. **pnpm** (8 or later)
   ```bash
   npm install -g pnpm
   ```

4. **System Dependencies**
   
   **Windows:**
   - Visual Studio Build Tools or Visual Studio with C++ development tools
   - WebView2 (usually pre-installed on Windows 10/11)

   **macOS:**
   ```bash
   xcode-select --install
   ```

   **Linux (Ubuntu/Debian):**
   ```bash
   sudo apt update
   sudo apt install libwebkit2gtk-4.1-dev \
     build-essential \
     curl \
     wget \
     file \
     libssl-dev \
     libayatana-appindicator3-dev \
     librsvg2-dev \
     libasound2-dev
   ```

## Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/audiaw/audiaw.git
cd audiaw
```

### 2. Install Frontend Dependencies

```bash
pnpm install
```

This will install all Node.js dependencies including React, TypeScript, Vite, and Tauri CLI.

### 3. Build Rust Workspace

```bash
cargo build
```

This compiles all Rust crates in the workspace:
- `audiaw-types` - Shared type definitions
- `audiaw-engine` - Core audio processing engine
- `audiaw-audio-io` - Audio I/O wrapper (CPAL)
- `audiaw-project` - Project file format
- `audiaw` (src-tauri) - Tauri application

### 4. Run Development Server

```bash
pnpm dev
```

This will:
1. Start the Vite development server (frontend)
2. Build and launch the Tauri application
3. Enable hot-reload for both frontend and backend

The application window should open automatically.

## Development Workflow

### Running Tests

**Rust tests:**
```bash
cargo test
```

**Specific crate tests:**
```bash
cargo test -p audiaw-engine
cargo test -p audiaw-types
```

### Building for Production

```bash
pnpm build
```

This creates optimized production builds in:
- `dist/` - Frontend build
- `src-tauri/target/release/` - Rust binary
- `src-tauri/target/release/bundle/` - Platform-specific installers

### Code Formatting

**Rust:**
```bash
cargo fmt
```

**TypeScript/React:**
```bash
pnpm format
```

### Linting

**TypeScript/React:**
```bash
pnpm lint
```

## Project Structure

```
audiaw/
├── crates/                  # Rust workspace crates
│   ├── audiaw-types/        # Shared type definitions
│   ├── audiaw-engine/       # Audio processing engine
│   ├── audiaw-audio-io/     # Audio I/O (CPAL wrapper)
│   └── audiaw-project/      # Project file format
├── src-tauri/               # Tauri application
│   ├── src/main.rs          # Tauri commands & app logic
│   ├── Cargo.toml           # Rust dependencies
│   └── tauri.conf.json      # Tauri configuration
├── src/                     # React frontend
│   ├── App.tsx              # Main application component
│   ├── main.tsx             # React entry point
│   └── index.css            # Global styles
├── Cargo.toml               # Rust workspace configuration
├── package.json             # Node.js dependencies
├── vite.config.ts           # Vite configuration
└── tsconfig.json            # TypeScript configuration
```

## Troubleshooting

### Issue: `cargo build` fails with linker errors

**Solution:** Ensure you have the required system dependencies installed (see Prerequisites).

### Issue: `pnpm dev` fails to start

**Solution:** 
1. Delete `node_modules/` and `pnpm-lock.yaml`
2. Run `pnpm install` again
3. Ensure port 5173 is not in use

### Issue: Audio device errors on Linux

**Solution:** Ensure ALSA development libraries are installed:
```bash
sudo apt install libasound2-dev
```

### Issue: WebView2 not found on Windows

**Solution:** Download and install WebView2 Runtime from:
https://developer.microsoft.com/en-us/microsoft-edge/webview2/

## Next Steps

1. **Explore the codebase** - Start with `src-tauri/src/main.rs` for Tauri commands
2. **Read the documentation** - Check `DOCS/` for architecture details
3. **Run the tests** - `cargo test` to verify everything works
4. **Start developing** - Add features, fix bugs, improve performance

## Getting Help

- **Documentation:** See `DOCS/` directory
- **Issues:** https://github.com/audiaw/audiaw/issues
- **Discussions:** https://github.com/audiaw/audiaw/discussions

---

**Built for the IBM BOB Hackathon 2026**
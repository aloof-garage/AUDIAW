# AUDIAW Development Guide

> Complete guide for developers working on AUDIAW

## Table of Contents

- [Development Environment Setup](#development-environment-setup)
- [Project Structure](#project-structure)
- [Building and Running](#building-and-running)
- [Development Workflow](#development-workflow)
- [Code Organization](#code-organization)
- [Adding New Features](#adding-new-features)
- [Testing](#testing)
- [Debugging](#debugging)
- [Common Issues](#common-issues)
- [Git Workflow](#git-workflow)
- [Code Style Guidelines](#code-style-guidelines)

---

## Development Environment Setup

### Prerequisites

#### 1. Install Rust

```bash
# Install rustup (Rust toolchain installer)
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Verify installation
rustc --version  # Should be 1.75+
cargo --version
```

**Windows Users**: Download from [rustup.rs](https://rustup.rs/)

#### 2. Install Node.js and pnpm

```bash
# Install Node.js 20+ from https://nodejs.org/

# Verify Node.js
node --version  # Should be 20+
npm --version

# Install pnpm globally
npm install -g pnpm

# Verify pnpm
pnpm --version  # Should be 8+
```

#### 3. Platform-Specific Dependencies

**Windows**:
```powershell
# Install Visual Studio Build Tools
# Download from: https://visualstudio.microsoft.com/downloads/
# Select "Desktop development with C++"
```

**macOS**:
```bash
# Install Xcode Command Line Tools
xcode-select --install
```

**Linux (Ubuntu/Debian)**:
```bash
sudo apt update
sudo apt install -y \
  build-essential \
  libwebkit2gtk-4.0-dev \
  libssl-dev \
  libgtk-3-dev \
  libayatana-appindicator3-dev \
  librsvg2-dev \
  libasound2-dev \
  pkg-config
```

**Linux (Fedora)**:
```bash
sudo dnf install -y \
  gcc-c++ \
  webkit2gtk4.0-devel \
  openssl-devel \
  gtk3-devel \
  libappindicator-gtk3-devel \
  librsvg2-devel \
  alsa-lib-devel
```

#### 4. IDE Setup (Recommended)

**Visual Studio Code**:
```bash
# Install VS Code from https://code.visualstudio.com/

# Recommended extensions:
code --install-extension rust-lang.rust-analyzer
code --install-extension tauri-apps.tauri-vscode
code --install-extension dbaeumer.vscode-eslint
code --install-extension esbenp.prettier-vscode
code --install-extension bradlc.vscode-tailwindcss
```

### Clone and Setup

```bash
# Clone repository
git clone https://github.com/audiaw/audiaw.git
cd audiaw

# Install frontend dependencies
pnpm install

# Build Rust crates (optional, done automatically by Tauri)
cargo build

# Verify setup
pnpm dev  # Should start development server
```

---

## Project Structure

```
audiaw/
├── crates/                      # Rust workspace
│   ├── audiaw-types/           # Shared types
│   │   ├── src/lib.rs          # Type definitions
│   │   └── Cargo.toml
│   ├── audiaw-engine/          # Audio engine
│   │   ├── src/lib.rs          # Engine implementation
│   │   └── Cargo.toml
│   ├── audiaw-audio-io/        # Audio I/O
│   │   ├── src/lib.rs          # CPAL wrapper
│   │   └── Cargo.toml
│   └── audiaw-project/         # Project format
│       ├── src/lib.rs          # Save/load logic
│       └── Cargo.toml
│
├── src-tauri/                   # Tauri application
│   ├── src/
│   │   └── main.rs             # Entry point, IPC handlers
│   ├── Cargo.toml              # Dependencies
│   ├── tauri.conf.json         # Tauri configuration
│   └── build.rs                # Build script
│
├── src/                         # React frontend
│   ├── components/             # UI components
│   │   ├── Transport/          # Transport controls
│   │   ├── Timeline/           # Timeline components
│   │   ├── TrackList/          # Track list
│   │   ├── ArrangementView/    # Arrangement view
│   │   └── UI/                 # Reusable UI primitives
│   ├── stores/                 # Zustand stores
│   │   ├── projectStore.ts     # Project state
│   │   ├── transportStore.ts   # Transport state
│   │   └── uiStore.ts          # UI state
│   ├── styles/                 # Styles
│   │   ├── theme.ts            # Theme configuration
│   │   └── animations.css      # CSS animations
│   ├── App.tsx                 # Root component
│   ├── main.tsx                # Entry point
│   └── index.css               # Global styles
│
├── docs/                        # Documentation
├── Cargo.toml                   # Workspace configuration
├── package.json                 # Frontend dependencies
├── pnpm-workspace.yaml          # pnpm workspace config
├── vite.config.ts              # Vite configuration
├── tailwind.config.js          # Tailwind configuration
└── tsconfig.json               # TypeScript configuration
```

### Key Files

| File | Purpose |
|------|---------|
| `Cargo.toml` | Rust workspace configuration |
| `package.json` | Frontend dependencies and scripts |
| `src-tauri/src/main.rs` | Tauri commands and app state |
| `src/App.tsx` | Main React component |
| `src/stores/*.ts` | State management |
| `vite.config.ts` | Build configuration |
| `tauri.conf.json` | Tauri app configuration |

---

## Building and Running

### Development Mode

```bash
# Start development server (hot reload enabled)
pnpm dev

# This will:
# 1. Start Vite dev server (frontend)
# 2. Build Rust code
# 3. Launch Tauri window
# 4. Enable hot reload for frontend changes
```

### Production Build

```bash
# Build for production
pnpm build

# Output locations:
# - Windows: src-tauri/target/release/audiaw.exe
# - macOS: src-tauri/target/release/bundle/macos/AUDIAW.app
# - Linux: src-tauri/target/release/audiaw
```

### Build Individual Components

```bash
# Build only Rust crates
cargo build --release

# Build only frontend
cd src && pnpm build

# Run frontend tests
pnpm test

# Lint frontend code
pnpm lint

# Format code
pnpm format
```

---

## Development Workflow

### Typical Development Session

1. **Start Development Server**
   ```bash
   pnpm dev
   ```

2. **Make Changes**
   - Frontend changes: Auto-reload in browser
   - Rust changes: Requires restart (Ctrl+C, then `pnpm dev`)

3. **Test Changes**
   - Manual testing in dev window
   - Run automated tests: `cargo test`

4. **Commit Changes**
   ```bash
   git add .
   git commit -m "feat: add new feature"
   git push
   ```

### Hot Reload Behavior

| Change Type | Reload Behavior |
|-------------|-----------------|
| React components | ✅ Hot reload (instant) |
| TypeScript files | ✅ Hot reload (instant) |
| CSS/Tailwind | ✅ Hot reload (instant) |
| Rust code | ❌ Requires restart |
| Tauri config | ❌ Requires restart |

---

## Code Organization

### Rust Code Organization

**Principle**: Each crate has a single responsibility

```rust
// audiaw-types/src/lib.rs
// Define shared types only, no logic

pub type Sample = f32;
pub struct Track { ... }

// audiaw-engine/src/lib.rs
// Audio processing logic

pub struct AudioEngine { ... }
impl AudioEngine {
    pub fn new() -> Self { ... }
    pub fn process_audio() { ... }
}

// src-tauri/src/main.rs
// Tauri commands (thin wrappers)

#[tauri::command]
fn play(state: State<AppState>) -> Result<(), String> {
    state.engine.lock().unwrap()
        .send_command(EngineCommand::Play)
        .map_err(|e| e.to_string())
}
```

### Frontend Code Organization

**Principle**: Components are organized by feature

```typescript
// src/components/Transport/TransportBar.tsx
// Transport-related UI only

export function TransportBar() {
  const { play, stop } = useTransportStore();
  return (
    <div>
      <Button onClick={play}>Play</Button>
      <Button onClick={stop}>Stop</Button>
    </div>
  );
}

// src/stores/transportStore.ts
// Transport state and logic

export const useTransportStore = create<TransportState>((set) => ({
  isPlaying: false,
  play: () => {
    invoke('play');
    set({ isPlaying: true });
  },
}));
```

---

## Adding New Features

### Example: Adding a New Tauri Command

**Step 1**: Define command in `src-tauri/src/main.rs`

```rust
#[tauri::command]
fn set_tempo(tempo: f32, state: State<AppState>) -> Result<(), String> {
    // Validate input
    if tempo < 20.0 || tempo > 999.0 {
        return Err("Tempo must be between 20 and 999".to_string());
    }
    
    // Update engine
    let engine = state.engine.lock().unwrap();
    engine.send_command(EngineCommand::SetTempo(tempo))
        .map_err(|e| e.to_string())
}
```

**Step 2**: Register command in `main()`

```rust
fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            // ... existing commands
            set_tempo,  // Add new command
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
```

**Step 3**: Use in frontend

```typescript
// src/stores/transportStore.ts
setTempo: async (tempo: number) => {
  try {
    await invoke('set_tempo', { tempo });
    set({ tempo });
  } catch (error) {
    console.error('Failed to set tempo:', error);
  }
}
```

### Example: Adding a New React Component

**Step 1**: Create component file

```typescript
// src/components/UI/TempoControl.tsx
import React from 'react';
import { useTransportStore } from '../../stores/transportStore';

export function TempoControl() {
  const { tempo, setTempo } = useTransportStore();
  
  return (
    <div className="flex items-center gap-2">
      <label>Tempo:</label>
      <input
        type="number"
        value={tempo}
        onChange={(e) => setTempo(Number(e.target.value))}
        min={20}
        max={999}
        className="w-16 px-2 py-1 bg-dark-surface border border-dark-border rounded"
      />
      <span>BPM</span>
    </div>
  );
}
```

**Step 2**: Use in parent component

```typescript
// src/components/Transport/TransportBar.tsx
import { TempoControl } from '../UI/TempoControl';

export function TransportBar() {
  return (
    <div className="flex items-center gap-4">
      {/* ... other controls */}
      <TempoControl />
    </div>
  );
}
```

### Example: Adding Engine Functionality

**Step 1**: Add command to engine

```rust
// crates/audiaw-engine/src/lib.rs
pub enum EngineCommand {
    // ... existing commands
    SetTempo(f32),
}

impl AudioEngine {
    fn handle_set_tempo(state: &Arc<ArcSwap<EngineState>>, tempo: f32) {
        state.rcu(|current| {
            let mut new_state = (**current).clone();
            new_state.tempo = tempo;
            new_state
        });
        debug!("Tempo set to {}", tempo);
    }
}
```

**Step 2**: Process command in engine thread

```rust
// In engine_thread loop
match command {
    // ... existing commands
    EngineCommand::SetTempo(tempo) => {
        Self::handle_set_tempo(&state, tempo);
    }
}
```

---

## Testing

### Rust Tests

```bash
# Run all tests
cargo test

# Run tests for specific crate
cargo test -p audiaw-engine

# Run with output
cargo test -- --nocapture

# Run specific test
cargo test test_engine_creation
```

**Writing Tests**:

```rust
#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_track_creation() {
        let track = Track::new(1, "Test".to_string());
        assert_eq!(track.id, 1);
        assert_eq!(track.name, "Test");
    }
}
```

### Frontend Tests (Future)

```bash
# Run frontend tests (when implemented)
pnpm test

# Run with coverage
pnpm test:coverage
```

---

## Debugging

### Rust Debugging

**Enable Debug Logging**:

```rust
// In src-tauri/src/main.rs
tracing_subscriber::fmt()
    .with_max_level(tracing::Level::DEBUG)  // Change to DEBUG
    .init();
```

**View Logs**:
- Development: Logs appear in terminal
- Production: Check system logs

**Using rust-analyzer**:
- Set breakpoints in VS Code
- Press F5 to start debugging
- Inspect variables, step through code

### Frontend Debugging

**Browser DevTools**:
```typescript
// Add console logs
console.log('State:', useProjectStore.getState());

// Use debugger statement
debugger;

// React DevTools
// Install React DevTools browser extension
```

**Zustand DevTools**:
```typescript
// Add to store
import { devtools } from 'zustand/middleware';

export const useProjectStore = create(
  devtools((set) => ({
    // ... store implementation
  }), { name: 'ProjectStore' })
);
```

### Common Debug Scenarios

**Audio Not Playing**:
1. Check transport state: `get_transport_state()`
2. Check track volumes: Are they > 0?
3. Check mute/solo states
4. Check audio device selection

**UI Not Updating**:
1. Check Zustand store state
2. Verify component is subscribed to store
3. Check React DevTools for re-renders
4. Verify IPC command succeeded

**Build Errors**:
1. Clear build cache: `cargo clean && pnpm clean`
2. Update dependencies: `cargo update && pnpm update`
3. Check Rust version: `rustc --version`
4. Check Node version: `node --version`

---

## Common Issues

### Issue: "Failed to build Rust code"

**Solution**:
```bash
# Update Rust
rustup update

# Clean build
cargo clean
cargo build

# Check for missing dependencies (Linux)
sudo apt install build-essential
```

### Issue: "pnpm install fails"

**Solution**:
```bash
# Clear pnpm cache
pnpm store prune

# Remove node_modules
rm -rf node_modules

# Reinstall
pnpm install
```

### Issue: "Tauri window doesn't open"

**Solution**:
1. Check terminal for errors
2. Verify Tauri dependencies installed
3. Try: `pnpm tauri dev` directly
4. Check `tauri.conf.json` for errors

### Issue: "Hot reload not working"

**Solution**:
1. Restart dev server
2. Clear browser cache
3. Check Vite config
4. Verify file watching is enabled

---

## Git Workflow

### Branch Strategy

```bash
# Main branches
main          # Production-ready code
develop       # Development branch

# Feature branches
feature/add-mixer
feature/improve-ui
fix/audio-glitch
docs/update-readme
```

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```bash
# Format
<type>(<scope>): <description>

# Examples
feat(engine): add tempo control
fix(ui): correct track height calculation
docs(readme): update installation instructions
refactor(store): simplify transport state
test(engine): add track creation tests
chore(deps): update dependencies
```

**Types**:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `refactor`: Code refactoring
- `test`: Tests
- `chore`: Maintenance

### Pull Request Process

1. **Create Feature Branch**
   ```bash
   git checkout -b feature/my-feature
   ```

2. **Make Changes and Commit**
   ```bash
   git add .
   git commit -m "feat: add my feature"
   ```

3. **Push to Remote**
   ```bash
   git push origin feature/my-feature
   ```

4. **Create Pull Request**
   - Go to GitHub
   - Click "New Pull Request"
   - Fill in template
   - Request review

5. **Address Review Comments**
   ```bash
   # Make changes
   git add .
   git commit -m "fix: address review comments"
   git push
   ```

6. **Merge**
   - Squash and merge (preferred)
   - Delete branch after merge

---

## Code Style Guidelines

### Rust Style

**Follow Rust conventions**:
```rust
// Use snake_case for functions and variables
fn process_audio_buffer() { }
let sample_rate = 48000;

// Use CamelCase for types
struct AudioEngine { }
enum TransportState { }

// Use SCREAMING_SNAKE_CASE for constants
const MAX_TRACKS: usize = 128;

// Document public APIs
/// Process audio buffer
/// 
/// # Arguments
/// * `buffer` - Audio buffer to process
/// 
/// # Returns
/// Processed buffer
pub fn process(buffer: &[f32]) -> Vec<f32> { }
```

**Format with rustfmt**:
```bash
cargo fmt
```

**Lint with clippy**:
```bash
cargo clippy
```

### TypeScript Style

**Follow TypeScript conventions**:
```typescript
// Use camelCase for functions and variables
function processAudio() { }
const sampleRate = 48000;

// Use PascalCase for types and components
interface AudioConfig { }
function TransportBar() { }

// Use SCREAMING_SNAKE_CASE for constants
const MAX_TRACKS = 128;

// Document complex functions
/**
 * Process audio buffer
 * @param buffer - Audio buffer to process
 * @returns Processed buffer
 */
function process(buffer: Float32Array): Float32Array { }
```

**Format with Prettier**:
```bash
pnpm format
```

**Lint with ESLint**:
```bash
pnpm lint
```

### React Best Practices

```typescript
// Use functional components
export function MyComponent() { }

// Use hooks for state
const [state, setState] = useState();

// Memoize expensive computations
const value = useMemo(() => expensiveCalc(), [deps]);

// Memoize callbacks
const handleClick = useCallback(() => { }, [deps]);

// Extract complex logic to custom hooks
function useAudioEngine() {
  // ... logic
  return { play, stop };
}
```

---

## Performance Tips

### Rust Performance

1. **Use release builds for testing**:
   ```bash
   cargo build --release
   ```

2. **Profile with cargo-flamegraph**:
   ```bash
   cargo install flamegraph
   cargo flamegraph
   ```

3. **Avoid allocations in audio thread**
4. **Use `#[inline]` for hot paths**
5. **Prefer `&[T]` over `Vec<T>` in function parameters**

### Frontend Performance

1. **Use React.memo for expensive components**:
   ```typescript
   export const ExpensiveComponent = React.memo(({ data }) => {
     // ... rendering
   });
   ```

2. **Virtualize long lists**
3. **Debounce frequent updates**
4. **Use CSS transforms for animations**
5. **Lazy load components**:
   ```typescript
   const HeavyComponent = lazy(() => import('./HeavyComponent'));
   ```

---

## Next Steps

- Read [ARCHITECTURE.md](ARCHITECTURE.md) for system design
- Read [API.md](API.md) for API reference
- Read [CONTRIBUTING.md](../CONTRIBUTING.md) for contribution guidelines
- Join our [Discord](https://discord.gg/audiaw) for help

---

**Last Updated**: 2026-05-15  
**Version**: 0.1.0 MVP  
**Maintainers**: AUDIAW Contributors
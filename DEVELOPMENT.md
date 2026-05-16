# Development

This guide is for contributors working on AUDIAW.

## Setup

Install the requirements from [INSTALLATION.md](INSTALLATION.md), then run:

```bash
pnpm install
```

Start the desktop app:

```bash
pnpm dev
```

## Daily Commands

```bash
npm run build:frontend
cargo check
npm run build
```

Platform release builds:

```bash
npm run build:windows
npm run build:macos
npm run build:linux
```

## Working Areas

### Frontend

Use `src/App.tsx` for the active DAW workflow. This file currently contains the main production shell, project model, playback scheduling, export flow, keyboard shortcuts, and view wiring.

Use `src/components/` when improving reusable UI pieces or migrating logic out of the shell.

Use `src/stores/` carefully. Some stores are retained for backend integration and older modular surfaces, but the active v1 workflow is mostly in `src/App.tsx`.

### Tauri

Use `src-tauri/src/main.rs` for native commands and app startup.

Important commands:

- `read_project_document`
- `write_project_document`
- `write_binary_file`
- project and track commands retained for Rust engine integration

Use `src-tauri/tauri.conf.json` for bundle targets, app metadata, icons, and window config.

### Rust Crates

Use `crates/` for native systems:

- `audiaw-types` for shared Rust types
- `audiaw-engine` for native audio engine infrastructure
- `audiaw-audio-io` for CPAL audio IO and audio file helpers
- `audiaw-project` for Rust project persistence
- `audiaw-effects` for native effects
- `audiaw-history` for history/undo infrastructure

## Project File Compatibility

`.audiaw` files are JSON documents. Avoid breaking existing project files.

When changing project data:

1. Add defaults for missing fields.
2. Keep old files loadable.
3. Update `ARCHITECTURE.md` if the structure changes.
4. Test save, close, reopen, and export.

## Release-Sensitive Areas

Be careful when changing:

- `package.json` scripts
- `src-tauri/tauri.conf.json`
- `src-tauri/capabilities/`
- `.github/workflows/release.yml`
- release asset names
- website download asset names

Release asset names are documented in [HOW_TO_RELEASE.md](HOW_TO_RELEASE.md).

## Verification Checklist

For app changes:

- Frontend build passes.
- Rust check passes.
- App launches.
- Playback starts and stops.
- Project save/load works.
- WAV export works.

For release changes:

- Platform build script runs.
- Expected artifact is generated.
- GitHub Actions syntax is valid.
- `HOW_TO_RELEASE.md` remains accurate.

## Style

- Keep changes focused.
- Prefer existing patterns.
- Avoid new dependencies unless they remove meaningful complexity.
- Keep UI text concise.
- Keep docs short and accurate.

## Troubleshooting

If Vite or Tauri fails to spawn build tools on Windows, rerun the command from a normal terminal with permission to execute local binaries.

If Linux packaging fails, verify WebKitGTK and AppIndicator dependencies are installed.

If project save/export fails, check the Tauri commands and desktop capabilities first.

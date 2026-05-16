# AUDIAW

AUDIAW is a v1.0 desktop digital audio workstation built with React, TypeScript, Vite, Tauri, and Rust. The app supports an end-to-end production workflow: create a project, add sounds/instruments, edit MIDI, arrange clips, mix, automate, play back, save/load, and render a WAV.

## Current V1 Surface

- Arrangement timeline with draggable clips and snap-oriented editing.
- Browser-to-arrangement sample drag/drop.
- Clip resizing, duplication, deletion, splitting, and renaming.
- Audio-style clips driven by an internal sampler/drum synthesis layer.
- MIDI tracks with synth, bass, and pad playback using Web Audio.
- Piano roll note editing: double-click to add, drag to move, double-click note to delete.
- Mixer controls for volume, pan, mute, solo, meters, and send routing.
- Inspector with channel controls, device/effect chain, routing, and volume automation point writing.
- Browser workflows for assigning samples and inserting built-in plugin concepts.
- Transport with play, stop, record state, loop, playhead sync, and keyboard shortcuts.
- File-backed `.audiaw` project documents, autosave recovery, and recent projects.
- Undo/redo for track, clip, MIDI, plugin, sample, routing, and automation edits.
- Offline WAV rendering through `OfflineAudioContext`.

## Shortcuts

| Shortcut | Action |
| --- | --- |
| `Space` | Play / pause |
| `Esc` | Stop and close transient UI |
| `Ctrl+K` | Command palette |
| `Ctrl+E` | Export mixdown |
| `Ctrl+S` | Save project |
| `Ctrl+O` | Load saved project |
| `Ctrl+N` | New project |
| `Ctrl+Z` | Undo |
| `Ctrl+Y` | Redo |
| `Ctrl+D` | Duplicate selected clip |
| `Delete` / `Backspace` | Delete selected clip |
| `Ctrl+1` | Arrangement |
| `Ctrl+2` | Mixer |
| `Ctrl+3` | Piano roll |
| `Ctrl+B` | Toggle browser |
| `Ctrl+I` | Toggle inspector |
| `Ctrl+J` | Toggle bottom panel |
| `V`, `B`, `C` | Pointer, pencil, scissors tools / split selected clip |
| `L`, `R` | Loop, record state |

## Downloads

Release binaries are published from [GitHub Releases](https://github.com/aloof-garage/AUDIAW/releases/latest):

- Windows installer: `AUDIAW-windows-x64-setup.exe`
- Windows portable: `AUDIAW-windows-x64-portable.exe`
- macOS DMG: `AUDIAW-macos.dmg`
- Linux AppImage: `AUDIAW-linux-x86_64.AppImage`

## Quick Start

```bash
pnpm install
node_modules\.bin\vite.CMD --host 127.0.0.1 --port 5173
```

Open `http://127.0.0.1:5173`.

For the Tauri desktop app:

```bash
pnpm dev
```

## Production Workflow

1. Open AUDIAW. A starter project loads with drums, bass, synth, atmosphere, vocals, returns, and master.
2. Select a track in the arrangement.
3. Use the browser to assign a sample or insert a plugin concept.
4. Double-click an arrangement lane to create clips, or drag samples from the browser onto tracks.
5. Open Piano Roll and double-click the grid to add MIDI notes.
6. Move, resize, split, duplicate, rename, and delete clips while arranging.
7. Press `Space` to play. Adjust mixer volume, pan, mute, solo, and send values.
8. Record an armed/selected track with `R`; stopping record commits a new take clip.
9. Write volume automation from the Inspector while the playhead is positioned.
10. Use `Ctrl+S` to save, `Ctrl+Z` / `Ctrl+Y` to edit safely.
11. Use `Ctrl+E` and Start Export to render a WAV.

## Architecture

```text
src/App.tsx                 Main DAW shell, project workflow, and Web Audio render path
src/components/             Reusable UI surfaces retained for modularization
src/stores/                 Zustand/Tauri stores retained for backend integration
src-tauri/                  Tauri shell and Rust command layer
crates/                     Rust audio/project crates
DOCS/AUDIAW-DESIGN.md       UI/UX source of truth
DOCS/                       Product, architecture, roadmap, and development documentation
```

The current frontend audio path uses Web Audio for deterministic local playback and offline rendering in browser/Tauri webview contexts. The Rust/Tauri layer provides desktop packaging, filesystem commands, dialogs, project IO, and native audio engine integration points.

## Verification

```bash
node_modules\.bin\tsc.CMD --noEmit
npm run build:frontend
cargo check
npm run build:windows
```

## Release Process

See [RELEASE.md](RELEASE.md) for versioning, local verification, artifact names, and GitHub Release publishing.

## License

GPL-3.0. See [LICENSE](LICENSE).

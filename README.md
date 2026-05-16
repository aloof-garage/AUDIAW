# AUDIAW

AUDIAW is a desktop digital audio workstation prototype built with React, TypeScript, Vite, Tauri, and Rust. The current app focuses on a complete end-to-end production workflow: create a project, add sounds/instruments, edit MIDI, arrange clips, mix, automate, play back, save/load, and render a WAV.

## Current V1 Surface

- Arrangement timeline with draggable clips and snap-oriented editing.
- Audio-style clips driven by an internal sampler/drum synthesis layer.
- MIDI tracks with synth, bass, and pad playback using Web Audio.
- Piano roll note editing: double-click to add, drag to move, double-click note to delete.
- Mixer controls for volume, pan, mute, solo, meters, and send routing.
- Inspector with channel controls, device/effect chain, routing, and volume automation point writing.
- Browser workflows for assigning samples and inserting built-in plugin concepts.
- Transport with play, stop, record state, loop, playhead sync, and keyboard shortcuts.
- Project persistence through local project save/load.
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
| `Ctrl+1` | Arrangement |
| `Ctrl+2` | Mixer |
| `Ctrl+3` | Piano roll |
| `Ctrl+B` | Toggle browser |
| `Ctrl+I` | Toggle inspector |
| `Ctrl+J` | Toggle bottom panel |
| `V`, `B`, `C` | Pointer, pencil, scissors tools |
| `L`, `R` | Loop, record state |

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
4. Double-click an arrangement lane to create clips.
5. Open Piano Roll and double-click the grid to add MIDI notes.
6. Press `Space` to play. Adjust mixer volume, pan, mute, solo, and send values.
7. Write volume automation from the Inspector while the playhead is positioned.
8. Use `Ctrl+S` to save, `Ctrl+Z` / `Ctrl+Y` to edit safely.
9. Use `Ctrl+E` and Start Export to render a WAV.

## Architecture

```text
src/App.tsx                 Main reference-faithful DAW shell and Web Audio workflow
src/components/             Earlier reusable UI surfaces kept for ongoing modularization
src/stores/                 Existing Zustand/Tauri stores retained for backend integration
src-tauri/                  Tauri shell and Rust command layer
crates/                     Rust audio/project crates
DOCS/AUDIAW-DESIGN.md       UI/UX source of truth
DOCS/                       Product, architecture, roadmap, and development documentation
```

The current frontend audio path uses Web Audio for deterministic local playback and offline rendering in browser/Tauri webview contexts. The Rust/Tauri engine remains available for native audio work and should be used as the next hardening target when moving from prototype-grade synthesis/sampler workflows to production audio-file streaming and recording.

## Verification

```bash
node_modules\.bin\tsc.CMD --noEmit
node_modules\.bin\vite.CMD build
cargo check
```

## Known Remaining Engineering Work

- Move the Web Audio engine and project model out of `src/App.tsx` into dedicated modules.
- Replace synthesized sample stand-ins with decoded user audio files and waveform cache generation.
- Add native file-backed `.audiaw` save/load through Tauri dialogs.
- Add real audio recording/take lanes.
- Add stem export and richer render settings.
- Add automated UI tests once browser automation is available in the environment.

## License

GPL-3.0. See [LICENSE](LICENSE).

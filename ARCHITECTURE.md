# Architecture

This document describes the systems that exist in AUDIAW v1.0.

## Overview

AUDIAW is a Tauri desktop app with a React frontend and Rust backend crates.

The current production app uses:

- React and TypeScript for the DAW interface
- Web Audio for interactive playback and offline WAV rendering
- Tauri commands for native filesystem dialogs and desktop integration
- Rust crates for native audio/project infrastructure and future engine hardening
- GitHub Actions for release builds

## Repository Layout

```text
src/
  App.tsx                 Active DAW shell, project workflow, playback, export
  components/             Reusable UI components retained for modularization
  stores/                 Zustand/Tauri integration stores
  styles/                 Shared theme and animation files

src-tauri/
  src/main.rs             Tauri entrypoint, commands, native audio startup
  tauri.conf.json         Desktop metadata, bundle targets, app window config
  capabilities/           Tauri permissions
  icons/                  App icons

crates/
  audiaw-types/           Shared Rust types
  audiaw-engine/          Native audio engine infrastructure
  audiaw-audio-io/        CPAL audio input/output and WAV helpers
  audiaw-project/         Rust project persistence model
  audiaw-effects/         Native effect modules
  audiaw-history/         History/undo infrastructure
```

## Frontend Runtime

`src/App.tsx` is the active application shell. It owns the current project state and wires together:

- project metadata
- track and clip data
- selected track/clip state
- workspace layout
- transport state
- undo/redo stacks
- autosave and recent projects
- export dialog
- command palette and keyboard shortcuts

Project data is serialized as `.audiaw` JSON.

## Project Persistence

The frontend builds a `ProjectData` document containing:

- project id, name, version, timestamps
- BPM and sample rate
- tracks, clips, MIDI notes, effects, sends, and automation
- workspace layout and selected objects
- playback state
- asset metadata

In the desktop runtime, save/load uses Tauri commands:

- `read_project_document`
- `write_project_document`

In a browser-only development fallback, the app uses local download/upload behavior.

Autosave writes to local storage so work can be recovered after an unexpected close.

## Audio and Export

Interactive playback and offline export are handled with Web Audio in the frontend.

The current render path:

1. Creates an `OfflineAudioContext`.
2. Schedules project clips, synth tones, drums, automation, and mixer gain.
3. Renders the master output.
4. Encodes the rendered buffer as WAV.
5. Writes the file through the desktop filesystem command in Tauri.

The Rust audio crates remain part of the native foundation and provide CPAL-based device handling, decoder/encoder utilities, and engine infrastructure.

## Tauri Backend

`src-tauri/src/main.rs` provides:

- Tauri app startup
- native audio device initialization
- project document read/write commands
- binary file write command for exports
- Rust project/engine commands retained for native integration
- dialog, filesystem, and shell plugins

Audio device startup is non-fatal. If an input or output device is unavailable, the app can still launch for editing, saving, and offline export.

## Release Architecture

Release configuration lives in:

- `src-tauri/tauri.conf.json`
- `.github/workflows/release.yml`
- `package.json`
- `HOW_TO_RELEASE.md`

The GitHub workflow builds:

- Windows NSIS installer and portable executable
- macOS DMG
- Linux AppImage

The website download buttons target stable GitHub Release asset names.

## Current Design Constraints

- `src/App.tsx` is intentionally still the main application shell.
- Existing component and Zustand store folders are retained for ongoing modularization.
- The browser/sample workflow uses built-in sample names and synthesis/sampler behavior.
- Native audio crates are present, but Web Audio is the active v1 playback/export path.

Future refactors should preserve `.audiaw` project compatibility and release artifact names.

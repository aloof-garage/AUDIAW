# AUDIAW

AUDIAW is a cross-platform desktop digital audio workstation built with React, TypeScript, Tauri, and Rust.

The v1.0 app focuses on a complete local production workflow: create a project, arrange clips, edit MIDI, mix tracks, write automation, save/load `.audiaw` project files, and export a WAV mixdown.

## Features

- Desktop app for Windows, macOS, and Linux
- Arrangement timeline with draggable, resizable, splittable clips
- MIDI piano roll with note creation, editing, and deletion
- Mixer with volume, pan, mute, solo, sends, and meters
- Transport controls with playback, stop, loop, record state, and shortcuts
- Project save/load using portable `.audiaw` files
- Autosave recovery and recent projects
- Browser workflow for samples, built-in plugin concepts, and projects
- Offline WAV export from the master output
- GitHub Releases pipeline for installers and release artifacts

## Downloads

Production builds are published from [GitHub Releases](https://github.com/aloof-garage/AUDIAW/releases/latest).

| Platform | Asset |
| --- | --- |
| Windows installer | `AUDIAW-windows-x64-setup.exe` |
| Windows portable | `AUDIAW-windows-x64-portable.exe` |
| macOS | `AUDIAW-macos.dmg` |
| Linux | `AUDIAW-linux-x86_64.AppImage` |

## Requirements

- Rust 1.75+
- Node.js 20+
- pnpm 9+
- Platform build tools for Tauri

See [INSTALLATION.md](INSTALLATION.md) for detailed setup.

## Development

Install dependencies:

```bash
pnpm install
```

Run the desktop app in development mode:

```bash
pnpm dev
```

Run the main verification checks:

```bash
npm run build:frontend
cargo check
```

Build the desktop release for your current platform:

```bash
npm run build
```

Windows-specific release build:

```bash
npm run build:windows
```

## Project Structure

```text
src/                 React app, DAW UI, project workflow, Web Audio render path
src-tauri/           Tauri desktop shell, native commands, packaging config
crates/              Rust audio, project, effects, history, and shared type crates
.github/workflows/   Release automation
audiaw-marketing/    Website and download page
```

## Documentation

- [INSTALLATION.md](INSTALLATION.md) - install and local setup
- [CONTRIBUTING.md](CONTRIBUTING.md) - contribution workflow
- [HOW_TO_RELEASE.md](HOW_TO_RELEASE.md) - beginner-friendly release guide
- [ARCHITECTURE.md](ARCHITECTURE.md) - real system architecture
- [DEVELOPMENT.md](DEVELOPMENT.md) - contributor development guide
- [CHANGELOG.md](CHANGELOG.md) - version history

## Common Shortcuts

| Shortcut | Action |
| --- | --- |
| `Space` | Play / pause |
| `Esc` | Stop and close transient UI |
| `Ctrl+K` | Command palette |
| `Ctrl+E` | Export mixdown |
| `Ctrl+S` | Save project |
| `Ctrl+Shift+S` | Save project as |
| `Ctrl+O` | Open project |
| `Ctrl+N` | New project |
| `Ctrl+Z` / `Ctrl+Y` | Undo / redo |
| `Ctrl+D` | Duplicate selected clip |
| `Delete` / `Backspace` | Delete selected clip |
| `Ctrl+1`, `Ctrl+2`, `Ctrl+3` | Arrangement, mixer, piano roll |

## Release

Releases use semantic version tags such as `v1.0.0`. Pushing a release tag runs GitHub Actions, builds Windows/macOS/Linux artifacts, and uploads them to GitHub Releases.

See [HOW_TO_RELEASE.md](HOW_TO_RELEASE.md) for the full step-by-step process.

## Contributing

Contributions are welcome. Start with [CONTRIBUTING.md](CONTRIBUTING.md), keep changes focused, and run the verification commands before opening a pull request.

## License

GPL-3.0. See [LICENSE](LICENSE).

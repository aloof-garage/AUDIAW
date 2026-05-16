# Changelog

All notable changes to AUDIAW are documented here.

AUDIAW uses semantic versioning: `MAJOR.MINOR.PATCH`.

## [Unreleased]

- No unreleased changes documented yet.

## [1.0.0] - 2026-05-16

### Added

- Cross-platform Tauri desktop packaging for Windows, macOS, and Linux.
- GitHub Actions release workflow for stable release asset names.
- Windows NSIS installer and portable executable output.
- File-backed `.audiaw` project save/load workflow.
- Autosave recovery and recent projects.
- Arrangement timeline with clip creation, movement, resize, split, duplicate, rename, and delete.
- MIDI piano roll editing.
- Mixer controls for volume, pan, mute, solo, sends, and meters.
- Inspector controls for track settings, device/effect chain, routing, and automation writing.
- Offline WAV mixdown export.
- Keyboard shortcuts for common project, transport, view, and editing actions.

### Changed

- Updated documentation for production v1.0 release workflows.
- Stabilized release artifact naming used by the website download buttons.
- Improved desktop filesystem handling for project files and audio exports.

### Fixed

- Desktop launch no longer depends on every audio device initializing successfully.
- Release workflow now creates or updates matching GitHub Releases and uploads platform artifacts.

## Links

- [Repository](https://github.com/aloof-garage/AUDIAW)
- [Releases](https://github.com/aloof-garage/AUDIAW/releases)

# AUDIAW Release Process

AUDIAW v1.0.0 desktop artifacts are distributed from GitHub Releases.

## Versioning

- Use semantic versions: `vMAJOR.MINOR.PATCH`.
- Keep these files in sync before tagging: `package.json`, `src-tauri/tauri.conf.json`, `src-tauri/Cargo.toml`, `Cargo.toml`, `Cargo.lock`, `CHANGELOG.md`, and `RELEASE_NOTES.md`.

## Release Assets

The release workflow uploads stable asset names used by the website download buttons:

- `AUDIAW-windows-x64-setup.exe`
- `AUDIAW-windows-x64-portable.exe`
- `AUDIAW-macos.dmg`
- `AUDIAW-linux-x86_64.AppImage`

## Local Verification

```powershell
npm run build:frontend
cargo check
npm run build:windows
```

The Windows installer is generated under `target/release/bundle/nsis/`.

## Publishing

Create and push a tag:

```powershell
git tag v1.0.0
git push origin v1.0.0
```

The GitHub Actions release workflow creates or updates the matching release and uploads Windows, macOS, and Linux artifacts.

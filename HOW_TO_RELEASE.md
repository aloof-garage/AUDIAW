# How to Release AUDIAW

This guide explains how to publish a new AUDIAW desktop release.

Use this when you want users to download a new Windows, macOS, or Linux build from GitHub Releases.

## What the Release Creates

The release workflow uploads these files:

- `AUDIAW-windows-x64-setup.exe`
- `AUDIAW-windows-x64-portable.exe`
- `AUDIAW-macos.dmg`
- `AUDIAW-linux-x86_64.AppImage`

The website download buttons use these exact names. Do not rename them unless you also update the website.

## 1. Choose the Version

AUDIAW uses semantic versioning:

```text
MAJOR.MINOR.PATCH
```

Examples:

- `1.0.1` for a small bug fix
- `1.1.0` for new features
- `2.0.0` for breaking changes

The Git tag must start with `v`, for example:

```text
v1.0.1
```

## 2. Update Version Numbers

Update the version in these files:

- `package.json`
- `src-tauri/tauri.conf.json`
- `src-tauri/Cargo.toml`
- `Cargo.toml`
- `CHANGELOG.md`
- `RELEASE_NOTES.md`

If Rust package versions changed, refresh the lockfile:

```bash
cargo check
```

## 3. Update Release Notes

Edit `RELEASE_NOTES.md`.

Keep it short:

- What changed
- What was fixed
- Any important user notes
- Download asset names

GitHub Actions uses this file as the GitHub Release description.

## 4. Verify the App Locally

Run:

```bash
npm run build:frontend
cargo check
```

On Windows, also run:

```bash
npm run build:windows
```

On macOS, run:

```bash
npm run build:macos
```

On Linux, run:

```bash
npm run build:linux
```

You only need to build locally for the operating system you are using. GitHub Actions builds all platforms after the tag is pushed.

## 5. Check the Windows Build Locally

After `npm run build:windows`, check:

```text
target/release/bundle/nsis/
```

You should see a setup file like:

```text
AUDIAW_1.0.0_x64-setup.exe
```

You can also run the portable app:

```text
target/release/audiaw.exe
```

Confirm that the app opens, projects can be saved, and WAV export works.

## 6. Commit the Release Prep

```bash
git status
git add package.json src-tauri/tauri.conf.json src-tauri/Cargo.toml Cargo.toml Cargo.lock CHANGELOG.md RELEASE_NOTES.md
git commit -m "chore: prepare v1.0.1 release"
```

Add any other files you intentionally changed.

## 7. Create the Git Tag

```bash
git tag v1.0.1
```

Replace `v1.0.1` with the real version.

## 8. Push the Release

Push the commit:

```bash
git push origin main
```

Push the tag:

```bash
git push origin v1.0.1
```

Pushing the tag starts the release workflow.

## 9. Watch GitHub Actions

Open:

```text
https://github.com/aloof-garage/AUDIAW/actions
```

Wait for `Release Desktop Builds` to finish.

It should build:

- Windows on `windows-latest`
- macOS on `macos-latest`
- Linux on `ubuntu-22.04`

## 10. Verify GitHub Release Assets

Open:

```text
https://github.com/aloof-garage/AUDIAW/releases/latest
```

Confirm the release contains:

- `AUDIAW-windows-x64-setup.exe`
- `AUDIAW-windows-x64-portable.exe`
- `AUDIAW-macos.dmg`
- `AUDIAW-linux-x86_64.AppImage`

Download at least one asset and make sure it starts downloading immediately.

## 11. Verify Website Downloads

The website points to the latest GitHub Release using stable asset URLs:

```text
https://github.com/aloof-garage/AUDIAW/releases/latest/download/AUDIAW-windows-x64-setup.exe
https://github.com/aloof-garage/AUDIAW/releases/latest/download/AUDIAW-macos.dmg
https://github.com/aloof-garage/AUDIAW/releases/latest/download/AUDIAW-linux-x86_64.AppImage
```

If asset names stay the same, no website change is needed.

Only update the website if you intentionally change the asset names.

## Manual Release Upload

Use this only if GitHub Actions fails and you already have verified builds.

Create or open the release:

```bash
gh release create v1.0.1 --title "AUDIAW 1.0.1" --notes-file RELEASE_NOTES.md
```

Upload files:

```bash
gh release upload v1.0.1 dist-release/* --clobber
```

## Release Checklist

- Version numbers updated
- `CHANGELOG.md` updated
- `RELEASE_NOTES.md` updated
- Local checks passed
- Release commit pushed
- Version tag pushed
- GitHub Actions completed
- Release assets are present
- Download links work
- App launches after install/download

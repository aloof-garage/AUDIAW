# AUDIAW Production Deployment Guide

**Version:** 1.0.0  
**Last Updated:** 2026-05-18  
**Audience:** Release managers, maintainers, and contributors

---

## Overview

This guide provides a complete, step-by-step process for deploying AUDIAW to production. It covers building Windows installers, code signing, creating GitHub releases, updating the website, and handling post-release verification and rollbacks.

**Related Documentation:**
- [WINDOWS_RELEASE_GUIDE.md](WINDOWS_RELEASE_GUIDE.md) - Detailed Windows-specific release information
- [CODE_SIGNING_SETUP.md](CODE_SIGNING_SETUP.md) - Code signing certificate setup
- [BUILD_TEST_REPORT.md](BUILD_TEST_REPORT.md) - Build testing and verification
- [HOW_TO_RELEASE.md](HOW_TO_RELEASE.md) - Quick release reference

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Pre-Release Checklist](#pre-release-checklist)
3. [Building the Windows Installer](#building-the-windows-installer)
4. [Code Signing (Optional)](#code-signing-optional)
5. [Creating a GitHub Release](#creating-a-github-release)
6. [Updating the Website](#updating-the-website)
7. [Post-Release Verification](#post-release-verification)
8. [Rollback Procedures](#rollback-procedures)
9. [Automated Release Workflow (Future)](#automated-release-workflow-future)
10. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Required Tools and Dependencies

**Core Development Tools:**
- **Node.js** v18+ - `node --version`
- **pnpm** v8+ - `pnpm --version`
- **Rust** (stable) - `rustc --version`
- **Tauri CLI** v2.0 - `cargo tauri --version`
- **Visual Studio Build Tools** (Windows) - C++ workload required
- **GitHub CLI** (optional) - `gh --version`
- **Windows SDK** (for signing) - Includes signtool.exe

**Quick Verification:**
```powershell
node --version && pnpm --version && rustc --version && cargo tauri --version
```

### Access Requirements

- [ ] GitHub repository write access
- [ ] Permission to create releases
- [ ] Vercel deployment access (for website)
- [ ] Code signing certificate (optional but recommended)

### Code Signing Certificate (Optional but Recommended)

**Why it matters:**
- ✅ Reduces Windows SmartScreen warnings
- ✅ Builds user trust
- ✅ Proves software authenticity
- ✅ Required for reputation building with Microsoft

**Certificate options:**
1. **Extended Validation (EV)** - $300-600/year - Immediate SmartScreen reputation
2. **Standard Code Signing** - $100-400/year - Reputation builds over 2-4 weeks

**Providers:** DigiCert, Sectigo, GlobalSign, SSL.com

**See:** [CODE_SIGNING_SETUP.md](CODE_SIGNING_SETUP.md) for detailed setup instructions.

---

## Pre-Release Checklist

### 1. Version Number Updates

Update version in all files (must match):

- [ ] `package.json` - `"version": "1.0.0"`
- [ ] `src-tauri/tauri.conf.json` - `"version": "1.0.0"`
- [ ] `src-tauri/Cargo.toml` - `version = "1.0.0"`
- [ ] `Cargo.toml` (workspace root) - Update if needed

**Semantic Versioning:**
```
MAJOR.MINOR.PATCH (e.g., 1.0.0)
- MAJOR: Breaking changes (1.0.0 → 2.0.0)
- MINOR: New features (1.0.0 → 1.1.0)
- PATCH: Bug fixes (1.0.0 → 1.0.1)
```

### 2. Changelog Preparation

- [ ] Update `CHANGELOG.md` with all changes since last release
- [ ] Organize by category: Added, Changed, Deprecated, Removed, Fixed, Security
- [ ] Update `RELEASE_NOTES.md` with user-facing changes

**Example:**
```markdown
## [1.0.1] - 2026-05-18

### Added
- New audio export format support

### Fixed
- Fixed memory leak in audio playback
- Resolved UI rendering issue on Windows 11
```

### 3. Testing Requirements

- [ ] Run `cargo test` - All tests pass
- [ ] Run `pnpm run build:frontend` - Frontend builds successfully
- [ ] Run `cargo check` - Backend compiles without errors
- [ ] Manual testing - All features work correctly
- [ ] Test on clean Windows VM

### 4. Documentation Updates

- [ ] Update `README.md` if needed
- [ ] Verify installation instructions are current
- [ ] Update any relevant documentation in `docs/`

### 5. Configuration Verification

```powershell
.\scripts\check-config.ps1
```

**Expected output:** All [OK], warnings acceptable for unsigned builds.

---

## Building the Windows Installer

### Step 1: Clean Previous Builds

```powershell
# Remove old build artifacts
Remove-Item -Recurse -Force src-tauri\target -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force dist -ErrorAction SilentlyContinue

Write-Host "Build artifacts cleaned" -ForegroundColor Green
```

### Step 2: Install Dependencies

```powershell
# Install Node.js dependencies
pnpm install

# Update Rust dependencies
cd src-tauri
cargo update
cd ..
```

### Step 3: Build the Installer

```powershell
pnpm run build:windows
```

**What this does:**
1. Builds the React frontend with Vite
2. Compiles the Rust backend
3. Creates the NSIS installer
4. Bundles all assets
5. Signs the installer (if certificate configured)

**Build time:** 5-15 minutes (first build takes longer)

**Build output location:**
```
src-tauri\target\release\bundle\nsis\AUDIAW_1.0.0_x64-setup.exe
```

### Step 4: Verify Build Output

```powershell
# Check if installer exists
$installerPath = "src-tauri\target\release\bundle\nsis\AUDIAW_*_x64-setup.exe"
$installer = Get-Item $installerPath -ErrorAction SilentlyContinue

if ($installer) {
    Write-Host "✓ Installer created successfully" -ForegroundColor Green
    Write-Host "  Path: $($installer.FullName)" -ForegroundColor Cyan
    Write-Host "  Size: $([math]::Round($installer.Length / 1MB, 2)) MB" -ForegroundColor Cyan
    
    # Calculate checksum
    $hash = Get-FileHash -Algorithm SHA256 $installer.FullName
    Write-Host "  SHA256: $($hash.Hash)" -ForegroundColor Cyan
} else {
    Write-Host "✗ Installer not found!" -ForegroundColor Red
    Write-Host "  Check build logs for errors" -ForegroundColor Yellow
}
```

**Expected file size:** 50-80 MB

### Step 5: Test the Installer Locally

**CRITICAL:** Always test before releasing!

1. **Copy installer to test location**
2. **Run the installer** and complete installation
3. **Verify installation:**
   - [ ] App launches without errors
   - [ ] Desktop shortcut created
   - [ ] Start Menu entry exists
   - [ ] All features work correctly
   - [ ] Audio playback functions
   - [ ] Project save/load works
4. **Test uninstallation** - Verify clean removal

### Troubleshooting Common Build Issues

**Issue: "Rust not found"**
```powershell
winget install Rustlang.Rustup
# Or download from: https://rustup.rs/
```

**Issue: "MSVC build tools not found"**
- Install Visual Studio Build Tools
- Select "Desktop development with C++"
- Restart PowerShell

**Issue: "Out of memory during build"**
```powershell
$env:NODE_OPTIONS="--max-old-space-size=4096"
pnpm run build:windows
```

**Issue: "Build fails with 'permission denied'"**
```powershell
# Close AUDIAW if running
Remove-Item -Recurse -Force src-tauri\target
pnpm run build:windows
```

---

## Code Signing (Optional)

### When to Sign vs When to Skip

**Sign the installer when:**
- ✅ Releasing to public users
- ✅ You have a code signing certificate
- ✅ Building reputation with Microsoft
- ✅ Want to reduce SmartScreen warnings

**Skip signing when:**
- ⚠️ Testing locally
- ⚠️ Internal development builds
- ⚠️ Don't have a certificate yet
- ⚠️ Pre-alpha/experimental builds

**Note:** Unsigned installers will trigger Windows SmartScreen warnings. This is normal for new software.

### Setting Up Environment Variables

**Temporary (current session only):**
```powershell
$env:TAURI_WINDOWS_SIGN_THUMBPRINT = "YOUR_CERTIFICATE_THUMBPRINT"
$env:TAURI_WINDOWS_TIMESTAMP_URL = "http://timestamp.digicert.com"
```

**Permanent (system-wide):**
```powershell
[System.Environment]::SetEnvironmentVariable('TAURI_WINDOWS_SIGN_THUMBPRINT', 'YOUR_THUMBPRINT', 'User')
[System.Environment]::SetEnvironmentVariable('TAURI_WINDOWS_TIMESTAMP_URL', 'http://timestamp.digicert.com', 'User')

# Restart PowerShell to load new variables
```

### Finding Your Certificate Thumbprint

**From .pfx file:**
```powershell
$cert = Get-PfxCertificate -FilePath "C:\path\to\certificate.pfx"
$cert.Thumbprint
```

**From installed certificate:**
```powershell
Get-ChildItem -Path Cert:\CurrentUser\My -CodeSigningCert | Format-List Subject, Thumbprint
```

The thumbprint looks like: `A1B2C3D4E5F6G7H8I9J0K1L2M3N4O5P6Q7R8S9T0`

### Signing the Installer

**Automatic Signing (During Build):**

If environment variables are set, Tauri will automatically sign during build:
```powershell
pnpm run build:windows
```

**Manual Signing (After Build):**

```powershell
# Locate signtool.exe
Get-ChildItem -Path "C:\Program Files (x86)\Windows Kits" -Recurse -Filter "signtool.exe" | Select-Object FullName

# Sign with thumbprint
& "C:\Program Files (x86)\Windows Kits\10\bin\10.0.22621.0\x64\signtool.exe" sign `
  /sha1 "YOUR_THUMBPRINT" `
  /tr "http://timestamp.digicert.com" `
  /td SHA256 `
  /fd SHA256 `
  "src-tauri\target\release\bundle\nsis\AUDIAW_1.0.0_x64-setup.exe"
```

### Verifying the Signature

```powershell
signtool verify /pa "src-tauri\target\release\bundle\nsis\AUDIAW_1.0.0_x64-setup.exe"
```

**Expected output:** `Successfully verified: AUDIAW_1.0.0_x64-setup.exe`

### SmartScreen Reputation Considerations

**Important:** Even signed installers may show SmartScreen warnings initially.

**Why this happens:**
- New certificates need to build reputation
- Low download count = low reputation
- Takes 2-4 weeks and ~1000+ downloads

**Solutions:**
1. **Be patient** - Reputation builds over time
2. **Get EV certificate** - Immediate reputation
3. **Increase downloads** - More users = better reputation
4. **Submit to Microsoft** - Request SmartScreen review

**User communication:**
```markdown
## Installation Note

If you see a Windows SmartScreen warning:
1. Click "More info"
2. Click "Run anyway"
3. Follow the installer

This is normal for new software. AUDIAW is safe and open-source.
```

---

## Creating a GitHub Release

### Step 1: Commit Release Changes

```powershell
# Stage all version updates
git add package.json src-tauri/tauri.conf.json src-tauri/Cargo.toml Cargo.toml Cargo.lock CHANGELOG.md RELEASE_NOTES.md

# Commit with descriptive message
git commit -m "chore: prepare v1.0.0 release"

# Push to main branch
git push origin main
```

### Step 2: Create Git Tag

```powershell
# Create annotated tag
git tag -a v1.0.0 -m "Release v1.0.0"

# Push tag to GitHub
git push origin v1.0.0
```

**Tag naming convention:** Always prefix with `v` (e.g., `v1.0.0`)

### Step 3: Prepare Release Assets

```powershell
# Create release directory
New-Item -ItemType Directory -Force -Path "release-assets"

# Copy and rename installer
Copy-Item "src-tauri\target\release\bundle\nsis\AUDIAW_*_x64-setup.exe" "release-assets\AUDIAW-Setup.exe"

# Calculate checksum
$hash = Get-FileHash -Algorithm SHA256 "release-assets\AUDIAW-Setup.exe"
$hash.Hash | Out-File "release-assets\AUDIAW-Setup.exe.sha256"

Write-Host "Release assets prepared in release-assets/" -ForegroundColor Green
Write-Host "SHA256: $($hash.Hash)" -ForegroundColor Cyan
```

### Step 4: Create Release

**Option A: GitHub CLI (Recommended)**

```powershell
gh release create v1.0.0 `
  --title "AUDIAW v1.0.0" `
  --notes-file RELEASE_NOTES.md `
  release-assets/AUDIAW-Setup.exe `
  release-assets/AUDIAW-Setup.exe.sha256

# Verify release was created
gh release view v1.0.0
```

**Options:**
- `--draft` - Create as draft (review before publishing)
- `--prerelease` - Mark as pre-release (beta, alpha, etc.)
- `--latest` - Mark as latest release (default)

**Option B: GitHub Web Interface**

1. Go to https://github.com/aloof-garage/AUDIAW/releases
2. Click "Draft a new release"
3. Select tag `v1.0.0`
4. Title: `AUDIAW v1.0.0`
5. Paste `RELEASE_NOTES.md` content
6. Attach files: `AUDIAW-Setup.exe` and `.sha256`
7. Click "Publish release"

### Step 5: Verify Release

```powershell
# Check release exists
gh release view v1.0.0

# Test download
$url = "https://github.com/aloof-garage/AUDIAW/releases/download/v1.0.0/AUDIAW-Setup.exe"
Invoke-WebRequest -Uri $url -OutFile "test-download.exe"
$hash = Get-FileHash "test-download.exe"
Write-Host "Downloaded SHA256: $($hash.Hash)"
Remove-Item "test-download.exe"
```

**Verification checklist:**
- [ ] Release appears on GitHub
- [ ] Tag is correct
- [ ] Release notes formatted properly
- [ ] Installer file attached
- [ ] Checksum file attached
- [ ] Download link works
- [ ] File size correct (~50-80 MB)
- [ ] Checksum matches

---

## Updating the Website

### When Website Updates Are Needed

Update website when:
- ✅ New version released
- ✅ Download links changed
- ✅ Major features added
- ✅ System requirements changed

**Note:** If using GitHub's "latest" URL pattern, website updates may not be needed:
```
https://github.com/aloof-garage/AUDIAW/releases/latest/download/AUDIAW-Setup.exe
```

### Testing Download Links Locally

```powershell
# Navigate to website directory
cd audiaw-marketing

# Install dependencies
npm install

# Run development server
npm run dev
```

**Test checklist:**
- [ ] Download button appears correctly
- [ ] Click download button
- [ ] Verify correct file downloads
- [ ] Check download starts immediately
- [ ] Verify file size is correct
- [ ] Test on different browsers

### Deploying to Vercel

**Option 1: Automatic Deployment (Git Push)**

```powershell
cd audiaw-marketing

# Make any necessary changes
git add .
git commit -m "docs: update for v1.0.0 release"
git push origin main
```

Vercel automatically deploys on push to main.

**Option 2: Manual Deployment (Vercel CLI)**

```powershell
cd audiaw-marketing
vercel --prod
```

**Option 3: Vercel Dashboard**

1. Go to https://vercel.com/dashboard
2. Select audiaw-marketing project
3. Click "Deployments"
4. Click "Redeploy" on latest deployment

### Verifying Production Deployment

```powershell
# Check deployment status
vercel ls audiaw-marketing

# Open production URL
Start-Process "https://audiaw.vercel.app"  # Replace with actual URL
```

**Verification checklist:**
- [ ] Website loads correctly
- [ ] Download button visible
- [ ] Download link points to correct release
- [ ] Version number updated
- [ ] Release notes current
- [ ] All pages load without errors
- [ ] Mobile view works correctly

### Testing the Complete Download Flow

1. Visit production website
2. Click download button
3. Verify download starts
4. Check file size and checksum
5. Run installer and test app

---

## Post-Release Verification

### Download Link Testing

Test all download links:

```powershell
# Direct download link
$url = "https://github.com/aloof-garage/AUDIAW/releases/download/v1.0.0/AUDIAW-Setup.exe"
Invoke-WebRequest -Uri $url -OutFile "test-github.exe"

# Latest release link
$url = "https://github.com/aloof-garage/AUDIAW/releases/latest/download/AUDIAW-Setup.exe"
Invoke-WebRequest -Uri $url -OutFile "test-latest.exe"

# Verify both files are identical
$hash1 = Get-FileHash "test-github.exe"
$hash2 = Get-FileHash "test-latest.exe"
if ($hash1.Hash -eq $hash2.Hash) {
    Write-Host "✓ Download links verified" -ForegroundColor Green
} else {
    Write-Host "✗ Download links mismatch!" -ForegroundColor Red
}

# Clean up
Remove-Item "test-github.exe", "test-latest.exe"
```

### Installer Testing on Clean Windows

**CRITICAL:** Test on a clean Windows installation to catch issues users might encounter.

**Setup test environment:**
1. Use Windows VM or clean PC
2. Ensure Windows is up to date
3. No development tools installed
4. Fresh user account

**Test procedure:**
1. Download installer from website
2. Run installer (note any warnings)
3. Launch app from desktop shortcut and Start Menu
4. Test basic functionality:
   - Create new project
   - Import audio file
   - Play audio
   - Export project
5. Check for errors (no console errors, no crash dialogs)

### SmartScreen Warning Verification

Test the SmartScreen experience:

1. Download on clean Windows using Edge or Chrome
2. Run installer and note SmartScreen warning (if any)
3. Document exact warning message
4. Test "More info" → "Run anyway" flow
5. Take screenshots of warnings

### User Communication About Warnings

**In README.md:**
```markdown
## Installation Note

When installing AUDIAW, you may see a Windows SmartScreen warning:
> "Windows protected your PC"

This is normal for new software. AUDIAW is safe and open-source.

**To install:**
1. Click "More info"
2. Click "Run anyway"
3. Follow the installation wizard

We're working on building reputation with Microsoft to eliminate these warnings.
```

**On website:**
- Add prominent notice about SmartScreen
- Include screenshots of the warning
- Provide step-by-step bypass instructions
- Explain why the warning appears

### Monitoring for Issues

**Post-Release Monitoring (First 48 Hours):**

- [ ] Check GitHub Issues every 4 hours
- [ ] Monitor download count
- [ ] Review Vercel analytics
- [ ] Check for crash reports
- [ ] Read user feedback
- [ ] Test download links
- [ ] Verify website is up

---

## Rollback Procedures

### How to Revert a Bad Release

**Determine severity:**
- **Critical:** App won't launch, data loss, security issue → Immediate rollback
- **Major:** Core features broken, frequent crashes → Rollback within hours
- **Minor:** UI glitches, non-critical bugs → Fix in next release

### Rollback Steps

#### Step 1: Communicate with Users

```markdown
## ⚠️ Important Notice

We've identified a critical issue in v1.0.0 that affects [description].

**Action required:**
- Do not download v1.0.0
- If already installed, please downgrade to v0.9.0
- We're working on a fix

**Download v0.9.0:**
https://github.com/aloof-garage/AUDIAW/releases/tag/v0.9.0
```

Post to: GitHub Release, website banner, social media, Discord

#### Step 2: Mark Release as Pre-release

```powershell
# Using GitHub CLI
gh release edit v1.0.0 --prerelease
```

This prevents users from downloading it as the "latest" release.

#### Step 3: Update Website Download Links

**Option A: Point to previous version**

```typescript
// audiaw-marketing/app/page.tsx
const DOWNLOAD_URL = "https://github.com/aloof-garage/AUDIAW/releases/download/v0.9.0/AUDIAW-Setup.exe";
```

**Option B: Remove download button temporarily**

```typescript
<div className="alert alert-warning">
  Downloads temporarily unavailable while we fix a critical issue.
  Expected resolution: [timeframe]
</div>
```

Deploy changes:
```powershell
cd audiaw-marketing
git add .
git commit -m "fix: rollback to v0.9.0 due to critical issue"
git push origin main
```

#### Step 4: Promote Previous Release

```powershell
# Mark v0.9.0 as latest
gh release edit v0.9.0 --latest
```

#### Step 5: Fix and Re-release

1. Fix the issue
2. Test thoroughly
3. Release as v1.0.1
4. Reference fix in release notes

---

## Automated Release Workflow (Future)

### GitHub Actions Setup

Create `.github/workflows/release.yml` for automated builds on tag push.

**Key features:**
- Builds on tag push (`v*`)
- Signs installer (if certificate configured)
- Calculates checksums
- Creates GitHub Release
- Uploads assets

**Required GitHub Secrets:**
- `WINDOWS_CERTIFICATE_BASE64` - Base64-encoded .pfx file
- `WINDOWS_CERTIFICATE_THUMBPRINT` - Certificate thumbprint
- `WINDOWS_CERTIFICATE_PASSWORD` - Certificate password (if using .pfx)

**To create base64 secret:**
```powershell
$bytes = [System.IO.File]::ReadAllBytes("certificate.pfx")
$base64 = [System.Convert]::ToBase64String($bytes)
$base64 | Set-Clipboard
# Paste into GitHub Secrets
```

**To trigger automated release:**
```powershell
git tag v1.0.0
git push origin v1.0.0
```

GitHub Actions automatically builds and releases.

**See:** [WINDOWS_RELEASE_GUIDE.md](WINDOWS_RELEASE_GUIDE.md) for complete workflow file example.

---

## Troubleshooting

### Common Deployment Issues

**Version mismatch between files:**
```powershell
# Check all version numbers
Get-Content package.json | Select-String '"version"'
Get-Content src-tauri/tauri.conf.json | Select-String '"version"'
Get-Content src-tauri/Cargo.toml | Select-String '^version'

# Update all to match, then:
cargo check  # Updates Cargo.lock
```

**Git tag already exists:**
```powershell
# Delete local and remote tag
git tag -d v1.0.0
git push origin :refs/tags/v1.0.0

# Create new tag
git tag v1.0.0
git push origin v1.0.0
```

**Release assets not uploading:**
```powershell
# Verify files exist
Test-Path "release-assets/AUDIAW-Setup.exe"

# Re-upload manually
gh release upload v1.0.0 release-assets/AUDIAW-Setup.exe --clobber
```

### Build Failures

**Frontend build fails:**
```powershell
# Clear cache and rebuild
Remove-Item -Recurse -Force node_modules
Remove-Item -Force pnpm-lock.yaml
pnpm install
pnpm run build:frontend
```

**Rust compilation fails:**
```powershell
# Update Rust and clean build
rustup update
cd src-tauri
cargo clean
cargo check
```

**Tauri build fails:**
```powershell
# Update Tauri CLI
cargo install tauri-cli --force

# Verify configuration
cargo tauri info

# Try building with verbose output
cargo tauri build --verbose
```

### Signing Errors

**Certificate not found:**
```powershell
# List installed certificates
Get-ChildItem -Path Cert:\CurrentUser\My -CodeSigningCert

# Verify thumbprint is correct
$env:TAURI_WINDOWS_SIGN_THUMBPRINT

# Re-import certificate if needed
Import-PfxCertificate -FilePath "certificate.pfx" -CertStoreLocation Cert:\CurrentUser\My
```

**Timestamp server timeout:**
```powershell
# Try alternative timestamp server
$env:TAURI_WINDOWS_TIMESTAMP_URL = "http://timestamp.sectigo.com"
pnpm run build:windows

# Other options:
# http://timestamp.comodoca.com
# http://timestamp.globalsign.com
# http://timestamp.digicert.com
```

**Invalid signature:**
```powershell
# Check certificate validity
$cert = Get-PfxCertificate -FilePath "certificate.pfx"
$cert.NotAfter  # Check expiration

# Verify certificate chain
certutil -verify certificate.pfx
```

### Vercel Deployment Problems

**Deployment fails:**
```powershell
# Check Vercel logs
vercel logs audiaw-marketing

# Try deploying with verbose output
cd audiaw-marketing
vercel --prod --debug
```

**Environment variables not set:**
1. Go to Vercel Dashboard
2. Select project → Settings → Environment Variables
3. Add required variables
4. Redeploy

### Download Link Issues

**404 on download link:**
```powershell
# Verify release exists
gh release view v1.0.0

# Check asset names
gh release view v1.0.0 --json assets

# Verify URL format (must include 'v' prefix)
# Correct: /releases/download/v1.0.0/AUDIAW-Setup.exe
# Wrong: /releases/download/1.0.0/AUDIAW-Setup.exe
```

**Download starts but file is corrupted:**
```powershell
# Verify file integrity on GitHub
gh release download v1.0.0 --pattern "AUDIAW-Setup.exe"
$hash = Get-FileHash -Algorithm SHA256 "AUDIAW-Setup.exe"
Write-Host $hash.Hash

# Compare with expected checksum
Get-Content "AUDIAW-Setup.exe.sha256"

# If mismatch, re-upload
gh release upload v1.0.0 AUDIAW-Setup.exe --clobber
```

---

## Success Criteria

A successful release includes:

- ✅ All version numbers updated and matching
- ✅ Changelog and release notes complete
- ✅ All tests passing
- ✅ Installer builds successfully
- ✅ Installer tested on clean Windows
- ✅ Code signed (if certificate available)
- ✅ GitHub release created with assets
- ✅ Download links working
- ✅ Website updated (if needed)
- ✅ Post-release verification complete
- ✅ No critical issues reported

---

## Quick Reference

### Essential Commands

```powershell
# Build
pnpm run build:windows

# Find certificate
Get-ChildItem -Path Cert:\CurrentUser\My -CodeSigningCert

# Calculate checksum
Get-FileHash -Algorithm SHA256 "AUDIAW-Setup.exe"

# Verify signature
signtool verify /pa "AUDIAW-Setup.exe"

# Create release
gh release create v1.0.0 --title "AUDIAW v1.0.0" --notes-file RELEASE_NOTES.md release-assets/*

# Deploy website
cd audiaw-marketing && git push origin main
```

### File Locations

```
Project Root
├── AUDIAW-Setup.exe                    (Final installer)
├── src-tauri/
│   ├── tauri.conf.json                 (Configuration)
│   └── target/release/bundle/nsis/     (Build output)
├── release-assets/                     (Release files)
├── audiaw-marketing/                   (Website)
└── scripts/                            (Build scripts)
```

### Important URLs

- **Releases:** https://github.com/aloof-garage/AUDIAW/releases
- **Latest download:** https://github.com/aloof-garage/AUDIAW/releases/latest/download/AUDIAW-Setup.exe
- **Timestamp servers:**
  - http://timestamp.digicert.com
  - http://timestamp.sectigo.com
  - http://timestamp.globalsign.com

---

## Getting Help

**Resources:**
- [WINDOWS_RELEASE_GUIDE.md](WINDOWS_RELEASE_GUIDE.md) - Detailed Windows guide
- [CODE_SIGNING_SETUP.md](CODE_SIGNING_SETUP.md) - Signing setup
- [BUILD_TEST_REPORT.md](BUILD_TEST_REPORT.md) - Build testing
- GitHub Issues - Report problems
- GitHub Discussions - Ask questions

---

**Last Updated:** 2026-05-18  
**AUDIAW Version:** 1.0.0  
**Guide Version:** 1.0.0
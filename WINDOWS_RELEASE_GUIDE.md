# Windows Release Guide for AUDIAW

This guide explains how to build, sign, and release AUDIAW for Windows in simple, easy-to-understand terms. Whether you're new to software distribution or an experienced developer, this guide will walk you through every step.

---

## Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Building Windows Releases](#building-windows-releases)
4. [Understanding SmartScreen Warnings](#understanding-smartscreen-warnings)
5. [Code Signing Certificates](#code-signing-certificates)
6. [Signing Your Release](#signing-your-release)
7. [Publishing GitHub Releases](#publishing-github-releases)
8. [Deploying Downloads](#deploying-downloads)
9. [Troubleshooting](#troubleshooting)
10. [Best Practices](#best-practices)

---

## Overview

### What is a Windows Release?

A Windows release is a packaged version of AUDIAW that users can download and install on their computers. For AUDIAW, we create an **NSIS installer** (`.exe` file) that:

- Installs the application to the user's computer
- Creates desktop shortcuts
- Adds the app to the Start Menu
- Can be uninstalled cleanly

### The Release Process (Simple Version)

1. **Build** → Create the installer file
2. **Sign** → Add a digital signature (proves it's from you)
3. **Test** → Make sure it works
4. **Publish** → Upload to GitHub Releases
5. **Deploy** → Make it available on your website

---

## Prerequisites

### Required Software

Before you can build Windows releases, you need:

1. **Node.js** (v18 or later)
   - Download from: https://nodejs.org/
   - Check version: `node --version`

2. **pnpm** (Package manager)
   - Install: `npm install -g pnpm`
   - Check version: `pnpm --version`

3. **Rust** (Programming language)
   - Download from: https://rustup.rs/
   - Check version: `rustc --version`

4. **Tauri CLI** (Build tool)
   - Install: `cargo install tauri-cli`
   - Check version: `cargo tauri --version`

5. **Visual Studio Build Tools** (Windows only)
   - Download from: https://visualstudio.microsoft.com/downloads/
   - Install "Desktop development with C++" workload

### Verify Your Setup

Run these commands to make sure everything is installed:

```powershell
node --version
pnpm --version
rustc --version
cargo tauri --version
```

If all commands work, you're ready to build!

---

## Building Windows Releases

### Step 1: Prepare Your Project

1. **Open PowerShell** in your project directory
2. **Install dependencies**:
   ```powershell
   pnpm install
   ```

3. **Verify the build script** exists:
   ```powershell
   Get-Content .\scripts\build-windows.ps1
   ```

### Step 2: Build the Release

Run the build script:

```powershell
.\scripts\build-windows.ps1
```

**What this does:**
- Compiles the Rust backend
- Builds the React frontend
- Creates the NSIS installer
- Packages everything into `AUDIAW-Setup.exe`

**Build time:** Usually 5-15 minutes (first build takes longer)

### Step 3: Find Your Installer

After building, your installer will be at:

```
src-tauri\target\release\bundle\nsis\AUDIAW_1.0.0_x64-setup.exe
```

**File size:** Approximately 50-80 MB

### Step 4: Test the Installer

**IMPORTANT:** Always test before releasing!

1. **Copy the installer** to a test location
2. **Run it** and install AUDIAW
3. **Launch the app** and verify it works
4. **Check these things:**
   - App opens without errors
   - Audio playback works
   - All features function correctly
   - Desktop shortcut was created
   - Start Menu entry exists

5. **Uninstall** and verify clean removal

---

## Understanding SmartScreen Warnings

### What is SmartScreen?

Windows SmartScreen is a security feature that warns users about unknown software. When users download your installer, they might see:

> **"Windows protected your PC"**
> 
> Windows Defender SmartScreen prevented an unrecognized app from starting.

### Why Does This Happen?

SmartScreen shows warnings for software that:

1. **Isn't digitally signed** (no code signing certificate)
2. **Hasn't been downloaded much** (new or unpopular software)
3. **Comes from an unknown publisher** (not a recognized company)

### Is This Bad?

**No!** This is normal for new software. Even legitimate applications get these warnings initially.

### How Users Can Install Anyway

Users can bypass the warning by:

1. Click **"More info"**
2. Click **"Run anyway"**

### How to Reduce Warnings

The **only reliable way** to eliminate SmartScreen warnings is:

1. **Get a code signing certificate** (see next section)
2. **Sign your installer** with the certificate
3. **Build reputation** over time (more downloads = fewer warnings)

**Important:** Even with a certificate, new software may still show warnings until it builds reputation with Microsoft.

---

## Code Signing Certificates

### What is Code Signing?

Code signing is like a digital seal that proves:

- **Who made the software** (your identity)
- **The software hasn't been tampered with** (integrity)

### Why You Need It

1. **Reduces SmartScreen warnings** (but doesn't eliminate them immediately)
2. **Builds trust** with users
3. **Proves authenticity** of your software
4. **Required for reputation building** with Microsoft

### Types of Certificates

#### 1. Standard Code Signing Certificate

- **Cost:** $100-$400 per year
- **Validation:** Email and phone verification
- **Delivery:** Digital file (`.pfx` or `.p12`)
- **SmartScreen:** Warnings reduced after reputation builds

**Providers:**
- Sectigo (formerly Comodo)
- DigiCert
- GlobalSign
- SSL.com

#### 2. Extended Validation (EV) Certificate

- **Cost:** $300-$600 per year
- **Validation:** Extensive business verification
- **Delivery:** USB hardware token (physical device)
- **SmartScreen:** Immediate reputation (no warnings)

**Recommended for:** Serious commercial software

### How to Obtain a Certificate

#### Step 1: Choose a Provider

Research and compare:
- **Price** (annual cost)
- **Validation time** (how long to get approved)
- **Support** (help when you need it)
- **Reputation** (trusted by Windows)

#### Step 2: Purchase and Validate

1. **Buy the certificate** from your chosen provider
2. **Complete validation:**
   - Provide business documents (if EV)
   - Verify email and phone
   - Wait for approval (1-7 days)

#### Step 3: Download Certificate

For standard certificates:
- Download the `.pfx` or `.p12` file
- **Save the password** securely
- **Back up the file** (you'll need it!)

For EV certificates:
- Receive USB token by mail
- Install driver software
- Set up PIN code

### Certificate Storage

**CRITICAL SECURITY RULES:**

1. **Never commit certificates to Git**
2. **Store in a secure location** (encrypted drive)
3. **Back up securely** (encrypted backup)
4. **Protect the password** (use a password manager)
5. **Limit access** (only authorized people)

**Recommended storage locations:**
```
C:\Certificates\audiaw-codesign.pfx  (Local, secure folder)
```

**Never store here:**
- Project directory
- Cloud storage (unless encrypted)
- Shared network drives
- Version control (Git)

---

## Signing Your Release

### Prerequisites for Signing

Before you can sign, you need:

1. ✅ Code signing certificate (`.pfx` file or USB token)
2. ✅ Certificate password
3. ✅ Built installer file (`AUDIAW-Setup.exe`)

### Method 1: Automatic Signing (Recommended)

AUDIAW is configured to sign automatically during the build process if you set up environment variables.

#### Step 1: Set Environment Variables

**Option A: PowerShell (Temporary - Current Session)**

```powershell
# Set certificate thumbprint
$env:TAURI_WINDOWS_SIGN_THUMBPRINT = "YOUR_CERTIFICATE_THUMBPRINT_HERE"

# Set timestamp server
$env:TAURI_WINDOWS_TIMESTAMP_URL = "http://timestamp.digicert.com"

# Build with signing
.\scripts\build-windows.ps1
```

**Option B: System Environment Variables (Permanent)**

1. Open **System Properties** → **Environment Variables**
2. Under **User variables**, click **New**
3. Add these variables:

| Variable Name | Value |
|---------------|-------|
| `TAURI_WINDOWS_SIGN_THUMBPRINT` | Your certificate thumbprint |
| `TAURI_WINDOWS_TIMESTAMP_URL` | `http://timestamp.digicert.com` |

4. **Restart PowerShell** to load new variables
5. Run build script: `.\scripts\build-windows.ps1`

#### Step 2: Find Your Certificate Thumbprint

**If you have a .pfx file:**

```powershell
# Import certificate to view details (temporary)
$cert = Get-PfxCertificate -FilePath "C:\path\to\your\certificate.pfx"
$cert.Thumbprint
```

**If certificate is installed in Windows:**

```powershell
# List all code signing certificates
Get-ChildItem -Path Cert:\CurrentUser\My -CodeSigningCert | Format-List Subject, Thumbprint
```

The thumbprint looks like: `A1B2C3D4E5F6G7H8I9J0K1L2M3N4O5P6Q7R8S9T0`

### Method 2: Manual Signing (After Build)

If automatic signing doesn't work, you can sign manually using `signtool.exe`.

#### Step 1: Locate signtool.exe

Find it in Windows SDK:

```powershell
# Common locations:
C:\Program Files (x86)\Windows Kits\10\bin\10.0.22621.0\x64\signtool.exe
C:\Program Files (x86)\Windows Kits\10\bin\10.0.19041.0\x64\signtool.exe
```

Or search:

```powershell
Get-ChildItem -Path "C:\Program Files (x86)\Windows Kits" -Recurse -Filter "signtool.exe" | Select-Object FullName
```

#### Step 2: Sign the Installer

**Using .pfx file:**

```powershell
& "C:\Program Files (x86)\Windows Kits\10\bin\10.0.22621.0\x64\signtool.exe" sign `
  /f "C:\path\to\certificate.pfx" `
  /p "YOUR_PASSWORD" `
  /tr "http://timestamp.digicert.com" `
  /td SHA256 `
  /fd SHA256 `
  "src-tauri\target\release\bundle\nsis\AUDIAW_1.0.0_x64-setup.exe"
```

**Using installed certificate (by thumbprint):**

```powershell
& "C:\Program Files (x86)\Windows Kits\10\bin\10.0.22621.0\x64\signtool.exe" sign `
  /sha1 "YOUR_THUMBPRINT" `
  /tr "http://timestamp.digicert.com" `
  /td SHA256 `
  /fd SHA256 `
  "src-tauri\target\release\bundle\nsis\AUDIAW_1.0.0_x64-setup.exe"
```

**Parameters explained:**
- `/f` - Certificate file path
- `/p` - Certificate password
- `/sha1` - Certificate thumbprint
- `/tr` - Timestamp server URL
- `/td` - Timestamp digest algorithm
- `/fd` - File digest algorithm

#### Step 3: Verify Signature

Check if signing worked:

```powershell
& "C:\Program Files (x86)\Windows Kits\10\bin\10.0.22621.0\x64\signtool.exe" verify /pa "src-tauri\target\release\bundle\nsis\AUDIAW_1.0.0_x64-setup.exe"
```

**Expected output:**
```
Successfully verified: AUDIAW_1.0.0_x64-setup.exe
```

### Timestamp Servers

Timestamp servers prove when your software was signed. This is important because:

- Signatures remain valid even after certificate expires
- Users can verify signing time
- Required for long-term trust

**Recommended timestamp servers:**

| Provider | URL |
|----------|-----|
| DigiCert | `http://timestamp.digicert.com` |
| Sectigo | `http://timestamp.sectigo.com` |
| GlobalSign | `http://timestamp.globalsign.com` |

**Always use a timestamp server** when signing!

---

## Publishing GitHub Releases

### Step 1: Prepare Release Assets

1. **Rename your installer** for clarity:
   ```powershell
   Copy-Item "src-tauri\target\release\bundle\nsis\AUDIAW_1.0.0_x64-setup.exe" "AUDIAW-Setup.exe"
   ```

2. **Calculate checksums** (for verification):
   ```powershell
   Get-FileHash -Algorithm SHA256 "AUDIAW-Setup.exe" | Format-List
   ```

3. **Create a checksums file**:
   ```powershell
   Get-FileHash -Algorithm SHA256 "AUDIAW-Setup.exe" | Select-Object Hash, @{Name="File";Expression={"AUDIAW-Setup.exe"}} | ConvertTo-Json | Out-File "AUDIAW-Setup.exe.sha256"
   ```

### Step 2: Create Release Notes

Create a file `RELEASE_NOTES.md` with:

```markdown
# AUDIAW v1.0.0

## What's New

- Feature 1: Description
- Feature 2: Description
- Bug fix: Description

## Installation

1. Download `AUDIAW-Setup.exe`
2. Run the installer
3. Follow the setup wizard

## Known Issues

- Issue 1: Description and workaround
- Issue 2: Description and workaround

## System Requirements

- Windows 10 or later (64-bit)
- 4 GB RAM minimum
- 500 MB disk space

## Checksums

SHA256: [paste checksum here]
```

### Step 3: Create GitHub Release

1. **Go to your repository** on GitHub
2. **Click "Releases"** → **"Draft a new release"**
3. **Fill in the details:**

   - **Tag version:** `v1.0.0`
   - **Release title:** `AUDIAW v1.0.0 - [Release Name]`
   - **Description:** Paste your release notes
   - **Attach files:**
     - `AUDIAW-Setup.exe` (the installer)
     - `AUDIAW-Setup.exe.sha256` (checksums)

4. **Choose release type:**
   - ✅ **Latest release** (for stable versions)
   - ⬜ **Pre-release** (for beta/alpha versions)

5. **Click "Publish release"**

### Step 4: Verify Release

After publishing:

1. **Download the installer** from GitHub
2. **Verify checksum** matches
3. **Test installation** on a clean system
4. **Check download link** works

---

## Deploying Downloads

### Option 1: GitHub Releases (Recommended)

**Pros:**
- Free hosting
- Automatic CDN
- Version history
- Easy to manage

**Cons:**
- Requires GitHub account to download (for private repos)
- Rate limits for API access

**How to link:**

```markdown
[Download AUDIAW for Windows](https://github.com/yourusername/audiaw/releases/latest/download/AUDIAW-Setup.exe)
```

### Option 2: Website Hosting

Host the installer on your website for direct downloads.

#### Setup for Next.js (audiaw-marketing)

1. **Copy installer** to public directory:
   ```powershell
   Copy-Item "AUDIAW-Setup.exe" "audiaw-marketing\public\downloads\AUDIAW-Setup.exe"
   ```

2. **Update download page** (`audiaw-marketing/app/download/page.tsx`):
   ```tsx
   <a href="/downloads/AUDIAW-Setup.exe" download>
     Download AUDIAW for Windows
   </a>
   ```

3. **Add checksums** for verification:
   ```tsx
   <p>SHA256: {checksum}</p>
   ```

#### Security Considerations

1. **Use HTTPS** (required for downloads)
2. **Provide checksums** (let users verify)
3. **Sign your installer** (reduces warnings)
4. **Monitor downloads** (detect issues early)

### Option 3: CDN Distribution

For high-traffic releases, use a CDN:

**Popular CDNs:**
- Cloudflare R2
- AWS S3 + CloudFront
- Azure Blob Storage + CDN
- DigitalOcean Spaces

**Benefits:**
- Fast global downloads
- Reduced server load
- Better reliability
- Analytics

---

## Troubleshooting

### Build Issues

#### Problem: "Rust not found"

**Solution:**
```powershell
# Install Rust
winget install Rustlang.Rustup
# Or download from: https://rustup.rs/
```

#### Problem: "MSVC build tools not found"

**Solution:**
1. Install Visual Studio Build Tools
2. Select "Desktop development with C++"
3. Restart PowerShell

#### Problem: "Out of memory during build"

**Solution:**
```powershell
# Increase Node.js memory limit
$env:NODE_OPTIONS="--max-old-space-size=4096"
.\scripts\build-windows.ps1
```

#### Problem: "Build fails with 'permission denied'"

**Solution:**
```powershell
# Close AUDIAW if running
# Delete target directory
Remove-Item -Recurse -Force src-tauri\target
# Rebuild
.\scripts\build-windows.ps1
```

### Signing Issues

#### Problem: "Certificate not found"

**Solution:**
1. Verify certificate path is correct
2. Check certificate is installed (for thumbprint method)
3. Ensure certificate hasn't expired

#### Problem: "Invalid password"

**Solution:**
- Double-check password (case-sensitive)
- Try entering password manually (avoid copy-paste)
- Verify certificate file isn't corrupted

#### Problem: "Timestamp server unavailable"

**Solution:**
```powershell
# Try alternative timestamp server
$env:TAURI_WINDOWS_TIMESTAMP_URL = "http://timestamp.sectigo.com"
```

#### Problem: "Signature verification fails"

**Solution:**
1. Check certificate is valid for code signing
2. Ensure certificate chain is complete
3. Verify timestamp server responded
4. Try signing again

### SmartScreen Issues

#### Problem: "Still getting warnings after signing"

**Explanation:**
- New certificates need to build reputation
- Takes time and downloads to establish trust
- Even signed software may show warnings initially

**Solutions:**
1. **Be patient** - Reputation builds over time
2. **Get more downloads** - More users = better reputation
3. **Consider EV certificate** - Immediate reputation
4. **Submit to Microsoft** - Request reputation review

#### Problem: "Users can't install"

**Solution:**
Provide clear instructions:

```markdown
## How to Install

If you see a SmartScreen warning:

1. Click "More info"
2. Click "Run anyway"
3. Follow the installer

This is normal for new software. AUDIAW is safe and open-source.
```

### Installation Issues

#### Problem: "Installer won't run"

**Checklist:**
- ✅ Windows 10 or later?
- ✅ 64-bit system?
- ✅ Antivirus disabled temporarily?
- ✅ Downloaded completely (check file size)?
- ✅ Checksum matches?

#### Problem: "App won't launch after install"

**Solution:**
1. Check Windows Event Viewer for errors
2. Verify WebView2 is installed
3. Try running as administrator
4. Check antivirus logs

---

## Best Practices

### Before Every Release

**Checklist:**

- [ ] Update version number in `tauri.conf.json`
- [ ] Update version in `Cargo.toml`
- [ ] Update version in `package.json`
- [ ] Write release notes
- [ ] Test on clean Windows installation
- [ ] Verify all features work
- [ ] Check for memory leaks
- [ ] Scan for security issues
- [ ] Build release version
- [ ] Sign the installer
- [ ] Verify signature
- [ ] Calculate checksums
- [ ] Test installer on multiple Windows versions
- [ ] Create GitHub release
- [ ] Update website download links
- [ ] Announce release

### Security Best Practices

1. **Certificate Security:**
   - Store certificates securely
   - Use strong passwords
   - Never commit to Git
   - Rotate certificates before expiry
   - Limit access to authorized personnel

2. **Build Security:**
   - Build on clean, trusted systems
   - Verify dependencies
   - Scan for malware
   - Use official build tools
   - Keep build environment updated

3. **Distribution Security:**
   - Use HTTPS for downloads
   - Provide checksums
   - Sign all releases
   - Monitor for tampering
   - Respond quickly to security issues

### Quality Assurance

1. **Test on Multiple Systems:**
   - Windows 10 (various builds)
   - Windows 11
   - Different hardware configurations
   - Virtual machines
   - Clean installations

2. **Test Scenarios:**
   - Fresh install
   - Upgrade from previous version
   - Uninstall and reinstall
   - Multiple user accounts
   - Limited user permissions

3. **Performance Testing:**
   - Startup time
   - Memory usage
   - CPU usage
   - Disk I/O
   - Audio latency

### Version Management

**Semantic Versioning (SemVer):**

```
MAJOR.MINOR.PATCH
  1  .  0  .  0
```

- **MAJOR:** Breaking changes (1.0.0 → 2.0.0)
- **MINOR:** New features (1.0.0 → 1.1.0)
- **PATCH:** Bug fixes (1.0.0 → 1.0.1)

**Pre-release versions:**
- Alpha: `1.0.0-alpha.1`
- Beta: `1.0.0-beta.1`
- Release Candidate: `1.0.0-rc.1`

### Documentation

Keep these documents updated:

1. **CHANGELOG.md** - All changes between versions
2. **RELEASE_NOTES.md** - User-facing changes
3. **README.md** - Installation instructions
4. **This guide** - Process improvements

### Communication

**When releasing:**

1. **Announce on:**
   - GitHub Releases
   - Website/blog
   - Social media
   - Email newsletter
   - Discord/community

2. **Include:**
   - What's new
   - How to upgrade
   - Known issues
   - Where to get help

3. **Be responsive:**
   - Monitor feedback
   - Fix critical bugs quickly
   - Update documentation
   - Thank contributors

---

## Quick Reference

### Essential Commands

```powershell
# Build release
.\scripts\build-windows.ps1

# Find certificate thumbprint
Get-ChildItem -Path Cert:\CurrentUser\My -CodeSigningCert | Format-List Thumbprint

# Calculate checksum
Get-FileHash -Algorithm SHA256 "AUDIAW-Setup.exe"

# Verify signature
signtool verify /pa "AUDIAW-Setup.exe"

# Set environment variables (temporary)
$env:TAURI_WINDOWS_SIGN_THUMBPRINT = "YOUR_THUMBPRINT"
$env:TAURI_WINDOWS_TIMESTAMP_URL = "http://timestamp.digicert.com"
```

### File Locations

```
Project Root
├── AUDIAW-Setup.exe                    (Final installer)
├── src-tauri/
│   ├── tauri.conf.json                 (Configuration)
│   └── target/release/bundle/nsis/     (Build output)
├── scripts/
│   └── build-windows.ps1               (Build script)
└── audiaw-marketing/public/downloads/  (Website hosting)
```

### Important URLs

- **Rust:** https://rustup.rs/
- **Node.js:** https://nodejs.org/
- **Tauri:** https://tauri.app/
- **DigiCert Timestamp:** http://timestamp.digicert.com
- **Sectigo Timestamp:** http://timestamp.sectigo.com

---

## Getting Help

### Resources

- **Tauri Documentation:** https://tauri.app/v1/guides/
- **NSIS Documentation:** https://nsis.sourceforge.io/Docs/
- **Code Signing Guide:** https://docs.microsoft.com/en-us/windows/win32/seccrypto/cryptography-tools

### Community

- **GitHub Issues:** Report bugs and request features
- **Discussions:** Ask questions and share ideas
- **Discord:** Real-time community support

### Support

If you encounter issues:

1. **Check this guide** - Most answers are here
2. **Search GitHub Issues** - Someone may have had the same problem
3. **Ask the community** - Discord or Discussions
4. **Create an issue** - If it's a bug or feature request

---

## Conclusion

Building and releasing Windows software can seem complex, but by following this guide step-by-step, you'll be able to:

✅ Build professional Windows installers
✅ Understand and reduce SmartScreen warnings
✅ Obtain and use code signing certificates
✅ Sign your releases properly
✅ Publish releases on GitHub
✅ Deploy downloads safely
✅ Troubleshoot common issues
✅ Follow best practices

**Remember:** Every professional software company started with their first release. Take it one step at a time, test thoroughly, and don't hesitate to ask for help.

**Good luck with your releases!** 🚀

---

*Last updated: 2026-05-18*
*AUDIAW Version: 1.0.0*
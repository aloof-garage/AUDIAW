# AUDIAW Windows Signing and Release Guide

**Complete End-to-End Guide for Windows Releases**

This guide covers everything from understanding SmartScreen warnings to publishing signed releases and updating the website.

---

## Table of Contents

1. [Why SmartScreen Warnings Happen](#1-why-smartscreen-warnings-happen)
2. [Understanding Code Signing](#2-understanding-code-signing)
3. [How to Obtain a Code Signing Certificate](#3-how-to-obtain-a-code-signing-certificate)
4. [Configuring Code Signing for AUDIAW](#4-configuring-code-signing-for-audiaw)
5. [Building Signed Windows Releases](#5-building-signed-windows-releases)
6. [Publishing GitHub Releases](#6-publishing-github-releases)
7. [Updating the Website Download Link](#7-updating-the-website-download-link)
8. [Building Without a Certificate](#8-building-without-a-certificate)
9. [Troubleshooting](#9-troubleshooting)
10. [Best Practices](#10-best-practices)

---

## 1. Why SmartScreen Warnings Happen

### The Reality of Unsigned Software

When users download and run AUDIAW without code signing, they see warnings like:

```
Windows protected your PC
Microsoft Defender SmartScreen prevented an unrecognized app from starting.
Running this app might put your PC at risk.

Publisher: Unknown Publisher
```

**This is completely normal for unsigned software.** Here's why:

### How SmartScreen Works

Microsoft SmartScreen uses **reputation-based protection**:

1. **Unknown Publisher** - No code signing certificate = no verified identity
2. **Low Download Count** - New or rarely downloaded files trigger warnings
3. **No Reputation History** - Microsoft hasn't seen this file enough times to trust it

### Unsigned ≠ Malicious

**Important distinction:**

| Unsigned Software | Malicious Software |
|------------------|-------------------|
| ✅ No verified publisher | ❌ Intentionally harmful |
| ✅ Legitimate but new | ❌ Viruses, trojans, ransomware |
| ✅ Common for indie/open-source | ❌ Detected by antivirus |
| ✅ Safe to use (if from trusted source) | ❌ Never safe to use |

**AUDIAW is unsigned, not malicious.** The warning is about identity verification, not security threats.

### Why This Matters for Indie/Open-Source Projects

- **Cost Barrier** - Code signing certificates cost $100-500/year
- **Identity Verification** - Requires business verification (takes days)
- **Reputation Building** - Even signed apps need time to build trust
- **Common Practice** - Many legitimate indie apps start unsigned

### User Experience Impact

**Without signing:**
- ❌ Scary warning messages
- ❌ Extra clicks to install ("More info" → "Run anyway")
- ❌ Some users won't install (trust issues)
- ❌ Chrome may block downloads
- ❌ Corporate networks may block

**With signing:**
- ✅ Clean installation experience
- ✅ Verified publisher identity
- ✅ Professional appearance
- ✅ Higher download conversion
- ✅ Enterprise-ready

---

## 2. Understanding Code Signing

### What is Code Signing?

Code signing is a **digital signature** that proves:

1. **Identity** - Who created the software
2. **Integrity** - The software hasn't been tampered with
3. **Authenticity** - The software is from the claimed publisher

### How It Works

```
Your Software → Sign with Certificate → Timestamped Signature → Verified by Windows
```

**Key Components:**

1. **Certificate** - Your digital identity (like a passport)
2. **Private Key** - Used to sign (keep secret!)
3. **Public Key** - Used to verify (embedded in certificate)
4. **Timestamp** - Proves when signing occurred

### Why Timestamps Matter

Timestamps ensure signatures remain valid **after the certificate expires**:

- ✅ Signed on Jan 1, 2026 with 1-year cert
- ✅ Certificate expires Jan 1, 2027
- ✅ Signature still valid in 2030 (timestamp proves it was signed when cert was valid)

**Without timestamp:** Signature becomes invalid when certificate expires.

### Types of Certificates

#### Standard Code Signing Certificate

**Cost:** $100-200/year  
**Delivery:** Digital file (.pfx or .p12)  
**Reputation:** Must build over time (2-4 weeks)  
**Best For:** Open-source projects, indie developers

**Pros:**
- ✅ Lower cost
- ✅ Easy to use in CI/CD
- ✅ Good for budget-conscious projects

**Cons:**
- ❌ SmartScreen warnings initially
- ❌ Requires reputation building
- ❌ 2-4 weeks until warnings disappear

#### Extended Validation (EV) Certificate

**Cost:** $300-500/year  
**Delivery:** USB hardware token  
**Reputation:** Instant (no waiting period)  
**Best For:** Commercial software, professional releases

**Pros:**
- ✅ **Instant SmartScreen reputation**
- ✅ Highest trust level
- ✅ No reputation building needed
- ✅ Best user experience

**Cons:**
- ❌ Higher cost
- ❌ Requires USB token (hardware)
- ❌ More complex CI/CD setup
- ❌ Business verification required

### Cost Expectations

| Certificate Type | Annual Cost | Setup Time | Reputation Time |
|-----------------|-------------|------------|-----------------|
| Standard | $100-200 | 1-3 days | 2-4 weeks |
| EV | $300-500 | 2-5 days | Instant |
| Self-Signed | Free | 5 minutes | Never |

**Recommendation:** Start with Standard, upgrade to EV if budget allows.

---

## 3. How to Obtain a Code Signing Certificate

### Step 1: Choose a Certificate Provider

#### Recommended Providers

**DigiCert** (Most Reliable)
- Website: https://www.digicert.com/signing/code-signing-certificates
- Standard: ~$474/year
- EV: ~$474/year
- Reputation: Excellent
- Support: Best in class

**Sectigo** (Best Value)
- Website: https://sectigo.com/ssl-certificates-tls/code-signing
- Standard: ~$179/year
- EV: ~$349/year
- Reputation: Very good
- Support: Good

**SSL.com** (Budget Option)
- Website: https://www.ssl.com/certificates/code-signing/
- Standard: ~$199/year
- EV: ~$299/year
- Reputation: Good
- Support: Adequate

### Step 2: Purchase Process

#### For Standard Certificate:

1. **Select Certificate Type**
   - Choose "Windows Code Signing Certificate"
   - Select 1-year or multi-year term
   - Add to cart

2. **Create Account**
   - Provide business/personal information
   - Email address (for verification)
   - Phone number

3. **Complete Payment**
   - Credit card or PayPal
   - Prices vary by provider

4. **Identity Verification**
   - **Business:** DUNS number, business registration
   - **Individual:** Government ID, address verification
   - **Timeline:** 1-3 business days

5. **Receive Certificate**
   - Download .pfx file
   - Save password securely
   - Store in encrypted location

#### For EV Certificate:

1. **Select EV Certificate**
   - Choose "Extended Validation Code Signing"
   - Select term length

2. **Business Verification**
   - DUNS number required
   - Business registration documents
   - Phone verification
   - Physical address verification

3. **Order USB Token**
   - SafeNet or YubiKey token
   - Shipped to verified business address
   - **Timeline:** 2-5 business days

4. **Install Token**
   - Install manufacturer's drivers
   - Insert token
   - Certificate appears in Windows Certificate Store

### Step 3: Identity Verification Requirements

#### For Individuals:

- ✅ Government-issued photo ID (passport, driver's license)
- ✅ Proof of address (utility bill, bank statement)
- ✅ Phone verification call
- ✅ Email verification

#### For Businesses:

- ✅ Business registration documents
- ✅ DUNS number (get free from Dun & Bradstreet)
- ✅ Business phone verification
- ✅ Physical business address
- ✅ Authorized representative verification

### Step 4: Timeline Expectations

| Stage | Standard Cert | EV Cert |
|-------|--------------|---------|
| Purchase | Instant | Instant |
| Verification | 1-3 days | 2-5 days |
| Certificate Delivery | Instant (download) | 3-7 days (shipping) |
| **Total Time** | **1-3 days** | **5-12 days** |

### EV vs Standard: Decision Matrix

**Choose Standard if:**
- ✅ Budget under $200/year
- ✅ Can wait 2-4 weeks for reputation
- ✅ Open-source or indie project
- ✅ Need easy CI/CD integration

**Choose EV if:**
- ✅ Budget allows $300-500/year
- ✅ Need instant reputation
- ✅ Commercial/professional software
- ✅ Want highest trust level
- ✅ Enterprise customers

---

## 4. Configuring Code Signing for AUDIAW

AUDIAW uses **environment variables** for code signing configuration. This keeps credentials secure and out of version control.

### Option A: Standard Certificate (.pfx file)

#### Step 1: Store Certificate Securely

```powershell
# Create secure directory
New-Item -Path "$env:USERPROFILE\.certificates" -ItemType Directory -Force

# Copy certificate (replace with your actual path)
Copy-Item "C:\Downloads\audiaw-cert.pfx" "$env:USERPROFILE\.certificates\audiaw-cert.pfx"

# Set restrictive permissions (Windows)
icacls "$env:USERPROFILE\.certificates\audiaw-cert.pfx" /inheritance:r /grant:r "$env:USERNAME:(R)"
```

#### Step 2: Set Environment Variables (Temporary)

For current PowerShell session only:

```powershell
# Set certificate path
$env:WINDOWS_CERTIFICATE_FILE = "$env:USERPROFILE\.certificates\audiaw-cert.pfx"

# Set certificate password
$env:WINDOWS_CERTIFICATE_PASSWORD = "your-certificate-password"

# Verify variables are set
Write-Host "Certificate: $env:WINDOWS_CERTIFICATE_FILE"
Write-Host "Password: [HIDDEN]"
```

#### Step 3: Set Environment Variables (Permanent)

For all future sessions:

```powershell
# Set permanently for user
[System.Environment]::SetEnvironmentVariable(
    'WINDOWS_CERTIFICATE_FILE',
    "$env:USERPROFILE\.certificates\audiaw-cert.pfx",
    'User'
)

[System.Environment]::SetEnvironmentVariable(
    'WINDOWS_CERTIFICATE_PASSWORD',
    'your-certificate-password',
    'User'
)

# Restart PowerShell to load new variables
```

**Using Windows GUI:**

1. Press `Win + X` → "System"
2. Click "Advanced system settings"
3. Click "Environment Variables"
4. Under "User variables", click "New"
5. Add variables:
   - Name: `WINDOWS_CERTIFICATE_FILE`
   - Value: `C:\Users\YourName\.certificates\audiaw-cert.pfx`
6. Repeat for `WINDOWS_CERTIFICATE_PASSWORD`
7. Click "OK" and restart PowerShell

### Option B: EV Certificate (USB Token)

#### Step 1: Install Token Drivers

```powershell
# Download and install SafeNet drivers
# URL: https://support.globalsign.com/ssl/ssl-certificates-installation/safenet-drivers

# Or for YubiKey
# URL: https://www.yubico.com/support/download/
```

#### Step 2: Find Certificate Thumbprint

```powershell
# Insert USB token

# List all code signing certificates
Get-ChildItem -Path Cert:\CurrentUser\My -CodeSigningCert | Format-List Subject, Thumbprint, NotAfter

# Copy the thumbprint (40-character hex string)
```

#### Step 3: Set Environment Variable

```powershell
# Temporary (current session)
$env:WINDOWS_CERTIFICATE_THUMBPRINT = "A1B2C3D4E5F6G7H8I9J0K1L2M3N4O5P6Q7R8S9T0"

# Permanent (all sessions)
[System.Environment]::SetEnvironmentVariable(
    'WINDOWS_CERTIFICATE_THUMBPRINT',
    'A1B2C3D4E5F6G7H8I9J0K1L2M3N4O5P6Q7R8S9T0',
    'User'
)
```

### Local Development Setup

Create a `.env.local` file (add to `.gitignore`):

```env
# DO NOT COMMIT THIS FILE
WINDOWS_CERTIFICATE_FILE=C:/Users/YourName/.certificates/audiaw-cert.pfx
WINDOWS_CERTIFICATE_PASSWORD=your-password
```

**⚠️ WARNING:** Never commit certificate credentials to Git!

### CI/CD Setup (GitHub Actions)

#### Step 1: Encode Certificate to Base64

```powershell
# Read certificate file
$bytes = [System.IO.File]::ReadAllBytes("C:\path\to\audiaw-cert.pfx")

# Convert to base64
$base64 = [System.Convert]::ToBase64String($bytes)

# Copy to clipboard
$base64 | Set-Clipboard

# Now paste into GitHub Secrets
```

#### Step 2: Add GitHub Secrets

1. Go to repository → Settings → Secrets and variables → Actions
2. Click "New repository secret"
3. Add secrets:
   - Name: `WINDOWS_CERTIFICATE_BASE64`
   - Value: [paste base64 string]
4. Add password secret:
   - Name: `WINDOWS_CERTIFICATE_PASSWORD`
   - Value: [your certificate password]

#### Step 3: Update GitHub Actions Workflow

```yaml
name: Release Windows Build

on:
  push:
    tags:
      - 'v*'

jobs:
  build-windows:
    runs-on: windows-latest
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
      
      - name: Install pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 8
      
      - name: Install Rust
        uses: dtolnay/rust-toolchain@stable
      
      - name: Install dependencies
        run: pnpm install
      
      - name: Decode certificate
        run: |
          $cert = [System.Convert]::FromBase64String("${{ secrets.WINDOWS_CERTIFICATE_BASE64 }}")
          [IO.File]::WriteAllBytes("$env:TEMP\cert.pfx", $cert)
      
      - name: Build signed installer
        env:
          WINDOWS_CERTIFICATE_FILE: ${{ env.TEMP }}\cert.pfx
          WINDOWS_CERTIFICATE_PASSWORD: ${{ secrets.WINDOWS_CERTIFICATE_PASSWORD }}
        run: pnpm run build:windows
      
      - name: Verify signature
        run: |
          $installer = Get-ChildItem "src-tauri\target\release\bundle\nsis\*.exe" | Select-Object -First 1
          signtool verify /pa $installer.FullName
      
      - name: Upload artifact
        uses: actions/upload-artifact@v4
        with:
          name: windows-installer
          path: src-tauri/target/release/bundle/nsis/*.exe
      
      - name: Cleanup certificate
        if: always()
        run: Remove-Item "$env:TEMP\cert.pfx" -ErrorAction SilentlyContinue
```

### Verification Script

Run this to verify your setup:

```powershell
# Save as verify-signing-setup.ps1

Write-Host "`n=== AUDIAW Code Signing Setup Verification ===" -ForegroundColor Cyan

# Check certificate file
if ($env:WINDOWS_CERTIFICATE_FILE) {
    Write-Host "`n[✓] Certificate file path set" -ForegroundColor Green
    Write-Host "    Path: $env:WINDOWS_CERTIFICATE_FILE"
    
    if (Test-Path $env:WINDOWS_CERTIFICATE_FILE) {
        Write-Host "[✓] Certificate file exists" -ForegroundColor Green
        
        # Try to read certificate
        try {
            $cert = Get-PfxCertificate -FilePath $env:WINDOWS_CERTIFICATE_FILE -ErrorAction Stop
            Write-Host "[✓] Certificate is readable" -ForegroundColor Green
            Write-Host "    Subject: $($cert.Subject)"
            Write-Host "    Expires: $($cert.NotAfter)"
            
            # Check if expired
            if ($cert.NotAfter -lt (Get-Date)) {
                Write-Host "[✗] Certificate has EXPIRED!" -ForegroundColor Red
            } else {
                $daysLeft = ($cert.NotAfter - (Get-Date)).Days
                Write-Host "[✓] Certificate valid for $daysLeft more days" -ForegroundColor Green
            }
        } catch {
            Write-Host "[✗] Cannot read certificate (wrong password?)" -ForegroundColor Red
        }
    } else {
        Write-Host "[✗] Certificate file NOT found!" -ForegroundColor Red
    }
} elseif ($env:WINDOWS_CERTIFICATE_THUMBPRINT) {
    Write-Host "`n[✓] Certificate thumbprint set" -ForegroundColor Green
    Write-Host "    Thumbprint: $env:WINDOWS_CERTIFICATE_THUMBPRINT"
    
    # Check if certificate exists in store
    $cert = Get-ChildItem -Path Cert:\CurrentUser\My | Where-Object { $_.Thumbprint -eq $env:WINDOWS_CERTIFICATE_THUMBPRINT }
    if ($cert) {
        Write-Host "[✓] Certificate found in Windows Certificate Store" -ForegroundColor Green
        Write-Host "    Subject: $($cert.Subject)"
        Write-Host "    Expires: $($cert.NotAfter)"
    } else {
        Write-Host "[✗] Certificate NOT found in store!" -ForegroundColor Red
    }
} else {
    Write-Host "`n[⚠] No certificate configured" -ForegroundColor Yellow
    Write-Host "    Installer will be unsigned"
}

# Check password
if ($env:WINDOWS_CERTIFICATE_PASSWORD) {
    Write-Host "`n[✓] Certificate password is set" -ForegroundColor Green
} elseif ($env:WINDOWS_CERTIFICATE_FILE) {
    Write-Host "`n[⚠] Certificate password NOT set" -ForegroundColor Yellow
}

# Check signtool
$signtool = Get-Command signtool.exe -ErrorAction SilentlyContinue
if ($signtool) {
    Write-Host "`n[✓] signtool.exe found" -ForegroundColor Green
    Write-Host "    Path: $($signtool.Source)"
} else {
    Write-Host "`n[✗] signtool.exe NOT found" -ForegroundColor Red
    Write-Host "    Install Windows SDK: https://developer.microsoft.com/windows/downloads/windows-sdk/"
}

Write-Host "`n=== Verification Complete ===" -ForegroundColor Cyan
```

---

## 5. Building Signed Windows Releases

### Prerequisites

Before building, ensure:

- ✅ Node.js 18+ installed
- ✅ Rust toolchain installed
- ✅ pnpm installed (`npm install -g pnpm`)
- ✅ Windows SDK installed (for signtool.exe)
- ✅ Certificate configured (environment variables set)

### Build Commands

#### Standard Build (Signed)

```powershell
# Navigate to project directory
cd "d:\AUDIAW PROJECT"

# Verify environment variables
Write-Host "Certificate: $env:WINDOWS_CERTIFICATE_FILE"

# Install dependencies (if needed)
pnpm install

# Build Windows installer (automatically signs if certificate configured)
pnpm run build:windows
```

#### Build Output Location

```
src-tauri/target/release/bundle/nsis/AUDIAW_1.0.0_x64-setup.exe
```

### Verification Steps

#### Step 1: Verify Signature Exists

```powershell
# Find the installer
$installer = Get-ChildItem "src-tauri\target\release\bundle\nsis\*-setup.exe" | Select-Object -First 1

# Verify signature
signtool verify /pa $installer.FullName
```

**Expected output:**
```
Successfully verified: AUDIAW_1.0.0_x64-setup.exe

Number of signatures successfully Verified: 1
Number of warnings: 0
Number of errors: 0
```

#### Step 2: View Signature Details

```powershell
# Detailed signature information
signtool verify /v /pa $installer.FullName
```

**Look for:**
- ✅ Signing Certificate Chain
- ✅ Timestamp information
- ✅ Your publisher name
- ✅ Valid signature

#### Step 3: Check File Properties

Right-click installer → Properties → Digital Signatures tab

**Should show:**
- ✅ Signature with your name/company
- ✅ Timestamp
- ✅ "This digital signature is OK"

### Build Troubleshooting

#### Issue: Build succeeds but installer unsigned

**Check:**
```powershell
# Verify environment variables in build shell
Get-ChildItem Env: | Where-Object { $_.Name -like "*CERTIFICATE*" }

# Check tauri.conf.json
Get-Content src-tauri\tauri.conf.json | Select-String "timestamp"
```

**Solution:** Restart PowerShell to load environment variables

#### Issue: "Certificate not found" error

**Check:**
```powershell
# Verify file exists
Test-Path $env:WINDOWS_CERTIFICATE_FILE

# Try to read certificate
Get-PfxCertificate -FilePath $env:WINDOWS_CERTIFICATE_FILE
```

**Solution:** Verify path and password are correct

#### Issue: "Timestamp server unavailable"

**Try alternative servers:**
```powershell
# Edit src-tauri/tauri.conf.json temporarily
# Change timestampUrl to:
# "http://timestamp.sectigo.com"
# or
# "http://timestamp.globalsign.com"
```

---

## 6. Publishing GitHub Releases

### Step 1: Prepare Release

#### Update Version Numbers

Edit these files with new version (e.g., `1.0.1`):

```powershell
# package.json
"version": "1.0.1"

# src-tauri/tauri.conf.json
"version": "1.0.1"

# src-tauri/Cargo.toml
version = "1.0.1"

# Cargo.toml (workspace)
version = "1.0.1"
```

#### Update Release Notes

Edit `RELEASE_NOTES.md`:

```markdown
# AUDIAW 1.0.1

## What's New
- Feature: Added new audio effect
- Improvement: Better performance

## Bug Fixes
- Fixed crash when exporting
- Fixed UI glitch in mixer

## Download
- Windows: AUDIAW-windows-x64-setup.exe
- macOS: AUDIAW-macos.dmg
- Linux: AUDIAW-linux-x86_64.AppImage
```

#### Update Changelog

Edit `CHANGELOG.md`:

```markdown
## [1.0.1] - 2026-05-18

### Added
- New audio effect processor

### Fixed
- Export crash issue
- Mixer UI glitch
```

### Step 2: Build Release Locally

```powershell
# Build signed Windows installer
pnpm run build:windows

# Verify signature
$installer = Get-ChildItem "src-tauri\target\release\bundle\nsis\*-setup.exe"
signtool verify /pa $installer.FullName

# Test installer
Start-Process $installer.FullName
```

### Step 3: Commit and Tag

```powershell
# Stage changes
git add package.json src-tauri/tauri.conf.json src-tauri/Cargo.toml Cargo.toml Cargo.lock CHANGELOG.md RELEASE_NOTES.md

# Commit
git commit -m "chore: prepare v1.0.1 release"

# Create tag
git tag v1.0.1

# Push commit
git push origin main

# Push tag (triggers GitHub Actions)
git push origin v1.0.1
```

### Step 4: Monitor GitHub Actions

1. Go to: https://github.com/aloof-garage/AUDIAW/actions
2. Watch "Release Desktop Builds" workflow
3. Wait for all platforms to complete:
   - ✅ Windows (windows-latest)
   - ✅ macOS (macos-latest)
   - ✅ Linux (ubuntu-22.04)

### Step 5: Verify Release Assets

1. Go to: https://github.com/aloof-garage/AUDIAW/releases/latest
2. Verify assets are present:
   - ✅ `AUDIAW-windows-x64-setup.exe`
   - ✅ `AUDIAW-windows-x64-portable.exe`
   - ✅ `AUDIAW-macos.dmg`
   - ✅ `AUDIAW-linux-x86_64.AppImage`

### Step 6: Test Download Links

```powershell
# Test Windows installer download
Invoke-WebRequest -Uri "https://github.com/aloof-garage/AUDIAW/releases/latest/download/AUDIAW-windows-x64-setup.exe" -OutFile "test-download.exe"

# Verify signature
signtool verify /pa test-download.exe

# Clean up
Remove-Item test-download.exe
```

### Manual Release (If GitHub Actions Fails)

```powershell
# Install GitHub CLI
winget install GitHub.cli

# Authenticate
gh auth login

# Create release
gh release create v1.0.1 `
  --title "AUDIAW 1.0.1" `
  --notes-file RELEASE_NOTES.md `
  "src-tauri\target\release\bundle\nsis\AUDIAW_1.0.1_x64-setup.exe#AUDIAW-windows-x64-setup.exe"
```

---

## 7. Updating the Website Download Link

The AUDIAW marketing website uses **stable GitHub Release URLs** that automatically point to the latest release.

### Current Download URLs

```
Windows: https://github.com/aloof-garage/AUDIAW/releases/latest/download/AUDIAW-windows-x64-setup.exe
macOS:   https://github.com/aloof-garage/AUDIAW/releases/latest/download/AUDIAW-macos.dmg
Linux:   https://github.com/aloof-garage/AUDIAW/releases/latest/download/AUDIAW-linux-x86_64.AppImage
```

**These URLs automatically redirect to the latest release.** No website update needed if asset names stay the same.

### When to Update the Website

Only update if you:
- ✅ Change asset filenames
- ✅ Add new download options
- ✅ Change download page layout
- ✅ Update version number display

### How to Update Website

#### Step 1: Navigate to Marketing Site

```powershell
cd audiaw-marketing
```

#### Step 2: Update Download Links

Edit `app/page.tsx`:

```typescript
// Find the download section
<a
  href="https://github.com/aloof-garage/AUDIAW/releases/latest/download/AUDIAW-windows-x64-setup.exe"
  className="..."
>
  Download for Windows
</a>
```

#### Step 3: Update Version Display (Optional)

```typescript
// Update version number if displayed
<span className="text-sm">Version 1.0.1</span>
```

#### Step 4: Test Locally

```powershell
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
# Test download buttons
```

#### Step 5: Deploy to Vercel

```powershell
# Commit changes
git add app/page.tsx
git commit -m "Update download links for v1.0.1"

# Push to trigger Vercel deployment
git push origin main
```

#### Step 6: Verify Deployment

1. Wait for Vercel deployment (1-2 minutes)
2. Visit: https://audiaw.vercel.app (or your custom domain)
3. Test download buttons
4. Verify downloads start correctly

### Vercel Deployment Status

Check deployment status:
- Vercel Dashboard: https://vercel.com/dashboard
- Or use Vercel CLI:

```powershell
# Install Vercel CLI
npm install -g vercel

# Check deployment status
vercel ls
```

---

## 8. Building Without a Certificate

### When to Build Unsigned

Unsigned builds are acceptable for:
- ✅ Local development and testing
- ✅ Internal team distribution
- ✅ Pre-release testing
- ✅ Debug builds

**Never distribute unsigned builds publicly** - users will see scary warnings.

### How to Build Unsigned

Simply don't set certificate environment variables:

```powershell
# Remove certificate variables (if set)
Remove-Item Env:\WINDOWS_CERTIFICATE_FILE -ErrorAction SilentlyContinue
Remove-Item Env:\WINDOWS_CERTIFICATE_PASSWORD -ErrorAction SilentlyContinue
Remove-Item Env:\WINDOWS_CERTIFICATE_THUMBPRINT -ErrorAction SilentlyContinue

# Build normally
pnpm run build:windows
```

The build will succeed, but the installer will be unsigned.

### What Users Will See

When running an unsigned installer, users see:

```
Windows protected your PC
Microsoft Defender SmartScreen prevented an unrecognized app from starting.

Publisher: Unknown Publisher
App: AUDIAW_1.0.0_x64-setup.exe
```

### User Instructions for Bypassing Warnings

**For trusted unsigned builds**, users can install by:

1. Click "More info" link
2. Click "Run anyway" button
3. Proceed with installation

**Important:** Only bypass warnings for software from trusted sources!

### Communicating with Users

If distributing unsigned builds, be transparent:

```markdown
## Download AUDIAW (Unsigned Build)

⚠️ **Important:** This build is not code-signed. Windows will show a security warning.

**This is normal for unsigned software and does not mean AUDIAW is unsafe.**

### How to Install:
1. Download the installer
2. Run the installer
3. Click "More info" when Windows SmartScreen appears
4. Click "Run anyway"
5. Complete installation

We are working on obtaining a code signing certificate to eliminate these warnings.
```

### Why Unsigned Builds Show Warnings

- ❌ No verified publisher identity
- ❌ No reputation with Microsoft
- ❌ Windows can't verify authenticity
- ❌ Treated as "unknown" software

**This is a limitation of unsigned software, not a problem with AUDIAW.**

---

## 9. Troubleshooting

### Common Signing Errors

#### Error: "Certificate not found in store"

**Symptoms:**
```
Error: The specified certificate is not found in the certificate store
```

**Causes:**
- Wrong thumbprint
- Certificate not installed
- Certificate expired

**Solutions:**
```powershell
# List all certificates
Get-ChildItem -Path Cert:\CurrentUser\My | Format-List Subject, Thumbprint, NotAfter

# Verify thumbprint matches
$env:WINDOWS_CERTIFICATE_THUMBPRINT

# Check if certificate expired
$cert = Get-ChildItem -Path Cert:\CurrentUser\My | Where-Object { $_.Thumbprint -eq $env:WINDOWS_CERTIFICATE_THUMBPRINT }
if ($cert.NotAfter -lt (Get-Date)) {
    Write-Host "Certificate EXPIRED on $($cert.NotAfter)"
}
```

#### Error: "Invalid password"

**Symptoms:**
```
Error: The specified network password is not correct
```

**Causes:**
- Wrong password
- Special characters not escaped
- Password contains quotes

**Solutions:**
```powershell
# Try setting password with single quotes
$env:WINDOWS_CERTIFICATE_PASSWORD = 'your-password-here'

# Or escape special characters
$env:WINDOWS_CERTIFICATE_PASSWORD = "password`$with`$dollars"

# Test password
Get-PfxCertificate -FilePath $env:WINDOWS_CERTIFICATE_FILE
```

#### Error: "Timestamp server unavailable"

**Symptoms:**
```
Error: The timestamp server could not be reached
```

**Causes:**
- Network connectivity issues
- Timestamp server down
- Firewall blocking

**Solutions:**
```powershell
# Test connectivity
Test-NetConnection -ComputerName timestamp.digicert.com -Port 80

# Try alternative timestamp servers
# Edit src-tauri/tauri.conf.json:
"timestampUrl": "http://timestamp.sectigo.com"
# or
"timestampUrl": "http://timestamp.globalsign.com"
# or
"timestampUrl": "http://timestamp.comodoca.com"
```

### Certificate Validation Issues

#### Issue: Certificate expired

**Check expiration:**
```powershell
$cert = Get-PfxCertificate -FilePath $env:WINDOWS_CERTIFICATE_FILE
Write-Host "Expires: $($cert.NotAfter)"

if ($cert.NotAfter -lt (Get-Date)) {
    Write-Host "EXPIRED!" -ForegroundColor Red
} else {
    $daysLeft = ($cert.NotAfter - (Get-Date)).Days
    Write-Host "Valid for $daysLeft more days" -ForegroundColor Green
}
```

**Solution:** Renew certificate before expiration (30 days notice recommended)

#### Issue: Certificate not trusted

**Check certificate chain:**
```powershell
$cert = Get-PfxCertificate -FilePath $env:WINDOWS_CERTIFICATE_FILE
$cert.Verify()  # Should return True
```

**Solution:** Ensure certificate is from trusted CA (DigiCert, Sectigo, etc.)

### Build Failures

#### Issue: signtool.exe not found

**Symptoms:**
```
Error: signtool.exe is not recognized
```

**Solution:**
```powershell
# Install Windows SDK
# Download from: https://developer.microsoft.com/windows/downloads/windows-sdk/

# Or install via Visual Studio Installer:
# - Open Visual Studio Installer
# - Modify installation
# - Individual Components
# - Check "Windows 10 SDK" or "Windows 11 SDK"

# Verify installation
Get-Command signtool.exe
```

#### Issue: Build succeeds but installer not signed

**Check:**
```powershell
# Verify environment variables are loaded
Get-ChildItem Env: | Where-Object { $_.Name -like "*CERTIFICATE*" }

# Check if variables are in build environment
# Restart PowerShell if needed

# Verify tauri.conf.json
Get-Content src-tauri\tauri.conf.json | Select-String "timestamp"
```

**Solution:** Ensure environment variables are set before running build

### SmartScreen Still Showing Warnings

#### Issue: Signed installer still triggers SmartScreen

**This is normal!** Even signed installers need reputation.

**Timeline:**
- **Week 1-2:** SmartScreen warnings (low reputation)
- **Week 3-4:** Warnings reduce (building reputation)
- **Month 2-3:** Most warnings gone (established reputation)

**Accelerate reputation:**

1. **Get more downloads** - More users = faster reputation
2. **Submit to Microsoft:**
   - URL: https://www.microsoft.com/en-us/wdsi/filesubmission
   - Submit signed installer for review
3. **Use EV certificate** - Instant reputation (no waiting)
4. **Consistent signing** - Always use same certificate
5. **Join Microsoft Partner Network** - Verified publisher status

**Check reputation status:**
```powershell
# No official API, but you can:
# 1. Test on clean Windows VM
# 2. Ask users for feedback
# 3. Monitor download metrics
```

---

## 10. Best Practices

### Certificate Security

#### DO:
- ✅ Store .pfx files in encrypted locations
- ✅ Use strong passwords (16+ characters, mixed case, symbols)
- ✅ Limit access to authorized personnel only
- ✅ Use hardware tokens for EV certificates
- ✅ Back up certificates securely (encrypted backup)
- ✅ Document certificate details (expiration, provider, etc.)
- ✅ Set calendar reminders for renewal (30 days before expiry)

#### DON'T:
- ❌ Commit certificates to Git (ever!)
- ❌ Store in cloud storage (unless encrypted)
- ❌ Share passwords via email or chat
- ❌ Use weak passwords
- ❌ Store on shared network drives
- ❌ Leave certificates on build servers after use
- ❌ Forget to renew before expiration

### Version Management

#### Semantic Versioning

Use semantic versioning: `MAJOR.MINOR.PATCH`

```
1.0.0 → 1.0.1  (Bug fix)
1.0.1 → 1.1.0  (New feature)
1.1.0 → 2.0.0  (Breaking change)
```

#### Version Consistency

Always update all version files:
- ✅ `package.json`
- ✅ `src-tauri/tauri.conf.json`
- ✅ `src-tauri/Cargo.toml`
- ✅ `Cargo.toml`
- ✅ `CHANGELOG.md`
- ✅ `RELEASE_NOTES.md`

#### Git Tags

Always use `v` prefix for tags:
```powershell
git tag v1.0.1  # ✅ Correct
git tag 1.0.1   # ❌ Wrong
```

### Release Checklist

Before every release:

- [ ] Version numbers updated in all files
- [ ] `CHANGELOG.md` updated with changes
- [ ] `RELEASE_NOTES.md` written
- [ ] Local build tested and verified
- [ ] Installer signature verified
- [ ] App launches and works correctly
- [ ] All tests passing
- [ ] Documentation updated (if needed)
- [ ] Release commit created
- [ ] Git tag created and pushed
- [ ] GitHub Actions completed successfully
- [ ] Release assets verified on GitHub
- [ ] Download links tested
- [ ] Website updated (if needed)
- [ ] Release announced (Discord, Twitter, etc.)

### User Communication

#### Be Transparent About Warnings

If distributing unsigned builds:

```markdown
## Important: Security Warnings

AUDIAW is currently unsigned, which means Windows will show security warnings.

**This is normal and does not mean AUDIAW is unsafe.**

We are an open-source project and are working on obtaining a code signing 
certificate. In the meantime, you can safely install AUDIAW by clicking 
"More info" → "Run anyway" when the warning appears.

Your trust and patience are appreciated!
```

#### Announce When Signed

When you get a certificate:

```markdown
## 🎉 AUDIAW is Now Code Signed!

We're excited to announce that AUDIAW installers are now digitally signed!

**What this means for you:**
- ✅ No more security warnings
- ✅ Verified publisher identity
- ✅ Smoother installation experience

Download the latest version to enjoy the improved experience!
```

#### Set Expectations

For standard certificates:

```markdown
## About SmartScreen Warnings

AUDIAW is now code-signed, but you may still see SmartScreen warnings 
initially. This is normal for new certificates and will disappear as 
our reputation builds over the next 2-4 weeks.

Thank you for your patience as we establish trust with Microsoft!
```

### Monitoring and Maintenance

#### Certificate Expiration

```powershell
# Create reminder script (run monthly)
$cert = Get-PfxCertificate -FilePath $env:WINDOWS_CERTIFICATE_FILE
$daysLeft = ($cert.NotAfter - (Get-Date)).Days

if ($daysLeft -lt 30) {
    Write-Host "⚠️ Certificate expires in $daysLeft days!" -ForegroundColor Yellow
    Write-Host "Renew at: [your certificate provider URL]"
}
```

#### Build Verification

Always verify signatures after building:

```powershell
# Add to build script
$installer = Get-ChildItem "src-tauri\target\release\bundle\nsis\*-setup.exe"
$result = signtool verify /pa $installer.FullName 2>&1

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Signature verified" -ForegroundColor Green
} else {
    Write-Host "❌ Signature verification FAILED!" -ForegroundColor Red
    exit 1
}
```

#### Download Metrics

Track download metrics to monitor reputation building:
- GitHub Releases download counts
- Website analytics
- User feedback about warnings

---

## Quick Reference

### Environment Variables

```powershell
# Standard certificate
$env:WINDOWS_CERTIFICATE_FILE = "C:\path\to\cert.pfx"
$env:WINDOWS_CERTIFICATE_PASSWORD = "password"

# EV certificate
$env:WINDOWS_CERTIFICATE_THUMBPRINT = "thumbprint"
```

### Build Commands

```powershell
# Build signed installer
pnpm run build:windows

# Verify signature
signtool verify /pa "src-tauri\target\release\bundle\nsis\*-setup.exe"
```

### Release Commands

```powershell
# Update versions, then:
git add .
git commit -m "chore: prepare v1.0.1 release"
git tag v1.0.1
git push origin main
git push origin v1.0.1
```

### Useful Links

- **Certificate Providers:**
  - DigiCert: https://www.digicert.com/signing/code-signing-certificates
  - Sectigo: https://sectigo.com/ssl-certificates-tls/code-signing
  - SSL.com: https://www.ssl.com/certificates/code-signing/

- **Microsoft Resources:**
  - SmartScreen Submission: https://www.microsoft.com/en-us/wdsi/filesubmission
  - Windows SDK: https://developer.microsoft.com/windows/downloads/windows-sdk/

- **Tauri Documentation:**
  - Code Signing: https://tauri.app/v1/guides/distribution/sign-windows

---

## Support

For help with code signing and releases:

1. Check this guide first
2. Review `CODE_SIGNING_SETUP.md` for detailed setup
3. Review `CODE_SIGNING_CONFIG.md` for configuration details
4. Search GitHub Issues
5. Ask in Discord/Discussions
6. Create a new issue

---

**Last Updated:** 2026-05-18  
**AUDIAW Version:** 1.0.0  
**Guide Version:** 1.0

---

*This guide is part of the AUDIAW project documentation. For more information, see the main README.md.*
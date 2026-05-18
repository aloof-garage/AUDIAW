# Code Signing Configuration for AUDIAW

This document explains how code signing is configured for AUDIAW Windows releases and how to set it up.

---

## Overview

AUDIAW supports automatic code signing during the build process using environment variables. This allows you to:

- Sign releases automatically without modifying configuration files
- Keep certificate credentials secure (not in version control)
- Use different certificates for different environments (dev, staging, production)

---

## Configuration Method

### Environment Variables (Recommended)

Tauri automatically reads these environment variables during the build process:

| Variable | Purpose | Example Value |
|----------|---------|---------------|
| `TAURI_WINDOWS_SIGN_THUMBPRINT` | Certificate thumbprint (SHA-1 hash) | `A1B2C3D4E5F6G7H8I9J0K1L2M3N4O5P6Q7R8S9T0` |
| `TAURI_WINDOWS_TIMESTAMP_URL` | Timestamp server URL | `http://timestamp.digicert.com` |

**Note:** The `tauri.conf.json` file has these fields set to `null` or empty by default. Environment variables override these values during build.

---

## Setup Instructions

### Step 1: Obtain Your Certificate Thumbprint

#### Method A: From .pfx File

```powershell
# Import certificate temporarily to view details
$cert = Get-PfxCertificate -FilePath "C:\path\to\your\certificate.pfx"
Write-Host "Thumbprint: $($cert.Thumbprint)"
```

#### Method B: From Installed Certificate

```powershell
# List all code signing certificates
Get-ChildItem -Path Cert:\CurrentUser\My -CodeSigningCert | Format-List Subject, Thumbprint
```

Copy the thumbprint value (40-character hexadecimal string).

### Step 2: Set Environment Variables

#### Option A: PowerShell Session (Temporary)

Set variables for the current PowerShell session only:

```powershell
# Set certificate thumbprint
$env:TAURI_WINDOWS_SIGN_THUMBPRINT = "YOUR_CERTIFICATE_THUMBPRINT_HERE"

# Set timestamp server
$env:TAURI_WINDOWS_TIMESTAMP_URL = "http://timestamp.digicert.com"

# Verify variables are set
Write-Host "Thumbprint: $env:TAURI_WINDOWS_SIGN_THUMBPRINT"
Write-Host "Timestamp: $env:TAURI_WINDOWS_TIMESTAMP_URL"

# Build with signing
.\scripts\build-windows.ps1
```

**Pros:**
- Quick and easy
- No permanent changes
- Good for testing

**Cons:**
- Must set every time you open PowerShell
- Lost when terminal closes

#### Option B: User Environment Variables (Permanent)

Set variables permanently for your user account:

**Using PowerShell:**

```powershell
# Set thumbprint (permanent)
[System.Environment]::SetEnvironmentVariable(
    "TAURI_WINDOWS_SIGN_THUMBPRINT",
    "YOUR_CERTIFICATE_THUMBPRINT_HERE",
    [System.EnvironmentVariableTarget]::User
)

# Set timestamp URL (permanent)
[System.Environment]::SetEnvironmentVariable(
    "TAURI_WINDOWS_TIMESTAMP_URL",
    "http://timestamp.digicert.com",
    [System.EnvironmentVariableTarget]::User
)

# Restart PowerShell to load new variables
```

**Using Windows GUI:**

1. Press `Win + X` → Select "System"
2. Click "Advanced system settings"
3. Click "Environment Variables"
4. Under "User variables", click "New"
5. Add each variable:
   - Variable name: `TAURI_WINDOWS_SIGN_THUMBPRINT`
   - Variable value: Your certificate thumbprint
6. Click "OK" to save
7. Repeat for `TAURI_WINDOWS_TIMESTAMP_URL`
8. Restart PowerShell

**Pros:**
- Set once, use forever
- Automatic for all builds
- No need to remember

**Cons:**
- Applies to all projects
- Harder to use different certificates per project

#### Option C: Project-Specific .env File (Not Recommended)

**⚠️ WARNING:** Do not use this method unless you understand the security implications!

Create a `.env` file in the project root:

```env
TAURI_WINDOWS_SIGN_THUMBPRINT=YOUR_CERTIFICATE_THUMBPRINT_HERE
TAURI_WINDOWS_TIMESTAMP_URL=http://timestamp.digicert.com
```

**IMPORTANT:**
- Add `.env` to `.gitignore` immediately
- Never commit this file to version control
- This file contains sensitive information

**Why not recommended:**
- Easy to accidentally commit
- Security risk if exposed
- Better to use system environment variables

---

## Certificate Requirements

### What You Need

1. **Code Signing Certificate**
   - Standard or Extended Validation (EV)
   - Valid for Windows code signing
   - Not expired

2. **Certificate Installation**
   - Installed in Windows Certificate Store, OR
   - Available as .pfx/.p12 file with password

3. **Certificate Thumbprint**
   - 40-character SHA-1 hash
   - Identifies your certificate uniquely

### Certificate Types

#### Standard Code Signing Certificate

- **Format:** .pfx or .p12 file
- **Installation:** Import to Windows Certificate Store
- **Usage:** Thumbprint-based signing
- **Cost:** $100-$400/year

**To install:**

```powershell
# Import certificate to user store
Import-PfxCertificate -FilePath "C:\path\to\certificate.pfx" -CertStoreLocation Cert:\CurrentUser\My
```

#### Extended Validation (EV) Certificate

- **Format:** USB hardware token
- **Installation:** Driver installation required
- **Usage:** Thumbprint-based signing
- **Cost:** $300-$600/year
- **Benefit:** Immediate SmartScreen reputation

**To use:**
1. Insert USB token
2. Install manufacturer's driver
3. Certificate appears in Windows Certificate Store
4. Use thumbprint for signing

---

## Timestamp Servers

### Why Timestamp?

Timestamps prove when your software was signed. Benefits:

- Signatures remain valid after certificate expires
- Users can verify signing time
- Required for long-term trust
- Industry best practice

### Recommended Servers

| Provider | URL | Reliability |
|----------|-----|-------------|
| DigiCert | `http://timestamp.digicert.com` | ⭐⭐⭐⭐⭐ |
| Sectigo | `http://timestamp.sectigo.com` | ⭐⭐⭐⭐⭐ |
| GlobalSign | `http://timestamp.globalsign.com` | ⭐⭐⭐⭐ |

**Default:** DigiCert (most reliable)

### Fallback Strategy

If one timestamp server fails, try another:

```powershell
# Try DigiCert first
$env:TAURI_WINDOWS_TIMESTAMP_URL = "http://timestamp.digicert.com"
.\scripts\build-windows.ps1

# If that fails, try Sectigo
$env:TAURI_WINDOWS_TIMESTAMP_URL = "http://timestamp.sectigo.com"
.\scripts\build-windows.ps1
```

---

## Verification

### Check Environment Variables

```powershell
# Display current values
Write-Host "Thumbprint: $env:TAURI_WINDOWS_SIGN_THUMBPRINT"
Write-Host "Timestamp: $env:TAURI_WINDOWS_TIMESTAMP_URL"

# Check if variables are set
if ($env:TAURI_WINDOWS_SIGN_THUMBPRINT) {
    Write-Host "✓ Thumbprint is set"
} else {
    Write-Host "✗ Thumbprint is NOT set"
}

if ($env:TAURI_WINDOWS_TIMESTAMP_URL) {
    Write-Host "✓ Timestamp URL is set"
} else {
    Write-Host "✗ Timestamp URL is NOT set"
}
```

### Verify Certificate Installation

```powershell
# Check if certificate exists in store
$thumbprint = $env:TAURI_WINDOWS_SIGN_THUMBPRINT
$cert = Get-ChildItem -Path Cert:\CurrentUser\My | Where-Object { $_.Thumbprint -eq $thumbprint }

if ($cert) {
    Write-Host "✓ Certificate found"
    Write-Host "  Subject: $($cert.Subject)"
    Write-Host "  Issuer: $($cert.Issuer)"
    Write-Host "  Valid Until: $($cert.NotAfter)"
} else {
    Write-Host "✗ Certificate NOT found in store"
}
```

### Verify Signed Installer

After building, verify the signature:

```powershell
# Path to signtool.exe (adjust version as needed)
$signtool = "C:\Program Files (x86)\Windows Kits\10\bin\10.0.22621.0\x64\signtool.exe"

# Verify signature
& $signtool verify /pa "src-tauri\target\release\bundle\nsis\AUDIAW_1.0.0_x64-setup.exe"
```

**Expected output:**
```
Successfully verified: AUDIAW_1.0.0_x64-setup.exe

Number of signatures successfully Verified: 1
```

---

## Troubleshooting

### Problem: "Certificate not found"

**Possible causes:**
1. Thumbprint is incorrect
2. Certificate not installed in Windows Certificate Store
3. Certificate expired

**Solutions:**

```powershell
# List all certificates
Get-ChildItem -Path Cert:\CurrentUser\My | Format-List Subject, Thumbprint, NotAfter

# Check specific thumbprint
$thumbprint = "YOUR_THUMBPRINT"
Get-ChildItem -Path Cert:\CurrentUser\My | Where-Object { $_.Thumbprint -eq $thumbprint }
```

### Problem: "Timestamp server unavailable"

**Possible causes:**
1. Network connectivity issues
2. Timestamp server is down
3. Firewall blocking requests

**Solutions:**

```powershell
# Test timestamp server connectivity
Test-NetConnection -ComputerName timestamp.digicert.com -Port 80

# Try alternative server
$env:TAURI_WINDOWS_TIMESTAMP_URL = "http://timestamp.sectigo.com"
```

### Problem: "Signing fails silently"

**Possible causes:**
1. Environment variables not set
2. Certificate doesn't have code signing capability
3. Certificate expired

**Solutions:**

```powershell
# Verify environment variables
Get-ChildItem Env: | Where-Object { $_.Name -like "*TAURI*" }

# Check certificate capabilities
$cert = Get-PfxCertificate -FilePath "C:\path\to\certificate.pfx"
$cert.EnhancedKeyUsageList
# Should include "Code Signing"
```

### Problem: "Build succeeds but installer not signed"

**Possible causes:**
1. Environment variables not loaded
2. Tauri version doesn't support environment variables
3. Certificate thumbprint format incorrect

**Solutions:**

```powershell
# Restart PowerShell to load environment variables
# Verify Tauri version (should be 2.0+)
cargo tauri --version

# Check thumbprint format (should be 40 hex characters, no spaces)
$env:TAURI_WINDOWS_SIGN_THUMBPRINT -replace '\s', ''
```

---

## Security Best Practices

### Certificate Storage

**DO:**
- ✅ Store .pfx files in encrypted locations
- ✅ Use strong passwords for .pfx files
- ✅ Back up certificates securely
- ✅ Limit access to authorized personnel
- ✅ Use hardware tokens for EV certificates

**DON'T:**
- ❌ Commit certificates to Git
- ❌ Store in cloud storage (unless encrypted)
- ❌ Share certificate passwords via email
- ❌ Use weak passwords
- ❌ Store on shared network drives

### Environment Variables

**DO:**
- ✅ Use system environment variables
- ✅ Document who has access
- ✅ Rotate certificates before expiry
- ✅ Audit certificate usage

**DON'T:**
- ❌ Hardcode in scripts
- ❌ Commit .env files
- ❌ Share in documentation
- ❌ Post in public forums

### Build Environment

**DO:**
- ✅ Build on trusted, secure systems
- ✅ Keep build tools updated
- ✅ Use antivirus/antimalware
- ✅ Monitor for unauthorized access
- ✅ Log all builds

**DON'T:**
- ❌ Build on shared/public computers
- ❌ Use untrusted networks
- ❌ Skip security updates
- ❌ Ignore security warnings

---

## Configuration Reference

### tauri.conf.json Structure

```json
{
  "bundle": {
    "windows": {
      "certificateThumbprint": null,
      "digestAlgorithm": "sha256",
      "timestampUrl": ""
    }
  }
}
```

**Fields:**

- `certificateThumbprint`: Certificate SHA-1 thumbprint (overridden by `TAURI_WINDOWS_SIGN_THUMBPRINT`)
- `digestAlgorithm`: Hash algorithm for signing (always use `sha256`)
- `timestampUrl`: Timestamp server URL (overridden by `TAURI_WINDOWS_TIMESTAMP_URL`)

**Note:** Keep these as `null` or empty in the config file. Use environment variables instead.

### Environment Variable Priority

1. **Environment variables** (highest priority)
2. **tauri.conf.json** values
3. **No signing** (if neither is set)

---

## Quick Start Checklist

Before your first signed build:

- [ ] Obtain code signing certificate
- [ ] Install certificate in Windows Certificate Store
- [ ] Get certificate thumbprint
- [ ] Set `TAURI_WINDOWS_SIGN_THUMBPRINT` environment variable
- [ ] Set `TAURI_WINDOWS_TIMESTAMP_URL` environment variable
- [ ] Verify environment variables are set
- [ ] Verify certificate is accessible
- [ ] Run test build
- [ ] Verify installer signature
- [ ] Test installer on clean system

---

## Additional Resources

- **Tauri Code Signing Docs:** https://tauri.app/v1/guides/distribution/sign-windows
- **Microsoft Code Signing Guide:** https://docs.microsoft.com/en-us/windows/win32/seccrypto/cryptography-tools
- **Certificate Providers:**
  - Sectigo: https://sectigo.com/ssl-certificates-tls/code-signing
  - DigiCert: https://www.digicert.com/signing/code-signing-certificates
  - GlobalSign: https://www.globalsign.com/en/code-signing-certificate

---

## Support

If you need help with code signing:

1. Check the [WINDOWS_RELEASE_GUIDE.md](WINDOWS_RELEASE_GUIDE.md)
2. Review this configuration document
3. Search GitHub Issues
4. Ask in Discord/Discussions
5. Create a new issue

---

*Last updated: 2026-05-18*
*AUDIAW Version: 1.0.0*
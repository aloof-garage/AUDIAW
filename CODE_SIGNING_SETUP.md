# AUDIAW Windows Code Signing Setup Guide

## Overview

This guide explains how to configure code signing for AUDIAW Windows installers to eliminate Microsoft Defender and SmartScreen warnings.

---

## Why Code Signing is Critical

**Without code signing:**
- ❌ Microsoft Defender flags installer as potentially unsafe
- ❌ SmartScreen shows "Unknown Publisher" warning
- ❌ Chrome blocks downloads
- ❌ Users see scary security warnings
- ❌ Zero reputation with Microsoft

**With code signing:**
- ✅ Verified publisher identity
- ✅ No SmartScreen warnings (after reputation builds)
- ✅ Professional appearance
- ✅ User trust and confidence
- ✅ Builds Microsoft reputation over time

---

## Certificate Options

### Option 1: Extended Validation (EV) Certificate (RECOMMENDED)
**Cost:** $300-500/year  
**Reputation:** Instant SmartScreen reputation  
**Delivery:** USB token (hardware security module)

**Providers:**
- DigiCert (recommended)
- Sectigo
- GlobalSign

**Advantages:**
- Immediate SmartScreen reputation
- Highest trust level
- No reputation building period
- Best for commercial software

### Option 2: Standard Code Signing Certificate
**Cost:** $100-200/year  
**Reputation:** Must build over time (weeks/months)  
**Delivery:** Digital file (.pfx/.p12)

**Providers:**
- Sectigo
- SSL.com
- Comodo

**Advantages:**
- Lower cost
- Easier to use in CI/CD
- Good for open-source projects

### Option 3: Self-Signed Certificate (NOT RECOMMENDED)
**Cost:** Free  
**Reputation:** None - still triggers warnings  
**Use case:** Testing only

---

## Setup Instructions

### Step 1: Obtain Certificate

#### For EV Certificate:
1. Purchase from provider (DigiCert recommended)
2. Complete business verification (2-5 days)
3. Receive USB token
4. Install SafeNet drivers
5. Insert token when signing

#### For Standard Certificate:
1. Purchase from provider
2. Complete verification (1-3 days)
3. Download .pfx file
4. Store securely (encrypted location)

### Step 2: Configure Environment Variables

The AUDIAW build system uses environment variables for code signing. This allows:
- Secure credential management
- CI/CD integration
- Local development without committing secrets

#### Windows (PowerShell):
```powershell
# For certificate file (.pfx)
$env:WINDOWS_CERTIFICATE_FILE = "C:\path\to\certificate.pfx"
$env:WINDOWS_CERTIFICATE_PASSWORD = "your-certificate-password"

# Make permanent (optional)
[System.Environment]::SetEnvironmentVariable('WINDOWS_CERTIFICATE_FILE', 'C:\path\to\certificate.pfx', 'User')
[System.Environment]::SetEnvironmentVariable('WINDOWS_CERTIFICATE_PASSWORD', 'your-certificate-password', 'User')
```

#### For EV Certificate (USB Token):
```powershell
# Set certificate thumbprint instead
$env:WINDOWS_CERTIFICATE_THUMBPRINT = "your-certificate-thumbprint"

# Find thumbprint:
# 1. Open certmgr.msc
# 2. Navigate to Personal > Certificates
# 3. Double-click your certificate
# 4. Go to Details tab
# 5. Scroll to Thumbprint
# 6. Copy the value (remove spaces)
```

### Step 3: Verify Configuration

Run this PowerShell script to verify setup:

```powershell
# Check if environment variables are set
if ($env:WINDOWS_CERTIFICATE_FILE) {
    Write-Host "✓ Certificate file path set: $env:WINDOWS_CERTIFICATE_FILE" -ForegroundColor Green
    
    if (Test-Path $env:WINDOWS_CERTIFICATE_FILE) {
        Write-Host "✓ Certificate file exists" -ForegroundColor Green
    } else {
        Write-Host "✗ Certificate file not found!" -ForegroundColor Red
    }
} elseif ($env:WINDOWS_CERTIFICATE_THUMBPRINT) {
    Write-Host "✓ Certificate thumbprint set" -ForegroundColor Green
} else {
    Write-Host "⚠ No certificate configured - installer will be unsigned" -ForegroundColor Yellow
}

# Check if signtool is available
$signtool = Get-Command signtool.exe -ErrorAction SilentlyContinue
if ($signtool) {
    Write-Host "✓ signtool.exe found: $($signtool.Source)" -ForegroundColor Green
} else {
    Write-Host "✗ signtool.exe not found - install Windows SDK" -ForegroundColor Red
}
```

### Step 4: Install Windows SDK (if needed)

signtool.exe is required for code signing and comes with Windows SDK.

**Download:** https://developer.microsoft.com/en-us/windows/downloads/windows-sdk/

**Or install via Visual Studio:**
- Visual Studio Installer
- Modify installation
- Individual Components
- Check "Windows 10 SDK" or "Windows 11 SDK"

**Verify installation:**
```powershell
signtool.exe /?
```

### Step 5: Build Signed Installer

```powershell
# Build Windows installer (will auto-sign if certificate configured)
pnpm run build:windows

# Or use npm/yarn
npm run build:windows
```

**Build output location:**
```
src-tauri/target/release/bundle/nsis/AUDIAW_1.0.0_x64-setup.exe
```

### Step 6: Verify Signature

```powershell
# Verify the installer is signed
signtool.exe verify /pa "src-tauri/target/release/bundle/nsis/AUDIAW_1.0.0_x64-setup.exe"

# View signature details
signtool.exe verify /v /pa "src-tauri/target/release/bundle/nsis/AUDIAW_1.0.0_x64-setup.exe"
```

**Expected output:**
```
Successfully verified: AUDIAW_1.0.0_x64-setup.exe

Number of files successfully Verified: 1
```

---

## CI/CD Integration

### GitHub Actions Example:

```yaml
name: Build Windows Installer

on:
  push:
    tags:
      - 'v*'

jobs:
  build-windows:
    runs-on: windows-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 8
      
      - name: Install dependencies
        run: pnpm install
      
      - name: Decode certificate
        run: |
          $cert = [System.Convert]::FromBase64String("${{ secrets.WINDOWS_CERTIFICATE_BASE64 }}")
          [IO.File]::WriteAllBytes("certificate.pfx", $cert)
      
      - name: Build signed installer
        env:
          WINDOWS_CERTIFICATE_FILE: certificate.pfx
          WINDOWS_CERTIFICATE_PASSWORD: ${{ secrets.WINDOWS_CERTIFICATE_PASSWORD }}
        run: pnpm run build:windows
      
      - name: Verify signature
        run: |
          signtool verify /pa "src-tauri/target/release/bundle/nsis/AUDIAW_*_x64-setup.exe"
      
      - name: Upload installer
        uses: actions/upload-artifact@v3
        with:
          name: windows-installer
          path: src-tauri/target/release/bundle/nsis/*.exe
      
      - name: Cleanup certificate
        if: always()
        run: Remove-Item certificate.pfx -ErrorAction SilentlyContinue
```

**Required GitHub Secrets:**
- `WINDOWS_CERTIFICATE_BASE64` - Base64-encoded .pfx file
- `WINDOWS_CERTIFICATE_PASSWORD` - Certificate password

**To create base64 secret:**
```powershell
$bytes = [System.IO.File]::ReadAllBytes("certificate.pfx")
$base64 = [System.Convert]::ToBase64String($bytes)
$base64 | Set-Clipboard
# Now paste into GitHub Secrets
```

---

## Troubleshooting

### Issue: "signtool.exe not found"
**Solution:** Install Windows SDK (see Step 4)

### Issue: "Certificate not found"
**Solution:** 
- Verify environment variable path is correct
- Check file exists at specified location
- Ensure no typos in path

### Issue: "Invalid password"
**Solution:**
- Verify password is correct
- Check for special characters that need escaping
- Try setting password in quotes

### Issue: "Timestamp server unavailable"
**Solution:**
- Check internet connection
- Try alternative timestamp server:
  - `http://timestamp.digicert.com`
  - `http://timestamp.sectigo.com`
  - `http://timestamp.comodoca.com`

### Issue: "Still getting SmartScreen warnings"
**Solution:**
- Standard certificates need reputation building (2-4 weeks)
- Download count must reach threshold (~1000+ downloads)
- Consider upgrading to EV certificate for instant reputation
- Submit to Microsoft SmartScreen for review

### Issue: "Build succeeds but installer unsigned"
**Solution:**
- Verify environment variables are set in build environment
- Check tauri.conf.json has correct timestamp URL
- Ensure signtool.exe is in PATH
- Check build logs for signing errors

---

## Building Without Certificate (Development)

The configuration gracefully handles missing certificates:

```powershell
# Build without signing (for testing)
# Simply don't set environment variables
pnpm run build:windows
```

**Warning:** Unsigned installers will trigger security warnings. Only use for:
- Local testing
- Development builds
- Internal distribution

**Never distribute unsigned installers publicly.**

---

## SmartScreen Reputation Building

Even with a signed installer, SmartScreen may show warnings initially.

### Timeline:
- **Week 1-2:** Still shows warnings (low reputation)
- **Week 3-4:** Warnings reduce as downloads increase
- **Month 2-3:** Most warnings disappear (established reputation)

### Accelerate reputation:
1. **Get EV certificate** - Instant reputation
2. **Increase downloads** - More downloads = faster reputation
3. **Submit to Microsoft** - Request SmartScreen review
4. **Join Microsoft Partner Network** - Verified publisher status
5. **Consistent signing** - Always sign with same certificate

### Microsoft SmartScreen Submission:
https://www.microsoft.com/en-us/wdsi/filesubmission

---

## Security Best Practices

### Certificate Storage:
- ✅ Store .pfx files encrypted
- ✅ Use strong passwords
- ✅ Limit access to certificate
- ✅ Use hardware tokens for EV certs
- ❌ Never commit certificates to git
- ❌ Never share certificate passwords
- ❌ Never store in plain text

### Environment Variables:
- ✅ Use secure secret management in CI/CD
- ✅ Rotate passwords regularly
- ✅ Use different certs for dev/prod
- ❌ Never log certificate passwords
- ❌ Never expose in error messages

### Certificate Lifecycle:
- Monitor expiration dates
- Renew 30 days before expiry
- Test new certificates before old ones expire
- Keep backup of certificate files
- Document certificate details securely

---

## Cost-Benefit Analysis

### Investment:
- **EV Certificate:** $300-500/year
- **Standard Certificate:** $100-200/year
- **Setup time:** 2-4 hours
- **Maintenance:** 1 hour/year

### Returns:
- ✅ Eliminates user friction (huge)
- ✅ Increases download conversion rate
- ✅ Builds trust and credibility
- ✅ Professional appearance
- ✅ Reduces support requests
- ✅ Enables enterprise adoption

**ROI:** Extremely high - code signing is essential for Windows software distribution.

---

## Support

For issues with:
- **Certificate purchase:** Contact certificate provider
- **Tauri configuration:** Check Tauri documentation
- **Build process:** Review build logs
- **SmartScreen:** Submit to Microsoft for review

---

## Additional Resources

- [Tauri Code Signing Docs](https://tauri.app/v1/guides/distribution/sign-windows)
- [Microsoft Code Signing Guide](https://docs.microsoft.com/en-us/windows/win32/seccrypto/cryptography-tools)
- [DigiCert Code Signing](https://www.digicert.com/signing/code-signing-certificates)
- [SmartScreen Reputation](https://docs.microsoft.com/en-us/windows/security/threat-protection/windows-defender-smartscreen/windows-defender-smartscreen-overview)

---

**Last Updated:** 2026-05-18  
**AUDIAW Version:** 1.0.0
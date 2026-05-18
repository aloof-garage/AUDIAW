# AUDIAW Windows Packaging Audit Report

**Date:** 2026-05-18  
**Auditor:** Bob (Software Engineer)  
**Scope:** Microsoft Defender/SmartScreen flagging issues

---

## Executive Summary

The AUDIAW Windows installer is being flagged by Chrome, Microsoft Defender, and SmartScreen as unsafe due to **multiple critical configuration deficiencies** that make the installer appear unprofessional and potentially suspicious.

**Severity:** HIGH - Blocks user adoption and damages reputation

---

## Critical Issues Identified

### 1. **MISSING CODE SIGNING CONFIGURATION** ⚠️ CRITICAL
**Location:** `src-tauri/tauri.conf.json` lines 49-51

**Current State:**
```json
"certificateThumbprint": null,
"digestAlgorithm": "sha256",
"timestampUrl": "",
```

**Issues:**
- No code signing certificate configuration
- Empty timestamp URL (required for proper signing)
- No environment variable support for CI/CD
- Unsigned executables are PRIMARY cause of SmartScreen warnings

**Impact:** 
- Microsoft Defender flags unsigned executables as high risk
- SmartScreen shows "Unknown Publisher" warning
- Chrome blocks downloads from unknown publishers
- Users see scary red warnings

---

### 2. **INCOMPLETE NSIS INSTALLER CONFIGURATION** ⚠️ HIGH
**Location:** `src-tauri/tauri.conf.json` lines 55-65

**Current State:**
```json
"nsis": {
  "installerIcon": "icons/icon.ico",
  "installMode": "currentUser",
  "languages": ["English"],
  "displayLanguageSelector": false,
  "template": null,
  "headerImage": null,
  "sidebarImage": null,
  "installerHooks": null,
  "compression": "lzma"
}
```

**Issues:**
- Missing license agreement display
- No custom installer branding (header/sidebar images)
- No uninstaller configuration
- Missing start menu/desktop shortcut options
- No file associations configured
- Missing installer metadata (company, version info)
- No custom welcome/finish pages

**Impact:**
- Installer looks generic and unprofessional
- Missing standard Windows installer features
- Appears hastily created (red flag for security software)

---

### 3. **INSUFFICIENT WINDOWS-SPECIFIC METADATA** ⚠️ HIGH
**Location:** `src-tauri/tauri.conf.json` lines 48-66

**Missing Critical Fields:**
- `allowDowngrades` - Not specified
- `wix` configuration - No MSI alternative
- `webviewFixedRuntimePath` - Not configured
- `windowsSubsystem` - Not explicitly set
- File version information incomplete

**Issues:**
- No proper Windows version resource information
- Missing company name in executable properties
- No product version details in file properties
- Missing file description metadata

**Impact:**
- Windows shows incomplete file properties
- Looks unprofessional in Task Manager
- Security software sees incomplete metadata as suspicious

---

### 4. **WEBVIEW INSTALLATION STRATEGY** ⚠️ MEDIUM
**Location:** `src-tauri/tauri.conf.json` lines 52-54

**Current State:**
```json
"webviewInstallMode": {
  "type": "downloadBootstrapper"
}
```

**Issues:**
- Downloads WebView2 at install time (requires internet)
- Can fail on restricted networks
- Adds installation time and complexity
- No offline installation support

**Recommendation:**
- Consider `embedBootstrapper` for better offline support
- Or `fixedRuntime` with bundled WebView2

---

### 5. **MISSING PUBLISHER VERIFICATION** ⚠️ CRITICAL
**Location:** `src-tauri/tauri.conf.json` line 47

**Current State:**
```json
"publisher": "Aloof Garage",
```

**Issues:**
- Publisher name not verified (no code signing)
- No legal entity information
- No contact information in metadata
- No support URL configured

**Impact:**
- Cannot establish trust chain
- SmartScreen has no reputation data
- Users cannot verify authenticity

---

### 6. **INCONSISTENT VERSIONING** ⚠️ LOW
**Locations:** Multiple files

**Current State:**
- `tauri.conf.json`: `"version": "1.0.0"`
- `package.json`: `"version": "1.0.0"`
- `Cargo.toml`: `version = "1.0.0"`

**Status:** ✅ CONSISTENT (Good)

---

### 7. **BUNDLE IDENTIFIER CONCERNS** ⚠️ LOW
**Location:** `src-tauri/tauri.conf.json` line 5

**Current State:**
```json
"identifier": "com.aloofgarage.audiaw",
```

**Issues:**
- Domain ownership not verified
- No reverse DNS validation
- Informal company name ("aloofgarage")

**Recommendation:**
- Use verified domain if available
- Consider more professional identifier

---

### 8. **MISSING INSTALLER FEATURES** ⚠️ MEDIUM

**Not Configured:**
- Custom NSIS scripts for advanced features
- Installer hooks for cleanup/setup
- Registry entries for file associations
- Start menu folder customization
- Desktop shortcut options
- Quick launch options
- Uninstaller branding

---

### 9. **SECURITY POLICY GAPS** ⚠️ MEDIUM
**Location:** `src-tauri/tauri.conf.json` lines 27-29

**Current State:**
```json
"security": {
  "csp": null
}
```

**Issues:**
- No Content Security Policy defined
- Could be more restrictive for production

---

### 10. **MISSING WINDOWS DEFENDER EXCLUSIONS** ⚠️ INFO

**Not Configured:**
- No Windows Defender Application Control (WDAC) policy
- No SmartScreen reputation building strategy
- No Microsoft Partner Network integration

---

## Root Cause Analysis

### Why SmartScreen Flags the Installer:

1. **No Code Signing** - Primary issue
   - Unsigned executables are automatically suspicious
   - No publisher identity verification
   - No trust chain

2. **No Reputation** - Secondary issue
   - New/unknown publisher
   - Low download count
   - No Microsoft Partner verification

3. **Generic Installer** - Tertiary issue
   - Looks like many malware installers
   - Missing professional branding
   - Incomplete metadata

4. **Behavioral Patterns** - Contributing factor
   - Downloads additional components (WebView2)
   - Installs to user directory
   - No established reputation

---

## Recommended Fixes (Priority Order)

### IMMEDIATE (Critical):

1. **Implement Code Signing Support**
   - Add environment variable configuration
   - Support both certificate file and thumbprint
   - Add proper timestamp server
   - Gracefully handle missing certificates

2. **Complete NSIS Configuration**
   - Add license display
   - Configure installer branding
   - Add proper metadata
   - Enable standard Windows features

3. **Enhance Windows Metadata**
   - Add complete file version info
   - Configure proper company details
   - Add support/contact information

### SHORT-TERM (High Priority):

4. **Improve Webview Strategy**
   - Consider embedding bootstrapper
   - Add offline installation support

5. **Add Installer Customization**
   - Custom welcome/finish pages
   - Proper branding throughout
   - Professional appearance

### LONG-TERM (Medium Priority):

6. **Build Reputation**
   - Submit to Microsoft for SmartScreen reputation
   - Get Extended Validation (EV) certificate
   - Join Microsoft Partner Network

7. **Consider MSI Alternative**
   - Add WiX configuration
   - Provide enterprise-friendly MSI installer

---

## Technical Recommendations

### Code Signing Configuration:
```json
"windows": {
  "certificateThumbprint": null,
  "digestAlgorithm": "sha256",
  "timestampUrl": "http://timestamp.digicert.com",
  "signCommand": {
    "cmd": "signtool",
    "args": [
      "sign",
      "/fd", "sha256",
      "/tr", "http://timestamp.digicert.com",
      "/td", "sha256",
      "/f", "%WINDOWS_CERTIFICATE_FILE%",
      "/p", "%WINDOWS_CERTIFICATE_PASSWORD%",
      "%1"
    ]
  }
}
```

### Enhanced NSIS Configuration:
```json
"nsis": {
  "installerIcon": "icons/icon.ico",
  "installMode": "perMachine",
  "languages": ["English"],
  "displayLanguageSelector": false,
  "license": "LICENSE",
  "headerImage": "installer-header.bmp",
  "sidebarImage": "installer-sidebar.bmp",
  "compression": "lzma",
  "deleteAppDataOnUninstall": false,
  "startMenuFolder": "AUDIAW",
  "allowDowngrades": false
}
```

---

## Compliance Checklist

- [ ] Code signing certificate obtained
- [ ] Certificate configured in build pipeline
- [ ] Timestamp server configured
- [ ] Complete file metadata added
- [ ] NSIS installer fully configured
- [ ] License agreement displayed
- [ ] Installer branding added
- [ ] Uninstaller properly configured
- [ ] File associations configured (if needed)
- [ ] WebView2 strategy optimized
- [ ] Build verification script created
- [ ] SmartScreen reputation submission prepared

---

## Next Steps

1. Obtain code signing certificate (EV recommended)
2. Implement all configuration fixes
3. Test signed installer on clean Windows system
4. Submit to Microsoft for reputation building
5. Monitor SmartScreen feedback
6. Document signing process for team

---

## Conclusion

The current Windows installer configuration has **multiple critical deficiencies** that cause security software to flag it as suspicious. The primary issue is **lack of code signing**, followed by incomplete installer configuration and missing metadata.

**All issues are fixable** through configuration changes. With proper code signing and complete metadata, the installer will pass SmartScreen checks and provide a professional user experience.

**Estimated effort:** 4-8 hours for configuration + certificate acquisition time
**Risk if not fixed:** Continued user adoption blocks, reputation damage
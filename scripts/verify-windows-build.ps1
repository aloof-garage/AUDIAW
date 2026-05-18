# AUDIAW Windows Build Verification Script
# This script verifies that the Windows build is properly configured and built

param(
    [switch]$Verbose
)

$ErrorActionPreference = "Stop"

Write-Host "=== AUDIAW Windows Build Verification ===" -ForegroundColor Cyan
Write-Host ""

# Configuration
$ProjectRoot = Split-Path -Parent $PSScriptRoot
$TauriDir = Join-Path $ProjectRoot "src-tauri"
# Cargo workspace uses root target directory
$TargetDir = Join-Path $ProjectRoot "target\release"
$BundleDir = Join-Path $TargetDir "bundle\nsis"
$ConfigFile = Join-Path $TauriDir "tauri.conf.json"
$CargoToml = Join-Path $TauriDir "Cargo.toml"

$VerificationResults = @()

function Add-Result {
    param(
        [string]$Check,
        [bool]$Passed,
        [string]$Message
    )
    
    $VerificationResults += [PSCustomObject]@{
        Check = $Check
        Passed = $Passed
        Message = $Message
    }
    
    $icon = if ($Passed) { "[OK]" } else { "[FAIL]" }
    $color = if ($Passed) { "Green" } else { "Red" }
    Write-Host "[$icon] $Check" -ForegroundColor $color
    if ($Message) {
        Write-Host "    $Message" -ForegroundColor Gray
    }
}

# 1. Check Configuration Files
Write-Host "Checking Configuration Files..." -ForegroundColor Yellow

if (Test-Path $ConfigFile) {
    $config = Get-Content $ConfigFile -Raw | ConvertFrom-Json
    
    # Check basic metadata
    $hasProductName = $config.productName -eq "AUDIAW"
    Add-Result "Product Name" $hasProductName "Expected: AUDIAW, Found: $($config.productName)"
    
    $hasVersion = $config.version -match '^\d+\.\d+\.\d+$'
    Add-Result "Version Format" $hasVersion "Version: $($config.version)"
    
    $hasIdentifier = $config.identifier -eq "com.aloofgarage.audiaw"
    Add-Result "Bundle Identifier" $hasIdentifier "Identifier: $($config.identifier)"
    
    # Check bundle configuration
    $hasNsis = $config.bundle.targets -contains "nsis"
    Add-Result "NSIS Target" $hasNsis "NSIS installer configured"
    
    $hasIcon = $config.bundle.icon -and $config.bundle.icon.Count -gt 0
    Add-Result "Icon Configuration" $hasIcon "Icons configured: $($config.bundle.icon.Count)"
    
    # Check Windows-specific config
    $hasWindowsConfig = $null -ne $config.bundle.windows
    Add-Result "Windows Bundle Config" $hasWindowsConfig "Windows configuration present"
    
    if ($hasWindowsConfig) {
        $hasNsisConfig = $null -ne $config.bundle.windows.nsis
        Add-Result "NSIS Configuration" $hasNsisConfig "NSIS settings configured"
        
        if ($hasNsisConfig) {
            $installMode = $config.bundle.windows.nsis.installMode
            $validInstallMode = $installMode -in @("currentUser", "perMachine", "both")
            Add-Result "Install Mode" $validInstallMode "Install mode: $installMode"
        }
    }
} else {
    Add-Result "tauri.conf.json" $false "File not found at: $ConfigFile"
}

Write-Host ""

# 2. Check Build Artifacts
Write-Host "Checking Build Artifacts..." -ForegroundColor Yellow

$exePath = Join-Path $TargetDir "audiaw.exe"
if (Test-Path $exePath) {
    Add-Result "Executable Built" $true "Found: audiaw.exe"
    
    # Check file size (should be reasonable)
    $fileSize = (Get-Item $exePath).Length
    $fileSizeMB = [math]::Round($fileSize / 1MB, 2)
    $reasonableSize = $fileSize -gt 1MB -and $fileSize -lt 500MB
    Add-Result "Executable Size" $reasonableSize "Size: $fileSizeMB MB"
    
    # Check if it's a valid PE file
    try {
        $peHeader = Get-Content $exePath -Encoding Byte -TotalCount 2
        $isPE = $peHeader[0] -eq 0x4D -and $peHeader[1] -eq 0x5A  # "MZ" header
        Add-Result "Valid PE Format" $isPE "Windows executable format verified"
    } catch {
        Add-Result "Valid PE Format" $false "Could not verify PE format"
    }
} else {
    Add-Result "Executable Built" $false "audiaw.exe not found in target/release"
}

Write-Host ""

# 3. Check NSIS Installer
Write-Host "Checking NSIS Installer..." -ForegroundColor Yellow

if (Test-Path $BundleDir) {
    $installers = Get-ChildItem $BundleDir -Filter "*.exe" -ErrorAction SilentlyContinue
    
    if ($installers.Count -gt 0) {
        $installer = $installers[0]
        Add-Result "NSIS Installer" $true "Found: $($installer.Name)"
        
        $installerSizeMB = [math]::Round($installer.Length / 1MB, 2)
        Add-Result "Installer Size" $true "Size: $installerSizeMB MB"
        
        # Check naming convention
        $correctName = $installer.Name -match "AUDIAW.*Setup.*\.exe"
        Add-Result "Installer Naming" $correctName "Name: $($installer.Name)"
        
        if ($Verbose) {
            Write-Host "    Full path: $($installer.FullName)" -ForegroundColor Gray
        }
    } else {
        Add-Result "NSIS Installer" $false "No .exe installer found in bundle/nsis"
    }
} else {
    Add-Result "NSIS Installer" $false "Bundle directory not found: $BundleDir"
}

Write-Host ""

# 4. Check Icon Files
Write-Host "Checking Icon Files..." -ForegroundColor Yellow

$iconDir = Join-Path $TauriDir "icons"
$requiredIcons = @(
    "icon.ico",
    "icon.png",
    "32x32.png",
    "128x128.png"
)

foreach ($icon in $requiredIcons) {
    $iconPath = Join-Path $iconDir $icon
    $exists = Test-Path $iconPath
    Add-Result "Icon: $icon" $exists $(if ($exists) { "Present" } else { "Missing" })
}

Write-Host ""

# 5. Check Dependencies
Write-Host "Checking Dependencies..." -ForegroundColor Yellow

if (Test-Path $CargoToml) {
    $cargoContent = Get-Content $CargoToml -Raw
    
    $hasTauri = $cargoContent -match 'tauri\s*='
    Add-Result "Tauri Dependency" $hasTauri "Tauri framework included"
    
    $hasTauriBuild = $cargoContent -match 'tauri-build\s*='
    Add-Result "Tauri Build" $hasTauriBuild "Build dependencies configured"
    
    # Check that winres is NOT present (should be removed)
    $hasWinres = $cargoContent -match 'winres\s*='
    Add-Result "No Duplicate Resources" (-not $hasWinres) $(if ($hasWinres) { "winres should be removed" } else { "Clean configuration" })
} else {
    Add-Result "Cargo.toml" $false "File not found"
}

Write-Host ""

# 6. Summary
Write-Host "=== Verification Summary ===" -ForegroundColor Cyan
Write-Host ""

$totalChecks = $VerificationResults.Count
$passedChecks = ($VerificationResults | Where-Object { $_.Passed }).Count
$failedChecks = $totalChecks - $passedChecks

Write-Host "Total Checks: $totalChecks" -ForegroundColor White
Write-Host "Passed: $passedChecks" -ForegroundColor Green
Write-Host "Failed: $failedChecks" -ForegroundColor $(if ($failedChecks -eq 0) { "Green" } else { "Red" })
Write-Host ""

$successRate = if ($totalChecks -gt 0) { [math]::Round(($passedChecks / $totalChecks) * 100, 1) } else { 0 }
Write-Host "Success Rate: $successRate%" -ForegroundColor $(if ($successRate -ge 90) { "Green" } elseif ($successRate -ge 70) { "Yellow" } else { "Red" })

Write-Host ""

# Failed checks details
if ($failedChecks -gt 0) {
    Write-Host "Failed Checks:" -ForegroundColor Red
    $VerificationResults | Where-Object { -not $_.Passed } | ForEach-Object {
        Write-Host "  - $($_.Check): $($_.Message)" -ForegroundColor Red
    }
    Write-Host ""
}

# Recommendations
Write-Host "=== Recommendations ===" -ForegroundColor Cyan
Write-Host ""

if (-not (Test-Path $exePath)) {
    Write-Host "• Run 'cargo build --release' in src-tauri directory" -ForegroundColor Yellow
}

if (-not (Test-Path $BundleDir)) {
    Write-Host "• Run 'pnpm tauri build' to create the installer" -ForegroundColor Yellow
}

if ($failedChecks -gt 0) {
    Write-Host "• Review failed checks and fix configuration issues" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "For more information, see WINDOWS_RELEASE_GUIDE.md" -ForegroundColor Gray

# Exit with appropriate code
exit $(if ($failedChecks -eq 0) { 0 } else { 1 })

# Made with Bob

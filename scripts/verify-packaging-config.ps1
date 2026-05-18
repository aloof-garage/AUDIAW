# AUDIAW Windows Packaging Configuration Verification Script
# This script verifies that all packaging configuration is correct and complete

Write-Host "`n=== AUDIAW Windows Packaging Configuration Verification ===" -ForegroundColor Cyan
Write-Host "Checking configuration for Microsoft Defender/SmartScreen compliance...`n" -ForegroundColor Cyan

$errors = 0
$warnings = 0
$passed = 0

function Test-ConfigItem {
    param(
        [string]$Name,
        [bool]$Condition,
        [string]$Message,
        [string]$Severity = "Error"
    )
    
    if ($Condition) {
        Write-Host "✓ $Name" -ForegroundColor Green
        $script:passed++
    } else {
        if ($Severity -eq "Error") {
            Write-Host "✗ $Name - $Message" -ForegroundColor Red
            $script:errors++
        } else {
            Write-Host "⚠ $Name - $Message" -ForegroundColor Yellow
            $script:warnings++
        }
    }
}

# Check if tauri.conf.json exists
Write-Host "1. Checking Configuration Files..." -ForegroundColor Yellow
$tauriConfigPath = "src-tauri/tauri.conf.json"
if (Test-Path $tauriConfigPath) {
    Write-Host "✓ tauri.conf.json found" -ForegroundColor Green
    $passed++
    
    # Parse JSON
    $config = Get-Content $tauriConfigPath -Raw | ConvertFrom-Json
    
    # Check basic metadata
    Write-Host "`n2. Checking Basic Metadata..." -ForegroundColor Yellow
    Test-ConfigItem "Product Name" ($config.productName -eq "AUDIAW") "Product name should be 'AUDIAW'"
    Test-ConfigItem "Version Format" ($config.version -match '^\d+\.\d+\.\d+$') "Version should be in semver format (x.y.z)"
    Test-ConfigItem "Identifier" ($config.identifier -ne $null -and $config.identifier -ne "") "Bundle identifier is required"
    
    # Check bundle configuration
    Write-Host "`n3. Checking Bundle Configuration..." -ForegroundColor Yellow
    Test-ConfigItem "Bundle Active" ($config.bundle.active -eq $true) "Bundle must be active"
    Test-ConfigItem "NSIS Target" ($config.bundle.targets -contains "nsis") "NSIS target is required for Windows"
    Test-ConfigItem "Copyright" ($config.bundle.copyright -match "Copyright.*\d{4}") "Copyright should include year"
    Test-ConfigItem "Publisher" ($config.bundle.publisher -ne $null -and $config.bundle.publisher -ne "") "Publisher name is required"
    Test-ConfigItem "Homepage" ($config.bundle.homepage -match "^https?://") "Homepage URL is required"
    Test-ConfigItem "Short Description" ($config.bundle.shortDescription.Length -gt 10) "Short description should be meaningful"
    Test-ConfigItem "Long Description" ($config.bundle.longDescription.Length -gt 50) "Long description should be detailed"
    
    # Check Windows-specific configuration
    Write-Host "`n4. Checking Windows Configuration..." -ForegroundColor Yellow
    $winConfig = $config.bundle.windows
    Test-ConfigItem "Digest Algorithm" ($winConfig.digestAlgorithm -eq "sha256") "Should use SHA256 for signing"
    Test-ConfigItem "Timestamp URL" ($winConfig.timestampUrl -ne $null -and $winConfig.timestampUrl -ne "") "Timestamp URL is required for code signing"
    Test-ConfigItem "Allow Downgrades" ($winConfig.allowDowngrades -eq $false) "Should not allow downgrades for security"
    Test-ConfigItem "WebView Install Mode" ($winConfig.webviewInstallMode.type -eq "embedBootstrapper") "Should embed WebView2 bootstrapper"
    
    # Check NSIS configuration
    Write-Host "`n5. Checking NSIS Installer Configuration..." -ForegroundColor Yellow
    $nsisConfig = $winConfig.nsis
    Test-ConfigItem "Installer Icon" ($nsisConfig.installerIcon -ne $null) "Installer icon is required"
    Test-ConfigItem "Install Mode" ($nsisConfig.installMode -eq "perMachine") "Should install per-machine for better compatibility"
    Test-ConfigItem "Compression" ($nsisConfig.compression -eq "lzma") "Should use LZMA compression"
    Test-ConfigItem "Start Menu Folder" ($nsisConfig.startMenuFolder -ne $null) "Start menu folder should be configured"
    Test-ConfigItem "License File" ($nsisConfig.license -ne $null) "License file should be displayed" "Warning"
    
    # Check icon files
    Write-Host "`n6. Checking Icon Files..." -ForegroundColor Yellow
    $iconPath = "src-tauri/icons/icon.ico"
    Test-ConfigItem "Windows Icon" (Test-Path $iconPath) "icon.ico not found at $iconPath"
    
    # Check security configuration
    Write-Host "`n7. Checking Security Configuration..." -ForegroundColor Yellow
    $csp = $config.app.security.csp
    Test-ConfigItem "Content Security Policy" ($csp -ne $null -and $csp -ne "") "CSP should be configured for production"
    
    # Check code signing setup
    Write-Host "`n8. Checking Code Signing Setup..." -ForegroundColor Yellow
    $certFile = $env:WINDOWS_CERTIFICATE_FILE
    $certPassword = $env:WINDOWS_CERTIFICATE_PASSWORD
    $certThumbprint = $env:WINDOWS_CERTIFICATE_THUMBPRINT
    
    if ($certFile -and $certPassword) {
        Write-Host "✓ Certificate file environment variables set" -ForegroundColor Green
        $passed++
        
        if (Test-Path $certFile) {
            Write-Host "✓ Certificate file exists: $certFile" -ForegroundColor Green
            $passed++
        } else {
            Write-Host "✗ Certificate file not found: $certFile" -ForegroundColor Red
            $errors++
        }
    } elseif ($certThumbprint) {
        Write-Host "✓ Certificate thumbprint set (EV certificate)" -ForegroundColor Green
        $passed++
    } else {
        Write-Host "⚠ No code signing certificate configured" -ForegroundColor Yellow
        Write-Host "  Installer will be unsigned and trigger security warnings" -ForegroundColor Yellow
        Write-Host "  See CODE_SIGNING_SETUP.md for instructions" -ForegroundColor Yellow
        $warnings++
    }
    
    # Check for signtool
    $signtool = Get-Command signtool.exe -ErrorAction SilentlyContinue
    if ($signtool) {
        Write-Host "✓ signtool.exe found: $($signtool.Source)" -ForegroundColor Green
        $passed++
    } else {
        Write-Host "⚠ signtool.exe not found - install Windows SDK" -ForegroundColor Yellow
        Write-Host "  Required for code signing" -ForegroundColor Yellow
        $warnings++
    }
    
    # Check version consistency
    Write-Host "`n9. Checking Version Consistency..." -ForegroundColor Yellow
    $packageJsonPath = "package.json"
    if (Test-Path $packageJsonPath) {
        $packageJson = Get-Content $packageJsonPath -Raw | ConvertFrom-Json
        Test-ConfigItem "Version Consistency" ($packageJson.version -eq $config.version) "package.json version ($($packageJson.version)) should match tauri.conf.json ($($config.version))"
    }
    
    $cargoTomlPath = "src-tauri/Cargo.toml"
    if (Test-Path $cargoTomlPath) {
        $cargoContent = Get-Content $cargoTomlPath -Raw
        if ($cargoContent -match 'version\s*=\s*"([^"]+)"') {
            $cargoVersion = $matches[1]
            Test-ConfigItem "Cargo Version Consistency" ($cargoVersion -eq $config.version) "Cargo.toml version ($cargoVersion) should match tauri.conf.json ($($config.version))"
        }
    }
    
    # Check file associations
    Write-Host "`n10. Checking File Associations..." -ForegroundColor Yellow
    if ($winConfig.fileAssociations) {
        Write-Host "✓ File associations configured" -ForegroundColor Green
        $passed++
        foreach ($assoc in $winConfig.fileAssociations) {
            Write-Host "  - .$($assoc.ext): $($assoc.name)" -ForegroundColor Gray
        }
    } else {
        Write-Host "⚠ No file associations configured" -ForegroundColor Yellow
        Write-Host "  Consider adding .audiaw file association" -ForegroundColor Yellow
        $warnings++
    }
    
} else {
    Write-Host "✗ tauri.conf.json not found at $tauriConfigPath" -ForegroundColor Red
    $errors++
}

# Summary
Write-Host "`n=== Verification Summary ===" -ForegroundColor Cyan
Write-Host "Passed:   $passed" -ForegroundColor Green
Write-Host "Warnings: $warnings" -ForegroundColor Yellow
Write-Host "Errors:   $errors" -ForegroundColor Red

if ($errors -eq 0 -and $warnings -eq 0) {
    Write-Host "`n✓ Configuration is production-ready!" -ForegroundColor Green
    Write-Host "You can build the Windows installer with: pnpm run build:windows" -ForegroundColor Green
    exit 0
} elseif ($errors -eq 0) {
    Write-Host "`n⚠ Configuration is functional but has warnings" -ForegroundColor Yellow
    Write-Host "Review warnings above and consider addressing them" -ForegroundColor Yellow
    exit 0
} else {
    Write-Host "`n✗ Configuration has errors that must be fixed" -ForegroundColor Red
    Write-Host "Fix errors above before building" -ForegroundColor Red
    exit 1
}

# Made with Bob

# Simple AUDIAW Configuration Check
Write-Host "`nAUDIAW Windows Packaging Configuration Check`n" -ForegroundColor Cyan

$errors = 0
$warnings = 0

# Check tauri.conf.json
$configPath = "src-tauri/tauri.conf.json"
if (Test-Path $configPath) {
    Write-Host "[OK] tauri.conf.json found" -ForegroundColor Green
    $config = Get-Content $configPath -Raw | ConvertFrom-Json
    
    # Basic checks
    if ($config.productName -eq "AUDIAW") {
        Write-Host "[OK] Product name: AUDIAW" -ForegroundColor Green
    } else {
        Write-Host "[ERROR] Product name incorrect" -ForegroundColor Red
        $errors++
    }
    
    if ($config.bundle.windows.timestampUrl) {
        Write-Host "[OK] Timestamp URL configured" -ForegroundColor Green
    } else {
        Write-Host "[ERROR] Timestamp URL missing" -ForegroundColor Red
        $errors++
    }
    
    if ($config.bundle.windows.nsis.installMode -eq "perMachine") {
        Write-Host "[OK] Install mode: perMachine" -ForegroundColor Green
    } else {
        Write-Host "[WARN] Install mode should be perMachine" -ForegroundColor Yellow
        $warnings++
    }
    
    if ($config.app.security.csp) {
        Write-Host "[OK] Content Security Policy configured" -ForegroundColor Green
    } else {
        Write-Host "[WARN] CSP not configured" -ForegroundColor Yellow
        $warnings++
    }
} else {
    Write-Host "[ERROR] tauri.conf.json not found" -ForegroundColor Red
    $errors++
}

# Check code signing
Write-Host "`nCode Signing Status:" -ForegroundColor Cyan
if ($env:WINDOWS_CERTIFICATE_FILE -or $env:WINDOWS_CERTIFICATE_THUMBPRINT) {
    Write-Host "[OK] Certificate configured" -ForegroundColor Green
} else {
    Write-Host "[WARN] No certificate - installer will be unsigned" -ForegroundColor Yellow
    $warnings++
}

# Summary
Write-Host "`nSummary:" -ForegroundColor Cyan
Write-Host "Errors: $errors" -ForegroundColor $(if ($errors -gt 0) { "Red" } else { "Green" })
Write-Host "Warnings: $warnings" -ForegroundColor $(if ($warnings -gt 0) { "Yellow" } else { "Green" })

if ($errors -eq 0) {
    Write-Host "`n[SUCCESS] Configuration is ready for build" -ForegroundColor Green
    exit 0
} else {
    Write-Host "`n[FAILED] Fix errors before building" -ForegroundColor Red
    exit 1
}

# Made with Bob

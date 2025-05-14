# PowerShell script to verify PostgreSQL installation
$ErrorActionPreference = "Stop"

Write-Host "`n=== PostgreSQL Installation Verification ===`n"

# Check common PostgreSQL installation paths
$possiblePaths = @(
    "C:\Program Files\PostgreSQL\17\bin",
    "C:\Program Files\PostgreSQL\16\bin",
    "C:\Program Files\PostgreSQL\15\bin",
    "C:\Program Files\PostgreSQL\14\bin"
)

Write-Host "Checking PostgreSQL installation paths..."
$postgresPath = $null
foreach ($path in $possiblePaths) {
    if (Test-Path $path) {
        $postgresPath = $path
        Write-Host "Found PostgreSQL at: $path"
        break
    }
}

if ($null -eq $postgresPath) {
    Write-Host "`n❌ PostgreSQL installation not found in common locations."
    Write-Host "Please verify that PostgreSQL is installed correctly."
    exit 1
}

# Check if PostgreSQL is in PATH
Write-Host "`nChecking PATH environment variable..."
$currentPath = [Environment]::GetEnvironmentVariable("Path", "User")
if ($currentPath -like "*$postgresPath*") {
    Write-Host "✅ PostgreSQL is in your PATH"
} else {
    Write-Host "❌ PostgreSQL is not in your PATH"
    Write-Host "Adding PostgreSQL to PATH..."
    $newPath = $currentPath + ";" + $postgresPath
    [Environment]::SetEnvironmentVariable("Path", $newPath, "User")
    $env:Path = [Environment]::GetEnvironmentVariable("Path", "User")
}

# Try to run PostgreSQL commands
Write-Host "`nTesting PostgreSQL commands..."
try {
    # Try to get PostgreSQL version
    $version = & "$postgresPath\psql.exe" --version
    Write-Host "✅ PostgreSQL version: $version"
} catch {
    Write-Host "❌ Could not run psql command"
    Write-Host "Error: $_"
}

# Check if PostgreSQL service is running
Write-Host "`nChecking PostgreSQL service status..."
$service = Get-Service -Name "postgresql*" -ErrorAction SilentlyContinue
if ($service) {
    Write-Host "✅ PostgreSQL service found: $($service.Name)"
    Write-Host "Status: $($service.Status)"
} else {
    Write-Host "❌ PostgreSQL service not found"
}

# Try to connect to PostgreSQL
Write-Host "`nAttempting to connect to PostgreSQL..."
try {
    $env:PGPASSWORD = "Nyashaushe@2399"  # Your actual password
    $result = & "$postgresPath\psql.exe" -U postgres -c "SELECT version();" -t
    Write-Host "✅ Successfully connected to PostgreSQL"
    Write-Host "Server version: $result"
} catch {
    Write-Host "❌ Could not connect to PostgreSQL"
    Write-Host "Error: $_"
    Write-Host "`nTroubleshooting tips:"
    Write-Host "1. Make sure PostgreSQL service is running"
    Write-Host "2. Verify your password is correct"
    Write-Host "3. Check if PostgreSQL is listening on port 5432"
}

Write-Host "`n=== Verification Complete ===`n"
Write-Host "If you see any ❌ errors above, please:"
Write-Host "1. Restart your PowerShell window"
Write-Host "2. Make sure PostgreSQL is installed correctly"
Write-Host "3. Verify your PostgreSQL password"
Write-Host "4. Check if the PostgreSQL service is running" 
# PowerShell script to add PostgreSQL to PATH
$ErrorActionPreference = "Stop"

# Common PostgreSQL installation paths
$possiblePaths = @(
    "C:\Program Files\PostgreSQL\17\bin",
    "C:\Program Files\PostgreSQL\16\bin",
    "C:\Program Files\PostgreSQL\15\bin",
    "C:\Program Files\PostgreSQL\14\bin",
    "C:\Program Files\PostgreSQL\13\bin",
    "C:\Program Files\PostgreSQL\12\bin"
)

# Find PostgreSQL installation
$postgresPath = $null
foreach ($path in $possiblePaths) {
    if (Test-Path $path) {
        $postgresPath = $path
        break
    }
}

if ($null -eq $postgresPath) {
    Write-Host "PostgreSQL installation not found in common locations."
    Write-Host "Please enter the full path to your PostgreSQL bin directory:"
    $postgresPath = Read-Host
}

if (-not (Test-Path $postgresPath)) {
    Write-Host "Error: The specified path does not exist: $postgresPath"
    exit 1
}

# Get current PATH
$currentPath = [Environment]::GetEnvironmentVariable("Path", "User")

# Check if PostgreSQL is already in PATH
if ($currentPath -like "*$postgresPath*") {
    Write-Host "PostgreSQL is already in your PATH."
} else {
    # Add PostgreSQL to PATH
    $newPath = $currentPath + ";" + $postgresPath
    [Environment]::SetEnvironmentVariable("Path", $newPath, "User")
    Write-Host "PostgreSQL has been added to your PATH."
    Write-Host "New PATH: $newPath"
}

# Verify the addition
Write-Host "`nVerifying PostgreSQL installation..."
$env:Path = [Environment]::GetEnvironmentVariable("Path", "User")
if (Get-Command psql -ErrorAction SilentlyContinue) {
    Write-Host "Success! PostgreSQL is now accessible from the command line."
    Write-Host "You can verify by running: psql --version"
} else {
    Write-Host "Warning: PostgreSQL commands are not yet available."
    Write-Host "Please restart your PowerShell window for the changes to take effect."
}

Write-Host "`nTo use PostgreSQL, restart your PowerShell window and run:"
Write-Host "psql -U postgres" 
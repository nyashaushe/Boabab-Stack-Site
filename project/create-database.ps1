# PowerShell script to create the database
$ErrorActionPreference = "Stop"

Write-Host "`n=== Creating baobab_stack Database ===`n"

# Set PostgreSQL password
$env:PGPASSWORD = "Nyashaushe@2399"

# PostgreSQL bin path
$postgresPath = "C:\Program Files\PostgreSQL\17\bin"

try {
    # Check if database exists
    Write-Host "Checking if database exists..."
    $dbExists = & "$postgresPath\psql.exe" -U postgres -lqt | findstr "baobab_stack"
    
    if ($dbExists) {
        Write-Host "✅ Database 'baobab_stack' already exists"
    } else {
        # Create database
        Write-Host "Creating database 'baobab_stack'..."
        & "$postgresPath\psql.exe" -U postgres -c "CREATE DATABASE baobab_stack;"
        Write-Host "✅ Database 'baobab_stack' created successfully"
    }

    # Verify database creation
    Write-Host "`nVerifying database..."
    & "$postgresPath\psql.exe" -U postgres -d baobab_stack -c "SELECT current_database();"
    Write-Host "✅ Successfully connected to baobab_stack database"

    # List all databases
    Write-Host "`nAvailable databases:"
    & "$postgresPath\psql.exe" -U postgres -l

} catch {
    Write-Host "❌ Error: $_"
} finally {
    # Clear the password from environment
    Remove-Item Env:\PGPASSWORD
}

Write-Host "`n=== Database Setup Complete ===`n" 
# Create backup directory
$backupDir = "image-backups"
New-Item -ItemType Directory -Path $backupDir -Force | Out-Null
Write-Host "✅ Created backup directory: $backupDir"

# Find deleted JPG/JPEG files
Write-Host "📝 Searching for deleted JPG/JPEG files in Git history..."
$gitLog = git log --diff-filter=D --summary
$deletedFiles = @()

foreach ($line in $gitLog) {
    if ($line -match "delete mode \d+ (.+\.jpe?g)") {
        $deletedFiles += $matches[1]
    }
}

if ($deletedFiles.Count -eq 0) {
    Write-Host "❌ No deleted JPG/JPEG files found in Git history."
    exit
}

Write-Host "Found $($deletedFiles.Count) deleted JPG/JPEG files:"
foreach ($file in $deletedFiles) {
    Write-Host "- $file"
}

# Recover each file
Write-Host "`n🔄 Recovering files..."
$recoveredCount = 0

foreach ($file in $deletedFiles) {
    try {
        # Find last commit with this file
        $lastCommit = git rev-list -n 1 HEAD -- $file
        
        if (-not $lastCommit) {
            Write-Host "⚠️ Could not find commit history for: $file"
            continue
        }
        
        # Create directory structure
        $backupPath = Join-Path $backupDir $file
        $backupFolder = Split-Path $backupPath -Parent
        if (-not (Test-Path $backupFolder)) {
            New-Item -ItemType Directory -Path $backupFolder -Force | Out-Null
        }
        
        # Extract file
        git show "$lastCommit`:$file" | Out-File -FilePath $backupPath -Encoding byte
        
        Write-Host "✅ Recovered: $file -> $backupPath"
        $recoveredCount++
    } catch {
        Write-Host "❌ Failed to recover $file: $_"
    }
}

Write-Host "`n🎉 Recovery complete! Recovered $recoveredCount of $($deletedFiles.Count) files."
Write-Host "Files saved to: $backupDir" 
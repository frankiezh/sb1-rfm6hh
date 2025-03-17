/**
 * Recover original JPG/JPEG files from Git history
 * Windows-compatible version
 */
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BACKUP_DIR = path.resolve(__dirname, '../image-backups');

// Create backup directory if it doesn't exist
if (!fs.existsSync(BACKUP_DIR)) {
  fs.mkdirSync(BACKUP_DIR, { recursive: true });
  console.log(`✅ Created backup directory: ${BACKUP_DIR}`);
}

// Find deleted JPG/JPEG files in Git history
console.log('📝 Searching for deleted JPG/JPEG files in Git history...');

// Get git log
const gitLog = execSync('git log --diff-filter=D --summary', { encoding: 'utf8' });
const deletedFiles = [];

// Parse the log for deleted jpg/jpeg files
const lines = gitLog.split('\n');
for (const line of lines) {
  const match = line.match(/delete mode \d+ (.+\.jpe?g)/i);
  if (match) {
    deletedFiles.push(match[1]);
  }
}

if (deletedFiles.length === 0) {
  console.log('❌ No deleted JPG/JPEG files found in Git history.');
  process.exit(0);
}

console.log(`Found ${deletedFiles.length} deleted JPG/JPEG files:`);
deletedFiles.forEach(file => console.log(`- ${file}`));

// Recover each file
console.log('\n🔄 Recovering files...');
let recoveredCount = 0;

for (const file of deletedFiles) {
  try {
    // Find the last commit that modified the file before deletion
    const lastCommit = execSync(
      `git rev-list -n 1 HEAD -- "${file}"`, 
      { encoding: 'utf8' }
    ).trim();
    
    if (!lastCommit) {
      console.log(`⚠️ Could not find commit history for: ${file}`);
      continue;
    }
    
    // Create directory structure in backup folder
    const backupPath = path.join(BACKUP_DIR, file);
    const backupDir = path.dirname(backupPath);
    
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }
    
    // Extract file from Git history and save binary content
    const fileContent = execSync(`git show ${lastCommit}:"${file}"`, { encoding: 'buffer' });
    fs.writeFileSync(backupPath, fileContent);
    
    console.log(`✅ Recovered: ${file} -> ${backupPath}`);
    recoveredCount++;
  } catch (error) {
    console.error(`❌ Failed to recover ${file}: ${error.message}`);
  }
}

console.log(`\n🎉 Recovery complete! Recovered ${recoveredCount} of ${deletedFiles.length} files.`);
console.log(`Files saved to: ${BACKUP_DIR}`); 
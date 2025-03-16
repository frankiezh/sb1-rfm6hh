/**
 * Find all JPG references in the codebase
 */
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

try {
  // Windows PowerShell compatible command
  const command = `Get-ChildItem -Path "${ROOT_DIR}/src" -Recurse -File | Where-Object { $_.Extension -match "\\.tsx?|\\.jsx?|\\.html|\\.css" } | ForEach-Object { Select-String -Path $_.FullName -Pattern "\\.jpe?g|\\.JPE?G" }`;
  
  const result = execSync(`powershell -Command "${command}"`).toString();
  
  console.log('JPG references found:');
  console.log(result || 'None!');
  
  // Check for physical JPG files
  const jpgFilesCommand = `Get-ChildItem -Path "${ROOT_DIR}/public" -Recurse -Include "*.jpg","*.jpeg","*.JPG","*.JPEG" | ForEach-Object { $_.FullName }`;
  const jpgFiles = execSync(`powershell -Command "${jpgFilesCommand}"`).toString();
  
  console.log('\nJPG files found in public directory:');
  console.log(jpgFiles || 'None!');
  
} catch (error) {
  console.error('Error running search:', error.message);
} 
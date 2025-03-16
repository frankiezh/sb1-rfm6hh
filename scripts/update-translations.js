import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const TRANSLATIONS_PATH = path.resolve(__dirname, '../src/lib/translations.ts');

try {
  // Read the translations file
  let content = fs.readFileSync(TRANSLATIONS_PATH, 'utf8');
  
  // Replace all JPG references with WebP
  const originalContent = content;
  content = content.replace(/\.(jpe?g|JPE?G)(['"])/g, '.webp$2');
  
  // Count replacements
  const replacements = (originalContent.match(/\.(jpe?g|JPE?G)(['"])/g) || []).length;
  
  // Write back if changes were made
  if (replacements > 0) {
    fs.writeFileSync(TRANSLATIONS_PATH, content, 'utf8');
    console.log(`✅ Updated ${replacements} JPG references to WebP in translations file`);
  } else {
    console.log('No JPG references found in translations file');
  }
} catch (error) {
  console.error('Error updating translations:', error.message);
} 
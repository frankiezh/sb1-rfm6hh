/**
 * Convert portfolio images to WebP
 */
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { globSync } from 'glob';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PUBLIC_DIR = path.resolve(__dirname, '../public');

// Find all JPG files in the public directory
const jpgFiles = globSync('**/*.{jpg,jpeg,JPG,JPEG}', { 
  cwd: PUBLIC_DIR, 
  absolute: true 
});

console.log(`Found ${jpgFiles.length} JPG files to convert:`);
jpgFiles.forEach(file => console.log(`- ${path.relative(PUBLIC_DIR, file)}`));

// Convert each JPG to WebP
async function convertFiles() {
  for (const file of jpgFiles) {
    const webpFile = file.replace(/\.(jpe?g|JPE?G)$/i, '.webp');
    
    try {
      await sharp(file)
        .webp({ quality: 80 })
        .toFile(webpFile);
        
      console.log(`✅ Converted: ${path.relative(PUBLIC_DIR, file)} → ${path.relative(PUBLIC_DIR, webpFile)}`);
      
      // Optionally delete the original
      fs.unlinkSync(file);
      console.log(`🗑️ Deleted original: ${path.relative(PUBLIC_DIR, file)}`);
    } catch (error) {
      console.error(`❌ Failed to convert ${file}: ${error.message}`);
    }
  }
}

convertFiles(); 
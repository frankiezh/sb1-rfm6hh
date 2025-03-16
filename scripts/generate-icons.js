/**
 * Generate PWA icons from your logo
 */
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Source logo (update this path to your actual logo)
const SOURCE_LOGO = path.resolve(__dirname, '../public/logo.svg');
const OUTPUT_DIR = path.resolve(__dirname, '../public/icons');

// Create output directory if it doesn't exist
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// PWA icon sizes
const sizes = [
  { name: 'icon-192x192.png', size: 192 },
  { name: 'icon-512x512.png', size: 512 },
  { name: 'apple-touch-icon.png', size: 180 },
];

async function generateIcons() {
  console.log('🖼 Generating PWA icons...');
  
  // If you have an SVG logo
  if (SOURCE_LOGO.endsWith('.svg')) {
    // Create a temporary PNG first
    const tempPng = path.resolve(OUTPUT_DIR, 'temp-logo.png');
    await sharp(SOURCE_LOGO)
      .resize(1024, 1024)
      .toFile(tempPng);
      
    // Now generate all sizes from the PNG
    for (const icon of sizes) {
      await sharp(tempPng)
        .resize(icon.size, icon.size)
        .toFile(path.resolve(OUTPUT_DIR, icon.name));
      
      console.log(`✅ Generated: ${icon.name}`);
    }
    
    // Clean up temp file
    fs.unlinkSync(tempPng);
  } else {
    // If source is already a bitmap image
    for (const icon of sizes) {
      await sharp(SOURCE_LOGO)
        .resize(icon.size, icon.size)
        .toFile(path.resolve(OUTPUT_DIR, icon.name));
      
      console.log(`✅ Generated: ${icon.name}`);
    }
  }
  
  console.log('✅ Icon generation complete!');
}

generateIcons().catch(err => {
  console.error('Error generating icons:', err);
  process.exit(1);
}); 
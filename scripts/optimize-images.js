/**
 * WebP Image Processor for Lighthouse Optimization
 * 
 * This script optimizes critical images needed for LCP and background
 */
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Both critical images needed
const CRITICAL_IMAGES = [
  {
    source: './src/assets/hero-source/hero-upholstery-workshop.jpg',
    output: './public/images/hero/upholstery-workshop-zurich',
    sizes: [
      { suffix: 'large', width: 1920, height: 1080, quality: 80 },
      { suffix: 'medium', width: 1280, height: 720, quality: 75 },
      { suffix: 'small', width: 640, height: 360, quality: 70 }
    ]
  },
  {
    // This is the image that was attached to the chat
    source: './src/assets/hero-source/background.jpg', 
    output: './public/background',
    sizes: [
      { suffix: '', width: 300, height: 300, quality: 75 }
    ]
  }
];

async function optimizeImages() {
  console.log('🖼 Starting WebP conversion for Lighthouse optimization...');
  
  // Ensure output directories exist
  fs.mkdirSync('./public/images/hero', { recursive: true });
  
  // Process each critical image
  for (const image of CRITICAL_IMAGES) {
    if (!fs.existsSync(image.source)) {
      console.error(`❌ Source image not found: ${image.source}`);
      console.log(`   Please save your image at: ${image.source}`);
      continue;
    }
    
    console.log(`\nProcessing: ${path.basename(image.source)}`);
    
    // Create output directory if needed
    const outputDir = path.dirname(image.output);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    for (const size of image.sizes) {
      const outputPath = `${image.output}${size.suffix ? '-' + size.suffix : ''}.webp`;
      
      try {
        await sharp(image.source)
          .resize(size.width, size.height, {
            fit: 'cover',
            position: 'center'
          })
          .webp({
            quality: size.quality,
            effort: 6
          })
          .toFile(outputPath);
          
        console.log(`  ✓ Generated: ${outputPath}`);
      } catch (error) {
        console.error(`  ❌ Failed to generate ${outputPath}: ${error.message}`);
      }
    }
  }
  
  console.log('\n✅ WebP conversion complete!');
  console.log('\n🔍 Background image is now at: /background.webp');
  console.log('   Hero images are at: /images/hero/upholstery-workshop-zurich-[size].webp');
}

// Run the optimization
optimizeImages(); 
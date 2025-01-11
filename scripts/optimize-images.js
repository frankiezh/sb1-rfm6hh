import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const images = [
  {
    source: 'hero-upholstery-workshop.jpg',
    target: 'upholstery-workshop-zurich'
  },
  {
    source: 'cushion-quality-check.jpeg',
    target: 'upholstery-quality-inspection'
  },
  {
    source: 'foam-padding-craft.jpeg',
    target: 'upholstery-foam-crafting'
  },
  {
    source: 'sewing-machine-detail.jpeg',
    target: 'upholstery-detail-stitching'
  },
  {
    source: 'upholstery-fabric-rolls.jpeg',
    target: 'upholstery-fabric-selection'
  },
  {
    source: 'fabric-texture-inspection.jpeg',
    target: 'upholstery-fabric-inspection'
  }
];

const sizes = [
  {
    name: 'large',
    width: 1920,
    height: 1080,
    webpQuality: 80,
    jpegQuality: 80
  },
  {
    name: 'medium',
    width: 1280,
    height: 720,
    webpQuality: 75,
    jpegQuality: 75
  },
  {
    name: 'small',
    width: 640,
    height: 360,
    webpQuality: 70,
    jpegQuality: 70
  }
];

async function optimizeImages() {
  // Ensure output directories exist
  fs.mkdirSync('./public/images/hero', { recursive: true });
  fs.mkdirSync('./public/images/hero/fallback', { recursive: true });

  for (const image of images) {
    const inputPath = `./src/assets/hero-source/${image.source}`;

    for (const size of sizes) {
      // Create WebP version
      await sharp(inputPath)
        .resize(size.width, size.height, {
          fit: 'cover',
          position: 'center'
        })
        .webp({
          quality: size.webpQuality,
          effort: 6
        })
        .toFile(`./public/images/hero/${image.target}-${size.name}.webp`);

      // Create JPG fallback
      await sharp(inputPath)
        .resize(size.width, size.height, {
          fit: 'cover',
          position: 'center'
        })
        .jpeg({
          quality: size.jpegQuality,
          progressive: true,
          mozjpeg: true
        })
        .toFile(`./public/images/hero/fallback/${image.target}-${size.name}.jpg`);
    }
  }
}

optimizeImages().catch(console.error); 
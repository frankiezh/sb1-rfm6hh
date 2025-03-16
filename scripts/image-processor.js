import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { globSync } from 'glob';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define paths relative to project root
const PROJECT_ROOT = path.resolve(__dirname, '..');
const PUBLIC_DIR = path.join(PROJECT_ROOT, 'public');
const ASSETS_DIR = path.join(PROJECT_ROOT, 'src', 'assets');
const SRC_DIR = path.join(PROJECT_ROOT, 'src');

// Source and target directories
const DIRECTORIES = {
  source: {
    hero: path.join(ASSETS_DIR, 'hero-source'),
    background: path.join(ASSETS_DIR, 'hero-source'), // Background images are in hero-source folder
    portfolio: path.join(ASSETS_DIR, 'portfolio'),
    services: path.join(ASSETS_DIR, 'services')
  },
  output: {
    hero: path.join(PUBLIC_DIR, 'images', 'hero'),
    background: path.join(PUBLIC_DIR, 'images'), // Background goes directly in images/
    portfolio: path.join(PUBLIC_DIR, 'images', 'portfolio'),
    services: path.join(PUBLIC_DIR, 'images', 'services')
  }
};

// Quality settings
const WEBP_QUALITY = {
  hero: 80,
  background: 75,
  portfolio: 85,
  service: 80,
  default: 80
};

// Size configurations
const SIZES = {
  hero: [
    { name: 'large', width: 1920, height: 1080, quality: 80 },
    { name: 'medium', width: 1280, height: 720, quality: 75 },
    { name: 'small', width: 640, height: 360, quality: 70 }
  ],
  background: [
    { name: 'default', width: 300, height: 300, quality: 75 }
  ],
  portfolio: [
    { name: 'default', width: 800, height: 600, quality: 85 }
  ],
  services: [
    { name: 'default', width: 800, height: 600, quality: 80 }
  ]
};

// If you want to force processing certain images, list them here
const CRITICAL_IMAGES = {
  hero: ['upholstery-workshop-zurich', 'upholstery-quality-inspection', 
         'upholstery-foam-crafting', 'upholstery-detail-stitching',
         'upholstery-fabric-selection', 'upholstery-fabric-inspection'],
  background: ['background'],
  portfolio: [],
  services: []
};

// Parse command line arguments
const args = process.argv.slice(2);
const options = {
  forceAll: args.includes('--force-all'),
  skipExisting: !args.includes('--no-skip'),
  onlyCritical: args.includes('--only-critical'),
  types: []
};

// Check for specific image types
['hero', 'background', 'portfolio', 'services'].forEach(type => {
  if (args.includes(`--${type}`)) {
    options.types.push(type);
  }
});

// If no specific types are provided, process all
if (options.types.length === 0) {
  options.types = ['hero', 'background', 'portfolio', 'services'];
}

// Find images referenced in the codebase
async function findReferencedImages() {
  console.log('\n🔍 Finding images referenced in the codebase...');
  
  const patterns = [
    '**/*.{tsx,ts,jsx,js}',
    '**/*.html',
    '**/*.json'
  ];

  const referencedImages = {
    hero: new Set(CRITICAL_IMAGES.hero),
    background: new Set(CRITICAL_IMAGES.background),
    portfolio: new Set(CRITICAL_IMAGES.portfolio),
    services: new Set(CRITICAL_IMAGES.services)
  };
  
  if (options.onlyCritical) {
    console.log('  Only processing critical images (--only-critical flag)');
    return referencedImages;
  }
  
  try {
    // Find all source files
    const files = [];
    for (const pattern of patterns) {
      const matches = globSync(path.join(SRC_DIR, pattern));
      files.push(...matches);
    }
    
    console.log(`  Found ${files.length} source files to scan for image references`);
    
    // Regex patterns for finding image references
    const heroPattern = /images\/hero\/([a-z0-9-]+)(?:-(?:small|medium|large))?\.webp/g;
    const backgroundPattern = /\/background\.webp/g;
    const portfolioPattern = /images\/portfolio\/(?:before|after|showcase)\/([a-z0-9-]+)\.(?:jpg|jpeg|png|webp)/g;
    const servicesPattern = /images\/services\/([a-z0-9-]+)\.(?:jpg|jpeg|png|webp)/g;
    const imageIdPattern = /imageId:\s*["']([a-z0-9-]+)["']/g;
    
    // Scan each file for image references
    for (const file of files) {
      const content = fs.readFileSync(file, 'utf8');
      
      let match;
      while ((match = heroPattern.exec(content)) !== null) {
        referencedImages.hero.add(match[1]);
      }
      
      if (backgroundPattern.test(content)) {
        referencedImages.background.add('background');
      }
      
      while ((match = portfolioPattern.exec(content)) !== null) {
        referencedImages.portfolio.add(match[1]);
      }
      
      while ((match = servicesPattern.exec(content)) !== null) {
        referencedImages.services.add(match[1]);
      }
      
      while ((match = imageIdPattern.exec(content)) !== null) {
        referencedImages.hero.add(match[1]);
      }
    }
    
    // Log found references
    for (const [type, images] of Object.entries(referencedImages)) {
      if (options.types.includes(type)) {
        console.log(`  ${type}: ${Array.from(images).join(', ')}`);
      }
    }
    
    return referencedImages;
  } catch (error) {
    console.error(`  ❌ Error scanning for image references: ${error.message}`);
    return referencedImages; // Return critical images as fallback
  }
}

// Find available source images
async function findSourceImages() {
  console.log('\n🔍 Finding available source images...');
  
  const availableImages = {
    hero: [],
    background: [],
    portfolio: [],
    services: []
  };
  
  // Process only selected types
  for (const type of options.types) {
    const dir = DIRECTORIES.source[type];
    if (!fs.existsSync(dir)) {
      console.log(`  ${type}: Source directory not found (${dir})`);
      continue;
    }
    
    try {
      const files = globSync(path.join(dir, '*.{jpg,jpeg,png}'));
      
      for (const file of files) {
        const filename = path.basename(file);
        const basename = path.basename(file, path.extname(file));
        
        // Handle background image specially
        if (type === 'background' && basename.toLowerCase() === 'background') {
          availableImages.background.push({
            source: filename,
            target: 'background',
            type: 'background',
            path: file
          });
          continue;
        }
        
        // For other images
        availableImages[type].push({
          source: filename,
          target: inferTargetName(basename, type),
          type: type,
          path: file
        });
      }
      
      console.log(`  ${type}: Found ${availableImages[type].length} source images`);
    } catch (error) {
      console.error(`  ❌ Error scanning ${type} directory: ${error.message}`);
    }
  }
  
  return availableImages;
}

// Infer target name from filename
function inferTargetName(basename, type) {
  return basename
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

// Determine which images to process
async function determineImagesToProcess(referencedImages, availableImages) {
  console.log('\n🧮 Determining which images to process...');
  
  const imagesToProcess = [];
  const missingImages = [];
  
  for (const type of options.types) {
    // Skip types with no source directory
    if (!fs.existsSync(DIRECTORIES.source[type])) continue;
    
    // Process each referenced image of this type
    for (const targetName of referencedImages[type]) {
      const matchingSource = availableImages[type].find(img => 
        img.target === targetName || 
        inferTargetName(path.basename(img.source, path.extname(img.source)), type) === targetName
      );
      
      if (matchingSource) {
        imagesToProcess.push(matchingSource);
      } else {
        missingImages.push({
          target: targetName,
          type: type
        });
      }
    }
    
    // If force all flag is set, add all available images of this type
    if (options.forceAll) {
      availableImages[type].forEach(img => {
        if (!imagesToProcess.includes(img)) {
          imagesToProcess.push(img);
        }
      });
    }
  }
  
  // Log results
  console.log(`  Found ${imagesToProcess.length} images to process`);
  
  if (missingImages.length > 0) {
    console.log('\n⚠️ Missing source images (referenced but not found):');
    missingImages.forEach(img => {
      console.log(`  - ${img.target} (${img.type})`);
    });
  }
  
  return { imagesToProcess, missingImages };
}

// Check if image is already optimized
async function isImageOptimized(sourcePath, outputPath) {
  if (!fs.existsSync(outputPath)) {
    return false;
  }

  if (!options.skipExisting) {
    return false; // Don't skip if --no-skip flag is used
  }

  try {
    // If output exists and is WebP, consider it optimized
    const outputStats = await sharp(outputPath).metadata();
    return outputStats.format === 'webp';
  } catch (error) {
    return false;
  }
}

// Process a single image
async function processImage(image) {
  const sourceDir = DIRECTORIES.source[image.type];
  const outputDir = DIRECTORIES.output[image.type];
  
  if (!sourceDir || !outputDir) {
    throw new Error(`Invalid directory configuration for type: ${image.type}`);
  }
  
  const sourcePath = path.join(sourceDir, image.source);
  const imageSizes = SIZES[image.type] || [SIZES.background[0]];

  console.log(`\nProcessing: ${image.source} → ${image.target}`);
  
  // Verify source file exists
  if (!fs.existsSync(sourcePath)) {
    throw new Error(`Source file not found: ${sourcePath}`);
  }

  // Ensure output directory exists
  await fs.promises.mkdir(outputDir, { recursive: true });

  for (const size of imageSizes) {
    const outputPath = path.join(
      outputDir, 
      `${image.target}${size.name === 'default' ? '' : '-' + size.name}.webp`
    );
    
    // Check if already optimized
    const optimized = await isImageOptimized(sourcePath, outputPath);
    if (optimized) {
      console.log(`  ⏭️ Skipping already optimized: ${path.relative(PUBLIC_DIR, outputPath)}`);
      continue;
    }

    console.log(`  🔄 Generating: ${path.relative(PUBLIC_DIR, outputPath)}`);

    try {
      await sharp(sourcePath)
        .resize(size.width, size.height, {
          fit: 'cover',
          position: 'center'
        })
        .webp({
          quality: size.quality,
          effort: 6
        })
        .toFile(outputPath);

      console.log(`    ✓ Generated: ${path.relative(PUBLIC_DIR, outputPath)}`);
    } catch (error) {
      console.error(`    ❌ Failed: ${error.message}`);
    }
  }
}

// Generate TypeScript helper and mappings
function generateHelpers(processedImages) {
  const mappings = {};
  
  processedImages.forEach(image => {
    const imageSizes = SIZES[image.type] || [SIZES.background[0]];
    const originalExt = path.extname(image.source);
    
    imageSizes.forEach(size => {
      const suffix = size.name === 'default' ? '' : `-${size.name}`;
      const originalPath = `images/${image.type === 'background' ? '' : image.type + '/'}${image.target}${suffix}${originalExt}`;
      const webpPath = `images/${image.type === 'background' ? '' : image.type + '/'}${image.target}${suffix}.webp`;
      mappings[originalPath] = webpPath;
    });
  });

  // Write mappings file
  fs.writeFileSync(
    path.join(PROJECT_ROOT, 'src', 'lib', 'image-mappings.json'),
    JSON.stringify(mappings, null, 2)
  );

  // Generate helper file
  const helperContent = `// Auto-generated utility for accessing WebP images
import imageMappings from './image-mappings.json';

export function getWebPPath(originalPath: string): string {
  const normalizedPath = originalPath.startsWith('/') ? originalPath.substring(1) : originalPath;
  return (imageMappings as Record<string, string>)[normalizedPath] || originalPath;
}`;

  fs.writeFileSync(
    path.join(PROJECT_ROOT, 'src', 'lib', 'webp-helper.ts'),
    helperContent
  );

  console.log('\n✓ Generated helper files:');
  console.log('  - src/lib/image-mappings.json');
  console.log('  - src/lib/webp-helper.ts');
}

// Display help
function showHelp() {
  console.log(`
Image Processor - The all-in-one solution for image optimization

Usage:
  node scripts/image-processor.js [options]

Options:
  --help               Show this help message
  --force-all          Process all available images, not just referenced ones
  --no-skip            Always process images even if already optimized
  --only-critical      Only process critical images defined in script
  --hero               Only process hero images
  --background         Only process background images
  --portfolio          Only process portfolio images
  --services           Only process service images
  `);
  process.exit(0);
}

// Main process
async function main() {
  if (args.includes('--help')) {
    showHelp();
  }

  console.log('🖼  Image Processor - Starting image processing...');
  console.log(`🔧 Options: ${Object.entries(options).map(([k, v]) => `${k}=${v}`).join(', ')}`);
  
  try {
    // Step 1: Find images referenced in the code
    const referencedImages = await findReferencedImages();
    
    // Step 2: Find available source images
    const availableImages = await findSourceImages();
    
    // Step 3: Determine which images to process
    const { imagesToProcess, missingImages } = await determineImagesToProcess(referencedImages, availableImages);
    
    if (imagesToProcess.length === 0) {
      console.log('\n✨ No images to process!');
      return;
    }
    
    // Step 4: Process images
    console.log('\n🔄 Processing images...');
    for (const image of imagesToProcess) {
      await processImage(image);
    }
    
    // Step 5: Generate helper files
    generateHelpers(imagesToProcess);
    
    console.log('\n✨ Image processing complete!');
    
    // Warn about missing images one more time
    if (missingImages.length > 0) {
      console.log('\n⚠️ Warning: Some referenced images are missing source files!');
      console.log('   These should be added to maintain your website properly.');
    }
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  }
}

// Let's go!
main(); 
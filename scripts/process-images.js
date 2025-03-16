import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { globSync } from 'glob';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define all directory paths relative to project root
const PROJECT_ROOT = path.resolve(__dirname, '..');
const PUBLIC_DIR = path.join(PROJECT_ROOT, 'public');
const ASSETS_DIR = path.join(PROJECT_ROOT, 'src', 'assets');
const SRC_DIR = path.join(PROJECT_ROOT, 'src');

// Source and target directories
const DIRECTORIES = {
  source: {
    hero: path.join(ASSETS_DIR, 'hero-source'),
    background: path.join(ASSETS_DIR, 'hero-source'),
    portfolio: path.join(ASSETS_DIR, 'portfolio'),
    services: path.join(ASSETS_DIR, 'services')
  },
  output: {
    hero: path.join(PUBLIC_DIR, 'images', 'hero'),
    background: path.join(PUBLIC_DIR, 'images'),
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
const sizes = {
  hero: [
    {
      name: 'large',
      width: 1920,
      height: 1080,
      quality: 80
    },
    {
      name: 'medium',
      width: 1280,
      height: 720,
      quality: 75
    },
    {
      name: 'small',
      width: 640,
      height: 360,
      quality: 70
    }
  ],
  background: [
    {
      name: 'default',
      width: 300,
      height: 300,
      quality: 75
    }
  ]
};

// Find all images referenced in the codebase
async function findReferencedImages() {
  console.log('\n🔍 Finding images referenced in the codebase...');
  
  // Known image formats and patterns
  const patterns = [
    '**/*.{tsx,ts,jsx,js}', // React/JS files
    '**/*.html',            // HTML files
    '**/*.json'             // JSON files
  ];

  const referencedImages = {
    hero: new Set(),
    background: new Set(),
    portfolio: new Set(),
    services: new Set()
  };
  
  // Add explicitly known critical images
  referencedImages.hero.add('upholstery-workshop-zurich');
  referencedImages.background.add('background');
  
  try {
    // Find all source files
    const files = [];
    for (const pattern of patterns) {
      const matches = globSync(path.join(SRC_DIR, pattern));
      files.push(...matches);
    }
    
    console.log(`  Found ${files.length} source files to scan`);
    
    // Regex patterns for finding image references
    const heroPattern = /images\/hero\/([a-z0-9-]+)(?:-(?:small|medium|large))?\.webp/g;
    const backgroundPattern = /\/background\.webp/g;
    const portfolioPattern = /images\/portfolio\/(?:before|after|showcase)\/([a-z0-9-]+)\.(?:jpg|webp)/g;
    const servicesPattern = /images\/services\/([a-z0-9-]+)\.(?:jpg|webp)/g;
    
    // Also look for imageId values in translations
    const imageIdPattern = /imageId:\s*["']([a-z0-9-]+)["']/g;
    
    // Scan each file for image references
    for (const file of files) {
      const content = fs.readFileSync(file, 'utf8');
      
      // Find hero images
      let match;
      while ((match = heroPattern.exec(content)) !== null) {
        referencedImages.hero.add(match[1]);
      }
      
      // Find background image
      if (backgroundPattern.test(content)) {
        referencedImages.background.add('background');
      }
      
      // Find portfolio images
      while ((match = portfolioPattern.exec(content)) !== null) {
        referencedImages.portfolio.add(match[1]);
      }
      
      // Find services images
      while ((match = servicesPattern.exec(content)) !== null) {
        referencedImages.services.add(match[1]);
      }
      
      // Find imageId values
      while ((match = imageIdPattern.exec(content)) !== null) {
        // These are likely hero images based on the codebase structure
        referencedImages.hero.add(match[1]);
      }
    }
    
    // Log found references
    console.log('\n📋 Referenced images found:');
    for (const [type, images] of Object.entries(referencedImages)) {
      console.log(`  ${type}: ${Array.from(images).join(', ')}`);
    }
    
    return referencedImages;
  } catch (error) {
    console.error(`  ❌ Error scanning for referenced images:`, error.message);
    // Fall back to default list if we can't scan
    return {
      hero: new Set(['upholstery-workshop-zurich', 'upholstery-quality-inspection', 
                    'upholstery-foam-crafting', 'upholstery-detail-stitching',
                    'upholstery-fabric-selection', 'upholstery-fabric-inspection']),
      background: new Set(['background']),
      portfolio: new Set(),
      services: new Set()
    };
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
  
  // Check each source directory
  for (const [type, dir] of Object.entries(DIRECTORIES.source)) {
    if (!fs.existsSync(dir)) {
      console.log(`  ${type}: Directory not found (${dir})`);
      continue;
    }
    
    try {
      const files = globSync(path.join(dir, '*.{jpg,jpeg,png}'));
      
      for (const file of files) {
        const filename = path.basename(file);
        const basename = path.basename(file, path.extname(file));
        
        // For background image, check if it should be included here
        if (type === 'background' && basename.toLowerCase() === 'background') {
          availableImages.background.push({
            source: filename,
            target: 'background',
            type: 'background'
          });
          continue;
        }
        
        // For other image types
        availableImages[type].push({
          source: filename,
          target: inferTargetName(basename, type),
          type: type
        });
      }
      
      console.log(`  ${type}: Found ${availableImages[type].length} source images`);
    } catch (error) {
      console.error(`  ❌ Error scanning ${type} directory:`, error.message);
    }
  }
  
  return availableImages;
}

// Infer target name from filename
function inferTargetName(basename, type) {
  // Clean up filename to create a nice target name
  return basename
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '-')     // Replace non-alphanumeric with hyphens
    .replace(/-+/g, '-')             // Replace multiple hyphens with single
    .replace(/^-|-$/g, '');          // Remove leading/trailing hyphens
}

// Determine which images to process based on what's referenced and available
async function determineImagesToProcess(referencedImages, availableImages) {
  console.log('\n🧮 Determining which images to process...');
  
  const imagesToProcess = [];
  const missingImages = [];
  
  // Process hero images
  for (const targetName of referencedImages.hero) {
    const matchingSource = availableImages.hero.find(img => 
      img.target === targetName || 
      inferTargetName(path.basename(img.source, path.extname(img.source)), 'hero') === targetName
    );
    
    if (matchingSource) {
      imagesToProcess.push(matchingSource);
    } else {
      missingImages.push({
        target: targetName,
        type: 'hero'
      });
    }
  }
  
  // Process background image
  if (referencedImages.background.has('background')) {
    const matchingBackground = availableImages.background.find(img => 
      img.target === 'background' || 
      inferTargetName(path.basename(img.source, path.extname(img.source)), 'background') === 'background'
    );
    
    if (matchingBackground) {
      imagesToProcess.push(matchingBackground);
    } else {
      missingImages.push({
        target: 'background',
        type: 'background'
      });
    }
  }
  
  // Process portfolio images
  for (const targetName of referencedImages.portfolio) {
    const matchingSource = availableImages.portfolio.find(img => 
      img.target === targetName || 
      inferTargetName(path.basename(img.source, path.extname(img.source)), 'portfolio') === targetName
    );
    
    if (matchingSource) {
      imagesToProcess.push(matchingSource);
    } else {
      missingImages.push({
        target: targetName,
        type: 'portfolio'
      });
    }
  }
  
  // Process services images
  for (const targetName of referencedImages.services) {
    const matchingSource = availableImages.services.find(img => 
      img.target === targetName || 
      inferTargetName(path.basename(img.source, path.extname(img.source)), 'services') === targetName
    );
    
    if (matchingSource) {
      imagesToProcess.push(matchingSource);
    } else {
      missingImages.push({
        target: targetName,
        type: 'services'
      });
    }
  }
  
  // Log results
  console.log(`  Found ${imagesToProcess.length} images to process`);
  
  if (missingImages.length > 0) {
    console.log('\n⚠️ Missing source images:');
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

  try {
    const sourceStats = await sharp(sourcePath).metadata();
    const outputStats = await sharp(outputPath).metadata();
    
    // If output is WebP, consider it optimized
    return outputStats.format === 'webp';
  } catch (error) {
    console.error(`Error checking optimization for ${sourcePath}:`, error.message);
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
  const imageSizes = sizes[image.type] || [sizes.background[0]];

  console.log(`\nProcessing: ${image.source} → ${image.target}`);
  
  // Verify source file exists
  if (!fs.existsSync(sourcePath)) {
    throw new Error(`Source file not found: ${sourcePath}`);
  }

  // Ensure output directory exists
  await fs.promises.mkdir(outputDir, { recursive: true });

  // Process each size variant
  for (const size of imageSizes) {
    const outputPath = path.join(
      outputDir, 
      `${image.target}${size.name === 'default' ? '' : '-' + size.name}.webp`
    );
    
    // Check if already optimized
    const optimized = await isImageOptimized(sourcePath, outputPath);
    if (optimized) {
      console.log(`  ⏭️ Skipping already optimized: ${image.target}${size.name === 'default' ? '' : '-' + size.name}.webp`);
      continue;
    }

    console.log(`  🔄 Generating: ${image.target}${size.name === 'default' ? '' : '-' + size.name}.webp`);

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
      throw error;
    }
  }
}

// Generate TypeScript helper and mappings
function generateHelpers(processedImages) {
  const mappings = {};
  
  processedImages.forEach(image => {
    const sizeSuffixes = image.type === 'background' ? [''] : ['-small', '-medium', '-large'];
    const originalExt = path.extname(image.source);
    
    sizeSuffixes.forEach(suffix => {
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

// Main process
async function main() {
  console.log('🖼  Starting image processing...');
  
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
      console.log('\n⚠️ Warning: Some referenced images are missing source files:');
      missingImages.forEach(img => {
        console.log(`  - ${img.target} (${img.type})`);
      });
    }
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  }
}

main(); 
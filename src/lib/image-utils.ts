/**
 * Image Utilities for WebP Optimization
 */

/**
 * Get the appropriate image URL based on screen size and format.
 * This function assumes we have small, medium, and large versions of each image.
 * 
 * @param imageName Base name of the image without extension or size suffix
 * @param folder Optional folder path where the image is located
 * @returns Object with srcset and alt attributes
 */
export function getResponsiveImage(imageName: string, folder: string = 'images') {
  // Normalize folder path to ensure it has trailing slash
  const normalizedFolder = folder.endsWith('/') ? folder : `${folder}/`;
  
  // Build paths
  const basePath = `/${normalizedFolder}${imageName}`;
  
  return {
    srcSet: {
      large: `${basePath}-large.webp`,
      medium: `${basePath}-medium.webp`,
      small: `${basePath}-small.webp`,
    },
    alt: imageName.split('-').join(' '),
  };
}

/**
 * Get an image URL for a background image or other simple case
 * 
 * @param path Path to the image, relative to public directory
 * @returns WebP version of the image path
 */
export function getImageUrl(path: string): string {
  // Remove leading slash if present
  const normalizedPath = path.startsWith('/') ? path.substring(1) : path;
  
  // Replace extension with .webp
  return `/${normalizedPath.replace(/\.(jpe?g|png)$/, '.webp')}`;
}

/**
 * Dimension mapping for common image sizes to improve CLS
 */
export const imageDimensions = {
  hero: {
    small: { width: 640, height: 360 },
    medium: { width: 1280, height: 720 },
    large: { width: 1920, height: 1080 },
  },
  portfolio: {
    small: { width: 400, height: 300 },
    medium: { width: 800, height: 600 },
    large: { width: 1200, height: 900 },
  },
  service: {
    small: { width: 320, height: 240 },
    medium: { width: 640, height: 480 },
    large: { width: 960, height: 720 },
  },
}; 
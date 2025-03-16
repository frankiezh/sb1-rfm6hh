interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
}

function ensureAbsolutePath(path: string) {
  // If it's an external URL, return as is
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  // Remove any leading or trailing slashes
  const cleanPath = path.replace(/^\/+|\/+$/g, '');

  // Ensure the path starts with 'images/'
  const absolutePath = cleanPath.startsWith('images/') ? `/${cleanPath}` : `/images/${cleanPath}`;

  return absolutePath;
}

function ensureWebPExtension(path: string) {
  return path.replace(/\.(jpe?g|png)$/i, '.webp');
}

export const Image = ({ src, alt, className, loading = "lazy", ...props }: ImageProps) => {
  const absolutePath = ensureAbsolutePath(src);
  const webpSrc = ensureWebPExtension(absolutePath);

  return (
    <img
      src={webpSrc}
      alt={alt}
      loading={loading}
      className={className}
      {...props}
    />
  );
}; 
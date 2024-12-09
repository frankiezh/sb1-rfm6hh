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

export const Image = ({ src, alt, className, ...props }: ImageProps) => {
  const absolutePath = ensureAbsolutePath(src);

  return (
    <img
      src={absolutePath}
      alt={alt}
      loading="lazy"
      className={className}
      {...props}
    />
  );
}; 
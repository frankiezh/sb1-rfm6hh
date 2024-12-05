interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
}

export const Image = ({ src, alt, className, ...props }: ImageProps) => {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className={className}
      {...props}
    />
  );
}; 
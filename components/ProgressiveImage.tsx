
import React, { useState, useEffect } from 'react';

interface ProgressiveImageProps {
  src: string;
  placeholderSrc: string;
  alt: string;
  className?: string;
}

const ProgressiveImage: React.FC<ProgressiveImageProps> = ({ src, placeholderSrc, alt, className }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setIsLoaded(true);
    };
  }, [src]);

  return (
    <div className="relative w-full h-full">
      <img
        src={placeholderSrc}
        alt={alt}
        className={`${className} filter blur-md transition-opacity duration-1000 ease-out`}
        style={{ opacity: isLoaded ? 0 : 1 }}
      />
      <img
        src={src}
        alt={alt}
        className={`${className} absolute inset-0 transition-opacity duration-1000 ease-in`}
        style={{ opacity: isLoaded ? 1 : 0 }}
        loading="lazy"
      />
    </div>
  );
};

export default ProgressiveImage;

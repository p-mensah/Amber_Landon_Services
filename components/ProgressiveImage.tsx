
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
    <div className="relative w-full h-full overflow-hidden">
      <img
        src={placeholderSrc}
        alt={alt}
        aria-hidden="true"
        className={`${className} transition-all duration-1000 ease-in-out ${isLoaded ? 'opacity-0 blur-none scale-100' : 'opacity-100 blur-md scale-105'}`}
      />
      <img
        src={src}
        alt={alt}
        className={`${className} absolute inset-0 transition-opacity duration-1000 ease-in-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        loading="lazy"
      />
    </div>
  );
};

export default ProgressiveImage;

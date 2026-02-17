
import React, { useState, useEffect, useRef, useCallback } from 'react';

interface ProgressiveImageProps {
  src: string;
  placeholderSrc: string;
  alt: string;
  className?: string;
  priority?: boolean;
  width?: number;
  height?: number;
}

// Global image cache to prevent reloading
const imageCache = new Map<string, Promise<HTMLImageElement>>();

const ProgressiveImage: React.FC<ProgressiveImageProps> = ({ 
  src, 
  placeholderSrc, 
  alt, 
  className, 
  priority = false,
  width,
  height
}) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isInView, setIsInView] = useState<boolean>(false);
  const imgRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Optimized image loading with caching
  const loadImage = useCallback((imageSrc: string): Promise<HTMLImageElement> => {
    if (imageCache.has(imageSrc)) {
      return imageCache.get(imageSrc)!;
    }

    const loadingPromise = new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.decoding = 'async';
      img.loading = 'eager';
      
      // Set dimensions for better layout stability
      if (width) img.width = width;
      if (height) img.height = height;

      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = imageSrc;
    });

    imageCache.set(imageSrc, loadingPromise);
    return loadingPromise;
  }, [width, height]);

  useEffect(() => {
    // Use a single shared observer for better performance
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      { 
        threshold: 0.01, // Lower threshold for earlier loading
        rootMargin: '100px' // Start loading 100px before entering viewport
      }
    );

    observerRef.current = observer;

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    if (!isInView && !priority) return;

    // Preload with better error handling
    loadImage(src)
      .then(() => {
        // Use requestAnimationFrame for smoother transitions
        requestAnimationFrame(() => {
          setIsLoaded(true);
        });
      })
      .catch((error) => {
        console.warn(`Failed to load image: ${src}`, error);
        // Still mark as loaded to show placeholder
        setIsLoaded(true);
      });
  }, [src, isInView, priority, loadImage]);

  const shouldLoad: boolean = isInView || priority;

  return (
    <div 
      ref={imgRef} 
      className="relative w-full h-full overflow-hidden"
      style={{ 
        willChange: 'transform, opacity',
        contain: 'layout style paint'
      }}
    >
      <img
        src={placeholderSrc}
        alt={alt}
        aria-hidden="true"
        className={`${className} transition-all duration-500 ease-out will-change-transform ${isLoaded ? 'opacity-0 blur-none scale-100' : 'opacity-100 blur-sm scale-105'}`}
        style={{ 
          willChange: 'transform, opacity, filter',
          transform: isLoaded ? 'scale(1) translateZ(0)' : 'scale(1.05) translateZ(0)',
          filter: isLoaded ? 'blur(0)' : 'blur(4px)'
        }}
      />
      {shouldLoad && (
        <img
          src={src}
          alt={alt}
          className={`${className} absolute inset-0 transition-opacity duration-500 ease-out will-change-opacity ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          style={{ 
            willChange: 'opacity',
            transform: 'translateZ(0)' // Force hardware acceleration
          }}
        />
      )}
    </div>
  );
};

export default ProgressiveImage;

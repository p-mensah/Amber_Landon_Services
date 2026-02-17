
import { useState, useEffect, useRef, RefObject } from 'react';

// Shared observer instance for better performance
let sharedObserver: IntersectionObserver | null = null;
const observerCallbacks = new Map<Element, () => void>();

const getSharedObserver = (): IntersectionObserver => {
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const callback = observerCallbacks.get(entry.target);
            if (callback) {
              callback();
              // Unobserve after first intersection for performance
              sharedObserver?.unobserve(entry.target);
              observerCallbacks.delete(entry.target);
            }
          }
        });
      },
      {
        root: null,
        rootMargin: '50px', // Start animation earlier
        threshold: 0.05 // Lower threshold for smoother triggering
      }
    );
  }
  return sharedObserver;
};

export const useScrollAnimation = <T extends HTMLElement,>(): [RefObject<T | null>, boolean] => {
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleIntersection = () => {
      setIsVisible(true);
    };

    const observer = getSharedObserver();
    observer.observe(element);
    observerCallbacks.set(element, handleIntersection);

    return () => {
      if (element) {
        observer.unobserve(element);
        observerCallbacks.delete(element);
      }
    };
  }, []);

  return [ref, isVisible];
};

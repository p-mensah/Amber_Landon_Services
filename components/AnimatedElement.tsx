
import React, { ReactNode, memo } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface AnimatedElementProps {
  children: ReactNode;
  className?: string;
  animation?: 'fade-in-up' | 'fade-in' | 'zoom-in';
  delay?: string;
  threshold?: number;
}

const AnimatedElement: React.FC<AnimatedElementProps> = memo(({ 
  children, 
  className = '', 
  animation = 'fade-in-up', 
  delay = 'duration-500',
  threshold = 0.1
}) => {
  const [ref, isVisible] = useScrollAnimation<HTMLDivElement>();

  const getAnimationClasses = () => {
    const baseClasses = `transition-all ${delay} ease-out will-change-transform`;
    
    switch (animation) {
      case 'fade-in-up':
        return `${baseClasses} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`;
      case 'fade-in':
        return `${baseClasses} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`;
      case 'zoom-in':
        return `${baseClasses} ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`;
      default:
        return baseClasses;
    }
  };

  return (
    <div 
      ref={ref} 
      className={`${className} ${getAnimationClasses()}`}
      style={{
        willChange: 'transform, opacity',
        contain: 'layout style paint'
      }}
    >
      {children}
    </div>
  );
});

AnimatedElement.displayName = 'AnimatedElement';

export default AnimatedElement;

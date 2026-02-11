
import React, { ReactNode } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface AnimatedElementProps {
  children: ReactNode;
  className?: string;
  animation?: 'fade-in-up' | 'fade-in' | 'zoom-in';
  delay?: string;
}

const AnimatedElement: React.FC<AnimatedElementProps> = ({ children, className = '', animation = 'fade-in-up', delay = 'duration-500' }) => {
  const [ref, isVisible] = useScrollAnimation<HTMLDivElement>();

  const getAnimationClasses = () => {
    switch (animation) {
      case 'fade-in-up':
        return `transition-all transform ${delay} ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`;
      case 'fade-in':
        return `transition-opacity ${delay} ease-in ${isVisible ? 'opacity-100' : 'opacity-0'}`;
      case 'zoom-in':
        return `transition-all ${delay} ease-out ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`;
      default:
        return '';
    }
  };

  return (
    <div ref={ref} className={`${className} ${getAnimationClasses()}`}>
      {children}
    </div>
  );
};

export default AnimatedElement;
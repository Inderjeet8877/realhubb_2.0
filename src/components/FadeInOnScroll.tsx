import { useEffect, useRef, useState } from 'react';

interface FadeInOnScrollProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  threshold?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}

export const FadeInOnScroll = ({ 
  children, 
  className = '',
  delay = 0,
  threshold = 0.1,
  direction = 'up'
}: FadeInOnScrollProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        } else {
          setIsVisible(false);
        }
      },
      { 
        threshold,
        rootMargin: '-50px'
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [delay, threshold]);

  const getTransformClass = () => {
    if (isVisible) {
      return 'opacity-100 translate-x-0 translate-y-0 scale-100';
    }
    
    switch (direction) {
      case 'down':
        return 'opacity-0 -translate-y-10 scale-95';
      case 'up':
        return 'opacity-0 translate-y-10 scale-95';
      case 'left':
        return 'opacity-0 translate-x-10 scale-95';
      case 'right':
        return 'opacity-0 -translate-x-10 scale-95';
      default:
        return 'opacity-0 translate-y-10 scale-95';
    }
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${getTransformClass()} ${className}`}
      style={{ willChange: 'transform, opacity' }}
    >
      {children}
    </div>
  );
};
import { useEffect, useState, useRef } from 'react';

interface ParallaxSectionProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

export const ParallaxSection = ({ 
  children, 
  speed = 0.5, 
  className = '' 
}: ParallaxSectionProps) => {
  const [offsetY, setOffsetY] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const elementTop = rect.top + window.scrollY;
        const scrolled = window.scrollY - elementTop;
        setOffsetY(scrolled * speed);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return (
    <div 
      ref={ref}
      className={className}
      style={{ 
        transform: `translateY(${offsetY}px)`,
        willChange: 'transform'
      }}
    >
      {children}
    </div>
  );
};
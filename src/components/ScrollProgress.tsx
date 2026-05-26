import { useEffect, useState } from 'react';

export const ScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const trackLength = documentHeight - windowHeight;
      const progress = (scrollTop / trackLength) * 100;
      setScrollProgress(Math.min(progress, 100));
    };

    // Initial calculation
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-transparent dark:bg-gray-800/50 z-50 pointer-events-none">
      <div 
        className="h-full bg-gradient-to-r from-primary via-secondary to-primary transition-all duration-150 ease-out"
        style={{ 
          width: `${scrollProgress}%`,
          boxShadow: scrollProgress > 0 ? '0 0 10px rgba(59, 130, 246, 0.5)' : 'none'
        }}
      />
    </div>
  );
};
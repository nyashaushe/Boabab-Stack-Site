import React, { useEffect, useState } from 'react';
import debounce from 'lodash.debounce';

interface StarFieldProps {
  children?: React.ReactNode;
}

const StarField: React.FC<StarFieldProps> = ({ children }) => {
  const [stars, setStars] = useState<{ id: number; x: number; y: number; size: number; delay: number; color: string; duration: number; brightness: number }[]>([]);

  useEffect(() => {
    const generateStars = () => {
      const colors = [
        '#FFF',
        '#A78BFA',
        '#818CF8',
        '#F472B6',
        '#60A5FA',
        '#34D399',
        '#FBBF24', // Bright gold
        '#F87171', // Bright red
        '#38BDF8', // Bright blue
      ];

      // Generate regular stars
      const regularStars = Array.from({ length: 100 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 0.5,
        delay: Math.random() * 5,
        duration: Math.random() * 3 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        brightness: 1
      }));

      // Generate bright stars
      const brightStars = Array.from({ length: 25 }, (_, i) => ({
        id: i + 100,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 2,
        delay: Math.random() * 5,
        duration: Math.random() * 2 + 1,
        color: '#FFFFFF',
        brightness: Math.random() * 2 + 2
      }));

      // Generate super bright stars
      const superBrightStars = Array.from({ length: 5 }, (_, i) => ({
        id: i + 125,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 3,
        delay: Math.random() * 5,
        duration: Math.random() * 1.5 + 0.5,
        color: '#FFFFFF',
        brightness: Math.random() * 3 + 4
      }));

      setStars([...regularStars, ...brightStars, ...superBrightStars]);
    };

    generateStars();

    const handleResize = debounce(() => {
      generateStars();
    }, 200);

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="star-field relative">
      <div className="absolute inset-0 bg-gradient-radial from-cosmic-purple/20 via-transparent to-transparent opacity-40" />
      <div className="absolute inset-0 bg-gradient-radial from-cosmic-blue/10 via-transparent to-transparent opacity-30" />
      {stars.map((star) => (
        <div
          key={star.id}
          className="star"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            backgroundColor: star.color,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
            boxShadow: `0 0 ${star.size * star.brightness}px ${star.color}`,
            filter: `brightness(${star.brightness})`,
            '--duration': `${star.duration}s`,
          } as React.CSSProperties}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background pointer-events-none" />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default React.memo(StarField);


import { useEffect, useState } from 'react';

interface StatsCounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
}

export default function StatsCounter({ end, duration = 2000, suffix = '', prefix = '' }: StatsCounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      const currentCount = Math.floor(easeOutCubic * end);
      
      setCount(currentCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, duration]);

  return (
    <span className="font-bold text-2xl sm:text-3xl gradient-text">
      {prefix}{count}{suffix}
    </span>
  );
}

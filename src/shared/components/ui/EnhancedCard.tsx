
import { forwardRef, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Card, CardProps } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface EnhancedCardProps extends CardProps {
  children: ReactNode;
  hover?: boolean;
  glow?: boolean;
  interactive?: boolean;
}

export const EnhancedCard = forwardRef<HTMLDivElement, EnhancedCardProps>(
  ({ className, children, hover = true, glow = false, interactive = false, ...props }, ref) => {
    const Component = motion(Card);
    
    return (
      <Component
        ref={ref}
        className={cn(
          "transition-all duration-200",
          glow && "shadow-sm hover:shadow-lg",
          interactive && "cursor-pointer",
          className
        )}
        whileHover={hover ? { 
          scale: 1.02,
          y: -2,
          transition: { duration: 0.2, ease: "easeOut" }
        } : undefined}
        whileTap={interactive ? { 
          scale: 0.98,
          transition: { duration: 0.1 }
        } : undefined}
        whileFocus={interactive ? {
          boxShadow: "0 0 0 3px hsl(var(--ring))",
          transition: { duration: 0.15 }
        } : undefined}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

EnhancedCard.displayName = "EnhancedCard";

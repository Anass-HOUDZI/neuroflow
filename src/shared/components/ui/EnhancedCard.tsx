
import { forwardRef, ReactNode, HTMLAttributes } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface EnhancedCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  hover?: boolean;
  glow?: boolean;
  interactive?: boolean;
}

export const EnhancedCard = forwardRef<HTMLDivElement, EnhancedCardProps>(
  ({ className, children, hover = true, glow = false, interactive = false, ...props }, ref) => {
    return (
      <motion.div
        className="inline-block w-full"
        whileHover={hover ? { 
          scale: 1.02,
          y: -2,
          transition: { duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }
        } : undefined}
        whileTap={interactive ? { 
          scale: 0.98,
          transition: { duration: 0.1 }
        } : undefined}
        whileFocus={interactive ? {
          boxShadow: "0 0 0 3px hsl(var(--ring))",
          transition: { duration: 0.15 }
        } : undefined}
      >
        <Card
          ref={ref}
          className={cn(
            "transition-all duration-200",
            glow && "shadow-sm hover:shadow-lg",
            interactive && "cursor-pointer",
            className
          )}
          {...props}
        >
          {children}
        </Card>
      </motion.div>
    );
  }
);

EnhancedCard.displayName = "EnhancedCard";

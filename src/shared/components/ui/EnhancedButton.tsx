
import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { Button, ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface EnhancedButtonProps extends Omit<ButtonProps, 'onAnimationStart' | 'onAnimationEnd'> {
  ripple?: boolean;
  glow?: boolean;
}

export const EnhancedButton = forwardRef<HTMLButtonElement, EnhancedButtonProps>(
  ({ className, ripple = false, glow = false, children, ...props }, ref) => {
    return (
      <motion.div
        className="inline-block"
        whileHover={{ 
          scale: 1.02,
          y: -1,
          transition: { duration: 0.15, ease: [0.25, 0.1, 0.25, 1] }
        }}
        whileTap={{ 
          scale: 0.98,
          transition: { duration: 0.1 }
        }}
        whileFocus={{
          boxShadow: "0 0 0 3px hsl(var(--ring))",
          transition: { duration: 0.15 }
        }}
      >
        <Button
          ref={ref}
          className={cn(
            "relative overflow-hidden transition-all duration-200",
            glow && "shadow-lg hover:shadow-xl",
            className
          )}
          {...props}
        >
          {ripple && (
            <motion.div
              className="absolute inset-0 bg-white rounded-md opacity-0"
              whileTap={{ 
                opacity: 0.2, 
                scale: 1.5,
                transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }
              }}
            />
          )}
          {children}
        </Button>
      </motion.div>
    );
  }
);

EnhancedButton.displayName = "EnhancedButton";

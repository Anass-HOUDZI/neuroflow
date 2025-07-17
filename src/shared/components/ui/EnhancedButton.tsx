
import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { Button, ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface EnhancedButtonProps extends ButtonProps {
  ripple?: boolean;
  glow?: boolean;
}

export const EnhancedButton = forwardRef<HTMLButtonElement, EnhancedButtonProps>(
  ({ className, ripple = false, glow = false, children, ...props }, ref) => {
    const Component = motion(Button);
    
    return (
      <Component
        ref={ref}
        className={cn(
          "relative overflow-hidden transition-all duration-200",
          glow && "shadow-lg hover:shadow-xl",
          className
        )}
        whileHover={{ 
          scale: 1.02,
          y: -1,
          transition: { duration: 0.15, ease: "easeOut" }
        }}
        whileTap={{ 
          scale: 0.98,
          transition: { duration: 0.1 }
        }}
        whileFocus={{
          boxShadow: "0 0 0 3px hsl(var(--ring))",
          transition: { duration: 0.15 }
        }}
        {...props}
      >
        {ripple && (
          <motion.div
            className="absolute inset-0 bg-white rounded-md opacity-0"
            whileTap={{ 
              opacity: 0.2, 
              scale: 1.5,
              transition: { duration: 0.4, ease: "easeOut" }
            }}
          />
        )}
        {children}
      </Component>
    );
  }
);

EnhancedButton.displayName = "EnhancedButton";

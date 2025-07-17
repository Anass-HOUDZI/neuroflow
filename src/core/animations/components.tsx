
import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode } from 'react';
import { 
  animationPresets, 
  transitionAnimations, 
  interactionAnimations,
  staggerContainer, 
  type TransitionAnimationKey,
  type InteractionAnimationKey 
} from './presets';

interface AnimatedWrapperProps {
  children: ReactNode;
  preset: TransitionAnimationKey;
  className?: string;
  delay?: number;
}

export function AnimatedWrapper({ children, preset, className, delay = 0 }: AnimatedWrapperProps) {
  const animation = transitionAnimations[preset];
  
  return (
    <motion.div
      className={className}
      initial={animation.initial}
      animate={animation.animate}
      exit={animation.exit}
      transition={{ ...animation.transition, delay }}
    >
      {children}
    </motion.div>
  );
}

interface InteractiveWrapperProps {
  children: ReactNode;
  preset: InteractionAnimationKey;
  className?: string;
}

export function InteractiveWrapper({ children, preset, className }: InteractiveWrapperProps) {
  const animation = interactionAnimations[preset];
  
  return (
    <motion.div
      className={className}
      whileHover={animation.whileHover}
      whileTap={animation.whileTap}
      whileFocus={animation.whileFocus}
    >
      {children}
    </motion.div>
  );
}

interface StaggeredListProps {
  children: ReactNode;
  className?: string;
}

export function StaggeredList({ children, className }: StaggeredListProps) {
  return (
    <motion.div
      className={className}
      variants={staggerContainer}
      initial="initial"
      animate="animate"
    >
      {children}
    </motion.div>
  );
}

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

export function PageTransition({ children, className }: PageTransitionProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        className={className}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

interface RippleButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

export function RippleButton({ children, onClick, className, disabled }: RippleButtonProps) {
  return (
    <motion.button
      className={`relative overflow-hidden ${className}`}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.15 }}
    >
      <motion.div
        className="absolute inset-0 bg-white opacity-0"
        whileTap={{ opacity: 0.3, scale: 2 }}
        transition={{ duration: 0.3 }}
        style={{ borderRadius: "50%" }}
      />
      {children}
    </motion.button>
  );
}


import { Easing } from "framer-motion";

export const easings = {
  smooth: [0.25, 0.1, 0.25, 1] as Easing,
  bounce: [0.68, -0.55, 0.265, 1.55] as Easing,
  sharp: [0.4, 0, 0.2, 1] as Easing,
  acceleration: [0.4, 0, 1, 1] as Easing,
  deceleration: [0, 0, 0.2, 1] as Easing
};

// Base animation properties
interface TransitionAnimation {
  initial?: any;
  animate?: any;
  exit?: any;
  transition?: any;
}

interface InteractionAnimation {
  whileHover?: any;
  whileTap?: any;
  whileFocus?: any;
}

// Transition animations (for page/component entry/exit)
export const transitionAnimations: Record<string, TransitionAnimation> = {
  fadeIn: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3, ease: easings.smooth }
  },
  
  scaleIn: {
    initial: { scale: 0.95, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.95, opacity: 0 },
    transition: { duration: 0.2, ease: easings.smooth }
  },
  
  slideInLeft: {
    initial: { x: -30, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: -30, opacity: 0 },
    transition: { duration: 0.3, ease: easings.smooth }
  },
  
  slideInRight: {
    initial: { x: 30, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: 30, opacity: 0 },
    transition: { duration: 0.3, ease: easings.smooth }
  }
};

// Interaction animations (for hover, tap, focus)
export const interactionAnimations: Record<string, InteractionAnimation> = {
  buttonHover: {
    whileHover: { 
      scale: 1.02, 
      y: -1,
      transition: { duration: 0.15, ease: easings.smooth }
    },
    whileTap: { 
      scale: 0.98,
      transition: { duration: 0.1 }
    }
  },
  
  cardHover: {
    whileHover: { 
      scale: 1.03, 
      y: -4,
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: { duration: 0.2, ease: easings.smooth }
    }
  },
  
  focusRing: {
    whileFocus: {
      boxShadow: "0 0 0 3px hsl(var(--ring))",
      transition: { duration: 0.15 }
    }
  }
};

// Loading animations (continuous)
export const loadingAnimations = {
  pulse: {
    animate: {
      scale: [1, 1.05, 1],
      opacity: [0.5, 1, 0.5],
    },
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: easings.smooth
    }
  },
  
  spinner: {
    animate: { rotate: 360 },
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: "linear" as Easing
    }
  }
};

// Combined preset for easy access - includes ALL animation types
export const animationPresets = {
  ...transitionAnimations,
  ...interactionAnimations,
  ...loadingAnimations
};

export const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

// Type exports for better usage
export type TransitionAnimationKey = keyof typeof transitionAnimations;
export type InteractionAnimationKey = keyof typeof interactionAnimations;
export type LoadingAnimationKey = keyof typeof loadingAnimations;
export type AnimationPresetKey = keyof typeof animationPresets;

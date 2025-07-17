
export const animationPresets = {
  // Transitions de base
  fadeIn: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3, ease: "easeOut" }
  },
  
  scaleIn: {
    initial: { scale: 0.95, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.95, opacity: 0 },
    transition: { duration: 0.2, ease: "easeOut" }
  },
  
  slideInLeft: {
    initial: { x: -30, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: -30, opacity: 0 },
    transition: { duration: 0.3, ease: "easeOut" }
  },
  
  slideInRight: {
    initial: { x: 30, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: 30, opacity: 0 },
    transition: { duration: 0.3, ease: "easeOut" }
  },
  
  // Micro-interactions
  buttonHover: {
    whileHover: { 
      scale: 1.02, 
      y: -1,
      transition: { duration: 0.15, ease: "easeOut" }
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
      transition: { duration: 0.2, ease: "easeOut" }
    }
  },
  
  // Loading states
  pulse: {
    animate: {
      scale: [1, 1.05, 1],
      opacity: [0.5, 1, 0.5],
    },
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  },
  
  spinner: {
    animate: { rotate: 360 },
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: "linear"
    }
  },
  
  // Focus et accessibilité
  focusRing: {
    whileFocus: {
      boxShadow: "0 0 0 3px hsl(var(--ring))",
      transition: { duration: 0.15 }
    }
  }
};

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

export const easings = {
  smooth: [0.25, 0.1, 0.25, 1],
  bounce: [0.68, -0.55, 0.265, 1.55],
  sharp: [0.4, 0, 0.2, 1],
  acceleration: [0.4, 0, 1, 1],
  deceleration: [0, 0, 0.2, 1]
};

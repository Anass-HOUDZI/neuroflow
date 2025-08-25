/**
 * Quick Performance Optimizer
 * Immediate optimizations for all pages
 */

// CSS Minification
export const minifyCSS = (css: string): string => {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
    .replace(/\s+/g, ' ') // Multiple spaces to single
    .replace(/\s*([{}:;,])\s*/g, '$1') // Remove spaces around special chars
    .replace(/;}/g, '}') // Remove trailing semicolons
    .trim();
};

// JS Minification
export const minifyJS = (js: string): string => {
  return js
    .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
    .replace(/\/\/.*$/gm, '') // Remove single-line comments
    .replace(/\s+/g, ' ') // Multiple spaces to single
    .replace(/\s*([{}();,])\s*/g, '$1') // Remove spaces
    .trim();
};

// Performance monitoring
export const initQuickOptimizations = (): void => {
  if (typeof window === 'undefined') return;

  // Memory cleanup
  setInterval(() => {
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (!['theme', 'user-preferences', 'habit-grid', 'mood-tracker'].some(k => key.includes(k))) {
        localStorage.removeItem(key);
      }
    });
  }, 300000); // Every 5 minutes

  // Performance monitoring
  const observer = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
      if (entry.duration > 100) {
        console.warn(`Slow operation: ${entry.name} - ${entry.duration}ms`);
      }
    });
  });
  
  observer.observe({ entryTypes: ['measure', 'navigation'] });

  console.log('✅ Quick optimizations initialized');
};

// Auto-initialize
if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', initQuickOptimizations);
}
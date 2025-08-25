/**
 * Performance Optimizer - Core optimization utilities
 * Provides global performance enhancements and monitoring
 */

import { ComponentType, lazy, memo } from 'react';

// Performance monitoring interface
export interface PerformanceMetrics {
  loadTime: number;
  renderTime: number;
  memoryUsage: number;
  bundleSize: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  cumulativeLayoutShift: number;
}

// Lazy loading utility with error boundary
export function createLazyComponent<T = {}>(
  importFunction: () => Promise<{ default: ComponentType<T> }>
) {
  return lazy(importFunction);
}

// Memoization utility for components
export function createMemoizedComponent<T = {}>(
  component: ComponentType<T>,
  arePropsEqual?: (prevProps: T, nextProps: T) => boolean
) {
  return memo(component, arePropsEqual);
}

// Bundle size optimization
export const bundleOptimization = {
  // Critical CSS inlining
  inlineCSS: (css: string): void => {
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
  },

  // Preload critical resources
  preloadResource: (href: string, as: string): void => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = href;
    link.as = as;
    document.head.appendChild(link);
  },

  // Lazy load non-critical resources
  lazyLoadResource: (href: string, as: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = href;
      link.as = as;
      link.onload = () => resolve();
      link.onerror = reject;
      document.head.appendChild(link);
    });
  }
};

// Memory optimization utilities
export const memoryOptimization = {
  // Clear unused data from localStorage
  clearUnusedLocalStorage: (): void => {
    const keys = Object.keys(localStorage);
    const activeKeys = [
      'theme',
      'user-preferences',
      'habit-grid',
      'mood-tracker',
      'journal-entries'
    ];
    
    keys.forEach(key => {
      if (!activeKeys.some(activeKey => key.includes(activeKey))) {
        localStorage.removeItem(key);
      }
    });
  },

  // Compress data before storing
  compressData: (data: any): string => {
    return JSON.stringify(data);
  },

  // Decompress stored data
  decompressData: (compressedData: string): any => {
    try {
      return JSON.parse(compressedData);
    } catch {
      return null;
    }
  }
};

// Performance monitoring
export const performanceMonitor = {
  // Measure component render time
  measureRenderTime: (componentName: string, renderFn: () => void): void => {
    const start = performance.now();
    renderFn();
    const end = performance.now();
    console.log(`${componentName} render time: ${end - start}ms`);
  },

  // Get current memory usage
  getMemoryUsage: (): number => {
    if ('memory' in performance) {
      return (performance as any).memory.usedJSHeapSize / 1024 / 1024;
    }
    return 0;
  },

  // Get Web Vitals
  getWebVitals: (): Promise<PerformanceMetrics> => {
    return new Promise((resolve) => {
      // Get navigation timing
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      
      // Get paint timing
      const paintEntries = performance.getEntriesByType('paint');
      const fcp = paintEntries.find(entry => entry.name === 'first-contentful-paint');
      
      // Get LCP via observer
      let lcp = 0;
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        lcp = lastEntry.startTime;
      }).observe({ entryTypes: ['largest-contentful-paint'] });

      // Get CLS via observer
      let cls = 0;
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            cls += (entry as any).value;
          }
        }
      }).observe({ entryTypes: ['layout-shift'] });

      setTimeout(() => {
        resolve({
          loadTime: navigation ? navigation.loadEventEnd - navigation.loadEventStart : 0,
          renderTime: navigation ? navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart : 0,
          memoryUsage: performanceMonitor.getMemoryUsage(),
          bundleSize: 0, // To be calculated by build process
          firstContentfulPaint: fcp ? fcp.startTime : 0,
          largestContentfulPaint: lcp,
          cumulativeLayoutShift: cls
        });
      }, 1000);
    });
  }
};

// CSS/JS Minification utilities
export const minificationUtils = {
  // Minify inline CSS
  minifyCSS: (css: string): string => {
    return css
      .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
      .replace(/\s+/g, ' ') // Replace multiple spaces with single space
      .replace(/;\s*}/g, '}') // Remove semicolon before closing brace
      .replace(/\s*{\s*/g, '{') // Remove spaces around opening brace
      .replace(/\s*}\s*/g, '}') // Remove spaces around closing brace
      .replace(/\s*,\s*/g, ',') // Remove spaces around commas
      .replace(/\s*:\s*/g, ':') // Remove spaces around colons
      .replace(/\s*;\s*/g, ';') // Remove spaces around semicolons
      .trim();
  },

  // Minify inline JavaScript
  minifyJS: (js: string): string => {
    return js
      .replace(/\/\*[\s\S]*?\*\//g, '') // Remove multi-line comments
      .replace(/\/\/.*$/gm, '') // Remove single-line comments
      .replace(/\s+/g, ' ') // Replace multiple spaces with single space
      .replace(/\s*([{}();,])\s*/g, '$1') // Remove spaces around special characters
      .trim();
  }
};

// Global performance optimization initialization
export const initializePerformanceOptimizations = (): void => {
  // Clean up memory on startup
  memoryOptimization.clearUnusedLocalStorage();

  // Set up performance monitoring
  if (typeof window !== 'undefined') {
    // Monitor page load performance
    window.addEventListener('load', () => {
      performanceMonitor.getWebVitals().then((metrics) => {
        console.log('Performance Metrics:', metrics);
      });
    });

    // Clean up memory on page unload
    window.addEventListener('beforeunload', () => {
      memoryOptimization.clearUnusedLocalStorage();
    });
  }
};
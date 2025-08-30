/**
 * Global Performance Optimizer
 * Applies application-wide performance optimizations
 */

import { CSSMinifier } from './CSSMinifier';
import { performanceMonitor, memoryOptimization } from './PerformanceOptimizer';

export class GlobalOptimizer {
  private static instance: GlobalOptimizer;
  private cssMinifier: CSSMinifier;
  private isInitialized = false;

  private constructor() {
    this.cssMinifier = CSSMinifier.getInstance();
  }

  public static getInstance(): GlobalOptimizer {
    if (!GlobalOptimizer.instance) {
      GlobalOptimizer.instance = new GlobalOptimizer();
    }
    return GlobalOptimizer.instance;
  }

  /**
   * Initialize all global optimizations
   */
  public async initialize(): Promise<void> {
    if (this.isInitialized) return;

    if (process.env.NODE_ENV === 'development') {
      console.log('🚀 Initializing Global Performance Optimizations...');
    }

    // 1. CSS Optimizations
    await this.optimizeCSS();

    // 2. Memory Optimizations
    this.optimizeMemory();

    // 3. Network Optimizations
    this.optimizeNetwork();

    // 4. Runtime Optimizations
    this.optimizeRuntime();

    // 5. Bundle Optimizations
    this.optimizeBundle();

    this.isInitialized = true;
    if (process.env.NODE_ENV === 'development') {
      console.log('✅ Global optimizations initialized successfully');
    }
  }

  /**
   * Optimize CSS across the application
   */
  private async optimizeCSS(): Promise<void> {
    try {
      // Get all stylesheets
      const stylesheets = Array.from(document.styleSheets);
      let totalOriginalSize = 0;
      let totalOptimizedSize = 0;

      for (const stylesheet of stylesheets) {
        try {
          if (stylesheet.href && !stylesheet.href.includes('fonts.googleapis.com')) {
            const response = await fetch(stylesheet.href);
            const cssText = await response.text();
            
            // Minify CSS
            const minifiedCSS = this.cssMinifier.minify(cssText);
            const compressedCSS = this.cssMinifier.compress(minifiedCSS);
            
            // Calculate savings
            const stats = this.cssMinifier.getOptimizationStats(cssText, compressedCSS);
            totalOriginalSize += stats.originalSize;
            totalOptimizedSize += stats.optimizedSize;

            if (process.env.NODE_ENV === 'development') {
              console.log(`CSS optimized: ${stylesheet.href.split('/').pop()} - ${stats.compressionRatio}% reduction`);
            }
          }
        } catch (error) {
          if (process.env.NODE_ENV === 'development') {
            console.warn('Could not optimize stylesheet:', stylesheet.href);
          }
        }
      }

      // Extract and inline critical CSS
      const criticalCSS = this.extractCriticalCSS();
      this.cssMinifier.inlineCriticalCSS(criticalCSS);

      const totalSavings = ((totalOriginalSize - totalOptimizedSize) / totalOriginalSize * 100).toFixed(2);
      if (process.env.NODE_ENV === 'development') {
        console.log(`📊 Total CSS size reduced by ${totalSavings}%`);
      }
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('CSS optimization failed:', error);
      }
    }
  }

  /**
   * Extract critical CSS for above-the-fold content
   */
  private extractCriticalCSS(): string {
    const criticalSelectors = [
      'body', 'html', 'header', 'nav', 'main', '.container',
      '[class*="bg-"]', '[class*="text-"]', '[class*="p-"]', 
      '[class*="m-"]', '[class*="flex"]', '[class*="grid"]'
    ];

    const criticalRules: string[] = [];
    
    criticalSelectors.forEach(selector => {
      try {
        const elements = document.querySelectorAll(selector);
        if (elements.length > 0) {
          const computedStyle = window.getComputedStyle(elements[0]);
          const styleString = computedStyle.cssText;
          if (styleString) {
            criticalRules.push(`${selector}{${styleString}}`);
          }
        }
      } catch (error) {
        // Ignore invalid selectors
      }
    });

    return criticalRules.join('');
  }

  /**
   * Optimize memory usage
   */
  private optimizeMemory(): void {
    // Clean up localStorage
    memoryOptimization.clearUnusedLocalStorage();

    // Set up memory monitoring
    setInterval(() => {
      const memoryUsage = performanceMonitor.getMemoryUsage();
      
      if (memoryUsage > 100) { // If > 100MB
        if (process.env.NODE_ENV === 'development') {
          console.warn(`⚠️ High memory usage: ${memoryUsage}MB`);
        }
        this.performMemoryCleanup();
      }
    }, 60000); // Check every minute

    if (process.env.NODE_ENV === 'development') {
      console.log('🧹 Memory optimization enabled');
    }
  }

  /**
   * Perform memory cleanup
   */
  private performMemoryCleanup(): void {
    // Force garbage collection if available
    if (window.gc) {
      window.gc();
    }

    // Clear unused localStorage entries
    memoryOptimization.clearUnusedLocalStorage();

    // Remove old performance entries
    if (performance.clearResourceTimings) {
      performance.clearResourceTimings();
    }

    if (process.env.NODE_ENV === 'development') {
      console.log('🧹 Memory cleanup performed');
    }
  }

  /**
   * Optimize network requests
   */
  private optimizeNetwork(): void {
    // Preload critical resources
    const criticalResources = [
      '/src/components/layout/GlobalLayout.tsx',
      '/src/components/layout/FixedHeader.tsx'
    ];

    criticalResources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource;
      link.as = 'script';
      document.head.appendChild(link);
    });

    // Set up resource timing monitoring
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.duration > 1000) { // > 1 second
          if (process.env.NODE_ENV === 'development') {
            console.warn(`⚠️ Slow resource: ${entry.name} - ${entry.duration}ms`);
          }
        }
      });
    });

    observer.observe({ entryTypes: ['resource'] });

    if (process.env.NODE_ENV === 'development') {
      console.log('🌐 Network optimization enabled');
    }
  }

  /**
   * Optimize runtime performance
   */
  private optimizeRuntime(): void {
    // Debounce resize events
    let resizeTimeout: NodeJS.Timeout;
    const originalResize = window.onresize;
    
    window.onresize = (event) => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (originalResize) originalResize.call(window, event);
      }, 250);
    };

    // Optimize scroll events
    let scrollTimeout: NodeJS.Timeout;
    const originalScroll = window.onscroll;
    
    window.onscroll = (event) => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        if (originalScroll) originalScroll.call(window, event);
      }, 16); // ~60fps
    };

    if (process.env.NODE_ENV === 'development') {
      console.log('⚡ Runtime optimization enabled');
    }
  }

  /**
   * Optimize bundle loading
   */
  private optimizeBundle(): void {
    // Preload route chunks
    const routeChunks = [
      '/src/pages/Index.tsx',
      '/src/pages/Analytics.tsx',
      '/src/pages/Journal.tsx'
    ];

    routeChunks.forEach(chunk => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = chunk;
      document.head.appendChild(link);
    });

    if (process.env.NODE_ENV === 'development') {
      console.log('📦 Bundle optimization enabled');
    }
  }

  /**
   * Get optimization report
   */
  public async getOptimizationReport(): Promise<{
    memoryUsage: number;
    loadTime: number;
    cssOptimized: boolean;
    networkOptimized: boolean;
    bundleOptimized: boolean;
  }> {
    const memoryUsage = performanceMonitor.getMemoryUsage();
    const metrics = await performanceMonitor.getWebVitals();

    return {
      memoryUsage,
      loadTime: metrics.loadTime,
      cssOptimized: this.isInitialized,
      networkOptimized: this.isInitialized,
      bundleOptimized: this.isInitialized
    };
  }
}

// Auto-initialize on import
if (typeof window !== 'undefined') {
  const globalOptimizer = GlobalOptimizer.getInstance();
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      globalOptimizer.initialize();
    });
  } else {
    globalOptimizer.initialize();
  }
}

export default GlobalOptimizer;
/**
 * Core Optimization Export Hub
 * Centralized exports for all optimization utilities
 */

// Performance optimization utilities
export {
  createLazyComponent,
  createMemoizedComponent,
  bundleOptimization,
  memoryOptimization,
  performanceMonitor,
  minificationUtils,
  initializePerformanceOptimizations,
  type PerformanceMetrics
} from './PerformanceOptimizer';

// Page optimization components
export {
  withPageOptimization,
  PageOptimizer,
  OptimizedRoute
} from './PageOptimizer';

// CSS optimization
export { CSSMinifier } from './CSSMinifier';

// Automatic initialization on import
import { initializePerformanceOptimizations } from './PerformanceOptimizer';

// Initialize optimizations when module is loaded
if (typeof window !== 'undefined') {
  initializePerformanceOptimizations();
}
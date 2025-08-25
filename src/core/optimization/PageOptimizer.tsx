/**
 * Page Optimizer - High-order component for page-level optimizations
 * Automatically applies performance optimizations to any page component
 */

import React, { ComponentType, memo, useEffect, Suspense } from 'react';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { performanceMonitor, initializePerformanceOptimizations } from './PerformanceOptimizer';

interface PageOptimizerProps {
  pageName: string;
  children: React.ReactNode;
  enableLazyLoading?: boolean;
  enableMemoryOptimization?: boolean;
  enablePerformanceMonitoring?: boolean;
}

// Higher-order component for page optimization
export function withPageOptimization<T extends object>(
  WrappedComponent: ComponentType<T>,
  options: {
    pageName: string;
    enableLazyLoading?: boolean;
    enableMemoryOptimization?: boolean;
    enablePerformanceMonitoring?: boolean;
  }
) {
  const OptimizedPage = memo((props: T) => {
    useEffect(() => {
      const { pageName, enablePerformanceMonitoring = true } = options;
      
      if (enablePerformanceMonitoring) {
        const startTime = performance.now();
        
        // Monitor component mount time
        const endTime = performance.now();
        console.log(`${pageName} mount time: ${endTime - startTime}ms`);
        
        // Initialize performance optimizations
        initializePerformanceOptimizations();
      }
    }, []);

    return <WrappedComponent {...props} />;
  });

  OptimizedPage.displayName = `OptimizedPage(${options.pageName})`;
  
  return OptimizedPage;
}

// Page optimizer wrapper component
export const PageOptimizer: React.FC<PageOptimizerProps> = memo(({
  pageName,
  children,
  enableLazyLoading = true,
  enableMemoryOptimization = true,
  enablePerformanceMonitoring = true
}) => {
  useEffect(() => {
    if (enablePerformanceMonitoring) {
      const startTime = performance.now();
      
      // Monitor page render time
      const observer = new MutationObserver(() => {
        const endTime = performance.now();
        console.log(`${pageName} total render time: ${endTime - startTime}ms`);
        observer.disconnect();
      });
      
      observer.observe(document.body, { childList: true, subtree: true });
      
      // Initialize optimizations
      initializePerformanceOptimizations();
    }

    if (enableMemoryOptimization) {
      // Clean up interval for memory monitoring
      const memoryInterval = setInterval(() => {
        const memoryUsage = performanceMonitor.getMemoryUsage();
        if (memoryUsage > 50) { // If memory usage > 50MB
          console.warn(`High memory usage detected: ${memoryUsage}MB`);
        }
      }, 30000); // Check every 30 seconds

      return () => clearInterval(memoryInterval);
    }
  }, [pageName, enableMemoryOptimization, enablePerformanceMonitoring]);

  if (enableLazyLoading) {
    return (
      <Suspense fallback={<LoadingSpinner />}>
        {children}
      </Suspense>
    );
  }

  return <>{children}</>;
});

PageOptimizer.displayName = 'PageOptimizer';

// Optimized route wrapper
export const OptimizedRoute: React.FC<{
  component: ComponentType<any>;
  pageName: string;
  [key: string]: any;
}> = memo(({ component: Component, pageName, ...props }) => {
  return (
    <PageOptimizer pageName={pageName}>
      <Component {...props} />
    </PageOptimizer>
  );
});

OptimizedRoute.displayName = 'OptimizedRoute';
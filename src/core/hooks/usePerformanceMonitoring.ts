import { useEffect, useCallback } from 'react';

interface MemoryUsage {
  used: number;
  total: number;
  limit: number;
}

interface PerformanceMetrics {
  loadTime: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  cumulativeLayoutShift: number;
  firstInputDelay: number;
  timeToInteractive: number;
  memoryUsage?: MemoryUsage;
}

interface UsePerformanceMonitoringOptions {
  enabled?: boolean;
  reportInterval?: number;
  onMetrics?: (metrics: Partial<PerformanceMetrics>) => void;
}

export const usePerformanceMonitoring = (options: UsePerformanceMonitoringOptions = {}) => {
  const { enabled = true, reportInterval = 10000, onMetrics } = options;

  const collectMetrics = useCallback((): Partial<PerformanceMetrics> => {
    const metrics: Partial<PerformanceMetrics> = {};

    // Navigation timing
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (navigation) {
      metrics.loadTime = navigation.loadEventEnd - navigation.loadEventStart;
    }

    // Paint timing
    const paintEntries = performance.getEntriesByType('paint');
    const fcp = paintEntries.find(entry => entry.name === 'first-contentful-paint');
    if (fcp) {
      metrics.firstContentfulPaint = fcp.startTime;
    }

    // LCP (requires observer)
    const lcpEntries = performance.getEntriesByType('largest-contentful-paint');
    if (lcpEntries.length > 0) {
      metrics.largestContentfulPaint = lcpEntries[lcpEntries.length - 1].startTime;
    }

    // Memory usage (if available)
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      metrics.memoryUsage = {
        used: memory.usedJSHeapSize,
        total: memory.totalJSHeapSize,
        limit: memory.jsHeapSizeLimit
      };
    }

    return metrics;
  }, []);

  const observeLCP = useCallback(() => {
    if (!('PerformanceObserver' in window)) return;

    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      if (lastEntry && onMetrics) {
        onMetrics({ largestContentfulPaint: lastEntry.startTime });
      }
    });

    try {
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (e) {
      console.warn('LCP observer not supported');
    }

    return () => observer.disconnect();
  }, [onMetrics]);

  const observeCLS = useCallback(() => {
    if (!('PerformanceObserver' in window)) return;

    let clsValue = 0;
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!(entry as any).hadRecentInput) {
          clsValue += (entry as any).value;
        }
      }
      if (onMetrics) {
        onMetrics({ cumulativeLayoutShift: clsValue });
      }
    });

    try {
      observer.observe({ entryTypes: ['layout-shift'] });
    } catch (e) {
      console.warn('CLS observer not supported');
    }

    return () => observer.disconnect();
  }, [onMetrics]);

  const observeFID = useCallback(() => {
    if (!('PerformanceObserver' in window)) return;

    const observer = new PerformanceObserver((list) => {
      const firstEntry = list.getEntries()[0];
      if (firstEntry && onMetrics) {
        onMetrics({ 
          firstInputDelay: (firstEntry as any).processingStart - firstEntry.startTime 
        });
      }
    });

    try {
      observer.observe({ entryTypes: ['first-input'] });
    } catch (e) {
      console.warn('FID observer not supported');
    }

    return () => observer.disconnect();
  }, [onMetrics]);

  useEffect(() => {
    if (!enabled) return;

    const cleanup: (() => void)[] = [];

    // Set up performance observers
    cleanup.push(observeLCP());
    cleanup.push(observeCLS());
    cleanup.push(observeFID());

    // Periodic metrics collection
    const interval = setInterval(() => {
      const metrics = collectMetrics();
      if (onMetrics && Object.keys(metrics).length > 0) {
        onMetrics(metrics);
      }
    }, reportInterval);

    // Initial metrics collection after page load
    setTimeout(() => {
      const metrics = collectMetrics();
      if (onMetrics && Object.keys(metrics).length > 0) {
        onMetrics(metrics);
      }
    }, 1000);

    return () => {
      cleanup.forEach(fn => fn?.());
      clearInterval(interval);
    };
  }, [enabled, reportInterval, onMetrics, collectMetrics, observeLCP, observeCLS, observeFID]);

  return {
    collectMetrics,
    getMemoryUsage: () => {
      if ('memory' in performance) {
        const memory = (performance as any).memory;
        return {
          used: Math.round(memory.usedJSHeapSize / 1024 / 1024),
          total: Math.round(memory.totalJSHeapSize / 1024 / 1024),
          limit: Math.round(memory.jsHeapSizeLimit / 1024 / 1024)
        };
      }
      return null;
    }
  };
};

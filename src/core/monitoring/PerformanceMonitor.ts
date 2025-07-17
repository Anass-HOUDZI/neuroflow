
interface PerformanceData {
  timestamp: number;
  url: string;
  loadTime: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  cumulativeLayoutShift: number;
  firstInputDelay: number;
  memoryUsage: {
    used: number;
    total: number;
    limit: number;
  } | null;
  bundleSize: number;
  renderTime: number;
}

class PerformanceMonitor {
  private data: PerformanceData[] = [];
  private observer: PerformanceObserver | null = null;
  private memoryInterval: number | null = null;

  constructor() {
    this.initializeObserver();
    this.startMemoryMonitoring();
    this.trackInitialLoad();
  }

  private initializeObserver() {
    if ('PerformanceObserver' in window) {
      this.observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          this.processEntry(entry);
        }
      });

      // Observer les Web Vitals
      this.observer.observe({ 
        entryTypes: ['navigation', 'paint', 'largest-contentful-paint', 'layout-shift', 'first-input'] 
      });
    }
  }

  private processEntry(entry: PerformanceEntry) {
    const data: Partial<PerformanceData> = {
      timestamp: Date.now(),
      url: window.location.pathname,
    };

    switch (entry.entryType) {
      case 'navigation':
        const navEntry = entry as PerformanceNavigationTiming;
        data.loadTime = navEntry.loadEventEnd - navEntry.fetchStart;
        break;
        
      case 'paint':
        if (entry.name === 'first-contentful-paint') {
          data.firstContentfulPaint = entry.startTime;
        }
        break;
        
      case 'largest-contentful-paint':
        data.largestContentfulPaint = entry.startTime;
        break;
        
      case 'layout-shift':
        const clsEntry = entry as any;
        if (!clsEntry.hadRecentInput) {
          data.cumulativeLayoutShift = clsEntry.value;
        }
        break;
        
      case 'first-input':
        const fidEntry = entry as any;
        data.firstInputDelay = fidEntry.processingStart - fidEntry.startTime;
        break;
    }

    this.updatePerformanceData(data);
  }

  private startMemoryMonitoring() {
    if ('memory' in performance) {
      this.memoryInterval = window.setInterval(() => {
        const memory = (performance as any).memory;
        const memoryData = {
          used: Math.round(memory.usedJSHeapSize / 1048576), // MB
          total: Math.round(memory.totalJSHeapSize / 1048576), // MB
          limit: Math.round(memory.jsHeapSizeLimit / 1048576), // MB
        };
        
        this.updatePerformanceData({ 
          timestamp: Date.now(),
          url: window.location.pathname,
          memoryUsage: memoryData 
        });
      }, 5000); // Check every 5 seconds
    }
  }

  private trackInitialLoad() {
    window.addEventListener('load', () => {
      setTimeout(() => {
        const paintEntries = performance.getEntriesByType('paint');
        const navigationEntries = performance.getEntriesByType('navigation');
        
        if (navigationEntries.length > 0) {
          const navEntry = navigationEntries[0] as PerformanceNavigationTiming;
          
          const initialData: Partial<PerformanceData> = {
            timestamp: Date.now(),
            url: window.location.pathname,
            loadTime: navEntry.loadEventEnd - navEntry.fetchStart,
            renderTime: navEntry.domContentLoadedEventEnd - navEntry.domContentLoadedEventStart,
          };

          // Get FCP if available
          const fcpEntry = paintEntries.find(entry => entry.name === 'first-contentful-paint');
          if (fcpEntry) {
            initialData.firstContentfulPaint = fcpEntry.startTime;
          }

          this.updatePerformanceData(initialData);
        }
      }, 0);
    });
  }

  private updatePerformanceData(newData: Partial<PerformanceData>) {
    const existingIndex = this.data.findIndex(
      item => item.url === newData.url && 
      Math.abs(item.timestamp - (newData.timestamp || 0)) < 1000
    );

    if (existingIndex >= 0) {
      this.data[existingIndex] = { ...this.data[existingIndex], ...newData };
    } else {
      this.data.push({
        timestamp: Date.now(),
        url: window.location.pathname,
        loadTime: 0,
        firstContentfulPaint: 0,
        largestContentfulPaint: 0,
        cumulativeLayoutShift: 0,
        firstInputDelay: 0,
        memoryUsage: null,
        bundleSize: 0,
        renderTime: 0,
        ...newData
      } as PerformanceData);
    }

    // Keep only last 100 entries
    if (this.data.length > 100) {
      this.data = this.data.slice(-100);
    }

    // Store in localStorage
    this.persistData();
  }

  private persistData() {
    try {
      localStorage.setItem('neuroflow-performance', JSON.stringify(this.data));
    } catch (e) {
      console.warn('Could not persist performance data:', e);
    }
  }

  public getPerformanceData(): PerformanceData[] {
    return [...this.data];
  }

  public getAverageMetrics(): {
    avgLoadTime: number;
    avgFCP: number;
    avgLCP: number;
    avgCLS: number;
    avgFID: number;
    avgMemoryUsage: number;
  } {
    if (this.data.length === 0) {
      return {
        avgLoadTime: 0,
        avgFCP: 0,
        avgLCP: 0,
        avgCLS: 0,
        avgFID: 0,
        avgMemoryUsage: 0,
      };
    }

    const totals = this.data.reduce((acc, item) => {
      acc.loadTime += item.loadTime || 0;
      acc.fcp += item.firstContentfulPaint || 0;
      acc.lcp += item.largestContentfulPaint || 0;
      acc.cls += item.cumulativeLayoutShift || 0;
      acc.fid += item.firstInputDelay || 0;
      acc.memory += item.memoryUsage?.used || 0;
      return acc;
    }, { loadTime: 0, fcp: 0, lcp: 0, cls: 0, fid: 0, memory: 0 });

    const count = this.data.length;
    
    return {
      avgLoadTime: Math.round(totals.loadTime / count),
      avgFCP: Math.round(totals.fcp / count),
      avgLCP: Math.round(totals.lcp / count),
      avgCLS: Number((totals.cls / count).toFixed(3)),
      avgFID: Math.round(totals.fid / count),
      avgMemoryUsage: Math.round(totals.memory / count),
    };
  }

  public getPerformanceScore(): number {
    const metrics = this.getAverageMetrics();
    
    // Calculate score based on Web Vitals thresholds
    let score = 100;
    
    // FCP should be < 1.8s (good), < 3s (needs improvement)
    if (metrics.avgFCP > 3000) score -= 20;
    else if (metrics.avgFCP > 1800) score -= 10;
    
    // LCP should be < 2.5s (good), < 4s (needs improvement)  
    if (metrics.avgLCP > 4000) score -= 25;
    else if (metrics.avgLCP > 2500) score -= 15;
    
    // CLS should be < 0.1 (good), < 0.25 (needs improvement)
    if (metrics.avgCLS > 0.25) score -= 20;
    else if (metrics.avgCLS > 0.1) score -= 10;
    
    // FID should be < 100ms (good), < 300ms (needs improvement)
    if (metrics.avgFID > 300) score -= 15;
    else if (metrics.avgFID > 100) score -= 8;
    
    // Memory usage penalty if > 50MB
    if (metrics.avgMemoryUsage > 50) score -= 10;
    
    return Math.max(0, score);
  }

  public cleanup() {
    if (this.observer) {
      this.observer.disconnect();
    }
    if (this.memoryInterval) {
      clearInterval(this.memoryInterval);
    }
  }
}

// Singleton instance
export const performanceMonitor = new PerformanceMonitor();

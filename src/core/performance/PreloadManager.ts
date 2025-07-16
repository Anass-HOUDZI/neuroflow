
// Ultra-fast preloading manager for critical resources
export class PreloadManager {
  private static instance: PreloadManager;
  private preloadedRoutes = new Set<string>();
  
  static getInstance(): PreloadManager {
    if (!PreloadManager.instance) {
      PreloadManager.instance = new PreloadManager();
    }
    return PreloadManager.instance;
  }
  
  // Preload critical routes based on user behavior
  preloadRoute(routePath: string): void {
    if (this.preloadedRoutes.has(routePath)) return;
    
    // Preload the route component
    this.preloadedRoutes.add(routePath);
    
    // Dynamic import with prefetch
    const moduleMap: Record<string, () => Promise<any>> = {
      '/wellness': () => import('@/modules/wellness/WellnessRoutes'),
      '/productivity': () => import('@/modules/productivity/ProductivityRoutes'),
      '/health': () => import('@/modules/health/HealthRoutes'),
      '/analytics': () => import('@/modules/analytics/AnalyticsRoutes'),
      '/tools': () => import('@/modules/tools/ToolsRoutes')
    };
    
    const moduleLoader = moduleMap[routePath];
    if (moduleLoader) {
      // Preload on idle or with slight delay
      requestIdleCallback(() => {
        moduleLoader().catch(() => {
          // Silent fail for preloading
        });
      });
    }
  }
  
  // Preload resources on hover (predictive loading)
  preloadOnHover(element: HTMLElement, routePath: string): void {
    let timeoutId: number;
    
    element.addEventListener('mouseenter', () => {
      timeoutId = window.setTimeout(() => {
        this.preloadRoute(routePath);
      }, 100); // 100ms delay
    });
    
    element.addEventListener('mouseleave', () => {
      clearTimeout(timeoutId);
    });
  }
}

// Export singleton instance
export const preloadManager = PreloadManager.getInstance();

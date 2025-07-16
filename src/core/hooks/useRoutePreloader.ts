
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { preloadManager } from '@/core/performance/PreloadManager';

// Hook for intelligent route preloading
export function useRoutePreloader() {
  const location = useLocation();
  
  useEffect(() => {
    // Preload likely next routes based on current location
    const currentPath = location.pathname;
    
    // Predictive preloading logic
    const preloadMap: Record<string, string[]> = {
      '/': ['/wellness', '/productivity'], // From home, likely to visit these
      '/wellness': ['/productivity', '/health'],
      '/productivity': ['/wellness', '/analytics'],
      '/health': ['/wellness', '/analytics'],
      '/analytics': ['/productivity', '/tools']
    };
    
    const moduleToPreload = Object.entries(preloadMap).find(([path]) => 
      currentPath.startsWith(path)
    );
    
    if (moduleToPreload) {
      const [, routesToPreload] = moduleToPreload;
      routesToPreload.forEach(route => {
        preloadManager.preloadRoute(route);
      });
    }
  }, [location.pathname]);
}

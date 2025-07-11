
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Activity, Zap, Clock, Wifi } from 'lucide-react';

interface PerformanceMetrics {
  loadTime: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  cumulativeLayoutShift: number;
  firstInputDelay: number;
  memoryUsage?: number;
  connectionType: string;
  isOnline: boolean;
}

const PerformanceMonitor: React.FC = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show in development or if explicitly enabled
    const shouldShow = process.env.NODE_ENV === 'development' || 
                      localStorage.getItem('neuroflow-perf-monitor') === 'true';
    setIsVisible(shouldShow);

    if (!shouldShow) return;

    const collectMetrics = () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      const paint = performance.getEntriesByType('paint');
      
      const fcp = paint.find(entry => entry.name === 'first-contentful-paint')?.startTime || 0;
      
      // Get LCP using PerformanceObserver
      let lcp = 0;
      if ('PerformanceObserver' in window) {
        try {
          const observer = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            lcp = lastEntry.startTime;
          });
          observer.observe({ entryTypes: ['largest-contentful-paint'] });
        } catch (error) {
          console.warn('LCP observer failed:', error);
        }
      }

      // Get memory usage if available
      const memoryInfo = (performance as any).memory;
      const memoryUsage = memoryInfo ? 
        Math.round((memoryInfo.usedJSHeapSize / memoryInfo.totalJSHeapSize) * 100) : 
        undefined;

      // Get connection info
      const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
      const connectionType = connection ? connection.effectiveType || 'unknown' : 'unknown';

      setMetrics({
        loadTime: Math.round(navigation.loadEventEnd - navigation.navigationStart),
        firstContentfulPaint: Math.round(fcp),
        largestContentfulPaint: Math.round(lcp),
        cumulativeLayoutShift: 0, // Would need Layout Instability API
        firstInputDelay: 0, // Would need First Input Delay API
        memoryUsage,
        connectionType,
        isOnline: navigator.onLine
      });
    };

    // Collect metrics after page load
    if (document.readyState === 'complete') {
      collectMetrics();
    } else {
      window.addEventListener('load', collectMetrics);
    }

    // Update connection status
    const updateConnectionStatus = () => {
      setMetrics(prev => prev ? { ...prev, isOnline: navigator.onLine } : null);
    };

    window.addEventListener('online', updateConnectionStatus);
    window.addEventListener('offline', updateConnectionStatus);

    return () => {
      window.removeEventListener('load', collectMetrics);
      window.removeEventListener('online', updateConnectionStatus);
      window.removeEventListener('offline', updateConnectionStatus);
    };
  }, []);

  if (!isVisible || !metrics) return null;

  const getPerformanceScore = (metric: number, thresholds: [number, number]) => {
    if (metric <= thresholds[0]) return { score: 100, color: 'green' };
    if (metric <= thresholds[1]) return { score: 75, color: 'yellow' };
    return { score: 50, color: 'red' };
  };

  const loadScore = getPerformanceScore(metrics.loadTime, [1000, 3000]);
  const fcpScore = getPerformanceScore(metrics.firstContentfulPaint, [1800, 3000]);

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm">
      <Card className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-2">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Performance Monitor
          </CardTitle>
          <CardDescription className="text-xs">
            Métriques temps réel
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs flex items-center gap-1">
              <Clock className="h-3 w-3" />
              Temps de chargement
            </span>
            <div className="flex items-center gap-2">
              <Progress value={loadScore.score} className="w-16 h-2" />
              <Badge variant={loadScore.color === 'green' ? 'default' : 'destructive'} className="text-xs">
                {metrics.loadTime}ms
              </Badge>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs flex items-center gap-1">
              <Zap className="h-3 w-3" />
              First Contentful Paint
            </span>
            <div className="flex items-center gap-2">
              <Progress value={fcpScore.score} className="w-16 h-2" />
              <Badge variant={fcpScore.color === 'green' ? 'default' : 'destructive'} className="text-xs">
                {metrics.firstContentfulPaint}ms
              </Badge>
            </div>
          </div>

          {metrics.memoryUsage && (
            <div className="flex items-center justify-between">
              <span className="text-xs">Mémoire utilisée</span>
              <div className="flex items-center gap-2">
                <Progress value={metrics.memoryUsage} className="w-16 h-2" />
                <Badge variant="outline" className="text-xs">
                  {metrics.memoryUsage}%
                </Badge>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between pt-2 border-t">
            <span className="text-xs flex items-center gap-1">
              <Wifi className="h-3 w-3" />
              Connexion
            </span>
            <div className="flex items-center gap-2">
              <Badge variant={metrics.isOnline ? 'default' : 'destructive'} className="text-xs">
                {metrics.connectionType}
              </Badge>
              <Badge variant={metrics.isOnline ? 'default' : 'destructive'} className="text-xs">
                {metrics.isOnline ? 'En ligne' : 'Hors ligne'}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PerformanceMonitor;

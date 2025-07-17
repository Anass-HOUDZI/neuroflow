
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { usePerformanceMonitoring } from '@/core/hooks/usePerformanceMonitoring';
import { Activity, Zap, Clock, MemoryStick, Gauge } from 'lucide-react';

interface PerformanceData {
  timestamp: number;
  loadTime?: number;
  fcp?: number;
  lcp?: number;
  memory?: number;
}

export const PerformanceDashboard = React.memo(() => {
  const [performanceData, setPerformanceData] = useState<PerformanceData[]>([]);
  const [currentMetrics, setCurrentMetrics] = useState<any>({});

  const { collectMetrics, getMemoryUsage } = usePerformanceMonitoring({
    enabled: true,
    reportInterval: 5000,
    onMetrics: (metrics) => {
      setCurrentMetrics(prev => ({ ...prev, ...metrics }));
      
      const newDataPoint: PerformanceData = {
        timestamp: Date.now(),
        loadTime: metrics.loadTime,
        fcp: metrics.firstContentfulPaint,
        lcp: metrics.largestContentfulPaint,
        memory: getMemoryUsage()?.used || 0
      };
      
      setPerformanceData(prev => [...prev.slice(-19), newDataPoint]);
    }
  });

  const chartData = performanceData.map((data, index) => ({
    time: `T-${performanceData.length - index - 1}`,
    fcp: data.fcp ? Math.round(data.fcp) : null,
    lcp: data.lcp ? Math.round(data.lcp) : null,
    memory: data.memory
  }));

  const getScoreColor = (score: number, type: 'time' | 'memory') => {
    if (type === 'time') {
      if (score < 1000) return 'text-green-500';
      if (score < 2500) return 'text-yellow-500';
      return 'text-red-500';
    } else {
      if (score < 50) return 'text-green-500';
      if (score < 100) return 'text-yellow-500';
      return 'text-red-500';
    }
  };

  const formatTime = (ms: number) => `${Math.round(ms)}ms`;
  const formatMemory = (mb: number) => `${Math.round(mb)}MB`;

  return (
    <div className="space-y-6">
      {/* Current Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Clock className="h-5 w-5 text-blue-500" />
            </div>
            <div className={`text-lg font-bold ${getScoreColor(currentMetrics.firstContentfulPaint || 0, 'time')}`}>
              {currentMetrics.firstContentfulPaint ? formatTime(currentMetrics.firstContentfulPaint) : '-'}
            </div>
            <div className="text-xs text-gray-500">FCP</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Zap className="h-5 w-5 text-orange-500" />
            </div>
            <div className={`text-lg font-bold ${getScoreColor(currentMetrics.largestContentfulPaint || 0, 'time')}`}>
              {currentMetrics.largestContentfulPaint ? formatTime(currentMetrics.largestContentfulPaint) : '-'}
            </div>
            <div className="text-xs text-gray-500">LCP</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <MemoryStick className="h-5 w-5 text-purple-500" />
            </div>
            <div className={`text-lg font-bold ${getScoreColor(getMemoryUsage()?.used || 0, 'memory')}`}>
              {getMemoryUsage() ? formatMemory(getMemoryUsage()!.used) : '-'}
            </div>
            <div className="text-xs text-gray-500">Mémoire</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Gauge className="h-5 w-5 text-green-500" />
            </div>
            <div className="text-lg font-bold text-green-500">
              {currentMetrics.cumulativeLayoutShift ? 
                Math.round(currentMetrics.cumulativeLayoutShift * 1000) / 1000 : 
                '-'
              }
            </div>
            <div className="text-xs text-gray-500">CLS</div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Trends */}
      {chartData.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Tendances Performance (temps réel)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis yAxisId="time" orientation="left" />
                <YAxis yAxisId="memory" orientation="right" />
                <Tooltip 
                  formatter={(value: number, name: string) => [
                    name === 'memory' ? formatMemory(value) : formatTime(value),
                    name === 'fcp' ? 'First Contentful Paint' :
                    name === 'lcp' ? 'Largest Contentful Paint' : 'Mémoire'
                  ]}
                />
                <Line 
                  yAxisId="time"
                  type="monotone" 
                  dataKey="fcp" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  name="fcp"
                  connectNulls={false}
                />
                <Line 
                  yAxisId="time"
                  type="monotone" 
                  dataKey="lcp" 
                  stroke="#f59e0b" 
                  strokeWidth={2}
                  name="lcp"
                  connectNulls={false}
                />
                <Line 
                  yAxisId="memory"
                  type="monotone" 
                  dataKey="memory" 
                  stroke="#8b5cf6" 
                  strokeWidth={2}
                  name="memory"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      {/* Performance Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Insights Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {currentMetrics.firstContentfulPaint && currentMetrics.firstContentfulPaint < 1000 && (
              <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <p className="text-sm text-green-800 dark:text-green-200">
                  ✅ Excellent FCP ! Votre app se charge très rapidement.
                </p>
              </div>
            )}
            {currentMetrics.largestContentfulPaint && currentMetrics.largestContentfulPaint > 2500 && (
              <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                <p className="text-sm text-orange-800 dark:text-orange-200">
                  ⚠️ LCP élevé. Considérez optimiser les images et ressources lourdes.
                </p>
              </div>
            )}
            {getMemoryUsage() && getMemoryUsage()!.used > 100 && (
              <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                  💾 Usage mémoire élevé ({formatMemory(getMemoryUsage()!.used)}). 
                  L'app utilise beaucoup de mémoire.
                </p>
              </div>
            )}
            {performanceData.length === 0 && (
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  📊 Collecte des métriques en cours... Les données s'afficheront dans quelques secondes.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
});

PerformanceDashboard.displayName = 'PerformanceDashboard';

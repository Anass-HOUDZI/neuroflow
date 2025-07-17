
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { useWellnessStore } from '@/core/stores/wellnessStore';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export const MoodVisualization = React.memo(() => {
  const moodEntries = useWellnessStore((state) => state.moodEntries);

  const chartData = React.useMemo(() => {
    return moodEntries
      .slice(0, 30)
      .reverse()
      .map((entry, index) => ({
        day: `J-${29 - index}`,
        mood: entry.mood,
        energy: entry.energy,
        stress: entry.stress,
        date: new Date(entry.date).toLocaleDateString()
      }));
  }, [moodEntries]);

  const trends = React.useMemo(() => {
    if (chartData.length < 7) return { mood: 'stable', energy: 'stable', stress: 'stable' };
    
    const recent = chartData.slice(-7);
    const previous = chartData.slice(-14, -7);
    
    const recentAvg = {
      mood: recent.reduce((sum, d) => sum + d.mood, 0) / recent.length,
      energy: recent.reduce((sum, d) => sum + d.energy, 0) / recent.length,
      stress: recent.reduce((sum, d) => sum + d.stress, 0) / recent.length
    };
    
    const previousAvg = {
      mood: previous.reduce((sum, d) => sum + d.mood, 0) / previous.length,
      energy: previous.reduce((sum, d) => sum + d.energy, 0) / previous.length,
      stress: previous.reduce((sum, d) => sum + d.stress, 0) / previous.length
    };
    
    const getTrend = (recent: number, previous: number) => {
      const diff = recent - previous;
      if (Math.abs(diff) < 0.3) return 'stable';
      return diff > 0 ? 'improving' : 'declining';
    };
    
    return {
      mood: getTrend(recentAvg.mood, previousAvg.mood),
      energy: getTrend(recentAvg.energy, previousAvg.energy),
      stress: getTrend(previousAvg.stress, recentAvg.stress) // Inverted for stress
    };
  }, [chartData]);

  const TrendIcon = ({ trend }: { trend: string }) => {
    switch (trend) {
      case 'improving': return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'declining': return <TrendingDown className="h-4 w-4 text-red-500" />;
      default: return <Minus className="h-4 w-4 text-gray-500" />;
    }
  };

  if (chartData.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center text-gray-500">
          <p>Pas assez de données pour afficher les visualisations</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Trend Summary */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <TrendIcon trend={trends.mood} />
            </div>
            <div className="text-sm font-medium">Humeur</div>
            <div className="text-xs text-gray-500 capitalize">{trends.mood}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <TrendIcon trend={trends.energy} />
            </div>
            <div className="text-sm font-medium">Énergie</div>
            <div className="text-xs text-gray-500 capitalize">{trends.energy}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <TrendIcon trend={trends.stress} />
            </div>
            <div className="text-sm font-medium">Stress</div>
            <div className="text-xs text-gray-500 capitalize">{trends.stress}</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Évolution sur 30 jours</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis domain={[1, 5]} />
              <Tooltip 
                labelFormatter={(label) => `Jour ${label}`}
                formatter={(value: number, name: string) => [
                  value.toFixed(1), 
                  name === 'mood' ? 'Humeur' : name === 'energy' ? 'Énergie' : 'Stress'
                ]}
              />
              <Area type="monotone" dataKey="mood" stackId="1" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
              <Area type="monotone" dataKey="energy" stackId="2" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.3} />
              <Area type="monotone" dataKey="stress" stackId="3" stroke="#ffc658" fill="#ffc658" fillOpacity={0.3} />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Correlation Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {chartData.length > 7 && (
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-sm">
                  💡 Votre humeur moyenne cette semaine : {
                    (chartData.slice(-7).reduce((sum, d) => sum + d.mood, 0) / 7).toFixed(1)
                  }/5
                </p>
              </div>
            )}
            {trends.mood === 'improving' && (
              <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <p className="text-sm">
                  🌟 Excellente progression de votre humeur ! Continuez vos bonnes habitudes.
                </p>
              </div>
            )}
            {trends.stress === 'declining' && (
              <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                <p className="text-sm">
                  ⚠️ Votre niveau de stress augmente. Pensez à prendre des pauses régulières.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
});

MoodVisualization.displayName = 'MoodVisualization';

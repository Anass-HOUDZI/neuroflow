
import React, { useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useWellnessStore } from '@/core/stores/wellnessStore';
import { TrendingUp, TrendingDown, Heart, Zap, AlertTriangle } from 'lucide-react';

const moodLabels = ["", "Difficult", "Low", "Okay", "Good", "Great"];

export const MoodHistory = React.memo(() => {
  const moodEntries = useWellnessStore((state) => state.moodEntries);

  const stats = useMemo(() => {
    if (moodEntries.length === 0) return null;

    const recent = moodEntries.slice(0, 7);
    const avgMood = recent.reduce((sum, entry) => sum + entry.mood, 0) / recent.length;
    const avgEnergy = recent.reduce((sum, entry) => sum + entry.energy, 0) / recent.length;
    const avgStress = recent.reduce((sum, entry) => sum + entry.stress, 0) / recent.length;

    const trend = recent.length >= 2 
      ? recent[0].mood - recent[recent.length - 1].mood
      : 0;

    return {
      avgMood: Math.round(avgMood * 10) / 10,
      avgEnergy: Math.round(avgEnergy * 10) / 10,
      avgStress: Math.round(avgStress * 10) / 10,
      trend,
      totalEntries: moodEntries.length
    };
  }, [moodEntries]);

  if (!stats) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-gray-500">No mood entries yet. Start tracking to see your patterns!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Heart className="h-5 w-5 text-pink-500" />
            </div>
            <div className="text-2xl font-bold">{stats.avgMood}/5</div>
            <div className="text-sm text-gray-500">Avg Mood</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Zap className="h-5 w-5 text-yellow-500" />
            </div>
            <div className="text-2xl font-bold">{stats.avgEnergy}/5</div>
            <div className="text-sm text-gray-500">Avg Energy</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
            </div>
            <div className="text-2xl font-bold">{stats.avgStress}/5</div>
            <div className="text-sm text-gray-500">Avg Stress</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              {stats.trend > 0 ? (
                <TrendingUp className="h-5 w-5 text-green-500" />
              ) : (
                <TrendingDown className="h-5 w-5 text-red-500" />
              )}
            </div>
            <div className="text-2xl font-bold">{stats.totalEntries}</div>
            <div className="text-sm text-gray-500">Total Entries</div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Entries */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Mood Entries</CardTitle>
          <CardDescription>Your last 10 mood records</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {moodEntries.slice(0, 10).map((entry) => (
              <div key={entry.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center gap-3">
                  <Badge variant="outline">
                    {moodLabels[entry.mood]}
                  </Badge>
                  <div>
                    <div className="font-medium">
                      {new Date(entry.date).toLocaleDateString()}
                    </div>
                    {entry.notes && (
                      <div className="text-sm text-gray-500 truncate max-w-xs">
                        {entry.notes}
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-right text-sm text-gray-600">
                  <div>⚡ Energy: {entry.energy}/5</div>
                  <div>🎯 Stress: {entry.stress}/5</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
});

MoodHistory.displayName = 'MoodHistory';

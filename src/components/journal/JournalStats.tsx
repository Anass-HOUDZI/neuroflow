
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, Calendar } from 'lucide-react';

interface JournalStatsProps {
  totalEntries: number;
  streak: number;
  consistency: number;
}

export const JournalStats: React.FC<JournalStatsProps> = ({
  totalEntries,
  streak,
  consistency
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <Card>
        <CardContent className="pt-6 text-center">
          <BookOpen className="h-8 w-8 mx-auto mb-2 text-blue-600" />
          <p className="text-2xl font-bold">{totalEntries}</p>
          <p className="text-sm text-gray-600">Total Entries</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="pt-6 text-center">
          <Calendar className="h-8 w-8 mx-auto mb-2 text-green-600" />
          <p className="text-2xl font-bold">{streak}</p>
          <p className="text-sm text-gray-600">Day Streak</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="pt-6 text-center">
          <div className="text-2xl mb-2">📈</div>
          <p className="text-2xl font-bold">{consistency}%</p>
          <p className="text-sm text-gray-600">Consistency</p>
        </CardContent>
      </Card>
    </div>
  );
};

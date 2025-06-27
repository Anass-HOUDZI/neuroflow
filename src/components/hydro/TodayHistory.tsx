
import React from 'react';
import { Button } from '@/components/ui/button';
import { AlarmClock } from 'lucide-react';

interface HydroEntry {
  date: string;
  amount: number;
  time?: string;
}

interface TodayHistoryProps {
  entries: HydroEntry[];
  onReset: () => void;
}

export const TodayHistory: React.FC<TodayHistoryProps> = ({ 
  entries, 
  onReset 
}) => {
  if (entries.length === 0) return null;

  return (
    <div className="mt-4">
      <div className="text-xs text-gray-500 mb-2">Historique du jour</div>
      <ul className="divide-y divide-gray-200 dark:divide-gray-700 max-h-32 overflow-y-auto">
        {entries.map((entry, idx) => (
          <li key={idx} className="py-2 flex gap-2 items-center">
            <AlarmClock className="h-3 w-3 text-sky-400 flex-shrink-0" />
            <span className="text-sm">{entry.amount} ml</span>
            <span className="ml-auto text-xs text-gray-400">
              {entry.time || new Date().toLocaleTimeString().slice(0, 5)}
            </span>
          </li>
        ))}
      </ul>
      <Button 
        variant="ghost" 
        className="w-full mt-2 text-red-600 hover:text-red-700" 
        onClick={onReset}
      >
        Réinitialiser la journée
      </Button>
    </div>
  );
};

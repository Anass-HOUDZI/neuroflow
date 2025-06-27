
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Moon } from 'lucide-react';

type SleepEntry = {
  date: string;
  bedtime: string;
  waketime: string;
  quality: string;
  notes: string;
};

interface SleepHistoryProps {
  entries: SleepEntry[];
  onClear: () => void;
  computeDuration: (bedtime: string, waketime: string) => string | null;
}

export const SleepHistory: React.FC<SleepHistoryProps> = ({
  entries,
  onClear,
  computeDuration
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Historique</CardTitle>
        <CardDescription>Dernières nuits enregistrées</CardDescription>
      </CardHeader>
      <CardContent>
        {entries.length === 0 ? (
          <div className="text-gray-400 text-center">Aucun enregistrement pour le moment.</div>
        ) : (
          <ul className="space-y-4 max-h-72 overflow-y-auto pr-1">
            {entries.map((entry, i) => (
              <li key={i} className="p-3 rounded bg-white/70 dark:bg-gray-900 border shadow-sm">
                <div className="flex items-center gap-3 font-semibold text-indigo-600">
                  <Moon className="h-4 w-4" /> {entry.date}
                  <span className="ml-auto font-mono text-gray-400">{entry.quality}</span>
                </div>
                <div className="flex items-center justify-between mt-1 text-sm">
                  <div>
                    {entry.bedtime} ➔ {entry.waketime}{" "}
                    <span className="text-xs text-gray-500">({computeDuration(entry.bedtime, entry.waketime) || "?"})</span>
                  </div>
                  {entry.notes && (
                    <div className="text-xs italic text-gray-500 truncate max-w-xs">"{entry.notes}"</div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
        {entries.length > 0 && (
          <Button variant="destructive" className="w-full mt-6" onClick={onClear}>
            Tout effacer
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

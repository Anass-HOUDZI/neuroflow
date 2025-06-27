
import React from 'react';
import { BedDouble } from 'lucide-react';

export const SleepHeader: React.FC = () => {
  return (
    <div className="flex flex-col items-center text-center gap-3 mb-8">
      <BedDouble className="h-12 w-12 text-indigo-500" />
      <h1 className="text-4xl font-bold text-gray-800 dark:text-white">SleepAnalyzer</h1>
      <div className="text-gray-600 dark:text-gray-300">
        Analysez votre sommeil et identifiez vos habitudes 🌙
      </div>
    </div>
  );
};

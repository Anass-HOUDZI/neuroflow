
import React from 'react';
import { Leaf } from 'lucide-react';

export const NutrientHeader: React.FC = () => {
  return (
    <div className="mb-5 animate-fade-in flex gap-3 items-center justify-center bg-gradient-to-tl from-lime-100 to-yellow-100 dark:from-gray-700 dark:to-gray-900 rounded-2xl shadow-lg px-7 py-6">
      <div className="flex items-center justify-center bg-white/80 dark:bg-gray-900/80 rounded-full border border-lime-200 shadow w-16 h-16">
        <Leaf className="h-10 w-10 text-green-600" />
      </div>
      <div className="flex flex-col text-center md:text-left">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1">NutrientTracker</h2>
        <div className="text-[1.08em] text-gray-600 dark:text-gray-300">Optimisez vos apports pour soutenir le bien-être mental et physiologique</div>
      </div>
    </div>
  );
};

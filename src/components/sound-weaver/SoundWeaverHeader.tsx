
import React from 'react';
import { Wand, AudioLines } from 'lucide-react';

export const SoundWeaverHeader: React.FC = () => {
  return (
    <div className="flex flex-col items-center gap-3">
      <Wand className="h-12 w-12 text-blue-500" />
      <h1 className="text-3xl font-bold">SoundWeaver</h1>
      <p className="text-lg text-gray-700 dark:text-gray-300 text-center">
        Studio audio minimal : multi-pistes synthétiques, volume et export.
      </p>
      <span className="text-xs text-gray-500">
        (Prototype – synchronisation & édition réelles : bientôt)
      </span>
    </div>
  );
};

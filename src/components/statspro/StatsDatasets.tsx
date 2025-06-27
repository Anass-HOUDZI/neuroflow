
import React from 'react';
import { StatsData } from '@/pages/StatsPro';

interface StatsDatasetsProps {
  datasets: StatsData[];
  onResetData: () => void;
}

export const StatsDatasets: React.FC<StatsDatasetsProps> = ({ datasets, onResetData }) => {
  return (
    <div className="space-y-4">
      {datasets.map((dataset, index) => (
        <div key={index} className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
          <h3 className="font-semibold mb-2">{dataset.name}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            Type: {dataset.type} | Échantillon: {dataset.values.length} valeurs
          </p>
          <div className="text-xs text-gray-500 max-h-20 overflow-y-auto">
            {dataset.values.slice(0, 20).join(', ')}
            {dataset.values.length > 20 && '...'}
          </div>
        </div>
      ))}
      <button
        onClick={onResetData}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
      >
        Réinitialiser les données
      </button>
    </div>
  );
};

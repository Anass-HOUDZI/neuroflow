
import React from 'react';
import { Calculator } from 'lucide-react';

interface StatsHeaderProps {
  datasetsCount: number;
}

export const StatsHeader: React.FC<StatsHeaderProps> = ({ datasetsCount }) => {
  return (
    <div className="flex flex-col items-center gap-4 mb-8">
      <Calculator className="h-12 w-12 text-emerald-500" />
      <h1 className="text-4xl font-bold text-gray-800 dark:text-white">StatsPro</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 text-center max-w-2xl">
        Analyseur statistiques avancé — Tests d'hypothèses, corrélations, régressions, insights automatiques
      </p>
      {datasetsCount > 0 && (
        <p className="text-sm text-gray-500">
          {datasetsCount} jeu{datasetsCount > 1 ? 'x' : ''} de données chargé{datasetsCount > 1 ? 's' : ''}
        </p>
      )}
    </div>
  );
};

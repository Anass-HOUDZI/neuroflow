
import React from 'react';
import { Sprout } from 'lucide-react';

export interface Gratitude {
  id: string;
  text: string;
  category: string;
  date: string;
  plantType: string;
}

interface GratitudeGardenProps {
  gratitudes: Gratitude[];
  className?: string;
}

export const GratitudeGardenDisplay: React.FC<GratitudeGardenProps> = ({ 
  gratitudes, 
  className 
}) => {
  const gardenSize = Math.min(gratitudes.length, 50);
  const rows = Math.ceil(Math.sqrt(gardenSize)) || 1;
  const plants = gratitudes.slice(-gardenSize);
  
  if (plants.length === 0) {
    return (
      <div className={`flex flex-col items-center justify-center text-gray-500 py-12 bg-gradient-to-br from-green-50 to-emerald-100 rounded-lg min-h-[300px] ${className}`}>
        <Sprout className="h-16 w-16 mb-4 opacity-50" />
        <p className="text-lg">Ton jardin attend tes premières gratitudes...</p>
      </div>
    );
  }

  return (
    <div 
      className={`grid gap-2 p-6 bg-gradient-to-br from-green-50 to-emerald-100 rounded-lg min-h-[300px] ${className}`}
      style={{ gridTemplateColumns: `repeat(${rows}, 1fr)` }}
    >
      {plants.map((gratitude, index) => (
        <div 
          key={gratitude.id}
          className="text-2xl hover:scale-110 transition-transform cursor-pointer animate-pulse"
          title={`${gratitude.category}: ${gratitude.text}`}
          style={{
            animationDelay: `${index * 0.1}s`,
            animationDuration: '0.5s',
            animationFillMode: 'both'
          }}
        >
          {gratitude.plantType}
        </div>
      ))}
    </div>
  );
};


import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Circle } from 'lucide-react';

interface Micronutrient {
  key: string;
  sources: string;
  symptoms: string;
  optimal: string;
  color: string;
}

interface NutrientGridProps {
  micronutrients: Micronutrient[];
  intake: { [k: string]: number };
  onIntakeChange: (key: string, val: number) => void;
}

export const NutrientGrid: React.FC<NutrientGridProps> = ({
  micronutrients,
  intake,
  onIntakeChange
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
      {micronutrients.map((nut) => (
        <div key={nut.key} className={`rounded-lg p-3 flex flex-col shadow-sm hover:shadow-lg transition-all duration-150 ${nut.color}`}>
          <div className="flex items-center gap-2 font-semibold">
            <Circle size={16} /> {nut.key}
          </div>
          <label className="text-[13px] mt-1">
            Estimation :
            <input
              type="range"
              min={0}
              max={1}
              step={0.1}
              value={intake[nut.key] || 0}
              onChange={e => onIntakeChange(nut.key, parseFloat(e.target.value))}
              className="w-full mt-1"
            />
          </label>
          <Progress value={((intake[nut.key] || 0) * 100)} className="h-2 mt-1" />
          <span className="text-xs">{Math.round((intake[nut.key] || 0) * 100)}% du besoin</span>
          <span className="text-xs text-gray-500">Sources : {nut.sources}</span>
          <span className="text-xs text-gray-400">Symptômes carence : {nut.symptoms}</span>
        </div>
      ))}
    </div>
  );
};

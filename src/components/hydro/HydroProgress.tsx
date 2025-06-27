
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

interface HydroProgressProps {
  current: number;
  goal: number;
  className?: string;
}

export const HydroProgress: React.FC<HydroProgressProps> = ({ 
  current, 
  goal, 
  className 
}) => {
  const progress = Math.min((current / goal) * 100, 100);
  const remaining = Math.max(goal - current, 0);

  return (
    <div className={className}>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium">
          {current} ml / {goal} ml
        </span>
        <Badge variant={progress >= 100 ? "default" : "secondary"}>
          {progress >= 100 ? "🎉 Objectif atteint !" : `${remaining} ml restants`}
        </Badge>
      </div>
      <Progress 
        value={progress} 
        className="h-3"
        aria-label={`Progression hydratation: ${Math.round(progress)}%`}
      />
    </div>
  );
};

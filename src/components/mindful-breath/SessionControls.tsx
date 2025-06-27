
import React from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { BreathingTechnique } from './BreathingTechniques';

interface SessionControlsProps {
  technique: BreathingTechnique;
  isActive: boolean;
  currentCycle: number;
  progress: number;
  onToggleSession: () => void;
  onResetSession: () => void;
}

export const SessionControls: React.FC<SessionControlsProps> = ({
  technique,
  isActive,
  currentCycle,
  progress,
  onToggleSession,
  onResetSession
}) => {
  return (
    <>
      {/* Progress */}
      <div className="w-full max-w-md mb-6">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Cycle {currentCycle + 1} sur {technique.cycles}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Controls */}
      <div className="flex gap-4">
        <Button onClick={onToggleSession} size="lg">
          {isActive ? (
            <>
              <Pause className="h-4 w-4 mr-2" />
              Pause
            </>
          ) : (
            <>
              <Play className="h-4 w-4 mr-2" />
              {currentCycle === 0 ? 'Commencer' : 'Reprendre'}
            </>
          )}
        </Button>
        <Button variant="outline" onClick={onResetSession} size="lg">
          <RotateCcw className="h-4 w-4 mr-2" />
          Reset
        </Button>
      </div>
    </>
  );
};

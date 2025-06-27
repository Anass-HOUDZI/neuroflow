
import React from 'react';

interface BreathingCircleProps {
  currentPhase: 'inhale' | 'hold' | 'exhale';
  timeLeft: number;
  isActive: boolean;
}

export const BreathingCircle: React.FC<BreathingCircleProps> = ({
  currentPhase,
  timeLeft,
  isActive
}) => {
  const getPhaseInstruction = () => {
    switch (currentPhase) {
      case 'inhale': return 'Inspirez profondément';
      case 'hold': return 'Retenez votre souffle';
      case 'exhale': return 'Expirez lentement';
      default: return '';
    }
  };

  const getPhaseColor = () => {
    switch (currentPhase) {
      case 'inhale': return 'bg-blue-500';
      case 'hold': return 'bg-yellow-500';
      case 'exhale': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="flex flex-col items-center mb-8">
      <div className="relative mb-8">
        <div 
          className={`w-64 h-64 rounded-full ${getPhaseColor()} opacity-20 transition-all duration-1000 ${
            isActive && currentPhase === 'inhale' ? 'scale-125' : 
            isActive && currentPhase === 'exhale' ? 'scale-75' : 'scale-100'
          }`}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl font-light text-gray-700 mb-2">
              {timeLeft}
            </div>
            <div className="text-lg font-medium text-gray-600">
              {getPhaseInstruction()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

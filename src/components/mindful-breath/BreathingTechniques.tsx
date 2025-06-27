
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export interface BreathingTechnique {
  id: string;
  name: string;
  description: string;
  inhale: number;
  hold: number;
  exhale: number;
  cycles: number;
  benefits: string[];
}

interface BreathingTechniquesProps {
  techniques: BreathingTechnique[];
  onSelectTechnique: (technique: BreathingTechnique) => void;
}

export const BreathingTechniques: React.FC<BreathingTechniquesProps> = ({
  techniques,
  onSelectTechnique
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {techniques.map((technique) => (
        <Card 
          key={technique.id} 
          className="hover:shadow-lg transition-all duration-300 cursor-pointer bg-white/80 backdrop-blur-sm"
          onClick={() => onSelectTechnique(technique)}
        >
          <CardHeader>
            <CardTitle className="text-lg">{technique.name}</CardTitle>
            <CardDescription>{technique.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Inspiration: {technique.inhale}s</span>
                {technique.hold > 0 && <span>Rétention: {technique.hold}s</span>}
                <span>Expiration: {technique.exhale}s</span>
              </div>
              <div className="text-sm text-gray-600">
                <span>{technique.cycles} cycles • {Math.round((technique.inhale + technique.hold + technique.exhale) * technique.cycles / 60)} min</span>
              </div>
              
              <div className="mt-3">
                <div className="text-xs font-medium text-gray-700 mb-1">Bénéfices:</div>
                <div className="space-y-1">
                  {technique.benefits.slice(0, 2).map((benefit, index) => (
                    <div key={index} className="flex items-center text-xs text-gray-600">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2 flex-shrink-0" />
                      {benefit}
                    </div>
                  ))}
                  {technique.benefits.length > 2 && (
                    <div className="text-xs text-gray-500">
                      +{technique.benefits.length - 2} autres bénéfices
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

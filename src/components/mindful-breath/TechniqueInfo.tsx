
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BreathingTechnique } from './BreathingTechniques';

interface TechniqueInfoProps {
  technique: BreathingTechnique;
}

export const TechniqueInfo: React.FC<TechniqueInfoProps> = ({ technique }) => {
  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-lg">Bénéfices</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {technique.benefits.map((benefit, index) => (
            <li key={index} className="flex items-center text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3" />
              {benefit}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

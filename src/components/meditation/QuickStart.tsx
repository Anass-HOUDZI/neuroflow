
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MeditationSessionData } from './MeditationSession';

interface QuickStartProps {
  sessions: MeditationSessionData[];
  onSelectSession: (session: MeditationSessionData) => void;
}

export const QuickStart: React.FC<QuickStartProps> = ({ sessions, onSelectSession }) => {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Quick Start</CardTitle>
        <CardDescription>Jump into a meditation session right now</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-4">
        <Button 
          variant="outline" 
          onClick={() => onSelectSession(sessions[5])}
        >
          5 Min Breathing
        </Button>
        <Button 
          variant="outline"
          onClick={() => onSelectSession(sessions[0])}
        >
          10 Min Mindfulness
        </Button>
        <Button 
          variant="outline"
          onClick={() => onSelectSession(sessions[1])}
        >
          15 Min Stress Relief
        </Button>
      </CardContent>
    </Card>
  );
};

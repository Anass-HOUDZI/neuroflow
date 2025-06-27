
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export interface MeditationSessionData {
  id: number;
  title: string;
  description: string;
  duration: string;
  category: string;
  difficulty: string;
  color: string;
}

interface MeditationSessionProps {
  sessions: MeditationSessionData[];
  onSelectSession: (session: MeditationSessionData) => void;
}

export const MeditationSession: React.FC<MeditationSessionProps> = ({
  sessions,
  onSelectSession
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {sessions.map((session) => (
        <Card 
          key={session.id} 
          className="hover:shadow-lg transition-all cursor-pointer"
          onClick={() => onSelectSession(session)}
        >
          <CardHeader>
            <div className={`w-12 h-12 rounded-full ${session.color} flex items-center justify-center mb-4`}>
              <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                <div className="w-0 h-0 border-l-4 border-l-current border-y-2 border-y-transparent ml-1" />
              </div>
            </div>
            <CardTitle className="text-lg">{session.title}</CardTitle>
            <CardDescription>{session.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center text-sm text-gray-600">
              <span>{session.duration}</span>
              <span className="bg-gray-100 px-2 py-1 rounded-full text-xs">
                {session.difficulty}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

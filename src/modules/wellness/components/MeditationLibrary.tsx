
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Clock, Star } from 'lucide-react';

interface MeditationSession {
  id: number;
  title: string;
  description: string;
  duration: string;
  category: string;
  difficulty: string;
  color: string;
}

interface MeditationLibraryProps {
  sessions: MeditationSession[];
  onSelectSession: (session: MeditationSession) => void;
}

export const MeditationLibrary = React.memo<MeditationLibraryProps>(({ sessions, onSelectSession }) => {
  const categories = React.useMemo(() => {
    const categoryMap = new Map();
    sessions.forEach(session => {
      if (!categoryMap.has(session.category)) {
        categoryMap.set(session.category, []);
      }
      categoryMap.get(session.category).push(session);
    });
    return categoryMap;
  }, [sessions]);

  return (
    <div className="space-y-8">
      {Array.from(categories.entries()).map(([category, categorySessions]) => (
        <div key={category}>
          <div className="flex items-center gap-2 mb-4">
            <h3 className="text-lg font-semibold">{category}</h3>
            <Badge variant="secondary">{categorySessions.length}</Badge>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {categorySessions.map((session: MeditationSession) => (
              <Card 
                key={session.id} 
                className="hover:shadow-md transition-shadow cursor-pointer group"
                onClick={() => onSelectSession(session)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className={`w-12 h-12 rounded-lg ${session.color} flex items-center justify-center mb-3`}>
                      <Play className="h-6 w-6 text-white" />
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {session.difficulty}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{session.title}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {session.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Clock className="h-4 w-4" />
                      {session.duration}
                    </div>
                    
                    <Button 
                      size="sm" 
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectSession(session);
                      }}
                    >
                      <Play className="h-4 w-4 mr-1" />
                      Start
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
});

MeditationLibrary.displayName = 'MeditationLibrary';

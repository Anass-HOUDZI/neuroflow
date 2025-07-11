
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Play, Pause, RotateCcw, Volume2 } from 'lucide-react';

interface MeditationSession {
  id: number;
  title: string;
  description: string;
  duration: string;
  category: string;
  difficulty: string;
  color: string;
}

interface MeditationPlayerProps {
  session: MeditationSession;
  isPlaying: boolean;
  currentTime: number;
  progress: number;
  onTogglePlayPause: () => void;
  formatTime: (seconds: number) => string;
}

export const MeditationPlayer = React.memo<MeditationPlayerProps>(({
  session,
  isPlaying,
  currentTime,
  progress,
  onTogglePlayPause,
  formatTime
}) => {
  return (
    <div className="max-w-2xl mx-auto">
      {/* Visual Element */}
      <div className="mb-8">
        <div className={`w-64 h-64 mx-auto rounded-full ${session.color} flex items-center justify-center relative overflow-hidden`}>
          <div className={`w-48 h-48 rounded-full bg-white/20 flex items-center justify-center ${isPlaying ? 'animate-pulse' : ''}`}>
            <div className="w-32 h-32 rounded-full bg-white/30 flex items-center justify-center">
              {isPlaying ? (
                <div className="w-16 h-16 rounded-full bg-white/40 animate-ping" />
              ) : (
                <Play className="h-16 w-16 text-white/80" />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Session Info */}
      <Card className="mb-6">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">{session.title}</CardTitle>
          <p className="text-gray-600">{session.description}</p>
        </CardHeader>
        <CardContent>
          {/* Progress */}
          <div className="space-y-4">
            <Progress value={progress} className="h-2" />
            <div className="flex justify-between text-sm text-gray-500">
              <span>{formatTime(currentTime)}</span>
              <span>{session.duration}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <Button variant="outline" size="icon">
              <RotateCcw className="h-4 w-4" />
            </Button>
            
            <Button 
              size="lg" 
              className="w-16 h-16 rounded-full"
              onClick={onTogglePlayPause}
            >
              {isPlaying ? (
                <Pause className="h-6 w-6" />
              ) : (
                <Play className="h-6 w-6 ml-1" />
              )}
            </Button>
            
            <Button variant="outline" size="icon">
              <Volume2 className="h-4 w-4" />
            </Button>
          </div>

          {/* Session Details */}
          <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="grid grid-cols-3 gap-4 text-center text-sm">
              <div>
                <div className="font-medium">Category</div>
                <div className="text-gray-500">{session.category}</div>
              </div>
              <div>
                <div className="font-medium">Duration</div>
                <div className="text-gray-500">{session.duration}</div>
              </div>
              <div>
                <div className="font-medium">Level</div>
                <div className="text-gray-500">{session.difficulty}</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
});

MeditationPlayer.displayName = 'MeditationPlayer';


import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Play, Pause, SkipForward, Volume2 } from 'lucide-react';
import { MeditationSessionData } from './MeditationSession';

interface MeditationPlayerProps {
  session: MeditationSessionData;
  isPlaying: boolean;
  currentTime: number;
  progress: number;
  onTogglePlayPause: () => void;
  formatTime: (seconds: number) => string;
}

export const MeditationPlayer: React.FC<MeditationPlayerProps> = ({
  session,
  isPlaying,
  currentTime,
  progress,
  onTogglePlayPause,
  formatTime
}) => {
  return (
    <div className="max-w-2xl mx-auto">
      <Card className="mb-6">
        <CardContent className="pt-6">
          {/* Meditation Visual */}
          <div className="text-center mb-8">
            <div className="w-48 h-48 mx-auto bg-gradient-to-br from-purple-200 to-blue-200 rounded-full flex items-center justify-center mb-4">
              <div className={`w-32 h-32 rounded-full ${session.color} flex items-center justify-center animate-pulse`}>
                <Volume2 className="h-12 w-12" />
              </div>
            </div>
            <h2 className="text-2xl font-semibold mb-2">{session.title}</h2>
            <p className="text-gray-600">{session.category} • {session.difficulty}</p>
          </div>

          {/* Progress */}
          <div className="mb-6">
            <Progress value={progress} className="mb-2" />
            <div className="flex justify-between text-sm text-gray-500">
              <span>{formatTime(currentTime)}</span>
              <span>{session.duration}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center space-x-4">
            <Button variant="outline" size="icon">
              <SkipForward className="h-4 w-4 rotate-180" />
            </Button>
            <Button
              size="lg"
              className="w-16 h-16 rounded-full"
              onClick={onTogglePlayPause}
            >
              {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
            </Button>
            <Button variant="outline" size="icon">
              <SkipForward className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Session Info */}
      <Card>
        <CardHeader>
          <h3 className="text-xl font-semibold">About This Session</h3>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-purple-600">{session.duration}</p>
              <p className="text-sm text-gray-600">Duration</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-600">{session.difficulty}</p>
              <p className="text-sm text-gray-600">Level</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">{session.category}</p>
              <p className="text-sm text-gray-600">Type</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

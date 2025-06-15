
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Play, Pause, SkipForward, Volume2 } from "lucide-react";
import { Link } from "react-router-dom";

const Meditation = () => {
  const [selectedSession, setSelectedSession] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalTime, setTotalTime] = useState(0);

  const sessions = [
    {
      id: 1,
      title: "Morning Mindfulness",
      description: "Start your day with clarity and intention",
      duration: "10 min",
      category: "Mindfulness",
      difficulty: "Beginner",
      color: "bg-blue-100 text-blue-600"
    },
    {
      id: 2,
      title: "Stress Relief",
      description: "Release tension and find calm",
      duration: "15 min",
      category: "Stress Relief",
      difficulty: "Intermediate",
      color: "bg-green-100 text-green-600"
    },
    {
      id: 3,
      title: "Sleep Preparation",
      description: "Gentle meditation for better sleep",
      duration: "20 min",
      category: "Sleep",
      difficulty: "Beginner",
      color: "bg-purple-100 text-purple-600"
    },
    {
      id: 4,
      title: "Focus & Concentration",
      description: "Enhance your mental clarity",
      duration: "12 min",
      category: "Focus",
      difficulty: "Advanced",
      color: "bg-orange-100 text-orange-600"
    },
    {
      id: 5,
      title: "Body Scan",
      description: "Connect with your physical self",
      duration: "18 min",
      category: "Body Awareness",
      difficulty: "Intermediate",
      color: "bg-pink-100 text-pink-600"
    },
    {
      id: 6,
      title: "Breathing Exercise",
      description: "Simple breathwork for instant calm",
      duration: "5 min",
      category: "Breathing",
      difficulty: "Beginner",
      color: "bg-cyan-100 text-cyan-600"
    }
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying && selectedSession) {
      const duration = parseInt(selectedSession.duration) * 60; // Convert to seconds
      setTotalTime(duration);
      
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isPlaying, selectedSession]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = totalTime > 0 ? (currentTime / totalTime) * 100 : 0;

  if (selectedSession) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center mb-8">
            <Button
              variant="ghost"
              size="icon"
              className="mr-4"
              onClick={() => {
                setSelectedSession(null);
                setIsPlaying(false);
                setCurrentTime(0);
              }}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{selectedSession.title}</h1>
              <p className="text-gray-600">{selectedSession.description}</p>
            </div>
          </div>

          {/* Meditation Player */}
          <div className="max-w-2xl mx-auto">
            <Card className="mb-6">
              <CardContent className="pt-6">
                {/* Meditation Visual */}
                <div className="text-center mb-8">
                  <div className="w-48 h-48 mx-auto bg-gradient-to-br from-purple-200 to-blue-200 rounded-full flex items-center justify-center mb-4">
                    <div className={`w-32 h-32 rounded-full ${selectedSession.color} flex items-center justify-center animate-pulse`}>
                      <Volume2 className="h-12 w-12" />
                    </div>
                  </div>
                  <h2 className="text-2xl font-semibold mb-2">{selectedSession.title}</h2>
                  <p className="text-gray-600">{selectedSession.category} • {selectedSession.difficulty}</p>
                </div>

                {/* Progress */}
                <div className="mb-6">
                  <Progress value={progress} className="mb-2" />
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>{formatTime(currentTime)}</span>
                    <span>{selectedSession.duration}</span>
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
                    onClick={togglePlayPause}
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
                <CardTitle>About This Session</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-purple-600">{selectedSession.duration}</p>
                    <p className="text-sm text-gray-600">Duration</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-blue-600">{selectedSession.difficulty}</p>
                    <p className="text-sm text-gray-600">Level</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-green-600">{selectedSession.category}</p>
                    <p className="text-sm text-gray-600">Type</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link to="/">
            <Button variant="ghost" size="icon" className="mr-4">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Meditation</h1>
            <p className="text-gray-600">Find your inner peace with guided sessions</p>
          </div>
        </div>

        {/* Quick Start */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Quick Start</CardTitle>
            <CardDescription>Jump into a meditation session right now</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-4">
            <Button 
              variant="outline" 
              onClick={() => setSelectedSession(sessions[5])}
            >
              5 Min Breathing
            </Button>
            <Button 
              variant="outline"
              onClick={() => setSelectedSession(sessions[0])}
            >
              10 Min Mindfulness
            </Button>
            <Button 
              variant="outline"
              onClick={() => setSelectedSession(sessions[1])}
            >
              15 Min Stress Relief
            </Button>
          </CardContent>
        </Card>

        {/* Session Library */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Meditation Library</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sessions.map((session) => (
              <Card 
                key={session.id} 
                className="hover:shadow-lg transition-all cursor-pointer"
                onClick={() => setSelectedSession(session)}
              >
                <CardHeader>
                  <div className={`w-12 h-12 rounded-full ${session.color} flex items-center justify-center mb-4`}>
                    <Play className="h-6 w-6" />
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
        </div>
      </div>
    </div>
  );
};

export default Meditation;

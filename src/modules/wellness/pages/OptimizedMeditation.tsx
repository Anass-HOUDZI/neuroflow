
import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { MeditationLibrary } from "../components/MeditationLibrary";
import { MeditationPlayer } from "../components/MeditationPlayer";
import { QuickStart } from "@/components/meditation/QuickStart";
import { useWellnessStore } from "@/core/stores/wellnessStore";

interface MeditationSessionData {
  id: number;
  title: string;
  description: string;
  duration: string;
  category: string;
  difficulty: string;
  color: string;
}

const OptimizedMeditation = () => {
  const [selectedSession, setSelectedSession] = useState<MeditationSessionData | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  
  const addMeditationSession = useWellnessStore((state) => state.addMeditationSession);

  const sessions: MeditationSessionData[] = [
    {
      id: 1,
      title: "Morning Mindfulness",
      description: "Start your day with clarity and intention",
      duration: "10 min",
      category: "Mindfulness",
      difficulty: "Beginner",
      color: "bg-blue-500"
    },
    {
      id: 2,
      title: "Stress Relief",
      description: "Release tension and find calm",
      duration: "15 min",
      category: "Stress Relief",
      difficulty: "Intermediate",
      color: "bg-green-500"
    },
    {
      id: 3,
      title: "Sleep Preparation",
      description: "Gentle meditation for better sleep",
      duration: "20 min",
      category: "Sleep",
      difficulty: "Beginner",
      color: "bg-purple-500"
    },
    {
      id: 4,
      title: "Focus & Concentration",
      description: "Enhance your mental clarity",
      duration: "12 min",
      category: "Focus",
      difficulty: "Advanced",
      color: "bg-orange-500"
    },
    {
      id: 5,
      title: "Body Scan",
      description: "Connect with your physical self",
      duration: "18 min",
      category: "Body Awareness",
      difficulty: "Intermediate",
      color: "bg-pink-500"
    },
    {
      id: 6,
      title: "Breathing Exercise",
      description: "Simple breathwork for instant calm",
      duration: "5 min",
      category: "Breathing",
      difficulty: "Beginner",
      color: "bg-cyan-500"
    }
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying && selectedSession) {
      const duration = parseInt(selectedSession.duration) * 60;
      setTotalTime(duration);
      
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            setIsPlaying(false);
            // Log completed session
            addMeditationSession({
              date: new Date().toISOString(),
              duration: duration / 60,
              technique: selectedSession.title,
              quality: 5
            });
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isPlaying, selectedSession, addMeditationSession]);

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
          <MeditationPlayer
            session={selectedSession}
            isPlaying={isPlaying}
            currentTime={currentTime}
            progress={progress}
            onTogglePlayPause={togglePlayPause}
            formatTime={formatTime}
          />
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
        <QuickStart sessions={sessions} onSelectSession={setSelectedSession} />

        {/* Session Library */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Meditation Library</h2>
          <MeditationLibrary sessions={sessions} onSelectSession={setSelectedSession} />
        </div>
      </div>
    </div>
  );
};

export default OptimizedMeditation;

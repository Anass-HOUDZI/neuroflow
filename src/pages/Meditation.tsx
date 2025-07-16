
import GlobalLayout from "@/components/layout/GlobalLayout";
import { PageLayout, PageHeader } from "@/components/layout/PageLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Brain, Play, Pause, RotateCcw, Timer, Volume2, VolumeX } from "lucide-react";
import { useState, useEffect, useRef } from "react";

interface MeditationSession {
  id: string;
  type: string;
  duration: number;
  completedAt: string;
}

const meditationTypes = [
  {
    id: 'mindfulness',
    name: 'Pleine conscience',
    description: 'Concentration sur la respiration et les sensations présentes',
    durations: [5, 10, 15, 20, 30],
    instructions: [
      'Installez-vous confortablement, dos droit',
      'Fermez les yeux et respirez naturellement',
      'Concentrez-vous sur votre respiration',
      'Si vos pensées divaguent, revenez doucement à votre souffle',
      'Observez vos sensations sans jugement'
    ]
  },
  {
    id: 'body-scan',
    name: 'Scanner corporel',
    description: 'Exploration progressive de chaque partie du corps',
    durations: [10, 15, 20, 30],
    instructions: [
      'Allongez-vous confortablement',
      'Commencez par vos orteils',
      'Remontez progressivement le long de votre corps',
      'Observez chaque sensation sans chercher à la modifier',
      'Détendez chaque partie explorée'
    ]
  },
  {
    id: 'loving-kindness',
    name: 'Bienveillance',
    description: 'Cultivation de la compassion envers soi et les autres',
    durations: [10, 15, 20, 25],
    instructions: [
      'Pensez à vous avec bienveillance',
      'Formulez des souhaits positifs pour vous-même',
      'Étendez ces souhaits à vos proches',
      'Incluez des personnes neutres',
      'Terminez en englobant tous les êtres'
    ]
  }
];

export default function Meditation() {
  const [selectedType, setSelectedType] = useState(meditationTypes[0]);
  const [selectedDuration, setSelectedDuration] = useState(10);
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [sessions, setSessions] = useState<MeditationSession[]>([]);
  const [soundEnabled, setSoundEnabled] = useState(true);
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const savedSessions = localStorage.getItem('meditation-sessions');
    if (savedSessions) {
      setSessions(JSON.parse(savedSessions));
    }
  }, []);

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            completeSession();
            return 0;
          }
          
          // Change step every quarter of the session
          const totalTime = selectedDuration * 60;
          const elapsed = totalTime - prev + 1;
          const stepDuration = totalTime / selectedType.instructions.length;
          const newStep = Math.floor(elapsed / stepDuration);
          setCurrentStep(Math.min(newStep, selectedType.instructions.length - 1));
          
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, timeLeft, selectedDuration, selectedType]);

  const startMeditation = () => {
    setTimeLeft(selectedDuration * 60);
    setCurrentStep(0);
    setIsActive(true);
    if (soundEnabled) {
      // Simulation d'un son de démarrage
      console.log('🔔 Son de démarrage de méditation');
    }
  };

  const pauseMeditation = () => {
    setIsActive(false);
  };

  const resumeMeditation = () => {
    setIsActive(true);
  };

  const resetMeditation = () => {
    setIsActive(false);
    setTimeLeft(0);
    setCurrentStep(0);
  };

  const completeSession = () => {
    setIsActive(false);
    const newSession: MeditationSession = {
      id: Date.now().toString(),
      type: selectedType.name,
      duration: selectedDuration,
      completedAt: new Date().toISOString()
    };
    
    const updatedSessions = [newSession, ...sessions];
    setSessions(updatedSessions);
    localStorage.setItem('meditation-sessions', JSON.stringify(updatedSessions));
    
    if (soundEnabled) {
      console.log('🔔 Son de fin de méditation');
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = timeLeft > 0 ? ((selectedDuration * 60 - timeLeft) / (selectedDuration * 60)) * 100 : 0;
  const totalSessions = sessions.length;
  const totalMinutes = sessions.reduce((sum, session) => sum + session.duration, 0);
  const streak = calculateStreak(sessions);

  function calculateStreak(sessions: MeditationSession[]): number {
    if (sessions.length === 0) return 0;
    
    const today = new Date().toDateString();
    const dates = new Set(sessions.map(s => new Date(s.completedAt).toDateString()));
    
    let streak = 0;
    let currentDate = new Date();
    
    while (dates.has(currentDate.toDateString())) {
      streak++;
      currentDate.setDate(currentDate.getDate() - 1);
    }
    
    return streak;
  }

  return (
    <GlobalLayout>
      <PageLayout className="bg-gradient-to-br from-purple-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
        <PageHeader
          title="Méditation"
          description="Cultiver la paix intérieure et la présence mindful"
          icon={<Brain className="h-12 w-12 text-purple-500" />}
        />

        <div className="max-w-4xl mx-auto space-y-6">
          
          {/* Statistiques */}
          <div className="grid md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6 text-center">
                <Brain className="h-8 w-8 mx-auto mb-2 text-purple-500" />
                <div className="text-2xl font-bold">{totalSessions}</div>
                <div className="text-sm text-muted-foreground">Sessions totales</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <Timer className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                <div className="text-2xl font-bold">{totalMinutes}</div>
                <div className="text-sm text-muted-foreground">Minutes méditées</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="text-2xl mb-2">🔥</div>
                <div className="text-2xl font-bold">{streak}</div>
                <div className="text-sm text-muted-foreground">Jours consécutifs</div>
              </CardContent>
            </Card>
          </div>

          {/* Interface de méditation */}
          <div className="grid lg:grid-cols-2 gap-6">
            
            {/* Configuration */}
            <Card>
              <CardHeader>
                <CardTitle>Configuration de la session</CardTitle>
                <CardDescription>Choisissez votre type de méditation et la durée</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                
                {/* Types de méditation */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Type de méditation</label>
                  <div className="space-y-2">
                    {meditationTypes.map(type => (
                      <div
                        key={type.id}
                        className={`p-3 border rounded-lg transition-colors ${
                          selectedType.id === type.id 
                            ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => setSelectedType(type)}
                      >
                        <div className="font-medium">{type.name}</div>
                        <div className="text-sm text-muted-foreground">{type.description}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Durée */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Durée (minutes)</label>
                  <div className="flex flex-wrap gap-2">
                    {selectedType.durations.map(duration => (
                      <Button
                        key={duration}
                        variant={selectedDuration === duration ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedDuration(duration)}
                      >
                        {duration} min
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Options */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Son de guidance</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setSoundEnabled(!soundEnabled)}
                  >
                    {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Session active */}
            <Card>
              <CardHeader>
                <CardTitle>Session en cours</CardTitle>
                <CardDescription>
                  {isActive || timeLeft > 0 ? selectedType.name : 'Prêt à commencer'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                
                {/* Timer */}
                <div className="text-center">
                  <div className="text-6xl font-mono font-bold text-purple-600 mb-4">
                    {timeLeft > 0 ? formatTime(timeLeft) : formatTime(selectedDuration * 60)}
                  </div>
                  {timeLeft > 0 && (
                    <Progress value={progress} className="h-2 mb-4" />
                  )}
                </div>

                {/* Instructions */}
                {(isActive || timeLeft > 0) && (
                  <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                    <div className="text-sm font-medium mb-2">Étape {currentStep + 1}</div>
                    <div className="text-sm text-purple-700 dark:text-purple-300">
                      {selectedType.instructions[currentStep]}
                    </div>
                  </div>
                )}

                {/* Contrôles */}
                <div className="flex justify-center gap-2">
                  {!isActive && timeLeft === 0 && (
                    <Button onClick={startMeditation} className="gap-2">
                      <Play className="h-4 w-4" />
                      Commencer
                    </Button>
                  )}
                  
                  {isActive && (
                    <Button onClick={pauseMeditation} variant="outline" className="gap-2">
                      <Pause className="h-4 w-4" />
                      Pause
                    </Button>
                  )}
                  
                  {!isActive && timeLeft > 0 && (
                    <Button onClick={resumeMeditation} className="gap-2">
                      <Play className="h-4 w-4" />
                      Reprendre
                    </Button>
                  )}
                  
                  {timeLeft > 0 && (
                    <Button onClick={resetMeditation} variant="destructive" className="gap-2">
                      <RotateCcw className="h-4 w-4" />
                      Reset
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Historique récent */}
          <Card>
            <CardHeader>
              <CardTitle>Sessions récentes</CardTitle>
            </CardHeader>
            <CardContent>
              {sessions.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Brain className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Aucune session de méditation encore. Commencez votre pratique !</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {sessions.slice(0, 5).map(session => (
                    <div key={session.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div>
                        <div className="font-medium">{session.type}</div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(session.completedAt).toLocaleDateString('fr-FR')}
                        </div>
                      </div>
                      <Badge variant="secondary">
                        {session.duration} min
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </PageLayout>
    </GlobalLayout>
  );
}

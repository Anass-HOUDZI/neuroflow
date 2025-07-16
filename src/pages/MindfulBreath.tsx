
import GlobalLayout from "@/components/layout/GlobalLayout";
import { PageLayout, PageHeader } from "@/components/layout/PageLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Waves, Play, Pause, RotateCcw, Zap, Heart } from "lucide-react";
import { useState, useEffect, useRef } from "react";

interface BreathingTechnique {
  id: string;
  name: string;
  description: string;
  pattern: number[];
  labels: string[];
  benefits: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

const breathingTechniques: BreathingTechnique[] = [
  {
    id: '4-7-8',
    name: 'Technique 4-7-8',
    description: 'Parfait pour réduire l\'anxiété et favoriser l\'endormissement',
    pattern: [4, 7, 8],
    labels: ['Inspirez', 'Retenez', 'Expirez'],
    benefits: ['Réduit l\'anxiété', 'Améliore le sommeil', 'Calme le système nerveux'],
    difficulty: 'beginner'
  },
  {
    id: 'box',
    name: 'Respiration carrée',
    description: 'Technique équilibrée pour la concentration et la clarté mentale',
    pattern: [4, 4, 4, 4],
    labels: ['Inspirez', 'Retenez', 'Expirez', 'Pause'],
    benefits: ['Améliore la concentration', 'Équilibre le mental', 'Réduit le stress'],
    difficulty: 'beginner'
  },
  {
    id: 'coherence',
    name: 'Cohérence cardiaque',
    description: 'Synchronise le rythme cardiaque pour un bien-être optimal',
    pattern: [5, 5],
    labels: ['Inspirez', 'Expirez'],
    benefits: ['Équilibre le système nerveux', 'Améliore la variabilité cardiaque', 'Réduit le cortisol'],
    difficulty: 'beginner'
  },
  {
    id: 'wim-hof',
    name: 'Méthode Wim Hof',
    description: 'Technique avancée pour augmenter l\'énergie et la résistance',
    pattern: [1, 15, 2],
    labels: ['Respirations rapides', 'Rétention', 'Récupération'],
    benefits: ['Augmente l\'énergie', 'Renforce l\'immunité', 'Améliore la résistance au froid'],
    difficulty: 'advanced'
  }
];

const difficultyColors = {
  beginner: 'bg-green-100 text-green-800',
  intermediate: 'bg-yellow-100 text-yellow-800',
  advanced: 'bg-red-100 text-red-800'
};

const difficultyLabels = {
  beginner: 'Débutant',
  intermediate: 'Intermédiaire',
  advanced: 'Avancé'
};

export default function MindfulBreath() {
  const [selectedTechnique, setSelectedTechnique] = useState(breathingTechniques[0]);
  const [isActive, setIsActive] = useState(false);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [phaseProgress, setPhaseProgress] = useState(0);
  const [cycleCount, setCycleCount] = useState(0);
  const [totalCycles, setTotalCycles] = useState(10);
  const [sessions, setSessions] = useState<Array<{
    id: string;
    technique: string;
    cycles: number;
    duration: number;
    completedAt: string;
  }>>([]);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const phaseStartTime = useRef<number>(0);

  useEffect(() => {
    const savedSessions = localStorage.getItem('mindful-breath-sessions');
    if (savedSessions) {
      setSessions(JSON.parse(savedSessions));
    }
  }, []);

  useEffect(() => {
    if (isActive) {
      const phaseDuration = selectedTechnique.pattern[currentPhase] * 1000;
      phaseStartTime.current = Date.now();
      
      intervalRef.current = setInterval(() => {
        const elapsed = Date.now() - phaseStartTime.current;
        const progress = (elapsed / phaseDuration) * 100;
        
        if (progress >= 100) {
          // Phase suivante
          const nextPhase = (currentPhase + 1) % selectedTechnique.pattern.length;
          setCurrentPhase(nextPhase);
          setPhaseProgress(0);
          
          // Nouveau cycle
          if (nextPhase === 0) {
            const newCycleCount = cycleCount + 1;
            setCycleCount(newCycleCount);
            
            // Session terminée
            if (newCycleCount >= totalCycles) {
              completeSession();
            }
          }
        } else {
          setPhaseProgress(progress);
        }
      }, 50);
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
  }, [isActive, currentPhase, cycleCount, totalCycles, selectedTechnique]);

  const startSession = () => {
    setIsActive(true);
    setCurrentPhase(0);
    setPhaseProgress(0);
    setCycleCount(0);
    phaseStartTime.current = Date.now();
  };

  const pauseSession = () => {
    setIsActive(false);
  };

  const resumeSession = () => {
    setIsActive(true);
    phaseStartTime.current = Date.now() - (phaseProgress / 100) * selectedTechnique.pattern[currentPhase] * 1000;
  };

  const resetSession = () => {
    setIsActive(false);
    setCurrentPhase(0);
    setPhaseProgress(0);
    setCycleCount(0);
  };

  const completeSession = () => {
    setIsActive(false);
    
    const sessionDuration = selectedTechnique.pattern.reduce((sum, time) => sum + time, 0) * totalCycles;
    const newSession = {
      id: Date.now().toString(),
      technique: selectedTechnique.name,
      cycles: totalCycles,
      duration: Math.round(sessionDuration / 60),
      completedAt: new Date().toISOString()
    };
    
    const updatedSessions = [newSession, ...sessions];
    setSessions(updatedSessions);
    localStorage.setItem('mindful-breath-sessions', JSON.stringify(updatedSessions));
  };

  const totalSessions = sessions.length;
  const totalMinutes = sessions.reduce((sum, session) => sum + session.duration, 0);
  const currentLabel = selectedTechnique.labels[currentPhase];
  const sessionProgress = (cycleCount / totalCycles) * 100;

  // Animation de la bulle de respiration
  const bubbleScale = isActive 
    ? currentPhase % 2 === 0 
      ? 1 + (phaseProgress / 100) * 0.5 
      : 1.5 - (phaseProgress / 100) * 0.5
    : 1;

  return (
    <GlobalLayout>
      <PageLayout className="bg-gradient-to-br from-cyan-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
        <PageHeader
          title="MindfulBreath"
          description="Pratiquez la respiration consciente pour réduire le stress et améliorer votre bien-être"
          icon={<Waves className="h-12 w-12 text-cyan-500" />}
        />

        <div className="max-w-6xl mx-auto space-y-6">
          
          {/* Statistiques */}
          <div className="grid md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6 text-center">
                <Waves className="h-8 w-8 mx-auto mb-2 text-cyan-500" />
                <div className="text-2xl font-bold">{totalSessions}</div>
                <div className="text-sm text-muted-foreground">Sessions totales</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <Heart className="h-8 w-8 mx-auto mb-2 text-red-500" />
                <div className="text-2xl font-bold">{totalMinutes}</div>
                <div className="text-sm text-muted-foreground">Minutes pratiquées</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <Zap className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
                <div className="text-2xl font-bold">{sessions.filter(s => 
                  new Date(s.completedAt).toDateString() === new Date().toDateString()
                ).length}</div>
                <div className="text-sm text-muted-foreground">Aujourd'hui</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            
            {/* Techniques de respiration */}
            <Card>
              <CardHeader>
                <CardTitle>Techniques de respiration</CardTitle>
                <CardDescription>Choisissez la technique adaptée à vos besoins</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {breathingTechniques.map(technique => (
                  <div
                    key={technique.id}
                    className={`p-4 border rounded-lg transition-colors ${
                      selectedTechnique.id === technique.id 
                        ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-900/20' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedTechnique(technique)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="font-medium">{technique.name}</div>
                      <Badge className={difficultyColors[technique.difficulty]}>
                        {difficultyLabels[technique.difficulty]}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground mb-2">
                      {technique.description}
                    </div>
                    <div className="text-xs text-cyan-600">
                      Rythme: {technique.pattern.join('-')}s • {technique.benefits.join(', ')}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Interface de respiration */}
            <Card>
              <CardHeader>
                <CardTitle>Session de respiration</CardTitle>
                <CardDescription>{selectedTechnique.name}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                
                {/* Bulle de respiration */}
                <div className="flex items-center justify-center h-64">
                  <div
                    className={`w-32 h-32 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white font-semibold transition-transform duration-300 ${
                      isActive ? 'animate-pulse' : ''
                    }`}
                    style={{ transform: `scale(${bubbleScale})` }}
                  >
                    {isActive && (
                      <div className="text-center">
                        <div className="text-lg">{currentLabel}</div>
                        <div className="text-sm opacity-80">
                          {selectedTechnique.pattern[currentPhase]}s
                        </div>
                      </div>
                    )}
                    {!isActive && !cycleCount && (
                      <div className="text-center">
                        <Waves className="h-8 w-8 mx-auto mb-1" />
                        <div className="text-sm">Prêt</div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Progrès */}
                {(isActive || cycleCount > 0) && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Cycle {cycleCount + 1} / {totalCycles}</span>
                      <span>{Math.round(sessionProgress)}%</span>
                    </div>
                    <Progress value={sessionProgress} />
                    <div className="flex justify-between text-sm">
                      <span>Phase: {currentLabel}</span>
                      <span>{Math.round(phaseProgress)}%</span>
                    </div>
                    <Progress value={phaseProgress} className="h-1" />
                  </div>
                )}

                {/* Configuration */}
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Nombre de cycles</label>
                    <div className="flex gap-2">
                      {[5, 10, 15, 20].map(count => (
                        <Button
                          key={count}
                          variant={totalCycles === count ? "default" : "outline"}
                          size="sm"
                          onClick={() => setTotalCycles(count)}
                          disabled={isActive}
                        >
                          {count}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Contrôles */}
                  <div className="flex justify-center gap-2">
                    {!isActive && cycleCount === 0 && (
                      <Button onClick={startSession} className="gap-2">
                        <Play className="h-4 w-4" />
                        Commencer
                      </Button>
                    )}
                    
                    {isActive && (
                      <Button onClick={pauseSession} variant="outline" className="gap-2">
                        <Pause className="h-4 w-4" />
                        Pause
                      </Button>
                    )}
                    
                    {!isActive && cycleCount > 0 && cycleCount < totalCycles && (
                      <Button onClick={resumeSession} className="gap-2">
                        <Play className="h-4 w-4" />
                        Reprendre
                      </Button>
                    )}
                    
                    {cycleCount > 0 && (
                      <Button onClick={resetSession} variant="destructive" className="gap-2">
                        <RotateCcw className="h-4 w-4" />
                        Reset
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Bénéfices et conseils */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Bénéfices de {selectedTechnique.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {selectedTechnique.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-cyan-500 rounded-full" />
                      <span className="text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sessions récentes</CardTitle>
              </CardHeader>
              <CardContent>
                {sessions.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Waves className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Commencez votre première session !</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {sessions.slice(0, 3).map(session => (
                      <div key={session.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div>
                          <div className="font-medium text-sm">{session.technique}</div>
                          <div className="text-xs text-muted-foreground">
                            {new Date(session.completedAt).toLocaleDateString('fr-FR')}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">{session.cycles} cycles</div>
                          <div className="text-xs text-muted-foreground">{session.duration} min</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </PageLayout>
    </GlobalLayout>
  );
}

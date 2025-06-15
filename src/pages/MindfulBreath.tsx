
import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Play, Pause, RotateCcw, Volume2, VolumeX } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface BreathingTechnique {
  id: string;
  name: string;
  description: string;
  inhale: number;
  hold: number;
  exhale: number;
  cycles: number;
  benefits: string[];
}

const MindfulBreath = () => {
  const [selectedTechnique, setSelectedTechnique] = useState<BreathingTechnique | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [timeLeft, setTimeLeft] = useState(0);
  const [currentCycle, setCurrentCycle] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const { toast } = useToast();

  const techniques: BreathingTechnique[] = [
    {
      id: "4-7-8",
      name: "4-7-8 (Relaxation)",
      description: "Technique puissante pour l'endormissement et la réduction de l'anxiété",
      inhale: 4,
      hold: 7,
      exhale: 8,
      cycles: 4,
      benefits: ["Réduit l'anxiété", "Favorise l'endormissement", "Calme le système nerveux"]
    },
    {
      id: "box",
      name: "Box Breathing (Équilibre)",
      description: "Technique utilisée par les forces spéciales pour la concentration",
      inhale: 4,
      hold: 4,
      exhale: 4,
      cycles: 8,
      benefits: ["Améliore la concentration", "Réduit le stress", "Équilibre émotionnel"]
    },
    {
      id: "coherence",
      name: "Cohérence Cardiaque",
      description: "5 secondes inspiration, 5 secondes expiration pour l'équilibre",
      inhale: 5,
      hold: 0,
      exhale: 5,
      cycles: 10,
      benefits: ["Régule le rythme cardiaque", "Améliore la variabilité cardiaque", "Réduit le stress"]
    },
    {
      id: "energizing",
      name: "Respiration Énergisante",
      description: "Technique rapide pour booster l'énergie et la clarté mentale",
      inhale: 4,
      hold: 2,
      exhale: 2,
      cycles: 6,
      benefits: ["Augmente l'énergie", "Améliore la clarté", "Stimule la concentration"]
    },
    {
      id: "emergency",
      name: "Urgence Anxiété",
      description: "Technique rapide pour calmer une crise d'angoisse",
      inhale: 3,
      hold: 3,
      exhale: 6,
      cycles: 5,
      benefits: ["Calme rapidement", "Réduit les crises d'angoisse", "Retrouve le contrôle"]
    }
  ];

  useEffect(() => {
    if (isActive && selectedTechnique) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            moveToNextPhase();
            return getPhaseTime();
          }
          return prev - 1;
        });
        updateProgress();
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
  }, [isActive, currentPhase, selectedTechnique]);

  const getPhaseTime = () => {
    if (!selectedTechnique) return 0;
    switch (currentPhase) {
      case 'inhale': return selectedTechnique.inhale;
      case 'hold': return selectedTechnique.hold;
      case 'exhale': return selectedTechnique.exhale;
      default: return 0;
    }
  };

  const moveToNextPhase = () => {
    if (!selectedTechnique) return;

    if (currentPhase === 'inhale') {
      if (selectedTechnique.hold > 0) {
        setCurrentPhase('hold');
      } else {
        setCurrentPhase('exhale');
      }
    } else if (currentPhase === 'hold') {
      setCurrentPhase('exhale');
    } else {
      // Fin du cycle
      setCurrentCycle(prev => {
        const newCycle = prev + 1;
        if (newCycle >= selectedTechnique.cycles) {
          // Session terminée
          setIsActive(false);
          toast({
            title: "Session terminée ! 🌟",
            description: "Félicitations, vous avez complété votre session de respiration.",
          });
          return 0;
        }
        return newCycle;
      });
      setCurrentPhase('inhale');
    }
  };

  const updateProgress = () => {
    if (!selectedTechnique) return;
    const totalTime = (selectedTechnique.inhale + selectedTechnique.hold + selectedTechnique.exhale) * selectedTechnique.cycles;
    const elapsed = currentCycle * (selectedTechnique.inhale + selectedTechnique.hold + selectedTechnique.exhale) + 
                   (getPhaseTime() - timeLeft);
    setProgress((elapsed / totalTime) * 100);
  };

  const startSession = (technique: BreathingTechnique) => {
    setSelectedTechnique(technique);
    setCurrentPhase('inhale');
    setTimeLeft(technique.inhale);
    setCurrentCycle(0);
    setProgress(0);
    setIsActive(true);
  };

  const toggleSession = () => {
    setIsActive(!isActive);
  };

  const resetSession = () => {
    setIsActive(false);
    setCurrentCycle(0);
    setProgress(0);
    if (selectedTechnique) {
      setCurrentPhase('inhale');
      setTimeLeft(selectedTechnique.inhale);
    }
  };

  const getPhaseInstruction = () => {
    switch (currentPhase) {
      case 'inhale': return 'Inspirez profondément';
      case 'hold': return 'Retenez votre souffle';
      case 'exhale': return 'Expirez lentement';
      default: return '';
    }
  };

  const getPhaseColor = () => {
    switch (currentPhase) {
      case 'inhale': return 'bg-blue-500';
      case 'hold': return 'bg-yellow-500';
      case 'exhale': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  if (selectedTechnique) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <Button 
                variant="ghost" 
                size="icon" 
                className="mr-4"
                onClick={() => setSelectedTechnique(null)}
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">{selectedTechnique.name}</h1>
                <p className="text-gray-600">{selectedTechnique.description}</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsSoundEnabled(!isSoundEnabled)}
            >
              {isSoundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            </Button>
          </div>

          {/* Breathing Circle */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative mb-8">
              <div 
                className={`w-64 h-64 rounded-full ${getPhaseColor()} opacity-20 transition-all duration-1000 ${
                  isActive && currentPhase === 'inhale' ? 'scale-125' : 
                  isActive && currentPhase === 'exhale' ? 'scale-75' : 'scale-100'
                }`}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl font-light text-gray-700 mb-2">
                    {timeLeft}
                  </div>
                  <div className="text-lg font-medium text-gray-600">
                    {getPhaseInstruction()}
                  </div>
                </div>
              </div>
            </div>

            {/* Progress */}
            <div className="w-full max-w-md mb-6">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Cycle {currentCycle + 1} sur {selectedTechnique.cycles}</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            {/* Controls */}
            <div className="flex gap-4">
              <Button onClick={toggleSession} size="lg">
                {isActive ? (
                  <>
                    <Pause className="h-4 w-4 mr-2" />
                    Pause
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    {currentCycle === 0 ? 'Commencer' : 'Reprendre'}
                  </>
                )}
              </Button>
              <Button variant="outline" onClick={resetSession} size="lg">
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </Button>
            </div>
          </div>

          {/* Technique Info */}
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle className="text-lg">Bénéfices</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {selectedTechnique.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link to="/">
            <Button variant="ghost" size="icon" className="mr-4">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">MindfulBreath</h1>
            <p className="text-gray-600">Techniques de respiration pour votre bien-être</p>
          </div>
        </div>

        {/* Welcome Card */}
        <Card className="mb-8 bg-gradient-to-r from-blue-100 to-purple-100 border-0">
          <CardContent className="p-6">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Prenez une pause respiratoire 🌬️
              </h2>
              <p className="text-gray-600">
                Choisissez une technique de respiration adaptée à votre besoin du moment.
                Quelques minutes suffisent pour retrouver calme et clarté.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Techniques Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {techniques.map((technique) => (
            <Card 
              key={technique.id} 
              className="hover:shadow-lg transition-all duration-300 cursor-pointer bg-white/80 backdrop-blur-sm"
              onClick={() => startSession(technique)}
            >
              <CardHeader>
                <CardTitle className="text-lg">{technique.name}</CardTitle>
                <CardDescription>{technique.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Inspiration: {technique.inhale}s</span>
                    {technique.hold > 0 && <span>Rétention: {technique.hold}s</span>}
                    <span>Expiration: {technique.exhale}s</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    <span>{technique.cycles} cycles • ~{Math.round((technique.inhale + technique.hold + technique.exhale) * technique.cycles / 60)} minutes</span>
                  </div>
                  <div className="space-y-1">
                    {technique.benefits.slice(0, 2).map((benefit, index) => (
                      <div key={index} className="flex items-center text-xs text-gray-500">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2" />
                        {benefit}
                      </div>
                    ))}
                  </div>
                  <Button className="w-full mt-4">
                    Commencer cette technique
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MindfulBreath;

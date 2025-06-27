import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Volume2, VolumeX } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { BreathingTechniques, BreathingTechnique } from "@/components/mindful-breath/BreathingTechniques";
import { BreathingCircle } from "@/components/mindful-breath/BreathingCircle";
import { SessionControls } from "@/components/mindful-breath/SessionControls";
import { TechniqueInfo } from "@/components/mindful-breath/TechniqueInfo";

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
      setCurrentCycle(prev => {
        const newCycle = prev + 1;
        if (newCycle >= selectedTechnique.cycles) {
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
          <BreathingCircle
            currentPhase={currentPhase}
            timeLeft={timeLeft}
            isActive={isActive}
          />

          {/* Session Controls */}
          <div className="flex flex-col items-center mb-8">
            <SessionControls
              technique={selectedTechnique}
              isActive={isActive}
              currentCycle={currentCycle}
              progress={progress}
              onToggleSession={toggleSession}
              onResetSession={resetSession}
            />
          </div>

          {/* Technique Info */}
          <TechniqueInfo technique={selectedTechnique} />
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
        <BreathingTechniques
          techniques={techniques}
          onSelectTechnique={startSession}
        />
      </div>
    </div>
  );
};

export default MindfulBreath;

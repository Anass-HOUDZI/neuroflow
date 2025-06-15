
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Timer, Heart, Brain, Apple, Coffee, Utensils, Clock, Target, Sparkles, Play, Pause, RotateCcw } from "lucide-react";
import { Link } from "react-router-dom";

interface MealEntry {
  id: string;
  date: string;
  hungerBefore: number;
  fullnessAfter: number;
  emotions: string[];
  triggers: string[];
  mindfulness: number;
  notes: string;
  duration: number;
}

interface CravingEntry {
  id: string;
  date: string;
  food: string;
  intensity: number;
  emotion: string;
  technique: string;
  result: string;
}

const MindfulEating = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [hungerLevel, setHungerLevel] = useState([5]);
  const [fullnessLevel, setFullnessLevel] = useState([5]);
  const [currentEmotion, setCurrentEmotion] = useState("");
  const [meditationTimer, setMeditationTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [eatingTimer, setEatingTimer] = useState(0);
  const [isEatingTimerRunning, setIsEatingTimerRunning] = useState(false);
  const [mealEntries, setMealEntries] = useState<MealEntry[]>([]);
  const [cravingEntries, setCravingEntries] = useState<CravingEntry[]>([]);
  const [notes, setNotes] = useState("");

  const emotions = ["Calme", "Stressé", "Joyeux", "Triste", "Anxieux", "Ennuyé", "Excité", "Fatigué"];
  const triggers = ["Stress", "Ennui", "Habitude", "Social", "Faim réelle", "Émotions", "Pub/Vue nourriture"];
  const cravingTechniques = ["Respiration profonde", "RAIN technique", "Urge surfing", "Distraction", "Auto-compassion"];

  useEffect(() => {
    const entries = localStorage.getItem("mindfulEating_meals");
    if (entries) {
      setMealEntries(JSON.parse(entries));
    }
    const cravings = localStorage.getItem("mindfulEating_cravings");
    if (cravings) {
      setCravingEntries(JSON.parse(cravings));
    }
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && meditationTimer > 0) {
      interval = setInterval(() => {
        setMeditationTimer(prev => {
          if (prev <= 1) {
            setIsTimerRunning(false);
            toast({
              title: "Méditation terminée",
              description: "Félicitations pour ce moment de pleine conscience !",
            });
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, meditationTimer, toast]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isEatingTimerRunning) {
      interval = setInterval(() => {
        setEatingTimer(prev => prev + 1);
        // Rappel toutes les 5 minutes
        if (eatingTimer > 0 && eatingTimer % 300 === 0) {
          toast({
            title: "Rappel mindfulness",
            description: "Prenez une pause, respirez et reconnectez-vous à vos sensations",
          });
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isEatingTimerRunning, eatingTimer, toast]);

  const startMeditation = (minutes: number) => {
    setMeditationTimer(minutes * 60);
    setIsTimerRunning(true);
  };

  const toggleEatingTimer = () => {
    setIsEatingTimerRunning(!isEatingTimerRunning);
    if (!isEatingTimerRunning) {
      setEatingTimer(0);
    }
  };

  const saveMealEntry = () => {
    const entry: MealEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      hungerBefore: hungerLevel[0],
      fullnessAfter: fullnessLevel[0],
      emotions: [currentEmotion],
      triggers: [],
      mindfulness: Math.floor(Math.random() * 10) + 1,
      notes,
      duration: eatingTimer
    };

    const updatedEntries = [entry, ...mealEntries].slice(0, 50);
    setMealEntries(updatedEntries);
    localStorage.setItem("mindfulEating_meals", JSON.stringify(updatedEntries));
    
    setNotes("");
    setEatingTimer(0);
    setIsEatingTimerRunning(false);
    
    toast({
      title: "Repas enregistré",
      description: "Votre expérience alimentaire a été sauvegardée avec bienveillance",
    });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getHungerDescription = (level: number) => {
    const descriptions = [
      "Affamé", "Très faim", "Faim modérée", "Légère faim", "Neutre",
      "Légèrement rassasié", "Confortablement rassasié", "Très rassasié", "Trop plein", "Inconfortable"
    ];
    return descriptions[level - 1] || "Non défini";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white flex items-center gap-3">
              <Apple className="text-green-600" />
              MindfulEating
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Alimentation consciente basée sur les signaux de satiété
            </p>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="dashboard">Tableau de Bord</TabsTrigger>
            <TabsTrigger value="tracking">Suivi Repas</TabsTrigger>
            <TabsTrigger value="meditation">Méditations</TabsTrigger>
            <TabsTrigger value="cravings">Gestion Envies</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>

          {/* Dashboard */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardHeader className="text-center">
                  <CardTitle className="flex items-center gap-2 justify-center">
                    <Target className="text-green-600" />
                    Échelle Faim/Satiété
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Niveau de faim actuel</Label>
                    <div className="mt-2">
                      <Slider
                        value={hungerLevel}
                        onValueChange={setHungerLevel}
                        max={10}
                        min={1}
                        step={1}
                        className="w-full"
                      />
                      <div className="text-center mt-2">
                        <Badge variant="outline">{hungerLevel[0]} - {getHungerDescription(hungerLevel[0])}</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm">
                <CardHeader className="text-center">
                  <CardTitle className="flex items-center gap-2 justify-center">
                    <Timer className="text-blue-600" />
                    Timer Repas Lent
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-center">
                  <div className="text-3xl font-mono font-bold">
                    {formatTime(eatingTimer)}
                  </div>
                  <div className="flex gap-2 justify-center">
                    <Button 
                      onClick={toggleEatingTimer}
                      variant={isEatingTimerRunning ? "destructive" : "default"}
                      size="sm"
                    >
                      {isEatingTimerRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    </Button>
                    <Button 
                      onClick={() => {setEatingTimer(0); setIsEatingTimerRunning(false);}}
                      variant="outline"
                      size="sm"
                    >
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-gray-600">
                    Objectif : 20+ minutes par repas
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm">
                <CardHeader className="text-center">
                  <CardTitle className="flex items-center gap-2 justify-center">
                    <Heart className="text-rose-600" />
                    État Émotionnel
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Select value={currentEmotion} onValueChange={setCurrentEmotion}>
                    <SelectTrigger>
                      <SelectValue placeholder="Comment vous sentez-vous ?" />
                    </SelectTrigger>
                    <SelectContent>
                      {emotions.map(emotion => (
                        <SelectItem key={emotion} value={emotion}>{emotion}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Actions Rapides</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button onClick={() => startMeditation(5)} className="h-20 flex-col">
                    <Brain className="h-6 w-6 mb-2" />
                    Méditation 5 min
                  </Button>
                  <Button onClick={() => setActiveTab("cravings")} variant="outline" className="h-20 flex-col">
                    <Coffee className="h-6 w-6 mb-2" />
                    Gérer une envie
                  </Button>
                  <Button onClick={() => setActiveTab("tracking")} variant="outline" className="h-20 flex-col">
                    <Utensils className="h-6 w-6 mb-2" />
                    Tracker repas
                  </Button>
                  <Button onClick={() => setActiveTab("meditation")} variant="outline" className="h-20 flex-col">
                    <Sparkles className="h-6 w-6 mb-2" />
                    Gratitude
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tracking */}
          <TabsContent value="tracking" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Suivi du Repas Actuel</CardTitle>
                <CardDescription>
                  Enregistrez votre expérience alimentaire avec bienveillance
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label>Niveau de satiété après le repas</Label>
                    <div className="mt-2">
                      <Slider
                        value={fullnessLevel}
                        onValueChange={setFullnessLevel}
                        max={10}
                        min={1}
                        step={1}
                        className="w-full"
                      />
                      <div className="text-center mt-2">
                        <Badge variant="outline">{fullnessLevel[0]} - {getHungerDescription(fullnessLevel[0])}</Badge>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label>Durée du repas</Label>
                    <div className="mt-2 text-center">
                      <div className="text-2xl font-mono font-bold mb-2">
                        {formatTime(eatingTimer)}
                      </div>
                      <Button 
                        onClick={toggleEatingTimer}
                        variant={isEatingTimerRunning ? "destructive" : "default"}
                        size="sm"
                      >
                        {isEatingTimerRunning ? "Arrêter" : "Démarrer timer"}
                      </Button>
                    </div>
                  </div>
                </div>

                <div>
                  <Label>Notes et observations</Label>
                  <Textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Comment s'est passé ce repas ? Avez-vous mangé lentement ? Ressenti les saveurs ?"
                    className="mt-2"
                    rows={4}
                  />
                </div>

                <Button onClick={saveMealEntry} className="w-full" size="lg">
                  Enregistrer ce Repas
                </Button>
              </CardContent>
            </Card>

            {/* Recent Meals */}
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Repas Récents</CardTitle>
              </CardHeader>
              <CardContent>
                {mealEntries.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">
                    Aucun repas enregistré encore. Commencez votre voyage de pleine conscience !
                  </p>
                ) : (
                  <div className="space-y-4">
                    {mealEntries.slice(0, 5).map((entry) => (
                      <div key={entry.id} className="p-4 border rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-sm text-gray-500">
                            {new Date(entry.date).toLocaleDateString('fr-FR', {
                              day: 'numeric',
                              month: 'short',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                          <span className="text-sm">
                            Durée: {formatTime(entry.duration)}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>Faim avant: {entry.hungerBefore}/10</div>
                          <div>Satiété après: {entry.fullnessAfter}/10</div>
                        </div>
                        {entry.notes && (
                          <p className="text-sm text-gray-600 mt-2 italic">"{entry.notes}"</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Meditations */}
          <TabsContent value="meditation" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Timer Méditation</CardTitle>
                  <CardDescription>
                    Temps restant: {formatTime(meditationTimer)}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-2">
                    <Button onClick={() => startMeditation(3)} variant="outline" size="sm">3 min</Button>
                    <Button onClick={() => startMeditation(5)} variant="outline" size="sm">5 min</Button>
                    <Button onClick={() => startMeditation(10)} variant="outline" size="sm">10 min</Button>
                  </div>
                  {meditationTimer > 0 && (
                    <Progress value={((300 - meditationTimer) / 300) * 100} className="w-full" />
                  )}
                  {isTimerRunning && (
                    <Button 
                      onClick={() => setIsTimerRunning(false)} 
                      variant="destructive" 
                      className="w-full"
                    >
                      Arrêter
                    </Button>
                  )}
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Méditations Guidées</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    🍎 Méditation des 5 sens
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    🙏 Gratitude avant repas
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    🫶 Body scan digestif
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    🌊 Surf sur les envies
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Exercices de Pleine Conscience</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">🍇 L'exercice du raisin sec</h4>
                  <p className="text-sm text-gray-600">
                    Prenez un aliment simple et explorez-le avec tous vos sens pendant 5 minutes
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">⏱️ Mastiquer 30 fois</h4>
                  <p className="text-sm text-gray-600">
                    Comptez vos mastications pour ralentir naturellement
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">🛑 Pause à mi-repas</h4>
                  <p className="text-sm text-gray-600">
                    Arrêtez-vous au milieu du repas et évaluez votre satiété
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">🙏 Gratitude alimentaire</h4>
                  <p className="text-sm text-gray-600">
                    Prenez un moment pour remercier pour votre nourriture
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Cravings */}
          <TabsContent value="cravings" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Gérer une Envie Alimentaire</CardTitle>
                <CardDescription>
                  Techniques pour surfer sur les envies avec bienveillance
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {cravingTechniques.map((technique) => (
                    <Button key={technique} variant="outline" className="h-auto p-4 text-sm">
                      {technique}
                    </Button>
                  ))}
                </div>
                
                <Separator />
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Technique RAIN</h4>
                  <ol className="text-sm space-y-1 list-decimal list-inside">
                    <li><strong>Reconnaître</strong> : "J'ai envie de..."</li>
                    <li><strong>Accepter</strong> : "C'est normal d'avoir des envies"</li>
                    <li><strong>Investiguer</strong> : "Qu'est-ce que je ressens vraiment ?"</li>
                    <li><strong>Non-attachement</strong> : "Cette envie va passer"</li>
                  </ol>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Insights */}
          <TabsContent value="insights" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Vos Patterns Alimentaires</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">
                      {mealEntries.length}
                    </div>
                    <p className="text-sm text-gray-600">Repas trackés</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">
                      {mealEntries.length > 0 ? 
                        Math.round(mealEntries.reduce((sum, entry) => sum + entry.duration, 0) / mealEntries.length / 60) : 0}
                    </div>
                    <p className="text-sm text-gray-600">Minutes moy. par repas</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600">
                      {mealEntries.length > 0 ? 
                        Math.round((mealEntries.reduce((sum, entry) => sum + entry.hungerBefore, 0) / mealEntries.length) * 10) / 10 : 0}
                    </div>
                    <p className="text-sm text-gray-600">Faim moyenne avant repas</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Conseils Personnalisés</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">💡 Suggestion du jour</h4>
                  <p className="text-green-700">
                    Essayez de poser vos couverts entre chaque bouchée pour ralentir naturellement votre rythme.
                  </p>
                </div>
                
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">🧠 Le saviez-vous ?</h4>
                  <p className="text-blue-700">
                    Il faut environ 20 minutes à votre cerveau pour recevoir les signaux de satiété de votre estomac.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MindfulEating;


import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { 
  Battery, 
  Sun, 
  Moon, 
  Coffee, 
  Zap, 
  Clock, 
  TrendingUp, 
  Calendar,
  Activity,
  Lightbulb,
  Timer,
  BarChart3,
  CloudSun,
  Home
} from "lucide-react";
import { Link } from "react-router-dom";

interface EnergyEntry {
  id: string;
  timestamp: string;
  level: number;
  activity: string;
  notes: string;
  weather?: string;
}

interface CircadianTip {
  time: string;
  activity: string;
  reason: string;
  icon: any;
}

const EnergyBalance = () => {
  const [energyLevel, setEnergyLevel] = useState([7]);
  const [currentActivity, setCurrentActivity] = useState("");
  const [notes, setNotes] = useState("");
  const [energyEntries, setEnergyEntries] = useState<EnergyEntry[]>([]);
  const [caffeineTime, setCaffeineTime] = useState("");
  const [sleepTime, setSleepTime] = useState("22:00");
  const [wakeTime, setWakeTime] = useState("07:00");
  const { toast } = useToast();

  // Load saved data
  useEffect(() => {
    const savedEntries = localStorage.getItem("energyBalance_entries");
    const savedCaffeineTime = localStorage.getItem("energyBalance_caffeineTime");
    const savedSleepTime = localStorage.getItem("energyBalance_sleepTime");
    const savedWakeTime = localStorage.getItem("energyBalance_wakeTime");

    if (savedEntries) {
      setEnergyEntries(JSON.parse(savedEntries));
    }
    if (savedCaffeineTime) setCaffeineTime(savedCaffeineTime);
    if (savedSleepTime) setSleepTime(savedSleepTime);
    if (savedWakeTime) setWakeTime(savedWakeTime);
  }, []);

  // Save data
  const saveToStorage = (key: string, value: any) => {
    localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value));
  };

  const logEnergyLevel = () => {
    const entry: EnergyEntry = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      level: energyLevel[0],
      activity: currentActivity,
      notes: notes
    };

    const updatedEntries = [entry, ...energyEntries];
    setEnergyEntries(updatedEntries);
    saveToStorage("energyBalance_entries", updatedEntries);

    // Reset form
    setCurrentActivity("");
    setNotes("");
    
    toast({
      title: "Niveau d'énergie enregistré",
      description: `Énergie: ${energyLevel[0]}/10 - ${currentActivity}`,
    });
  };

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  };

  const getCircadianTips = (): CircadianTip[] => {
    const currentHour = new Date().getHours();
    
    const tips: CircadianTip[] = [
      {
        time: "06:00-08:00",
        activity: "Exposition à la lumière naturelle",
        reason: "Synchronise votre horloge circadienne",
        icon: Sun
      },
      {
        time: "08:00-10:00",
        activity: "Tâches cognitives importantes",
        reason: "Pic de cortisol et d'alertness",
        icon: Lightbulb
      },
      {
        time: "10:00-12:00",
        activity: "Travail de concentration",
        reason: "Optimal pour la productivité",
        icon: Zap
      },
      {
        time: "13:00-15:00",
        activity: "Power nap (15-20 min)",
        reason: "Creux naturel d'énergie post-déjeuner",
        icon: Moon
      },
      {
        time: "15:00-18:00",
        activity: "Exercice physique",
        reason: "Température corporelle optimale",
        icon: Activity
      },
      {
        time: "19:00-21:00",
        activity: "Activités sociales/créatives",
        reason: "Pics de sérotonine et dopamine",
        icon: TrendingUp
      },
      {
        time: "21:00-22:00",
        activity: "Routine de détente",
        reason: "Préparation à la production de mélatonine",
        icon: Moon
      }
    ];

    return tips;
  };

  const getOptimalCaffeineTime = () => {
    const wakeHour = parseInt(wakeTime.split(':')[0]);
    const optimal1 = `${String(wakeHour + 1).padStart(2, '0')}:30`;
    const optimal2 = `${String(wakeHour + 5).padStart(2, '0')}:00`;
    return { first: optimal1, second: optimal2 };
  };

  const getEnergyForecast = () => {
    if (energyEntries.length < 3) return null;

    const today = new Date().toDateString();
    const todayEntries = energyEntries.filter(entry => 
      new Date(entry.timestamp).toDateString() === today
    );

    if (todayEntries.length === 0) return null;

    const avgEnergy = todayEntries.reduce((sum, entry) => sum + entry.level, 0) / todayEntries.length;
    const currentHour = new Date().getHours();

    let forecast = "";
    if (currentHour < 12 && avgEnergy < 5) {
      forecast = "Énergie faible ce matin. Considérez une exposition à la lumière et une hydratation.";
    } else if (currentHour >= 12 && currentHour < 15 && avgEnergy > 7) {
      forecast = "Bonne énergie ! Profitez-en pour les tâches importantes avant le creux de l'après-midi.";
    } else if (currentHour >= 15 && avgEnergy < 4) {
      forecast = "Creux d'énergie naturel. Une courte sieste ou une pause active pourrait aider.";
    } else {
      forecast = "Votre énergie suit un rythme normal aujourd'hui.";
    }

    return forecast;
  };

  const energyBoostingActivities = [
    "5 minutes de respiration profonde",
    "Exposition à la lumière naturelle",
    "Étirements rapides",
    "Hydratation (verre d'eau)",
    "Marche de 2-3 minutes",
    "Musique énergisante",
    "Collation protéinée",
    "Interaction sociale positive"
  ];

  const energyDrainingActivities = [
    "Scrolling réseaux sociaux excessif",
    "Multitâche intensif",
    "Lumière bleue en soirée",
    "Caféine après 14h",
    "Repas lourds",
    "Sédentarité prolongée",
    "Stress non géré",
    "Manque d'hydratation"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="icon">
                <Home className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
                ⚡ EnergyBalance
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Optimisation circadienne de votre énergie
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-orange-600">{getCurrentTime()}</div>
            <div className="text-sm text-gray-500">Maintenant</div>
          </div>
        </div>

        <Tabs defaultValue="track" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="track">Tracking</TabsTrigger>
            <TabsTrigger value="circadian">Circadien</TabsTrigger>
            <TabsTrigger value="optimize">Optimiser</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Tracking Tab */}
          <TabsContent value="track" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Battery className="h-5 w-5" />
                  Niveau d'énergie actuel
                </CardTitle>
                <CardDescription>
                  Évaluez votre énergie de 1 (épuisé) à 10 (très énergique)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label>Niveau d'énergie: {energyLevel[0]}/10</Label>
                  <Slider
                    value={energyLevel}
                    onValueChange={setEnergyLevel}
                    max={10}
                    min={1}
                    step={1}
                    className="mt-2"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Épuisé</span>
                    <span>Modéré</span>
                    <span>Très énergique</span>
                  </div>
                </div>

                <div>
                  <Label htmlFor="activity">Activité actuelle</Label>
                  <Input
                    id="activity"
                    value={currentActivity}
                    onChange={(e) => setCurrentActivity(e.target.value)}
                    placeholder="Ex: Travail sur ordinateur, réunion, pause..."
                  />
                </div>

                <div>
                  <Label htmlFor="notes">Notes (optionnel)</Label>
                  <Textarea
                    id="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Ex: Après café, manque de sommeil, stress..."
                    rows={3}
                  />
                </div>

                <Button onClick={logEnergyLevel} className="w-full">
                  <Zap className="h-4 w-4 mr-2" />
                  Enregistrer niveau d'énergie
                </Button>
              </CardContent>
            </Card>

            {/* Energy Forecast */}
            {getEnergyForecast() && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Prédiction énergétique
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{getEnergyForecast()}</p>
                </CardContent>
              </Card>
            )}

            {/* Recent Entries */}
            {energyEntries.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Historique récent</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {energyEntries.slice(0, 5).map((entry) => (
                      <div key={entry.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1">
                            <Battery className="h-4 w-4" />
                            <span className="font-medium">{entry.level}/10</span>
                          </div>
                          <span className="text-sm text-gray-600">{entry.activity}</span>
                        </div>
                        <span className="text-xs text-gray-500">
                          {new Date(entry.timestamp).toLocaleTimeString('fr-FR', { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Circadian Tab */}
          <TabsContent value="circadian" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sun className="h-5 w-5" />
                  Recommandations circadiennes
                </CardTitle>
                <CardDescription>
                  Optimisez vos activités selon votre rythme naturel
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {getCircadianTips().map((tip, index) => {
                    const IconComponent = tip.icon;
                    return (
                      <div key={index} className="flex items-start gap-3 p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg">
                        <IconComponent className="h-5 w-5 text-orange-600 mt-0.5" />
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="outline">{tip.time}</Badge>
                          </div>
                          <h4 className="font-medium">{tip.activity}</h4>
                          <p className="text-sm text-gray-600">{tip.reason}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Sleep Schedule */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Moon className="h-5 w-5" />
                  Horaires de sommeil
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="wakeTime">Heure de réveil</Label>
                    <Input
                      id="wakeTime"
                      type="time"
                      value={wakeTime}
                      onChange={(e) => {
                        setWakeTime(e.target.value);
                        saveToStorage("energyBalance_wakeTime", e.target.value);
                      }}
                    />
                  </div>
                  <div>
                    <Label htmlFor="sleepTime">Heure de coucher</Label>
                    <Input
                      id="sleepTime"
                      type="time"
                      value={sleepTime}
                      onChange={(e) => {
                        setSleepTime(e.target.value);
                        saveToStorage("energyBalance_sleepTime", e.target.value);
                      }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Optimize Tab */}
          <TabsContent value="optimize" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Coffee className="h-5 w-5" />
                  Timing optimal caféine
                </CardTitle>
                <CardDescription>
                  Basé sur votre horaire de réveil et votre cortisol naturel
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-medium text-green-800 mb-2">Créneaux optimaux</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-sm text-green-600">Premier café</span>
                        <div className="font-bold text-green-800">{getOptimalCaffeineTime().first}</div>
                      </div>
                      <div>
                        <span className="text-sm text-green-600">Dernier café</span>
                        <div className="font-bold text-green-800">{getOptimalCaffeineTime().second}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="caffeineTime">Dernière prise de caféine aujourd'hui</Label>
                    <Input
                      id="caffeineTime"
                      type="time"
                      value={caffeineTime}
                      onChange={(e) => {
                        setCaffeineTime(e.target.value);
                        saveToStorage("energyBalance_caffeineTime", e.target.value);
                      }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-600">
                    <TrendingUp className="h-5 w-5" />
                    Activités énergisantes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {energyBoostingActivities.map((activity, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-green-50 rounded">
                        <Zap className="h-4 w-4 text-green-600" />
                        <span className="text-sm">{activity}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-600">
                    <Battery className="h-5 w-5" />
                    Activités épuisantes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {energyDrainingActivities.map((activity, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-red-50 rounded">
                        <Timer className="h-4 w-4 text-red-600" />
                        <span className="text-sm">{activity}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Analyse des patterns
                </CardTitle>
              </CardHeader>
              <CardContent>
                {energyEntries.length > 0 ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">
                          {(energyEntries.reduce((sum, entry) => sum + entry.level, 0) / energyEntries.length).toFixed(1)}
                        </div>
                        <div className="text-sm text-blue-600">Énergie moyenne</div>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">
                          {Math.max(...energyEntries.map(entry => entry.level))}
                        </div>
                        <div className="text-sm text-green-600">Pic d'énergie</div>
                      </div>
                      <div className="text-center p-4 bg-orange-50 rounded-lg">
                        <div className="text-2xl font-bold text-orange-600">
                          {energyEntries.length}
                        </div>
                        <div className="text-sm text-orange-600">Mesures prises</div>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <h4 className="font-medium mb-3">Cycles ultradianes (90 min)</h4>
                      <p className="text-sm text-gray-600">
                        Votre corps suit des cycles de 90 minutes. Planifiez des pauses naturelles 
                        toutes les 1h30 pour optimiser votre productivité.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <CloudSun className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">
                      Commencez à tracker votre énergie pour voir vos patterns personnels
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Weather Integration Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CloudSun className="h-5 w-5" />
                  Intégrations futures
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <CloudSun className="h-5 w-5 text-blue-500" />
                    <div>
                      <div className="font-medium">Météo & Pression barométrique</div>
                      <div className="text-sm text-gray-600">Impact sur votre énergie</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Sun className="h-5 w-5 text-yellow-500" />
                    <div>
                      <div className="font-medium">Lever/Coucher du soleil</div>
                      <div className="text-sm text-gray-600">Optimisation luminothérapie</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Activity className="h-5 w-5 text-green-500" />
                    <div>
                      <div className="font-medium">Corrélation activités</div>
                      <div className="text-sm text-gray-600">Avec autres apps santé</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EnergyBalance;

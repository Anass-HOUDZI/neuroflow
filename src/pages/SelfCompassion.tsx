
import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Heart, Brain, BookOpen, MessageCircle, Star, Play, Pause, Volume2, VolumeX, Feather } from "lucide-react";

interface CompassionAssessment {
  selfKindness: number;
  selfJudgment: number;
  commonHumanity: number;
  isolation: number;
  mindfulness: number;
  overIdentification: number;
}

interface CompassionLetter {
  id: string;
  date: string;
  situation: string;
  content: string;
  mood: "difficult" | "struggle" | "pain" | "failure";
}

interface MeditationSession {
  id: string;
  type: "loving-kindness" | "body-scan" | "difficult-emotions";
  duration: number;
  completed: boolean;
  date: string;
}

const SelfCompassion = () => {
  const [activeTab, setActiveTab] = useState<"assessment" | "techniques" | "meditation" | "letters" | "progress">("techniques");
  const [assessment, setAssessment] = useState<CompassionAssessment>({
    selfKindness: 3,
    selfJudgment: 3,
    commonHumanity: 3,
    isolation: 3,
    mindfulness: 3,
    overIdentification: 3
  });
  const [letters, setLetters] = useState<CompassionLetter[]>([]);
  const [currentLetter, setCurrentLetter] = useState({ situation: "", content: "", mood: "difficult" as const });
  const [meditationActive, setMeditationActive] = useState(false);
  const [meditationTime, setMeditationTime] = useState(0);
  const [selectedTechnique, setSelectedTechnique] = useState("");
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [dailyChallenge, setDailyChallenge] = useState("");

  const assessmentQuestions = [
    { key: "selfKindness", question: "Je suis gentil(le) avec moi-même quand je traverse des moments difficiles", positive: true },
    { key: "selfJudgment", question: "Je suis désapprobateur/critique envers mes propres défauts", positive: false },
    { key: "commonHumanity", question: "Quand je traverse des moments difficiles, je me dis que la souffrance fait partie de la vie", positive: true },
    { key: "isolation", question: "Quand je pense à mes insuffisances, je me sens plus séparé(e) du reste du monde", positive: false },
    { key: "mindfulness", question: "J'essaie de voir mes sentiments avec curiosité et ouverture quand je souffre", positive: true },
    { key: "overIdentification", question: "Quand quelque chose me contrarie, je me laisse emporter par mes émotions", positive: false }
  ];

  const compassionTechniques = [
    {
      title: "Pause Auto-Compassion",
      description: "Technique en 3 étapes pour moments difficiles",
      steps: [
        "1. Mindfulness: 'Ce moment est difficile'",
        "2. Humanité commune: 'La souffrance fait partie de la vie'",
        "3. Auto-bienveillance: 'Puis-je être gentil(le) avec moi-même?'"
      ],
      situation: "Moments de stress ou d'autocritique"
    },
    {
      title: "Reframing Critique Interne",
      description: "Transformer la voix critique en sage ami",
      steps: [
        "1. Identifiez la voix critique",
        "2. Que dirait un ami bienveillant?",
        "3. Reformulez avec compassion",
        "4. Agissez depuis cette nouvelle perspective"
      ],
      situation: "Autocritique sévère"
    },
    {
      title: "Main sur le Cœur",
      description: "Geste physique d'auto-réconfort",
      steps: [
        "1. Placez votre main sur votre cœur",
        "2. Sentez la chaleur et la pression",
        "3. Respirez profondément",
        "4. Répétez: 'Puis-je m'accepter tel(le) que je suis'"
      ],
      situation: "Besoin de réconfort immédiat"
    }
  ];

  const dailyChallenges = [
    "Écrivez 3 choses pour lesquelles vous vous pardonnez aujourd'hui",
    "Parlez-vous comme vous parleriez à votre meilleur(e) ami(e)",
    "Remarquez votre critique interne et répondez avec gentillesse",
    "Pratiquez la gratitude envers votre corps pour ce qu'il fait",
    "Acceptez une imperfection comme faisant partie de votre humanité"
  ];

  useEffect(() => {
    const stored = localStorage.getItem("selfCompassionData");
    if (stored) {
      const data = JSON.parse(stored);
      setLetters(data.letters || []);
      setAssessment(data.assessment || assessment);
    }
    
    // Challenge quotidien
    const today = new Date().toDateString();
    const storedChallenge = localStorage.getItem("dailyCompassionChallenge");
    if (storedChallenge !== today) {
      const randomChallenge = dailyChallenges[Math.floor(Math.random() * dailyChallenges.length)];
      setDailyChallenge(randomChallenge);
      localStorage.setItem("dailyCompassionChallenge", today);
      localStorage.setItem("todayCompassionChallenge", randomChallenge);
    } else {
      setDailyChallenge(localStorage.getItem("todayCompassionChallenge") || dailyChallenges[0]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("selfCompassionData", JSON.stringify({
      letters,
      assessment
    }));
  }, [letters, assessment]);

  // Timer méditation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (meditationActive) {
      interval = setInterval(() => {
        setMeditationTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [meditationActive]);

  const calculateCompassionScore = () => {
    const positive = (assessment.selfKindness + assessment.commonHumanity + assessment.mindfulness) / 3;
    const negative = (7 - assessment.selfJudgment + 7 - assessment.isolation + 7 - assessment.overIdentification) / 3;
    return Math.round(((positive + negative) / 2) * 10) / 10;
  };

  const saveLetter = () => {
    if (currentLetter.content.trim()) {
      const newLetter: CompassionLetter = {
        id: Date.now().toString(),
        date: new Date().toLocaleDateString(),
        ...currentLetter
      };
      setLetters([newLetter, ...letters]);
      setCurrentLetter({ situation: "", content: "", mood: "difficult" });
    }
  };

  const startMeditation = (type: string) => {
    setMeditationActive(true);
    setMeditationTime(0);
    setSelectedTechnique(type);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const speakText = (text: string) => {
    if (voiceEnabled && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'fr-FR';
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center">
              <Heart className="h-6 w-6 text-rose-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800">SelfCompassion</h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Développez votre auto-compassion avec des techniques scientifiquement fondées 
            basées sur les recherches de Kristin Neff
          </p>
        </div>

        {/* Challenge quotidien */}
        <Card className="mb-6 bg-gradient-to-r from-rose-100 to-pink-100 border-rose-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Star className="h-5 w-5 text-rose-600" />
              <div>
                <p className="font-medium text-rose-800">Challenge d'Auto-Compassion du Jour</p>
                <p className="text-rose-700">{dailyChallenge}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex flex-wrap gap-2 mb-6">
          {[
            { key: "techniques", label: "Techniques", icon: Brain },
            { key: "assessment", label: "Évaluation", icon: Heart },
            { key: "meditation", label: "Méditations", icon: Play },
            { key: "letters", label: "Lettres", icon: BookOpen },
            { key: "progress", label: "Progrès", icon: Star }
          ].map(({ key, label, icon: Icon }) => (
            <Button
              key={key}
              variant={activeTab === key ? "default" : "outline"}
              onClick={() => setActiveTab(key as any)}
              className="flex items-center gap-2"
            >
              <Icon className="h-4 w-4" />
              {label}
            </Button>
          ))}
        </div>

        {/* Contrôles voix */}
        <div className="flex justify-end mb-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setVoiceEnabled(!voiceEnabled)}
            className="flex items-center gap-2"
          >
            {voiceEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            Voix {voiceEnabled ? "ON" : "OFF"}
          </Button>
        </div>

        {/* Techniques */}
        {activeTab === "techniques" && (
          <div className="grid gap-6">
            {compassionTechniques.map((technique, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-blue-600" />
                    {technique.title}
                  </CardTitle>
                  <CardDescription>{technique.description}</CardDescription>
                  <Badge variant="secondary">{technique.situation}</Badge>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {technique.steps.map((step, stepIndex) => (
                      <div key={stepIndex} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-sm font-medium text-blue-600">
                          {stepIndex + 1}
                        </div>
                        <p className="text-gray-700">{step}</p>
                        {voiceEnabled && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => speakText(step)}
                          >
                            <Volume2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Évaluation Auto-Compassion */}
        {activeTab === "assessment" && (
          <Card>
            <CardHeader>
              <CardTitle>Échelle d'Auto-Compassion</CardTitle>
              <CardDescription>
                Évaluez votre niveau actuel d'auto-compassion (1 = Jamais, 5 = Toujours)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {assessmentQuestions.map((q, index) => (
                <div key={index} className="space-y-2">
                  <Label className="text-sm font-medium">{q.question}</Label>
                  <RadioGroup
                    value={assessment[q.key as keyof CompassionAssessment].toString()}
                    onValueChange={(value) => 
                      setAssessment(prev => ({ ...prev, [q.key]: parseInt(value) }))
                    }
                  >
                    <div className="flex gap-4">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <div key={rating} className="flex items-center space-x-2">
                          <RadioGroupItem value={rating.toString()} id={`${q.key}-${rating}`} />
                          <Label htmlFor={`${q.key}-${rating}`}>{rating}</Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </div>
              ))}
              
              <Alert>
                <Heart className="h-4 w-4" />
                <AlertDescription>
                  Score d'Auto-Compassion: <strong>{calculateCompassionScore()}/5</strong>
                  <br />
                  {calculateCompassionScore() >= 4 
                    ? "Excellent! Vous faites preuve d'une grande auto-compassion."
                    : calculateCompassionScore() >= 3
                    ? "Bien! Continuez à développer votre auto-compassion."
                    : "Il y a de la place pour grandir en auto-compassion. C'est normal et beau."
                  }
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        )}

        {/* Méditations */}
        {activeTab === "meditation" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Méditations Audio-Compassion</CardTitle>
                <CardDescription>
                  Méditations guidées pour développer la bienveillance envers soi-même
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {[
                    { type: "loving-kindness", title: "Loving-Kindness pour Soi", duration: "10 min" },
                    { type: "body-scan", title: "Body Scan Compassionnel", duration: "15 min" },
                    { type: "difficult-emotions", title: "Accueillir les Émotions Difficiles", duration: "12 min" }
                  ].map((meditation) => (
                    <div key={meditation.type} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium">{meditation.title}</h4>
                        <p className="text-sm text-gray-600">{meditation.duration}</p>
                      </div>
                      <Button
                        onClick={() => startMeditation(meditation.type)}
                        disabled={meditationActive && selectedTechnique === meditation.type}
                      >
                        {meditationActive && selectedTechnique === meditation.type ? (
                          <>
                            <Pause className="h-4 w-4 mr-2" />
                            {formatTime(meditationTime)}
                          </>
                        ) : (
                          <>
                            <Play className="h-4 w-4 mr-2" />
                            Démarrer
                          </>
                        )}
                      </Button>
                    </div>
                  ))}
                </div>

                {meditationActive && (
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">Méditation en cours</h4>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setMeditationActive(false)}
                      >
                        Arrêter
                      </Button>
                    </div>
                    <Progress value={(meditationTime / 600) * 100} className="mb-2" />
                    <p className="text-sm text-gray-600">Temps: {formatTime(meditationTime)}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Lettres Compassionnelles */}
        {activeTab === "letters" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Lettre d'Auto-Compassion</CardTitle>
                <CardDescription>
                  Écrivez-vous une lettre bienveillante comme si vous parliez à votre meilleur(e) ami(e)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="situation">Situation difficile</Label>
                  <Textarea
                    id="situation"
                    placeholder="Décrivez brièvement la situation qui vous préoccupe..."
                    value={currentLetter.situation}
                    onChange={(e) => setCurrentLetter(prev => ({ ...prev, situation: e.target.value }))}
                  />
                </div>

                <div>
                  <Label>Humeur actuelle</Label>
                  <RadioGroup
                    value={currentLetter.mood}
                    onValueChange={(value) => setCurrentLetter(prev => ({ ...prev, mood: value as any }))}
                  >
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { value: "difficult", label: "Moment difficile" },
                        { value: "struggle", label: "Je lutte" },
                        { value: "pain", label: "Douleur" },
                        { value: "failure", label: "Échec ressenti" }
                      ].map(({ value, label }) => (
                        <div key={value} className="flex items-center space-x-2">
                          <RadioGroupItem value={value} id={value} />
                          <Label htmlFor={value}>{label}</Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label htmlFor="letter">Votre lettre compassionnelle</Label>
                  <Textarea
                    id="letter"
                    placeholder="Cher/Chère [votre prénom], je vois que tu traverses un moment difficile..."
                    value={currentLetter.content}
                    onChange={(e) => setCurrentLetter(prev => ({ ...prev, content: e.target.value }))}
                    className="min-h-32"
                  />
                </div>

                <Button onClick={saveLetter} disabled={!currentLetter.content.trim()}>
                  <Feather className="h-4 w-4 mr-2" />
                  Sauvegarder la Lettre
                </Button>
              </CardContent>
            </Card>

            {/* Lettres sauvegardées */}
            {letters.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Vos Lettres Sauvegardées</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {letters.map((letter) => (
                      <div key={letter.id} className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="outline">{letter.mood}</Badge>
                          <span className="text-sm text-gray-500">{letter.date}</span>
                        </div>
                        <p className="text-sm font-medium mb-2">{letter.situation}</p>
                        <p className="text-sm text-gray-700">{letter.content.substring(0, 150)}...</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Progrès */}
        {activeTab === "progress" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Votre Parcours d'Auto-Compassion</CardTitle>
                <CardDescription>
                  Suivi bienveillant de votre développement personnel
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-rose-50 rounded-lg">
                      <div className="w-8 h-8 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Heart className="h-4 w-4 text-rose-600" />
                      </div>
                      <p className="text-2xl font-bold text-rose-600">{calculateCompassionScore()}/5</p>
                      <p className="text-sm text-gray-600">Score Auto-Compassion</p>
                    </div>
                    
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                        <BookOpen className="h-4 w-4 text-blue-600" />
                      </div>
                      <p className="text-2xl font-bold text-blue-600">{letters.length}</p>
                      <p className="text-sm text-gray-600">Lettres écrites</p>
                    </div>
                    
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Star className="h-4 w-4 text-green-600" />
                      </div>
                      <p className="text-2xl font-bold text-green-600">7</p>
                      <p className="text-sm text-gray-600">Jours de pratique</p>
                    </div>
                  </div>

                  <Alert>
                    <MessageCircle className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Rappel bienveillant:</strong> L'auto-compassion se développe avec la pratique. 
                      Chaque petit geste de bienveillance envers vous-même compte. Vous faites du bon travail! 💝
                    </AlertDescription>
                  </Alert>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default SelfCompassion;

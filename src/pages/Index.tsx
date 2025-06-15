import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, Heart, Target, BookOpen, BarChart3, Calendar, Moon, Sun, FileText, Grid3X3, Wind, Trello, Brush, Palette, Pencil, PencilLine, Scissors, Text, TextCursor, Wand, Image, Calculator, Dumbbell, Droplet, HeartPulse, Smile, Flower, Scan } from "lucide-react";

const Index = () => {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const features = [
    {
      title: "ZenPad",
      description: "Éditeur de texte sans distraction pour la créativité",
      icon: FileText,
      path: "/zenpad",
      color: "bg-slate-100 text-slate-600"
    },
    {
      title: "HabitGrid",
      description: "Tracker d'habitudes bienveillant et visuel",
      icon: Grid3X3,
      path: "/habitgrid",
      color: "bg-emerald-100 text-emerald-600"
    },
    {
      title: "MindfulBreath",
      description: "Techniques de respiration pour la régulation du stress",
      icon: Wind,
      path: "/mindfulbreath",
      color: "bg-sky-100 text-sky-600"
    },
    {
      title: "LocalBoard",
      description: "Kanban hors-ligne pour la gestion de projet",
      icon: Trello,
      path: "/localboard",
      color: "bg-purple-100 text-purple-600"
    },
    {
      title: "GratitudeGarden",
      description: "Jardin virtuel de gratitude : neuroplasticité positive quotidienne",
      icon: Flower,
      path: "/gratitudegarden",
      color: "bg-green-100 text-green-600"
    },
    {
      title: "StressScanner",
      description: "Analyseur stress physiologique : HRV, micro-expressions, biofeedback temps réel",
      icon: Scan,
      path: "/stressscanner",
      color: "bg-blue-100 text-blue-600"
    },
    {
      title: "Mood Tracker",
      description: "Track your daily emotions and identify patterns",
      icon: Heart,
      path: "/mood",
      color: "bg-pink-100 text-pink-600"
    },
    {
      title: "Meditation",
      description: "Guided meditation sessions for mindfulness",
      icon: Brain,
      path: "/meditation",
      color: "bg-purple-100 text-purple-600"
    },
    {
      title: "Journal",
      description: "Write and reflect on your thoughts",
      icon: BookOpen,
      path: "/journal",
      color: "bg-blue-100 text-blue-600"
    },
    {
      title: "Goals",
      description: "Set and track your wellness goals",
      icon: Target,
      path: "/goals",
      color: "bg-green-100 text-green-600"
    },
    {
      title: "Analytics",
      description: "View your progress and insights",
      icon: BarChart3,
      path: "/analytics",
      color: "bg-orange-100 text-orange-600"
    },
    {
      title: "Calendar",
      description: "Schedule and manage wellness activities",
      icon: Calendar,
      path: "/calendar",
      color: "bg-indigo-100 text-indigo-600"
    },
    // ---- Nouvelles fonctionnalités CRÉATIVITÉ & DESIGN ---- //
    {
      title: "PixelCraft",
      description: "Éditeur pixel art, canvas pro, animation, palette, layers",
      icon: Brush,
      path: "/pixelcraft",
      color: "bg-pink-100 text-pink-600"
    },
    {
      title: "VectorStudio",
      description: "SVG pro, Béziers, groupes, animation, gradients",
      icon: Pencil,
      path: "/vectorstudio",
      color: "bg-green-100 text-green-600"
    },
    {
      title: "ColorMaster",
      description: "Studio couleurs, roue chromatique, harmonies, export dev",
      icon: Palette,
      path: "/colormaster",
      color: "bg-orange-100 text-orange-600"
    },
    {
      title: "SoundWeaver",
      description: "Studio audio simple, multi-pistes, effets, export",
      icon: Wand,
      path: "/soundweaver",
      color: "bg-blue-100 text-blue-600"
    },
    {
      title: "QuickEdit",
      description: "Photo rapide, filtres, correction, batch, presets",
      icon: Scissors,
      path: "/quickedit",
      color: "bg-purple-100 text-purple-600"
    },
    {
      title: "FontForge",
      description: "Polices, glyphes, Béziers, import/export, preview",
      icon: Text,
      path: "/fontforge",
      color: "bg-gray-100 text-gray-600"
    },
    {
      title: "DiagramFlow",
      description: "Diagrammes, flowcharts, auto-layout, connecteurs",
      icon: PencilLine,
      path: "/diagramflow",
      color: "bg-cyan-100 text-cyan-600"
    },
    {
      title: "LogoMaker",
      description: "Logos, composition assistée, guidelines, export",
      icon: Image,
      path: "/logomaker",
      color: "bg-fuchsia-100 text-fuchsia-600"
    },
    {
      title: "MemeMaker",
      description: "Memes, templates, upload, texte stylé, GIF animé",
      icon: TextCursor,
      path: "/mememaker",
      color: "bg-yellow-100 text-yellow-600"
    },
    {
      title: "PatternGen",
      description: "Générateur motifs, tessellations, fractales, export",
      icon: Palette,
      path: "/patterngen",
      color: "bg-lime-100 text-lime-600"
    },
    // ---- Nouvelles fonctionnalités CRÉATIVITÉ & DESIGN ---- //
    {
      title: "EmotionWheel",
      description: "Roue des émotions interactive : granularité, journal, régulation",
      icon: Smile,
      path: "/emotionwheel",
      color: "bg-yellow-100 text-yellow-700"
    },
    // ---- Nouveaux outils ANALYSE & DONNÉES ---- //
    {
      title: "DataViz",
      description: "Visualisateur données, import CSV/JSON, graphiques interactifs",
      icon: BarChart3,
      path: "/dataviz",
      color: "bg-blue-100 text-blue-600"
    },
    {
      title: "StatsPro",
      description: "Analyseur statistiques, tests hypothèses, corrélations, insights",
      icon: Calculator,
      path: "/statspro",
      color: "bg-emerald-100 text-emerald-600"
    },
    {
      title: "FitnessLog",
      description: "Journal d'entraînement simple : séances, durée, notes",
      icon: Dumbbell,
      path: "/fitnesslog",
      color: "bg-lime-100 text-lime-600"
    },
    {
      title: "SleepAnalyzer",
      description: "Analyse du sommeil : horaires, qualité, notes, historique",
      icon: Moon,
      path: "/sleepanalyzer",
      color: "bg-indigo-100 text-indigo-600"
    },
    {
      title: "HydroReminder",
      description: "Journal d'eau journalière et rappels hydratation",
      icon: Droplet,
      path: "/hydro",
      color: "bg-sky-100 text-sky-600"
    },
    // ---- Nouveaux outils ANALYSE & DONNÉES ---- //
    {
      title: "AnxietyHelper",
      description: "Assistant anti-anxiété basé CBT : questionnaire, techniques immédiates, protocoles crise",
      icon: HeartPulse,
      path: "/anxietyhelper",
      color: "bg-pink-50 text-pink-500"
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
              NeuroFlow PWA Suite
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Your comprehensive mental wellness companion
            </p>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
        </div>

        {/* Welcome Card */}
        <Card className="mb-8 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Welcome Back!</CardTitle>
            <CardDescription className="text-center text-lg">
              Ready to continue your wellness journey today?
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="flex justify-center space-x-4 text-sm text-gray-600">
              <span>🔥 7 day streak</span>
              <span>📊 85% weekly goal</span>
              <span>🎯 3 goals active</span>
            </div>
          </CardContent>
        </Card>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => {
            const IconComponent = feature.icon;
            return (
              <Link key={feature.path} to={feature.path}>
                <Card className="h-full hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 bg-white/80 backdrop-blur-sm">
                  <CardHeader className="text-center">
                    <div className={`mx-auto w-16 h-16 rounded-full ${feature.color} flex items-center justify-center mb-4`}>
                      <IconComponent className="h-8 w-8" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <Button variant="outline" className="w-full">
                      Get Started
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Quick Actions</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild variant="default" size="lg">
              <Link to="/zenpad">Start Writing</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/habitgrid">Track Habits</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/mindfulbreath">Breathe</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/localboard">Manage Projects</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/gratitudegarden">Practice Gratitude</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/stressscanner">Analyze Stress</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/mood">Log Mood</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/meditation">Start Meditation</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/fitnesslog">Journal Fitness</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

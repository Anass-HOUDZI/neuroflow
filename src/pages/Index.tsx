import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Brain, Heart, Target, BookOpen, BarChart3, Calendar, Moon, Sun, FileText,
  Grid3X3, Wind, Trello, Brush, Palette, Pencil, PencilLine, Scissors, Text,
  TextCursor, Wand, Image, Calculator, Dumbbell, Droplet, HeartPulse, Smile,
  Flower, Scan, Apple, Timer, Salad, Leaf, Pill, Info, CheckCircle, Circle
} from "lucide-react";

const CATEGORIES = [
  { name: "Bien-être & Mental", color: "from-blue-50 to-emerald-50" },
  { name: "Productivité", color: "from-pink-50 to-purple-50" },
  { name: "Données & Analyse", color: "from-indigo-50 to-sky-50" },
  { name: "Créativité & Design", color: "from-orange-50 to-fuchsia-50" },
  // ...extensible plus tard
];

const features = [
  {
    title: "ZenPad",
    description: "Éditeur de texte sans distraction pour la créativité",
    icon: FileText,
    path: "/zenpad",
    category: "Productivité",
    color: "from-blue-200 via-slate-100 to-blue-50"
  },
  {
    title: "HabitGrid",
    description: "Tracker d'habitudes bienveillant et visuel",
    icon: Grid3X3,
    path: "/habitgrid",
    category: "Bien-être & Mental",
    color: "from-emerald-200 to-green-50"
  },
  {
    title: "MindfulBreath",
    description: "Techniques de respiration pour la régulation du stress",
    icon: Wind,
    path: "/mindfulbreath",
    category: "Bien-être & Mental",
    color: "from-sky-200 to-blue-50"
  },
  {
    title: "LocalBoard",
    description: "Kanban hors-ligne pour la gestion de projet",
    icon: Trello,
    path: "/localboard",
    category: "Productivité",
    color: "from-purple-200 to-purple-50"
  },
  {
    title: "MindfulEating",
    description: "Alimentation consciente : signaux satiété, méditations alimentaires, gestion envies",
    icon: Apple,
    path: "/mindfuleating",
    category: "Bien-être & Mental",
    color: "from-green-200 to-orange-50"
  },
  {
    title: "GratitudeGarden",
    description: "Jardin virtuel de gratitude : neuroplasticité positive quotidienne",
    icon: Flower,
    path: "/gratitudegarden",
    category: "Bien-être & Mental",
    color: "from-green-100 to-lime-50"
  },
  {
    title: "StressScanner",
    description: "Analyseur stress physiologique : HRV, micro-expressions, biofeedback temps réel",
    icon: Scan,
    path: "/stressscanner",
    category: "Bien-être & Mental",
    color: "from-blue-100 to-sky-50"
  },
  {
    title: "SelfCompassion",
    description: "Auto-compassion basée Kristin Neff : techniques, lettres, méditations bienveillantes",
    icon: Heart,
    path: "/selfcompassion",
    category: "Bien-être & Mental",
    color: "from-rose-200 to-pink-50"
  },
  {
    title: "Mood Tracker",
    description: "Track your daily emotions and identify patterns",
    icon: Heart,
    path: "/mood",
    category: "Bien-être & Mental",
    color: "from-pink-100 to-pink-50"
  },
  {
    title: "Meditation",
    description: "Guided meditation sessions for mindfulness",
    icon: Brain,
    path: "/meditation",
    category: "Bien-être & Mental",
    color: "from-purple-100 to-purple-50"
  },
  {
    title: "Journal",
    description: "Write and reflect on your thoughts",
    icon: BookOpen,
    path: "/journal",
    category: "Productivité",
    color: "from-blue-100 to-blue-50"
  },
  {
    title: "Goals",
    description: "Set and track your wellness goals",
    icon: Target,
    path: "/goals",
    category: "Productivité",
    color: "from-green-100 to-green-50"
  },
  {
    title: "Analytics",
    description: "View your progress and insights",
    icon: BarChart3,
    path: "/analytics",
    category: "Données & Analyse",
    color: "from-orange-100 to-orange-50"
  },
  {
    title: "Calendar",
    description: "Schedule and manage wellness activities",
    icon: Calendar,
    path: "/calendar",
    category: "Productivité",
    color: "from-indigo-100 to-indigo-50"
  },
  // ---- Nouvelles fonctionnalités CRÉATIVITÉ & DESIGN ---- //
  {
    title: "PixelCraft",
    description: "Éditeur pixel art, canvas pro, animation, palette, layers",
    icon: Brush,
    path: "/pixelcraft",
    category: "Créativité & Design",
    color: "from-pink-100 to-pink-50"
  },
  {
    title: "VectorStudio",
    description: "SVG pro, Béziers, groupes, animation, gradients",
    icon: Pencil,
    path: "/vectorstudio",
    category: "Créativité & Design",
    color: "from-green-100 to-green-50"
  },
  {
    title: "ColorMaster",
    description: "Studio couleurs, roue chromatique, harmonies, export dev",
    icon: Palette,
    path: "/colormaster",
    category: "Créativité & Design",
    color: "from-orange-100 to-orange-50"
  },
  {
    title: "SoundWeaver",
    description: "Studio audio simple, multi-pistes, effets, export",
    icon: Wand,
    path: "/soundweaver",
    category: "Créativité & Design",
    color: "from-blue-100 to-blue-50"
  },
  {
    title: "QuickEdit",
    description: "Photo rapide, filtres, correction, batch, presets",
    icon: Scissors,
    path: "/quickedit",
    category: "Créativité & Design",
    color: "from-purple-100 to-purple-50"
  },
  {
    title: "FontForge",
    description: "Polices, glyphes, Béziers, import/export, preview",
    icon: Text,
    path: "/fontforge",
    category: "Créativité & Design",
    color: "from-gray-100 to-gray-50"
  },
  {
    title: "DiagramFlow",
    description: "Diagrammes, flowcharts, auto-layout, connecteurs",
    icon: PencilLine,
    path: "/diagramflow",
    category: "Créativité & Design",
    color: "from-cyan-100 to-cyan-50"
  },
  {
    title: "LogoMaker",
    description: "Logos, composition assistée, guidelines, export",
    icon: Image,
    path: "/logomaker",
    category: "Créativité & Design",
    color: "from-fuchsia-100 to-fuchsia-50"
  },
  {
    title: "MemeMaker",
    description: "Memes, templates, upload, texte stylé, GIF animé",
    icon: TextCursor,
    path: "/mememaker",
    category: "Créativité & Design",
    color: "from-yellow-100 to-yellow-50"
  },
  {
    title: "PatternGen",
    description: "Générateur motifs, tessellations, fractales, export",
    icon: Palette,
    path: "/patterngen",
    category: "Créativité & Design",
    color: "from-lime-100 to-lime-50"
  },
  // ---- Nouvelles fonctionnalités CRÉATIVITÉ & DESIGN ---- //
  {
    title: "EmotionWheel",
    description: "Roue des émotions interactive : granularité, journal, régulation",
    icon: Smile,
    path: "/emotionwheel",
    category: "Bien-être & Mental",
    color: "from-yellow-100 to-yellow-700"
  },
  // ---- Nouveaux outils ANALYSE & DONNÉES ---- //
  {
    title: "DataViz",
    description: "Visualisateur données, import CSV/JSON, graphiques interactifs",
    icon: BarChart3,
    path: "/dataviz",
    category: "Données & Analyse",
    color: "from-blue-100 to-blue-50"
  },
  {
    title: "StatsPro",
    description: "Analyseur statistiques, tests hypothèses, corrélations, insights",
    icon: Calculator,
    path: "/statspro",
    category: "Données & Analyse",
    color: "from-emerald-100 to-emerald-50"
  },
  {
    title: "FitnessLog",
    description: "Journal d'entraînement simple : séances, durée, notes",
    icon: Dumbbell,
    path: "/fitnesslog",
    category: "Bien-être & Mental",
    color: "from-lime-100 to-lime-50"
  },
  {
    title: "SleepAnalyzer",
    description: "Analyse du sommeil : horaires, qualité, notes, historique",
    icon: Moon,
    path: "/sleepanalyzer",
    category: "Bien-être & Mental",
    color: "from-indigo-100 to-indigo-50"
  },
  {
    title: "HydroReminder",
    description: "Journal d'eau journalière et rappels hydratation",
    icon: Droplet,
    path: "/hydro",
    category: "Bien-être & Mental",
    color: "from-sky-100 to-sky-50"
  },
  // ---- Nouveaux outils ANALYSE & DONNÉES ---- //
  {
    title: "AnxietyHelper",
    description: "Assistant anti-anxiété basé CBT : questionnaire, techniques immédiates, protocoles crise",
    icon: HeartPulse,
    path: "/anxietyhelper",
    category: "Bien-être & Mental",
    color: "from-pink-50 to-pink-500"
  },
  {
    title: "AstingSupport",
    description: "Accompagnement jeûne intermittent : protocoles, timer, suivi symptômes, sécurité",
    icon: Timer,
    path: "/astingsupport",
    category: "Bien-être & Mental",
    color: "from-indigo-50 to-indigo-700"
  },
  {
    title: "NutrientTracker",
    description: "Suivi micronutriments, évaluation carences, recommandations personnalisées",
    icon: Salad,
    path: "/nutrienttracker",
    category: "Bien-être & Mental",
    color: "from-lime-200 to-orange-50"
  },
];

export default function Index() {
  const [isDark, setIsDark] = useState(false);
  const [search, setSearch] = useState("");

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const filteredFeatures = useMemo(() => {
    if (!search) return features;
    const s = search.toLowerCase();
    return features.filter(
      (ft) =>
        ft.title.toLowerCase().includes(s) ||
        (ft.description && ft.description.toLowerCase().includes(s)) ||
        (ft.category && ft.category.toLowerCase().includes(s))
    );
  }, [search]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-100 dark:from-gray-900 dark:to-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-2 py-8">
        {/* Header Modernisé */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-3">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-1 tracking-tight drop-shadow-sm">
              NeuroFlow Suite
            </h1>
            <p className="text-lg text-gray-500 dark:text-gray-300 font-normal">
              Le compagnon neuroscience du mieux-être – Tout local, sans distraction
            </p>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full border-2 border-gray-200 dark:border-gray-700 shadow-sm"
            aria-label="Basculer thème"
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>

        {/* BARRE DE RECHERCHE */}
        <div className="flex justify-center mb-6 animate-fade-in">
          <Input
            type="text"
            placeholder="🔍 Rechercher un outil, une catégorie…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="rounded-xl bg-white/80 dark:bg-gray-800 px-4 py-3 shadow-md w-full max-w-xl focus:outline-none transition"
          />
        </div>

        {/* CARTES FONCTIONNALITÉS MODERNISÉES */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
          {filteredFeatures.map((feature, i) => {
            const IconComponent = feature.icon;
            return (
              <Link key={feature.path} to={feature.path}>
                <Card
                  className={`
                  group h-full cursor-pointer rounded-2xl transition 
                  bg-gradient-to-tl ${feature.color}
                  hover:shadow-2xl hover:-translate-y-0.5 
                  duration-200 hover-scale
                  border-0 shadow-md
                  animate-fade-in
                  `}
                  style={{
                    minHeight: '240px',
                  }}>
                  <CardHeader className="text-center flex flex-col items-center pb-2 pt-5">
                    <div className="
                      mx-auto rounded-full 
                      bg-white/80 dark:bg-gray-900/80 
                      border border-gray-200 dark:border-gray-800
                      shadow flex items-center justify-center
                      mb-2 w-16 h-16 sm:w-20 sm:h-20
                      transition group-hover:scale-105
                    ">
                      <IconComponent className="h-9 w-9 sm:h-12 sm:w-12 text-primary-600 dark:text-primary" />
                    </div>
                    <CardTitle className="text-lg mt-1 font-semibold">{feature.title}</CardTitle>
                    <CardDescription className="text-xs text-gray-600 dark:text-gray-400">{feature.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center pt-0">
                    <Button variant="outline" className="w-full rounded-xl shadow-sm hover:shadow group-hover:scale-[1.025] transition-all duration-150 text-[0.95em] py-2">
                      Découvrir
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
// ! Ce fichier dépasse 350 lignes : il faudra penser à refactorer en composants plus petits pour la maintenance et la lisibilité !

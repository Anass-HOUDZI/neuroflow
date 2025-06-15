import { useState, useMemo } from "react";
import HomeHeader from "@/components/home/HomeHeader";
import HomeSearchBar from "@/components/home/HomeSearchBar";
import FeatureCard from "@/components/home/FeatureCard";
import {
  Brain, Heart, Target, BookOpen, BarChart3, Calendar, Moon, Sun, FileText,
  Grid3X3, Wind, Trello, Brush, Palette, Pencil, PencilLine, Scissors, Text,
  TextCursor, Wand, Image, Calculator, Dumbbell, Droplet, HeartPulse, Smile,
  Flower, Scan, Apple, Timer, Salad, Leaf, Pill, Info, CheckCircle, Circle
} from "lucide-react";

const features = [
  {
    title: "StressScanner",
    description: "Analyseur stress physiologique : HRV, micro-expressions, biofeedback temps réel",
    icon: Scan,
    path: "/stressscanner",
    category: "Bien-être & Mental",
    color: "from-violet-400 via-fuchsia-300 to-pink-200" // plus vif
  },
  {
    title: "ZenPad",
    description: "Éditeur de texte sans distraction pour la créativité",
    icon: FileText,
    path: "/zenpad",
    category: "Productivité",
    color: "from-blue-400 via-sky-200 to-emerald-100"
  },
  {
    title: "HabitGrid",
    description: "Tracker d'habitudes bienveillant et visuel",
    icon: Grid3X3,
    path: "/habitgrid",
    category: "Bien-être & Mental",
    color: "from-green-400 via-lime-200 to-yellow-100"
  },
  {
    title: "MindfulBreath",
    description: "Techniques de respiration pour la régulation du stress",
    icon: Wind,
    path: "/mindfulbreath",
    category: "Bien-être & Mental",
    color: "from-cyan-400 via-sky-200 to-blue-100"
  },
  {
    title: "LocalBoard",
    description: "Kanban hors-ligne pour la gestion de projet",
    icon: Trello,
    path: "/localboard",
    category: "Productivité",
    color: "from-purple-600 via-indigo-400 to-pink-200"
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
        <HomeHeader isDark={isDark} toggleTheme={toggleTheme} />
        <HomeSearchBar search={search} setSearch={setSearch} />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
          {filteredFeatures.map((feature, i) => (
            <FeatureCard key={feature.path} feature={feature} />
          ))}
        </div>
      </div>
    </div>
  );
}
// ! Fichier refactoré. Reprendre la composition en sous-composants pour la maintenabilité !

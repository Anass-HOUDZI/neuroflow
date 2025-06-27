
import {
  Brain, Heart, Target, BookOpen, BarChart3, Calendar, Moon, FileText,
  Grid3X3, Wind, Trello, Wand, Smile, Scan, Apple, Flower, Calculator,
  Dumbbell, Droplet, HeartPulse, Timer, Salad
} from "lucide-react";

export interface Feature {
  title: string;
  description: string;
  icon: any;
  path: string;
  category: string;
  color: string;
}

export const features: Feature[] = [
  {
    title: "StressScanner",
    description: "Analyseur stress physiologique : HRV, micro-expressions, biofeedback temps réel",
    icon: Scan,
    path: "/stressscanner",
    category: "Bien-être & Mental",
    color: "from-violet-400 via-fuchsia-300 to-pink-200"
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
    color: "from-cyan-400 via-teal-300 to-emerald-200"
  },
  {
    title: "MindfulEating",
    description: "Alimentation consciente : signaux satiété, méditations alimentaires",
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
    description: "Auto-compassion basée Kristin Neff : techniques, lettres, méditations",
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
  {
    title: "SoundWeaver",
    description: "Studio audio simple, multi-pistes, effets, export",
    icon: Wand,
    path: "/soundweaver",
    category: "Créativité & Design",
    color: "from-blue-100 to-blue-50"
  },
  {
    title: "EmotionWheel",
    description: "Roue des émotions interactive : granularité, journal, régulation",
    icon: Smile,
    path: "/emotionwheel",
    category: "Bien-être & Mental",
    color: "from-fuchsia-300 via-rose-200 to-violet-200"
  },
  {
    title: "DataViz",
    description: "Visualisateur données, import CSV/JSON, graphiques interactifs",
    icon: BarChart3,
    path: "/dataviz",
    category: "Données & Analyse",
    color: "from-indigo-200 via-sky-200 to-blue-100"
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
  {
    title: "AnxietyHelper",
    description: "Assistant anti-anxiété basé CBT : questionnaire, techniques immédiates",
    icon: HeartPulse,
    path: "/anxietyhelper",
    category: "Bien-être & Mental",
    color: "from-pink-50 to-pink-500"
  },
  {
    title: "AstingSupport",
    description: "Accompagnement jeûne intermittent : protocoles, timer, suivi symptômes",
    icon: Timer,
    path: "/astingsupport",
    category: "Bien-être & Mental",
    color: "from-orange-200 via-pink-200 to-pink-100"
  },
  {
    title: "NutrientTracker",
    description: "Suivi micronutriments, évaluation carences, recommandations personnalisées",
    icon: Salad,
    path: "/nutrienttracker",
    category: "Bien-être & Mental",
    color: "from-lime-200 to-orange-50"
  }
];

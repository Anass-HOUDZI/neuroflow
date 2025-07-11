
import {
  Brain, Heart, Target, BookOpen, BarChart3, Calendar, Moon, FileText,
  Grid3X3, Wind, Trello, Wand, Smile, Scan, Apple, Flower, Calculator,
  Dumbbell, Droplet, HeartPulse, Timer, Salad
} from "lucide-react";

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: any;
  path: string;
  href: string;
  category: string;
  color: string;
  popular?: boolean;
  new?: boolean;
}

export const features: Feature[] = [
  {
    id: "stressscanner",
    title: "StressScanner",
    description: "Analyseur stress physiologique : HRV, micro-expressions, biofeedback temps réel",
    icon: Scan,
    path: "/stressscanner",
    href: "/stressscanner",
    category: "wellbeing",
    color: "from-violet-400 via-fuchsia-300 to-pink-200",
    popular: true
  },
  {
    id: "zenpad",
    title: "ZenPad",
    description: "Éditeur de texte sans distraction pour la créativité",
    icon: FileText,
    path: "/zenpad",
    href: "/zenpad",
    category: "productivity",
    color: "from-blue-400 via-sky-200 to-emerald-100"
  },
  {
    id: "habitgrid",
    title: "HabitGrid",
    description: "Tracker d'habitudes bienveillant et visuel",
    icon: Grid3X3,
    path: "/habitgrid",
    href: "/habitgrid",
    category: "wellbeing",
    color: "from-green-400 via-lime-200 to-yellow-100",
    new: true
  },
  {
    id: "mindfulbreath",
    title: "MindfulBreath",
    description: "Techniques de respiration pour la régulation du stress",
    icon: Wind,
    path: "/mindfulbreath",
    href: "/mindfulbreath",
    category: "wellbeing",
    color: "from-cyan-400 via-sky-200 to-blue-100"
  },
  {
    id: "localboard",
    title: "LocalBoard",
    description: "Kanban hors-ligne pour la gestion de projet",
    icon: Trello,
    path: "/localboard",
    href: "/localboard",
    category: "productivity",
    color: "from-cyan-400 via-teal-300 to-emerald-200"
  },
  {
    id: "mindfuleating",
    title: "MindfulEating",
    description: "Alimentation consciente : signaux satiété, méditations alimentaires",
    icon: Apple,
    path: "/mindfuleating",
    href: "/mindfuleating",
    category: "wellbeing",
    color: "from-green-200 to-orange-50"
  },
  {
    id: "gratitudegarden",
    title: "GratitudeGarden",
    description: "Jardin virtuel de gratitude : neuroplasticité positive quotidienne",
    icon: Flower,
    path: "/gratitudegarden",
    href: "/gratitudegarden",
    category: "wellbeing",
    color: "from-green-100 to-lime-50"
  },
  {
    id: "selfcompassion",
    title: "SelfCompassion",
    description: "Auto-compassion basée Kristin Neff : techniques, lettres, méditations",
    icon: Heart,
    path: "/selfcompassion",
    href: "/selfcompassion",
    category: "wellbeing",
    color: "from-rose-200 to-pink-50"
  },
  {
    id: "mood",
    title: "Mood Tracker",
    description: "Track your daily emotions and identify patterns",
    icon: Heart,
    path: "/mood",
    href: "/mood",
    category: "wellbeing",
    color: "from-pink-100 to-pink-50"
  },
  {
    id: "meditation",
    title: "Meditation",
    description: "Guided meditation sessions for mindfulness",
    icon: Brain,
    path: "/meditation",
    href: "/meditation",
    category: "wellbeing",
    color: "from-purple-100 to-purple-50"
  },
  {
    id: "journal",
    title: "Journal",
    description: "Write and reflect on your thoughts",
    icon: BookOpen,
    path: "/journal",
    href: "/journal",
    category: "productivity",
    color: "from-blue-100 to-blue-50"
  },
  {
    id: "goals",
    title: "Goals",
    description: "Set and track your wellness goals",
    icon: Target,
    path: "/goals",
    href: "/goals",
    category: "productivity",
    color: "from-green-100 to-green-50"
  },
  {
    id: "analytics",
    title: "Analytics",
    description: "View your progress and insights",
    icon: BarChart3,
    path: "/analytics",
    href: "/analytics",
    category: "data",
    color: "from-orange-100 to-orange-50"
  },
  {
    id: "calendar",
    title: "Calendar",
    description: "Schedule and manage wellness activities",
    icon: Calendar,
    path: "/calendar",
    href: "/calendar",
    category: "productivity",
    color: "from-indigo-100 to-indigo-50"
  },
  {
    id: "soundweaver",
    title: "SoundWeaver",
    description: "Studio audio simple, multi-pistes, effets, export",
    icon: Wand,
    path: "/soundweaver",
    href: "/soundweaver",
    category: "creativity",
    color: "from-blue-100 to-blue-50"
  },
  {
    id: "emotionwheel",
    title: "EmotionWheel",
    description: "Roue des émotions interactive : granularité, journal, régulation",
    icon: Smile,
    path: "/emotionwheel",
    href: "/emotionwheel",
    category: "wellbeing",
    color: "from-fuchsia-300 via-rose-200 to-violet-200"
  },
  {
    id: "dataviz",
    title: "DataViz",
    description: "Visualisateur données, import CSV/JSON, graphiques interactifs",
    icon: BarChart3,
    path: "/dataviz",
    href: "/dataviz",
    category: "data",
    color: "from-indigo-200 via-sky-200 to-blue-100"
  },
  {
    id: "statspro",
    title: "StatsPro",
    description: "Analyseur statistiques, tests hypothèses, corrélations, insights",
    icon: Calculator,
    path: "/statspro",
    href: "/statspro",
    category: "data",
    color: "from-emerald-100 to-emerald-50"
  },
  {
    id: "fitnesslog",
    title: "FitnessLog",
    description: "Journal d'entraînement simple : séances, durée, notes",
    icon: Dumbbell,
    path: "/fitnesslog",
    href: "/fitnesslog",
    category: "wellbeing",
    color: "from-lime-100 to-lime-50"
  },
  {
    id: "sleepanalyzer",
    title: "SleepAnalyzer",
    description: "Analyse du sommeil : horaires, qualité, notes, historique",
    icon: Moon,
    path: "/sleepanalyzer",
    href: "/sleepanalyzer",
    category: "wellbeing",
    color: "from-indigo-100 to-indigo-50"
  },
  {
    id: "hydro",
    title: "HydroReminder",
    description: "Journal d'eau journalière et rappels hydratation",
    icon: Droplet,
    path: "/hydro",
    href: "/hydro",
    category: "wellbeing",
    color: "from-sky-100 to-sky-50"
  },
  {
    id: "anxietyhelper",
    title: "AnxietyHelper",
    description: "Assistant anti-anxiété basé CBT : questionnaire, techniques immédiates",
    icon: HeartPulse,
    path: "/anxietyhelper",
    href: "/anxietyhelper",
    category: "wellbeing",
    color: "from-pink-50 to-pink-500"
  },
  {
    id: "astingsupport",
    title: "AstingSupport",
    description: "Accompagnement jeûne intermittent : protocoles, timer, suivi symptômes",
    icon: Timer,
    path: "/astingsupport",
    href: "/astingsupport",
    category: "wellbeing",
    color: "from-orange-200 via-pink-200 to-pink-100"
  },
  {
    id: "nutrienttracker",
    title: "NutrientTracker",
    description: "Suivi micronutriments, évaluation carences, recommandations personnalisées",
    icon: Salad,
    path: "/nutrienttracker",
    href: "/nutrienttracker",
    category: "wellbeing",
    color: "from-lime-200 to-orange-50"
  }
];

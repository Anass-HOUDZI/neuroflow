
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { 
  Menu, 
  Home, 
  Heart, 
  Info, 
  MessageCircle, 
  Settings, 
  Brain,
  Activity,
  Target,
  Calendar,
  BarChart3,
  Smile,
  Wind,
  BookOpen,
  CheckSquare,
  Clipboard,
  Music,
  PieChart,
  TrendingUp,
  Dumbbell,
  Moon,
  Droplets,
  Shield,
  Palette,
  Leaf,
  Zap,
  Heart as HeartIcon,
  Apple,
  Coffee,
  Utensils
} from "lucide-react";

const navigationItems = [
  {
    title: "Accueil",
    href: "/",
    icon: Home,
    category: "main"
  },
  {
    title: "Favoris",
    href: "/favorites",
    icon: Heart,
    category: "main"
  },
  {
    title: "À propos",
    href: "/about",
    icon: Info,
    category: "main"
  },
  {
    title: "Contact",
    href: "/contact",
    icon: MessageCircle,
    category: "main"
  },
  {
    title: "Paramètres",
    href: "/settings",
    icon: Settings,
    category: "main"
  },
  // Outils de productivité
  {
    title: "ZenPad",
    href: "/zenpad",
    icon: BookOpen,
    category: "productivity"
  },
  {
    title: "HabitGrid",
    href: "/habitgrid",
    icon: CheckSquare,
    category: "productivity"
  },
  {
    title: "LocalBoard",
    href: "/localboard",
    icon: Clipboard,
    category: "productivity"
  },
  {
    title: "Calendrier",
    href: "/calendar",
    icon: Calendar,
    category: "productivity"
  },
  {
    title: "Objectifs",
    href: "/goals",
    icon: Target,
    category: "productivity"
  },
  // Bien-être
  {
    title: "Suivi Humeur",
    href: "/mood",
    icon: Smile,
    category: "wellbeing"
  },
  {
    title: "Méditation",
    href: "/meditation",
    icon: Brain,
    category: "wellbeing"
  },
  {
    title: "Respiration",
    href: "/mindfulbreath",
    icon: Wind,
    category: "wellbeing"
  },
  {
    title: "Journal",
    href: "/journal",
    icon: BookOpen,
    category: "wellbeing"
  },
  {
    title: "Anxiété",
    href: "/anxietyhelper",
    icon: Shield,
    category: "wellbeing"
  },
  {
    title: "Émotions",
    href: "/emotionwheel",
    icon: Palette,
    category: "wellbeing"
  },
  {
    title: "Gratitude",
    href: "/gratitudegarden",
    icon: Leaf,
    category: "wellbeing"
  },
  {
    title: "Stress",
    href: "/stressscanner",
    icon: Zap,
    category: "wellbeing"
  },
  {
    title: "Auto-compassion",
    href: "/selfcompassion",
    icon: HeartIcon,
    category: "wellbeing"
  },
  {
    title: "Énergie",
    href: "/energybalance",
    icon: Activity,
    category: "wellbeing"
  },
  // Santé
  {
    title: "Fitness",
    href: "/fitnesslog",
    icon: Dumbbell,
    category: "health"
  },
  {
    title: "Sommeil",
    href: "/sleepanalyzer",
    icon: Moon,
    category: "health"
  },
  {
    title: "Hydratation",
    href: "/hydro",
    icon: Droplets,
    category: "health"
  },
  {
    title: "Nutrition",
    href: "/nutrienttracker",
    icon: Apple,
    category: "health"
  },
  {
    title: "Alimentation Consciente",
    href: "/mindfuleating",
    icon: Utensils,
    category: "health"
  },
  {
    title: "Jeûne",
    href: "/astingsupport",
    icon: Coffee,
    category: "health"
  },
  // Outils
  {
    title: "SoundWeaver",
    href: "/soundweaver",
    icon: Music,
    category: "tools"
  },
  {
    title: "DataViz",
    href: "/dataviz",
    icon: PieChart,
    category: "tools"
  },
  {
    title: "StatsPro",
    href: "/statspro",
    icon: TrendingUp,
    category: "tools"
  },
  {
    title: "Analytics",
    href: "/analytics",
    icon: BarChart3,
    category: "tools"
  }
];

const categories = {
  main: "Navigation",
  productivity: "Productivité",
  wellbeing: "Bien-être",
  health: "Santé",
  tools: "Outils"
};

export default function MainNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (href: string) => {
    return location.pathname === href;
  };

  const NavLink = ({ item, onClick }: { item: typeof navigationItems[0], onClick?: () => void }) => {
    const IconComponent = item.icon;
    return (
      <Link
        to={item.href}
        onClick={onClick}
        className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
          isActive(item.href)
            ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
            : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
        }`}
      >
        <IconComponent className="h-4 w-4" />
        <span className="text-sm font-medium">{item.title}</span>
      </Link>
    );
  };

  const groupedItems = navigationItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, typeof navigationItems>);

  return (
    <div className="flex items-center">
      {/* Navigation Desktop - cachée sur mobile */}
      <nav className="hidden md:flex items-center space-x-1">
        {navigationItems.filter(item => item.category === 'main').map((item) => {
          const IconComponent = item.icon;
          return (
            <Link
              key={item.href}
              to={item.href}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive(item.href)
                  ? "bg-blue-100/80 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                  : "hover:bg-white/60 dark:hover:bg-gray-800/60 text-gray-700 dark:text-gray-300"
              }`}
            >
              <IconComponent className="h-4 w-4" />
              {item.title}
            </Link>
          );
        })}
      </nav>

      {/* Menu Mobile */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-80 overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="text-left">Navigation</SheetTitle>
          </SheetHeader>
          <div className="mt-6 space-y-6">
            {Object.entries(groupedItems).map(([category, items]) => (
              <div key={category}>
                <h3 className="mb-3 text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {categories[category as keyof typeof categories]}
                </h3>
                <div className="space-y-1">
                  {items.map((item) => (
                    <NavLink 
                      key={item.href} 
                      item={item} 
                      onClick={() => setIsOpen(false)} 
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}


import { ChevronRight, Home } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const routeMap: Record<string, string> = {
  "/": "Accueil",
  "/mood-tracker": "Suivi Humeur",
  "/meditation": "Méditation", 
  "/mindful-breath": "Respiration",
  "/journal": "Journal",
  "/gratitude-garden": "Gratitude",
  "/fitness-log": "Fitness",
  "/sleep-analyzer": "Sommeil",
  "/hydro-reminder": "Hydratation",
  "/nutrient-tracker": "Nutrition",
  "/asting-support": "Jeûne",
  "/sound-weaver": "SoundWeaver",
  "/dataviz": "DataViz",
  "/stats-pro": "StatsPro",
  "/analytics": "Analytics",
  "/zen-pad": "ZenPad",
  "/habit-grid": "HabitGrid",
  "/local-board": "LocalBoard",
  "/calendar": "Calendrier",
  "/goals": "Objectifs",
  "/mind-flow": "MindFlow",
  "/anxiety-helper": "AnxietyHelper",
  "/emotion-wheel": "EmotionWheel",
  "/stress-scanner": "StressScanner",
  "/energy-balance": "Équilibre Énergétique"
};

export default function Breadcrumb() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <nav className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400 mb-6">
      <Link 
        to="/" 
        className="flex items-center hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
      >
        <Home className="h-4 w-4" />
      </Link>
      
      {pathnames.length > 0 && (
        <>
          <ChevronRight className="h-4 w-4" />
          {pathnames.map((name, index) => {
            const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
            const isLast = index === pathnames.length - 1;
            const displayName = routeMap[routeTo] || name.charAt(0).toUpperCase() + name.slice(1);

            return (
              <div key={name} className="flex items-center space-x-1">
                {isLast ? (
                  <span className="font-medium text-gray-900 dark:text-gray-100">
                    {displayName}
                  </span>
                ) : (
                  <>
                    <Link 
                      to={routeTo} 
                      className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      {displayName}
                    </Link>
                    <ChevronRight className="h-4 w-4" />
                  </>
                )}
              </div>
            );
          })}
        </>
      )}
    </nav>
  );
}


import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

const routeNames: Record<string, string> = {
  "/": "Accueil",
  "/about": "À propos",
  "/contact": "Contact",
  "/favorites": "Favoris",
  "/settings": "Paramètres",
  "/zenpad": "ZenPad",
  "/habitgrid": "HabitGrid",
  "/localboard": "LocalBoard",
  "/calendar": "Calendrier",
  "/goals": "Objectifs",
  "/mood": "Suivi Humeur",
  "/meditation": "Méditation",
  "/mindfulbreath": "Respiration",
  "/journal": "Journal",
  "/anxietyhelper": "Aide Anxiété",
  "/emotionwheel": "Roue Émotions",
  "/gratitudegarden": "Jardin Gratitude",
  "/stressscanner": "Scanner Stress",
  "/selfcompassion": "Auto-compassion",
  "/energybalance": "Équilibre Énergie",
  "/fitnesslog": "Journal Fitness",
  "/sleepanalyzer": "Analyse Sommeil",
  "/hydro": "Hydratation",
  "/nutrienttracker": "Suivi Nutritionnel",
  "/mindfuleating": "Alimentation Consciente",
  "/astingsupport": "Support Jeûne",
  "/soundweaver": "SoundWeaver",
  "/dataviz": "DataViz",
  "/statspro": "StatsPro",
  "/analytics": "Analytics"
};

export default function Breadcrumb() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  if (location.pathname === '/') {
    return null; // Pas de breadcrumb sur la page d'accueil
  }

  return (
    <nav className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400 mb-6">
      <Link
        to="/"
        className="flex items-center hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
      >
        <Home className="h-4 w-4" />
      </Link>
      
      {pathnames.map((value, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        const displayName = routeNames[routeTo] || value;

        return (
          <div key={routeTo} className="flex items-center space-x-1">
            <ChevronRight className="h-4 w-4" />
            {isLast ? (
              <span className="text-gray-800 dark:text-gray-200 font-medium">
                {displayName}
              </span>
            ) : (
              <Link
                to={routeTo}
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {displayName}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}

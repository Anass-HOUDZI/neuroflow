
import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

const routeNames: Record<string, string> = {
  "/": "Accueil",
  "/about": "À propos",
  "/contact": "Contact",
  "/favorites": "Favoris",
  "/settings": "Paramètres",
  
  // Productivité
  "/zenpad": "ZenPad",
  "/habitgrid": "HabitGrid",
  "/localboard": "LocalBoard",
  "/calendar": "Calendrier",
  "/goals": "Objectifs",
  "/journal": "Journal",
  
  // Bien-être
  "/mood": "Suivi Humeur",
  "/meditation": "Méditation",
  "/mindfulbreath": "Respiration",
  "/anxietyhelper": "Aide Anxiété",
  "/anxiety-helper": "Aide Anxiété",
  "/emotionwheel": "Roue Émotions",
  "/gratitudegarden": "Jardin Gratitude",
  "/stressscanner": "Scanner Stress",
  "/selfcompassion": "Auto-compassion",
  "/energybalance": "Équilibre Énergie",
  
  // Santé
  "/fitnesslog": "Journal Fitness",
  "/sleepanalyzer": "Analyse Sommeil",
  "/hydro": "Hydratation",
  "/hydro-reminder": "Hydratation",
  "/nutrienttracker": "Suivi Nutritionnel",
  "/mindfuleating": "Alimentation Consciente",
  "/astingsupport": "Support Jeûne",
  
  // Outils
  "/soundweaver": "SoundWeaver",
  "/dataviz": "DataViz",
  "/data-viz": "DataViz",
  "/statspro": "StatsPro",
  "/analytics": "Analytics",
  
  // Modules optimisés
  "/mood-tracker": "Suivi Humeur",
  "/mindful-breath": "Respiration",
  "/anxiety-helper": "Aide Anxiété",
  "/emotion-wheel": "Roue Émotions",
  "/gratitude-garden": "Jardin Gratitude",
  "/stress-scanner": "Scanner Stress",
  "/self-compassion": "Auto-compassion",
  "/energy-balance": "Équilibre Énergie",
  "/habit-grid": "HabitGrid",
  "/local-board": "LocalBoard",
  "/fitness-log": "Journal Fitness", 
  "/sleep-analyzer": "Analyse Sommeil",
  "/nutrient-tracker": "Suivi Nutritionnel",
  "/mindful-eating": "Alimentation Consciente",
  "/asting-support": "Support Jeûne",
  "/sound-weaver": "SoundWeaver",
  "/stats-pro": "StatsPro",
  "/technical-docs": "Documentation Technique",
  "/performance-tests": "Tests Performance"
};

export default function Breadcrumb() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  if (location.pathname === '/') {
    return null; // Pas de breadcrumb sur la page d'accueil
  }

  return (
    <nav className="flex items-center space-x-1 text-sm text-muted-foreground mb-6" aria-label="Breadcrumb">
      <Link
        to="/"
        className="flex items-center hover:text-primary transition-colors"
        aria-label="Retour à l'accueil"
      >
        <Home className="h-4 w-4" />
      </Link>
      
      {pathnames.map((value, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        const displayName = routeNames[routeTo] || value.charAt(0).toUpperCase() + value.slice(1);

        return (
          <div key={routeTo} className="flex items-center space-x-1">
            <ChevronRight className="h-4 w-4" />
            {isLast ? (
              <span className="text-foreground font-medium" aria-current="page">
                {displayName}
              </span>
            ) : (
              <Link
                to={routeTo}
                className="hover:text-primary transition-colors"
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

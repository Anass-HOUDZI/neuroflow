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
  "/habit-grid": "HabitGrid",
  "/localboard": "LocalBoard",
  "/local-board": "LocalBoard",
  "/calendar": "Calendrier",
  "/goals": "Objectifs",
  "/journal": "Journal",
  "/mindflow": "MindFlow",
  
  // Bien-être
  "/mood": "Suivi Humeur",
  "/mood-tracker": "Suivi Humeur",
  "/meditation": "Méditation",
  "/mindfulbreath": "Respiration",
  "/mindful-breath": "Respiration",
  "/anxietyhelper": "Aide Anxiété",
  "/anxiety-helper": "Aide Anxiété",
  "/emotionwheel": "Roue Émotions",
  "/emotion-wheel": "Roue Émotions",
  "/gratitudegarden": "Jardin Gratitude",
  "/gratitude-garden": "Jardin Gratitude",
  "/stressscanner": "Scanner Stress",
  "/stress-scanner": "Scanner Stress",
  "/selfcompassion": "Auto-compassion",
  "/self-compassion": "Auto-compassion",
  "/energybalance": "Équilibre Énergie",
  "/energy-balance": "Équilibre Énergie",
  
  // Santé
  "/fitnesslog": "Journal Fitness",
  "/fitness-log": "Journal Fitness", 
  "/sleepanalyzer": "Analyse Sommeil",
  "/sleep-analyzer": "Analyse Sommeil",
  "/hydro": "Hydratation",
  "/hydro-reminder": "Hydratation",
  "/nutrienttracker": "Suivi Nutritionnel",
  "/nutrient-tracker": "Suivi Nutritionnel",
  "/mindfuleating": "Alimentation Consciente",
  "/mindful-eating": "Alimentation Consciente",
  "/astingsupport": "Support Jeûne",
  "/asting-support": "Support Jeûne",
  
  // Créativité
  "/pixelcraft": "PixelCraft",
  "/colormaster": "ColorMaster",
  "/soundweaver": "SoundWeaver",
  "/sound-weaver": "SoundWeaver",
  
  // Apprentissage
  "/flashmaster": "FlashMaster",
  
  // Outils
  "/dataviz": "DataViz",
  "/data-viz": "DataViz",
  "/statspro": "StatsPro",
  "/stats-pro": "StatsPro",
  "/analytics": "Analytics",
  "/password-vault": "PasswordVault",
  "/qr-generator": "Générateur QR",
  
  // Documentation
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

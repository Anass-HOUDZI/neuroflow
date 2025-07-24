
import { Button } from "@/components/ui/button";
import { Moon, Sun, Heart, Settings, Info, Brain } from "lucide-react";
import { Link } from "react-router-dom";
import { memo } from "react";

interface HomeHeaderProps {
  isDark: boolean;
  toggleTheme: () => void;
}

// Memoize pour éviter les re-renders inutiles
export default memo<HomeHeaderProps>(function HomeHeader({ isDark, toggleTheme }) {
  return (
    <header className="flex items-center justify-between mb-8 sm:mb-12 px-4 sm:px-0">
      <div className="flex items-center gap-3">
        <img 
          src="/lovable-uploads/a0fbbb2d-6964-4c6c-9eed-fb534407abd8.png" 
          alt="NeuroFlow Logo" 
          className="h-8 sm:h-10 w-auto hover:scale-105 transition-transform duration-300"
        />
      </div>

      <nav className="flex items-center gap-1 sm:gap-2">
        <Button variant="ghost" size="icon" asChild className="h-8 w-8 sm:h-10 sm:w-10">
          <Link to="/about" aria-label="À propos">
            <Info className="h-3 w-3 sm:h-4 sm:w-4" />
          </Link>
        </Button>
        <Button variant="ghost" size="icon" asChild className="h-8 w-8 sm:h-10 sm:w-10">
          <Link to="/favorites" aria-label="Favoris">
            <Heart className="h-3 w-3 sm:h-4 sm:w-4" />
          </Link>
        </Button>
        <Button variant="ghost" size="icon" asChild className="h-8 w-8 sm:h-10 sm:w-10">
          <Link to="/settings" aria-label="Paramètres">
            <Settings className="h-3 w-3 sm:h-4 sm:w-4" />
          </Link>
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleTheme}
          aria-label={isDark ? "Mode clair" : "Mode sombre"}
          className="h-8 w-8 sm:h-10 sm:w-10"
        >
          {isDark ? <Sun className="h-3 w-3 sm:h-4 sm:w-4" /> : <Moon className="h-3 w-3 sm:h-4 sm:w-4" />}
        </Button>
      </nav>
    </header>
  );
});

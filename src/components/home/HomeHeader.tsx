
import { Button } from "@/components/ui/button";
import { Moon, Sun, Heart, Settings, Info } from "lucide-react";
import { Link } from "react-router-dom";

interface HomeHeaderProps {
  isDark: boolean;
  toggleTheme: () => void;
}

export default function HomeHeader({ isDark, toggleTheme }: HomeHeaderProps) {
  return (
    <header className="flex items-center justify-between mb-12">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-primary to-purple-600 rounded-xl flex items-center justify-center">
          <span className="text-white font-bold text-lg">N</span>
        </div>
        <div>
          <h1 className="text-2xl font-bold gradient-text">NeuroFlow Suite</h1>
          <p className="text-sm text-muted-foreground">Compagnon bien-être scientifique</p>
        </div>
      </div>

      <nav className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/about">
            <Info className="h-4 w-4" />
          </Link>
        </Button>
        <Button variant="ghost" size="icon" asChild>
          <Link to="/favorites">
            <Heart className="h-4 w-4" />
          </Link>
        </Button>
        <Button variant="ghost" size="icon" asChild>
          <Link to="/settings">
            <Settings className="h-4 w-4" />
          </Link>
        </Button>
        <Button variant="ghost" size="icon" onClick={toggleTheme}>
          {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>
      </nav>
    </header>
  );
}

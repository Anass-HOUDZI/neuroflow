
import { Button } from "@/components/ui/button";
import { Moon, Sun, Brain } from "lucide-react";
import MainNavigation from "@/components/navigation/MainNavigation";
import { Link } from "react-router-dom";

interface HomeHeaderProps {
  isDark: boolean;
  toggleTheme: () => void;
}

export default function HomeHeader({ isDark, toggleTheme }: HomeHeaderProps) {
  return (
    <header className="flex items-center justify-between mb-6 p-4 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
      {/* Logo/Titre */}
      <Link to="/" className="flex items-center gap-2 group">
        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-xl group-hover:scale-105 transition-transform">
          <Brain className="h-7 w-7 text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            NeuroFlow Suite
          </h1>
        </div>
      </Link>

      {/* Navigation */}
      <div className="flex items-center gap-4">
        <MainNavigation />
        
        {/* Toggle thème */}
        <Button
          onClick={toggleTheme}
          variant="ghost"
          size="icon"
          className="rounded-full"
        >
          {isDark ? (
            <Sun className="h-5 w-5 text-yellow-500" />
          ) : (
            <Moon className="h-5 w-5 text-blue-600" />
          )}
        </Button>
      </div>
    </header>
  );
}

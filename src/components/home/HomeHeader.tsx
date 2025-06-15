
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";

interface HomeHeaderProps {
  isDark: boolean;
  toggleTheme: () => void;
}

export default function HomeHeader({ isDark, toggleTheme }: HomeHeaderProps) {
  return (
    <header className="relative flex flex-col items-center w-full mb-0 animate-fade-in">
      {/* Bouton dark/light switch discret en haut à droite du bloc */}
      <Button
        variant="outline"
        size="icon"
        onClick={toggleTheme}
        className="absolute right-2 top-2 bg-white/60 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-700 shadow-sm rounded-full z-10"
        aria-label="Basculer thème"
      >
        {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      </Button>

      {/* Partie Hero */}
      <div className="flex flex-col items-center w-full pt-8 pb-3">
        <h1 className="text-5xl sm:text-6xl font-extrabold text-center leading-tight tracking-tight mb-3 select-none">
          <span className="text-gray-900 dark:text-white">Neuro</span>
          <span className="ml-1 text-blue-600 dark:text-blue-400">Flow Suite</span>
        </h1>
        <p className="text-xl sm:text-2xl text-center font-semibold text-gray-800 dark:text-gray-200 mb-1">
          Le compagnon neuroscience du mieux-être
        </p>
        <p className="text-base sm:text-lg text-center text-gray-600 dark:text-gray-300 mb-2">
          Tout local, sans distraction
        </p>
      </div>
    </header>
  );
}

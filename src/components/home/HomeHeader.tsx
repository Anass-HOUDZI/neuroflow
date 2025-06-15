
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";

interface HomeHeaderProps {
  isDark: boolean;
  toggleTheme: () => void;
}

export default function HomeHeader({ isDark, toggleTheme }: HomeHeaderProps) {
  return (
    <div className="flex flex-col items-center justify-center mb-8 mt-2 relative">
      <div className="bg-white/90 dark:bg-gray-900/80 rounded-3xl shadow-lg px-8 py-6 max-w-2xl w-full flex flex-col items-center animate-fade-in border border-gray-200 dark:border-gray-700">
        <h1 className="text-5xl sm:text-6xl font-bold text-center text-gray-900 dark:text-white tracking-tight drop-shadow-lg mb-3">
          NeuroFlow Suite
        </h1>
        <p className="text-xl sm:text-2xl text-center text-gray-600 dark:text-gray-300 font-medium leading-snug drop-shadow-sm">
          Le compagnon neuroscience du mieux-être&nbsp;–&nbsp;Tout local, sans distraction
        </p>
      </div>
      <Button
        variant="outline"
        size="icon"
        onClick={toggleTheme}
        className="rounded-full border-2 border-gray-200 dark:border-gray-700 shadow-sm absolute right-2 top-2"
        aria-label="Basculer thème"
      >
        {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      </Button>
    </div>
  );
}


import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";

interface HomeHeaderProps {
  isDark: boolean;
  toggleTheme: () => void;
}

export default function HomeHeader({ isDark, toggleTheme }: HomeHeaderProps) {
  return (
    <header
      className="
        relative flex flex-col items-center w-full mb-0 animate-fade-in
        rounded-3xl
        shadow-sm
        px-2 sm:px-4
        bg-transparent
      "
      style={{
        minHeight: "auto",
        marginTop: "24px",
        marginBottom: "26px",
        overflow: "hidden"
      }}
    >
      {/* Bouton dark/light switch discret en haut à droite du bloc */}
      <Button
        variant="outline"
        size="icon"
        onClick={toggleTheme}
        className="absolute right-3 top-3 bg-white/60 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-700 shadow-sm rounded-full z-10"
        aria-label="Basculer thème"
      >
        {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      </Button>

      <div className="flex flex-col items-center w-full pt-10 pb-5 sm:pt-14 sm:pb-7">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-center leading-tight tracking-tight mb-4 select-none text-gray-900 dark:text-white drop-shadow">
          Neuro
          <span className="ml-2 text-blue-600 dark:text-blue-400 drop-shadow">
            Flow Suite
          </span>
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl font-semibold text-center text-gray-800 dark:text-gray-200 mb-2">
          Le compagnon neuroscience du mieux-être
        </p>
        <p className="text-md sm:text-lg md:text-lg text-center text-gray-600 dark:text-gray-300 mt-1">
          Tout local, sans distraction
        </p>
      </div>
    </header>
  );
}

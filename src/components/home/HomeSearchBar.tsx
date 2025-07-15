
import { Input } from "@/components/ui/input";
import { Search, Sparkles } from "lucide-react";
import { useState } from "react";

interface HomeSearchBarProps {
  search: string;
  setSearch: (value: string) => void;
}

export default function HomeSearchBar({ search, setSearch }: HomeSearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="flex justify-center mb-12 sm:mb-16 relative px-4">
      {/* Background Glow */}
      <div className={`
        absolute inset-0 -m-4 rounded-3xl bg-gradient-to-r from-primary/20 to-purple-500/20 blur-xl
        transition-opacity duration-500 ${isFocused ? 'opacity-100' : 'opacity-0'}
      `} />
      
      <div className="relative w-full max-w-2xl">
        {/* Floating Icon - Properly Aligned */}
        <div className="absolute left-4 sm:left-6 top-1/2 transform -translate-y-1/2 z-10 flex items-center">
          <div className={`
            p-2 rounded-xl bg-gradient-to-br from-primary/20 to-purple-500/20 backdrop-blur-sm
            transition-all duration-300 ${isFocused ? 'scale-110 rotate-3' : ''}
          `}>
            <Search className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
          </div>
        </div>

        {/* Search Input */}
        <Input
          type="text"
          placeholder="Rechercher un outil, une catégorie, une fonction..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`
            h-14 sm:h-16 pl-16 sm:pl-20 pr-4 sm:pr-6 text-base sm:text-lg
            glass-card backdrop-blur-xl border-white/20
            rounded-3xl shadow-2xl
            placeholder:text-muted-foreground/60
            focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50
            transition-all duration-300
            ${isFocused ? 'scale-105 shadow-primary/10' : ''}
          `}
        />

        {/* Floating Suggestions */}
        {isFocused && !search && (
          <div className="absolute top-full left-0 right-0 mt-2 z-20">
            <div className="glass-card backdrop-blur-xl border-white/20 rounded-2xl p-4 shadow-2xl">
              <div className="flex items-center mb-2">
                <Sparkles className="h-4 w-4 text-primary mr-2" />
                <span className="text-sm font-medium text-muted-foreground">Suggestions populaires</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {['méditation', 'productivité', 'habitudes', 'journal', 'respiration'].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => setSearch(suggestion)}
                    className={`
                      px-3 py-1 text-sm rounded-full
                      bg-gradient-to-r from-primary/10 to-purple-500/10
                      border border-white/10 hover:border-white/20
                      text-foreground hover:text-primary
                      transition-all duration-200 hover:scale-105
                    `}
                  >
                    #{suggestion}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Shimmer Effect */}
        <div className={`
          absolute inset-0 rounded-3xl overflow-hidden pointer-events-none
          ${isFocused ? 'animate-shine' : ''}
        `} />
      </div>
    </div>
  );
}

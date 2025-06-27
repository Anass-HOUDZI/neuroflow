
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface HomeSearchBarProps {
  search: string;
  setSearch: (value: string) => void;
}

export default function HomeSearchBar({ search, setSearch }: HomeSearchBarProps) {
  return (
    <div className="flex justify-center mb-16 animate-fade-in">
      <div className="relative w-full max-w-xl">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <Input
          type="text"
          placeholder="Rechercher un outil, une catégorie…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            rounded-xl bg-white/80 dark:bg-gray-800/80 
            pl-12 pr-4 py-3 shadow-md w-full
            border border-gray-200 dark:border-gray-700
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
            transition-all duration-200
            backdrop-blur-sm
          "
        />
      </div>
    </div>
  );
}

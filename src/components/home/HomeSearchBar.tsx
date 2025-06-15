
import { Input } from "@/components/ui/input";

interface HomeSearchBarProps {
  search: string;
  setSearch: (v: string) => void;
}

export default function HomeSearchBar({ search, setSearch }: HomeSearchBarProps) {
  return (
    <div className="flex justify-center mb-10 animate-fade-in">
      <Input
        type="text"
        placeholder="🔍 Rechercher un outil, une catégorie…"
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="rounded-xl bg-white/80 dark:bg-gray-800 px-4 py-3 shadow-md w-full max-w-xl focus:outline-none transition"
      />
    </div>
  );
}

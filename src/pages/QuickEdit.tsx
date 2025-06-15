
import { Scissors } from "lucide-react";

export default function QuickEdit() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-teal-50 via-sky-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-xl px-4 py-12">
        <div className="flex flex-col items-center gap-4">
          <Scissors className="h-12 w-12 text-purple-500" />
          <h1 className="text-3xl font-bold">QuickEdit</h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 text-center">
            Retouchez vos photos facilement : filtres, recadrage, correction, compression et comparaison instantanée.
          </p>
          <span className="text-xs text-gray-500">
            (Prototype&nbsp;: fonctionnalités principales bientôt&nbsp;!)
          </span>
        </div>
      </div>
    </main>
  );
}

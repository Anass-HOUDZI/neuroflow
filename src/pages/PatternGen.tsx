
import { ColorPicker } from "lucide-react";

export default function PatternGen() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-50 via-lime-50 to-yellow-50 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-xl px-4 py-12">
        <div className="flex flex-col items-center gap-4">
          <ColorPicker className="h-12 w-12 text-lime-500" />
          <h1 className="text-3xl font-bold">PatternGen</h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 text-center">
            Génère des motifs : fractales, tessellations, animation, palettes, export seamless, inspiration nature.
          </p>
          <span className="text-xs text-gray-500">
            (Prototype&nbsp;: fonctionnalités principales bientôt&nbsp;!)
          </span>
        </div>
      </div>
    </main>
  );
}

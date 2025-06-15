
import { Pencil } from "lucide-react";

export default function VectorStudio() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-yellow-50 via-green-100 to-green-50 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-xl px-4 py-12">
        <div className="flex flex-col items-center gap-4">
          <Pencil className="h-12 w-12 text-green-600" />
          <h1 className="text-3xl font-bold">VectorStudio</h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 text-center">
            Éditeur SVG professionnel : courbes Bézier, layers, animation, export multi-formats, et plus.
          </p>
          <span className="text-xs text-gray-500">
            (Prototype&nbsp;: fonctionnalités principales bientôt&nbsp;!)
          </span>
        </div>
      </div>
    </main>
  );
}

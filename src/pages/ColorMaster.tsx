
import { Palette } from "lucide-react";

export default function ColorMaster() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-rose-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-xl px-4 py-12">
        <div className="flex flex-col items-center gap-4">
          <Palette className="h-12 w-12 text-orange-500" />
          <h1 className="text-3xl font-bold">ColorMaster</h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 text-center">
            Votre studio couleurs intuitif : roue chromatique, extraction, accessibilité, palettes thématiques, exports, et plus.
          </p>
          <span className="text-xs text-gray-500">
            (Prototype&nbsp;: fonctionnalités principales bientôt&nbsp;!)
          </span>
        </div>
      </div>
    </main>
  );
}

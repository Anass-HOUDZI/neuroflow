
import { Brush } from "lucide-react";

export default function PixelCraft() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-50 via-indigo-100 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-xl px-4 py-12">
        <div className="flex flex-col items-center gap-4">
          <Brush className="h-12 w-12 text-pink-500" />
          <h1 className="text-3xl font-bold">PixelCraft</h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 text-center">
            Créez du pixel art avec précision et liberté – outils professionnels, layers, animation, et plus.
          </p>
          <span className="text-xs text-gray-500">
            (Prototype&nbsp;: fonctionnalités principales bientôt&nbsp;!)
          </span>
        </div>
      </div>
    </main>
  );
}


import { Wand } from "lucide-react";

export default function SoundWeaver() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-emerald-50 via-cyan-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-xl px-4 py-12">
        <div className="flex flex-col items-center gap-4">
          <Wand className="h-12 w-12 text-blue-500" />
          <h1 className="text-3xl font-bold">SoundWeaver</h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 text-center">
            Éditez, mixez, enregistrez… Un studio audio simple pour la créativité sans limite.
          </p>
          <span className="text-xs text-gray-500">
            (Prototype&nbsp;: fonctionnalités principales bientôt&nbsp;!)
          </span>
        </div>
      </div>
    </main>
  );
}

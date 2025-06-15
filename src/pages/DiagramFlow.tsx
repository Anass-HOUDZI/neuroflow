
import { PencilLine } from "lucide-react";

export default function DiagramFlow() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-cyan-50 via-blue-50 to-lime-50 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-xl px-4 py-12">
        <div className="flex flex-col items-center gap-4">
          <PencilLine className="h-12 w-12 text-cyan-500" />
          <h1 className="text-3xl font-bold">DiagramFlow</h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 text-center">
            Construisez diagrammes, mind maps, templates professionnels, connecteurs magnétiques et export.
          </p>
          <span className="text-xs text-gray-500">
            (Prototype&nbsp;: fonctionnalités principales bientôt&nbsp;!)
          </span>
        </div>
      </div>
    </main>
  );
}

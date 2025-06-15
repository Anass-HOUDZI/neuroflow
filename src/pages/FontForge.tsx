
import { Text } from "lucide-react";

export default function FontForge() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 via-gray-200 to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-xl px-4 py-12">
        <div className="flex flex-col items-center gap-4">
          <Text className="h-12 w-12 text-gray-600" />
          <h1 className="text-3xl font-bold">FontForge</h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 text-center">
            Créez vos propres polices : glyphes, Béziers, import/export, aperçu et personnalisation typographique.
          </p>
          <span className="text-xs text-gray-500">
            (Prototype&nbsp;: fonctionnalités principales bientôt&nbsp;!)
          </span>
        </div>
      </div>
    </main>
  );
}

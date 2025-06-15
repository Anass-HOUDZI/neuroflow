
import { Image } from "lucide-react";

export default function LogoMaker() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 via-fuchsia-50 to-fuchsia-100 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-xl px-4 py-12">
        <div className="flex flex-col items-center gap-4">
          <Image className="h-12 w-12 text-fuchsia-500" />
          <h1 className="text-3xl font-bold">LogoMaker</h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 text-center">
            Génère ton logo simplement : bibliothèque symboles, composition, mock-ups et export professionnel.
          </p>
          <span className="text-xs text-gray-500">
            (Prototype&nbsp;: fonctionnalités principales bientôt&nbsp;!)
          </span>
        </div>
      </div>
    </main>
  );
}

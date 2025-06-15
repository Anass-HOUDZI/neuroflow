
import DiagramFlowCanvas from "@/components/diagram-flow/DiagramFlowCanvas";
import { PencilLine } from "lucide-react";

export default function DiagramFlow() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-cyan-50 via-blue-50 to-lime-50 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-5xl px-4 py-12">
        <div className="flex flex-col items-center gap-4 mb-4">
          <PencilLine className="h-12 w-12 text-cyan-500" />
          <h1 className="text-3xl font-bold">DiagramFlow</h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 text-center max-w-2xl">
            Créez des diagrammes et cartes mentales avec connexions magnétiques,
            glisser-déposer, familles de blocs, <b>export PNG</b> et templates.
            <br />
            Prototype interactif — bientôt : ajout de nouveaux blocs et export avancé !
          </p>
        </div>
        <DiagramFlowCanvas />
      </div>
    </main>
  );
}

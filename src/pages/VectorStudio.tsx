
import React from "react";
import { VectorToolbar } from "@/components/vector-studio/VectorToolbar";
import { VectorCanvas } from "@/components/vector-studio/VectorCanvas";
import { toast } from "sonner";

export default function VectorStudio() {
  const [paths, setPaths] = React.useState([
    // Path démo initial (optionnel)
  ]);
  const [tool, setTool] = React.useState<"pen" | "select">("pen");
  const [selectedId, setSelectedId] = React.useState<string | null>(null);

  // Grouper (démo: toast, pas de vraie fusion pts pour MVP)
  const onGroup = () => toast("Fonction Groupe (demo) – à venir !");
  // Gradient
  const onGradient = () => {
    if (!selectedId) {
      toast.warning("Sélectionne d'abord un objet.");
      return;
    }
    setPaths(ps =>
      ps.map(p => p.id === selectedId ? { ...p, gradient: true } : p)
    );
    toast.success("Dégradé appliqué !");
  };
  // Animation simple (change couleur)
  const onAnimate = () => {
    if (!selectedId) {
      toast.warning("Sélectionne d'abord un objet à animer.");
      return;
    }
    setPaths(ps =>
      ps.map(p =>
        p.id === selectedId
          ? { ...p, color: p.color === "#38bdf8" ? "#a21caf" : "#38bdf8" }
          : p
      )
    );
    toast("Animation : couleur changée !");
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-yellow-50 via-green-100 to-green-50 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="w-full max-w-3xl flex flex-col items-center gap-4">
        <h1 className="text-3xl font-bold">VectorStudio</h1>
        <div className="flex flex-col items-center">
          <VectorToolbar
            tool={tool}
            setTool={setTool}
            onGroup={onGroup}
            onGradient={onGradient}
            onAnimate={onAnimate}
          />
        </div>
        <div>
          <VectorCanvas
            paths={paths}
            setPaths={setPaths}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
            tool={tool}
          />
        </div>
        <div className="text-xs text-gray-500 pt-2 text-center">
          SVG Pro : courbes Bézier (Pen), sélection, gradient & animation couleur<br />
          <span className="italic">MVP : toutes vos œuvres restent locales</span>
        </div>
      </div>
    </main>
  );
}

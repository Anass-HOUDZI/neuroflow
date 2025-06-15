
import { Palette } from "lucide-react";
import React, { useState } from "react";
import PatternCanvas from "@/components/patterngen/PatternCanvas";
import PatternGenForm from "@/components/patterngen/PatternGenForm";

export default function PatternGen() {
  const [pattern, setPattern] = useState<"tessellation" | "fractal" | "nature">("tessellation");
  const [primaryColor, setPrimaryColor] = useState("#91e672");
  const [secondaryColor, setSecondaryColor] = useState("#e3ed5c");
  const [size, setSize] = useState(320);
  const [exportUrl, setExportUrl] = useState<string | null>(null);

  const handleExport = (dataUrl: string) => {
    setExportUrl(dataUrl);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-50 via-lime-50 to-yellow-50 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-xl px-4 py-10">
        <div className="flex flex-col items-center gap-4 mb-4">
          <Palette className="h-12 w-12 text-lime-500" />
          <h1 className="text-3xl font-bold">PatternGen</h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 text-center">
            Génère des motifs : fractales, tessellations, palette, export PNG — inspire-toi de la nature!
          </p>
        </div>
        <PatternGenForm
          pattern={pattern}
          setPattern={setPattern}
          primaryColor={primaryColor}
          setPrimaryColor={setPrimaryColor}
          secondaryColor={secondaryColor}
          setSecondaryColor={setSecondaryColor}
          size={size}
          setSize={setSize}
        />
        <div className="flex flex-col items-center gap-4 my-7">
          <PatternCanvas 
            pattern={pattern}
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
            size={size}
            onExport={handleExport}
          />
        </div>
        {exportUrl && (
          <div className="flex flex-col items-center gap-1">
            <a
              href={exportUrl}
              download="pattern.png"
              className="bg-lime-600 text-white font-bold py-2 px-4 rounded shadow hover:bg-lime-700 transition"
            >
              Télécharger le motif PNG
            </a>
            <span className="text-xs text-gray-500">(Click droit → Enregistrer sous si besoin)</span>
          </div>
        )}
        <footer className="text-xs text-center mt-8 text-gray-400">
          🧪 Prototype — les motifs évoluent, bientôt : SVG, repeats, import palette, plus !
        </footer>
      </div>
    </main>
  );
}


import React, { useState } from "react";
import GlyphEditor from "@/components/fontforge/GlyphEditor";
import GlyphList from "@/components/fontforge/GlyphList";
import FontPreview from "@/components/fontforge/FontPreview";
import FontExportBar from "@/components/fontforge/FontExportBar";
import { Text } from "lucide-react";

interface Glyph {
  char: string;
  path: string;
}

const BASE_GLYPHS = [
  { char: "A", path: "" },
  { char: "B", path: "" },
  { char: "C", path: "" }
];

export default function FontForge() {
  // Nom de la police
  const [fontName, setFontName] = useState("MaFont");
  // Tableau de glyphes {char, path}
  const [glyphs, setGlyphs] = useState<Glyph[]>([...BASE_GLYPHS]);
  // Glyphe sélectionné
  const [selChar, setSelChar] = useState(glyphs[0].char);
  // Texte d’aperçu
  const [preview, setPreview] = useState("ABC BAC");

  // Ajout glyphe personnalisé
  const handleAddGlyph = () => {
    const nextChar = prompt("Entrez un caractère unique (1 letter, e.g. D):");
    if (nextChar && nextChar.length === 1 && !glyphs.some(g => g.char === nextChar)) {
      setGlyphs([...glyphs, { char: nextChar, path: "" }]);
      setSelChar(nextChar);
    }
  };

  // Modifie un glyphe
  const handleGlyphChange = (char: string, path: string) => {
    setGlyphs(glyphs.map(g => g.char === char ? { ...g, path } : g));
  };

  // Supprime glyphe
  const handleDeleteGlyph = (char: string) => {
    let newGlyphs = glyphs.filter(g => g.char !== char);
    setGlyphs(newGlyphs);
    // Si on a supprimé le sélectionné, on essaie de focus un autre
    if (selChar === char && newGlyphs.length)
      setSelChar(newGlyphs[0].char);
  };

  return (
    <main className="min-h-screen flex flex-col items-center py-5 bg-gradient-to-br from-gray-50 via-gray-200 to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-3xl px-4 py-7 bg-white/80 rounded-xl shadow-lg border dark:bg-gray-900/70">
        <div className="flex items-center gap-3 mb-6">
          <Text className="h-10 w-10 text-purple-500" />
          <input
            type="text"
            value={fontName}
            onChange={e => setFontName(e.target.value)}
            className="text-2xl font-bold bg-transparent focus:outline-none border-b border-purple-300 focus:border-purple-600 px-2 py-1 flex-1"
            maxLength={18}
            spellCheck={false}
          />
          <button
            onClick={handleAddGlyph}
            className="ml-2 px-3 py-1 bg-purple-600 hover:bg-purple-700 transition text-white rounded font-semibold text-sm"
          >+ Glyphe</button>
        </div>
        <div className="flex gap-8 flex-wrap">
          <div className="flex flex-col gap-4 min-w-[120px] w-fit">
            <GlyphList
              glyphs={glyphs}
              onSelect={setSelChar}
              onDelete={handleDeleteGlyph}
              current={selChar}
            />
          </div>
          <div className="flex-1 flex flex-col gap-4">
            {glyphs.find(g => g.char === selChar) && (
              <GlyphEditor
                char={selChar}
                svgPath={glyphs.find(g => g.char === selChar)?.path || ""}
                onChange={p => handleGlyphChange(selChar, p)}
              />
            )}
            <label className="block font-semibold text-sm text-gray-600">
              Texte test :
              <input
                className="ml-2 border-b border-dashed shadow-none px-1 bg-transparent focus:outline-none"
                value={preview}
                onChange={e => setPreview(e.target.value)}
                maxLength={32}
              />
            </label>
            <FontPreview
              glyphs={glyphs}
              sample={preview}
            />
            <FontExportBar fontName={fontName} glyphs={glyphs} />
          </div>
        </div>
      </div>
      <div className="mt-4 text-xs text-gray-500 text-center max-w-2xl">Prototype créatif : dessinez des glyphes SVG, testez en live et exportez la fonte pour l’affiner ailleurs.</div>
    </main>
  );
}


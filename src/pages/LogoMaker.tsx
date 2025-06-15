
import { useRef, useState } from "react";
import { Image, Download } from "lucide-react";
import SymbolGallery from "@/components/logomaker/SymbolGallery";
import LogoCanvas from "@/components/logomaker/LogoCanvas";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function LogoMaker() {
  const [selectedSymbol, setSelectedSymbol] = useState<string>("Sparkles");
  const [symbolColor, setSymbolColor] = useState<string>("#db2777");
  const [text, setText] = useState<string>("MonLogo");
  const [textColor, setTextColor] = useState<string>("#1e293b");
  const [exportUrl, setExportUrl] = useState<string | null>(null);

  const handleExport = (blob: Blob) => {
    if (exportUrl) URL.revokeObjectURL(exportUrl);
    setExportUrl(URL.createObjectURL(blob));
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 via-fuchsia-50 to-fuchsia-100 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-2xl px-4 py-8">
        <div className="flex flex-col gap-2 items-center mb-6">
          <Image className="h-12 w-12 text-fuchsia-500" />
          <h1 className="text-3xl font-bold mb-0">LogoMaker</h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 text-center">
            Crée ton logo minimaliste à partir de symboles cohérents, choisis les couleurs, ajoute du texte, puis exporte en PNG.
          </p>
        </div>
        <section className="mb-4">
          <Label className="block mb-1 text-fuchsia-700">Symbole</Label>
          <SymbolGallery value={selectedSymbol} onSelect={setSelectedSymbol} />
        </section>
        <section className="mb-4 flex flex-wrap gap-2 items-end">
          <div>
            <Label htmlFor="symbolColor" className="mr-2">Couleur du symbole</Label>
            <Input id="symbolColor" type="color" value={symbolColor} onChange={e => setSymbolColor(e.target.value)} className="w-12 h-10 p-1" />
          </div>
          <div>
            <Label htmlFor="text" className="mr-2">Texte (optionnel)</Label>
            <Input id="text" value={text} placeholder="Nom de ton projet" maxLength={18} onChange={e => setText(e.target.value)} className="w-44" />
          </div>
          <div>
            <Label htmlFor="textColor" className="mr-2">Couleur du texte</Label>
            <Input id="textColor" type="color" value={textColor} onChange={e => setTextColor(e.target.value)} className="w-12 h-10 p-1" />
          </div>
        </section>
        <section className="mb-4 flex justify-center">
          <LogoCanvas
            symbol={selectedSymbol}
            color={symbolColor}
            text={text}
            textColor={textColor}
            onExport={handleExport}
          />
        </section>
        {exportUrl && (
          <div className="flex flex-col items-center mt-4">
            <a
              href={exportUrl}
              download="logo.png"
              className="flex items-center gap-2 bg-fuchsia-600 text-white px-4 py-2 rounded shadow hover:bg-fuchsia-700 transition-colors"
            >
              <Download className="w-5 h-5" /> Télécharger le PNG
            </a>
            <span className="text-xs text-gray-400 mt-0.5">(Clic droit → Enregistrer sous si le bouton ne démarre pas le téléchargement.)</span>
          </div>
        )}
        <footer className="text-xs text-center mt-8 text-gray-400">
          🚧 Prototype  : plus de fonctionnalités (mockups, templates, typographies…) bientôt !
        </footer>
      </div>
    </main>
  );
}

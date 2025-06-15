import { TextCursor } from "lucide-react";
import MemeCanvas from "@/components/mememaker/MemeCanvas";
import MemeForm from "@/components/mememaker/MemeForm";
import { useState } from "react";

export default function MemeMaker() {
  // States UI
  const [imageUrl, setImageUrl] = useState<string | null>("/public/photo-1526374965328-7f61d4dc18c5.jpg");
  const [topText, setTopText] = useState<string>("Quand Lovable code mon app");
  const [bottomText, setBottomText] = useState<string>("et ça marche du 1er coup");
  const [textColor, setTextColor] = useState<string>("#fff700");
  const [outline, setOutline] = useState<boolean>(true);
  const [exportUrl, setExportUrl] = useState<string | null>(null);

  const handleExport = (blob: Blob) => {
    if (exportUrl) URL.revokeObjectURL(exportUrl);
    setExportUrl(URL.createObjectURL(blob));
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-yellow-50 via-fuchsia-100 to-teal-50 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-xl px-4 py-8">
        <div className="flex flex-col items-center gap-4 mb-5">
          <svg width={48} height={48} viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="6" fill="#ffe600"/><text x="50%" y="64%" textAnchor="middle" alignmentBaseline="central" fontSize="1.8rem" fontFamily="Arial,Impact,sans-serif" fontWeight="bold" fill="#111">😹</text></svg>
          <h1 className="text-3xl font-bold">MemeMaker</h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 text-center">
            Crée des memes facilement : choisis une image ou un template, saisis le texte, installe ton style, exporte et partage ton chef-d’œuvre !
          </p>
        </div>
        <section className="mb-4">
          <MemeForm
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
            topText={topText}
            setTopText={setTopText}
            bottomText={bottomText}
            setBottomText={setBottomText}
            textColor={textColor}
            setTextColor={setTextColor}
            outline={outline}
            setOutline={setOutline}
          />
        </section>
        {imageUrl && (
          <section className="mb-4 flex justify-center">
            <MemeCanvas
              imageUrl={imageUrl}
              topText={topText}
              bottomText={bottomText}
              textColor={textColor}
              outline={outline}
              onExport={handleExport}
            />
          </section>
        )}
        {exportUrl && (
          <div className="flex flex-col items-center mt-2">
            <a
              href={exportUrl}
              download="mememaker.png"
              className="flex items-center gap-2 bg-yellow-600 text-white px-4 py-2 rounded shadow hover:bg-yellow-700 transition-colors"
            >
              Télécharger le meme PNG
            </a>
            <span className="text-xs text-gray-500 mt-0.5">(Clic droit → Enregistrer sous si le bouton ne fonctionne pas)</span>
          </div>
        )}
        <footer className="text-xs text-center mt-8 text-gray-400">
          🚧 Prototype — bientôt : ajout GIF, fontes, stickers, partage !
        </footer>
      </div>
    </main>
  );
}

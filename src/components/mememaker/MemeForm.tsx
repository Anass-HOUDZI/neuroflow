
import React, { useRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Des images de placeholder (context)
const PLACEHOLDERS = [
  {
    name: "Matrix Cat",
    url: "/public/photo-1526374965328-7f61d4dc18c5.jpg"
  },
  {
    name: "Woman Laptop",
    url: "/public/photo-1581091226825-a6a2a5aee158.jpg"
  },
  {
    name: "Coder Laptop",
    url: "/public/photo-1488590528505-98d2b5aba04b.jpg"
  },
];

type MemeFormProps = {
  imageUrl: string | null;
  setImageUrl: (u: string) => void;
  topText: string;
  setTopText: (v: string) => void;
  bottomText: string;
  setBottomText: (v: string) => void;
  textColor: string;
  setTextColor: (v: string) => void;
  outline: boolean;
  setOutline: (b: boolean) => void;
};

export default function MemeForm({
  imageUrl,
  setImageUrl,
  topText,
  setTopText,
  bottomText,
  setBottomText,
  textColor,
  setTextColor,
  outline,
  setOutline,
}: MemeFormProps) {
  const fileInput = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    setImageUrl(URL.createObjectURL(file));
  };

  return (
    <section className="w-full flex flex-col gap-4">
      {/* Images mémes prêtes */}
      <div>
        <Label className="mb-1">Template (choisis un modèle ou importe‑en un)</Label>
        <div className="flex flex-wrap gap-2">
          {PLACEHOLDERS.map((img) => (
            <button
              key={img.url}
              type="button"
              onClick={() => setImageUrl(img.url)}
              className={`rounded border-2 ${
                imageUrl === img.url
                  ? "border-yellow-500"
                  : "border-transparent"
              } overflow-hidden`}
              style={{ width: 58, height: 58 }}
              title={img.name}
            >
              <img src={img.url} alt={img.name} className="object-cover w-full h-full" />
            </button>
          ))}
          <button
            type="button"
            className="rounded border-2 border-dashed border-gray-400 flex items-center justify-center text-gray-600 hover:border-yellow-400 bg-gray-50"
            style={{ width: 58, height: 58 }}
            title="Importer image"
            onClick={() => fileInput.current?.click()}
            tabIndex={0}
          >
            <span className="text-2xl">+</span>
          </button>
          <input
            type="file"
            accept="image/*"
            ref={fileInput}
            onChange={e => {
              if (e.target.files && e.target.files[0]) handleFile(e.target.files[0]);
            }}
            className="hidden"
            tabIndex={-1}
          />
        </div>
      </div>
      {/* Texte haut et bas */}
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="flex-1">
          <Label htmlFor="topText">Texte haut</Label>
          <Input
            id="topText"
            value={topText}
            maxLength={48}
            onChange={e => setTopText(e.target.value)}
            placeholder="Texte en haut"
          />
        </div>
        <div className="flex-1">
          <Label htmlFor="bottomText">Texte bas</Label>
          <Input
            id="bottomText"
            value={bottomText}
            maxLength={48}
            onChange={e => setBottomText(e.target.value)}
            placeholder="Texte en bas"
          />
        </div>
      </div>
      {/* Options style */}
      <div className="flex items-center gap-4">
        <div>
          <Label htmlFor="colorPick">Couleur texte</Label>
          <Input
            id="colorPick"
            type="color"
            value={textColor}
            onChange={e => setTextColor(e.target.value)}
            className="w-10 h-8 ml-2 p-0"
            style={{ minWidth: 28, maxWidth: 44 }}
          />
        </div>
        <label className="flex items-center gap-1 ml-2 select-none text-gray-700 text-sm">
          <input
            type="checkbox"
            checked={outline}
            onChange={e => setOutline(e.target.checked)}
            className="accent-yellow-500"
          />
          Contour noir (style meme)
        </label>
      </div>
    </section>
  );
}

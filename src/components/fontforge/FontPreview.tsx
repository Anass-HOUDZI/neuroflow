
import React from "react";
interface Glyph {
  char: string;
  path: string;
}
interface FontPreviewProps {
  glyphs: Glyph[];
  sample: string;
}

const WIDTH = 80;
const HEIGHT = 80;

// Appelle cette fonction pour transformer les glyphs SVG en composant React dans le texte preview
function renderTextSvg(glyphs: Glyph[], text: string) {
  // Map caractères → glyphe
  const glyphMap = Object.fromEntries(glyphs.map(g=>[g.char,g.path]));
  return (
    <div className="flex gap-2 items-end flex-wrap">
      {[...text].map((c,i) => (
        <svg key={i} width={40} height={40} viewBox={`0 0 ${WIDTH} ${HEIGHT}`}>
          <rect x={0} y={0} width={WIDTH} height={HEIGHT} fill="#fff"/>
          {glyphMap[c] ? (
            <path d={glyphMap[c]} stroke="#111" strokeWidth={6} fill="none"/>
          ) : (
            <text x={WIDTH/2} y={WIDTH/2} alignmentBaseline="middle" textAnchor="middle" fontSize={40} fill="#bbb">{c}</text>
          )}
        </svg>
      ))}
    </div>
  );
}

const FontPreview: React.FC<FontPreviewProps> = ({ glyphs, sample }) => (
  <div>
    <div className="font-semibold mb-1 text-sm text-gray-600">Aperçu :</div>
    <div className="px-2 py-3 rounded bg-gray-50">{renderTextSvg(glyphs, sample)}</div>
  </div>
);

export default FontPreview;

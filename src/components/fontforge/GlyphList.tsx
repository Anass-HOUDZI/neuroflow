
import React from "react";

interface Glyph {
  char: string;
  path: string;
}
interface GlyphListProps {
  glyphs: Glyph[];
  onSelect: (char: string) => void;
  onDelete: (char: string) => void;
  current: string;
}

const GlyphList: React.FC<GlyphListProps> = ({ glyphs, onSelect, onDelete, current }) => (
  <div>
    <div className="font-semibold mb-1 text-sm text-gray-600">Glyphes :</div>
    <div className="flex flex-wrap gap-2">
      {glyphs.map(g => (
        <button
          key={g.char}
          className={`flex flex-col items-center p-2 rounded border transition bg-white hover:bg-purple-50 ${g.char === current ? "border-purple-400" : "border-gray-200"}`}
          onClick={() => onSelect(g.char)}
        >
          <svg width={32} height={32} viewBox="0 0 80 80">
            <rect x={0} y={0} width={80} height={80} fill="#fff"/>
            {g.path && <path d={g.path} stroke="#7c3aed" strokeWidth={4} fill="none"/>}
          </svg>
          <span className="text-xs">{g.char}</span>
          <button
            className="text-[11px] text-red-500 mt-1 hover:underline"
            type="button"
            tabIndex={-1}
            onClick={e => {
              e.stopPropagation();
              onDelete(g.char);
            }}
            aria-label="Supprimer"
          >
            ✕
          </button>
        </button>
      ))}
    </div>
  </div>
);

export default GlyphList;

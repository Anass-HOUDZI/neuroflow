
import React from "react";

interface PaletteProps {
  colors: string[];
  selected: string;
  onSelect: (color: string) => void;
}

export function Palette({ colors, selected, onSelect }: PaletteProps) {
  return (
    <div className="flex gap-2 mt-2 flex-wrap">
      {colors.map((color) => (
        <button
          key={color}
          className="w-7 h-7 rounded border-2 flex items-center justify-center"
          style={{
            background: color,
            borderColor: selected === color ? "#333" : "#ccc",
            outline: selected === color ? "2px solid #22d3ee" : undefined,
          }}
          aria-label={`Select color ${color}`}
          onClick={() => onSelect(color)}
          type="button"
        >
          {selected === color && (
            <span className="sr-only">Sélectionné</span>
          )}
        </button>
      ))}
    </div>
  );
}

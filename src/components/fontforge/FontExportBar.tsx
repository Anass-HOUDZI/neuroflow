
import React from "react";

interface Glyph {
  char: string;
  path: string;
}
interface Props {
  fontName: string;
  glyphs: Glyph[];
}

const FontExportBar: React.FC<Props> = ({ fontName, glyphs }) => {
  // Simple export JSON
  const handleExportJson = () => {
    const blob = new Blob([
      JSON.stringify({ fontName, glyphs }, null, 2)
    ], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    download(url, `${fontName || "fontforge"}-glyphs.json`);
  };

  // Prototype export SVG Font (1 glyphe → 1 svg in array)
  const handleExportSVG = () => {
    const parts = glyphs.map(g => 
      `<svg width="80" height="80" viewBox="0 0 80 80"><path d="${g.path}" stroke="#222" stroke-width="7" fill="none"/></svg>`
    );
    const blob = new Blob(
      [parts.join("\n")],
      { type: "image/svg+xml" }
    );
    const url = URL.createObjectURL(blob);
    download(url, `${fontName || "fontforge"}-glyphs.svg`);
  };

  function download(url: string, filename: string) {
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  return (
    <div className="flex gap-2 items-center mt-2">
      <button className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1.5 rounded text-sm font-semibold" onClick={handleExportJson}>
        Export JSON
      </button>
      <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-2 py-1.5 rounded text-sm" onClick={handleExportSVG}>
        Export SVG
      </button>
      <span className="text-xs text-gray-400 ml-2">(prototype)</span>
    </div>
  );
};

export default FontExportBar;

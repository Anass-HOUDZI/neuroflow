
import React, { useRef, useState } from "react";

interface GlyphEditorProps {
  char: string;
  svgPath: string;
  onChange: (path: string) => void;
}

const WIDTH = 80;
const HEIGHT = 80;

const GlyphEditor: React.FC<GlyphEditorProps> = ({ char, svgPath, onChange }) => {
  const [drawing, setDrawing] = useState(false);
  const [path, setPath] = useState(svgPath);
  const svgRef = useRef<SVGSVGElement>(null);

  // Démarre le dessin
  const handlePointerDown = (e: React.PointerEvent) => {
    const rect = svgRef.current!.getBoundingClientRect();
    const x = ((e.clientX - rect.left) * WIDTH) / rect.width;
    const y = ((e.clientY - rect.top) * HEIGHT) / rect.height;
    setDrawing(true);
    setPath(prev => prev + (prev ? " " : "") + `M${x.toFixed(1)},${y.toFixed(1)}`);
  };

  // Suit la souris/tactile
  const handlePointerMove = (e: React.PointerEvent) => {
    if (!drawing) return;
    const rect = svgRef.current!.getBoundingClientRect();
    const x = ((e.clientX - rect.left) * WIDTH) / rect.width;
    const y = ((e.clientY - rect.top) * HEIGHT) / rect.height;
    setPath(prev => prev + ` L${x.toFixed(1)},${y.toFixed(1)}`);
  };

  // Fin du dessin
  const handlePointerUp = () => {
    setDrawing(false);
    onChange(path);
  };

  // Reset
  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPath("");
    onChange("");
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-1">
        <span className="text-2xl font-bold border rounded px-2 bg-gray-100">{char}</span>
        <button className="text-xs bg-gray-200 rounded px-1 py-0.5 hover:bg-gray-300" onClick={handleReset} type="button">Réinit.</button>
      </div>
      <svg
        ref={svgRef}
        width={WIDTH}
        height={HEIGHT}
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="border bg-white rounded shadow cursor-crosshair"
        style={{ touchAction: "none" }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        <rect x={0} y={0} width={WIDTH} height={HEIGHT} fill="#fff" />
        {path && <path d={path} stroke="#333" strokeWidth={2.5} fill="none" />}
      </svg>
    </div>
  );
};

export default GlyphEditor;


import React from "react";

type Point = { x: number; y: number; };
type Path = {
  id: string;
  points: Point[];
  color: string;
  gradient?: boolean;
};

interface VectorCanvasProps {
  paths: Path[];
  setPaths: React.Dispatch<React.SetStateAction<Path[]>>;
  selectedId: string | null;
  setSelectedId: (id: string | null) => void;
  tool: "pen" | "select";
}

function getSvgPath(points: Point[]) {
  if (!points.length) return "";
  const [start, ...rest] = points;
  let pathStr = `M ${start.x} ${start.y}`;
  if (rest.length === 1) {
    pathStr += ` L ${rest[0].x} ${rest[0].y}`;
  } else if (rest.length === 2) {
    pathStr += ` Q ${rest[0].x} ${rest[0].y}, ${rest[1].x} ${rest[1].y}`;
  } else if (rest.length === 3) {
    pathStr += ` C ${rest[0].x} ${rest[0].y}, ${rest[1].x} ${rest[1].y}, ${rest[2].x} ${rest[2].y}`;
  } else {
    for (const pt of rest) {
      pathStr += ` L ${pt.x} ${pt.y}`;
    }
  }
  return pathStr;
}

export function VectorCanvas({ paths, setPaths, selectedId, setSelectedId, tool }: VectorCanvasProps) {
  const [drawing, setDrawing] = React.useState<Point[]>([]);
  const svgRef = React.useRef<SVGSVGElement | null>(null);

  // Dessiner une nouvelle courbe
  function handleSvgClick(e: React.MouseEvent) {
    if (tool === "pen") {
      const rect = svgRef.current!.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setDrawing(drawing => [...drawing, { x, y }]);
    }
  }
  
  // Terminer le dessin (2 points = ligne, 3 = quad, 4 = bézier cubique)
  function handleSvgDoubleClick() {
    if (tool === "pen" && drawing.length >= 2) {
      setPaths([
        ...paths,
        {
          id: String(Date.now()),
          points: drawing,
          color: "#38bdf8",
        },
      ]);
      setDrawing([]);
    }
  }

  // Sélection & déplacement simple (centroïde du path)
  function handlePathClick(id: string) {
    if (tool === "select") setSelectedId(id);
  }

  function handleDragMove(e: React.MouseEvent) {
    if (tool !== "select" || !selectedId) return;
    if (!(e.buttons & 1)) return;
    const rect = svgRef.current!.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setPaths(ps =>
      ps.map(path =>
        path.id === selectedId
          ? {
              ...path,
              points: path.points.map(pt => ({ x: pt.x + 2, y: pt.y + 2 })),
            }
          : path
      )
    );
  }

  return (
    <div className="rounded-lg bg-white border shadow-md overflow-auto max-w-full">
      <svg
        ref={svgRef}
        width={480}
        height={360}
        viewBox="0 0 480 360"
        className="bg-gray-50 block"
        style={{ cursor: tool === "pen" ? "crosshair" : tool === "select" ? "pointer" : "default" }}
        onClick={handleSvgClick}
        onDoubleClick={handleSvgDoubleClick}
        onMouseMove={handleDragMove}
        tabIndex={0}
      >
        <defs>
          <linearGradient id="demo-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#a21caf" />
            <stop offset="100%" stopColor="#38bdf8" />
          </linearGradient>
        </defs>
        {/* Déjà dessinés */}
        {paths.map((path) => (
          <path
            key={path.id}
            d={getSvgPath(path.points)}
            stroke={path.gradient ? "url(#demo-gradient)" : path.color}
            strokeWidth={selectedId === path.id ? 5 : 3}
            fill="none"
            opacity={selectedId === path.id ? 1 : 0.85}
            onClick={(e) => {
              e.stopPropagation();
              handlePathClick(path.id);
            }}
            style={{ transition: "stroke 0.5s" }}
          />
        ))}
        {/* Courbe en cours de dessin */}
        {drawing.length >= 2 && (
          <path
            d={getSvgPath(drawing)}
            stroke="#6366f1"
            strokeDasharray="4 2"
            strokeWidth={2}
            fill="none"
          />
        )}
        {/* Points du dessin en cours */}
        {drawing.map((pt, idx) => (
          <circle key={idx} cx={pt.x} cy={pt.y} r={4} fill="#6366f1" />
        ))}
      </svg>
      <div className="text-xs p-1 text-gray-500">
        Double-clique pour terminer la courbe. Outil Sélection : clique & drag pour déplacer (démo simplifiée).
      </div>
    </div>
  );
}

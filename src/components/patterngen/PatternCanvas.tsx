
import React, { useRef } from "react";

type PatternType = "tessellation" | "fractal" | "nature";

type PatternCanvasProps = {
  pattern: PatternType;
  primaryColor: string;
  secondaryColor: string;
  size: number; // px
  onExport: (dataUrl: string) => void;
};

export default function PatternCanvas({
  pattern,
  primaryColor,
  secondaryColor,
  size,
  onExport,
}: PatternCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Redraw pattern on prop change
  React.useEffect(() => {
    drawPattern();
  }, [pattern, primaryColor, secondaryColor, size]);

  const drawPattern = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, size, size);

    if (pattern === "tessellation") {
      // Simple hexagonal tessellation
      const hexSize = size / 7;
      const rows = 7, cols = 7;
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          drawHex(ctx, 
            x * hexSize * 0.86 + ((y % 2) * hexSize * 0.43),
            y * hexSize * 0.75,
            hexSize * 0.45,
            (x + y) % 2 === 0 ? primaryColor : secondaryColor
          );
        }
      }
    } else if (pattern === "fractal") {
      // Minimal tree fractal
      drawFractal(ctx, size/2, size-10, size/6, -Math.PI/2, 8, primaryColor, secondaryColor);
    } else if (pattern === "nature") {
      // Motif type "graine de tournesol"
      const steps = 220;
      const g = (Math.sqrt(5) + 1) / 2;
      for (let i = 0; i < steps; i++) {
        let angle = 2 * Math.PI * i / (g * g);
        let r = Math.sqrt(i / steps) * (size/2.4);
        ctx.beginPath();
        ctx.arc(
          size/2 + r * Math.cos(angle),
          size/2 + r * Math.sin(angle),
          8*(1 - i/steps),
          0, 2*Math.PI
        );
        ctx.fillStyle = i%2 === 0 ? primaryColor : secondaryColor;
        ctx.globalAlpha = 0.73;
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    }
  };

  function drawHex(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number, color: string) {
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const theta = Math.PI / 3 * i;
      ctx.lineTo(cx + r * Math.cos(theta), cy + r * Math.sin(theta));
    }
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
    ctx.strokeStyle = "#DDD";
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  function drawFractal(ctx: CanvasRenderingContext2D, x: number, y: number, len: number, angle: number, depth: number, color1: string, color2: string) {
    if (depth === 0) return;
    const x2 = x + len * Math.cos(angle);
    const y2 = y + len * Math.sin(angle);

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = depth % 2 === 0 ? color1 : color2;
    ctx.lineWidth = depth + 0.7;
    ctx.stroke();

    drawFractal(ctx, x2, y2, len * 0.73, angle - Math.PI / 6, depth - 1, color1, color2);
    drawFractal(ctx, x2, y2, len * 0.73, angle + Math.PI / 6, depth - 1, color1, color2);
  }

  // Export pattern as dataURL PNG
  const handleExport = () => {
    if (!canvasRef.current) return;
    const dataUrl = canvasRef.current.toDataURL("image/png");
    onExport(dataUrl);
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <canvas
        ref={canvasRef}
        width={size}
        height={size}
        className="rounded-lg border shadow bg-white dark:bg-gray-950"
      />
      <button
        className="mt-1 px-4 py-2 bg-lime-500 text-white rounded font-bold shadow hover:bg-lime-600 transition"
        onClick={handleExport}
        type="button"
      >
        Exporter en PNG
      </button>
    </div>
  );
}

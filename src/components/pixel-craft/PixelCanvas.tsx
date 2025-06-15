
import React, { useRef } from "react";

export type Tool = "pencil" | "eraser" | "eyedropper";

export interface PixelCanvasProps {
  pixels: string[][];
  setPixels: (pixels: string[][]) => void;
  width: number;
  height: number;
  pixelSize: number;
  tool: Tool;
  selectedColor: string;
  grid: boolean;
  zoom: number;
  history: string[][][];
  setHistory: (h: string[][][]) => void;
  future: string[][][];
  setFuture: (f: string[][][]) => void;
  onPickColor: (color: string) => void;
}

function deepCopy(pixels: string[][]) {
  return pixels.map(row => [...row]);
}

export function PixelCanvas({
  pixels,
  setPixels,
  width,
  height,
  pixelSize,
  tool,
  selectedColor,
  grid,
  zoom,
  history,
  setHistory,
  future,
  setFuture,
  onPickColor,
}: PixelCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseDown = useRef(false);

  const drawPixel = (x: number, y: number, color: string) => {
    if (pixels[y][x] === color) return;
    const newPixels = deepCopy(pixels);
    newPixels[y][x] = color;
    setHistory([...history, deepCopy(pixels)]);
    setFuture([]);
    setPixels(newPixels);
  };

  const handlePointer = (e: React.MouseEvent | React.TouchEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    let clientX = 0, clientY = 0;
    if ("touches" in e) {
      if (e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      }
    } else {
      clientX = e.nativeEvent.offsetX + (rect?.left ?? 0);
      clientY = e.nativeEvent.offsetY + (rect?.top ?? 0);
    }
    if (!rect) return;
    const size = pixelSize * zoom;
    const x = Math.floor((clientX - rect.left) / size);
    const y = Math.floor((clientY - rect.top) / size);
    if (x < 0 || y < 0 || x >= width || y >= height) return;

    if (tool === "pencil") {
      drawPixel(x, y, selectedColor);
    } else if (tool === "eraser") {
      drawPixel(x, y, "#ffffff");
    } else if (tool === "eyedropper") {
      onPickColor(pixels[y][x]);
    }
  };

  // Undo and redo handled in parent, just visual render here
  React.useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    // Pixels
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        ctx.fillStyle = pixels[y][x];
        ctx.fillRect(
          x * pixelSize * zoom,
          y * pixelSize * zoom,
          pixelSize * zoom,
          pixelSize * zoom
        );
      }
    }
    // Grille
    if (grid) {
      ctx.strokeStyle = "#bbb8";
      ctx.lineWidth = 1;
      for (let x = 0; x <= width; x++) {
        ctx.beginPath();
        ctx.moveTo(x * pixelSize * zoom, 0);
        ctx.lineTo(x * pixelSize * zoom, height * pixelSize * zoom);
        ctx.stroke();
      }
      for (let y = 0; y <= height; y++) {
        ctx.beginPath();
        ctx.moveTo(0, y * pixelSize * zoom);
        ctx.lineTo(width * pixelSize * zoom, y * pixelSize * zoom);
        ctx.stroke();
      }
    }
  }, [pixels, grid, zoom, pixelSize, width, height]);

  return (
    <canvas
      ref={canvasRef}
      width={width * pixelSize * zoom}
      height={height * pixelSize * zoom}
      className="border border-neutral-200 rounded bg-white select-none touch-none"
      style={{ imageRendering: "pixelated", width: width * pixelSize * zoom, height: height * pixelSize * zoom, cursor: (tool==="pencil"?"crosshair":"pointer") }}
      onMouseDown={e => { mouseDown.current = true; handlePointer(e); }}
      onMouseUp={() => { mouseDown.current = false; }}
      onMouseLeave={() => { mouseDown.current = false; }}
      onMouseMove={e => { if (mouseDown.current) handlePointer(e); }}
      onClick={e => handlePointer(e)}
      onTouchStart={e => { mouseDown.current = true; handlePointer(e); }}
      onTouchEnd={() => { mouseDown.current = false; }}
      onTouchMove={e => { if (mouseDown.current) handlePointer(e); }}
    />
  );
}

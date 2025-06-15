
import React from "react";
import { Palette } from "@/components/pixel-craft/Palette";
import { Toolbar } from "@/components/pixel-craft/Toolbar";
import { PixelCanvas, Tool } from "@/components/pixel-craft/PixelCanvas";
import { toast } from "sonner";

const DEFAULT_COLORS = [
  "#262626", "#ffffff", "#e11d48", "#a3e635", "#38bdf8",
  "#fbbf24", "#f97316", "#a21caf", "#0ea5e9",
  "#facc15", "#14b8a6", "#6d28d9"
];
const WIDTH = 32;
const HEIGHT = 32;
const PIXELSIZE = 1;

export default function PixelCraft() {
  const [pixels, setPixels] = React.useState<string[][]>(
    Array(HEIGHT)
      .fill(null)
      .map(() => Array(WIDTH).fill("#ffffff"))
  );
  const [tool, setTool] = React.useState<Tool>("pencil");
  const [color, setColor] = React.useState<string>(DEFAULT_COLORS[0]);
  const [showGrid, setShowGrid] = React.useState(true);
  const [zoom, setZoom] = React.useState(16); // px per "pixel"
  const [history, setHistory] = React.useState<string[][][]>([]);
  const [future, setFuture] = React.useState<string[][][]>([]);

  // Undo / redo
  const undo = () => {
    if (!history.length) return;
    setFuture([pixels, ...future]);
    setPixels(history[history.length - 1]);
    setHistory(history.slice(0, -1));
  };
  const redo = () => {
    if (!future.length) return;
    setHistory([...history, pixels]);
    setPixels(future[0]);
    setFuture(future.slice(1));
  };

  // Export PNG
  const exportPNG = () => {
    const canvas = document.createElement("canvas");
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    for (let y = 0; y < HEIGHT; y++) {
      for (let x = 0; x < WIDTH; x++) {
        ctx.fillStyle = pixels[y][x];
        ctx.fillRect(x, y, 1, 1);
      }
    }
    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "pixelcraft.png";
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      toast.success("Image PNG exportée !");
    }, "image/png");
  };

  // Palette pipette
  const handlePickColor = (picked: string) => {
    setColor(picked);
    setTool("pencil");
  };

  return (
    <main className="min-h-screen flex flex-col items-center bg-gradient-to-br from-pink-50 via-indigo-100 to-indigo-50 dark:from-gray-900 dark:to-gray-800 pt-8">
      <div className="w-full max-w-2xl flex flex-col items-center gap-4">
        <div className="flex flex-col items-center gap-2">
          <Palette
            colors={DEFAULT_COLORS}
            selected={color}
            onSelect={(c) => setColor(c)}
          />
          <Toolbar
            tool={tool}
            setTool={setTool}
            onUndo={undo}
            onRedo={redo}
            onExport={exportPNG}
            onToggleGrid={() => setShowGrid((v) => !v)}
            gridEnabled={showGrid}
            onZoomIn={() => setZoom((z) => Math.min(z + 4, 40))}
            onZoomOut={() => setZoom((z) => Math.max(z - 4, 4))}
            zoom={zoom}
          />
        </div>
        <div className="p-3 rounded bg-white shadow-md flex flex-col items-center border border-gray-200">
          <PixelCanvas
            pixels={pixels}
            setPixels={setPixels}
            width={WIDTH}
            height={HEIGHT}
            pixelSize={PIXELSIZE}
            tool={tool}
            selectedColor={color}
            grid={showGrid}
            zoom={zoom}
            history={history}
            setHistory={setHistory}
            future={future}
            setFuture={setFuture}
            onPickColor={handlePickColor}
          />
        </div>
        <div className="text-xs text-gray-500 pt-2">
          <span>PixelCraft – Éditeur&nbsp;Pixel Art. Prototype MVP, toutes vos œuvres restent locales.</span>
        </div>
      </div>
    </main>
  );
}

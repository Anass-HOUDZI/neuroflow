
import { Pencil, Eraser, Pipette, Undo2, Redo, Download, Grid3X3, ZoomIn, ZoomOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import React from "react";

type Tool = "pencil" | "eraser" | "eyedropper";

interface ToolbarProps {
  tool: Tool;
  setTool: (tool: Tool) => void;
  onUndo: () => void;
  onRedo: () => void;
  onExport: () => void;
  onToggleGrid: () => void;
  gridEnabled: boolean;
  onZoomIn: () => void;
  onZoomOut: () => void;
  zoom: number;
}

export function Toolbar({
  tool, setTool, onUndo, onRedo, onExport, onToggleGrid, gridEnabled,
  onZoomIn, onZoomOut, zoom,
}: ToolbarProps) {
  return (
    <div className="flex gap-2 items-center flex-wrap">
      <Button
        variant={tool === "pencil" ? "default" : "outline"}
        size="icon"
        aria-label="Outil crayon"
        onClick={() => setTool("pencil")}
      >
        <Pencil />
      </Button>
      <Button
        variant={tool === "eraser" ? "default" : "outline"}
        size="icon"
        aria-label="Gomme"
        onClick={() => setTool("eraser")}
      >
        <Eraser />
      </Button>
      <Button
        variant={tool === "eyedropper" ? "default" : "outline"}
        size="icon"
        aria-label="Pipette"
        onClick={() => setTool("eyedropper")}
      >
        <Pipette />
      </Button>
      <span className="w-2" />
      <Button variant="outline" size="icon" aria-label="Undo" onClick={onUndo}>
        <Undo2 />
      </Button>
      <Button variant="outline" size="icon" aria-label="Redo" onClick={onRedo}>
        <Redo />
      </Button>
      <span className="w-2" />
      <Button
        variant={gridEnabled ? "default" : "outline"}
        size="icon"
        aria-label="Grille"
        onClick={onToggleGrid}
      >
        <Grid3X3 />
      </Button>
      <Button variant="outline" size="icon" aria-label="Zoom -" onClick={onZoomOut}>
        <ZoomOut />
      </Button>
      <span className="text-xs">{zoom}x</span>
      <Button variant="outline" size="icon" aria-label="Zoom +" onClick={onZoomIn}>
        <ZoomIn />
      </Button>
      <span className="w-2" />
      <Button variant="outline" size="icon" aria-label="Exporter" onClick={onExport}>
        <Download />
      </Button>
    </div>
  );
}

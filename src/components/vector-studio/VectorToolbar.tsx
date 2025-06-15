
import React from "react";
import { Pencil, Palette, Group, Play, MousePointer2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type Tool = "pen" | "select";
interface VectorToolbarProps {
  tool: Tool;
  setTool: (tool: Tool) => void;
  onGroup: () => void;
  onGradient: () => void;
  onAnimate: () => void;
}

export function VectorToolbar({ tool, setTool, onGroup, onGradient, onAnimate }: VectorToolbarProps) {
  return (
    <div className="flex gap-2 items-center flex-wrap">
      <Button
        variant={tool === "pen" ? "default" : "outline"}
        size="icon"
        aria-label="Outil courbe Bézier"
        onClick={() => setTool("pen")}
      >
        <Pencil />
      </Button>
      <Button
        variant={tool === "select" ? "default" : "outline"}
        size="icon"
        aria-label="Sélection"
        onClick={() => setTool("select")}
      >
        <MousePointer2 />
      </Button>
      <Button
        variant="outline"
        size="icon"
        aria-label="Grouper"
        onClick={onGroup}
      >
        <Group />
      </Button>
      <Button
        variant="outline"
        size="icon"
        aria-label="Gradient"
        onClick={onGradient}
      >
        <Palette />
      </Button>
      <Button
        variant="outline"
        size="icon"
        aria-label="Animer"
        onClick={onAnimate}
      >
        <Play />
      </Button>
    </div>
  );
}

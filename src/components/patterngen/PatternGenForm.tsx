
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

type PatternType = "tessellation" | "fractal" | "nature";

type PatternGenFormProps = {
  pattern: PatternType;
  setPattern: (p: PatternType) => void;
  primaryColor: string;
  setPrimaryColor: (c: string) => void;
  secondaryColor: string;
  setSecondaryColor: (c: string) => void;
  size: number;
  setSize: (s: number) => void;
};

export default function PatternGenForm({
  pattern,
  setPattern,
  primaryColor,
  setPrimaryColor,
  secondaryColor,
  setSecondaryColor,
  size,
  setSize,
}: PatternGenFormProps) {
  return (
    <form className="flex flex-col md:flex-row gap-4 items-center justify-center mt-2">
      <div className="flex flex-col gap-1 items-center">
        <Label>Motif</Label>
        <select
          value={pattern}
          onChange={e => setPattern(e.target.value as PatternType)}
          className="rounded border border-gray-200 px-3 py-2 bg-white dark:bg-gray-900"
        >
          <option value="tessellation">Tessellation</option>
          <option value="fractal">Fractale</option>
          <option value="nature">Nature</option>
        </select>
      </div>
      <div className="flex flex-col gap-1 items-center">
        <Label>Couleur principale</Label>
        <Input
          type="color"
          value={primaryColor}
          onChange={e => setPrimaryColor(e.target.value)}
          className="w-10 h-10 p-0 border-2 border-lime-400"
          title="Couleur principale"
        />
      </div>
      <div className="flex flex-col gap-1 items-center">
        <Label>Couleur secondaire</Label>
        <Input
          type="color"
          value={secondaryColor}
          onChange={e => setSecondaryColor(e.target.value)}
          className="w-10 h-10 p-0 border-2 border-yellow-400"
          title="Couleur secondaire"
        />
      </div>
      <div className="flex flex-col gap-1 items-center">
        <Label>Taille</Label>
        <Input
          type="range"
          min={240}
          max={480}
          step={20}
          value={size}
          onChange={e => setSize(Number(e.target.value))}
          className="w-24"
        />
        <span className="text-xs text-gray-500">{size} px</span>
      </div>
    </form>
  );
}

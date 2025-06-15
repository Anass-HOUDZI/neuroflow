
import React from "react";
import { Button } from "@/components/ui/button";
import { Crop, RotateCcw, SlidersHorizontal, Image, Download, Undo2, Upload } from "lucide-react";

const SLIDERS = [
  { key: "brightness", min: 0, max: 200, step: 1, label: "Luminosité", icon: SlidersHorizontal },
  { key: "contrast", min: 0, max: 200, step: 1, label: "Contraste", icon: SlidersHorizontal },
  { key: "saturate", min: 0, max: 200, step: 1, label: "Saturation", icon: SlidersHorizontal },
  { key: "grayscale", min: 0, max: 100, step: 1, label: "Gris", icon: SlidersHorizontal },
  { key: "sepia", min: 0, max: 100, step: 1, label: "Sépia", icon: SlidersHorizontal },
  { key: "invert", min: 0, max: 100, step: 1, label: "Inverser", icon: SlidersHorizontal },
  { key: "hueRotate", min: 0, max: 360, step: 1, label: "Teinte", icon: SlidersHorizontal },
  { key: "blur", min: 0, max: 10, step: 0.1, label: "Flou", icon: SlidersHorizontal },
];

const EditorToolbar = ({
  filters,
  setFilters,
  onReset,
  onExport,
  onUpload,
  disabled,
}: {
  filters: any;
  setFilters: (cb: (prev: any) => any) => void;
  onReset: () => void;
  onExport: () => void;
  onUpload: () => void;
  disabled: boolean;
}) => {
  return (
    <div className="flex flex-col gap-4 bg-white/80 dark:bg-gray-900/60 rounded-xl shadow p-6">
      <div className="flex flex-wrap gap-3 items-center">
        <Button size="sm" variant="outline" onClick={onUpload} disabled={disabled}>
          <Upload className="mr-1" /> Nouvelle image
        </Button>
        <Button size="sm" variant="outline" onClick={onReset} disabled={disabled}>
          <Undo2 className="mr-1" /> Réinitialiser
        </Button>
        <Button size="sm" variant="default" onClick={onExport} disabled={disabled}>
          <Download className="mr-1" /> Exporter
        </Button>
      </div>
      <div className="flex flex-wrap gap-6 mt-3">
        {SLIDERS.map(s => (
          <div className="flex flex-col items-center" key={s.key}>
            <span className="text-xs text-gray-600">{s.label}</span>
            <input
              type="range"
              min={s.min}
              max={s.max}
              step={s.step}
              value={filters[s.key]}
              onChange={e => setFilters((prev: any) => ({ ...prev, [s.key]: e.target.valueAsNumber }))}
              className="w-28 accent-purple-500"
              disabled={disabled}
            />
            <span className="text-xs text-purple-700">{filters[s.key]}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EditorToolbar;

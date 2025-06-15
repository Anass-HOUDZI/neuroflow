
import React, { useState } from "react";
import { Button } from "@/components/ui/button";

const ExportModal = ({
  open,
  onClose,
  onExport,
  loading,
}: {
  open: boolean;
  onClose: () => void;
  onExport: (format: "png" | "jpg", quality?: number) => void;
  loading: boolean;
}) => {
  const [format, setFormat] = useState<"png" | "jpg">("png");
  const [quality, setQuality] = useState(0.9);

  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/30 z-40 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-900 p-7 rounded-xl shadow-md max-w-xs w-full flex flex-col gap-4">
        <h2 className="font-bold text-lg mb-2">Exporter l’image</h2>
        <div className="flex flex-col gap-2">
          <label>
            Format :
            <select value={format} onChange={e => setFormat(e.target.value as any)} className="ml-2 border rounded px-1 py-0.5">
              <option value="png">PNG (sans perte)</option>
              <option value="jpg">JPG (compressé)</option>
            </select>
          </label>
          {format === "jpg" && (
            <label>
              Qualité JPG :
              <input
                type="range"
                min={0.1}
                max={1}
                step={0.01}
                value={quality}
                onChange={e => setQuality(Number(e.target.value))}
                className="ml-2"
                style={{ verticalAlign: "middle", width: "60px" }}
                disabled={loading}
              />
              <span className="ml-2">{Math.round(quality * 100)}%</span>
            </label>
          )}
        </div>
        <div className="flex gap-2 mt-2">
          <Button size="sm" variant="default" onClick={() => onExport(format, quality)} disabled={loading}>
            {loading ? "Chargement..." : "Télécharger"}
          </Button>
          <Button size="sm" variant="outline" onClick={onClose} disabled={loading}>
            Annuler
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExportModal;

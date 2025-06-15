
import React, { useRef, useState, useEffect } from "react";
import EditorToolbar from "./EditorToolbar";
import PhotoPreview from "./PhotoPreview";
import ExportModal from "./ExportModal";
import { applyFiltersToCanvas, getCroppedImageBlob } from "./utils";

// État initial des filtres
const defaultFilters = {
  brightness: 100,
  contrast: 100,
  saturate: 100,
  grayscale: 0,
  sepia: 0,
  blur: 0,
  invert: 0,
  hueRotate: 0,
};

const PhotoEditor = () => {
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const [filters, setFilters] = useState({ ...defaultFilters });
  const [crop, setCrop] = useState<null | { x: number; y: number; w: number; h: number }>(null);
  const [showExport, setShowExport] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Charge auto l’image si sauvegardée
  useEffect(() => {
    const saved = window.localStorage.getItem("quickedit-img");
    if (saved) setImgUrl(saved);
  }, []);
  useEffect(() => {
    if (imgUrl) window.localStorage.setItem("quickedit-img", imgUrl);
  }, [imgUrl]);

  // Reset tout
  const handleReset = () => {
    setFilters({ ...defaultFilters });
    setCrop(null);
  };

  // Gestion upload drag&drop
  const handleFile = (file: File) => {
    const url = URL.createObjectURL(file);
    setImgUrl(url);
    setFilters({ ...defaultFilters });
    setCrop(null);
  };

  const handleImageDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  // --- Pour l’export/dl ---
  async function handleExport(format: "png" | "jpg", compression = 0.92) {
    if (!imgUrl) return;
    setLoading(true);
    const preview = document.getElementById("quickedit-preview") as HTMLImageElement | null;
    if (!preview) return setLoading(false);

    let blob: Blob | null = null;
    try {
      blob = await getCroppedImageBlob({
        imageUrl: imgUrl,
        filters,
        crop,
        format,
        quality: compression,
      });
    } catch (e) {
      alert("Erreur export: " + e);
    }
    setLoading(false);
    if (blob) {
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `quickedit_${Date.now()}.${format === "jpg" ? "jpg" : "png"}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  }

  // UI upload zone si pas d’image
  if (!imgUrl) {
    return (
      <div
        className="flex flex-col items-center justify-center h-80 rounded-lg border-2 border-dashed border-purple-300 bg-white/60 dark:bg-gray-900/40 p-8 cursor-pointer transition hover:bg-purple-100/60"
        onClick={() => inputRef.current?.click()}
        onDrop={handleImageDrop}
        onDragOver={e => e.preventDefault()}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={e => {
            if (e.target.files && e.target.files[0]) handleFile(e.target.files[0]);
          }}
        />
        <span className="text-3xl mb-4 text-purple-500">🖼️</span>
        <p className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
          Glisse une image ou clique pour importer
        </p>
        <p className="text-sm text-gray-500">Formats supportés : jpg, png, webp</p>
      </div>
    );
  }

  // Éditeur principal
  return (
    <div className="flex flex-col gap-8">
      <PhotoPreview
        imgUrl={imgUrl}
        filters={filters}
        crop={crop}
        setCrop={setCrop}
      />
      <EditorToolbar
        filters={filters}
        setFilters={setFilters}
        onReset={handleReset}
        onExport={() => setShowExport(true)}
        onUpload={() => setImgUrl(null)}
        disabled={loading}
      />
      <ExportModal
        open={showExport}
        onClose={() => setShowExport(false)}
        onExport={handleExport}
        loading={loading}
      />
    </div>
  );
};

export default PhotoEditor;

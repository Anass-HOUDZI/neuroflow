
import React, { useRef, useState } from "react";

function getFilterString(filters: any) {
  return `
    brightness(${filters.brightness}%)
    contrast(${filters.contrast}%)
    saturate(${filters.saturate}%)
    grayscale(${filters.grayscale}%)
    sepia(${filters.sepia}%)
    invert(${filters.invert}%)
    blur(${filters.blur}px)
    hue-rotate(${filters.hueRotate}deg)
  `.replace(/\s+/g, " ");
}

const CROP_MIN_SIZE = 40;

const PhotoPreview = ({
  imgUrl,
  filters,
  crop,
  setCrop,
}: {
  imgUrl: string;
  filters: any;
  crop: any;
  setCrop: (crop: any) => void;
}) => {
  const [showCrop, setShowCrop] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);
  const [drag, setDrag] = useState<null | { x: number; y: number }> (null);

  // Début crop par drag
  function handleMouseDown(e: React.MouseEvent) {
    if (!previewRef.current) return;
    const rect = previewRef.current.getBoundingClientRect();
    const x = Math.max(0, e.clientX - rect.left);
    const y = Math.max(0, e.clientY - rect.top);
    setCrop({ x, y, w: 0, h: 0 });
    setDrag({ x, y });
    setShowCrop(true);
  }
  // Resize crop
  function handleMouseMove(e: React.MouseEvent) {
    if (!drag || !crop || !previewRef.current) return;
    const rect = previewRef.current.getBoundingClientRect();
    const w = Math.max(CROP_MIN_SIZE, Math.abs(e.clientX - rect.left - drag.x));
    const h = Math.max(CROP_MIN_SIZE, Math.abs(e.clientY - rect.top - drag.y));
    setCrop({
      x: Math.min(drag.x, e.clientX - rect.left),
      y: Math.min(drag.y, e.clientY - rect.top),
      w, h,
    });
  }
  function handleMouseUp() {
    setDrag(null);
  }

  // reset crop
  function handleClearCrop() {
    setCrop(null);
    setShowCrop(false);
  }

  return (
    <div className="relative flex flex-col items-center max-w-full mx-auto">
      <div
        ref={previewRef}
        className="relative border-4 border-purple-100 rounded shadow-md overflow-hidden w-full max-w-2xl bg-black cursor-crosshair"
        style={{ aspectRatio: "4 / 3", minHeight: 240, maxHeight: 480 }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {/* Image avec filtres */}
        <img
          key={imgUrl}
          id="quickedit-preview"
          src={imgUrl}
          alt="Aperçu"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            filter: getFilterString(filters),
            userSelect: "none",
            pointerEvents: drag ? "none" : "auto",
          }}
          draggable={false}
        />
        {/* Rectangle crop */}
        {crop && (
          <div
            className="absolute border-2 border-blue-500 bg-blue-300/10 pointer-events-none"
            style={{
              left: crop.x,
              top: crop.y,
              width: crop.w,
              height: crop.h,
            }}
          />
        )}
      </div>
      <div className="flex gap-3 mt-2">
        <button
          className="px-3 py-1 rounded text-xs bg-purple-200 text-purple-800 shadow hover:bg-purple-300"
          onClick={() => setShowCrop(!showCrop)}
          type="button"
        >
          {crop ? "✂ Modifier recadrage" : "✂ Recadrer"}
        </button>
        {crop && (
          <button
            className="px-3 py-1 rounded text-xs bg-gray-200 text-gray-800 shadow hover:bg-gray-300"
            onClick={handleClearCrop}
            type="button"
          >
            Annuler recadrage
          </button>
        )}
      </div>
    </div>
  );
};

export default PhotoPreview;

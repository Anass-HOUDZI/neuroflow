
import React, { useRef } from "react";

type MemeCanvasProps = {
  imageUrl: string;
  topText: string;
  bottomText: string;
  textColor: string;
  outline: boolean;
  onExport: (blob: Blob) => void;
};

export default function MemeCanvas({
  imageUrl,
  topText,
  bottomText,
  textColor,
  outline,
  onExport,
}: MemeCanvasProps) {
  const ref = useRef<HTMLDivElement>(null);

  // Export via html2canvas
  const handleExport = async () => {
    if (!ref.current) return;
    const html2canvas = (await import("html2canvas")).default;
    const blob = await html2canvas(ref.current, {
      backgroundColor: "#fff",
      useCORS: true,
      width: 480,
      height: 480,
      scale: 2,
    }).then((canvas) =>
      new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/png"))
    );
    if (blob) onExport(blob);
  };

  // Style texte impact meme
  const getTextStyle = () => ({
    color: textColor,
    textShadow: outline
      ? "2px 2px 0 #000, -2px 2px 0 #000, 2px -2px 0 #000, -2px -2px 0 #000, 0 2px 0 #000, 2px 0 0 #000, 0 -2px 0 #000, -2px 0 0 #000"
      : "none",
    fontFamily:
      "Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif",
    fontWeight: "bold",
    fontSize: "2.1rem",
    letterSpacing: "2px",
    textTransform: "uppercase",
    textAlign: "center" as const,
    width: "100%",
    WebkitUserSelect: "none",
    userSelect: "none" as const,
    padding: "0.25em 0.5em",
    lineHeight: 1.1,
  });

  return (
    <div className="flex flex-col items-center gap-2 w-full">
      <div
        ref={ref}
        className="relative aspect-square w-full max-w-xs bg-gray-100 rounded-lg overflow-hidden border border-fuchsia-200 shadow"
        style={{ width: 340, height: 340 }}
        tabIndex={-1}
      >
        {/* Image du meme */}
        <img
          src={imageUrl}
          alt="Meme"
          className="object-contain w-full h-full select-none pointer-events-none"
          draggable={false}
        />
        {/* Top text */}
        {topText && (
          <div
            className="absolute left-0 right-0 top-0 px-2 pt-2 z-10"
            style={getTextStyle()}
          >
            {topText}
          </div>
        )}
        {/* Bottom text */}
        {bottomText && (
          <div
            className="absolute left-0 right-0 bottom-0 px-2 pb-2 z-10"
            style={getTextStyle()}
          >
            {bottomText}
          </div>
        )}
      </div>
      <button
        className="mt-2 bg-yellow-500 text-white font-bold px-4 py-2 rounded hover:bg-yellow-600 transition-colors"
        type="button"
        onClick={handleExport}
      >
        Exporter mon meme (PNG)
      </button>
    </div>
  );
}

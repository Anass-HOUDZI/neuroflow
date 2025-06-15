
import React, { useRef } from "react";
import * as LucideIcons from "lucide-react";

type LogoCanvasProps = {
  symbol: string;
  color: string;
  text: string;
  textColor: string;
  showMockup?: boolean;
  onExport: (blob: Blob) => void;
};

export default function LogoCanvas({
  symbol,
  color,
  text,
  textColor,
  showMockup = false,
  onExport
}: LogoCanvasProps) {
  const canvasRef = useRef<HTMLDivElement>(null);

  // HTML to PNG export
  const handleExport = async () => {
    if (!canvasRef.current) return;
    const html2canvas = (await import("html2canvas")).default;
    const el = canvasRef.current;
    const blob = await html2canvas(el, {
      backgroundColor: "#fff",
      useCORS: true,
      width: 340,
      height: 340,
      scale: 2
    }).then((canvas) =>
      new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/png"))
    );
    if (blob) onExport(blob);
  };

  const Icon = (LucideIcons as any)[symbol] || LucideIcons['Image'];
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        ref={canvasRef}
        className="w-[340px] h-[340px] rounded-xl bg-white flex flex-col items-center justify-center shadow-lg relative overflow-hidden border border-fuchsia-300"
        style={{ userSelect: "none" }}
        tabIndex={-1}
      >
        <Icon className="w-28 h-28 mb-2" style={{ color }} />
        {text ? (
          <span className="block font-bold text-3xl mt-2"
            style={{ color: textColor, fontFamily: "inherit"}}>
            {text}
          </span>
        ) : null}
      </div>
      <button
        type="button"
        className="mt-2 bg-fuchsia-500 text-white font-bold px-4 py-2 rounded hover:bg-fuchsia-600 transition-colors"
        onClick={handleExport}
      >
        Export PNG
      </button>
      {showMockup && (
        <div className="mt-4 text-xs text-gray-400">[Preview sur fond simulé à venir]</div>
      )}
    </div>
  );
}

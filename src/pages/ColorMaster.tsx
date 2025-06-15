
import { useRef, useState } from "react";
import { Palette } from "lucide-react";
import { Button } from "@/components/ui/button";

function hslToHex(h: number, s: number, l: number): string {
  l /= 100;
  s /= 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) =>
    l - a * Math.max(-1, Math.min(Math.min(k(n) - 3, 9 - k(n)), 1));
  return (
    "#" +
    [f(0), f(8), f(4)]
      .map((x) =>
        Math.round(255 * x)
          .toString(16)
          .padStart(2, "0")
      )
      .join("")
  );
}
function hslToRgb(h: number, s: number, l: number) {
  s /= 100;
  l /= 100;
  let c = (1 - Math.abs(2 * l - 1)) * s;
  let x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  let m = l - c / 2;
  let r = 0, g = 0, b = 0;
  if (0 <= h && h < 60) [r, g, b] = [c, x, 0];
  else if (60 <= h && h < 120) [r, g, b] = [x, c, 0];
  else if (120 <= h && h < 180) [r, g, b] = [0, c, x];
  else if (180 <= h && h < 240) [r, g, b] = [0, x, c];
  else if (240 <= h && h < 300) [r, g, b] = [x, 0, c];
  else if (300 <= h && h < 360) [r, g, b] = [c, 0, x];
  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);
  return { r, g, b };
}

function pad(num: number) {
  return num.toString().padStart(2, '0');
}

function rgbToString({ r, g, b }: { r: number; g: number; b: number }) {
  return `rgb(${r}, ${g}, ${b})`;
}

function hslToString(h: number, s: number, l: number) {
  return `hsl(${Math.round(h)}, ${Math.round(s)}%, ${Math.round(l)}%)`;
}

// Affiche une roue HSL. Sur clic/drag, change la teinte (h) et la saturation (s). Lumi, à 50% constante pour MVP.
function ColorWheel({
  color,
  setColor,
}: {
  color: { h: number; s: number; l: number };
  setColor: (c: { h: number; s: number; l: number }) => void;
}) {
  const svgRef = useRef<SVGSVGElement | null>(null);

  function handlePointer(evt: React.PointerEvent<SVGSVGElement>) {
    const bbox = svgRef.current!.getBoundingClientRect();
    const x = evt.clientX - bbox.left - bbox.width / 2;
    const y = evt.clientY - bbox.top - bbox.height / 2;
    const theta = (Math.atan2(y, x) * 180) / Math.PI;
    const hue = (theta + 360) % 360;
    const dist = Math.sqrt(x * x + y * y);
    const rad = Math.min(bbox.width, bbox.height) / 2;
    let sat = Math.min(100, Math.max(0, (dist / rad) * 100));
    setColor({ h: hue, s: sat, l: 50 });
  }

  // Rendu roue chromatique (SVG, segments HD)
  const N = 72;
  const radius = 96;
  const sw = 24; // largeur de la roue
  const segs = [];
  for (let i = 0; i < N; ++i) {
    const a1 = ((i / N) * 2 * Math.PI), a2 = (((i + 1) / N) * 2 * Math.PI);
    const x1 = Math.cos(a1) * (radius - sw), y1 = Math.sin(a1) * (radius - sw);
    const x2 = Math.cos(a2) * (radius - sw), y2 = Math.sin(a2) * (radius - sw);
    const x3 = Math.cos(a2) * radius, y3 = Math.sin(a2) * radius;
    const x4 = Math.cos(a1) * radius, y4 = Math.sin(a1) * radius;
    segs.push(
      <path
        key={i}
        d={`M${x1},${y1}A${radius - sw},${radius - sw} 0 0 1 ${x2},${y2}L${x3},${y3}A${radius},${radius} 0 0 0 ${x4},${y4}Z`}
        fill={`hsl(${(i * 360) / N}, 100%, 50%)`}
        stroke="none"
      />
    );
  }

  // Sélecteur
  const selR = ((color.s) / 100) * radius;
  const selX = Math.cos((color.h * Math.PI) / 180) * selR;
  const selY = Math.sin((color.h * Math.PI) / 180) * selR;

  return (
    <svg
      ref={svgRef}
      width={2 * radius}
      height={2 * radius}
      viewBox={[-radius, -radius, 2 * radius, 2 * radius].join(" ")}
      className="block cursor-pointer select-none"
      style={{ touchAction: "none" }}
      onPointerDown={handlePointer}
      onPointerMove={e => e.buttons && handlePointer(e)}
    >
      {segs}
      {/* Centre blanc */}
      <circle cx={0} cy={0} r={radius - sw} fill="#fff" />
      {/* Selector point */}
      <circle
        cx={selX}
        cy={selY}
        r={11}
        fill={hslToHex(color.h, color.s, color.l)}
        stroke="#333"
        strokeWidth={2}
        style={{ filter: "drop-shadow(0 0 4px #fff8)" }}
      />
    </svg>
  );
}

// Fonction harmonies simples : 
function getHarmonies({ h, s, l }: { h: number; s: number; l: number }) {
  return {
    "Monochrome": [{ h, s, l }, { h, s: Math.max(20, s - 40), l: l + 10 }],
    "Complémentaire": [{ h, s, l }, { h: (h + 180) % 360, s, l }],
    "Triade": [
      { h, s, l },
      { h: (h + 120) % 360, s, l },
      { h: (h + 240) % 360, s, l },
    ],
    "Analogique": [
      { h, s, l },
      { h: (h + 30) % 360, s, l },
      { h: (h + 330) % 360, s, l },
    ]
  };
}

export default function ColorMaster() {
  const [color, setColor] = useState({ h: 30, s: 90, l: 50 });
  const palette = [
    color,
    { h: (color.h + 180) % 360, s: color.s, l: color.l },
    { h: (color.h + 30) % 360, s: color.s, l: color.l },
    { h: (color.h + 120) % 360, s: color.s, l: color.l },
  ];

  const hex = hslToHex(color.h, color.s, color.l);
  const rgb = hslToRgb(color.h, color.s, color.l);

  // Export : téléchargement JSON palette
  function exportPalette() {
    const paletteData = {
      palette: [color, ...Object.values(getHarmonies(color)).flat()].map(c => ({
        h: Math.round(c.h), s: Math.round(c.s), l: Math.round(c.l),
        hex: hslToHex(c.h, c.s, c.l),
        rgb: hslToRgb(c.h, c.s, c.l)
      })),
    };
    const blob = new Blob([JSON.stringify(paletteData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.download = "palette-colormaster.json";
    a.href = url;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-rose-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-2xl px-4 py-10 flex flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-4">
          <Palette className="h-12 w-12 text-orange-500" />
          <h1 className="text-3xl font-bold">ColorMaster</h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 text-center max-w-lg">
            Studio couleurs : roue HSL interactive, harmonies visuelles, export palette pour développeurs. (Prototype MVP)
          </p>
        </div>

        {/* COLOR WHEEL */}
        <div className="flex flex-col md:flex-row gap-8 items-center w-full">
          <ColorWheel color={color} setColor={setColor} />
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div
                className="rounded-full border w-16 h-16"
                style={{ background: hex, boxShadow: "0 0 0 4px #fff6" }}
                title="Aperçu couleur"
              />
              <div className="flex flex-col gap-0.5">
                <span className="text-xs text-gray-500">HEX</span>
                <span className="font-mono">{hex}</span>
                <span className="text-xs text-gray-500 mt-1">RGB</span>
                <span className="font-mono">{rgbToString(rgb)}</span>
                <span className="text-xs text-gray-500 mt-1">HSL</span>
                <span className="font-mono">{hslToString(color.h, color.s, color.l)}</span>
              </div>
            </div>
            <Button variant="outline" onClick={exportPalette}>
              Export palette JSON
            </Button>
          </div>
        </div>

        {/* HARMONIES */}
        <div className="w-full flex flex-col gap-6">
          <h2 className="text-xl font-bold">Harmonies classiques</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {Object.entries(getHarmonies(color)).map(([name, cs]) => (
              <div key={name} className="flex flex-col gap-2 items-start">
                <span className="font-medium">{name}</span>
                <div className="flex gap-2">
                  {cs.map((c, i) => (
                    <div key={i}
                      className="w-10 h-10 rounded-full border"
                      style={{ background: hslToHex(c.h, c.s, c.l) }}
                      title={hslToString(c.h, c.s, c.l)}
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-500 mt-1">
                  {cs.map(c => hslToHex(c.h, c.s, c.l)).join("  ")}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* PALLETTE OVERVIEW */}
        <div className="w-full mt-6">
          <h2 className="text-lg font-bold mb-2">Aperçu palette rapide</h2>
          <div className="flex gap-2 flex-wrap">
            {palette.map((c, i) => (
              <div key={i} className="w-14 h-6 rounded-sm"
                style={{ background: hslToHex(c.h, c.s, c.l), border: "1px solid #eee" }}
                title={hslToString(c.h, c.s, c.l)}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}


export function getCssFilterString(filters: any) {
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

/**
 * Renderise l’image sur un canvas avec les filtres et crop, renvoie un Blob
 */
export async function getCroppedImageBlob({
  imageUrl,
  filters,
  crop,
  format,
  quality = 0.92,
}: {
  imageUrl: string;
  filters: any;
  crop: any;
  format: "jpg" | "png";
  quality?: number;
}): Promise<Blob> {
  const img = await loadImage(imageUrl);

  // Gère le crop par défaut (plein format)
  let sx = 0,
    sy = 0,
    sw = img.width,
    sh = img.height;

  if (crop) {
    // Mise à l’échelle : crop.x, crop.y exprimés en %, à transposer vers w/h image
    const preview = document.getElementById("quickedit-preview") as HTMLImageElement | null;
    const displayW = preview?.width || img.width;
    const displayH = preview?.height || img.height;

    sx = Math.round((crop.x / displayW) * img.width);
    sy = Math.round((crop.y / displayH) * img.height);
    sw = Math.max(40, Math.round((crop.w / displayW) * img.width));
    sh = Math.max(40, Math.round((crop.h / displayH) * img.height));
  }

  // Dessin sur canvas
  const canvas = document.createElement("canvas");
  canvas.width = sw;
  canvas.height = sh;
  const ctx = canvas.getContext("2d")!;
  // Appliquer filtres CSS
  ctx.filter = getCssFilterString(filters);
  ctx.drawImage(img, sx, sy, sw, sh, 0, 0, sw, sh);

  // Export selon format
  return await new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new Error("Échec de l’export"));
      },
      format === "jpg" ? "image/jpeg" : "image/png",
      format === "jpg" ? quality : undefined
    );
  });
}

export function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.crossOrigin = "Anonymous";
    img.src = url;
  });
}

// isLightColor - check if color is light
export function isLightColor(hex) {
  const c = hex.replace("#", "");
  const r = parseInt(c.slice(0, 2), 16);
  const g = parseInt(c.slice(2, 4), 16);
  const b = parseInt(c.slice(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 128;
}

// loadImage - load an image
export function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

// applyFilterManual - apply manual filter
export function applyFilterManual(ctx, width, height, filterString) {
  if (!filterString || filterString === "none") return;

  const get = (name) => {
    const match = filterString.match(new RegExp(`${name}\\(([\\d.]+)(%|deg)?`));
    if (!match) return null;
    let val = parseFloat(match[1]);
    if (match[2] === "%") val = val / 100;
    return val;
  };

  const brightness = get("brightness");
  const contrast = get("contrast");
  const saturate = get("saturate");
  const sepia = get("sepia");

  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    let r = data[i],
      g = data[i + 1],
      b = data[i + 2];

    if (sepia) {
      const sr = Math.min(
        255,
        r * (1 - 0.607 * sepia) + g * 0.769 * sepia + b * 0.189 * sepia,
      );
      const sg = Math.min(
        255,
        r * 0.349 * sepia + g * (1 - 0.314 * sepia) + b * 0.168 * sepia,
      );
      const sb = Math.min(
        255,
        r * 0.272 * sepia + g * 0.534 * sepia + b * (1 - 0.869 * sepia),
      );
      r = sr;
      g = sg;
      b = sb;
    }

    if (brightness !== null) {
      r = Math.min(255, r * brightness);
      g = Math.min(255, g * brightness);
      b = Math.min(255, b * brightness);
    }

    if (contrast !== null) {
      r = Math.min(255, Math.max(0, (r - 128) * contrast + 128));
      g = Math.min(255, Math.max(0, (g - 128) * contrast + 128));
      b = Math.min(255, Math.max(0, (b - 128) * contrast + 128));
    }

    if (saturate !== null) {
      const gray = 0.299 * r + 0.587 * g + 0.114 * b;
      r = Math.min(255, Math.max(0, gray + (r - gray) * saturate));
      g = Math.min(255, Math.max(0, gray + (g - gray) * saturate));
      b = Math.min(255, Math.max(0, gray + (b - gray) * saturate));
    }

    data[i] = r;
    data[i + 1] = g;
    data[i + 2] = b;
  }

  ctx.putImageData(imageData, 0, 0);
}

/* ── Trigger download / save (cross-platform) ── */
export function saveImage(dataUrl, filename, win = null) {
  const isIOS =
    /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

  if (isIOS && win) {
    win.document.write(`
      <!DOCTYPE html>
      <html>
        <head><meta name="viewport" content="width=device-width,initial-scale=1"><title>memoirBooth</title></head>
        <body style="margin:0;background:#111;display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;gap:1rem;">
          <img src="${dataUrl}" style="max-width:100%;height:auto;display:block;" />
          <p style="color:#aaa;font-family:sans-serif;font-size:0.85rem;text-align:center;padding:0 1rem;">
            Long press the image → Save to Photos
          </p>
        </body>
      </html>
    `);
    win.document.close();
  } else {
    const link = document.createElement("a");
    link.download = filename;
    link.href = dataUrl;
    link.click();
  }
}

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { usePhoto } from "@/context/usePhoto";
import "./Print.css";

const STRIP_WIDTH = 480;
const SPROCKET_W = 80;
const HOLE_W = 18;
const HOLE_H = 12;
const WATERMARK_H = 48;
const FILM_TOP_H = 20;
const PADDING = 36;

const BG_COLORS = [
  { label: "White", value: "#ffffff" },
  { label: "Black", value: "#111111" },
  { label: "Blush", value: "#f9dde0" },
  { label: "Sage", value: "#d4e6d4" },
  { label: "Lavender", value: "#e4daf7" },
  { label: "Sky", value: "#d0e8f7" },
  { label: "Peach", value: "#fde8d0" },
];

function isLightColor(hex) {
  const c = hex.replace("#", "");
  const r = parseInt(c.slice(0, 2), 16);
  const g = parseInt(c.slice(2, 4), 16);
  const b = parseInt(c.slice(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 128;
}

/* ── Load an image as HTMLImageElement (for canvas) ── */
function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

/* ── Draw film strip onto a canvas and return dataURL ── */
async function drawFilmStrip(photos) {
  const photoAreaW = STRIP_WIDTH - SPROCKET_W * 2;
  const photoH = Math.round(photoAreaW * (3 / 4));
  const totalH = FILM_TOP_H + photoH * photos.length + WATERMARK_H;

  const canvas = document.createElement("canvas");
  canvas.width = STRIP_WIDTH;
  canvas.height = totalH;
  const ctx = canvas.getContext("2d");

  // Background
  ctx.fillStyle = "#1c1c1c";
  ctx.fillRect(0, 0, STRIP_WIDTH, totalH);

  // Draw photos
  for (let i = 0; i < photos.length; i++) {
    const img = await loadImage(photos[i].dataUrl);
    const y = FILM_TOP_H + i * photoH;

    // Apply filter via offscreen canvas
    const offscreen = document.createElement("canvas");
    offscreen.width = photoAreaW;
    offscreen.height = photoH;
    const octx = offscreen.getContext("2d");
    octx.filter = photos[i].filter || "none";
    // Cover crop: maintain aspect ratio
    const srcRatio = img.width / img.height;
    const destRatio = photoAreaW / photoH;
    let sx, sy, sw, sh;
    if (srcRatio > destRatio) {
      sh = img.height;
      sw = img.height * destRatio;
      sx = (img.width - sw) / 2;
      sy = 0;
    } else {
      sw = img.width;
      sh = img.width / destRatio;
      sx = 0;
      sy = (img.height - sh) / 2;
    }
    octx.drawImage(img, sx, sy, sw, sh, 0, 0, photoAreaW, photoH);

    ctx.drawImage(offscreen, SPROCKET_W, y);

    // Divider line between photos
    if (i > 0) {
      ctx.fillStyle = "#111";
      ctx.fillRect(SPROCKET_W, y, photoAreaW, 2);
    }
  }

  // Sprocket holes — left & right columns
  const holeGap = totalH / (photos.length * 4 + 1);
  for (let col = 0; col < 2; col++) {
    const x =
      col === 0
        ? (SPROCKET_W - HOLE_W) / 2
        : STRIP_WIDTH - SPROCKET_W + (SPROCKET_W - HOLE_W) / 2;

    let hy = FILM_TOP_H + holeGap - HOLE_H / 2;
    while (hy + HOLE_H < totalH - WATERMARK_H) {
      ctx.fillStyle = "#000";
      ctx.beginPath();
      ctx.roundRect(x, hy, HOLE_W, HOLE_H, 3);
      ctx.fill();
      // Hole border
      ctx.strokeStyle = "#555";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(x, hy, HOLE_W, HOLE_H, 3);
      ctx.stroke();
      hy += holeGap;
    }
  }

  // Watermark
  ctx.fillStyle = "#1c1c1c";
  ctx.fillRect(0, totalH - WATERMARK_H, STRIP_WIDTH, WATERMARK_H);
  ctx.strokeStyle = "#2a2a2a";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(0, totalH - WATERMARK_H);
  ctx.lineTo(STRIP_WIDTH, totalH - WATERMARK_H);
  ctx.stroke();
  ctx.fillStyle = "#555";
  ctx.font = `${Math.round(WATERMARK_H * 0.45)}px 'Special Elite', serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.letterSpacing = "0.18em";
  ctx.fillText("memoirBooth", STRIP_WIDTH / 2, totalH - WATERMARK_H / 2);

  return canvas.toDataURL("image/png", 1.0);
}

/* ── Draw color strip onto a canvas and return dataURL ── */
async function drawColorStrip(photos, bgColor) {
  const innerW = STRIP_WIDTH - PADDING * 2;
  const photoH = Math.round(innerW * (3 / 4));
  const gapH = PADDING / 2;
  const totalH =
    PADDING +
    photos.length * photoH +
    (photos.length - 1) * gapH +
    PADDING +
    WATERMARK_H;

  const canvas = document.createElement("canvas");
  canvas.width = STRIP_WIDTH;
  canvas.height = totalH;
  const ctx = canvas.getContext("2d");

  // Background
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, STRIP_WIDTH, totalH);

  // Draw photos
  for (let i = 0; i < photos.length; i++) {
    const img = await loadImage(photos[i].dataUrl);
    const y = PADDING + i * (photoH + gapH);

    const offscreen = document.createElement("canvas");
    offscreen.width = innerW;
    offscreen.height = photoH;
    const octx = offscreen.getContext("2d");
    octx.filter = photos[i].filter || "none";

    const srcRatio = img.width / img.height;
    const destRatio = innerW / photoH;
    let sx, sy, sw, sh;
    if (srcRatio > destRatio) {
      sh = img.height;
      sw = img.height * destRatio;
      sx = (img.width - sw) / 2;
      sy = 0;
    } else {
      sw = img.width;
      sh = img.width / destRatio;
      sx = 0;
      sy = (img.height - sh) / 2;
    }
    octx.drawImage(img, sx, sy, sw, sh, 0, 0, innerW, photoH);

    // Rounded corners on photos
    ctx.save();
    ctx.beginPath();
    ctx.roundRect(PADDING, y, innerW, photoH, 4);
    ctx.clip();
    ctx.drawImage(offscreen, PADDING, y);
    ctx.restore();
  }

  // Watermark
  const light = isLightColor(bgColor);
  ctx.fillStyle = light ? "#555" : "#aaa";
  ctx.font = `${Math.round(WATERMARK_H * 0.4)}px 'Special Elite', serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.letterSpacing = "0.18em";
  ctx.fillText("memoirBooth", STRIP_WIDTH / 2, totalH - WATERMARK_H / 2);

  return canvas.toDataURL("image/png", 1.0);
}

/* ── Trigger download / save (cross-platform) ── */
function saveImage(dataUrl, filename) {
  const isIOS =
    /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

  if (isIOS) {
    const win = window.open("", "_blank");
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

/* ================================================================
   Strip Preview Components (for UI only)
   ================================================================ */
function FilmStrip({ photos }) {
  const count = Math.max(photos.length * 4, 8);
  return (
    <div className="strip film-strip">
      <div className="film-inner">
        <div className="sprocket-col">
          {Array.from({ length: count }).map((_, i) => (
            <span key={i} className="sprocket-hole" />
          ))}
        </div>
        <div className="strip-photos">
          {photos.map((photo, i) => (
            <div className="strip-frame film-frame" key={i}>
              <img
                src={photo.dataUrl}
                alt={`Photo ${i + 1}`}
                className="strip-img"
                style={{ filter: photo.filter }}
              />
            </div>
          ))}
        </div>
        <div className="sprocket-col">
          {Array.from({ length: count }).map((_, i) => (
            <span key={i} className="sprocket-hole" />
          ))}
        </div>
      </div>
      <div className="watermark film-watermark">memoirBooth</div>
    </div>
  );
}

function ColorStrip({ photos, bgColor }) {
  const light = isLightColor(bgColor);
  return (
    <div className="strip color-strip" style={{ backgroundColor: bgColor }}>
      <div className="strip-photos">
        {photos.map((photo, i) => (
          <div
            className="strip-frame color-frame"
            key={i}
            style={{ borderColor: bgColor }}
          >
            <img
              src={photo.dataUrl}
              alt={`Photo ${i + 1}`}
              className="strip-img"
              style={{ filter: photo.filter }}
            />
          </div>
        ))}
      </div>
      <div
        className="watermark color-watermark"
        style={{
          backgroundColor: bgColor,
          borderTopColor: light ? "rgba(0,0,0,0.12)" : "rgba(255,255,255,0.15)",
          color: light ? "#555" : "#aaa",
        }}
      >
        memoirBooth
      </div>
    </div>
  );
}

/* ================================================================
   Controls
   ================================================================ */
function Controls({
  stripType,
  setStripType,
  activeBg,
  handlePreset,
  handleCustom,
  customColor,
  handleSave,
  saving,
}) {
  return (
    <>
      <div className="ctrl-tabs">
        <button
          className={`tab-btn ${stripType === "film" ? "tab-active" : ""}`}
          onClick={() => setStripType("film")}
        >
          Film Strip
        </button>
        <button
          className={`tab-btn ${stripType === "color" ? "tab-active" : ""}`}
          onClick={() => setStripType("color")}
        >
          Photo Strip
        </button>
      </div>

      {stripType === "color" && (
        <div className="ctrl-group">
          <span className="ctrl-label">Background</span>
          <div className="color-swatches">
            {BG_COLORS.map((c) => (
              <button
                key={c.value}
                className={`swatch ${activeBg === c.value ? "swatch-active" : ""}`}
                style={{ backgroundColor: c.value }}
                title={c.label}
                onClick={() => handlePreset(c.value)}
              />
            ))}
            <label
              className={`swatch swatch-custom ${activeBg === "custom" ? "swatch-active" : ""}`}
              title="Custom color"
            >
              <span className="swatch-plus">+</span>
              <input
                type="color"
                value={customColor}
                onChange={handleCustom}
                className="hidden-color-input"
              />
            </label>
          </div>
        </div>
      )}

      <button className="save-btn" onClick={handleSave} disabled={saving}>
        {saving ? "Saving..." : "Save Image"}
      </button>
    </>
  );
}

/* ================================================================
   Page
   ================================================================ */
export default function PhotoStripPage() {
  const { photos } = usePhoto();
  const displayPhotos = photos.slice(0, 4);

  const [stripType, setStripType] = useState("film");
  const [selectedBg, setSelectedBg] = useState("#ffffff");
  const [customColor, setCustomColor] = useState("#ffffff");
  const [activeBg, setActiveBg] = useState("#ffffff");
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!photos || photos.length === 0) {
      navigate("/");
    }
  }, [photos, navigate]);

  const handlePreset = (v) => {
    setActiveBg(v);
    setSelectedBg(v);
  };
  const handleCustom = (e) => {
    setCustomColor(e.target.value);
    setSelectedBg(e.target.value);
    setActiveBg("custom");
  };

  const handleSave = async () => {
    if (saving) return;
    setSaving(true);
    try {
      const dataUrl =
        stripType === "film"
          ? await drawFilmStrip(displayPhotos)
          : await drawColorStrip(displayPhotos, selectedBg);

      saveImage(dataUrl, `memoirBooth-${stripType}-strip.png`);
    } catch (err) {
      console.error("Save failed:", err);
    } finally {
      setSaving(false);
    }
  };

  const controlProps = {
    stripType,
    setStripType,
    activeBg,
    handlePreset,
    handleCustom,
    customColor,
    handleSave,
    saving,
  };

  return (
    <div className="ps-page">
      <aside className="ps-sidebar">
        <div className="sidebar-logo">
          memoir<span className="sidebar-logo-span">Booth</span>
        </div>
        <Controls {...controlProps} />
      </aside>

      <div className="ps-topbar">
        <Controls {...controlProps} />
      </div>

      <main className="ps-preview">
        <div className="preview-inner">
          <div className="print-only-target">
            {stripType === "film" ? (
              <FilmStrip photos={displayPhotos} />
            ) : (
              <ColorStrip photos={displayPhotos} bgColor={selectedBg} />
            )}
          </div>
        </div>
      </main>

      <div className="ps-bottom-bar">
        <button
          className="save-btn-full"
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? "Saving..." : "Save Image"}
        </button>
      </div>
    </div>
  );
}

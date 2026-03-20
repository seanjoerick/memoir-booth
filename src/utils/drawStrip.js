import { loadImage, applyFilterManual, isLightColor } from "./imageUtils";

import {
  STRIP_WIDTH,
  SPROCKET_W,
  HOLE_W,
  HOLE_H,
  WATERMARK_H,
  FILM_TOP_H,
  PADDING,
} from "@/constants/stripConstants";

export async function drawFilmStrip(photos) {
  const GAP = 16;
  const scale = 3;
  const photoAreaW = STRIP_WIDTH - SPROCKET_W * 2;
  const photoH = Math.round(photoAreaW * (3 / 4));
  const totalH =
    FILM_TOP_H +
    photoH * photos.length +
    GAP * (photos.length + 1) +
    WATERMARK_H;

  const canvas = document.createElement("canvas");
  canvas.width = STRIP_WIDTH * scale;
  canvas.height = totalH * scale;
  const ctx = canvas.getContext("2d");
  ctx.scale(scale, scale);

  // Background
  ctx.fillStyle = "#1c1c1c";
  ctx.fillRect(0, 0, STRIP_WIDTH, totalH);

  // Draw photos
  for (let i = 0; i < photos.length; i++) {
    const img = await loadImage(photos[i].dataUrl);
    const y = FILM_TOP_H + GAP + i * (photoH + GAP);

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

    const offscreen = document.createElement("canvas");
    offscreen.width = photoAreaW * scale;
    offscreen.height = photoH * scale;
    const octx = offscreen.getContext("2d");
    octx.scale(scale, scale);
    octx.drawImage(img, sx, sy, sw, sh, 0, 0, photoAreaW, photoH);
    applyFilterManual(
      octx,
      photoAreaW * scale,
      photoH * scale,
      photos[i].filter,
    );

    ctx.save();
    ctx.beginPath();
    ctx.roundRect(SPROCKET_W, y, photoAreaW, photoH, 4);
    ctx.clip();
    ctx.drawImage(offscreen, SPROCKET_W, y, photoAreaW, photoH);
    ctx.restore();
  }

  // Sprocket holes
  const holeGap = totalH / (photos.length * 4 + 1);
  for (let col = 0; col < 2; col++) {
    const x =
      col === 0
        ? (SPROCKET_W - HOLE_W) / 2
        : STRIP_WIDTH - SPROCKET_W + (SPROCKET_W - HOLE_W) / 2;

    let hy = FILM_TOP_H + holeGap - HOLE_H / 2;
    while (hy + HOLE_H < totalH - WATERMARK_H) {
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.roundRect(x, hy, HOLE_W, HOLE_H, 3);
      ctx.fill();
      ctx.strokeStyle = "#ffffff  ";
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
  ctx.font = `${Math.round(WATERMARK_H * 0.3)}px 'Poppins', sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.letterSpacing = "0";
  ctx.fillText("memoirBooth", STRIP_WIDTH / 2, totalH - WATERMARK_H / 2);

  return canvas.toDataURL("image/png", 1.0);
}

/* ── Draw color strip onto a canvas and return dataURL ── */
export async function drawColorStrip(photos, bgColor) {
  const scale = 3;
  const innerW = STRIP_WIDTH - PADDING * 2;
  const photoH = Math.round(innerW * (3 / 4));
  const gapH = PADDING / 2;
  const totalH =
    PADDING +
    photos.length * photoH +
    (photos.length - 1) * gapH +
    WATERMARK_H +
    24;

  const canvas = document.createElement("canvas");
  canvas.width = STRIP_WIDTH * scale;
  canvas.height = totalH * scale;
  const ctx = canvas.getContext("2d");
  ctx.scale(scale, scale);

  // Background
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, STRIP_WIDTH, totalH);

  // Draw photos
  for (let i = 0; i < photos.length; i++) {
    const img = await loadImage(photos[i].dataUrl);
    const y = PADDING + i * (photoH + gapH);

    const offscreen = document.createElement("canvas");
    offscreen.width = innerW * scale;
    offscreen.height = photoH * scale;
    const octx = offscreen.getContext("2d");
    octx.scale(scale, scale);

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
    applyFilterManual(octx, innerW * scale, photoH * scale, photos[i].filter);

    // Rounded corners on photos
    ctx.save();
    ctx.beginPath();
    ctx.roundRect(PADDING, y, innerW, photoH, 4);
    ctx.clip();
    ctx.drawImage(offscreen, PADDING, y, innerW, photoH);
    ctx.restore();
  }

  // Watermark
  const light = isLightColor(bgColor);
  ctx.fillStyle = light ? "#000000" : "#ffffff";
  ctx.font = `${Math.round(WATERMARK_H * 0.3)}px 'Poppins', sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.letterSpacing = "0";
  ctx.fillText("memoirBooth", STRIP_WIDTH / 2, totalH - WATERMARK_H / 2 - 24);

  return canvas.toDataURL("image/png", 1.0);
}

export function getFilterStyle(filters) {
  return `
    brightness(${filters.brightness}%)
    contrast(${filters.contrast}%)
    saturate(${filters.saturate}%)
    sepia(${filters.sepia}%)
    hue-rotate(${filters.hueRotate || 0}deg)
  `;
}

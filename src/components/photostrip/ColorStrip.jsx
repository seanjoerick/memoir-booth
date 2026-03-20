import { isLightColor } from "@/utils/imageUtils";

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

export default ColorStrip;

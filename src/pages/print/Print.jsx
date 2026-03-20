import { usePhoto } from "@/context/usePhoto";
import "./Print.css";

function PhotoStripPage() {
  const { photos } = usePhoto();

  // Clamp to max 4 photos
  const displayPhotos = photos.slice(0, 4);

  return (
    <div className="print-wrapper">
      {/* ── FILM STRIP ── */}
      <div className="strip film-strip">
        {/* Inner: left sprockets + photos + right sprockets */}
        <div className="film-inner">
          {/* Left sprocket column */}
          <div className="sprocket-col">
            {Array.from({ length: 12 }).map((_, i) => (
              <span key={i} className="sprocket-hole" />
            ))}
          </div>

          {/* Photos */}
          <div className="strip-photos">
            {displayPhotos.map((photo, i) => (
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

          {/* Right sprocket column */}
          <div className="sprocket-col">
            {Array.from({ length: 12 }).map((_, i) => (
              <span key={i} className="sprocket-hole" />
            ))}
          </div>
        </div>

        {/* Watermark */}
        <div className="watermark film-watermark">memoirBooth</div>
      </div>

      {/* ── NORMAL COLOR STRIP ── */}
      <div className="strip color-strip">
        <div className="strip-photos">
          {displayPhotos.map((photo, i) => (
            <div className="strip-frame color-frame" key={i}>
              <img
                src={photo.dataUrl}
                alt={`Photo ${i + 1}`}
                className="strip-img"
                style={{ filter: photo.filter }}
              />
            </div>
          ))}
        </div>

        {/* Watermark */}
        <div className="watermark color-watermark">memoirBooth</div>
      </div>
    </div>
  );
}

export default PhotoStripPage;

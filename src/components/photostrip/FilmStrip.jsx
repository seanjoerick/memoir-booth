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

export default FilmStrip;

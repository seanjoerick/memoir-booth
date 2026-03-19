import React from "react";

function PhotoSlots({ photos, totalPoses, isDone }) {
  if (photos.length === 0) return null;

  const slots = isDone ? Array.from({ length: totalPoses }) : photos;

  return (
    <div className="capture-slots">
      {slots.map((_, i) => (
        <div key={i} className={`capture-slot ${photos[i] ? "captured" : ""}`}>
          {photos[i] ? (
            <img
              src={photos[i].dataUrl}
              alt={`Pose ${i + 1}`}
              className="capture-slot-img"
              style={{ filter: photos[i].filter }}
            />
          ) : (
            <span className="capture-slot-num">{i + 1}</span>
          )}
        </div>
      ))}
    </div>
  );
}

export default PhotoSlots;

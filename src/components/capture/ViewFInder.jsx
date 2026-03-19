import React from "react";

function Viewfinder({ videoRef, countdown, flash }) {
  return (
    <div className="capture-viewfinder">
      {flash && <div className="capture-flash" />}

      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="capture-video"
      />

      {countdown !== null && (
        <div className="capture-countdown">{countdown}</div>
      )}

      <div className="capture-corners">
        <span />
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}

export default Viewfinder;

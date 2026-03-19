import React from "react";
import TimerOptions from "./TimerOptions";
import SwitchCameraButton from "./SwitchCameraButton";

function CaptureControls({
  isDone,
  isCounting,
  remaining,
  selectedTimer,
  setSelectedTimer,
  TIMER_OPTIONS,
  handleCapture,
  switchCamera,
  cameraReady,
  photos,
  setPhotos,
  setCountdown,
  setIsCounting,
  intervalRef,
  isPausedRef,
}) {
  return (
    <div className="capture-controls">
      {/* Status */}
      <p className="capture-status">
        {isDone
          ? "✓ All done! Preparing your print..."
          : isCounting
            ? "Get ready..."
            : `${remaining} photo${remaining > 1 ? "s" : ""} remaining`}
      </p>

      {/* Timer + Switch */}
      <div className="capture-timers">
        <SwitchCameraButton
          onSwitch={switchCamera}
          disabled={isCounting || isDone}
        />

        <TimerOptions
          options={TIMER_OPTIONS}
          selectedTimer={selectedTimer}
          setSelectedTimer={setSelectedTimer}
          disabled={isCounting || isDone}
        />
      </div>

      {/* Capture Button */}
      <button
        className="capture-btn"
        onPointerDown={handleCapture}
        disabled={
          isCounting || isDone || !cameraReady || selectedTimer === "auto"
        }
      >
        <span className="capture-btn-inner" />
      </button>

      {/* Hint */}
      <p className="capture-hint">
        {selectedTimer === "auto" ? "Auto capturing..." : "Press to capture"}
      </p>

      {/* Retake */}
      {photos.length > 0 && (
        <button
          className="capture-retake-btn"
          onClick={() => {
            clearInterval(intervalRef.current);
            isPausedRef.current = true;
            setCountdown(null);
            setIsCounting(false);
            setPhotos([]);
          }}
        >
          Retake
        </button>
      )}
    </div>
  );
}

export default CaptureControls;

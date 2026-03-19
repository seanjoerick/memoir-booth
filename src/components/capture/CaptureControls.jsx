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
  isAutoRunning,
  setIsAutoRunning,
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
          setSelectedTimer={(val) => {
            setSelectedTimer(val);
            setIsAutoRunning(false);
          }}
          disabled={isCounting || isDone}
        />
      </div>

      {/* Capture Button */}
      <button
        className="capture-btn"
        onPointerDown={() => {
          if (selectedTimer === "auto") {
            setIsAutoRunning((prev) => !prev);
          } else {
            handleCapture();
          }
        }}
        disabled={
          isDone || !cameraReady || (selectedTimer !== "auto" && isCounting)
        }
      >
        <span className="capture-btn-inner" />
      </button>

      {/* Hint */}
      <p className="capture-hint">
        {selectedTimer === "auto"
          ? isAutoRunning
            ? "Tap to stop auto"
            : "Tap to start auto"
          : "Press to capture"}
      </p>

      {/* Retake */}
      {photos.length > 0 && (
        <button
          className="capture-retake-btn"
          onClick={() => {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
            isPausedRef.current = false;
            setIsAutoRunning(false);
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

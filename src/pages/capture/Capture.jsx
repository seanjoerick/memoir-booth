import { useEffect, useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";
import { usePhoto } from "@/context/usePhoto";
import "./Capture.css";

import PhotoSlots from "@/components/capture/PhotoSlots";
import FilterOptions from "@/components/capture/FilterOptions";
import { getFilterStyle } from "@/helper/filterHelpers";
import CaptureControls from "@/components/capture/CaptureControls";
import TIMER_OPTIONS from "./Timer";

function Capture() {
  const { selectedLayout } = usePhoto();

  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const intervalRef = useRef(null);
  const isPausedRef = useRef(false);
  const takePhotoRef = useRef(null);

  const [photos, setPhotos] = useState([]);
  const [countdown, setCountdown] = useState(null);
  const [isCounting, setIsCounting] = useState(false);
  const [flash, setFlash] = useState(false);
  const [cameraReady, setCameraReady] = useState(false);
  const [selectedTimer, setSelectedTimer] = useState(3);
  const [facingMode, setFacingMode] = useState("user");
  const [isAutoRunning, setIsAutoRunning] = useState(false);
  const [filters, setFilters] = useState({
    brightness: 100,
    contrast: 100,
    saturate: 100,
    sepia: 0,
  });

  const totalPoses = selectedLayout?.poses ?? 4;

  const takePhoto = useCallback(() => {
    if (!webcamRef.current || !canvasRef.current) return;

    const imageSrc = webcamRef.current.getScreenshot();
    if (!imageSrc) return;

    const img = new Image();
    img.onload = () => {
      const canvas = canvasRef.current;
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext("2d");
      ctx.filter = getFilterStyle(filters);
      ctx.drawImage(img, 0, 0);

      const dataUrl = canvas.toDataURL("image/png");

      setFlash(true);
      setTimeout(() => setFlash(false), 300);

      setPhotos((prev) => [...prev, dataUrl]);
    };
    img.src = imageSrc;
  }, [filters]);

  useEffect(() => {
    takePhotoRef.current = takePhoto;
  }, [takePhoto]);

  // Auto mode
  useEffect(() => {
    if (
      selectedTimer !== "auto" ||
      !isAutoRunning ||
      isCounting ||
      !cameraReady
    )
      return;
    if (photos.length >= totalPoses) return;

    const timeout = setTimeout(() => {
      startCountdown(3, takePhotoRef.current);
    }, 500);

    return () => clearTimeout(timeout);
  }, [
    selectedTimer,
    isAutoRunning,
    photos.length,
    isCounting,
    cameraReady,
    totalPoses,
  ]);

  // Manual capture
  const handleCapture = () => {
    if (isCounting || photos.length >= totalPoses || !cameraReady) return;
    if (selectedTimer === "auto") return;
    startCountdown(selectedTimer, takePhoto);
  };

  // Countdown
  const startCountdown = (duration, onDone) => {
    isPausedRef.current = false;
    setIsCounting(true);

    let count = duration;
    setCountdown(count);

    intervalRef.current = setInterval(() => {
      count--;

      if (count === 0) {
        clearInterval(intervalRef.current);
        setCountdown(null);
        setIsCounting(false);
        onDone();
      } else {
        setCountdown(count);
      }
    }, 1000);
  };

  // Switch camera
  const switchCamera = () => {
    setFacingMode((prev) => (prev === "user" ? "environment" : "user"));
  };

  const remaining = totalPoses - photos.length;
  const isDone = photos.length >= totalPoses;

  return (
    <div className="capture">
      <div className="capture-viewfinder">
        {flash && <div className="capture-flash" />}

        <Webcam
          ref={webcamRef}
          audio={false}
          screenshotFormat="image/png"
          mirrored={facingMode === "user"}
          videoConstraints={{ facingMode }}
          onUserMedia={() => setCameraReady(true)}
          className="capture-video"
          style={{ filter: getFilterStyle(filters) }}
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

      {/* Hidden canvas */}
      <canvas ref={canvasRef} className="capture-canvas" />

      {/* Filter Options */}
      <FilterOptions filters={filters} setFilters={setFilters} />

      {/* Controls */}
      <CaptureControls
        isDone={isDone}
        isCounting={isCounting}
        remaining={remaining}
        selectedTimer={selectedTimer}
        setSelectedTimer={setSelectedTimer}
        TIMER_OPTIONS={TIMER_OPTIONS}
        handleCapture={handleCapture}
        switchCamera={switchCamera}
        cameraReady={cameraReady}
        photos={photos}
        setPhotos={setPhotos}
        setCountdown={setCountdown}
        setIsCounting={setIsCounting}
        intervalRef={intervalRef}
        isPausedRef={isPausedRef}
        isAutoRunning={isAutoRunning}
        setIsAutoRunning={setIsAutoRunning}
      />

      {/* Photo previews */}
      <PhotoSlots photos={photos} totalPoses={totalPoses} isDone={isDone} />
    </div>
  );
}

export default Capture;

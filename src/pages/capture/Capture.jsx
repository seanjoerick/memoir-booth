import { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import { usePhoto } from "@/context/usePhoto";
import "./Capture.css";

import PhotoSlots from "@/components/capture/PhotoSlots";
import FilterOptions from "@/components/capture/FilterOptions";
import { getFilterStyle } from "@/helper/filterHelpers";
import CaptureControls from "@/components/capture/CaptureControls";
import TIMER_OPTIONS from "./Timer";

function Capture() {
  const { selectedLayout, setPhotos: setContextPhotos } = usePhoto();
  const navigate = useNavigate();

  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const intervalRef = useRef(null);
  const isPausedRef = useRef(false);
  const takePhotoRef = useRef(null);
  const filtersRef = useRef({
    brightness: 100,
    contrast: 100,
    saturate: 100,
    sepia: 0,
  });
  const facingModeRef = useRef("user");

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

  const handleSetFilters = (val) => {
    setFilters(val);
    filtersRef.current = val;
  };

  const takePhoto = useCallback(() => {
    if (!webcamRef.current || !canvasRef.current) return;

    const video = webcamRef.current.video;
    if (!video || video.readyState !== 4) return;

    requestAnimationFrame(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const ctx = canvas.getContext("2d");

      if (facingModeRef.current === "user") {
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
      }

      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      ctx.setTransform(1, 0, 0, 1, 0, 0);

      const dataUrl = canvas.toDataURL("image/png");

      setFlash(true);
      setTimeout(() => setFlash(false), 300);
      setPhotos((prev) => [
        ...prev,
        { dataUrl, filter: getFilterStyle(filtersRef.current) },
      ]);
    });
  }, []);

  useEffect(() => {
    takePhotoRef.current = takePhoto;
  }, [takePhoto]);

  // i-sync sa context pag isDone
  const isDone = photos.length >= totalPoses;
  useEffect(() => {
    if (isDone) setContextPhotos(photos);
  }, [isDone, photos, setContextPhotos]);

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
    setFacingMode((prev) => {
      const next = prev === "user" ? "environment" : "user";
      facingModeRef.current = next;
      return next;
    });
  };

  const remaining = totalPoses - photos.length;

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

      <canvas ref={canvasRef} className="capture-canvas" />

      <FilterOptions setFilters={handleSetFilters} />

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

      <PhotoSlots photos={photos} totalPoses={totalPoses} isDone={isDone} />

      {/* Print button */}
      {isDone && (
        <button
          className="capture-print-btn"
          onClick={() => navigate("/print")}
        >
          Proceed to Print →
        </button>
      )}
    </div>
  );
}

export default Capture;

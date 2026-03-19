import { useEffect, useRef, useState } from "react";
import { usePhoto } from "@/context/usePhoto";
import "./Capture.css";

import Viewfinder from "@/components/capture/Viewfinder";
import PhotoSlots from "@/components/capture/PhotoSlots";
import CaptureControls from "@/components/capture/CaptureControls";
import TIMER_OPTIONS from "./Timer";
// import { getVideoFilter } from "@/components/helper/filterHelpers";

function Capture() {
  const { selectedLayout } = usePhoto();

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const intervalRef = useRef(null);
  const isPausedRef = useRef(false);

  const [photos, setPhotos] = useState([]);
  const [countdown, setCountdown] = useState(null);
  const [isCounting, setIsCounting] = useState(false);
  const [flash, setFlash] = useState(false);
  const [cameraReady, setCameraReady] = useState(false);
  const [selectedTimer, setSelectedTimer] = useState(3);
  const [facingMode, setFacingMode] = useState("user");

  const totalPoses = selectedLayout?.poses ?? 4;

  // 🎥 Start camera
  useEffect(() => {
    const videoElement = videoRef.current;

    async function startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode },
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setCameraReady(true);
        }
      } catch (err) {
        console.error("Camera error:", err);
      }
    }

    startCamera();

    return () => {
      if (videoElement?.srcObject) {
        videoElement.srcObject.getTracks().forEach((t) => t.stop());
      }
    };
  }, [facingMode]);

  // 📸 Take photo
  const takePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0);

    const dataUrl = canvas.toDataURL("image/png");

    setFlash(true);
    setTimeout(() => setFlash(false), 300);

    setPhotos((prev) => [...prev, dataUrl]);
  };

  // ⏱ Countdown
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

  // 🤖 Auto mode
  useEffect(() => {
    if (selectedTimer !== "auto" || isCounting || !cameraReady) return;
    if (photos.length >= totalPoses) return;
    if (isPausedRef.current) return;

    const timeout = setTimeout(() => {
      startCountdown(3, takePhoto);
    }, 500);

    return () => clearTimeout(timeout);
  }, [selectedTimer, photos, isCounting, cameraReady, totalPoses]);

  // Manual capture
  const handleCapture = () => {
    if (isCounting || photos.length >= totalPoses || !cameraReady) return;
    if (selectedTimer === "auto") return;

    startCountdown(selectedTimer, takePhoto);
  };

  // Switch camera
  const switchCamera = () => {
    setFacingMode((prev) => (prev === "user" ? "environment" : "user"));
  };

  const remaining = totalPoses - photos.length;
  const isDone = photos.length >= totalPoses;

  return (
    <div className="capture">
      {/* Viewfinder */}
      <Viewfinder videoRef={videoRef} countdown={countdown} flash={flash} />

      {/* Hidden canvas */}
      <canvas ref={canvasRef} className="capture-canvas" />

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
      />

      {/* Photo previews */}
      <PhotoSlots photos={photos} totalPoses={totalPoses} isDone={isDone} />
    </div>
  );
}

export default Capture;

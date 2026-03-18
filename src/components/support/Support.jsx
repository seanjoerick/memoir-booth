import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import { ROUTES } from "@/constants/routes";
import Button from "@/components/common/Button/Button";
import Back from "@/components/common/Button/Back";
import qrCode from "@/assets/images/my-qr-code.png";
import "./Support.css";

function Support() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, []);
    // todo: 25 is the value of the animation duration
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="support-section">
      <div className="support-header">
        <Back />
        <span className="support-label">Support</span>
        <h2 className="support-title" onClick={() => navigate(ROUTES.LANDING)}>
          memoir<span className="support-accent">Booth</span>
        </h2>
        <p className="support-desc">
          If you're enjoying using{" "}
          <strong
            className="support-link"
            onClick={() => navigate(ROUTES.LANDING)}
          >
            memoir<span className="support-accent">Booth</span>
          </strong>
          , feel free to support it with a small tip{" "}
          <span className="support-heart">♡</span>
        </p>
      </div>

      <div className="support-card">
        <div className="support-method">
          <span className="support-method-label">GCASH</span>
          <small>Scan to send support</small>
        </div>

        <div className="qr-wrapper">
          <div className="qr-placeholder">
            <img src={qrCode} alt="QR Code" className="qr-image" />
          </div>
          <p className="qr-caption">
            It’s optional, but every contribution helps improve memoirBooth{" "}
            <span className="support-heart">♡</span>
          </p>

          <Button
            onClick={() => progress === 100 && navigate(ROUTES.CARD)}
            className="progress-btn"
            style={{ "--progress": `${progress}%` }}
          >
            <span className="btn-text">
              {progress < 100 ? `Loading... ${progress}%` : "Choose layout →"}
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Support;

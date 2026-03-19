import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "@/components/common/Button/Button";
import { Camera } from "lucide-react";
import { ROUTES } from "@/constants/routes";
import { LAYOUTS } from "@/constants/index";
import { usePhoto } from "@/context/usePhoto";
import "./Card.css";

function CardLayout() {
  const { setSelectedLayout } = usePhoto();
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);

  const handleConfirm = () => {
    setSelectedLayout(selected);
    navigate(ROUTES.CAPTURE);
  };

  return (
    <>
      <div className="card-header">
        <span className="card-label-tag">Choose Card Layout</span>
        <h2 className="card-title">
          Select your <span className="card-accent">layout</span>
        </h2>
        <p className="card-desc">Pick how many poses you want in your card.</p>
      </div>

      <div className="card-grid">
        {LAYOUTS.map((layout) => (
          <div
            key={layout.id}
            className={`card-item ${selected?.id === layout.id ? "active" : ""}`}
            onClick={() => setSelected(layout)}
          >
            <div className="card-preview">
              {Array.from({ length: layout.poses }).map((_, i) => (
                <div key={i} className="pose-skeleton" />
              ))}
            </div>
            <span className="card-item-label">{layout.label}</span>
            <span className="card-item-size">{layout.size}</span>
          </div>
        ))}
      </div>

      <Button onClick={handleConfirm} disabled={!selected}>
        Start Capture <Camera />
      </Button>
    </>
  );
}

export default CardLayout;

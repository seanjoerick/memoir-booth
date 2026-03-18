import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "@/components/common/Button/Button";
import { Camera } from "lucide-react";
import { ROUTES } from "@/constants/routes";
import { LAYOUTS } from "@/constants/index";
import "./Card.css";

function CardLayout() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
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
            className={`card-item ${selected === layout.id ? "active" : ""}`}
            onClick={() => setSelected(layout.id)}
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
      <Button
        onClick={() => selected && navigate(ROUTES.CAPTURE)}
        disabled={!selected}
      >
        Start Capture <Camera />
      </Button>
    </>
  );
}

export default CardLayout;

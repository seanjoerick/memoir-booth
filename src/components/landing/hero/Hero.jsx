import { useNavigate } from "react-router-dom";
import { LucideCamera } from "lucide-react";

import { ROUTES } from "@/constants/routes";
import "./Hero.css";

function Hero() {
  const navigate = useNavigate();

  return (
    <section className="hero">
      <div className="hero__inner">
        <p className="hero__eyebrow">digital photobooth</p>
        <h1 className="hero__title">
          memoir<span className="hero__accent">Booth</span>
        </h1>
        <p className="hero__sub">
          snap, decorate & print adorable photo strips — keep the memories
          forever
        </p>
        <button className="hero__btn" onClick={() => navigate(ROUTES.START)}>
          start memoir <LucideCamera />
        </button>
        <p className="hero__angel">
          made for my angel <span>♡</span>
        </p>
      </div>
    </section>
  );
}

export default Hero;

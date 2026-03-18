import { ShieldCheck, Zap, Smartphone } from "lucide-react";
import "./Testimonials.css";

function Testimonials() {
  return (
    <section className="testimonials">
      <div className="testimonials__inner">
        <p className="testimonials__eyebrow">Made for your convenience</p>

        <h2 className="testimonials__heading">
          No downloads. <span className="hero__accent">Just memories.</span>
        </h2>

        <p className="testimonials__sub">
          Why go out when you can capture the same aesthetic right here in your
          browser?
        </p>

        <div className="testimonials__grid">
          <div className="t-card">
            <ShieldCheck size={24} className="t-icon" />
            <h3>Privacy First</h3>
            <p>Your photos are processed locally. We don't store your shots.</p>
          </div>

          <div className="t-card">
            <Zap size={24} className="t-icon" />
            <h3>Instant Access</h3>
            <p>No account needed. Just open the link and start snapping.</p>
          </div>

          <div className="t-card">
            <Smartphone size={24} className="t-icon" />
            <h3>Mobile Ready</h3>
            <p>Perfect for iPads, Tablets, and any smartphone browsers.</p>
          </div>
        </div>

        <div className="beta-status">
          <span className="pulse-dot"></span>
          Currently in Beta v0.1 — More layouts coming soon!
        </div>
      </div>
    </section>
  );
}

export default Testimonials;

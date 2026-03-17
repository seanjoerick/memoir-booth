import "./Features.css";
import FEATURES from "@/constants/index";

function Features() {
  return (
    <section className="features">
      <div className="features__inner">
        <p className="features__eyebrow">what you can do</p>
        <h2 className="features__heading">
          Everything you need for <br />
          <span className="hero__accent">the perfect strip.</span>
        </h2>
        <div className="features__grid">
          {FEATURES.map((f, i) => (
            <div key={i} className="features__card">
              <span className="features__icon">{f.icon}</span>
              <h3 className="features__card-title">{f.title}</h3>
              <p className="features__card-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;

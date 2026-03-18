import Particles from "@/components/common/Particles/Particles";
import "./Main.css";

function Main({ children }) {
  return (
    <div className="main-layout">
      <Particles
        particleColors={["#ffffff", "#ffffff", "#ffffff"]}
        particleCount={300}
        particleSpread={8}
        speed={0.5}
        particleBaseSize={100}
        particleSizeVariation={2}
        moveParticlesOnHover={false}
        disableRotation={false}
        pixelRatio={1}
      />
      <div className="content-wrapper">{children}</div>
    </div>
  );
}

export default Main;

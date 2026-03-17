import Particles from "@/components/common/particles/Particles";
import "./Main.css";

function MainLayout({ children }) {
  return (
    <div className="main-layout">
      <Particles
        particleColors={["#000000"]}
        particleCount={300}
        particleSpread={8}
        speed={0.1}
        particleBaseSize={100}
        moveParticlesOnHover={false}
        alphaParticles={false}
        disableRotation={false}
        pixelRatio={1}
      />
      <div className="content-wrapper">{children}</div>
    </div>
  );
}

export default MainLayout;

import Hero from "@/components/landing/hero/Hero";
import Particles from "@/components/common/particles/Particles";
import "./Landing.css";

function Landing() {
  return (
    <main className="landing">
      <Particles
        particleColors={["#000000"]}
        particleCount={300}
        particleSpread={10}
        speed={0.1}
        particleBaseSize={100}
        moveParticlesOnHover={false}
        alphaParticles={false}
        disableRotation={false}
        pixelRatio={1}
      />
      <Hero />
    </main>
  );
}

export default Landing;

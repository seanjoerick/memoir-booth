import Hero from "@/components/landing/hero/Hero";
import Particles from "@/components/common/particles/Particles";
import Features from "@/components/landing/features/Features";
import Testimonials from "@/components/landing/testimonial/Testimonial";
import Footer from "@/components/landing/footer/Footer";

import "./Landing.css";

function Landing() {
  return (
    <main className="landing">
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
      <Hero />
      <Features />
      <Testimonials />
      <Footer />
    </main>
  );
}

export default Landing;

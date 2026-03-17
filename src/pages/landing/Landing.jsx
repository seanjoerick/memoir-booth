import Hero from "@/components/landing/hero/Hero";
import Particles from "@/components/common/particles/Particles";
import Features from "@/components/landing/features/Features";
import Testimonials from "@/components/landing/testimonial/Testimonial";
import Footer from "@/components/landing/footer/Footer";

import "./Landing.css";

function Landing() {
  return (
    <div className="landing">
      <Hero />
      <Features />
      <Testimonials />
      <Footer />
    </div>
  );
}

export default Landing;

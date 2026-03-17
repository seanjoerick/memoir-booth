import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";

function Hero() {
  const navigate = useNavigate();

  return (
    <section className="hero">
      <h1>Welcome to Photobooth</h1>
      <p>Capture your memories in style!</p>
      <button onClick={() => navigate(ROUTES.START)}>Start Camera</button>
    </section>
  );
}

export default Hero;

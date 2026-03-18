import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import "./Back.css";

function BackButton({ className = "" }) {
  const navigate = useNavigate();

  return (
    <button className={`back-button ${className}`} onClick={() => navigate(-1)}>
      <ArrowLeft /> Back
    </button>
  );
}

export default BackButton;

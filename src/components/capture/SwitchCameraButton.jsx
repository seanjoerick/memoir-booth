import React from "react";
import { RefreshCcw } from "lucide-react";

function SwitchCameraButton({ onSwitch, disabled }) {
  return (
    <button
      className="capture-switch-btn"
      onClick={onSwitch}
      disabled={disabled}
      title="Switch camera"
    >
      Flip
      <RefreshCcw size={16} />
    </button>
  );
}

export default SwitchCameraButton;

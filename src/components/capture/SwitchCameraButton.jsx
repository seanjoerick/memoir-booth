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
      <RefreshCcw size={26} />
    </button>
  );
}

export default SwitchCameraButton;

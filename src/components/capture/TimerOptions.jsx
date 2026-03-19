import React from "react";

function TimerOptions({ options, selectedTimer, setSelectedTimer, disabled }) {
  return (
    <div className="capture-timers">
      {options.map((opt) => (
        <button
          key={opt.value}
          className={`capture-timer-btn ${
            selectedTimer === opt.value ? "active" : ""
          }`}
          onClick={() => setSelectedTimer(opt.value)}
          disabled={disabled}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

export default TimerOptions;

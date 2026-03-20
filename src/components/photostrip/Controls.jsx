const BG_COLORS = [
  { label: "White", value: "#ffffff" },
  { label: "Black", value: "#111111" },
  { label: "Blush", value: "#f9dde0" },
  { label: "Sage", value: "#d4e6d4" },
  { label: "Lavender", value: "#e4daf7" },
  { label: "Sky", value: "#d0e8f7" },
  { label: "Peach", value: "#fde8d0" },
];

function Controls({
  stripType,
  setStripType,
  activeBg,
  handlePreset,
  handleCustom,
  customColor,
  handleSave,
  saving,
}) {
  return (
    <>
      <div className="ctrl-tabs">
        <button
          className={`tab-btn ${stripType === "film" ? "tab-active" : ""}`}
          onClick={() => setStripType("film")}
        >
          Film Strip
        </button>
        <button
          className={`tab-btn ${stripType === "color" ? "tab-active" : ""}`}
          onClick={() => setStripType("color")}
        >
          Photo Strip
        </button>
      </div>

      {stripType === "color" && (
        <div className="ctrl-group">
          <span className="ctrl-label">Background</span>
          <div className="color-swatches">
            {BG_COLORS.map((c) => (
              <button
                key={c.value}
                className={`swatch ${activeBg === c.value ? "swatch-active" : ""}`}
                style={{ backgroundColor: c.value }}
                title={c.label}
                onClick={() => handlePreset(c.value)}
              />
            ))}
            <label
              className={`swatch swatch-custom ${activeBg === "custom" ? "swatch-active" : ""}`}
              title="Custom color"
            >
              <span className="swatch-plus">+</span>
              <input
                type="color"
                value={customColor}
                onChange={handleCustom}
                className="hidden-color-input"
              />
            </label>
          </div>
        </div>
      )}

      <button className="save-btn" onClick={handleSave} disabled={saving}>
        {saving ? "Saving..." : "Save Image"}
      </button>
    </>
  );
}

export default Controls;

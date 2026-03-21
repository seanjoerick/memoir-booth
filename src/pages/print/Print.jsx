import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { usePhoto } from "@/context/usePhoto";
import { drawFilmStrip, drawColorStrip } from "@/utils/drawStrip";
import Controls from "@/components/photostrip/Controls";
import FilmStrip from "@/components/photostrip/FilmStrip";
import ColorStrip from "@/components/photostrip/ColorStrip";
import { saveImage } from "@/utils/imageUtils";
import "./Print.css";

export default function PhotoStripPage() {
  const { photos } = usePhoto();
  const displayPhotos = photos.slice(0, 4);

  const [stripType, setStripType] = useState("film");
  const [selectedBg, setSelectedBg] = useState("#ffffff");
  const [customColor, setCustomColor] = useState("#ffffff");
  const [activeBg, setActiveBg] = useState("#ffffff");
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!photos || photos.length === 0) {
      navigate("/");
    }
  }, [photos, navigate]);

  const handlePreset = (v) => {
    setActiveBg(v);
    setSelectedBg(v);
  };
  const handleCustom = (e) => {
    setCustomColor(e.target.value);
    setSelectedBg(e.target.value);
    setActiveBg("custom");
  };

  const handleSave = async () => {
    if (saving) return;
    setSaving(true);
    try {
      const dataUrl =
        stripType === "film"
          ? await drawFilmStrip(displayPhotos)
          : await drawColorStrip(displayPhotos, selectedBg);

      saveImage(dataUrl, `memoirBooth-${stripType}-strip.png`);
    } catch (err) {
      console.error("Save failed:", err);
    } finally {
      setSaving(false);
    }
  };

  const controlProps = {
    stripType,
    setStripType,
    activeBg,
    handlePreset,
    handleCustom,
    customColor,
    handleSave,
    saving,
  };

  return (
    <div className="ps-page">
      <aside className="ps-sidebar">
        <div className="sidebar-logo">
          memoir<span className="sidebar-logo-span">Booth</span>
        </div>
        <Controls {...controlProps} />
      </aside>

      <div className="ps-topbar">
        <Controls {...controlProps} />
      </div>

      <main className="ps-preview">
        <div className="preview-inner">
          <div className="print-only-target">
            {stripType === "film" ? (
              <FilmStrip photos={displayPhotos} />
            ) : (
              <ColorStrip photos={displayPhotos} bgColor={selectedBg} />
            )}
          </div>
        </div>
      </main>

      <div className="ps-bottom-bar">
        <button
          className="save-btn-full"
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? "Saving..." : "Save Image"}
        </button>
      </div>
    </div>
  );
}

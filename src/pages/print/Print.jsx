import { usePhoto } from "@/context/usePhoto";
import "./Print.css";

function PrintPage() {
  const { photos } = usePhoto();

  return (
    <div className="print-page">
      {photos.map((photo, i) => (
        <img
          key={i}
          src={photo.dataUrl}
          alt={`Photo ${i + 1}`}
          className="print-photo"
          style={{ filter: photo.filter }}
        />
      ))}
    </div>
  );
}

export default PrintPage;

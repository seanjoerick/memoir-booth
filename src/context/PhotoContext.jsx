import { useState } from "react";
import { PhotoContext } from "./usePhoto";

export function PhotoProvider({ children }) {
  const [selectedLayout, setSelectedLayout] = useState(null);
  const [photos, setPhotos] = useState([]);

  return (
    <PhotoContext.Provider
      value={{
        selectedLayout,
        setSelectedLayout,
        photos,
        setPhotos,
      }}
    >
      {children}
    </PhotoContext.Provider>
  );
}

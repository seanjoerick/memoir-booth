import { useState } from "react";
import { PhotoContext } from "./usePhoto";

export function PhotoProvider({ children }) {
  const [selectedLayout, setSelectedLayout] = useState(null);

  return (
    <PhotoContext.Provider value={{ selectedLayout, setSelectedLayout }}>
      {children}
    </PhotoContext.Provider>
  );
}

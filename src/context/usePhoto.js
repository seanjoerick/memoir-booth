import { createContext, useContext } from "react";

export const PhotoContext = createContext();

export function usePhoto() {
  return useContext(PhotoContext);
}

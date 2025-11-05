import { useCallback } from "react";
import { useGLTF } from "@react-three/drei";

export const usePreloadStraps = () => {
  const preloadStraps = useCallback(() => {
    useGLTF.preload("/models/BlackLeatherBand.glb");
    useGLTF.preload("/models/BrownLeatherBand.glb");
    useGLTF.preload("/models/BurlingtonLeatherBand.glb");
  }, []);

  return preloadStraps;
};

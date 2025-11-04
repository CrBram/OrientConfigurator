import { create } from "zustand";

export type CameraView = "default" | "face" | "strap" | "knob" | "indicators";

interface CameraPosition {
  position: [number, number, number];
  target: [number, number, number];
}

export const cameraViews: Record<CameraView, CameraPosition> = {
  default: {
    position: [8, 8, 8],
    target: [0, 0, 0],
  },
  face: {
    position: [0, 4, 1],
    target: [0, 0.5, 0],
  },
  strap: {
    position: [-1.6, 1, 4],
    target: [0, -0.5, 0],
  },
  knob: {
    position: [2, 0.5, 1],
    target: [0.8, 0.5, 0],
  },
  indicators: {
    position: [0, 3, 0.2],
    target: [0, 0.5, 0],
  },
};

type CameraStore = {
  cameraView: CameraView;
  setCameraView: (view: CameraView) => void;
};

export const useCameraStore = create<CameraStore>((set) => ({
  cameraView: "default",
  setCameraView: (view) => set({ cameraView: view }),
}));


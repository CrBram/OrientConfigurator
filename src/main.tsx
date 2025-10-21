import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Canvas } from "@react-three/fiber";
import Showcase from "./Showcase.tsx";

const cameraSettings = {
  fov: 45,
  near: 0.1,
  far: 200,
  position: [8, 8, 8] as [number, number, number],
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Canvas camera={cameraSettings} shadows style={{ background: "#DED1B6" }}>
      <Showcase />
    </Canvas>
  </StrictMode>
);

import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Canvas } from "@react-three/fiber";
import Showcase from "./Showcase.tsx";
import { Navigation } from "./components/Navigation.tsx";
import type { CameraView } from "./components/CameraControls.tsx";

const cameraSettings = {
  fov: 45,
  near: 0.1,
  far: 200,
  position: [2, 6, 6] as [number, number, number],
};

function App() {
  const [cameraView, setCameraView] = useState<CameraView>("default");

  return (
    <div className="flex flex-col h-screen">
      <Navigation />

      <div className="flex-1 relative">
        <Canvas
          camera={cameraSettings}
          shadows
          style={{ background: "#ededed" }}
        >
          <Showcase cameraView={cameraView} setCameraView={setCameraView} />
        </Canvas>

        {/* Title overlay */}
        <div className="absolute top-6 left-6 pointer-events-none">
          <h1 className="text-7xl md:text-8xl lg:text-9xl font-bold text-gray-900/70 leading-none tracking-tight select-none">
            <span className="font-light">Orient</span>
            <br />
            Bambino
          </h1>
        </div>

        {/* Back button */}
        {cameraView !== "default" && (
          <div className="back-button-container">
            <button
              className="back-button"
              onClick={() => setCameraView("default")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              <span>Back</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

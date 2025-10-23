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

      <div className="flex-1 relative" style={{ background: "#ededed" }}>
        <div className="absolute top-6 left-6 md:top-8 md:left-8 lg:top-12 lg:left-12 xl:top-16 xl:left-16 pointer-events-none z-0">
          <h1
            className="text-7xl md:text-8xl lg:text-9xl font-bold leading-none tracking-tight select-none"
            style={{ color: "#2B2B2B" }}
          >
            <span className="font-light">Orient</span>
            <br />
            <span className="text-[#b36868]">Bambino</span>
          </h1>
        </div>

        <Canvas
          camera={cameraSettings}
          shadows
          gl={{ alpha: true }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 10,
          }}
        >
          <Showcase cameraView={cameraView} setCameraView={setCameraView} />
        </Canvas>

        {/* Back button */}
        {cameraView !== "default" && (
          <div className="back-button-container" style={{ zIndex: 20 }}>
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

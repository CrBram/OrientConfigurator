import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Canvas } from "@react-three/fiber";
import Showcase from "./Showcase.tsx";
import { ConfigurationPanel } from "./components/ConfigurationPanel.tsx";
import { Menu } from "lucide-react";
import type { CameraView } from "./components/CameraControls.tsx";

const cameraSettings = {
  fov: 45,
  near: 0.1,
  far: 200,
  position: [2, 6, 6] as [number, number, number],
};

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cameraView, setCameraView] = useState<CameraView>("default");

  return (
    <>
      <div className="fixed top-6 left-6 z-20 pointer-events-none">
        <img
          src="/Orient-Logo-text.png"
          alt="Orient"
          className="h-8 md:h-10 opacity-80"
        />
      </div>

      <div className="fixed top-0 left-0 right-0 bottom-0 lg:right-[calc(320px+1.5rem)]">
        <Canvas
          camera={cameraSettings}
          shadows
          style={{ background: "#efefef" }}
        >
          <Showcase cameraView={cameraView} setCameraView={setCameraView} />
        </Canvas>
      </div>

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

      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="lg:hidden fixed top-6 right-6 z-20 p-3 bg-white/95 backdrop-blur-sm rounded-lg shadow-xl"
        aria-label="Toggle configuration menu"
      >
        <Menu className="w-6 h-6" />
      </button>

      {isMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-10"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      <div className={`lg:block ${isMenuOpen ? "block" : "hidden"}`}>
        <ConfigurationPanel onClose={() => setIsMenuOpen(false)} />
      </div>
    </>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

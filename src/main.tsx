import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Canvas } from "@react-three/fiber";
import Showcase from "./Showcase.tsx";
import { Navigation } from "./components/Navigation.tsx";
import { Footer } from "./components/Footer.tsx";
import {
  ComponentOptions,
  type ComponentCategory,
} from "./components/ComponentOptions.tsx";
import type { CameraView } from "./components/CameraControls.tsx";
import componentOptionsData from "./data/componentOptions.json";

const cameraSettings = {
  fov: 45,
  near: 0.1,
  far: 200,
  position: [2, 6, 6] as [number, number, number],
};

function App() {
  const [cameraView, setCameraView] = useState<CameraView>("default");
  const [showDescriptions, setShowDescriptions] = useState(true);
  const [showComponentOptions, setShowComponentOptions] = useState(false);
  const [currentComponentCategory, setCurrentComponentCategory] =
    useState<ComponentCategory | null>(null);

  // Component selection state
  const [selectedComponents, setSelectedComponents] = useState({
    face: "blue-quartz",
    strap: "stainless-steel",
    knob: "single-crown",
    indicators: "roman-indicators",
  });

  const basePrice = 499.99;
  const totalPrice = basePrice + calculateAdditionalPrice();

  function calculateAdditionalPrice(): number {
    let additionalPrice = 0;

    // Add prices for selected components
    Object.entries(selectedComponents).forEach(([category, optionId]) => {
      const categoryData =
        componentOptionsData[category as keyof typeof componentOptionsData];
      const option = categoryData.options.find((opt) => opt.id === optionId);
      if (option) {
        additionalPrice += option.price;
      }
    });

    return additionalPrice;
  }

  const handleCheckout = () => {
    console.log("Checkout initiated for €", totalPrice);
  };

  const toggleDescriptions = () => {
    setShowDescriptions(!showDescriptions);
  };

  const handleHotspotClick = (view: CameraView) => {
    setCameraView(view);

    // Show component options for the clicked hotspot after animation delay
    const categoryKey =
      view === "face"
        ? "face"
        : view === "strap"
        ? "strap"
        : view === "knob"
        ? "knob"
        : "indicators";
    const categoryData = componentOptionsData[categoryKey];
    setCurrentComponentCategory(categoryData);

    // Delay showing options to let camera animation play first
    setTimeout(() => {
      setShowComponentOptions(true);
    }, 800); // 800ms delay to let camera animation complete
  };

  const handleOptionSelect = (optionId: string) => {
    if (!currentComponentCategory) return;

    const categoryKey =
      currentComponentCategory.title.toLowerCase().includes("dial") ||
      currentComponentCategory.title.toLowerCase().includes("face")
        ? "face"
        : currentComponentCategory.title.toLowerCase().includes("strap")
        ? "strap"
        : currentComponentCategory.title.toLowerCase().includes("indicator")
        ? "indicators"
        : "knob";

    setSelectedComponents((prev) => ({
      ...prev,
      [categoryKey]: optionId,
    }));
  };

  const handleCloseComponentOptions = () => {
    setShowComponentOptions(false);
    setCurrentComponentCategory(null);
    setCameraView("default");
  };

  return (
    <div className="flex flex-col h-screen mx-auto w-full max-w-[1920px]">
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
          <Showcase
            cameraView={cameraView}
            showDescriptions={showDescriptions}
            onHotspotClick={handleHotspotClick}
            selectedComponents={selectedComponents}
          />
        </Canvas>

        {/* Component Options Panel */}
        {showComponentOptions && currentComponentCategory && (
          <ComponentOptions
            category={currentComponentCategory}
            selectedOptionId={
              selectedComponents[
                currentComponentCategory.title.toLowerCase().includes("dial") ||
                currentComponentCategory.title.toLowerCase().includes("face")
                  ? "face"
                  : currentComponentCategory.title
                      .toLowerCase()
                      .includes("strap")
                  ? "strap"
                  : currentComponentCategory.title
                      .toLowerCase()
                      .includes("indicator")
                  ? "indicators"
                  : "knob"
              ]
            }
            onOptionSelect={handleOptionSelect}
            onClose={handleCloseComponentOptions}
          />
        )}

        {/* Footer */}
        <Footer
          showDescriptions={showDescriptions}
          onToggleDescriptions={toggleDescriptions}
          totalPrice={totalPrice}
          onCheckout={handleCheckout}
          showComponentOptions={showComponentOptions}
        />
      </div>
    </div>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

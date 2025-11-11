import { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Showcase from "../components/Showcase.tsx";
import { Navigation } from "../components/Navigation.tsx";
import { Footer } from "../components/Footer.tsx";
import {
  ComponentOptions,
  type ComponentCategory,
} from "../components/ComponentOptions.tsx";
import componentOptionsData from "../data/componentOptions.json";
import { useComponentStore } from "../store/componentStore";
import { useCameraStore, type CameraView } from "../store/cameraStore";
import { useCartStore } from "../store/cartStore";
import LoadingScreen from "../components/LoadingScreen";
import CheckoutDrawer from "../components/CheckoutDrawer";
import ThankYou from "../components/ThankYou";
import { usePreloadStraps } from "../hooks/usePreloadStraps";

const cameraSettings = {
  fov: 45,
  near: 0.1,
  far: 200,
  position: [2, 6, 6] as [number, number, number],
};

function Home() {
  const [showDescriptions, setShowDescriptions] = useState(true);
  const [showComponentOptions, setShowComponentOptions] = useState(false);
  const [currentComponentCategory, setCurrentComponentCategory] =
    useState<ComponentCategory | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

  const selectedComponents = useComponentStore((s) => s.selectedComponents);
  const setComponent = useComponentStore((s) => s.setComponent);
  const setDialCase = useComponentStore((s) => s.setDialCase);
  const resetComponents = useComponentStore((s) => s.resetComponents);
  const setCameraView = useCameraStore((s) => s.setCameraView);
  const totalPrice = useCartStore((s) => s.totalPrice);
  const preloadStraps = usePreloadStraps();

  const handleCheckout = () => {
    setIsCheckoutOpen(true);
  };

  const handleBuy = () => {
    setIsCheckoutOpen(false);
    setShowThankYou(true);
  };

  const handleCloseCheckout = () => {
    setIsCheckoutOpen(false);
  };

  const toggleDescriptions = () => {
    setShowDescriptions(!showDescriptions);
  };

  const handleHotspotClick = (view: CameraView) => {
    setCameraView(view);
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

    // Preload strap models when hotspot is clicked
    if (view === "strap") {
      preloadStraps();
    }

    setTimeout(() => {
      setShowComponentOptions(true);
    }, 800);
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

    setComponent(categoryKey as any, optionId);
  };

  const handleCloseComponentOptions = () => {
    setShowComponentOptions(false);
    setCurrentComponentCategory(null);
    setCameraView("default");
  };

  return (
    <div className="flex flex-col h-screen mx-auto w-full max-w-[1920px]">
      {!showThankYou && <Navigation />}

      <div className="flex-1 relative" style={{ background: "#ededed" }}>
        {showThankYou ? (
          <ThankYou
            onBack={() => {
              resetComponents();
              setShowThankYou(false);
            }}
          />
        ) : (
          <>
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
              <Suspense fallback={null}>
                <Showcase
                  showDescriptions={showDescriptions}
                  onHotspotClick={handleHotspotClick}
                  selectedComponents={selectedComponents}
                />
              </Suspense>
            </Canvas>

            <LoadingScreen />

            {showComponentOptions && currentComponentCategory && (
              <ComponentOptions
                category={currentComponentCategory}
                selectedOptionId={
                  selectedComponents[
                    currentComponentCategory.title
                      .toLowerCase()
                      .includes("dial") ||
                    currentComponentCategory.title
                      .toLowerCase()
                      .includes("face")
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
                selectedDialCase={selectedComponents.dialCase}
                onDialCaseSelect={(dialCaseId) => {
                  setDialCase(dialCaseId);
                }}
              />
            )}

            <Footer
              showDescriptions={showDescriptions}
              onToggleDescriptions={toggleDescriptions}
              totalPrice={totalPrice}
              onCheckout={handleCheckout}
              showComponentOptions={showComponentOptions}
            />
            <CheckoutDrawer
              isOpen={isCheckoutOpen}
              onClose={handleCloseCheckout}
              onBuy={handleBuy}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default Home;

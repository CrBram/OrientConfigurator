import LoadingScreen from "@/components/LoadingScreen";
import ProductWatch from "@/components/ProductWatch";
import { useComponentStore } from "@/store/componentStore";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const cameraSettings = {
  fov: 45,
  near: 0.1,
  far: 200,
  position: [2.5, 4, 3.6] as [number, number, number],
};

const Product = () => {
  const selectedComponents = useComponentStore((s) => s.selectedComponents);
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollAmountRef = useRef(0);
  const maxScroll = 2000;
  const navigate = useNavigate();

  const isAtStep3 = scrollProgress >= 2.8;

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      scrollAmountRef.current += e.deltaY;

      scrollAmountRef.current = Math.max(
        0,
        Math.min(maxScroll, scrollAmountRef.current)
      );

      // Calculate progress from 0 to 3 (for three scroll phases)
      const progress = (scrollAmountRef.current / maxScroll) * 3;
      setScrollProgress(progress);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <div
      className="relative h-screen w-full overflow-hidden"
      style={{ background: "#ededed" }}
    >
      <div className="absolute top-6 left-6 md:top-8 md:left-8 lg:top-12 lg:left-12 xl:top-14 xl:left-16 pointer-events-none z-0">
        <h1
          className="text-6xl md:text-7xl lg:text-8xl font-bold leading-none tracking-tight"
          style={{ color: "#2B2B2B" }}
        >
          <span className="font-light">Orient</span>
          <span className="ml-4 text-[#b36868]">Bambino</span>
        </h1>
        <p
          className="text-lg md:text-2xl lg:text-3xl font-light italic mt-1 ml-1.5"
          style={{ color: "#2B2B2B" }}
        >
          When design meets elegance.
        </p>
      </div>

      <div className="absolute top-6 right-6">
        <img
          src="/orient-seeklogo.png"
          alt="Orient Logo"
          className="h-6 w-auto"
        />
      </div>

      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-2 flex flex-col items-center gap-2">
        {isAtStep3 ? (
          <Button
            onClick={() => navigate("/")}
            className="bg-[#b36868] hover:bg-[#a05a5a] text-white px-6 py-3 rounded-full font-medium text-sm md:text-base flex items-center gap-2 cursor-pointer"
          >
            Configure now
            <ArrowRight className="h-4 w-4" />
          </Button>
        ) : (
          <div className="pointer-events-none flex flex-col items-center gap-2">
            <p
              className="text-sm md:text-base font-light"
              style={{ color: "#2B2B2B" }}
            >
              Scroll to learn more
            </p>
            <img
              src="/scroll-icon.png"
              alt="Scroll"
              className="h-6 w-6 md:h-8 md:w-8"
            />
          </div>
        )}
      </div>

      <LoadingScreen />

      <Canvas
        camera={cameraSettings}
        shadows
        gl={{ alpha: true }}
        style={{
          position: "absolute",
          left: 0,
          width: "100%",
          height: "80%",
          zIndex: 1,
          bottom: 0,
        }}
      >
        <Suspense fallback={null}>
          <ProductWatch
            selectedComponents={selectedComponents}
            scrollProgress={scrollProgress}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Product;

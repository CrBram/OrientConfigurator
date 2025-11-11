import LoadingScreen from "@/components/LoadingScreen";
import ProductWatch from "@/components/ProductWatch";
import { useComponentStore } from "@/store/componentStore";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";

const cameraSettings = {
  fov: 45,
  near: 0.1,
  far: 200,
  position: [2, 6, 6] as [number, number, number],
};

const Product = () => {
  const selectedComponents = useComponentStore((s) => s.selectedComponents);

  return (
    <div className="relative h-screen w-full" style={{ background: "#ededed" }}>
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

      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 pointer-events-none z-0 flex flex-col items-center gap-2">
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

      <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 lg:bottom-12 lg:left-12 xl:bottom-14 xl:left-16 pointer-events-none z-0">
        <p
          className="text-xs md:text-sm font-medium"
          style={{ color: "#b36868" }}
        >
          BC.
        </p>
      </div>

      <LoadingScreen />

      <Canvas
        camera={cameraSettings}
        shadows
        gl={{ alpha: true }}
        style={{
          position: "absolute",
          top: 40,
          left: 0,
          width: "100%",
          height: "85%",
          zIndex: 10,
        }}
      >
        <Suspense fallback={null}>
          <ProductWatch selectedComponents={selectedComponents} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Product;

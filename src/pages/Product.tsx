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
      <div className="absolute top-6 left-6 md:top-8 md:left-8 lg:top-12 lg:left-12 xl:top-16 xl:left-16 pointer-events-none z-0">
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
          <ProductWatch selectedComponents={selectedComponents} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Product;

import { OrbitControls, Environment, ContactShadows } from "@react-three/drei";
import { Watch } from "./models/Watch";
import { useCameraAnimation } from "../hooks/useCameraAnimation";
import { useIsMobile } from "../hooks/useIsMobile";

interface ProductWatchProps {
  selectedComponents: {
    face: string;
    strap: string;
    knob: string;
    indicators: string;
    dialCase: string;
  };
}

const ProductWatch = ({ selectedComponents }: ProductWatchProps) => {
  useCameraAnimation();
  const isMobile = useIsMobile();

  return (
    <>
      <OrbitControls
        makeDefault
        enablePan={false}
        minDistance={isMobile ? 2.5 : 3}
        maxDistance={isMobile ? 10 : 8}
        target={[0, 0, 0]}
        enableRotate={false}
        enableZoom={false}
      />
      <Environment preset="sunset" />
      <directionalLight position={[5, 5, 5]} intensity={0.5} castShadow />
      <directionalLight position={[-3, 2, 1]} intensity={0.5} color="#ffa500" />

      <Watch selectedComponents={selectedComponents} />

      <ContactShadows
        position={[0, -2, 0]}
        opacity={0.7}
        scale={10}
        blur={2.5}
        far={6}
      />
    </>
  );
};

export default ProductWatch;

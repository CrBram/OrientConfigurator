import { OrbitControls, Environment, ContactShadows } from "@react-three/drei";
import { Watch } from "./models/Watch";
import { useScrollCameraAnimation } from "../hooks/useScrollCameraAnimation";
import { useIsMobile } from "../hooks/useIsMobile";
import { useThree, useFrame } from "@react-three/fiber";
import { useRef } from "react";

interface ProductWatchProps {
  selectedComponents: {
    face: string;
    strap: string;
    knob: string;
    indicators: string;
    dialCase: string;
  };
  scrollProgress: number;
}

const ProductWatch = ({
  selectedComponents,
  scrollProgress,
}: ProductWatchProps) => {
  const { camera } = useThree();
  const animationProgress = useRef(0);
  const startPos: [number, number, number] = [2.5, 5, 2];
  const endPos: [number, number, number] = [2.5, 4, 2.6];
  const isAnimating = useRef(true);

  useFrame(() => {
    if (isAnimating.current) {
      animationProgress.current += 0.02;
      if (animationProgress.current >= 1) {
        animationProgress.current = 1;
        isAnimating.current = false;
      }
      const t = Math.min(animationProgress.current, 1);
      const eased = t * (2 - t);
      camera.position.set(
        startPos[0] + (endPos[0] - startPos[0]) * eased,
        startPos[1] + (endPos[1] - startPos[1]) * eased,
        startPos[2] + (endPos[2] - startPos[2]) * eased
      );
    }
  });

  useScrollCameraAnimation({
    scrollProgress: isAnimating.current ? 0 : scrollProgress,
    targetPosition: [0, 4, 1],
    targetLookAt: [0, 0.5, 0],
    secondTargetPosition: [2, 0.5, 1],
    secondTargetLookAt: [0.8, 0.5, 0],
    thirdTargetPosition: [-1.6, 1, 4],
    thirdTargetLookAt: [0, -0.5, 0],
  });
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

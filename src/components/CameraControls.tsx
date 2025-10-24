import { useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

export type CameraView = "default" | "face" | "strap" | "knob" | "indicators";

interface CameraPosition {
  position: [number, number, number];
  target: [number, number, number];
}

const cameraViews: Record<CameraView, CameraPosition> = {
  default: {
    position: [8, 8, 8],
    target: [0, 0, 0],
  },
  face: {
    position: [0, 4, 1],
    target: [0, 0.5, 0],
  },
  strap: {
    position: [-1.6, 1, 4],
    target: [0, -0.5, 0],
  },
  knob: {
    position: [2, 0.5, 1],
    target: [0.8, 0.5, 0],
  },
  indicators: {
    position: [0, 3, 0.2],
    target: [0, 0.5, 0],
  },
};

export function useCameraAnimation(
  view: CameraView,
  onAnimationComplete?: () => void
) {
  const { camera, controls } = useThree();
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    if (!controls) return;

    const orbitControls = controls as unknown as OrbitControlsImpl;
    const targetView = cameraViews[view];
    const startPosition = camera.position.clone();
    const startTarget = orbitControls.target.clone();

    const endPosition = new THREE.Vector3(...targetView.position);
    const endTarget = new THREE.Vector3(...targetView.target);

    const duration = 1800;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const eased =
        progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      camera.position.lerpVectors(startPosition, endPosition, eased);

      const currentTarget = new THREE.Vector3().lerpVectors(
        startTarget,
        endTarget,
        eased
      );
      orbitControls.target.copy(currentTarget);
      orbitControls.update();

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        if (onAnimationComplete) {
          onAnimationComplete();
        }
      }
    };

    if (animationRef.current !== null) {
      cancelAnimationFrame(animationRef.current);
    }

    animate();

    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [view, camera, controls, onAnimationComplete]);
}

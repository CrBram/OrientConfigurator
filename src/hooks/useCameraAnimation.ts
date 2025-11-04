import { useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { useCameraStore, cameraViews } from "../store/cameraStore";

export function useCameraAnimation(onAnimationComplete?: () => void) {
  const { camera, controls } = useThree();
  const cameraView = useCameraStore((state) => state.cameraView);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!controls) return;

    const orbitControls = controls as unknown as OrbitControlsImpl;
    const targetView = cameraViews[cameraView];

    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    const tl = gsap.timeline({
      onComplete: () => {
        if (onAnimationComplete) {
          onAnimationComplete();
        }
      },
    });

    tl.to(
      camera.position,
      {
        x: targetView.position[0],
        y: targetView.position[1],
        z: targetView.position[2],
        duration: 1.8,
        ease: "power2.inOut",
      },
      0
    );

    tl.to(
      orbitControls.target,
      {
        x: targetView.target[0],
        y: targetView.target[1],
        z: targetView.target[2],
        duration: 1.8,
        ease: "power2.inOut",
        onUpdate: () => {
          orbitControls.update();
        },
      },
      0
    );

    timelineRef.current = tl;

    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, [cameraView, camera, controls, onAnimationComplete]);
}


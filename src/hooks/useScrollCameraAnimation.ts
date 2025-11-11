import { useThree, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

interface ScrollCameraAnimationProps {
  scrollProgress: number;
  targetPosition?: [number, number, number];
  targetLookAt?: [number, number, number];
  secondTargetPosition?: [number, number, number];
  secondTargetLookAt?: [number, number, number];
  thirdTargetPosition?: [number, number, number];
  thirdTargetLookAt?: [number, number, number];
}

export function useScrollCameraAnimation({
  scrollProgress,
  targetPosition = [0, 0, 0],
  targetLookAt = [0, 0, 0],
  secondTargetPosition,
  secondTargetLookAt,
  thirdTargetPosition,
  thirdTargetLookAt,
}: ScrollCameraAnimationProps) {
  const { camera, controls } = useThree();
  const initialPositionRef = useRef<[number, number, number] | null>(null);
  const initialLookAtRef = useRef<[number, number, number] | null>(null);
  const lerpFactor = 0.15;

  useFrame(() => {
    if (!controls || !camera) return;

    const orbitControls = controls as unknown as OrbitControlsImpl;

    if (initialPositionRef.current === null) {
      initialPositionRef.current = [
        camera.position.x,
        camera.position.y,
        camera.position.z,
      ];
    }

    if (initialLookAtRef.current === null) {
      initialLookAtRef.current = [
        orbitControls.target.x,
        orbitControls.target.y,
        orbitControls.target.z,
      ];
    }

    const [initX, initY, initZ] = initialPositionRef.current;
    const [initLookX, initLookY, initLookZ] = initialLookAtRef.current;

    // Add sticky zones at the end of each phase
    let normalizedProgress = scrollProgress;

    // Phase 1 sticky zone
    if (scrollProgress >= 0.8 && scrollProgress < 1.2) {
      normalizedProgress = 1.0;
    }
    // Phase 2 sticky zone
    else if (scrollProgress >= 1.8 && scrollProgress < 2.2) {
      normalizedProgress = 2.0;
    }
    // Phase 3 sticky zone
    else if (scrollProgress >= 2.8 && scrollProgress <= 3.0) {
      normalizedProgress = 3.0;
    }
    // Phase 1: 0 to 0.8 maps to 0 to 1
    else if (scrollProgress < 0.8) {
      normalizedProgress = scrollProgress / 0.8;
    }
    // Phase 2: 1.2 to 1.8 maps to 1 to 2
    else if (scrollProgress >= 1.2 && scrollProgress < 1.8) {
      normalizedProgress = 1 + (scrollProgress - 1.2) / 0.6;
    }
    // Phase 3: 2.2 to 2.8 maps to 2 to 3
    else if (scrollProgress >= 2.2 && scrollProgress < 2.8) {
      normalizedProgress = 2 + (scrollProgress - 2.2) / 0.6;
    }

    let targetX: number;
    let targetY: number;
    let targetZ: number;
    let targetLookX: number;
    let targetLookY: number;
    let targetLookZ: number;

    if (normalizedProgress <= 1) {
      // Phase 1: initial → first target
      targetX = initX + (targetPosition[0] - initX) * normalizedProgress;
      targetY = initY + (targetPosition[1] - initY) * normalizedProgress;
      targetZ = initZ + (targetPosition[2] - initZ) * normalizedProgress;

      targetLookX =
        initLookX + (targetLookAt[0] - initLookX) * normalizedProgress;
      targetLookY =
        initLookY + (targetLookAt[1] - initLookY) * normalizedProgress;
      targetLookZ =
        initLookZ + (targetLookAt[2] - initLookZ) * normalizedProgress;
    } else if (
      normalizedProgress <= 2 &&
      secondTargetPosition &&
      secondTargetLookAt
    ) {
      // Phase 2: first target → second target
      const phase2Progress = normalizedProgress - 1;
      targetX =
        targetPosition[0] +
        (secondTargetPosition[0] - targetPosition[0]) * phase2Progress;
      targetY =
        targetPosition[1] +
        (secondTargetPosition[1] - targetPosition[1]) * phase2Progress;
      targetZ =
        targetPosition[2] +
        (secondTargetPosition[2] - targetPosition[2]) * phase2Progress;

      targetLookX =
        targetLookAt[0] +
        (secondTargetLookAt[0] - targetLookAt[0]) * phase2Progress;
      targetLookY =
        targetLookAt[1] +
        (secondTargetLookAt[1] - targetLookAt[1]) * phase2Progress;
      targetLookZ =
        targetLookAt[2] +
        (secondTargetLookAt[2] - targetLookAt[2]) * phase2Progress;
    } else if (
      normalizedProgress <= 3 &&
      thirdTargetPosition &&
      thirdTargetLookAt &&
      secondTargetPosition &&
      secondTargetLookAt
    ) {
      // Phase 3: second target → third target
      const phase3Progress = normalizedProgress - 2;
      targetX =
        secondTargetPosition[0] +
        (thirdTargetPosition[0] - secondTargetPosition[0]) * phase3Progress;
      targetY =
        secondTargetPosition[1] +
        (thirdTargetPosition[1] - secondTargetPosition[1]) * phase3Progress;
      targetZ =
        secondTargetPosition[2] +
        (thirdTargetPosition[2] - secondTargetPosition[2]) * phase3Progress;

      targetLookX =
        secondTargetLookAt[0] +
        (thirdTargetLookAt[0] - secondTargetLookAt[0]) * phase3Progress;
      targetLookY =
        secondTargetLookAt[1] +
        (thirdTargetLookAt[1] - secondTargetLookAt[1]) * phase3Progress;
      targetLookZ =
        secondTargetLookAt[2] +
        (thirdTargetLookAt[2] - secondTargetLookAt[2]) * phase3Progress;
    } else {
      targetX = initX + (targetPosition[0] - initX) * normalizedProgress;
      targetY = initY + (targetPosition[1] - initY) * normalizedProgress;
      targetZ = initZ + (targetPosition[2] - initZ) * normalizedProgress;
      targetLookX =
        initLookX + (targetLookAt[0] - initLookX) * normalizedProgress;
      targetLookY =
        initLookY + (targetLookAt[1] - initLookY) * normalizedProgress;
      targetLookZ =
        initLookZ + (targetLookAt[2] - initLookZ) * normalizedProgress;
    }

    camera.position.x += (targetX - camera.position.x) * lerpFactor;
    camera.position.y += (targetY - camera.position.y) * lerpFactor;
    camera.position.z += (targetZ - camera.position.z) * lerpFactor;

    orbitControls.target.x +=
      (targetLookX - orbitControls.target.x) * lerpFactor;
    orbitControls.target.y +=
      (targetLookY - orbitControls.target.y) * lerpFactor;
    orbitControls.target.z +=
      (targetLookZ - orbitControls.target.z) * lerpFactor;

    orbitControls.update();
  });
}

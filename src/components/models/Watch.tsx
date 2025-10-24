import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { SmallCrown } from "./SmallCrown";
import componentOptionsData from "../../data/componentOptions.json";
import { ClassicIndicators } from "./ClassicIndicators";

interface WatchProps {
  selectedComponents: {
    face: string;
    strap: string;
    knob: string;
    indicators: string;
  };
  [key: string]: any;
}

export function Watch({ selectedComponents, ...props }: WatchProps) {
  const { nodes, materials } = useGLTF("/models/OrientWatchShaded.glb") as any;

  // Refs for watch hand groups (these will rotate around the watch center)
  const hourHandGroupRef = useRef<THREE.Group>(null);
  const minuteHandGroupRef = useRef<THREE.Group>(null);
  const secondHandGroupRef = useRef<THREE.Group>(null);

  // Refs for crown animations
  const firstCrownRef = useRef<THREE.Group>(null);
  const secondCrownRef = useRef<THREE.Group>(null);

  // Animation state for crowns
  const [crownAnimationState, setCrownAnimationState] = useState({
    firstCrown: { phase: "hidden", progress: 0 }, // 'hidden', 'sliding', 'visible', 'slidingOut'
    secondCrown: { phase: "hidden", progress: 0 },
  });

  // Glass material
  const glassMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0.0,
      roughness: 0.2,
      transmission: 0.7,
      transparent: true,
      opacity: 0.2,
      ior: 1.5,
      thickness: 0.8,
      clearcoat: 1.0,
      clearcoatRoughness: 0.0,
      envMapIntensity: 1.0,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
  }, []);

  const faceMaterial = useMemo(() => {
    const baseMaterial = materials.Face.clone();

    const faceOption = (componentOptionsData as any).face.options.find(
      (option: any) => option.id === selectedComponents.face
    );

    if (faceOption?.color) {
      baseMaterial.color.setHex(
        parseInt(faceOption.color.replace("#", ""), 16)
      );
    } else {
      console.log("No color found for face option:", selectedComponents.face);
    }

    return baseMaterial;
  }, [materials.Face, selectedComponents.face]);

  // Determine which material to use for the dial based on whether it's the default option
  const dialMaterial = useMemo(() => {
    const faceOption = (componentOptionsData as any).face.options.find(
      (option: any) => option.id === selectedComponents.face
    );

    // Use original material for default option, custom material for others
    return faceOption?.isDefault ? materials.Material : faceMaterial;
  }, [materials.Material, faceMaterial, selectedComponents.face]);

  // Animate watch hands based on current time
  useFrame(() => {
    const now = new Date();
    const hours = now.getHours() % 12; // 12-hour format
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    // Calculate rotations
    // Second hand ticks discretely (no milliseconds for that classic tick)
    const secondAngle = (seconds / 60) * Math.PI * 2;
    // Minute hand moves smoothly with seconds
    const minuteAngle = ((minutes + seconds / 60) / 60) * Math.PI * 2;
    // Hour hand moves smoothly with minutes
    const hourAngle = ((hours + minutes / 60) / 12) * Math.PI * 2;

    // Initial rotations of the hands in the model (need to compensate for these)
    const hourOffset = 0.841;
    const minuteOffset = -0.816;
    const secondOffset = 0.739;

    // Rotate the groups around Y-axis (watch center)
    // Subtract the initial offsets so hands align correctly with current time
    if (hourHandGroupRef.current) {
      hourHandGroupRef.current.rotation.y = -hourAngle - hourOffset;
    }
    if (minuteHandGroupRef.current) {
      minuteHandGroupRef.current.rotation.y = -minuteAngle - minuteOffset;
    }
    if (secondHandGroupRef.current) {
      secondHandGroupRef.current.rotation.y = -secondAngle - secondOffset;
    }
  });

  // Animate crown visibility based on selected knob type
  useFrame((_, delta) => {
    const knobType = selectedComponents.knob;
    const slideDuration = 0.5; // Duration for slide phase

    // First crown: shows for double-crown and triple-crown
    if (firstCrownRef.current) {
      const shouldShow = knobType !== "single-crown";
      const currentState = crownAnimationState.firstCrown;

      if (shouldShow && currentState.phase === "hidden") {
        // Start sliding in
        setCrownAnimationState((prev) => ({
          ...prev,
          firstCrown: { phase: "sliding", progress: 0 },
        }));
      } else if (!shouldShow && currentState.phase === "visible") {
        // Start slide out (reverse animation)
        setCrownAnimationState((prev) => ({
          ...prev,
          firstCrown: { phase: "slidingOut", progress: 0 },
        }));
      }

      // Handle slide phase
      if (currentState.phase === "sliding") {
        const newProgress = Math.min(
          currentState.progress + delta / slideDuration,
          1
        );
        const startX = 0.392 + 0.25;
        const endX = 0.392;
        const currentX = startX + (endX - startX) * newProgress;

        firstCrownRef.current.position.set(currentX, 0.184, -0.06);
        firstCrownRef.current.scale.setScalar(0.4);

        if (newProgress >= 1) {
          // Slide complete
          setCrownAnimationState((prev) => ({
            ...prev,
            firstCrown: { phase: "visible", progress: 1 },
          }));
        } else {
          setCrownAnimationState((prev) => ({
            ...prev,
            firstCrown: { phase: "sliding", progress: newProgress },
          }));
        }
      }

      // Handle slide out phase (reverse animation)
      if (currentState.phase === "slidingOut") {
        const newProgress = Math.min(
          currentState.progress + delta / slideDuration,
          1
        );
        const startX = 0.392; // Current position
        const endX = 0.392 + 0.25; // Off-screen position
        const currentX = startX + (endX - startX) * newProgress;

        firstCrownRef.current.position.set(currentX, 0.184, -0.06);
        firstCrownRef.current.scale.setScalar(0.4);

        if (newProgress >= 1) {
          // Slide out complete, go to hidden
          setCrownAnimationState((prev) => ({
            ...prev,
            firstCrown: { phase: "hidden", progress: 0 },
          }));
        } else {
          setCrownAnimationState((prev) => ({
            ...prev,
            firstCrown: { phase: "slidingOut", progress: newProgress },
          }));
        }
      }

      // Handle visible state (maintain position and scale)
      if (currentState.phase === "visible") {
        firstCrownRef.current.scale.setScalar(0.4);
        firstCrownRef.current.position.set(0.392, 0.184, -0.06);
      }

      // Handle hidden state
      if (currentState.phase === "hidden") {
        firstCrownRef.current.scale.setScalar(0);
        firstCrownRef.current.position.set(0.392 + 0.25, 0.184, -0.06);
      }
    }

    // Second crown: shows only for triple-crown
    if (secondCrownRef.current) {
      const shouldShow = knobType === "triple-crown";
      const currentState = crownAnimationState.secondCrown;

      if (shouldShow && currentState.phase === "hidden") {
        // Start sliding in
        setCrownAnimationState((prev) => ({
          ...prev,
          secondCrown: { phase: "sliding", progress: 0 },
        }));
      } else if (!shouldShow && currentState.phase === "visible") {
        // Start slide out (reverse animation)
        setCrownAnimationState((prev) => ({
          ...prev,
          secondCrown: { phase: "slidingOut", progress: 0 },
        }));
      }

      // Handle slide phase
      if (currentState.phase === "sliding") {
        const newProgress = Math.min(
          currentState.progress + delta / slideDuration,
          1
        );
        const startX = 0.368 + 0.25;
        const endX = 0.368;
        const currentX = startX + (endX - startX) * newProgress;

        secondCrownRef.current.position.set(currentX, 0.184, 0.14);
        secondCrownRef.current.scale.setScalar(0.4);

        if (newProgress >= 1) {
          // Slide complete
          setCrownAnimationState((prev) => ({
            ...prev,
            secondCrown: { phase: "visible", progress: 1 },
          }));
        } else {
          setCrownAnimationState((prev) => ({
            ...prev,
            secondCrown: { phase: "sliding", progress: newProgress },
          }));
        }
      }

      // Handle slide out phase (reverse animation)
      if (currentState.phase === "slidingOut") {
        const newProgress = Math.min(
          currentState.progress + delta / slideDuration,
          1
        );
        const startX = 0.368; // Current position
        const endX = 0.368 + 0.25; // Off-screen position
        const currentX = startX + (endX - startX) * newProgress;

        secondCrownRef.current.position.set(currentX, 0.184, 0.14);
        secondCrownRef.current.scale.setScalar(0.4);

        if (newProgress >= 1) {
          // Slide out complete, go to hidden
          setCrownAnimationState((prev) => ({
            ...prev,
            secondCrown: { phase: "hidden", progress: 0 },
          }));
        } else {
          setCrownAnimationState((prev) => ({
            ...prev,
            secondCrown: { phase: "slidingOut", progress: newProgress },
          }));
        }
      }

      // Handle visible state (maintain position and scale)
      if (currentState.phase === "visible") {
        secondCrownRef.current.scale.setScalar(0.4);
        secondCrownRef.current.position.set(0.368, 0.184, 0.14);
      }

      // Handle hidden state
      if (currentState.phase === "hidden") {
        secondCrownRef.current.scale.setScalar(0);
        secondCrownRef.current.position.set(0.368 + 0.25, 0.184, 0.14);
      }
    }
  });

  return (
    <group {...props} dispose={null}>
      <group position={[-0.003, 0.2, -0.049]} scale={2.565}>
        {/* Roman Numerals - visible when roman-indicators is selected */}
        {selectedComponents.indicators === "roman-indicators" && (
          <>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes["1"].geometry}
              material={materials.Letters}
              position={[0.125, 0.191, -0.233]}
              rotation={[0, -Math.PI / 6, 0]}
              scale={0.39}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes["10"].geometry}
              material={materials.Letters}
              position={[-0.225, 0.191, -0.142]}
              rotation={[0, Math.PI / 3, 0]}
              scale={0.39}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes["11"].geometry}
              material={materials.Letters}
              position={[-0.128, 0.191, -0.233]}
              rotation={[0, Math.PI / 6, 0]}
              scale={0.39}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes["12"].geometry}
              material={materials.Letters}
              position={[-0.003, 0.191, -0.266]}
              scale={0.39}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes["2"].geometry}
              material={materials.Letters}
              position={[0.222, 0.191, -0.143]}
              rotation={[0, -Math.PI / 3, 0]}
              scale={0.39}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes["3"].geometry}
              material={materials.Letters}
              position={[0.265, 0.191, -0.015]}
              rotation={[0, -Math.PI / 2, 0]}
              scale={0.39}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes["4"].geometry}
              material={materials.Letters}
              position={[0.236, 0.191, 0.121]}
              rotation={[Math.PI, -Math.PI / 3, Math.PI]}
              scale={0.39}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes["5"].geometry}
              material={materials.Letters}
              position={[0.14, 0.191, 0.226]}
              rotation={[Math.PI, -Math.PI / 6, Math.PI]}
              scale={0.39}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes["6"].geometry}
              material={materials.Letters}
              position={[-0.002, 0.191, 0.266]}
              scale={0.39}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes["7"].geometry}
              material={materials.Letters}
              position={[-0.138, 0.191, 0.228]}
              rotation={[-Math.PI, Math.PI / 6, -Math.PI]}
              scale={0.39}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes["8"].geometry}
              material={materials.Letters}
              position={[-0.236, 0.191, 0.124]}
              rotation={[-Math.PI, Math.PI / 3, -Math.PI]}
              scale={0.39}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes["9"].geometry}
              material={materials.Letters}
              position={[-0.265, 0.191, -0.015]}
              rotation={[0, Math.PI / 2, 0]}
              scale={0.39}
            />
          </>
        )}
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Automatic.geometry}
          material={materials.Letters}
          position={[-0.002, 0.192, -0.115]}
          scale={0.055}
        />
        {/* Classic Indicators - visible when classic-indicators is selected */}
        {selectedComponents.indicators === "classic-indicators" && (
          <ClassicIndicators position={[0, 0.184, 0.02]} scale={0.389} />
        )}
        {/* Second hand group - rotates around watch center */}
        <group ref={secondHandGroupRef} position={[0, 0.199, 0]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube.geometry}
            material={materials.Letters}
            position={[-0.086, 0.004, 0.094]}
            rotation={[-Math.PI, 0.739, -Math.PI]}
            scale={[0.001, 0.002, 0.164]}
          />
        </group>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder.geometry}
          material={materials["Material.001"]}
          position={[0, 0.199, 0]}
          scale={[0.004, 0.007, 0.004]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder001.geometry}
          material={materials.Knob}
          position={[0.376, 0.184, 0]}
          rotation={[0, 0, -Math.PI / 2]}
          scale={[0.038, 0.011, 0.038]}
        />
        <group
          ref={firstCrownRef}
          position={[0.392, 0.184, -0.06]}
          scale={[0.4, 0.4, 0.4]}
        >
          <SmallCrown rotation={[0, -0.05, 0]} />
        </group>
        <group
          ref={secondCrownRef}
          position={[0.368, 0.184, 0.14]}
          scale={[0.4, 0.4, 0.4]}
        >
          <SmallCrown rotation={[0, -0.6, 0]} />
        </group>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Glass.geometry}
          material={glassMaterial}
          position={[0, 0.173, -0.001]}
          scale={0.39}
        />
        {/* Hour hand group - rotates around watch center */}
        <group ref={hourHandGroupRef} position={[0, 0.199, 0]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Hours.geometry}
            material={materials.Letters}
            position={[-0.071, -0.005, -0.063]}
            rotation={[-0.038, 0.841, -0.022]}
            scale={[0.174, 0.086, 0.105]}
          />
        </group>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Indicator.geometry}
          material={materials.Letters}
          position={[-0.001, 0.201, -0.001]}
          scale={[0.042, 0.028, 0.019]}
        />
        {/* Minute hand group - rotates around watch center */}
        <group ref={minuteHandGroupRef} position={[0, 0.199, 0]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Minutes.geometry}
            material={materials.Letters}
            position={[0.103, 0.004, -0.097]}
            rotation={[0.017, -0.816, -0.002]}
            scale={[0.181, 0.089, 0.154]}
          />
        </group>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Orient.geometry}
          material={materials.Letters}
          position={[-0.001, 0.192, -0.138]}
          scale={0.039}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.StrapChain.geometry}
          material={materials.Band}
          position={[-0.001, 0.167, -1.466]}
          scale={[0.073, 0.016, 0.069]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.StrapChainClosing.geometry}
          material={materials.Band}
          position={[-0.002, -0.6, 0.003]}
          scale={[0.076, 0.023, 0.091]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.StrapClosing.geometry}
          material={materials.Band}
          position={[-0.122, -0.594, -0.001]}
          rotation={[-Math.PI, 0, 0]}
          scale={[0.091, 0.019, 0.101]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.StrapInner001.geometry}
          material={materials.Band}
          position={[-0.001, 0.167, -0.509]}
          scale={[0.073, 0.016, 0.103]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.WatchBack.geometry}
          material={materials.Face}
          position={[0, 0.173, -0.001]}
          scale={0.39}
        />
        <group position={[0, 0.173, -0.001]} scale={0.39}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cylinder004.geometry}
            material={dialMaterial}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cylinder004_1.geometry}
            material={materials.orient_logo_white}
          />
        </group>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.WatchFace.geometry}
          material={materials.Face}
          position={[0, 0.173, -0.001]}
          scale={0.39}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.WaterResistant.geometry}
          material={materials.Letters}
          position={[-0.002, 0.192, 0.143]}
          scale={0.055}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/models/OrientWatchShaded.glb");

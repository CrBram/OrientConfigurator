import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef, useEffect } from "react";
import * as THREE from "three";
import { gsap } from "gsap";
import { SmallCrown } from "./SmallCrown";
import componentOptionsData from "../../data/componentOptions.json";
import { ClassicIndicators } from "./ClassicIndicators";
import { ThinFace } from "./ThinFace";

interface WatchProps {
  selectedComponents: {
    face: string;
    strap: string;
    knob: string;
    indicators: string;
    dialCase: string;
  };
  [key: string]: any;
}

export function Watch({ selectedComponents, ...props }: WatchProps) {
  const { nodes, materials } = useGLTF("/models/OrientWatchShaded.glb") as any;

  const hourHandGroupRef = useRef<THREE.Group>(null);
  const minuteHandGroupRef = useRef<THREE.Group>(null);
  const secondHandGroupRef = useRef<THREE.Group>(null);

  const firstCrownRef = useRef<THREE.Group>(null);
  const secondCrownRef = useRef<THREE.Group>(null);
  const firstCrownTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const secondCrownTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const isInitializedRef = useRef(false);
  const prevKnobRef = useRef<string | null>(null);

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

  const dialMaterial = useMemo(() => {
    const faceOption = (componentOptionsData as any).face.options.find(
      (option: any) => option.id === selectedComponents.face
    );

    return faceOption?.isDefault ? materials.Material : faceMaterial;
  }, [materials.Material, faceMaterial, selectedComponents.face]);

  useFrame(() => {
    const now = new Date();
    const hours = now.getHours() % 12;
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    const secondAngle = (seconds / 60) * Math.PI * 2;
    const minuteAngle = ((minutes + seconds / 60) / 60) * Math.PI * 2;
    const hourAngle = ((hours + minutes / 60) / 12) * Math.PI * 2;

    const hourOffset = 0.841;
    const minuteOffset = -0.816;
    const secondOffset = 0.739;

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

  useEffect(() => {
    const knobType = selectedComponents.knob;
    const showFirst = knobType !== "single-crown";
    const showSecond = knobType === "triple-crown";

    if (firstCrownRef.current) {
      firstCrownRef.current.position.set(showFirst ? 0.392 : 0.392 + 0.25, 0.184, -0.06);
      firstCrownRef.current.scale.setScalar(showFirst ? 0.4 : 0);
    }

    if (secondCrownRef.current) {
      secondCrownRef.current.position.set(showSecond ? 0.368 : 0.368 + 0.25, 0.184, 0.14);
      secondCrownRef.current.scale.setScalar(showSecond ? 0.4 : 0);
    }

    prevKnobRef.current = knobType;
    isInitializedRef.current = true;
  }, []);

  useEffect(() => {
    if (!firstCrownRef.current) return;

    const shouldShow = selectedComponents.knob !== "single-crown";
    const wasShown = prevKnobRef.current ? prevKnobRef.current !== "single-crown" : false;
    const slideDuration = 0.5;

    if (firstCrownTimelineRef.current) {
      firstCrownTimelineRef.current.kill();
    }

    if (!isInitializedRef.current) return;

    if (shouldShow && wasShown) {
      gsap.set(firstCrownRef.current.position, { x: 0.392, y: 0.184, z: -0.06, overwrite: "auto" });
      gsap.set(firstCrownRef.current.scale, { x: 0.4, y: 0.4, z: 0.4, overwrite: "auto" });
    } else if (shouldShow && !wasShown) {
      firstCrownTimelineRef.current = gsap.timeline();
      firstCrownTimelineRef.current
        .set(firstCrownRef.current.scale, { x: 0.4, y: 0.4, z: 0.4, overwrite: "auto" })
        .fromTo(
          firstCrownRef.current.position,
          { x: 0.392 + 0.25, y: 0.184, z: -0.06 },
          { x: 0.392, duration: slideDuration, ease: "power2.out", overwrite: "auto" }
        );
    } else if (!shouldShow && wasShown) {
      firstCrownTimelineRef.current = gsap.timeline();
      firstCrownTimelineRef.current
        .to(firstCrownRef.current.position, {
          x: 0.392 + 0.25,
          duration: slideDuration,
          ease: "power2.in",
          overwrite: "auto",
        })
        .set(firstCrownRef.current.scale, { x: 0, y: 0, z: 0 });
    } else {
      gsap.set(firstCrownRef.current.scale, { x: 0, y: 0, z: 0, overwrite: "auto" });
      gsap.set(firstCrownRef.current.position, { x: 0.392 + 0.25, y: 0.184, z: -0.06, overwrite: "auto" });
    }

    return () => {
      if (firstCrownTimelineRef.current) {
        firstCrownTimelineRef.current.kill();
      }
    };
  }, [selectedComponents.knob]);

  useEffect(() => {
    if (!secondCrownRef.current) return;

    const shouldShow = selectedComponents.knob === "triple-crown";
    const wasShown = prevKnobRef.current ? prevKnobRef.current === "triple-crown" : false;
    const slideDuration = 0.5;

    if (secondCrownTimelineRef.current) {
      secondCrownTimelineRef.current.kill();
    }

    if (!isInitializedRef.current) return;

    if (shouldShow && !wasShown) {
      secondCrownTimelineRef.current = gsap.timeline();
      secondCrownTimelineRef.current
        .set(secondCrownRef.current.scale, { x: 0.4, y: 0.4, z: 0.4, overwrite: "auto" })
        .fromTo(
          secondCrownRef.current.position,
          { x: 0.368 + 0.25, y: 0.184, z: 0.14 },
          { x: 0.368, duration: slideDuration, ease: "power2.out", overwrite: "auto" }
        );
    } else if (!shouldShow && wasShown) {
      secondCrownTimelineRef.current = gsap.timeline();
      secondCrownTimelineRef.current
        .to(secondCrownRef.current.position, {
          x: 0.368 + 0.25,
          duration: slideDuration,
          ease: "power2.in",
          overwrite: "auto",
        })
        .set(secondCrownRef.current.scale, { x: 0, y: 0, z: 0 });
    } else if (shouldShow && wasShown) {
      gsap.set(secondCrownRef.current.position, { x: 0.368, y: 0.184, z: 0.14, overwrite: "auto" });
      gsap.set(secondCrownRef.current.scale, { x: 0.4, y: 0.4, z: 0.4, overwrite: "auto" });
    } else {
      gsap.set(secondCrownRef.current.position, { x: 0.368 + 0.25, y: 0.184, z: 0.14, overwrite: "auto" });
      gsap.set(secondCrownRef.current.scale, { x: 0, y: 0, z: 0, overwrite: "auto" });
    }

    return () => {
      if (secondCrownTimelineRef.current) {
        secondCrownTimelineRef.current.kill();
      }
    };
  }, [selectedComponents.knob]);

  useEffect(() => {
    prevKnobRef.current = selectedComponents.knob;
  }, [selectedComponents.knob]);

  return (
    <group {...props} dispose={null}>
      <group position={[-0.003, 0.2, -0.049]} scale={2.565}>
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
        {selectedComponents.indicators === "classic-indicators" && (
          <ClassicIndicators position={[0, 0.184, 0.02]} scale={0.389} />
        )}
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Automatic.geometry}
          material={materials.Letters}
          position={[-0.002, 0.192, -0.115]}
          scale={0.055}
        />
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
        {selectedComponents.dialCase === "standard-case" && (
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.WatchFace.geometry}
            material={materials.Face}
            position={[0, 0.173, -0.001]}
            scale={0.39}
          />
        )}
        {selectedComponents.dialCase === "thin-case" && (
          <ThinFace position={[0.0048, 0.184, 0.007]} scale={0.3865} />
        )}
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

import { useGLTF } from "@react-three/drei";
import { useMemo } from "react";
import * as THREE from "three";

interface WatchProps {
  [key: string]: any;
}

export function Watch(props: WatchProps) {
  const { nodes, materials } = useGLTF("/models/OrientWatchShaded.glb") as any;

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

  return (
    <group {...props} dispose={null}>
      <group position={[-0.003, 0.2, -0.049]} scale={2.565}>
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
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Automatic.geometry}
          material={materials.Letters}
          position={[-0.002, 0.192, -0.115]}
          scale={0.055}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube.geometry}
          material={materials.Letters}
          position={[-0.086, 0.203, 0.094]}
          rotation={[-Math.PI, 0.739, -Math.PI]}
          scale={[0.001, 0.002, 0.164]}
        />
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
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Glass.geometry}
          material={glassMaterial}
          position={[0, 0.173, -0.001]}
          scale={0.39}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Hours.geometry}
          material={materials.Letters}
          position={[-0.071, 0.194, -0.063]}
          rotation={[-0.038, 0.841, -0.022]}
          scale={[0.174, 0.086, 0.105]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Indicator.geometry}
          material={materials.Letters}
          position={[-0.001, 0.201, -0.001]}
          scale={[0.042, 0.028, 0.019]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Minutes.geometry}
          material={materials.Letters}
          position={[0.103, 0.203, -0.097]}
          rotation={[0.017, -0.816, -0.002]}
          scale={[0.181, 0.089, 0.154]}
        />
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
            material={materials.Material}
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

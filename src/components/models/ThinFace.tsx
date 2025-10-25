import { useGLTF } from "@react-three/drei";
import type { Mesh } from "three";

interface ThinFaceProps {
  [key: string]: any;
}

export function ThinFace(props: ThinFaceProps) {
  const { nodes, materials } = useGLTF("/models/OrientThinFace.glb") as any;
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.WatchFace001 as Mesh).geometry}
        material={materials.Face}
        position={[-0.007, -0.029, -0.018]}
      />
    </group>
  );
}

useGLTF.preload("/models/OrientThinFace.glb");

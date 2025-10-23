import { useGLTF } from "@react-three/drei";
import { Mesh } from "three";

interface SmallCrownProps {
  [key: string]: any;
}

export function SmallCrown(props: SmallCrownProps) {
  const { nodes, materials } = useGLTF("/models/OrientWatchKnob.glb");
  return (
    <group {...props} dispose={null}>
      <group
        position={[-0.051, -0.002, -0.083]}
        rotation={[0, 0.36, -Math.PI / 2]}
        scale={[0.079, 0.023, 0.079]}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={(nodes.Cylinder010 as Mesh).geometry}
          material={materials["Knob.002"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={(nodes.Cylinder010_1 as Mesh).geometry}
          material={materials.Knob}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/models/OrientWatchKnob.glb");

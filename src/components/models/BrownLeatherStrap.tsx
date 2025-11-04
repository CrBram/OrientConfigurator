import { useGLTF } from "@react-three/drei";
import { Mesh } from "three";

interface ModelProps {
  [key: string]: any;
}

export function BrownLeatherStrap(props: ModelProps) {
  const { nodes, materials } = useGLTF("/models/BrownLeatherStrap.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.ShortConnect001 as Mesh).geometry}
        material={materials.Leather2}
        position={[-0.209, 0.149, -3.37]}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={0.383}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.Pin as Mesh).geometry}
        material={materials.Face}
        position={[-0.213, -1.771, -0.243]}
        rotation={[1.443, 0, 0]}
        scale={[0.009, 0.233, 0.01]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.LongStrap002 as Mesh).geometry}
        material={materials.Leather2}
        position={[-0.236, 0.246, -0.52]}
        scale={0.383}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.Connector001 as Mesh).geometry}
        material={materials["Face.001"]}
        position={[-0.211, -1.811, -0.257]}
        rotation={[-0.059, 0, 0]}
        scale={[0.478, 0.019, 0.286]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.Connector as Mesh).geometry}
        material={materials.Face}
        position={[-0.211, -1.811, -0.257]}
        rotation={[-0.059, 0, 0]}
        scale={[0.478, 0.019, 0.286]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.Bind2 as Mesh).geometry}
        material={materials.Leather2}
        position={[-0.207, -1.709, -0.846]}
        rotation={[-1.229, -Math.PI / 2, 0]}
        scale={[-0.097, -0.091, -0.493]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.Bind1 as Mesh).geometry}
        material={materials.Leather2}
        position={[-0.207, -1.521, -1.373]}
        rotation={[-1.229, -Math.PI / 2, 0]}
        scale={[-0.117, -0.093, -0.493]}
      />
    </group>
  );
}

useGLTF.preload("/models/BrownLeatherStrap.glb");

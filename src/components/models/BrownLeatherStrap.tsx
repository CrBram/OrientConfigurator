import { useGLTF } from "@react-three/drei";
import { Mesh } from "three";

interface BrownLeatherStrapProps {
  [key: string]: any;
}

export function BrownLeatherStrap(props: BrownLeatherStrapProps) {
  const { nodes, materials } = useGLTF("/models/BrownLeatherBand.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.Connector001 as Mesh).geometry}
        material={materials["Face.001"]}
        position={[11.362, -1.982, -0.257]}
        rotation={[-0.059, 0, 0]}
        scale={[0.478, 0.019, 0.286]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.ShortConnect001 as Mesh).geometry}
        material={materials["Leather.005"]}
        position={[11.363, -0.022, -3.37]}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={0.383}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.LongStrap002 as Mesh).geometry}
        material={materials["Leather.005"]}
        position={[11.349, 0.076, -0.52]}
        scale={0.383}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.Cylinder002 as Mesh).geometry}
        material={materials["Leather.005"]}
        position={[11.374, -1.879, -0.846]}
        rotation={[-1.229, -Math.PI / 2, 0]}
        scale={[-0.097, -0.091, -0.493]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.Cylinder003 as Mesh).geometry}
        material={materials["Leather.005"]}
        position={[11.365, -1.691, -1.373]}
        rotation={[-1.229, -Math.PI / 2, 0]}
        scale={[-0.117, -0.093, -0.493]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.Connector as Mesh).geometry}
        material={materials.Face}
        position={[11.362, -1.982, -0.257]}
        rotation={[-0.059, 0, 0]}
        scale={[0.478, 0.019, 0.286]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.Pin as Mesh).geometry}
        material={materials.Face}
        position={[11.374, -1.942, -0.243]}
        rotation={[1.443, 0, 0]}
        scale={[0.009, 0.233, 0.01]}
      />
    </group>
  );
}

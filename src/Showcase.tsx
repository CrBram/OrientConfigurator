import { OrbitControls, Environment } from "@react-three/drei";
import { Watch } from "./components/models/Watch";

const Showcase = () => {
  return (
    <>
      {/* Controls */}
      <OrbitControls makeDefault />

      {/* Natural Environment Lighting */}
      <Environment preset="sunset" />

      {/* Enhanced Lighting Setup */}
      <directionalLight position={[5, 5, 5]} intensity={0.5} castShadow />
      <directionalLight position={[-3, 2, 1]} intensity={0.5} color="#ffa500" />
      <ambientLight intensity={0.3} />

      {/* Display Box */}
      <mesh position={[0, -2, 0]} receiveShadow>
        <boxGeometry args={[4, 0.2, 4]} />
        <meshStandardMaterial color="#C6AC8F" roughness={0.2} metalness={0.4} />
      </mesh>

      {/* Models */}
      <Watch />
    </>
  );
};

export default Showcase;

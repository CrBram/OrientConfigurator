import { OrbitControls, Environment, ContactShadows } from "@react-three/drei";
import { Watch } from "./components/models/Watch";

const Showcase = () => {
  return (
    <>
      {/* Controls */}
      <OrbitControls
        makeDefault
        enablePan={false}
        minDistance={3}
        maxDistance={8}
        target={[0, 0, 0]}
      />

      {/* Natural Environment Lighting */}
      <Environment preset="sunset" />

      {/* Enhanced Lighting Setup */}
      <directionalLight position={[5, 5, 5]} intensity={0.5} castShadow />
      <directionalLight position={[-3, 2, 1]} intensity={0.5} color="#ffa500" />

      {/* Models */}
      <Watch />

      {/* Ground Shadow */}
      <ContactShadows
        position={[0, -2, 0]}
        opacity={0.7}
        scale={10}
        blur={2.5}
        far={6}
      />
    </>
  );
};

export default Showcase;

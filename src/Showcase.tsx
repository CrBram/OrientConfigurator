import { OrbitControls, Environment, ContactShadows } from "@react-three/drei";
import { Watch } from "./components/models/Watch";
import { Hotspot } from "./components/Hotspot";
import { useCameraAnimation } from "./components/CameraControls";
import type { CameraView } from "./components/CameraControls";

interface ShowcaseProps {
  cameraView: CameraView;
  setCameraView: (view: CameraView) => void;
}

const Showcase = ({ cameraView, setCameraView }: ShowcaseProps) => {
  useCameraAnimation(cameraView);

  const handleHotspotClick = (view: CameraView) => {
    setCameraView(view);
  };

  return (
    <>
      <OrbitControls
        makeDefault
        enablePan={false}
        minDistance={3}
        maxDistance={8}
        target={[0, 0, 0]}
      />
      <Environment preset="sunset" />
      <directionalLight position={[5, 5, 5]} intensity={0.5} castShadow />
      <directionalLight position={[-3, 2, 1]} intensity={0.5} color="#ffa500" />

      <Watch />

      {cameraView === "default" && (
        <>
          <Hotspot
            position={[-0.2, 0.7, 0]}
            targetPosition={[-1.2, 1.2, 0]}
            label="Face"
            onClick={() => handleHotspotClick("face")}
          />
          <Hotspot
            position={[0, 0.52, 1.8]}
            targetPosition={[0, 0.75, 1.8]}
            label="Strap"
            onClick={() => handleHotspotClick("strap")}
          />
          <Hotspot
            position={[1.02, 0.7, 0]}
            targetPosition={[1.8, 1, 0.5]}
            label="Crown"
            onClick={() => handleHotspotClick("knob")}
          />
        </>
      )}

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

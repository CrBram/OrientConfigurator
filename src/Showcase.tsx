import { OrbitControls, Environment, ContactShadows } from "@react-three/drei";
import { Watch } from "./components/models/Watch";
import { Hotspot } from "./components/Hotspot";
import { useCameraAnimation } from "./components/CameraControls";
import type { CameraView } from "./components/CameraControls";
import { useIsMobile } from "./hooks/useIsMobile";
import componentOptionsData from "./data/componentOptions.json";

interface ShowcaseProps {
  cameraView: CameraView;
  showDescriptions: boolean;
  onHotspotClick: (view: CameraView) => void;
  selectedComponents: {
    face: string;
    strap: string;
    knob: string;
  };
}

const Showcase = ({
  cameraView,
  showDescriptions,
  onHotspotClick,
  selectedComponents,
}: ShowcaseProps) => {
  useCameraAnimation(cameraView);
  const isMobile = useIsMobile();

  // Helper function to get component name by category and option ID
  const getComponentName = (category: string, optionId: string): string => {
    const categoryData =
      componentOptionsData[category as keyof typeof componentOptionsData];
    const option = categoryData?.options.find((opt) => opt.id === optionId);
    return option?.name || "Unknown";
  };

  return (
    <>
      <OrbitControls
        makeDefault
        enablePan={false}
        minDistance={isMobile ? 2.5 : 3}
        maxDistance={isMobile ? 10 : 8}
        target={[0, 0, 0]}
      />
      <Environment preset="sunset" />
      <directionalLight position={[5, 5, 5]} intensity={0.5} castShadow />
      <directionalLight position={[-3, 2, 1]} intensity={0.5} color="#ffa500" />

      <Watch selectedComponents={selectedComponents} />

      {cameraView === "default" && (
        <>
          <Hotspot
            position={[-0.2, 0.7, 0]}
            targetPosition={[-1.2, 1.2, 0]}
            componentName={getComponentName("face", selectedComponents.face)}
            onClick={() => onHotspotClick("face")}
            showDescriptions={showDescriptions}
          />
          <Hotspot
            position={[0, 0.52, 1.8]}
            targetPosition={[0, 0.75, 1.8]}
            componentName={getComponentName("strap", selectedComponents.strap)}
            onClick={() => onHotspotClick("strap")}
            showDescriptions={showDescriptions}
          />
          <Hotspot
            position={[1.02, 0.7, 0]}
            targetPosition={[1.8, 1, 0.5]}
            componentName={getComponentName("knob", selectedComponents.knob)}
            onClick={() => onHotspotClick("knob")}
            showDescriptions={showDescriptions}
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

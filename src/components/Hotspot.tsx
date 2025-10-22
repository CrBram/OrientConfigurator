import { Html } from "@react-three/drei";
import { Line } from "@react-three/drei";
import { useState } from "react";
import * as THREE from "three";

interface HotspotProps {
  position: [number, number, number]; // Position on the watch
  targetPosition: [number, number, number]; // Where the circle appears
  label: string;
  onClick: () => void;
}

export function Hotspot({
  position,
  targetPosition,
  label,
  onClick,
}: HotspotProps) {
  const [hovered, setHovered] = useState(false);

  const points = [
    new THREE.Vector3(...position),
    new THREE.Vector3(...targetPosition),
  ];

  return (
    <group>
      <Line
        points={points}
        color={hovered ? "#ffffff" : "#8b8b8b"}
        lineWidth={hovered ? 2 : 1}
        transparent
        opacity={hovered ? 0.9 : 0.6}
      />
      <mesh position={position}>
        <sphereGeometry args={[0.02, 16, 16]} />
        <meshBasicMaterial
          color={hovered ? "#ffffff" : "#8b8b8b"}
          transparent
          opacity={hovered ? 1 : 0.8}
        />
      </mesh>

      <Html position={targetPosition} center distanceFactor={6}>
        <div
          className="hotspot-container"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={onClick}
        >
          <div className={`hotspot-circle ${hovered ? "hovered" : ""}`}>
            <div className="hotspot-pulse" />
          </div>
          <div className={`hotspot-label ${hovered ? "visible" : ""}`}>
            {label}
          </div>
        </div>
      </Html>
    </group>
  );
}

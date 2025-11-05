import { useEffect, useMemo, useRef, useState } from "react";
import { useProgress } from "@react-three/drei";
import { gsap } from "gsap";

interface LoadingScreenProps {
  logoSrc?: string;
  customDuration?: number;
  customMessage?: string;
}

const LoadingScreen = ({
  logoSrc = "/OrientLogoFull.png",
  customDuration,
  customMessage,
}: LoadingScreenProps) => {
  const { progress, active } = useProgress();
  const [isVisible, setIsVisible] = useState(true);
  const [customProgress, setCustomProgress] = useState(0);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const barRef = useRef<HTMLDivElement | null>(null);
  const barFillRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const hasFadedRef = useRef(false);

  const isCustomMode = customDuration !== undefined;
  const effectiveProgress = isCustomMode ? customProgress : progress;
  const clampedProgress = useMemo(
    () => Math.max(0, Math.min(100, effectiveProgress)),
    [effectiveProgress]
  );

  useEffect(() => {
    if (!isCustomMode || !customDuration) return;
    setIsVisible(true);
    setCustomProgress(0);
    hasFadedRef.current = false;
    const start = Date.now();
    const id = setInterval(() => {
      const elapsed = Date.now() - start;
      const p = Math.min((elapsed / customDuration) * 100, 100);
      setCustomProgress(p);
      if (p >= 100) {
        clearInterval(id);
        if (containerRef.current && !hasFadedRef.current) {
          hasFadedRef.current = true;
          const tl = gsap.timeline({ onComplete: () => setIsVisible(false) });
          tl.to({}, { duration: 0.1 })
            .to(
              contentRef.current,
              { opacity: 0, duration: 0.35, ease: "power2.inOut" },
              0
            )
            .to(containerRef.current, {
              autoAlpha: 0,
              duration: 0.6,
              ease: "power3.inOut",
            });
        }
      }
    }, 16);
    return () => clearInterval(id);
  }, [isCustomMode, customDuration]);

  useEffect(() => {
    if (!barFillRef.current || !barRef.current) return;
    const width = clampedProgress;
    gsap.to(barFillRef.current, {
      width: `${width}%`,
      duration: 0.4,
      ease: "power3.out",
    });
  }, [clampedProgress]);

  useEffect(() => {
    if (isCustomMode || !containerRef.current) return;
    if (!active && clampedProgress >= 100 && !hasFadedRef.current) {
      hasFadedRef.current = true;
      const tl = gsap.timeline({ onComplete: () => setIsVisible(false) });
      tl.to({}, { duration: 0.1 })
        .to(
          contentRef.current,
          { opacity: 0, duration: 0.35, ease: "power2.inOut" },
          0
        )
        .to(containerRef.current, {
          autoAlpha: 0,
          duration: 0.6,
          ease: "power3.inOut",
        });
    }
  }, [active, clampedProgress, isCustomMode]);

  if (!isVisible) return null;

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#ededed",
        zIndex: 999,
      }}
    >
      <div
        ref={contentRef}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 24,
          padding: 24,
        }}
      >
        <img
          src={logoSrc}
          alt="Orient"
          style={{
            width: 180,
            height: "auto",
            opacity: 0.9,
            filter: "grayscale(100%)",
          }}
          draggable={false}
        />
        <div style={{ color: "#2B2B2B", fontWeight: 500, letterSpacing: 0.5 }}>
          {customMessage !== undefined
            ? customMessage
            : `${Math.round(clampedProgress)}%`}
        </div>
        <div
          ref={barRef}
          style={{
            width: 260,
            height: 3,
            background: "#d7d7d7",
            borderRadius: 2,
            overflow: "hidden",
          }}
        >
          <div
            ref={barFillRef}
            style={{
              width: 0,
              height: "100%",
              background: "#b36868",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;

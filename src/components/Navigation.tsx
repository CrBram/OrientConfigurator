import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useComponentStore } from "@/store/componentStore";
import { useCameraStore } from "@/store/cameraStore";

// Store previous pathname outside component to persist across remounts
let previousPathname: string | null = null;

export function Navigation() {
  const location = useLocation();
  const resetComponents = useComponentStore((s) => s.resetComponents);
  const setCameraView = useCameraStore((s) => s.setCameraView);
  const isConfigurator = location.pathname === "/configurator";
  const isHome = location.pathname === "/";

  useEffect(() => {
    const currentPath = location.pathname;

    if (previousPathname !== null && previousPathname !== currentPath) {
      resetComponents();
      setCameraView("default");
    }

    previousPathname = currentPath;
  }, [location.pathname, resetComponents, setCameraView]);

  return (
    <nav className="px-6 py-6 pb-1 md:px-8 lg:px-12 xl:px-16">
      <div className="flex items-center justify-between bg-[#fff9f9] rounded-[5rem] shadow-sm py-4 px-8">
        <Link to="/">
          <img
            src="/orient-seeklogo.png"
            alt="Orient"
            className="h-6 md:h-7 cursor-pointer"
          />
        </Link>
        <div className="flex items-center gap-3 sm:gap-6">
          <Link
            to="/"
            className={`text-sm md:text-sm font-medium transition-colors ${
              isHome
                ? "text-[#b36868] font-semibold"
                : "text-secondary-foreground hover:text-[#b36868]"
            }`}
          >
            Home
          </Link>
          <Link
            to="/configurator"
            className={`text-sm md:text-sm font-medium transition-colors ${
              isConfigurator
                ? "text-[#b36868] font-semibold"
                : "text-secondary-foreground hover:text-[#b36868]"
            }`}
          >
            Configurator
          </Link>
          <p className="ml-2 sm:ml-4 font-semibold text-xs text-secondary-foreground">
            <span className="text-accent font-bold">BC.</span>
          </p>
        </div>
      </div>
    </nav>
  );
}

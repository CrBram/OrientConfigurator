import { Card } from "./ui/card";
import { Tag } from "lucide-react";

interface ToggleIconProps {
  isEnabled: boolean;
  onToggle: () => void;
}

export function ToggleIcon({ isEnabled, onToggle }: ToggleIconProps) {
  return (
    <Card className="bg-[#fff9f9] backdrop-blur-sm border-gray-200 shadow-lg rounded-[5rem] py-1 px-1">
      <button
        onClick={onToggle}
        className="flex items-center justify-center w-8 h-8 rounded-[5rem] cursor-pointer transition-colors duration-200"
        style={{
          backgroundColor: isEnabled
            ? "rgba(43, 43, 43, 0.9)"
            : "rgba(43, 43, 43, 0.3)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = isEnabled
            ? "rgba(30, 30, 30, 0.95)"
            : "rgba(43, 43, 43, 0.5)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = isEnabled
            ? "rgba(43, 43, 43, 0.9)"
            : "rgba(43, 43, 43, 0.3)";
        }}
      >
        <Tag size={16} color="white" strokeWidth={2} />
      </button>
    </Card>
  );
}

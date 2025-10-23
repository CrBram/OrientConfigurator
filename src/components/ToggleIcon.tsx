import { Card } from "./ui/card";

interface ToggleIconProps {
  isEnabled: boolean;
  onToggle: () => void;
}

export function ToggleIcon({ isEnabled, onToggle }: ToggleIconProps) {
  return (
    <Card className="bg-white/90 backdrop-blur-sm border-gray-200 shadow-lg rounded-[5rem] py-1 px-1">
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
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {isEnabled ? (
            <>
              <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
              <line x1="1" y1="1" x2="23" y2="23" />
            </>
          ) : (
            <>
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </>
          )}
        </svg>
      </button>
    </Card>
  );
}

import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { ArrowRightToLine, ArrowLeftToLine } from "lucide-react";

export interface ComponentOption {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  isDefault: boolean;
}

export interface ComponentCategory {
  title: string;
  description: string;
  options: ComponentOption[];
}

interface ComponentOptionsProps {
  category: ComponentCategory;
  selectedOptionId: string;
  onOptionSelect: (optionId: string) => void;
  onClose: () => void;
}

export function ComponentOptions({
  category,
  selectedOptionId,
  onOptionSelect,
  onClose,
}: ComponentOptionsProps) {
  const [hoveredOption, setHoveredOption] = useState<string | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="fixed top-6 right-6 md:top-8 md:right-8 lg:top-24 lg:right-12 xl:top-32 xl:right-16 z-50 max-w-sm component-options-panel">
      {isCollapsed ? (
        /* Collapsed State - ToggleIcon Style */
        <Card className="bg-[#fff9f9] backdrop-blur-sm border-gray-200 shadow-lg rounded-[5rem] py-1 px-1">
          <button
            onClick={() => setIsCollapsed(false)}
            className="flex items-center justify-center w-8 h-8 rounded-[5rem] cursor-pointer transition-colors duration-200"
            style={{
              backgroundColor: "rgba(43, 43, 43, 0.9)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(30, 30, 30, 0.95)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(43, 43, 43, 0.9)";
            }}
            title="Expand options"
          >
            <ArrowLeftToLine size={16} color="white" strokeWidth={2} />
          </button>
        </Card>
      ) : (
        /* Expanded State - Full Panel */
        <Card className="bg-[#fff9f9] backdrop-blur-md border-0 shadow-xl rounded-2xl overflow-hidden">
          {/* Expanded State - Full Header */}
          <div className="p-4 border-b border-gray-200/50">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-bold text-gray-900">
                {category.title}
              </h2>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsCollapsed(true)}
                  className="text-gray-500 hover:text-gray-900 p-1 cursor-pointer transition-colors duration-200 rounded-md hover:bg-gray-200/80"
                  title="Collapse options"
                >
                  <ArrowRightToLine size={16} strokeWidth={2} />
                </button>
                <button
                  onClick={onClose}
                  className="text-gray-500 hover:text-gray-900 p-1 cursor-pointer transition-colors duration-200 rounded-md hover:bg-gray-200/80"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <p className="text-sm text-gray-600">{category.description}</p>
          </div>

          {/* Expanded View - Show All Options */}
          <div className="max-h-96 overflow-y-auto">
            <div className="p-2 space-y-2">
              {category.options.map((option) => (
                <div
                  key={option.id}
                  className={`relative group cursor-pointer transition-all duration-200 rounded-xl overflow-hidden ${
                    selectedOptionId === option.id
                      ? "ring-2 ring-[#b36868] ring-offset-1"
                      : "hover:bg-gray-50/50"
                  }`}
                  onClick={() => onOptionSelect(option.id)}
                  onMouseEnter={() => setHoveredOption(option.id)}
                  onMouseLeave={() => setHoveredOption(null)}
                >
                  <div className="p-3">
                    <div className="flex items-center gap-3">
                      {/* Image Placeholder */}
                      <div className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-gray-500"
                        >
                          <rect
                            x="3"
                            y="3"
                            width="18"
                            height="18"
                            rx="2"
                            ry="2"
                          />
                          <circle cx="8.5" cy="8.5" r="1.5" />
                          <polyline points="21,15 16,10 5,21" />
                        </svg>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-semibold text-gray-900 text-sm truncate">
                            {option.name}
                          </h3>
                          <div className="flex items-center gap-2">
                            {option.isDefault && (
                              <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">
                                Default
                              </span>
                            )}
                            {option.price > 0 && (
                              <span className="text-[#b36868] font-semibold text-sm">
                                +${option.price.toFixed(0)}
                              </span>
                            )}
                          </div>
                        </div>
                        <p className="text-gray-600 text-xs leading-relaxed line-clamp-2">
                          {option.description}
                        </p>
                      </div>

                      {/* Selection Indicator - Fixed width to prevent layout shift */}
                      <div className="w-5 h-5 flex-shrink-0">
                        {selectedOptionId === option.id && (
                          <div className="w-5 h-5 bg-[#b36868] rounded-full flex items-center justify-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="10"
                              height="10"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="white"
                              strokeWidth="3"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <polyline points="20,6 9,17 4,12" />
                            </svg>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Hover Effect */}
                  {hoveredOption === option.id &&
                    selectedOptionId !== option.id && (
                      <div className="absolute inset-0 bg-[#b36868]/5 pointer-events-none" />
                    )}
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200/50 bg-gray-50/30">
            <Button
              onClick={onClose}
              className="w-full bg-[#b36868] hover:bg-[#a55a5a] text-white text-sm py-2 cursor-pointer"
            >
              Done
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}

import { useMemo } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { useComponentStore } from "../store/componentStore";
import { useCartStore } from "../store/cartStore";
import componentOptionsData from "../data/componentOptions.json";

type CheckoutDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  onBuy: () => void;
};

export function CheckoutDrawer({
  isOpen,
  onClose,
  onBuy,
}: CheckoutDrawerProps) {
  const selectedComponents = useComponentStore((s) => s.selectedComponents);
  const basePrice = useCartStore((s) => s.basePrice);
  const additionalPrice = useCartStore((s) => s.additionalPrice);
  const totalPrice = useCartStore((s) => s.totalPrice);

  const items = useMemo(() => {
    const map: Array<{
      key: string;
      title: string;
      name: string;
      price: number;
    }> = [];

    const mapCategory = (
      key: "face" | "dialCase" | "strap" | "knob" | "indicators",
      title: string
    ) => {
      const optionId =
        selectedComponents[key as keyof typeof selectedComponents];
      const data = componentOptionsData[key];
      if (!data) return;
      const opt = data.options.find((o) => o.id === optionId);
      if (!opt) return;
      map.push({ key, title, name: opt.name, price: opt.price ?? 0 });
    };

    mapCategory("face", "Dial");
    mapCategory("dialCase", "Dial Case Size");
    mapCategory("strap", "Strap");
    mapCategory("knob", "Crown");
    mapCategory("indicators", "Indicators");

    return map;
  }, [selectedComponents]);

  return (
    <div
      className={`fixed inset-0 z-[100] transition ${
        isOpen ? "pointer-events-auto" : "pointer-events-none"
      }`}
      aria-hidden={!isOpen}
    >
      <div
        className={`absolute inset-0 bg-black/30 transition-opacity ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      <div
        className={`absolute right-0 top-0 h-full w-full md:w-[480px] transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <Card className="h-full w-full bg-[#fff9f9] border-gray-200 rounded-none shadow-xl flex flex-col">
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200/70">
            <h2 className="text-lg font-semibold text-gray-900">
              Your Selection
            </h2>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-3 space-y-1">
            {items.map((it) => (
              <div
                key={it.key}
                className="flex items-center justify-between gap-3"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-base font-semibold text-gray-900 truncate">
                    {it.title}
                  </p>
                  <p className="text-[15px] text-gray-700 truncate">
                    {it.name}
                  </p>
                </div>
                {it.price > 0 && (
                  <div className="text-sm font-semibold text-accent whitespace-nowrap">
                    +€{it.price.toFixed(2)}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="px-6 py-4 border-t border-gray-200/70 space-y-2">
            <div className="flex justify-between text-sm text-gray-700">
              <span>Base price</span>
              <span>€{basePrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-700">
              <span>Customizations</span>
              <span className="text-accent font-medium">
                €{additionalPrice.toFixed(2)}
              </span>
            </div>
            <div className="h-[1px] bg-gray-200 my-1" />
            <div className="flex justify-between text-base font-semibold text-gray-900">
              <span>Total</span>
              <span>€{totalPrice.toFixed(2)}</span>
            </div>
          </div>

          <div className="px-6 pb-6 pt-2 flex gap-3">
            <Button
              onClick={onBuy}
              className="cursor-pointer flex-1 text-white rounded-[5rem] py-5 cursor-pointer"
              style={{ backgroundColor: "rgba(43,43,43,0.95)" }}
            >
              Buy
            </Button>
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1 rounded-[5rem] py-5 border-gray-300 cursor-pointer hover:bg-gray-100 hover:text-gray-900"
            >
              Cancel
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default CheckoutDrawer;

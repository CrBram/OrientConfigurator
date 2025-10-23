import { ToggleIcon } from "./ToggleIcon";
import { CheckoutCard } from "./CheckoutCard";

interface FooterProps {
  showDescriptions: boolean;
  onToggleDescriptions: () => void;
  totalPrice: number;
  onCheckout: () => void;
  showComponentOptions: boolean;
}

export function Footer({
  showDescriptions,
  onToggleDescriptions,
  totalPrice,
  onCheckout,
  showComponentOptions,
}: FooterProps) {
  return (
    <div
      className={`fixed bottom-6 left-6 right-6 md:left-8 md:right-8 lg:left-12 lg:right-12 xl:left-16 xl:right-16 z-50 ${
        showComponentOptions ? "hidden md:block" : "block"
      }`}
    >
      <div className="flex justify-between items-center">
        <ToggleIcon
          isEnabled={showDescriptions}
          onToggle={onToggleDescriptions}
        />
        <CheckoutCard totalPrice={totalPrice} onCheckout={onCheckout} />
      </div>
    </div>
  );
}

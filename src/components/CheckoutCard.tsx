import { Card } from "./ui/card";
import { Button } from "./ui/button";

interface CheckoutCardProps {
  totalPrice: number;
  onCheckout: () => void;
}

export function CheckoutCard({ totalPrice, onCheckout }: CheckoutCardProps) {
  return (
    <Card className="fixed bottom-6 right-6 bg-white/90 backdrop-blur-sm border-gray-200 shadow-lg z-50 rounded-[5rem] py-1.5 px-1.5">
      <div className="flex items-center gap-4">
        <div className="flex flex-col pl-4 pr-4">
          <span className="text-xs uppercase tracking-wide text-right mb-[-0.4rem] font-semibold text-accent">
            Total
          </span>
          <span className="text-lg font-semibold text-gray-900">
            €{totalPrice.toFixed(2)}
          </span>
        </div>
        <Button
          onClick={onCheckout}
          className="text-white px-6 py-5 text-sm font-medium rounded-[5rem] cursor-pointer transition-colors duration-200"
          style={{
            backgroundColor: "rgba(43, 43, 43, 0.9)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(30, 30, 30, 0.95)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(43, 43, 43, 0.9)";
          }}
        >
          Checkout
        </Button>
      </div>
    </Card>
  );
}

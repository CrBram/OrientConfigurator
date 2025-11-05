import { Button } from "./ui/button";

interface ThankYouProps {
  onBack?: () => void;
}

export default function ThankYou({ onBack }: ThankYouProps) {
  return (
    <div
      className="fixed inset-0 h-screen w-screen"
      style={{ background: "#ededed" }}
    >
      <div className="flex flex-col items-center justify-center h-full p-6 text-center">
        <img
          src="/OrientLogoFull.png"
          alt="Orient"
          className="h-10 mx-auto mb-6 opacity-80"
        />
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          Thank you for ordering
        </h1>
        <p className="text-gray-700">
          Your Orient Bambino configuration has been received.
        </p>
        <div className="mt-8">
          <Button
            onClick={onBack}
            className="text-white px-8 py-5 text-sm font-medium rounded-[5rem] cursor-pointer"
            style={{ backgroundColor: "rgba(43, 43, 43, 0.95)" }}
          >
            Go to configurator
          </Button>
        </div>
      </div>
      <div className="fixed bottom-6 left-0 right-0 text-center">
        <p className="text-sm text-accent">Created by Bram Criel</p>
      </div>
    </div>
  );
}

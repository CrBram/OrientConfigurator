import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Palette, Watch as WatchIcon, Settings2, X } from "lucide-react";

interface ConfigurationPanelProps {
  onClose?: () => void;
}

export function ConfigurationPanel({ onClose }: ConfigurationPanelProps) {
  return (
    <div className="fixed top-6 right-6 bottom-6 z-10 w-80 max-w-[calc(100vw-3rem)] flex flex-col">
      <Card className="backdrop-blur-sm bg-white/95 shadow-xl flex flex-col h-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <WatchIcon className="w-5 h-5" />
            Watch Configurator
            {onClose && (
              <button
                onClick={onClose}
                className="lg:hidden ml-auto p-1 hover:bg-gray-100 rounded"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 overflow-y-auto flex-1">
          {/* Watch Face Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Palette className="w-4 h-4" />
              <Label className="text-base font-semibold">Watch Face</Label>
            </div>
            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground">Color</Label>
              <div className="flex gap-2">
                <button
                  className="w-10 h-10 rounded-full bg-black border-2 border-gray-300 hover:border-gray-900 transition-colors"
                  title="Black"
                />
                <button
                  className="w-10 h-10 rounded-full bg-blue-900 border-2 border-gray-300 hover:border-gray-900 transition-colors"
                  title="Navy Blue"
                />
                <button
                  className="w-10 h-10 rounded-full bg-white border-2 border-gray-300 hover:border-gray-900 transition-colors"
                  title="White"
                />
                <button
                  className="w-10 h-10 rounded-full bg-green-900 border-2 border-gray-300 hover:border-gray-900 transition-colors"
                  title="Green"
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Band Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Settings2 className="w-4 h-4" />
              <Label className="text-base font-semibold">Watch Band</Label>
            </div>
            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground">Material</Label>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" className="justify-start">
                  Stainless Steel
                </Button>
                <Button variant="outline" className="justify-start">
                  Leather
                </Button>
                <Button variant="outline" className="justify-start">
                  Rubber
                </Button>
                <Button variant="outline" className="justify-start">
                  Nylon
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground">
                Band Color
              </Label>
              <div className="flex gap-2">
                <button
                  className="w-10 h-10 rounded-full bg-gray-800 border-2 border-gray-300 hover:border-gray-900 transition-colors"
                  title="Silver"
                />
                <button
                  className="w-10 h-10 rounded-full bg-amber-700 border-2 border-gray-300 hover:border-gray-900 transition-colors"
                  title="Gold"
                />
                <button
                  className="w-10 h-10 rounded-full bg-amber-900 border-2 border-gray-300 hover:border-gray-900 transition-colors"
                  title="Bronze"
                />
                <button
                  className="w-10 h-10 rounded-full bg-gray-900 border-2 border-gray-300 hover:border-gray-900 transition-colors"
                  title="Black"
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Hands & Markers Section */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">Hands & Markers</Label>
            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground">Style</Label>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" className="justify-start">
                  Classic
                </Button>
                <Button variant="outline" className="justify-start">
                  Modern
                </Button>
                <Button variant="outline" className="justify-start">
                  Luminous
                </Button>
                <Button variant="outline" className="justify-start">
                  Minimalist
                </Button>
              </div>
            </div>
          </div>

          <Separator />

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <Button className="flex-1">Apply Changes</Button>
            <Button variant="outline" className="flex-1">
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

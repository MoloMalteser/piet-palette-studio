import { useState } from "react";
import { PietCanvas, PIET_COLORS, PietColor } from "@/components/PietCanvas";
import { ColorPalette } from "@/components/ColorPalette";
import { ActionButtons } from "@/components/ActionButtons";
import { toast } from "sonner";

const Index = () => {
  const [selectedColor, setSelectedColor] = useState<PietColor>(
    PIET_COLORS.find(c => c.name === "Red") || PIET_COLORS[0]
  );

  const { canvas, clearCanvas, exportToPNG } = PietCanvas({ 
    selectedColor,
    gridSize: 20 
  });

  const handleNew = () => {
    clearCanvas();
    toast("New canvas created! Start programming in Piet!");
  };

  const handleDownload = () => {
    exportToPNG();
    toast("Piet program downloaded!");
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Piet Programming Tool
          </h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            Create beautiful programs where code is art. Click cells to paint with Piet colors.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center">
          <ActionButtons onNew={handleNew} onDownload={handleDownload} />
        </div>

        {/* Canvas */}
        <div className="flex justify-center">
          <div className="w-full max-w-md">
            {canvas}
          </div>
        </div>

        {/* Color Palette */}
        <ColorPalette 
          selectedColor={selectedColor} 
          onColorSelect={setSelectedColor} 
        />
      </div>
    </div>
  );
};

export default Index;

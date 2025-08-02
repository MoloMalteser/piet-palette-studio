import { useState } from "react";
import { AdvancedPietCanvas, PIET_COLORS, PietColor, ToolType } from "@/components/AdvancedPietCanvas";
import { ColorPalette } from "@/components/ColorPalette";
import { Toolbar } from "@/components/Toolbar";
import { ToolPanel } from "@/components/ToolPanel";
import { useLanguage } from "@/hooks/useLanguage";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const PietEditor = () => {
  const { t } = useLanguage();
  
  const [selectedColor, setSelectedColor] = useState<PietColor>(
    PIET_COLORS.find(c => c.name === "Red") || PIET_COLORS[0]
  );
  const [activeTool, setActiveTool] = useState<ToolType>('brush');
  const [brushSize, setBrushSize] = useState(1);
  const [showGrid, setShowGrid] = useState(true);
  const [gridSize, setGridSize] = useState(20);
  const [zoom, setZoom] = useState(1);

  const {
    canvas,
    undo,
    redo,
    canUndo,
    canRedo,
    clearCanvas,
    saveToLocalStorage,
    loadFromLocalStorage,
    exportToPNG
  } = AdvancedPietCanvas({ 
    selectedColor,
    activeTool,
    brushSize,
    showGrid,
    gridSize,
    zoom,
    onColorPick: setSelectedColor
  });

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.1, 3));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.1, 0.5));
  const handleZoomFit = () => setZoom(1);

  const handleGridSizeChange = (newSize: string) => {
    setGridSize(parseInt(newSize));
    setZoom(1);
  };

  return (
    <div className="px-6 py-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold">Editor</h1>
        <p className="text-sm text-muted-foreground">Create your Piet program</p>
      </div>

      {/* Mobile Canvas */}
      <div className="bg-card border border-border rounded-3xl p-4">
        <div className="aspect-square max-w-sm mx-auto">
          {canvas}
        </div>
      </div>

      {/* Tools */}
      <div className="space-y-4">
        <ToolPanel
          activeTool={activeTool}
          onToolChange={setActiveTool}
          brushSize={brushSize}
          onBrushSizeChange={setBrushSize}
          showGrid={showGrid}
          onShowGridChange={setShowGrid}
        />
      </div>

      {/* Color Palette */}
      <div className="bg-card border border-border rounded-3xl p-4">
        <ColorPalette 
          selectedColor={selectedColor} 
          onColorSelect={setSelectedColor}
        />
      </div>

      {/* Quick Actions */}
      <div className="flex gap-3">
        <Button 
          variant="outline" 
          className="flex-1 rounded-2xl"
          onClick={clearCanvas}
        >
          New
        </Button>
        <Button 
          variant="outline" 
          className="flex-1 rounded-2xl"
          onClick={saveToLocalStorage}
        >
          Save
        </Button>
        <Button 
          variant="outline" 
          className="flex-1 rounded-2xl"
          onClick={exportToPNG}
        >
          Export
        </Button>
      </div>
    </div>
  );
};

export default PietEditor;
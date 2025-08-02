import { useState } from "react";
import { AdvancedPietCanvas, PIET_COLORS, PietColor, ToolType } from "@/components/AdvancedPietCanvas";
import { ColorPalette } from "@/components/ColorPalette";
import { Toolbar } from "@/components/Toolbar";
import { ToolPanel } from "@/components/ToolPanel";
import { useLanguage } from "@/hooks/useLanguage";
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
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-3 animate-fade-up">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
          {t('app.title')}
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          {t('app.subtitle')} • {t('app.description')}
        </p>
      </div>

      {/* Toolbar */}
      <div className="flex justify-center animate-scale-in">
        <Toolbar
          onNew={clearCanvas}
          onSave={saveToLocalStorage}
          onLoad={loadFromLocalStorage}
          onDownload={exportToPNG}
          onUndo={undo}
          onRedo={redo}
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          onZoomFit={handleZoomFit}
          canUndo={canUndo}
          canRedo={canRedo}
          zoom={zoom}
        />
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-[300px_1fr_300px] gap-6 items-start">
        
        {/* Left Panel - Tools & Settings */}
        <div className="space-y-4 animate-slide-up">
          <ToolPanel
            activeTool={activeTool}
            onToolChange={setActiveTool}
            brushSize={brushSize}
            onBrushSizeChange={setBrushSize}
            showGrid={showGrid}
            onShowGridChange={setShowGrid}
          />
          
          {/* Grid Size Control */}
          <div className="p-6 bg-ios-surface1 border border-border rounded-3xl shadow-ios-2 space-y-4">
            <Label className="text-sm font-medium">{t('canvas.grid_size')}</Label>
            <Select value={gridSize.toString()} onValueChange={handleGridSizeChange}>
              <SelectTrigger className="rounded-2xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10×10</SelectItem>
                <SelectItem value="20">20×20</SelectItem>
                <SelectItem value="30">30×30</SelectItem>
                <SelectItem value="40">40×40</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Center - Canvas */}
        <div className="flex justify-center animate-spring">
          <div className="w-full max-w-2xl rounded-3xl overflow-hidden shadow-canvas bg-ios-surface1 p-6">
            {canvas}
          </div>
        </div>

        {/* Right Panel - Colors */}
        <div className="animate-slide-up">
          <div className="p-6 bg-ios-surface1 border border-border rounded-3xl shadow-ios-2">
            <ColorPalette 
              selectedColor={selectedColor} 
              onColorSelect={setSelectedColor}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PietEditor;
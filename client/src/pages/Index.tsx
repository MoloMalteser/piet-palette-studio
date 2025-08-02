import { useState, useEffect } from "react";
import { PietCanvas } from "@/components/PietCanvas";
import { ColorPalette } from "@/components/ColorPalette";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { useLanguage } from "@/hooks/useLanguage";
import { toast } from "sonner";
import { 
  Menu, 
  Undo2, 
  Redo2, 
  Eraser, 
  Pen, 
  Play, 
  Download, 
  FileText,
  Plus
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Index = () => {
  const [, setLocation] = useLocation();
  const { t, language, setLanguage } = useLanguage();
  const [selectedColor, setSelectedColor] = useState('red');
  const [isEraser, setIsEraser] = useState(false);
  const [gridSize, setGridSize] = useState(20);
  const [showNewDialog, setShowNewDialog] = useState(false);
  const [newGridSize, setNewGridSize] = useState("20");
  const [canvasGrid, setCanvasGrid] = useState<string[][]>([]);
  const [undoStack, setUndoStack] = useState<string[][][]>([]);
  const [redoStack, setRedoStack] = useState<string[][][]>([]);

  // Check if welcome screen should be shown
  useEffect(() => {
    const welcomeCompleted = localStorage.getItem('welcomeCompleted');
    if (!welcomeCompleted) {
      setLocation('/welcome');
      return;
    }
    
    // Check if an example was loaded from gallery
    const loadedExample = localStorage.getItem('loadedExample');
    const programData = localStorage.getItem('currentProgram');
    
    if (loadedExample && programData) {
      try {
        const data = JSON.parse(programData);
        if (data.grid && data.width && data.height) {
          setGridSize(data.width);
          setCanvasGrid(data.grid);
          toast.success(`Loaded: ${data.name || loadedExample}`);
        }
        // Clear the loaded example flag
        localStorage.removeItem('loadedExample');
      } catch (error) {
        console.error('Failed to load example:', error);
      }
    }
  }, [setLocation]);
  
  const handleCanvasChange = (newGrid: string[][]) => {
    // Only update if the grid actually changed to avoid infinite loops
    if (JSON.stringify(newGrid) !== JSON.stringify(canvasGrid)) {
      // Save current state to undo stack before making changes
      if (canvasGrid.length > 0) {
        setUndoStack(prev => [...prev.slice(-19), canvasGrid]); // Keep last 20 states
        setRedoStack([]); // Clear redo stack when new change is made
      }
      setCanvasGrid(newGrid);
    }
  };

  const handleUndo = () => {
    if (undoStack.length > 0) {
      const previousState = undoStack[undoStack.length - 1];
      setRedoStack(prev => [canvasGrid, ...prev.slice(0, 19)]);
      setCanvasGrid(previousState);
      setUndoStack(prev => prev.slice(0, -1));
      toast.success(t('canvas.undo'));
    }
  };

  const handleRedo = () => {
    if (redoStack.length > 0) {
      const nextState = redoStack[0];
      setUndoStack(prev => [...prev, canvasGrid]);
      setCanvasGrid(nextState);
      setRedoStack(prev => prev.slice(1));
      toast.success(t('canvas.redo'));
    }
  };

  const handleNewCanvas = () => {
    const size = parseInt(newGridSize);
    setGridSize(size);
    setShowNewDialog(false);
    setCanvasGrid([]);
    setUndoStack([]);
    setRedoStack([]);
    toast.success(`${t('canvas.createNew')}: ${size}×${size}`);
  };

  const handleDownload = () => {
    // Create a canvas element and draw the grid
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    const cellSize = 20;
    
    canvas.width = gridSize * cellSize;
    canvas.height = gridSize * cellSize;
    
    if (canvasGrid.length > 0) {
      for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
          const color = canvasGrid[row]?.[col] || 'white';
          // Convert CSS variable to actual color
          const tempEl = document.createElement('div');
          tempEl.style.backgroundColor = `hsl(var(--piet-${color}))`;
          document.body.appendChild(tempEl);
          const computedColor = getComputedStyle(tempEl).backgroundColor;
          document.body.removeChild(tempEl);
          
          ctx.fillStyle = computedColor;
          ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
        }
      }
    } else {
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    
    const link = document.createElement('a');
    link.download = `piet-program-${Date.now()}.png`;
    link.href = canvas.toDataURL();
    link.click();
    
    toast.success(t('canvas.download'));
  };

  const handleRun = () => {
    // Save current canvas data for runner
    const canvasData = {
      width: gridSize,
      height: gridSize,
      grid: canvasGrid.length > 0 ? canvasGrid : Array(gridSize).fill(null).map(() => Array(gridSize).fill('white'))
    };
    localStorage.setItem('currentProgram', JSON.stringify(canvasData));
    setLocation('/runner');
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Top Toolbar */}
      <div className="flex items-center justify-between p-4 bg-card border-b border-border">
        {/* Color Palette */}
        <div className="flex items-center space-x-2">
          <ColorPalette 
            selectedColor={selectedColor}
            onColorSelect={setSelectedColor}
          />
          
          {/* Language Toggle */}
          <Button
            variant="outline"
            size="sm"
            className="rounded-full px-3 py-1 h-8 text-xs"
            onClick={() => setLanguage(language === 'de' ? 'en' : 'de')}
          >
            {language.toUpperCase()}
          </Button>
        </div>

        {/* Tool Controls */}
        <div className="flex items-center space-x-2">
          <Button
            variant={undoStack.length > 0 ? "outline" : "ghost"}
            size="sm"
            className="rounded-full w-10 h-10 p-0"
            onClick={handleUndo}
            disabled={undoStack.length === 0}
          >
            <Undo2 className="w-4 h-4" />
          </Button>
          
          <Button
            variant={redoStack.length > 0 ? "outline" : "ghost"}
            size="sm"
            className="rounded-full w-10 h-10 p-0"
            onClick={handleRedo}
            disabled={redoStack.length === 0}
          >
            <Redo2 className="w-4 h-4" />
          </Button>

          <Button
            variant={isEraser ? "default" : "outline"}
            size="sm"
            className="rounded-full w-10 h-10 p-0"
            onClick={() => setIsEraser(!isEraser)}
          >
            {isEraser ? <Pen className="w-4 h-4" /> : <Eraser className="w-4 h-4" />}
          </Button>
        </div>

        {/* Burger Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="rounded-full w-10 h-10 p-0">
              <Menu className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={handleRun} className="text-green-600">
              <Play className="w-4 h-4 mr-2" />
              {t('canvas.run')}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleDownload}>
              <Download className="w-4 h-4 mr-2" />
              {t('canvas.download')}
            </DropdownMenuItem>
            <Dialog open={showNewDialog} onOpenChange={setShowNewDialog}>
              <DialogTrigger asChild>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  <Plus className="w-4 h-4 mr-2" />
                  {t('canvas.new')}
                </DropdownMenuItem>
              </DialogTrigger>
              <DialogContent className="rounded-3xl">
                <DialogHeader>
                  <DialogTitle>{t('canvas.new')}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">{t('canvas.canvasSize')}</label>
                    <Select value={newGridSize} onValueChange={setNewGridSize}>
                      <SelectTrigger className="rounded-2xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="10">10×10</SelectItem>
                        <SelectItem value="20">20×20</SelectItem>
                        <SelectItem value="30">30×30</SelectItem>
                        <SelectItem value="40">40×40</SelectItem>
                        <SelectItem value="50">50×50</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={handleNewCanvas} className="w-full rounded-2xl">
                    {t('canvas.createNew')}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setLocation('/gallery')}>
              <FileText className="w-4 h-4 mr-2" />
              {t('nav.gallery')}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setLocation('/docs')}>
              <FileText className="w-4 h-4 mr-2" />
              {t('nav.docs')}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Main Canvas Area */}
      <div className="flex-1 p-4">
        <div className="w-full h-full bg-card border border-border rounded-3xl overflow-hidden">
          <PietCanvas 
            selectedColor={selectedColor}
            activeTool={isEraser ? 'eraser' : 'brush'}
            gridSize={gridSize}
            className="w-full h-full"
            onCanvasChange={handleCanvasChange}
            initialGrid={canvasGrid}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;

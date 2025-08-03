import { useState, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";
import { useUndoRedo } from "@/hooks/useUndoRedo";
import { useLanguage } from "@/hooks/useLanguage";
import { toast } from "sonner";

export interface PietColor {
  name: string;
  color: string;
  className: string;
}

export const PIET_COLORS: PietColor[] = [
  { name: "Light Red", color: "#ff8080", className: "bg-piet-light-red" },
  { name: "Red", color: "#ff0000", className: "bg-piet-red" },
  { name: "Dark Red", color: "#800000", className: "bg-piet-dark-red" },
  { name: "Light Yellow", color: "#ffff80", className: "bg-piet-light-yellow" },
  { name: "Yellow", color: "#ffff00", className: "bg-piet-yellow" },
  { name: "Dark Yellow", color: "#808000", className: "bg-piet-dark-yellow" },
  { name: "Light Green", color: "#80ff80", className: "bg-piet-light-green" },
  { name: "Green", color: "#00ff00", className: "bg-piet-green" },
  { name: "Dark Green", color: "#008000", className: "bg-piet-dark-green" },
  { name: "Light Cyan", color: "#80ffff", className: "bg-piet-light-cyan" },
  { name: "Cyan", color: "#00ffff", className: "bg-piet-cyan" },
  { name: "Dark Cyan", color: "#008080", className: "bg-piet-dark-cyan" },
  { name: "Light Blue", color: "#8080ff", className: "bg-piet-light-blue" },
  { name: "Blue", color: "#0000ff", className: "bg-piet-blue" },
  { name: "Dark Blue", color: "#000080", className: "bg-piet-dark-blue" },
  { name: "Light Magenta", color: "#ff80ff", className: "bg-piet-light-magenta" },
  { name: "Magenta", color: "#ff00ff", className: "bg-piet-magenta" },
  { name: "Dark Magenta", color: "#800080", className: "bg-piet-dark-magenta" },
  { name: "White", color: "#ffffff", className: "bg-piet-white" },
  { name: "Black", color: "#000000", className: "bg-piet-black" },
];

export type ToolType = 'brush' | 'fill' | 'eraser' | 'eyedropper' | 'select';

interface AdvancedPietCanvasProps {
  selectedColor: PietColor;
  activeTool: ToolType;
  brushSize: number;
  showGrid: boolean;
  gridSize: number;
  zoom: number;
  onColorPick?: (color: PietColor) => void;
}

export const AdvancedPietCanvas = ({ 
  selectedColor, 
  activeTool,
  brushSize,
  showGrid,
  gridSize,
  zoom,
  onColorPick
}: AdvancedPietCanvasProps) => {
  const { t } = useLanguage();
  const whiteColor = PIET_COLORS.find(c => c.name === "White")!;
  
  const {
    state: grid,
    undo,
    redo,
    canUndo,
    canRedo,
    pushState,
    reset
  } = useUndoRedo<PietColor[][]>(
    Array(gridSize).fill(null).map(() => 
      Array(gridSize).fill(whiteColor)
    )
  );

  const canvasRef = useRef<HTMLDivElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const getCellsInBrush = useCallback((row: number, col: number) => {
    const cells: [number, number][] = [];
    const halfSize = Math.floor(brushSize / 2);
    
    for (let r = row - halfSize; r <= row + halfSize; r++) {
      for (let c = col - halfSize; c <= col + halfSize; c++) {
        if (r >= 0 && r < gridSize && c >= 0 && c < gridSize) {
          cells.push([r, c]);
        }
      }
    }
    return cells;
  }, [brushSize, gridSize]);

  const floodFill = useCallback((startRow: number, startCol: number, targetColor: PietColor, newColor: PietColor) => {
    if (targetColor.name === newColor.name) return grid;
    
    const newGrid = grid.map(row => [...row]);
    const stack: [number, number][] = [[startRow, startCol]];
    
    while (stack.length > 0) {
      const [row, col] = stack.pop()!;
      
      if (row < 0 || row >= gridSize || col < 0 || col >= gridSize) continue;
      if (newGrid[row][col].name !== targetColor.name) continue;
      
      newGrid[row][col] = newColor;
      
      stack.push([row + 1, col], [row - 1, col], [row, col + 1], [row, col - 1]);
    }
    
    return newGrid;
  }, [grid, gridSize]);

  const handleCellInteraction = (row: number, col: number) => {
    if (activeTool === 'eyedropper') {
      const pickedColor = grid[row][col];
      onColorPick?.(pickedColor);
      toast(t('messages.color_picked'));
      return;
    }

    let newGrid = [...grid];

    if (activeTool === 'brush' || activeTool === 'eraser') {
      const color = activeTool === 'eraser' ? whiteColor : selectedColor;
      const cells = getCellsInBrush(row, col);
      
      newGrid = grid.map(row => [...row]);
      cells.forEach(([r, c]) => {
        newGrid[r][c] = color;
      });
    } else if (activeTool === 'fill') {
      const targetColor = grid[row][col];
      const fillColor = selectedColor;
      newGrid = floodFill(row, col, targetColor, fillColor);
      toast(t('messages.fill_complete'));
    }

    pushState(newGrid);
  };

  const handleMouseDown = (row: number, col: number) => {
    setIsDrawing(true);
    handleCellInteraction(row, col);
  };

  const handleMouseEnter = (row: number, col: number) => {
    if (isDrawing && (activeTool === 'brush' || activeTool === 'eraser')) {
      handleCellInteraction(row, col);
    }
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    reset(Array(gridSize).fill(null).map(() => 
      Array(gridSize).fill(whiteColor)
    ));
    toast(t('messages.canvas_cleared'));
  };

  const saveToLocalStorage = () => {
    const saveData = {
      grid: grid,
      timestamp: Date.now(),
      version: '1.0'
    };
    localStorage.setItem('piet-program', JSON.stringify(saveData));
    toast(t('messages.program_saved'));
  };

  const loadFromLocalStorage = () => {
    try {
      const saved = localStorage.getItem('piet-program');
      if (saved) {
        const saveData = JSON.parse(saved);
        if (saveData.grid && Array.isArray(saveData.grid)) {
          reset(saveData.grid);
          toast(t('messages.program_loaded'));
        }
      }
    } catch (error) {
      toast("Error loading program");
    }
  };

  const exportToPNG = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    const cellSize = 20;
    
    canvas.width = gridSize * cellSize;
    canvas.height = gridSize * cellSize;
    
    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        ctx.fillStyle = grid[row][col].color;
        ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
      }
    }
    
    const link = document.createElement('a');
    link.download = `piet-program-${Date.now()}.png`;
    link.href = canvas.toDataURL();
    link.click();
    toast(t('messages.program_downloaded'));
  };

  const getCursor = () => {
    switch (activeTool) {
      case 'brush': return 'crosshair';
      case 'fill': return 'pointer';
      case 'eraser': return 'crosshair';
      case 'eyedropper': return 'crosshair';
      default: return 'default';
    }
  };

  return {
    canvas: (
      <div className="relative">
        <div 
          ref={canvasRef}
          className={cn(
            "grid gap-0 p-4 bg-canvas-background rounded-3xl shadow-canvas border border-border transition-all duration-300",
            showGrid ? "gap-px" : "gap-0"
          )}
          style={{ 
            gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
            aspectRatio: '1',
            transform: `scale(${zoom})`,
            cursor: getCursor()
          }}
          onMouseLeave={handleMouseUp}
        >
          {grid.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <button
                key={`${rowIndex}-${colIndex}`}
                className={cn(
                  "aspect-square transition-all duration-150 hover:brightness-110 active:scale-95",
                  "touch-manipulation",
                  cell.className,
                  showGrid && "border border-canvas-grid/30",
                  rowIndex === 0 && colIndex === 0 && "rounded-tl-2xl",
                  rowIndex === 0 && colIndex === gridSize - 1 && "rounded-tr-2xl", 
                  rowIndex === gridSize - 1 && colIndex === 0 && "rounded-bl-2xl",
                  rowIndex === gridSize - 1 && colIndex === gridSize - 1 && "rounded-br-2xl"
                )}
                onMouseDown={() => handleMouseDown(rowIndex, colIndex)}
                onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
                onMouseUp={handleMouseUp}
                onTouchStart={() => handleMouseDown(rowIndex, colIndex)}
                aria-label={`Cell ${rowIndex},${colIndex} - ${cell.name}`}
              />
            ))
          )}
        </div>
      </div>
    ),
    undo,
    redo,
    canUndo,
    canRedo,
    clearCanvas,
    saveToLocalStorage,
    loadFromLocalStorage,
    exportToPNG
  };
};
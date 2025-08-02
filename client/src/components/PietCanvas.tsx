import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface PietCanvasProps {
  selectedColor: string;
  activeTool: string;
  gridSize?: number;
  className?: string;
  onCanvasChange?: (grid: string[][]) => void;
  initialGrid?: string[][];
}

export const PietCanvas = ({ 
  selectedColor, 
  activeTool,
  gridSize = 20,
  className,
  onCanvasChange,
  initialGrid
}: PietCanvasProps) => {
  const [grid, setGrid] = useState<string[][]>(() => {
    if (initialGrid && initialGrid.length > 0) {
      return initialGrid;
    }
    return Array(gridSize).fill(null).map(() => 
      Array(gridSize).fill('white')
    );
  });
  const [zoom, setZoom] = useState(3); // Default 3x3 pixel zoom as requested
  const [isDragging, setIsDragging] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);

  // Update grid when gridSize changes or initialGrid is provided
  useEffect(() => {
    if (initialGrid && initialGrid.length > 0) {
      setGrid(initialGrid);
    } else {
      setGrid(Array(gridSize).fill(null).map(() => 
        Array(gridSize).fill('white')
      ));
    }
  }, [gridSize, initialGrid]);

  // Call onCanvasChange when grid updates - prevent infinite loops
  const lastGridRef = useRef<string>();
  useEffect(() => {
    const gridString = JSON.stringify(grid);
    if (onCanvasChange && gridString !== lastGridRef.current) {
      lastGridRef.current = gridString;
      onCanvasChange(grid);
    }
  }, [grid, onCanvasChange]);

  const handleCellClick = (row: number, col: number) => {
    const newGrid = [...grid];
    if (activeTool === 'eraser') {
      newGrid[row][col] = 'white';
    } else {
      newGrid[row][col] = selectedColor;
    }
    setGrid(newGrid);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    setZoom(prevZoom => Math.max(0.5, Math.min(3, prevZoom + delta)));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      setIsDragging(true);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && isDragging) {
      e.preventDefault();
      // Basic pinch-to-zoom implementation
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const distance = Math.sqrt(
        Math.pow(touch2.clientX - touch1.clientX, 2) +
        Math.pow(touch2.clientY - touch1.clientY, 2)
      );
      
      // This is a simplified implementation
      setZoom(prevZoom => Math.max(0.5, Math.min(3, distance / 200)));
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  return (
    <div className={cn("w-full h-full flex items-center justify-center overflow-hidden", className)}>
      <div 
        ref={canvasRef}
        className="grid gap-[1px] p-4 bg-muted rounded-2xl border border-border transition-transform duration-200"
        style={{ 
          gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
          aspectRatio: '1',
          transform: `scale(${zoom})`,
          maxWidth: '90vmin',
          maxHeight: '90vmin'
        }}
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <button
              key={`${rowIndex}-${colIndex}`}
              className={cn(
                "aspect-square border-0 hover:scale-110 transition-all duration-150 touch-manipulation min-w-[4px] min-h-[4px]",
                rowIndex === 0 && colIndex === 0 && "rounded-tl-lg",
                rowIndex === 0 && colIndex === gridSize - 1 && "rounded-tr-lg",
                rowIndex === gridSize - 1 && colIndex === 0 && "rounded-bl-lg",
                rowIndex === gridSize - 1 && colIndex === gridSize - 1 && "rounded-br-lg"
              )}
              style={{ backgroundColor: `hsl(var(--piet-${cell}))` }}
              onClick={() => handleCellClick(rowIndex, colIndex)}
              aria-label={`Cell ${rowIndex},${colIndex} - ${cell}`}
            />
          ))
        )}
      </div>
    </div>
  );
};
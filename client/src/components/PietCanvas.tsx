import { useState, useRef } from "react";
import { cn } from "@/lib/utils";

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

interface PietCanvasProps {
  selectedColor: PietColor;
  onCellClick?: (row: number, col: number, color: PietColor) => void;
  gridSize?: number;
}

export const PietCanvas = ({ 
  selectedColor, 
  onCellClick,
  gridSize = 20 
}: PietCanvasProps) => {
  const [grid, setGrid] = useState<PietColor[][]>(
    Array(gridSize).fill(null).map(() => 
      Array(gridSize).fill(PIET_COLORS.find(c => c.name === "White"))
    )
  );
  
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleCellClick = (row: number, col: number) => {
    const newGrid = [...grid];
    newGrid[row][col] = selectedColor;
    setGrid(newGrid);
    onCellClick?.(row, col, selectedColor);
  };

  const clearCanvas = () => {
    const whiteColor = PIET_COLORS.find(c => c.name === "White")!;
    setGrid(Array(gridSize).fill(null).map(() => 
      Array(gridSize).fill(whiteColor)
    ));
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
  };

  return {
    canvas: (
      <div 
        ref={canvasRef}
        className="grid gap-0 p-4 bg-canvas-background rounded-2xl shadow-canvas border border-border"
        style={{ 
          gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
          aspectRatio: '1'
        }}
      >
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <button
              key={`${rowIndex}-${colIndex}`}
              className={cn(
                "aspect-square border border-canvas-grid hover:scale-110 transition-all duration-150",
                "touch-manipulation",
                cell.className,
                rowIndex === 0 && colIndex === 0 && "rounded-tl-xl",
                rowIndex === 0 && colIndex === gridSize - 1 && "rounded-tr-xl",
                rowIndex === gridSize - 1 && colIndex === 0 && "rounded-bl-xl",
                rowIndex === gridSize - 1 && colIndex === gridSize - 1 && "rounded-br-xl"
              )}
              onClick={() => handleCellClick(rowIndex, colIndex)}
              aria-label={`Cell ${rowIndex},${colIndex} - ${cell.name}`}
            />
          ))
        )}
      </div>
    ),
    clearCanvas,
    exportToPNG
  };
};
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
  selectedColor: string;
  activeTool: string;
  gridSize?: number;
  className?: string;
}

export const PietCanvas = ({ 
  selectedColor, 
  activeTool,
  gridSize = 20,
  className 
}: PietCanvasProps) => {
  const [grid, setGrid] = useState<string[][]>(
    Array(gridSize).fill(null).map(() => 
      Array(gridSize).fill('white')
    )
  );
  
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleCellClick = (row: number, col: number) => {
    const newGrid = [...grid];
    if (activeTool === 'eraser') {
      newGrid[row][col] = 'white';
    } else {
      newGrid[row][col] = selectedColor;
    }
    setGrid(newGrid);
  };

  return (
    <div className={cn("w-full h-full flex items-center justify-center", className)}>
      <div 
        ref={canvasRef}
        className="grid gap-[1px] p-4 bg-muted rounded-2xl border border-border max-w-sm max-h-sm"
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
                "aspect-square border-0 hover:scale-110 transition-all duration-150 touch-manipulation",
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
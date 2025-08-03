import { cn } from "@/lib/utils";
import { PIET_COLORS, PietColor } from "./PietCanvas";

interface ColorPaletteProps {
  selectedColor: PietColor;
  onColorSelect: (color: PietColor) => void;
}

export const ColorPalette = ({ selectedColor, onColorSelect }: ColorPaletteProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-muted-foreground">Piet Colors</h3>
      
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-10 gap-2">
        {PIET_COLORS.map((color) => (
          <button
            key={color.name}
            className={cn(
              "relative aspect-square rounded-lg border-2 transition-all duration-200",
              "hover:scale-110 active:scale-95",
              "touch-manipulation",
              color.className,
              selectedColor.name === color.name 
                ? "border-primary ring-2 ring-primary ring-offset-2 ring-offset-background scale-110" 
                : "border-border hover:border-muted-foreground"
            )}
            onClick={() => onColorSelect(color)}
            aria-label={`Select ${color.name}`}
            title={color.name}
          >
            {selectedColor.name === color.name && (
              <div className="absolute inset-0 rounded-md bg-primary/20 flex items-center justify-center">
                <div className="w-2 h-2 bg-primary rounded-full" />
              </div>
            )}
          </button>
        ))}
      </div>
      
      <div className="text-xs text-muted-foreground">
        Selected: <span className="font-medium">{selectedColor.name}</span>
      </div>
    </div>
  );
};
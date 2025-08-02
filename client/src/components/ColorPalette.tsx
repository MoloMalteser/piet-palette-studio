import { cn } from "@/lib/utils";
import { PIET_COLORS, PietColor } from "./AdvancedPietCanvas";
import { useLanguage } from "@/hooks/useLanguage";

interface ColorPaletteProps {
  selectedColor: PietColor;
  onColorSelect: (color: PietColor) => void;
}

export const ColorPalette = ({ selectedColor, onColorSelect }: ColorPaletteProps) => {
  const { t } = useLanguage();
  
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">{t('colors.title')}</h3>
        <p className="text-sm text-muted-foreground">
          Select from the 20 standard Piet colors
        </p>
      </div>
      
      <div className="grid grid-cols-4 gap-3">
        {PIET_COLORS.map((color) => (
          <button
            key={color.name}
            className={cn(
              "relative aspect-square rounded-2xl border-2 transition-all duration-300",
              "hover:scale-105 active:scale-95 hover:shadow-ios-2",
              "touch-manipulation",
              selectedColor.name === color.name 
                ? "border-primary ring-2 ring-primary/30 ring-offset-2 ring-offset-background scale-105 shadow-ios-2" 
                : "border-border hover:border-primary/50"
            )}
            style={{ backgroundColor: color.color }}
            onClick={() => onColorSelect(color)}
            aria-label={`Select ${color.name}`}
            title={color.name}
          >
            {selectedColor.name === color.name && (
              <div className="absolute inset-0 rounded-2xl bg-white/20 dark:bg-black/20 flex items-center justify-center">
                <div className="w-3 h-3 bg-white dark:bg-black rounded-full shadow-lg" />
              </div>
            )}
          </button>
        ))}
      </div>
      
      <div className="p-4 rounded-2xl bg-ios-surface2 border space-y-2">
        <div className="text-sm font-medium">{t('colors.selected')}</div>
        <div className="flex items-center gap-3">
          <div 
            className="w-8 h-8 rounded-xl border-2 border-border shadow-ios-1"
            style={{ backgroundColor: selectedColor.color }}
          />
          <span className="font-medium text-sm">{selectedColor.name}</span>
        </div>
      </div>
    </div>
  );
};
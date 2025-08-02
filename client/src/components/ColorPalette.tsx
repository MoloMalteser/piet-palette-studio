import { Button } from "@/components/ui/button";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/hooks/useLanguage";

interface ColorPaletteProps {
  selectedColor: string;
  onColorSelect: (color: string) => void;
}

const PIET_COLORS = {
  normal: ['red', 'yellow', 'green', 'cyan', 'blue', 'magenta'],
  light: ['light-red', 'light-yellow', 'light-green', 'light-cyan', 'light-blue', 'light-magenta'],
  dark: ['dark-red', 'dark-yellow', 'dark-green', 'dark-cyan', 'dark-blue', 'dark-magenta'],
  special: ['white', 'black']
};

export const ColorPalette = ({ selectedColor, onColorSelect }: ColorPaletteProps) => {
  const { t } = useLanguage();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-12 h-12 rounded-full border-2 border-border shadow-lg p-0"
          style={{ backgroundColor: `hsl(var(--piet-${selectedColor}))` }}
        />
      </PopoverTrigger>
      <PopoverContent className="w-72 p-4 rounded-3xl" align="start">
        <div className="space-y-4">
          <h4 className="font-semibold text-sm">{t('docs.colorPalette')}</h4>
          
          {/* Light Colors */}
          <div className="space-y-2">
            <h5 className="text-xs font-medium text-muted-foreground">{t('docs.lightColors')}</h5>
            <div className="grid grid-cols-6 gap-2">
              {PIET_COLORS.light.map((color) => (
                <button
                  key={color}
                  className={cn(
                    "w-8 h-8 rounded-xl border-2 transition-all duration-150",
                    selectedColor === color 
                      ? "border-foreground scale-110 shadow-lg" 
                      : "border-border hover:scale-105"
                  )}
                  style={{ backgroundColor: `hsl(var(--piet-${color}))` }}
                  onClick={() => onColorSelect(color)}
                />
              ))}
            </div>
          </div>

          {/* Normal Colors */}
          <div className="space-y-2">
            <h5 className="text-xs font-medium text-muted-foreground">{t('docs.normalColors')}</h5>
            <div className="grid grid-cols-6 gap-2">
              {PIET_COLORS.normal.map((color) => (
                <button
                  key={color}
                  className={cn(
                    "w-8 h-8 rounded-xl border-2 transition-all duration-150",
                    selectedColor === color 
                      ? "border-foreground scale-110 shadow-lg" 
                      : "border-border hover:scale-105"
                  )}
                  style={{ backgroundColor: `hsl(var(--piet-${color}))` }}
                  onClick={() => onColorSelect(color)}
                />
              ))}
            </div>
          </div>

          {/* Dark Colors */}
          <div className="space-y-2">
            <h5 className="text-xs font-medium text-muted-foreground">{t('docs.darkColors')}</h5>
            <div className="grid grid-cols-6 gap-2">
              {PIET_COLORS.dark.map((color) => (
                <button
                  key={color}
                  className={cn(
                    "w-8 h-8 rounded-xl border-2 transition-all duration-150",
                    selectedColor === color 
                      ? "border-foreground scale-110 shadow-lg" 
                      : "border-border hover:scale-105"
                  )}
                  style={{ backgroundColor: `hsl(var(--piet-${color}))` }}
                  onClick={() => onColorSelect(color)}
                />
              ))}
            </div>
          </div>

          {/* Special Colors */}
          <div className="space-y-2">
            <h5 className="text-xs font-medium text-muted-foreground">{t('docs.specialColors')}</h5>
            <div className="grid grid-cols-2 gap-2">
              {PIET_COLORS.special.map((color) => (
                <button
                  key={color}
                  className={cn(
                    "w-8 h-8 rounded-xl border-2 transition-all duration-150",
                    selectedColor === color 
                      ? "border-foreground scale-110 shadow-lg" 
                      : "border-border hover:scale-105"
                  )}
                  style={{ backgroundColor: `hsl(var(--piet-${color}))` }}
                  onClick={() => onColorSelect(color)}
                />
              ))}
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
import { Brush, PaintBucket, Eraser, Pipette, MousePointer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useLanguage } from "@/hooks/useLanguage";

export type ToolType = 'brush' | 'fill' | 'eraser' | 'eyedropper' | 'select';

interface ToolPanelProps {
  activeTool: ToolType;
  onToolChange: (tool: ToolType) => void;
  brushSize: number;
  onBrushSizeChange: (size: number) => void;
  showGrid: boolean;
  onShowGridChange: (show: boolean) => void;
}

export const ToolPanel = ({
  activeTool,
  onToolChange,
  brushSize,
  onBrushSizeChange,
  showGrid,
  onShowGridChange
}: ToolPanelProps) => {
  const { t } = useLanguage();

  const tools = [
    { id: 'brush' as const, icon: Brush, label: t('tools.brush') },
    { id: 'fill' as const, icon: PaintBucket, label: t('tools.fill') },
    { id: 'eraser' as const, icon: Eraser, label: t('tools.eraser') },
    { id: 'eyedropper' as const, icon: Pipette, label: t('tools.eyedropper') },
    { id: 'select' as const, icon: MousePointer, label: t('tools.select') }
  ];

  return (
    <div className="space-y-6 p-4 bg-ios-surface1 border border-border rounded-2xl shadow-ios-2">
      {/* Tool Selection */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-muted-foreground">Tools</h3>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {tools.map((tool) => (
            <Button
              key={tool.id}
              variant={activeTool === tool.id ? "default" : "ghost"}
              size="sm"
              onClick={() => onToolChange(tool.id)}
              className="flex flex-col gap-1 h-auto py-3"
              title={tool.label}
            >
              <tool.icon className="w-4 h-4" />
              <span className="text-xs hidden sm:block">{tool.label}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Brush Size */}
      {(activeTool === 'brush' || activeTool === 'eraser') && (
        <div className="space-y-3">
          <Label className="text-sm font-medium">{t('canvas.brush_size')}</Label>
          <div className="space-y-2">
            <Slider
              value={[brushSize]}
              onValueChange={(value) => onBrushSizeChange(value[0])}
              min={1}
              max={5}
              step={1}
              className="w-full"
            />
            <div className="text-xs text-muted-foreground text-center">
              {brushSize}x{brushSize}
            </div>
          </div>
        </div>
      )}

      {/* Grid Toggle */}
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium">{t('canvas.show_grid')}</Label>
        <Switch checked={showGrid} onCheckedChange={onShowGridChange} />
      </div>
    </div>
  );
};
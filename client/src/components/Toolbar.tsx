import { 
  Undo2, 
  Redo2, 
  Download, 
  Save, 
  FolderOpen, 
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Maximize2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SettingsDialog } from "./SettingsDialog";
import { useLanguage } from "@/hooks/useLanguage";

interface ToolbarProps {
  onNew: () => void;
  onSave: () => void;
  onLoad: () => void;
  onDownload: () => void;
  onUndo: () => void;
  onRedo: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onZoomFit: () => void;
  canUndo: boolean;
  canRedo: boolean;
  zoom: number;
}

export const Toolbar = ({
  onNew,
  onSave,
  onLoad,
  onDownload,
  onUndo,
  onRedo,
  onZoomIn,
  onZoomOut,
  onZoomFit,
  canUndo,
  canRedo,
  zoom
}: ToolbarProps) => {
  const { t } = useLanguage();

  return (
    <div className="flex items-center gap-2 p-3 bg-ios-surface1 border border-border rounded-2xl shadow-ios-2 backdrop-blur-ios">
      {/* File Operations */}
      <div className="flex items-center gap-1">
        <Button onClick={onNew} variant="ghost" size="sm" className="gap-2">
          <RotateCcw className="w-4 h-4" />
          {t('toolbar.new')}
        </Button>
        <Button onClick={onSave} variant="ghost" size="sm" className="gap-2">
          <Save className="w-4 h-4" />
          {t('toolbar.save')}
        </Button>
        <Button onClick={onLoad} variant="ghost" size="sm" className="gap-2">
          <FolderOpen className="w-4 h-4" />
          {t('toolbar.load')}
        </Button>
      </div>

      <Separator orientation="vertical" className="h-6" />

      {/* Undo/Redo */}
      <div className="flex items-center gap-1">
        <Button 
          onClick={onUndo} 
          variant="ghost" 
          size="sm" 
          disabled={!canUndo}
          className="gap-2"
        >
          <Undo2 className="w-4 h-4" />
          {t('toolbar.undo')}
        </Button>
        <Button 
          onClick={onRedo} 
          variant="ghost" 
          size="sm" 
          disabled={!canRedo}
          className="gap-2"
        >
          <Redo2 className="w-4 h-4" />
          {t('toolbar.redo')}
        </Button>
      </div>

      <Separator orientation="vertical" className="h-6" />

      {/* Zoom Controls */}
      <div className="flex items-center gap-1">
        <Button onClick={onZoomOut} variant="ghost" size="sm">
          <ZoomOut className="w-4 h-4" />
        </Button>
        <span className="text-sm font-medium px-2 text-muted-foreground">
          {Math.round(zoom * 100)}%
        </span>
        <Button onClick={onZoomIn} variant="ghost" size="sm">
          <ZoomIn className="w-4 h-4" />
        </Button>
        <Button onClick={onZoomFit} variant="ghost" size="sm">
          <Maximize2 className="w-4 h-4" />
        </Button>
      </div>

      <Separator orientation="vertical" className="h-6" />

      {/* Download & Settings */}
      <div className="flex items-center gap-1">
        <Button onClick={onDownload} className="gap-2">
          <Download className="w-4 h-4" />
          {t('toolbar.download')}
        </Button>
        <SettingsDialog />
      </div>
    </div>
  );
};
import { Download, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ActionButtonsProps {
  onNew: () => void;
  onDownload: () => void;
}

export const ActionButtons = ({ onNew, onDownload }: ActionButtonsProps) => {
  return (
    <div className="flex gap-3">
      <Button
        onClick={onNew}
        variant="secondary"
        size="default"
        className="flex-1 sm:flex-none gap-2 font-medium"
      >
        <RotateCcw className="w-4 h-4" />
        New
      </Button>
      
      <Button
        onClick={onDownload}
        className="flex-1 sm:flex-none gap-2 font-medium"
      >
        <Download className="w-4 h-4" />
        Download
      </Button>
    </div>
  );
};
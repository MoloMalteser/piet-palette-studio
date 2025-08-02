import { useState, useEffect } from "react";
import { PietCanvas } from "@/components/PietCanvas";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { toast } from "sonner";
import { 
  Menu, 
  Undo2, 
  Redo2, 
  Eraser, 
  Pen, 
  Play, 
  Download, 
  FileText,
  Plus
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Index = () => {
  const [, setLocation] = useLocation();
  const [selectedColor, setSelectedColor] = useState('red');
  const [isEraser, setIsEraser] = useState(false);
  const [gridSize, setGridSize] = useState(20);
  const [showNewDialog, setShowNewDialog] = useState(false);
  const [newGridSize, setNewGridSize] = useState("20");
  const [undoStack, setUndoStack] = useState<any[]>([]);
  const [redoStack, setRedoStack] = useState<any[]>([]);
  
  const handleUndo = () => {
    // Placeholder undo function
    toast.info("Undo function");
  };

  const handleRedo = () => {
    // Placeholder redo function  
    toast.info("Redo function");
  };

  const handleNewCanvas = () => {
    const size = parseInt(newGridSize);
    setGridSize(size);
    setShowNewDialog(false);
    toast.success(`New ${size}×${size} canvas created`);
  };

  const handleDownload = () => {
    toast.success("Canvas downloaded as PNG");
  };

  const handleRun = () => {
    // Save current canvas data for runner
    const canvasData = {
      width: gridSize,
      height: gridSize,
      grid: [] // Will be populated by actual canvas data
    };
    localStorage.setItem('currentProgram', JSON.stringify(canvasData));
    setLocation('/runner');
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Top Toolbar */}
      <div className="flex items-center justify-between p-4 bg-card border-b border-border">
        {/* Current Color Circle */}
        <button
          className="w-12 h-12 rounded-full border-2 border-border shadow-lg"
          style={{ backgroundColor: `hsl(var(--piet-${selectedColor}))` }}
          onClick={() => {
            // Toggle through main colors when tapped
            const mainColors = ['red', 'yellow', 'green', 'cyan', 'blue', 'magenta'];
            const currentIndex = mainColors.indexOf(selectedColor);
            const nextIndex = (currentIndex + 1) % mainColors.length;
            setSelectedColor(mainColors[nextIndex]);
          }}
        />

        {/* Tool Controls */}
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            className="rounded-full w-10 h-10 p-0"
            onClick={handleUndo}
          >
            <Undo2 className="w-4 h-4" />
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            className="rounded-full w-10 h-10 p-0"
            onClick={handleRedo}
          >
            <Redo2 className="w-4 h-4" />
          </Button>

          <Button
            variant={isEraser ? "default" : "outline"}
            size="sm"
            className="rounded-full w-10 h-10 p-0"
            onClick={() => setIsEraser(!isEraser)}
          >
            {isEraser ? <Pen className="w-4 h-4" /> : <Eraser className="w-4 h-4" />}
          </Button>
        </div>

        {/* Burger Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="rounded-full w-10 h-10 p-0">
              <Menu className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={handleRun} className="text-green-600">
              <Play className="w-4 h-4 mr-2" />
              Run Program
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleDownload}>
              <Download className="w-4 h-4 mr-2" />
              Download PNG
            </DropdownMenuItem>
            <Dialog open={showNewDialog} onOpenChange={setShowNewDialog}>
              <DialogTrigger asChild>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  <Plus className="w-4 h-4 mr-2" />
                  New Canvas
                </DropdownMenuItem>
              </DialogTrigger>
              <DialogContent className="rounded-3xl">
                <DialogHeader>
                  <DialogTitle>New Canvas</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Canvas Size (quadratisch)</label>
                    <Select value={newGridSize} onValueChange={setNewGridSize}>
                      <SelectTrigger className="rounded-2xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="10">10×10</SelectItem>
                        <SelectItem value="20">20×20</SelectItem>
                        <SelectItem value="30">30×30</SelectItem>
                        <SelectItem value="40">40×40</SelectItem>
                        <SelectItem value="50">50×50</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={handleNewCanvas} className="w-full rounded-2xl">
                    Create New Canvas
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setLocation('/gallery')}>
              <FileText className="w-4 h-4 mr-2" />
              Gallery
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setLocation('/docs')}>
              <FileText className="w-4 h-4 mr-2" />
              Documentation
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Main Canvas Area */}
      <div className="flex-1 p-4">
        <div className="w-full h-full bg-card border border-border rounded-3xl overflow-hidden">
          <PietCanvas 
            selectedColor={selectedColor}
            activeTool={isEraser ? 'eraser' : 'brush'}
            gridSize={gridSize}
            className="w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Index;

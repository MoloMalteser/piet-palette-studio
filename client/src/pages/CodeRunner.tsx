import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Play, Square, RotateCcw, Download, Upload, ZoomIn, ZoomOut, Github } from "lucide-react";
import { toast } from "sonner";
import { PietInterpreter, PietProgram, InterpreterState } from "@/lib/pietInterpreter";
import { useLanguage } from "@/hooks/useLanguage";
import { cn } from "@/lib/utils";

const CodeRunner = () => {
  const { t } = useLanguage();
  const [program, setProgram] = useState<PietProgram | null>(null);
  const [interpreter, setInterpreter] = useState<PietInterpreter | null>(null);
  const [state, setState] = useState<InterpreterState | null>(null);
  const [input, setInput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [zoom, setZoom] = useState(3); // Default 3x3 pixel zoom
  const [showGrid, setShowGrid] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    loadProgram();
  }, []);

  const loadProgram = () => {
    const savedProgram = localStorage.getItem('currentProgram');
    if (savedProgram) {
      try {
        const programData = JSON.parse(savedProgram);
        const pietProgram: PietProgram = {
          width: programData.width,
          height: programData.height,
          grid: programData.grid || Array(programData.height).fill(null).map(() => 
            Array(programData.width).fill('white')
          )
        };
        setProgram(pietProgram);
        toast.success(t('runner.programLoaded'));
      } catch (error) {
        toast.error("Failed to load program");
        createTestProgram();
      }
    } else {
      createTestProgram();
    }
  };

  const createTestProgram = () => {
    const testProgram: PietProgram = {
      width: 8,
      height: 6,
      grid: [
        ['red', 'red', 'yellow', 'yellow', 'green', 'green', 'white', 'white'],
        ['red', 'red', 'yellow', 'yellow', 'green', 'green', 'white', 'white'],
        ['cyan', 'cyan', 'blue', 'blue', 'magenta', 'magenta', 'black', 'black'],
        ['cyan', 'cyan', 'blue', 'blue', 'magenta', 'magenta', 'black', 'black'],
        ['light-red', 'dark-red', 'light-yellow', 'dark-yellow', 'light-green', 'dark-green', 'white', 'white'],
        ['light-cyan', 'dark-cyan', 'light-blue', 'dark-blue', 'light-magenta', 'dark-magenta', 'white', 'white']
      ]
    };
    setProgram(testProgram);
    toast.success(t('runner.testProgram'));
  };

  const runProgram = () => {
    if (!program) {
      toast.error(t('runner.noProgram'));
      return;
    }

    const newInterpreter = new PietInterpreter(program);
    setInterpreter(newInterpreter);
    setState(newInterpreter.getState());
    setIsRunning(true);
    setIsPaused(false);

    // Run one step at a time with animation
    intervalRef.current = setInterval(() => {
      const currentState = newInterpreter.step();
      setState({...currentState});
      
      if (currentState.finished) {
        setIsRunning(false);
        clearInterval(intervalRef.current!);
        toast.success("Program execution completed");
      }
    }, 500); // 500ms per step for visibility
  };

  const pauseProgram = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsPaused(true);
    setIsRunning(false);
  };

  const resumeProgram = () => {
    if (!interpreter || !state) return;
    
    setIsRunning(true);
    setIsPaused(false);
    
    intervalRef.current = setInterval(() => {
      const currentState = interpreter.step();
      setState({...currentState});
      
      if (currentState.finished) {
        setIsRunning(false);
        clearInterval(intervalRef.current!);
        toast.success("Program execution completed");
      }
    }, 500);
  };

  const stepProgram = () => {
    if (!interpreter) return;
    
    const currentState = interpreter.step();
    setState({...currentState});
    
    if (currentState.finished) {
      toast.success("Program execution completed");
    }
  };

  const resetProgram = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setInterpreter(null);
    setState(null);
    setIsRunning(false);
    setIsPaused(false);
  };

  const exportToGitHub = async () => {
    if (!program) return;

    try {
      // Create a formatted export for GitHub/Lovable
      const exportData = {
        name: "piet-program",
        description: "Piet visual program created with Piet Studio",
        language: "piet",
        width: program.width,
        height: program.height,
        grid: program.grid,
        created: new Date().toISOString(),
        interpreter: "piet-studio-v1.0",
        colors: Array.from(new Set(program.grid.flat())),
        metadata: {
          totalPixels: program.width * program.height,
          colorCount: Array.from(new Set(program.grid.flat())).length,
          executionSteps: state?.steps.length || 0,
          stackOperations: state?.stack.length || 0
        }
      };

      // Convert to JSON with proper formatting
      const exportString = JSON.stringify(exportData, null, 2);
      
      // Create downloadable file
      const blob = new Blob([exportString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `piet-program-${Date.now()}.json`;
      link.click();
      URL.revokeObjectURL(url);

      toast.success("Program exported for GitHub/Lovable");
    } catch (error) {
      toast.error("Export failed");
    }
  };

  const renderPixel = (color: string, x: number, y: number) => {
    const isCurrentPosition = state && state.x === x && state.y === y;
    const pixelSize = zoom * 8; // Base 8px * zoom factor

    return (
      <div
        key={`${x}-${y}`}
        className={cn(
          "relative transition-all duration-200",
          isCurrentPosition && "ring-2 ring-blue-500 ring-offset-1",
          showGrid && "border border-border/20"
        )}
        style={{
          backgroundColor: `hsl(var(--piet-${color}))`,
          width: pixelSize,
          height: pixelSize,
          minWidth: pixelSize,
          minHeight: pixelSize
        }}
      >
        {isCurrentPosition && (
          <div className="absolute inset-0 bg-blue-500/30 animate-pulse rounded-sm" />
        )}
      </div>
    );
  };

  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold">{t('runner.title')}</h1>
        <p className="text-sm text-muted-foreground">Echter Piet Interpreter mit 3x3 Pixel Zoom</p>
      </div>

      {/* Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Programm Kontrolle
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setZoom(Math.max(1, zoom - 1))}
                disabled={zoom <= 1}
              >
                <ZoomOut className="w-4 h-4" />
              </Button>
              <span className="text-sm font-mono">{zoom}x</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setZoom(Math.min(8, zoom + 1))}
                disabled={zoom >= 8}
              >
                <ZoomIn className="w-4 h-4" />
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Button onClick={loadProgram} variant="outline">
              <Upload className="w-4 h-4 mr-2" />
              {t('runner.loadProgram')}
            </Button>
            
            {!isRunning && !isPaused && (
              <Button onClick={runProgram} className="bg-green-600 hover:bg-green-700">
                <Play className="w-4 h-4 mr-2" />
                {t('runner.run')}
              </Button>
            )}
            
            {isRunning && (
              <Button onClick={pauseProgram} variant="outline">
                <Square className="w-4 h-4 mr-2" />
                Pause
              </Button>
            )}
            
            {isPaused && (
              <Button onClick={resumeProgram} className="bg-green-600 hover:bg-green-700">
                <Play className="w-4 h-4 mr-2" />
                Resume
              </Button>
            )}
            
            <Button onClick={stepProgram} variant="outline" disabled={isRunning}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Step
            </Button>
            
            <Button onClick={resetProgram} variant="outline">
              <Square className="w-4 h-4 mr-2" />
              Reset
            </Button>

            <Button onClick={exportToGitHub} variant="outline">
              <Github className="w-4 h-4 mr-2" />
              GitHub Export
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Program Visualization */}
        <Card>
          <CardHeader>
            <CardTitle>Programm Darstellung ({zoom}x{zoom} Pixel)</CardTitle>
            <div className="flex items-center space-x-2">
              <Badge variant={program ? "default" : "secondary"}>
                {program ? `${program.width}×${program.height}` : t('runner.noProgram')}
              </Badge>
              {state && (
                <Badge variant="outline">
                  Position: ({state.x}, {state.y})
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {program ? (
              <ScrollArea className="h-96 w-full">
                <div className="grid gap-0 p-4 bg-muted rounded-lg" style={{
                  gridTemplateColumns: `repeat(${program.width}, minmax(0, 1fr))`,
                  justifyItems: 'center',
                  alignItems: 'center'
                }}>
                  {program.grid.map((row, y) =>
                    row.map((color, x) => renderPixel(color, x, y))
                  )}
                </div>
              </ScrollArea>
            ) : (
              <div className="h-96 flex items-center justify-center text-muted-foreground">
                {t('runner.noProgram')}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Execution State */}
        <Card>
          <CardHeader>
            <CardTitle>Ausführungsstatus</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Stack */}
            <div>
              <h4 className="font-medium mb-2">Stack:</h4>
              <div className="flex flex-wrap gap-1">
                {state?.stack.map((value, index) => (
                  <Badge key={index} variant="secondary">
                    {value}
                  </Badge>
                )) || <span className="text-muted-foreground">Leer</span>}
              </div>
            </div>

            {/* Output */}
            <div>
              <h4 className="font-medium mb-2">{t('runner.output')}:</h4>
              <div className="bg-muted p-3 rounded-lg font-mono text-sm min-h-[100px]">
                {state?.output.join('') || <span className="text-muted-foreground">Keine Ausgabe</span>}
              </div>
            </div>

            {/* Execution Steps */}
            <div>
              <h4 className="font-medium mb-2">Letzte Schritte:</h4>
              <ScrollArea className="h-32 w-full">
                <div className="space-y-1">
                  {state?.steps.slice(-10).map((step, index) => (
                    <div key={index} className="text-xs text-muted-foreground">
                      {step}
                    </div>
                  )) || <span className="text-muted-foreground">Keine Schritte</span>}
                </div>
              </ScrollArea>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CodeRunner;
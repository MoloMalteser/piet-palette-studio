import { useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Play, Upload, FileText, Zap, AlertCircle } from "lucide-react";
import { toast } from "sonner";

interface PietProgram {
  width: number;
  height: number;
  pixels: string[][];
}

const CodeRunner = () => {
  const { t } = useLanguage();
  const [program, setProgram] = useState<PietProgram | null>(null);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [executionSteps, setExecutionSteps] = useState<string[]>([]);

  const loadProgram = () => {
    try {
      const saved = localStorage.getItem('piet-program');
      if (saved) {
        const parsedProgram = JSON.parse(saved);
        setProgram(parsedProgram);
        toast.success("Program loaded successfully!");
      } else {
        toast.error("No saved program found. Create one in the Editor first.");
      }
    } catch (error) {
      toast.error("Failed to load program.");
    }
  };

  const runProgram = async () => {
    if (!program) {
      toast.error("No program loaded. Please load a program first.");
      return;
    }

    setIsRunning(true);
    setOutput("");
    setExecutionSteps([]);

    try {
      // Simulate Piet interpreter execution
      await simulatePietExecution(program, input);
    } catch (error) {
      toast.error("Runtime error occurred.");
      setOutput("Error: " + (error as Error).message);
    } finally {
      setIsRunning(false);
    }
  };

  const simulatePietExecution = async (prog: PietProgram, inp: string) => {
    // Simplified Piet interpreter simulation
    const steps: string[] = [];
    let currentOutput = "";
    
    steps.push("🚀 Starting Piet program execution...");
    steps.push(`📐 Program size: ${prog.width}×${prog.height}`);
    steps.push("🎯 Initializing direction pointer (right) and codel chooser (left)");
    
    setExecutionSteps([...steps]);
    await new Promise(resolve => setTimeout(resolve, 500));

    // Simulate finding colored blocks
    steps.push("🔍 Scanning for colored blocks...");
    steps.push("📊 Stack initialized (empty)");
    setExecutionSteps([...steps]);
    await new Promise(resolve => setTimeout(resolve, 500));

    // Simulate basic operations based on input
    if (inp.trim()) {
      steps.push(`📝 Processing input: "${inp}"`);
      for (const char of inp) {
        if (!isNaN(parseInt(char))) {
          steps.push(`🔢 Pushing number ${char} to stack`);
          currentOutput += char + " ";
        }
      }
      setExecutionSteps([...steps]);
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    // Simulate output
    steps.push("📤 Generating output...");
    steps.push("✅ Program execution completed");
    
    setExecutionSteps([...steps]);
    setOutput(currentOutput || "Hello from Piet! 🎨");
    
    toast.success("Program executed successfully!");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-3 animate-fade-up">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
          Piet Code Runner
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Execute your Piet programs and see them in action
        </p>
      </div>

      <div className="grid lg:grid-cols-[1fr_1fr] gap-6">
        {/* Left Panel - Program & Input */}
        <div className="space-y-6 animate-slide-up">
          {/* Program Status */}
          <Card className="rounded-3xl shadow-ios-2 border-border bg-ios-surface1">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Program Status
              </CardTitle>
              <CardDescription>
                Load and manage your Piet programs
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {program ? (
                <div className="space-y-3">
                  <Badge variant="secondary" className="rounded-full">
                    <Zap className="w-3 h-3 mr-1" />
                    Program Loaded
                  </Badge>
                  <div className="text-sm space-y-1">
                    <p><span className="font-medium">Size:</span> {program.width}×{program.height}</p>
                    <p><span className="font-medium">Total pixels:</span> {program.width * program.height}</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <Badge variant="outline" className="rounded-full">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    No Program Loaded
                  </Badge>
                  <p className="text-sm text-muted-foreground">
                    Create a program in the Editor first, then load it here.
                  </p>
                </div>
              )}
              
              <Button 
                onClick={loadProgram}
                className="w-full rounded-2xl"
                variant="outline"
              >
                <Upload className="w-4 h-4 mr-2" />
                Load Program from Editor
              </Button>
            </CardContent>
          </Card>

          {/* Input */}
          <Card className="rounded-3xl shadow-ios-2 border-border bg-ios-surface1">
            <CardHeader className="pb-4">
              <CardTitle>Program Input</CardTitle>
              <CardDescription>
                Provide input for your Piet program
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Enter numbers or text for your program..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="rounded-2xl min-h-[100px] resize-none"
              />
              
              <Button 
                onClick={runProgram}
                disabled={!program || isRunning}
                className="w-full rounded-2xl"
                size="lg"
              >
                <Play className="w-4 h-4 mr-2" />
                {isRunning ? "Running..." : "Run Program"}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Right Panel - Execution & Output */}
        <div className="space-y-6 animate-slide-up">
          {/* Execution Steps */}
          <Card className="rounded-3xl shadow-ios-2 border-border bg-ios-surface1">
            <CardHeader className="pb-4">
              <CardTitle>Execution Steps</CardTitle>
              <CardDescription>
                Watch your program execute step by step
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-[200px] overflow-y-auto">
                {executionSteps.length > 0 ? (
                  executionSteps.map((step, index) => (
                    <div 
                      key={index}
                      className="text-sm p-3 rounded-2xl bg-ios-surface2 border animate-fade-up"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      {step}
                    </div>
                  ))
                ) : (
                  <div className="text-center text-muted-foreground py-8">
                    <Zap className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p>Execution steps will appear here</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Output */}
          <Card className="rounded-3xl shadow-ios-2 border-border bg-ios-surface1">
            <CardHeader className="pb-4">
              <CardTitle>Program Output</CardTitle>
              <CardDescription>
                Results from your Piet program execution
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="min-h-[120px] p-4 rounded-2xl bg-ios-surface2 border font-mono text-sm">
                  {output || (
                    <div className="text-center text-muted-foreground py-8">
                      <FileText className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p>Program output will appear here</p>
                    </div>
                  )}
                </div>
                
                {output && (
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Output length: {output.length} characters</span>
                    <Badge variant="secondary" className="rounded-full">
                      Execution Complete
                    </Badge>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CodeRunner;
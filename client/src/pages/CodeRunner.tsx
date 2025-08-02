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
    <div className="px-6 py-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold">Runner</h1>
        <p className="text-sm text-muted-foreground">Execute your programs</p>
      </div>

      {/* Program Status */}
      <div className="bg-card border border-border rounded-3xl p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Program Status</h3>
          {program ? (
            <Badge className="rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
              Loaded
            </Badge>
          ) : (
            <Badge variant="outline" className="rounded-full">
              Not Loaded
            </Badge>
          )}
        </div>
        
        {program && (
          <div className="text-sm text-muted-foreground">
            Size: {program.width}×{program.height} pixels
          </div>
        )}
        
        <Button 
          onClick={loadProgram}
          className="w-full rounded-2xl"
          variant="outline"
        >
          <Upload className="w-4 h-4 mr-2" />
          Load from Editor
        </Button>
      </div>

      {/* Input */}
      <div className="bg-card border border-border rounded-3xl p-4 space-y-4">
        <h3 className="font-semibold">Input</h3>
        <Textarea
          placeholder="Enter input for your program..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="rounded-2xl min-h-[80px] resize-none"
        />
      </div>

      {/* Run Button */}
      <Button 
        onClick={runProgram}
        disabled={!program || isRunning}
        className="w-full rounded-2xl"
        size="lg"
      >
        <Play className="w-4 h-4 mr-2" />
        {isRunning ? "Running..." : "Run Program"}
      </Button>

      {/* Output */}
      <div className="bg-card border border-border rounded-3xl p-4 space-y-4">
        <h3 className="font-semibold">Output</h3>
        <div className="min-h-[100px] p-3 rounded-2xl bg-muted border font-mono text-sm">
          {output || (
            <div className="text-center text-muted-foreground py-6">
              Output will appear here
            </div>
          )}
        </div>
      </div>

      {/* Execution Steps */}
      {executionSteps.length > 0 && (
        <div className="bg-card border border-border rounded-3xl p-4 space-y-4">
          <h3 className="font-semibold">Execution Steps</h3>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {executionSteps.map((step, index) => (
              <div 
                key={index}
                className="text-xs p-2 rounded-xl bg-muted"
              >
                {step}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CodeRunner;
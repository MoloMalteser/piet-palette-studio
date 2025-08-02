import { useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Eye, Download, Palette, Code, Sparkles } from "lucide-react";

interface PietExample {
  id: string;
  name: string;
  description: string;
  complexity: "Beginner" | "Intermediate" | "Advanced";
  colors: string[];
  size: string;
  preview: string; // This would be a base64 image or URL in a real app
}

const Gallery = () => {
  const { t } = useLanguage();
  
  const examples: PietExample[] = [
    {
      id: "hello-world",
      name: "Hello World",
      description: "A simple program that outputs 'Hello, World!' - perfect for beginners",
      complexity: "Beginner",
      colors: ["red", "yellow", "green", "white"],
      size: "8×6",
      preview: "🎨"
    },
    {
      id: "fibonacci",
      name: "Fibonacci Sequence",
      description: "Generates the Fibonacci sequence up to a given number",
      complexity: "Intermediate",
      colors: ["red", "yellow", "green", "cyan", "blue", "white"],
      size: "15×12",
      preview: "🔢"
    },
    {
      id: "prime-checker",
      name: "Prime Number Checker",
      description: "Checks if a given number is prime",
      complexity: "Advanced",
      colors: ["red", "yellow", "green", "cyan", "blue", "magenta", "white", "black"],
      size: "20×16",
      preview: "🔍"
    },
    {
      id: "calculator",
      name: "Simple Calculator",
      description: "Basic arithmetic operations with two numbers",
      complexity: "Intermediate",
      colors: ["red", "yellow", "green", "cyan", "white"],
      size: "12×10",
      preview: "🧮"
    },
    {
      id: "sort-array",
      name: "Array Sorter",
      description: "Sorts an array of numbers using bubble sort",
      complexity: "Advanced",
      colors: ["red", "yellow", "green", "cyan", "blue", "magenta", "white"],
      size: "25×20",
      preview: "📊"
    },
    {
      id: "ascii-art",
      name: "ASCII Art Generator",
      description: "Creates simple ASCII patterns and shapes",
      complexity: "Beginner",
      colors: ["red", "green", "blue", "white"],
      size: "10×8",
      preview: "🎭"
    }
  ];

  const [selectedExample, setSelectedExample] = useState<PietExample | null>(null);

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case "Beginner": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "Intermediate": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "Advanced": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const loadExample = (example: PietExample) => {
    // In a real app, this would load the actual Piet program
    console.log("Loading example:", example.id);
    // You could navigate to the editor with the loaded example
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-3 animate-fade-up">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
          Program Gallery
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Explore example Piet programs and learn from interactive samples
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-scale-in">
        <Card className="rounded-3xl shadow-ios-1 border-border bg-ios-surface1 text-center p-4">
          <div className="text-2xl font-bold text-primary">{examples.length}</div>
          <div className="text-sm text-muted-foreground">Examples</div>
        </Card>
        <Card className="rounded-3xl shadow-ios-1 border-border bg-ios-surface1 text-center p-4">
          <div className="text-2xl font-bold text-accent">3</div>
          <div className="text-sm text-muted-foreground">Difficulties</div>
        </Card>
        <Card className="rounded-3xl shadow-ios-1 border-border bg-ios-surface1 text-center p-4">
          <div className="text-2xl font-bold text-green-500">20</div>
          <div className="text-sm text-muted-foreground">Colors Used</div>
        </Card>
        <Card className="rounded-3xl shadow-ios-1 border-border bg-ios-surface1 text-center p-4">
          <div className="text-2xl font-bold text-purple-500">∞</div>
          <div className="text-sm text-muted-foreground">Possibilities</div>
        </Card>
      </div>

      {/* Examples Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-slide-up">
        {examples.map((example, index) => (
          <Card 
            key={example.id} 
            className="rounded-3xl shadow-ios-2 border-border bg-ios-surface1 hover:shadow-ios-3 transition-all duration-300 group"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">
                    {example.name}
                  </CardTitle>
                  <Badge 
                    className={`rounded-full text-xs ${getComplexityColor(example.complexity)}`}
                  >
                    {example.complexity}
                  </Badge>
                </div>
                <div className="text-4xl">{example.preview}</div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <CardDescription className="text-sm leading-relaxed">
                {example.description}
              </CardDescription>
              
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Palette className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Size:</span>
                  <span className="font-medium">{example.size}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <Code className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Colors:</span>
                  <span className="font-medium">{example.colors.length}</span>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1 rounded-xl"
                      onClick={() => setSelectedExample(example)}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      Preview
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl rounded-3xl">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5" />
                        {selectedExample?.name}
                      </DialogTitle>
                      <DialogDescription>
                        {selectedExample?.description}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="aspect-video bg-ios-surface2 rounded-2xl flex items-center justify-center border">
                        <div className="text-center space-y-2">
                          <div className="text-6xl">{selectedExample?.preview}</div>
                          <p className="text-sm text-muted-foreground">
                            Piet Program Preview
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Size: {selectedExample?.size} • Colors: {selectedExample?.colors.length}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          onClick={() => selectedExample && loadExample(selectedExample)}
                          className="flex-1 rounded-xl"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Load in Editor
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
                
                <Button 
                  size="sm" 
                  className="flex-1 rounded-xl"
                  onClick={() => loadExample(example)}
                >
                  <Download className="w-4 h-4 mr-1" />
                  Load
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
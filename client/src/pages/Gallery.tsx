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
    <div className="px-6 py-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold">Gallery</h1>
        <p className="text-sm text-muted-foreground">Explore example programs</p>
      </div>

      {/* Examples List */}
      <div className="space-y-3">
        {examples.map((example) => (
          <div 
            key={example.id} 
            className="bg-card border border-border rounded-3xl p-4 active:scale-95 transition-transform duration-150"
            onClick={() => loadExample(example)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="text-2xl">{example.preview}</div>
                <div className="space-y-1">
                  <div className="font-semibold text-sm">{example.name}</div>
                  <div className="text-xs text-muted-foreground">{example.size}</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge 
                  className={`rounded-full text-xs ${getComplexityColor(example.complexity)}`}
                >
                  {example.complexity}
                </Badge>
                <Download className="w-4 h-4 text-muted-foreground" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
              {example.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
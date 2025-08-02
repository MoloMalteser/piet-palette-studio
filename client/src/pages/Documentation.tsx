import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, Palette, RotateCcw, Move, Plus, Minus, Zap } from "lucide-react";

const Documentation = () => {
  const colorCommands = [
    {
      from: "Red",
      to: "Yellow", 
      hue: 1,
      lightness: 0,
      command: "Push",
      description: "Pushes the top value of the stack"
    },
    {
      from: "Red",
      to: "Green",
      hue: 2, 
      lightness: 0,
      command: "Pop",
      description: "Pops the top value from the stack"
    },
    {
      from: "Yellow",
      to: "Red",
      hue: 5,
      lightness: 0, 
      command: "Add",
      description: "Pops two values, pushes their sum"
    },
    {
      from: "Yellow",
      to: "Green",
      hue: 1,
      lightness: 0,
      command: "Subtract", 
      description: "Pops two values, pushes difference (second - first)"
    },
    {
      from: "Green",
      to: "Red",
      hue: 4,
      lightness: 0,
      command: "Multiply",
      description: "Pops two values, pushes their product"
    },
    {
      from: "Green", 
      to: "Yellow",
      hue: 5,
      lightness: 0,
      command: "Divide",
      description: "Pops two values, pushes quotient (second ÷ first)"
    }
  ];

  const lightnessCommands = [
    {
      from: "Light",
      to: "Normal",
      change: 1,
      command: "Number",
      description: "Pushes the size of the current color block"
    },
    {
      from: "Normal", 
      to: "Dark",
      change: 1,
      command: "Duplicate",
      description: "Duplicates the top value of the stack"
    },
    {
      from: "Dark",
      to: "Light", 
      change: 1,
      command: "Roll",
      description: "Rolls the stack (pops depth and number of rolls)"
    }
  ];

  const specialColors = [
    {
      color: "White",
      description: "No operation - the program pointer passes through"
    },
    {
      color: "Black", 
      description: "Blocks movement - the program pointer cannot pass through"
    }
  ];

  return (
    <div className="px-6 py-6 space-y-6 pb-20">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold">Piet Documentation</h1>
        <p className="text-sm text-muted-foreground">Learn how to program with colors</p>
      </div>

      {/* Overview */}
      <Card className="rounded-3xl border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="w-5 h-5" />
            What is Piet?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground leading-relaxed">
            Piet is an esoteric programming language where the source code consists of images made up of colored pixels. 
            Programs are represented as abstract art, and execution depends on color transitions as the program pointer moves through the image.
          </p>
          
          <div className="grid grid-cols-3 gap-4 p-4 bg-muted rounded-2xl">
            <div className="text-center">
              <div className="text-lg font-bold">20</div>
              <div className="text-xs text-muted-foreground">Colors</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold">18</div>
              <div className="text-xs text-muted-foreground">Commands</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold">∞</div>
              <div className="text-xs text-muted-foreground">Possibilities</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Color Palette */}
      <Card className="rounded-3xl border-border">
        <CardHeader>
          <CardTitle>Color Palette</CardTitle>
          <CardDescription>The 20 standard Piet colors</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Light Colors */}
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Light Colors</h4>
              <div className="grid grid-cols-6 gap-2">
                {['light-red', 'light-yellow', 'light-green', 'light-cyan', 'light-blue', 'light-magenta'].map((color) => (
                  <div key={color} className="aspect-square rounded-xl border border-border" 
                       style={{ backgroundColor: `hsl(var(--piet-${color}))` }} />
                ))}
              </div>
            </div>
            
            {/* Normal Colors */}
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Normal Colors</h4>
              <div className="grid grid-cols-6 gap-2">
                {['red', 'yellow', 'green', 'cyan', 'blue', 'magenta'].map((color) => (
                  <div key={color} className="aspect-square rounded-xl border border-border" 
                       style={{ backgroundColor: `hsl(var(--piet-${color}))` }} />
                ))}
              </div>
            </div>
            
            {/* Dark Colors */}
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Dark Colors</h4>
              <div className="grid grid-cols-6 gap-2">
                {['dark-red', 'dark-yellow', 'dark-green', 'dark-cyan', 'dark-blue', 'dark-magenta'].map((color) => (
                  <div key={color} className="aspect-square rounded-xl border border-border" 
                       style={{ backgroundColor: `hsl(var(--piet-${color}))` }} />
                ))}
              </div>
            </div>
            
            {/* Special Colors */}
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Special Colors</h4>
              <div className="grid grid-cols-2 gap-2">
                <div className="aspect-square rounded-xl border border-border bg-white" />
                <div className="aspect-square rounded-xl border border-border bg-black" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Commands */}
      <Card className="rounded-3xl border-border">
        <CardHeader>
          <CardTitle>Hue Change Commands</CardTitle>
          <CardDescription>Commands triggered by hue transitions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {colorCommands.map((cmd, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-2xl">
                <div className="flex items-center space-x-3">
                  <Badge variant="outline" className="rounded-full text-xs">
                    {cmd.from} → {cmd.to}
                  </Badge>
                  <div>
                    <div className="font-medium text-sm">{cmd.command}</div>
                    <div className="text-xs text-muted-foreground">{cmd.description}</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Lightness Commands */}
      <Card className="rounded-3xl border-border">
        <CardHeader>
          <CardTitle>Lightness Change Commands</CardTitle>
          <CardDescription>Commands triggered by lightness transitions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {lightnessCommands.map((cmd, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-2xl">
                <div className="flex items-center space-x-3">
                  <Badge variant="outline" className="rounded-full text-xs">
                    {cmd.from} → {cmd.to}
                  </Badge>
                  <div>
                    <div className="font-medium text-sm">{cmd.command}</div>
                    <div className="text-xs text-muted-foreground">{cmd.description}</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Special Colors */}
      <Card className="rounded-3xl border-border">
        <CardHeader>
          <CardTitle>Special Colors</CardTitle>
          <CardDescription>White and black have special properties</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {specialColors.map((special, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-muted rounded-2xl">
                <div 
                  className="w-8 h-8 rounded-xl border border-border" 
                  style={{ backgroundColor: special.color.toLowerCase() }}
                />
                <div>
                  <div className="font-medium text-sm">{special.color}</div>
                  <div className="text-xs text-muted-foreground">{special.description}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Start */}
      <Card className="rounded-3xl border-border">
        <CardHeader>
          <CardTitle>Quick Start</CardTitle>
          <CardDescription>Basic steps to create your first Piet program</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start space-x-3 p-3 bg-muted rounded-2xl">
              <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold">1</div>
              <div>
                <div className="font-medium text-sm">Create your canvas</div>
                <div className="text-xs text-muted-foreground">Start with a small grid (10×10 or 20×20)</div>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 p-3 bg-muted rounded-2xl">
              <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold">2</div>
              <div>
                <div className="font-medium text-sm">Paint with purpose</div>
                <div className="text-xs text-muted-foreground">Each color transition creates a command</div>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 p-3 bg-muted rounded-2xl">
              <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold">3</div>
              <div>
                <div className="font-medium text-sm">Test your program</div>
                <div className="text-xs text-muted-foreground">Use the green Run button to execute</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Documentation;
// Piet Programming Language Interpreter
// Based on the official Piet specification

export interface PietProgram {
  width: number;
  height: number;
  grid: string[][];
}

export interface InterpreterState {
  x: number;
  y: number;
  direction: 'right' | 'down' | 'left' | 'up';
  stack: number[];
  output: string[];
  steps: string[];
  blocked: boolean;
  finished: boolean;
}

// Piet color values and their numeric representations
const PIET_COLORS = {
  'light-red': { hue: 0, lightness: 2 },
  'red': { hue: 0, lightness: 1 },
  'dark-red': { hue: 0, lightness: 0 },
  'light-yellow': { hue: 1, lightness: 2 },
  'yellow': { hue: 1, lightness: 1 },
  'dark-yellow': { hue: 1, lightness: 0 },
  'light-green': { hue: 2, lightness: 2 },
  'green': { hue: 2, lightness: 1 },
  'dark-green': { hue: 2, lightness: 0 },
  'light-cyan': { hue: 3, lightness: 2 },
  'cyan': { hue: 3, lightness: 1 },
  'dark-cyan': { hue: 3, lightness: 0 },
  'light-blue': { hue: 4, lightness: 2 },
  'blue': { hue: 4, lightness: 1 },
  'dark-blue': { hue: 4, lightness: 0 },
  'light-magenta': { hue: 5, lightness: 2 },
  'magenta': { hue: 5, lightness: 1 },
  'dark-magenta': { hue: 5, lightness: 0 },
  'white': { hue: -1, lightness: -1 }, // Special: free movement
  'black': { hue: -2, lightness: -2 }  // Special: wall
};

// Command matrix based on hue and lightness changes
const COMMANDS = [
  [null, 'push', 'pop'],           // hue change 0
  ['add', 'subtract', 'multiply'], // hue change 1  
  ['divide', 'mod', 'not'],        // hue change 2
  ['greater', 'pointer', 'switch'], // hue change 3
  ['duplicate', 'roll', 'inumber'], // hue change 4
  ['inchar', 'outnumber', 'outchar'] // hue change 5
];

export class PietInterpreter {
  private program: PietProgram;
  private state: InterpreterState;
  private maxSteps: number;

  constructor(program: PietProgram, maxSteps: number = 1000) {
    this.program = program;
    this.maxSteps = maxSteps;
    this.state = {
      x: 0,
      y: 0,
      direction: 'right',
      stack: [],
      output: [],
      steps: [],
      blocked: false,
      finished: false
    };
  }

  private getColorInfo(color: string) {
    return PIET_COLORS[color as keyof typeof PIET_COLORS] || PIET_COLORS.white;
  }

  private isValidPosition(x: number, y: number): boolean {
    return x >= 0 && x < this.program.width && y >= 0 && y < this.program.height;
  }

  private getColorAt(x: number, y: number): string {
    if (!this.isValidPosition(x, y)) return 'black';
    return this.program.grid[y][x] || 'white';
  }

  private findColorBlock(startX: number, startY: number): Array<{x: number, y: number}> {
    const color = this.getColorAt(startX, startY);
    const visited = new Set<string>();
    const block: Array<{x: number, y: number}> = [];
    const queue = [{x: startX, y: startY}];

    while (queue.length > 0) {
      const {x, y} = queue.shift()!;
      const key = `${x},${y}`;
      
      if (visited.has(key) || !this.isValidPosition(x, y) || this.getColorAt(x, y) !== color) {
        continue;
      }

      visited.add(key);
      block.push({x, y});

      // Add adjacent cells
      queue.push({x: x + 1, y}, {x: x - 1, y}, {x, y: y + 1}, {x, y: y - 1});
    }

    return block;
  }

  private getDirectionVector(direction: string): {dx: number, dy: number} {
    switch (direction) {
      case 'right': return {dx: 1, dy: 0};
      case 'down': return {dx: 0, dy: 1};
      case 'left': return {dx: -1, dy: 0};
      case 'up': return {dx: 0, dy: -1};
      default: return {dx: 1, dy: 0};
    }
  }

  private turnClockwise(): void {
    const directions = ['right', 'down', 'left', 'up'];
    const current = directions.indexOf(this.state.direction);
    this.state.direction = directions[(current + 1) % 4] as any;
  }

  private executeCommand(command: string, blockSize: number): void {
    this.state.steps.push(`Executing: ${command} (block size: ${blockSize})`);

    switch (command) {
      case 'push':
        this.state.stack.push(blockSize);
        break;
      case 'pop':
        if (this.state.stack.length > 0) {
          this.state.stack.pop();
        }
        break;
      case 'add':
        if (this.state.stack.length >= 2) {
          const b = this.state.stack.pop()!;
          const a = this.state.stack.pop()!;
          this.state.stack.push(a + b);
        }
        break;
      case 'subtract':
        if (this.state.stack.length >= 2) {
          const b = this.state.stack.pop()!;
          const a = this.state.stack.pop()!;
          this.state.stack.push(a - b);
        }
        break;
      case 'multiply':
        if (this.state.stack.length >= 2) {
          const b = this.state.stack.pop()!;
          const a = this.state.stack.pop()!;
          this.state.stack.push(a * b);
        }
        break;
      case 'divide':
        if (this.state.stack.length >= 2) {
          const b = this.state.stack.pop()!;
          const a = this.state.stack.pop()!;
          if (b !== 0) {
            this.state.stack.push(Math.floor(a / b));
          }
        }
        break;
      case 'mod':
        if (this.state.stack.length >= 2) {
          const b = this.state.stack.pop()!;
          const a = this.state.stack.pop()!;
          if (b !== 0) {
            this.state.stack.push(a % b);
          }
        }
        break;
      case 'not':
        if (this.state.stack.length >= 1) {
          const a = this.state.stack.pop()!;
          this.state.stack.push(a === 0 ? 1 : 0);
        }
        break;
      case 'greater':
        if (this.state.stack.length >= 2) {
          const b = this.state.stack.pop()!;
          const a = this.state.stack.pop()!;
          this.state.stack.push(a > b ? 1 : 0);
        }
        break;
      case 'duplicate':
        if (this.state.stack.length >= 1) {
          const a = this.state.stack[this.state.stack.length - 1];
          this.state.stack.push(a);
        }
        break;
      case 'outnumber':
        if (this.state.stack.length >= 1) {
          const value = this.state.stack.pop()!;
          this.state.output.push(value.toString());
        }
        break;
      case 'outchar':
        if (this.state.stack.length >= 1) {
          const value = this.state.stack.pop()!;
          if (value >= 0 && value <= 127) {
            this.state.output.push(String.fromCharCode(value));
          }
        }
        break;
      // Simplified implementation for other commands
      default:
        this.state.steps.push(`Command ${command} not fully implemented`);
    }
  }

  public step(): InterpreterState {
    if (this.state.finished || this.state.steps.length >= this.maxSteps) {
      this.state.finished = true;
      return this.state;
    }

    const currentColor = this.getColorAt(this.state.x, this.state.y);
    this.state.steps.push(`At (${this.state.x}, ${this.state.y}) - Color: ${currentColor}`);

    // Handle special colors
    if (currentColor === 'black') {
      this.turnClockwise();
      this.state.steps.push('Hit black wall, turning clockwise');
      return this.state;
    }

    // Find the current color block
    const currentBlock = this.findColorBlock(this.state.x, this.state.y);
    
    // Move to next position
    const {dx, dy} = this.getDirectionVector(this.state.direction);
    const nextX = this.state.x + dx;
    const nextY = this.state.y + dy;

    if (!this.isValidPosition(nextX, nextY) || this.getColorAt(nextX, nextY) === 'black') {
      this.turnClockwise();
      this.state.steps.push('Hit boundary or black, turning clockwise');
      return this.state;
    }

    const nextColor = this.getColorAt(nextX, nextY);
    
    // If moving to white, just move
    if (nextColor === 'white') {
      this.state.x = nextX;
      this.state.y = nextY;
      this.state.steps.push('Moved to white (free movement)');
      return this.state;
    }

    // Calculate command based on color transition
    const currentColorInfo = this.getColorInfo(currentColor);
    const nextColorInfo = this.getColorInfo(nextColor);

    if (currentColorInfo.hue >= 0 && nextColorInfo.hue >= 0) {
      const hueChange = (nextColorInfo.hue - currentColorInfo.hue + 6) % 6;
      const lightnessChange = nextColorInfo.lightness - currentColorInfo.lightness + 1;

      if (lightnessChange >= 0 && lightnessChange < 3 && COMMANDS[hueChange]) {
        const command = COMMANDS[hueChange][lightnessChange];
        if (command) {
          this.executeCommand(command, currentBlock.length);
        }
      }
    }

    // Move to next position
    this.state.x = nextX;
    this.state.y = nextY;

    return this.state;
  }

  public run(): InterpreterState {
    while (!this.state.finished && this.state.steps.length < this.maxSteps) {
      this.step();
    }
    return this.state;
  }

  public getState(): InterpreterState {
    return { ...this.state };
  }
}
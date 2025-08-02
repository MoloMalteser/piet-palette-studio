import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/hooks/useLanguage";
import { useLocation } from "wouter";
import { 
  Palette, 
  Undo2, 
  Eraser, 
  Menu, 
  Download, 
  Play,
  ArrowRight,
  X
} from "lucide-react";

const Welcome = () => {
  const { language, setLanguage, t } = useLanguage();
  const [, setLocation] = useLocation();
  const [currentStep, setCurrentStep] = useState(0);

  const welcomeSteps = [
    {
      title: language === 'de' ? 'Willkommen bei Piet Studio' : 'Welcome to Piet Studio',
      content: language === 'de' 
        ? 'Piet Studio ist ein visueller Programmiereditior. Du erschaffst Programme durch das Malen mit Farben auf einem Pixelraster.'
        : 'Piet Studio is a visual programming editor. You create programs by painting with colors on a pixel grid.',
      icon: Palette
    },
    {
      title: language === 'de' ? 'Farbauswahl' : 'Color Selection',
      content: language === 'de'
        ? 'Tippe auf den Farbkreis oben links, um durch die Piet-Farben zu wechseln. Jede Farbe hat eine spezielle Bedeutung im Piet-Code.'
        : 'Tap the color circle at the top left to cycle through Piet colors. Each color has a special meaning in Piet code.',
      icon: Palette
    },
    {
      title: language === 'de' ? 'Werkzeuge' : 'Tools',
      content: language === 'de'
        ? 'Benutze Pinsel zum Malen und Radierer zum Löschen. Die Undo/Redo Buttons helfen bei Fehlern.'
        : 'Use brush to paint and eraser to delete. Undo/Redo buttons help with mistakes.',
      icon: Eraser
    },
    {
      title: language === 'de' ? 'Burger-Menü' : 'Burger Menu',
      content: language === 'de'
        ? 'Das Menü oben rechts enthält: Grüner Run-Button (Programm ausführen), Download (PNG speichern), und Neues Canvas.'
        : 'The menu at top right contains: Green Run button (execute program), Download (save PNG), and New Canvas.',
      icon: Menu
    },
    {
      title: language === 'de' ? 'Canvas-Zoom' : 'Canvas Zoom',
      content: language === 'de'
        ? 'Benutze zwei Finger zum Vergrößern/Verkleinern des Canvas. Tippe auf Pixel, um sie zu bemalen.'
        : 'Use two fingers to zoom in/out on the canvas. Tap pixels to paint them.',
      icon: ArrowRight
    }
  ];

  const handleNext = () => {
    if (currentStep < welcomeSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Mark welcome as completed and go to main canvas
      localStorage.setItem('welcomeCompleted', 'true');
      setLocation('/');
    }
  };

  const handleSkip = () => {
    localStorage.setItem('welcomeCompleted', 'true');
    setLocation('/');
  };

  const currentWelcome = welcomeSteps[currentStep];
  const Icon = currentWelcome.icon;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center relative">
          <Button 
            variant="ghost" 
            size="sm" 
            className="absolute right-0 top-0 p-2"
            onClick={handleSkip}
          >
            <X className="w-4 h-4" />
          </Button>
          
          {/* Language Toggle */}
          <div className="flex justify-center gap-2 mb-4">
            <Button
              variant={language === 'de' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setLanguage('de')}
              className="rounded-full"
            >
              DE
            </Button>
            <Button
              variant={language === 'en' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setLanguage('en')}
              className="rounded-full"
            >
              EN
            </Button>
          </div>

          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon className="w-8 h-8 text-primary" />
          </div>
          
          <CardTitle className="text-xl">{currentWelcome.title}</CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <p className="text-muted-foreground text-center leading-relaxed">
            {currentWelcome.content}
          </p>

          {/* Progress Dots */}
          <div className="flex justify-center space-x-2">
            {welcomeSteps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentStep 
                    ? 'bg-primary' 
                    : index < currentStep 
                      ? 'bg-primary/60' 
                      : 'bg-border'
                }`}
              />
            ))}
          </div>

          <div className="flex gap-3">
            {currentStep > 0 && (
              <Button 
                variant="outline" 
                onClick={() => setCurrentStep(currentStep - 1)}
                className="flex-1"
              >
                {language === 'de' ? 'Zurück' : 'Back'}
              </Button>
            )}
            
            <Button onClick={handleNext} className="flex-1">
              {currentStep === welcomeSteps.length - 1 
                ? (language === 'de' ? 'Los geht\'s!' : 'Let\'s Start!')
                : (language === 'de' ? 'Weiter' : 'Next')
              }
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Welcome;
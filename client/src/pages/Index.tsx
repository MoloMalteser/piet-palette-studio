import { Link } from "wouter";
import { useLanguage } from "@/hooks/useLanguage";
import { Button } from "@/components/ui/button";
import { Palette, Play, Image, Settings, ArrowRight } from "lucide-react";

const Index = () => {
  const { t } = useLanguage();

  const quickActions = [
    {
      href: "/editor",
      title: "Create",
      subtitle: "Start painting",
      icon: Palette
    },
    {
      href: "/runner",
      title: "Run",
      subtitle: "Execute code",
      icon: Play
    },
    {
      href: "/gallery",
      title: "Explore",
      subtitle: "View examples",
      icon: Image
    },
    {
      href: "/settings",
      title: "Settings",
      subtitle: "Customize app",
      icon: Settings
    }
  ];

  return (
    <div className="px-6 py-8 space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-foreground leading-tight">
            Piet Studio
          </h1>
          <p className="text-lg text-muted-foreground max-w-sm mx-auto">
            Visual programming made simple and beautiful
          </p>
        </div>

        <Link href="/editor">
          <Button size="lg" className="rounded-full px-8 py-3 w-full max-w-xs">
            <Palette className="w-5 h-5 mr-2" />
            Start Creating
          </Button>
        </Link>
      </div>

      {/* Quick Actions Grid */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold px-2">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            
            return (
              <Link key={action.href} href={action.href}>
                <div className="bg-card border border-border rounded-3xl p-6 active:scale-95 transition-transform duration-150">
                  <div className="flex flex-col items-center text-center space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <div className="font-semibold text-foreground">{action.title}</div>
                      <div className="text-sm text-muted-foreground">{action.subtitle}</div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* About Section */}
      <div className="bg-card border border-border rounded-3xl p-6 space-y-4">
        <h3 className="text-lg font-semibold">About Piet</h3>
        <p className="text-muted-foreground leading-relaxed">
          Piet is a programming language where programs are represented as images. 
          Create beautiful art that executes as code using the 20 standard colors.
        </p>
        
        <div className="grid grid-cols-3 gap-4 pt-2">
          <div className="text-center">
            <div className="text-2xl font-bold">20</div>
            <div className="text-xs text-muted-foreground">Colors</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">∞</div>
            <div className="text-xs text-muted-foreground">Programs</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">100%</div>
            <div className="text-xs text-muted-foreground">Visual</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

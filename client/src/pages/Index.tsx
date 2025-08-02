import { Link } from "wouter";
import { useLanguage } from "@/hooks/useLanguage";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Palette, Play, Image, Zap, Sparkles } from "lucide-react";

const Index = () => {
  const { t } = useLanguage();

  const features = [
    {
      href: "/editor",
      title: "Visual Editor",
      description: "Create beautiful Piet programs with an intuitive visual interface",
      icon: Palette,
      gradient: "from-blue-500 to-purple-600",
      soon: false
    },
    {
      href: "/runner",
      title: "Code Runner",
      description: "Execute your Piet programs and see them come to life",
      icon: Play,
      gradient: "from-green-500 to-teal-600",
      soon: false
    },
    {
      href: "/gallery",
      title: "Program Gallery",
      description: "Explore example programs and learn from the community",
      icon: Image,
      gradient: "from-orange-500 to-red-600",
      soon: false
    },
    {
      href: "/settings",
      title: "Customization",
      description: "Personalize your coding experience with themes and settings",
      icon: Zap,
      gradient: "from-purple-500 to-pink-600",
      soon: false
    }
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-6 animate-fade-up">
        <div className="space-y-4">
          <Badge className="rounded-full px-4 py-2 bg-gradient-to-r from-primary/10 to-accent/10 text-primary border-primary/20">
            <Sparkles className="w-4 h-4 mr-2" />
            Welcome to Piet Studio
          </Badge>
          
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent leading-tight">
            {t('app.title')}
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t('app.subtitle')} • {t('app.description')}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/editor">
            <Button size="lg" className="rounded-2xl px-8 py-6 text-lg">
              <Palette className="w-5 h-5 mr-2" />
              Start Creating
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
          
          <Link href="/gallery">
            <Button variant="outline" size="lg" className="rounded-2xl px-8 py-6 text-lg">
              <Image className="w-5 h-5 mr-2" />
              View Examples
            </Button>
          </Link>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 gap-6 animate-slide-up">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          
          return (
            <Link key={feature.href} href={feature.href}>
              <Card 
                className="group rounded-3xl shadow-ios-2 border-border bg-ios-surface1 hover:shadow-ios-3 transition-all duration-300 cursor-pointer h-full"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-3">
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-lg`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      
                      <div className="space-y-2">
                        <CardTitle className="text-xl group-hover:text-primary transition-colors">
                          {feature.title}
                        </CardTitle>
                        {feature.soon && (
                          <Badge variant="secondary" className="rounded-full text-xs">
                            Coming Soon
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-200" />
                  </div>
                </CardHeader>
                
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* About Piet */}
      <Card className="rounded-3xl shadow-ios-2 border-border bg-gradient-to-br from-ios-surface1 to-ios-surface2 animate-spring">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-2xl">About Piet Programming Language</CardTitle>
          <CardDescription className="text-base">
            Discover the art of visual programming
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">20</div>
              <div className="text-sm text-muted-foreground">Standard Colors</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-accent">∞</div>
              <div className="text-sm text-muted-foreground">Possibilities</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-green-500">100%</div>
              <div className="text-sm text-muted-foreground">Visual</div>
            </div>
          </div>
          
          <p className="text-center text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Piet is a unique programming language where the source code consists of images made up of colored pixels. 
            Each color transition represents a different command, making programming a truly visual and artistic experience.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;

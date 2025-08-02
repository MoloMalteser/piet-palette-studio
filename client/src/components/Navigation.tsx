import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { useTheme } from "@/hooks/useTheme";
import { useLanguage } from "@/hooks/useLanguage";
import { Button } from "@/components/ui/button";
import { 
  Palette, 
  Play, 
  Image, 
  Settings, 
  Sun, 
  Moon, 
  Monitor,
  Globe
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navigation = () => {
  const [location] = useLocation();
  const { theme, setTheme, actualTheme } = useTheme();
  const { language, setLanguage } = useLanguage();

  const navItems = [
    {
      href: "/editor",
      label: "Editor",
      icon: Palette,
      description: "Create Piet programs"
    },
    {
      href: "/runner",
      label: "Runner",
      icon: Play,
      description: "Execute programs"
    },
    {
      href: "/gallery",
      label: "Gallery",
      icon: Image,
      description: "Browse examples"
    },
    {
      href: "/settings",
      label: "Settings",
      icon: Settings,
      description: "Customize app"
    }
  ];

  const isActive = (href: string) => {
    if (href === "/editor" && location === "/") return false;
    if (href === "/editor") return location === "/editor";
    return location.startsWith(href);
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-ios-glass border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Palette className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Piet Studio
            </span>
          </div>

          {/* Navigation Items */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              
              return (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={cn(
                      "rounded-2xl px-4 py-2 transition-all duration-200",
                      "hover:bg-ios-surface2 hover:scale-105",
                      active && "bg-primary text-primary-foreground shadow-ios-1"
                    )}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {item.label}
                  </Button>
                </Link>
              );
            })}
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            {/* Theme Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="rounded-2xl px-3">
                  {actualTheme === 'dark' ? (
                    <Moon className="w-4 h-4" />
                  ) : (
                    <Sun className="w-4 h-4" />
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="rounded-2xl">
                <DropdownMenuItem 
                  onClick={() => setTheme('light')}
                  className="rounded-xl"
                >
                  <Sun className="w-4 h-4 mr-2" />
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => setTheme('dark')}
                  className="rounded-xl"
                >
                  <Moon className="w-4 h-4 mr-2" />
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => setTheme('system')}
                  className="rounded-xl"
                >
                  <Monitor className="w-4 h-4 mr-2" />
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="rounded-2xl px-3">
                  <Globe className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="rounded-2xl">
                <DropdownMenuItem 
                  onClick={() => setLanguage('en')}
                  className="rounded-xl"
                >
                  🇺🇸 English
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => setLanguage('de')}
                  className="rounded-xl"
                >
                  🇩🇪 Deutsch
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t border-border/50 bg-ios-surface1/50 backdrop-blur-xl">
        <div className="flex items-center justify-around px-4 py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "flex-col h-auto py-2 px-3 rounded-2xl space-y-1 transition-all duration-200",
                    "hover:bg-ios-surface2",
                    active && "bg-primary text-primary-foreground"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-xs">{item.label}</span>
                </Button>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
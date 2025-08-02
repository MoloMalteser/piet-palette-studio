import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { 
  Home,
  Palette, 
  Play, 
  Image, 
  Settings
} from "lucide-react";

const MobileBottomNav = () => {
  const [location] = useLocation();

  const navItems = [
    {
      href: "/",
      label: "Canvas",
      icon: Palette
    },
    {
      href: "/gallery",
      label: "Gallery",
      icon: Image
    },
    {
      href: "/docs",
      label: "Docs",
      icon: Settings
    }
  ];

  const isActive = (href: string) => {
    if (href === "/" && location === "/") return true;
    if (href !== "/" && location.startsWith(href)) return true;
    return false;
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-ios-glass backdrop-blur-xl border-t border-ios-divider">
      <div className="safe-area-inset-bottom">
        <div className="flex items-center justify-around px-2 py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            
            return (
              <Link key={item.href} href={item.href}>
                <button
                  className={cn(
                    "flex flex-col items-center justify-center p-3 rounded-2xl transition-all duration-200 min-w-[60px]",
                    "hover:bg-secondary active:scale-95",
                    active 
                      ? "text-primary" 
                      : "text-muted-foreground"
                  )}
                >
                  <Icon className={cn(
                    "w-6 h-6 transition-all duration-200",
                    active && "scale-110"
                  )} />
                  <span className={cn(
                    "text-xs mt-1 font-medium transition-all duration-200",
                    active ? "opacity-100" : "opacity-70"
                  )}>
                    {item.label}
                  </span>
                </button>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default MobileBottomNav;
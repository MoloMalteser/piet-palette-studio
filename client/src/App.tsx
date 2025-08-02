import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Router, Route, Switch } from "wouter";
import { ThemeProvider } from "@/hooks/useTheme";
import { LanguageProvider } from "@/hooks/useLanguage";
import MobileBottomNav from "@/components/MobileBottomNav";
import Index from "./pages/Index";
import PietEditor from "./pages/PietEditor";
import CodeRunner from "./pages/CodeRunner";
import Gallery from "./pages/Gallery";
import Settings from "./pages/Settings";
import Documentation from "./pages/Documentation";
import Welcome from "./pages/Welcome";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <div className="min-h-screen bg-background">
            <Router>
              {/* Mobile-first content with bottom navigation */}
              <main className="pb-20">
                <Switch>
                  <Route path="/" component={Index} />
                  <Route path="/welcome" component={Welcome} />
                  <Route path="/editor" component={PietEditor} />
                  <Route path="/runner" component={CodeRunner} />
                  <Route path="/gallery" component={Gallery} />
                  <Route path="/settings" component={Settings} />
                  <Route path="/docs" component={Documentation} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" component={NotFound} />
                </Switch>
              </main>
              <MobileBottomNav />
            </Router>
          </div>
        </TooltipProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;

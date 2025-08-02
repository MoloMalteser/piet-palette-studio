import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Router, Route, Switch } from "wouter";
import { ThemeProvider } from "@/hooks/useTheme";
import { LanguageProvider } from "@/hooks/useLanguage";
import Navigation from "@/components/Navigation";
import Index from "./pages/Index";
import PietEditor from "./pages/PietEditor";
import CodeRunner from "./pages/CodeRunner";
import Gallery from "./pages/Gallery";
import Settings from "./pages/Settings";
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
              <Navigation />
              <main className="max-w-7xl mx-auto p-6">
                <Switch>
                  <Route path="/" component={Index} />
                  <Route path="/editor" component={PietEditor} />
                  <Route path="/runner" component={CodeRunner} />
                  <Route path="/gallery" component={Gallery} />
                  <Route path="/settings" component={Settings} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" component={NotFound} />
                </Switch>
              </main>
            </Router>
          </div>
        </TooltipProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;

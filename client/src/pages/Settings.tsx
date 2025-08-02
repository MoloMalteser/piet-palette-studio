import { useLanguage } from "@/hooks/useLanguage";
import { useTheme } from "@/hooks/useTheme";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Settings as SettingsIcon, Palette, Globe, Monitor, Zap, Save, RotateCcw } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const Settings = () => {
  const { language, setLanguage, t } = useLanguage();
  const { theme, setTheme, actualTheme } = useTheme();
  
  const [autoSave, setAutoSave] = useState(true);
  const [showAnimations, setShowAnimations] = useState(true);
  const [showTooltips, setShowTooltips] = useState(true);
  const [gridOpacity, setGridOpacity] = useState("50");

  const handleReset = () => {
    setTheme('system');
    setLanguage('en');
    setAutoSave(true);
    setShowAnimations(true);
    setShowTooltips(true);
    setGridOpacity("50");
    toast.success("Settings reset to defaults");
  };

  const handleExport = () => {
    const settings = {
      theme,
      language,
      autoSave,
      showAnimations,
      showTooltips,
      gridOpacity
    };
    
    const blob = new Blob([JSON.stringify(settings, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'piet-settings.json';
    a.click();
    URL.revokeObjectURL(url);
    
    toast.success("Settings exported successfully");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-3 animate-fade-up">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
          Settings
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Customize your Piet programming experience
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6 animate-slide-up">
          {/* Appearance */}
          <Card className="rounded-3xl shadow-ios-2 border-border bg-ios-surface1">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2">
                <Palette className="w-5 h-5" />
                {t('settings.title')} - Appearance
              </CardTitle>
              <CardDescription>
                Customize the look and feel of the application
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label className="text-sm font-medium">{t('settings.theme')}</Label>
                <Select value={theme} onValueChange={setTheme}>
                  <SelectTrigger className="rounded-2xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-yellow-400" />
                        {t('settings.light')}
                      </div>
                    </SelectItem>
                    <SelectItem value="dark">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-gray-800" />
                        {t('settings.dark')}
                      </div>
                    </SelectItem>
                    <SelectItem value="system">
                      <div className="flex items-center gap-2">
                        <Monitor className="w-3 h-3" />
                        {t('settings.auto')}
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="rounded-full text-xs">
                    Current: {actualTheme}
                  </Badge>
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <Label className="text-sm font-medium">Grid Opacity</Label>
                <Select value={gridOpacity} onValueChange={setGridOpacity}>
                  <SelectTrigger className="rounded-2xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="25">25% - Subtle</SelectItem>
                    <SelectItem value="50">50% - Balanced</SelectItem>
                    <SelectItem value="75">75% - Strong</SelectItem>
                    <SelectItem value="100">100% - Full</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="animations" className="text-sm font-medium">
                  Show Animations
                </Label>
                <Switch
                  id="animations"
                  checked={showAnimations}
                  onCheckedChange={setShowAnimations}
                />
              </div>
            </CardContent>
          </Card>

          {/* Language & Region */}
          <Card className="rounded-3xl shadow-ios-2 border-border bg-ios-surface1">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                Language & Region
              </CardTitle>
              <CardDescription>
                Set your preferred language and regional settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <Label className="text-sm font-medium">{t('settings.language')}</Label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger className="rounded-2xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">
                      <div className="flex items-center gap-2">
                        🇺🇸 English
                      </div>
                    </SelectItem>
                    <SelectItem value="de">
                      <div className="flex items-center gap-2">
                        🇩🇪 Deutsch
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6 animate-slide-up">
          {/* Editor Preferences */}
          <Card className="rounded-3xl shadow-ios-2 border-border bg-ios-surface1">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2">
                <SettingsIcon className="w-5 h-5" />
                Editor Preferences
              </CardTitle>
              <CardDescription>
                Configure how the Piet editor behaves
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="autosave" className="text-sm font-medium">
                    Auto-save Programs
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Automatically save your work every few seconds
                  </p>
                </div>
                <Switch
                  id="autosave"
                  checked={autoSave}
                  onCheckedChange={setAutoSave}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="tooltips" className="text-sm font-medium">
                    Show Tooltips
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Display helpful hints and explanations
                  </p>
                </div>
                <Switch
                  id="tooltips"
                  checked={showTooltips}
                  onCheckedChange={setShowTooltips}
                />
              </div>
            </CardContent>
          </Card>

          {/* Performance */}
          <Card className="rounded-3xl shadow-ios-2 border-border bg-ios-surface1">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Performance
              </CardTitle>
              <CardDescription>
                Optimize performance for your device
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-green-500">60</div>
                  <div className="text-xs text-muted-foreground">FPS Target</div>
                </div>
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-blue-500">2MB</div>
                  <div className="text-xs text-muted-foreground">Memory Usage</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card className="rounded-3xl shadow-ios-2 border-border bg-ios-surface1">
            <CardHeader className="pb-4">
              <CardTitle>Actions</CardTitle>
              <CardDescription>
                Manage your settings and data
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                onClick={handleExport}
                variant="outline" 
                className="w-full rounded-2xl"
              >
                <Save className="w-4 h-4 mr-2" />
                Export Settings
              </Button>
              
              <Button 
                onClick={handleReset}
                variant="outline" 
                className="w-full rounded-2xl"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset to Defaults
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;
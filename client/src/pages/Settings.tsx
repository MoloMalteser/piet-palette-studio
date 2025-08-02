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
    <div className="px-6 py-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-sm text-muted-foreground">Customize your experience</p>
      </div>

      {/* Theme */}
      <div className="bg-card border border-border rounded-3xl p-4 space-y-4">
        <h3 className="font-semibold">Theme</h3>
        <Select value={theme} onValueChange={setTheme}>
          <SelectTrigger className="rounded-2xl">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">☀️ Light</SelectItem>
            <SelectItem value="dark">🌙 Dark</SelectItem>
            <SelectItem value="system">📱 System</SelectItem>
          </SelectContent>
        </Select>
        <div className="text-xs text-muted-foreground">
          Current: {actualTheme}
        </div>
      </div>

      {/* Language */}
      <div className="bg-card border border-border rounded-3xl p-4 space-y-4">
        <h3 className="font-semibold">Language</h3>
        <Select value={language} onValueChange={setLanguage}>
          <SelectTrigger className="rounded-2xl">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">🇺🇸 English</SelectItem>
            <SelectItem value="de">🇩🇪 Deutsch</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Preferences */}
      <div className="bg-card border border-border rounded-3xl p-4 space-y-4">
        <h3 className="font-semibold">Preferences</h3>
        
        <div className="flex items-center justify-between">
          <div>
            <div className="font-medium text-sm">Auto-save</div>
            <div className="text-xs text-muted-foreground">Save work automatically</div>
          </div>
          <Switch checked={autoSave} onCheckedChange={setAutoSave} />
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <div className="font-medium text-sm">Animations</div>
            <div className="text-xs text-muted-foreground">Show smooth transitions</div>
          </div>
          <Switch checked={showAnimations} onCheckedChange={setShowAnimations} />
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <div className="font-medium text-sm">Tooltips</div>
            <div className="text-xs text-muted-foreground">Show helpful hints</div>
          </div>
          <Switch checked={showTooltips} onCheckedChange={setShowTooltips} />
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-3">
        <Button 
          onClick={handleExport}
          variant="outline" 
          className="w-full rounded-2xl"
        >
          Export Settings
        </Button>
        
        <Button 
          onClick={handleReset}
          variant="outline" 
          className="w-full rounded-2xl"
        >
          Reset to Defaults
        </Button>
      </div>
    </div>
  );
};

export default Settings;
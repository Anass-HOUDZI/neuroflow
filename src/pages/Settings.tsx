
import { useState } from "react";
import { PageLayout, PageHeader } from "@/components/layout/PageLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Settings as SettingsIcon, Palette, Database, Bell, Shield, Download, Activity, Zap } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { useToast } from "@/hooks/use-toast";
import { usageAnalytics } from "@/core/analytics/UsageAnalytics";

export default function Settings() {
  const { isDark, toggleTheme } = useTheme();
  const { toast } = useToast();
  const [notifications, setNotifications] = useState(true);
  const [analytics, setAnalytics] = useState(localStorage.getItem('neuroflow-analytics') === 'true');
  const [autoSave, setAutoSave] = useState(true);
  const [performanceMonitor, setPerformanceMonitor] = useState(localStorage.getItem('neuroflow-perf-monitor') === 'true');

  const handleExportData = () => {
    try {
      const data = {
        timestamp: new Date().toISOString(),
        settings: { isDark, notifications, analytics, autoSave, performanceMonitor },
        usageData: analytics ? usageAnalytics.exportData() : null,
        // Add other local storage data
      };
      
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `neuroflow-backup-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
      
      toast({
        title: "Export réussi",
        description: "Vos données ont été exportées avec succès."
      });
    } catch (error) {
      toast({
        title: "Erreur d'export",
        description: "Impossible d'exporter vos données.",
        variant: "destructive"
      });
    }
  };

  const handleClearData = () => {
    if (confirm("Êtes-vous sûr de vouloir effacer toutes vos données locales ?")) {
      localStorage.clear();
      toast({
        title: "Données effacées",
        description: "Toutes vos données locales ont été supprimées."
      });
    }
  };

  const handleAnalyticsToggle = (enabled: boolean) => {
    setAnalytics(enabled);
    if (enabled) {
      usageAnalytics.enableAnalytics();
      toast({
        title: "Analytics activées",
        description: "Le suivi d'usage anonyme est maintenant activé."
      });
    } else {
      usageAnalytics.disableAnalytics();
      toast({
        title: "Analytics désactivées",
        description: "Le suivi d'usage a été désactivé et les données supprimées."
      });
    }
  };

  const handlePerformanceMonitorToggle = (enabled: boolean) => {
    setPerformanceMonitor(enabled);
    localStorage.setItem('neuroflow-perf-monitor', enabled.toString());
    toast({
      title: enabled ? "Monitoring activé" : "Monitoring désactivé",
      description: enabled 
        ? "Le monitoring de performance est maintenant visible."
        : "Le monitoring de performance a été masqué."
    });
    
    // Reload to apply changes
    if (enabled !== (localStorage.getItem('neuroflow-perf-monitor') === 'true')) {
      setTimeout(() => window.location.reload(), 1000);
    }
  };

  return (
    <PageLayout className="bg-gradient-to-br from-slate-50 to-blue-100 dark:from-gray-900 dark:to-gray-900">
      <PageHeader
        title="Paramètres"
        description="Personnalisez votre expérience NeuroFlow Suite"
        icon={<SettingsIcon className="h-12 w-12 text-blue-600 dark:text-blue-400" />}
      />

      <div className="max-w-2xl mx-auto space-y-6">
        
        {/* Appearance */}
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Apparence
            </CardTitle>
            <CardDescription>
              Personnalisez l'apparence de l'interface
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="theme">Mode sombre</Label>
              <Switch 
                id="theme" 
                checked={isDark} 
                onCheckedChange={toggleTheme} 
              />
            </div>
          </CardContent>
        </Card>

        {/* Privacy & Data */}
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Confidentialité & Données
            </CardTitle>
            <CardDescription>
              Contrôlez vos données et votre confidentialité
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="notifications">Notifications</Label>
              <Switch 
                id="notifications" 
                checked={notifications} 
                onCheckedChange={setNotifications} 
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="analytics">Analyses d'usage (anonymes)</Label>
              <Switch 
                id="analytics" 
                checked={analytics} 
                onCheckedChange={handleAnalyticsToggle} 
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="autosave">Sauvegarde automatique</Label>
              <Switch 
                id="autosave" 
                checked={autoSave} 
                onCheckedChange={setAutoSave} 
              />
            </div>
          </CardContent>
        </Card>

        {/* Phase 5 - Performance & Monitoring */}
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Performance & Monitoring
            </CardTitle>
            <CardDescription>
              Outils de développement et monitoring (Phase 5)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="performance-monitor">Monitor de performance</Label>
              <Switch 
                id="performance-monitor" 
                checked={performanceMonitor} 
                onCheckedChange={handlePerformanceMonitorToggle} 
              />
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <h4 className="font-medium">Outils de développement</h4>
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => window.open('/technical-docs', '_blank')}
                  className="flex items-center gap-1"
                >
                  <Database className="h-3 w-3" />
                  Documentation
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => window.open('/performance-tests', '_blank')}
                  className="flex items-center gap-1"
                >
                  <Zap className="h-3 w-3" />
                  Tests E2E
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data Management */}
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Gestion des données
            </CardTitle>
            <CardDescription>
              Exportez ou supprimez vos données locales
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={handleExportData} variant="outline" className="w-full justify-start">
              <Download className="h-4 w-4 mr-2" />
              Exporter mes données
            </Button>
            
            <Separator />
            
            <Button onClick={handleClearData} variant="destructive" className="w-full">
              Effacer toutes les données
            </Button>
          </CardContent>
        </Card>

        {/* App Info */}
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>À propos</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <p><strong>Version :</strong> 1.0.0 (Phase 5 - Finalization)</p>
            <p><strong>Build :</strong> Production PWA</p>
            <p><strong>Stockage :</strong> 100% Local</p>
            <p><strong>Connexion :</strong> Non requise</p>
            <p><strong>Features :</strong> PWA + Analytics + Monitoring + Tests E2E</p>
          </CardContent>
        </Card>

      </div>
    </PageLayout>
  );
}

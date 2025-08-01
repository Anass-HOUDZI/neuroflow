
import GlobalLayout from "@/components/layout/GlobalLayout";
import { PageHeader } from "@/components/layout/PageLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Settings as SettingsIcon, Palette, Bell, Shield, Database, Download, Upload } from "lucide-react";
import { useSettings } from "@/hooks/useSettings";
import { useOptimizedTheme } from "@/core/hooks/useOptimizedTheme";
import { useRef } from "react";

export default function Settings() {
  const { settings, updateSetting, clearAllData, exportData, importData } = useSettings();
  const { isDark, toggleTheme } = useOptimizedTheme();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      importData(file);
    }
  };

  return (
    <GlobalLayout>
      <div className="bg-gradient-to-br from-slate-50 to-blue-100 dark:from-gray-900 dark:to-gray-900 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <PageHeader
            title="Paramètres"
            description="Personnalisez votre expérience NeuroFlow"
            icon={<SettingsIcon className="h-12 w-12 text-blue-600 dark:text-blue-400" />}
          />

          <div className="grid gap-6 md:grid-cols-2">
            {/* Apparence */}
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5 text-purple-500" />
                  Apparence
                </CardTitle>
                <CardDescription>Personnalisez l'apparence de l'application</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="dark-mode">Mode sombre</Label>
                  <Switch 
                    id="dark-mode" 
                    checked={isDark}
                    onCheckedChange={() => {
                      toggleTheme();
                      updateSetting('darkMode', !isDark);
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Thème de couleur</Label>
                  <Select 
                    value={settings.colorTheme} 
                    onValueChange={(value) => updateSetting('colorTheme', value as any)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un thème" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="blue">Bleu (défaut)</SelectItem>
                      <SelectItem value="green">Vert</SelectItem>
                      <SelectItem value="purple">Violet</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Notifications */}
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-blue-500" />
                  Notifications
                </CardTitle>
                <CardDescription>Gérez vos préférences de notification</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="habit-reminders">Rappels d'habitudes</Label>
                  <Switch 
                    id="habit-reminders" 
                    checked={settings.habitReminders}
                    onCheckedChange={(checked) => updateSetting('habitReminders', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="meditation-reminders">Rappels de méditation</Label>
                  <Switch 
                    id="meditation-reminders" 
                    checked={settings.meditationReminders}
                    onCheckedChange={(checked) => updateSetting('meditationReminders', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="journal-reminders">Rappels de journal</Label>
                  <Switch 
                    id="journal-reminders" 
                    checked={settings.journalReminders}
                    onCheckedChange={(checked) => updateSetting('journalReminders', checked)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Confidentialité */}
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-500" />
                  Confidentialité & Sécurité
                </CardTitle>
                <CardDescription>Vos données restent toujours locales</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="analytics">Analytics anonymes</Label>
                  <Switch 
                    id="analytics" 
                    checked={settings.analytics}
                    onCheckedChange={(checked) => updateSetting('analytics', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="crash-reports">Rapports de crash</Label>
                  <Switch 
                    id="crash-reports" 
                    checked={settings.crashReports}
                    onCheckedChange={(checked) => updateSetting('crashReports', checked)}
                  />
                </div>
                <Button variant="outline" className="w-full" onClick={clearAllData}>
                  Effacer toutes les données locales
                </Button>
              </CardContent>
            </Card>

            {/* Données */}
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5 text-orange-500" />
                  Gestion des données
                </CardTitle>
                <CardDescription>Sauvegardez et restaurez vos données</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full" variant="default" onClick={exportData}>
                  <Download className="h-4 w-4 mr-2" />
                  Exporter mes données
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".json"
                  onChange={handleFileImport}
                  className="hidden"
                />
                <Button 
                  className="w-full" 
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Importer des données
                </Button>
                <div className="text-sm text-muted-foreground">
                  Toutes vos données sont stockées localement sur votre appareil et ne sont jamais transmises.
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </GlobalLayout>
  );
}

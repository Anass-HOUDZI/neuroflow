
import { PageLayout, PageHeader } from "@/components/layout/PageLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Settings as SettingsIcon, Moon, Sun, Globe, Bell, Download, Trash } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { useState, useEffect } from "react";

export default function Settings() {
  const { isDark, toggleTheme } = useTheme();
  const [language, setLanguage] = useState('fr');
  const [notifications, setNotifications] = useState(true);
  const [autoSave, setAutoSave] = useState(true);

  useEffect(() => {
    const savedSettings = localStorage.getItem('neuroflow-settings');
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      setLanguage(settings.language || 'fr');
      setNotifications(settings.notifications ?? true);
      setAutoSave(settings.autoSave ?? true);
    }
  }, []);

  const saveSettings = (newSettings: any) => {
    const settings = {
      language,
      notifications,
      autoSave,
      ...newSettings
    };
    localStorage.setItem('neuroflow-settings', JSON.stringify(settings));
  };

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    saveSettings({ language: value });
  };

  const handleNotificationsChange = (checked: boolean) => {
    setNotifications(checked);
    saveSettings({ notifications: checked });
  };

  const handleAutoSaveChange = (checked: boolean) => {
    setAutoSave(checked);
    saveSettings({ autoSave: checked });
  };

  const exportData = () => {
    const allData = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith('neuroflow-')) {
        allData[key] = localStorage.getItem(key);
      }
    }
    
    const dataStr = JSON.stringify(allData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `neuroflow-backup-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const clearAllData = () => {
    if (confirm('Êtes-vous sûr de vouloir effacer toutes vos données ? Cette action est irréversible.')) {
      const keysToRemove = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key?.startsWith('neuroflow-')) {
          keysToRemove.push(key);
        }
      }
      keysToRemove.forEach(key => localStorage.removeItem(key));
      alert('Toutes vos données ont été effacées.');
      window.location.reload();
    }
  };

  return (
    <PageLayout className="bg-gradient-to-br from-slate-50 to-blue-100 dark:from-gray-900 dark:to-gray-900">
      <PageHeader
        title="Paramètres"
        description="Personnalisez votre expérience NeuroFlow Suite selon vos préférences"
        icon={<SettingsIcon className="h-12 w-12 text-blue-600 dark:text-blue-400" />}
      />

      <div className="space-y-6">
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {isDark ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              Apparence
            </CardTitle>
            <CardDescription>
              Personnalisez l'apparence de l'interface
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Mode sombre</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Activer le thème sombre pour réduire la fatigue oculaire
                </p>
              </div>
              <Switch checked={isDark} onCheckedChange={toggleTheme} />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Langue et Région
            </CardTitle>
            <CardDescription>
              Configurez la langue de l'interface
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Langue de l'interface</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Choisissez votre langue préférée
                </p>
              </div>
              <Select value={language} onValueChange={handleLanguageChange}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications et Données
            </CardTitle>
            <CardDescription>
              Gérez vos préférences de notifications et de sauvegarde
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Notifications</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Recevoir des rappels et notifications
                </p>
              </div>
              <Switch checked={notifications} onCheckedChange={handleNotificationsChange} />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Sauvegarde automatique</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Sauvegarder automatiquement vos données
                </p>
              </div>
              <Switch checked={autoSave} onCheckedChange={handleAutoSaveChange} />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Données et Sauvegarde</CardTitle>
            <CardDescription>
              Gérez vos données personnelles stockées localement
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <Button onClick={exportData} className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Exporter mes données
              </Button>
              
              <Button 
                variant="destructive" 
                onClick={clearAllData}
                className="flex items-center gap-2"
              >
                <Trash className="h-4 w-4" />
                Effacer toutes les données
              </Button>
            </div>
            
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Vos données sont stockées localement sur votre appareil et ne sont jamais transmises à des serveurs externes.
            </p>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}

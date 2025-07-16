
import { useState, useEffect } from 'react';

export interface SettingsState {
  darkMode: boolean;
  colorTheme: 'blue' | 'green' | 'purple';
  habitReminders: boolean;
  meditationReminders: boolean;
  journalReminders: boolean;
  analytics: boolean;
  crashReports: boolean;
}

const defaultSettings: SettingsState = {
  darkMode: false,
  colorTheme: 'blue',
  habitReminders: true,
  meditationReminders: true,
  journalReminders: false,
  analytics: false,
  crashReports: false,
};

export function useSettings() {
  const [settings, setSettings] = useState<SettingsState>(() => {
    const saved = localStorage.getItem('neuroflow-settings');
    return saved ? { ...defaultSettings, ...JSON.parse(saved) } : defaultSettings;
  });

  useEffect(() => {
    localStorage.setItem('neuroflow-settings', JSON.stringify(settings));
  }, [settings]);

  const updateSetting = <K extends keyof SettingsState>(
    key: K,
    value: SettingsState[K]
  ) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const clearAllData = () => {
    const confirmed = window.confirm(
      'Êtes-vous sûr de vouloir effacer toutes vos données locales ? Cette action est irréversible.'
    );
    
    if (confirmed) {
      // Clear all localStorage data except settings
      const keysToKeep = ['neuroflow-settings'];
      const allKeys = Object.keys(localStorage);
      
      allKeys.forEach(key => {
        if (!keysToKeep.includes(key)) {
          localStorage.removeItem(key);
        }
      });
      
      alert('Toutes vos données ont été effacées.');
    }
  };

  const exportData = () => {
    const allData: Record<string, any> = {};
    
    // Collect all localStorage data
    Object.keys(localStorage).forEach(key => {
      try {
        allData[key] = JSON.parse(localStorage.getItem(key) || '');
      } catch {
        allData[key] = localStorage.getItem(key);
      }
    });

    const dataStr = JSON.stringify(allData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `neuroflow-backup-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
  };

  const importData = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        
        Object.entries(data).forEach(([key, value]) => {
          localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value));
        });
        
        alert('Données importées avec succès ! Rechargez la page pour voir les changements.');
      } catch (error) {
        alert('Erreur lors de l\'importation des données. Vérifiez le format du fichier.');
      }
    };
    reader.readAsText(file);
  };

  return {
    settings,
    updateSetting,
    clearAllData,
    exportData,
    importData,
  };
}

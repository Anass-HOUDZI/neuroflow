
import { useState, useEffect } from "react";

export const useTheme = () => {
  const [isDark, setIsDark] = useState(() => {
    // Vérifier si un thème est déjà stocké
    const stored = localStorage.getItem('theme');
    if (stored) {
      return stored === 'dark';
    }
    // Sinon, utiliser la préférence système
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    // Appliquer le thème au chargement
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Sauvegarder la préférence
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return { isDark, toggleTheme };
};


import { useState, useEffect, useCallback } from 'react'

interface ThemeState {
  isDark: boolean
  systemPreference: boolean
}

export function useOptimizedTheme() {
  const [theme, setTheme] = useState<ThemeState>(() => {
    if (typeof window === 'undefined') return { isDark: false, systemPreference: false }
    
    const saved = localStorage.getItem('neuroflow-theme')
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    if (saved) {
      const isDark = saved === 'dark'
      return { isDark, systemPreference: false }
    }
    
    return { isDark: systemPrefersDark, systemPreference: true }
  })

  // Memoized toggle function
  const toggleTheme = useCallback(() => {
    setTheme(prev => {
      const newIsDark = !prev.isDark
      localStorage.setItem('neuroflow-theme', newIsDark ? 'dark' : 'light')
      return { isDark: newIsDark, systemPreference: false }
    })
  }, [])

  // Apply theme changes
  useEffect(() => {
    const root = document.documentElement
    
    if (theme.isDark) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [theme.isDark])

  // Listen to system preference changes only if using system preference
  useEffect(() => {
    if (!theme.systemPreference) return

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e: MediaQueryListEvent) => {
      setTheme(prev => prev.systemPreference ? { ...prev, isDark: e.matches } : prev)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [theme.systemPreference])

  return {
    isDark: theme.isDark,
    toggleTheme,
    isSystemPreference: theme.systemPreference
  }
}

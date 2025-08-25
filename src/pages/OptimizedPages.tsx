/**
 * Optimized Pages Hub - Performance-optimized versions of all pages
 * This file provides lazy-loaded, memoized versions of all application pages
 */

import { lazy, memo } from 'react';
import { withPageOptimization } from '@/core/optimization/PageOptimizer';

// Lazy load all pages with performance optimizations
export const OptimizedIndex = withPageOptimization(
  lazy(() => import('./Index')),
  { pageName: 'Index', enableLazyLoading: true, enablePerformanceMonitoring: true }
);

export const OptimizedAnalytics = withPageOptimization(
  lazy(() => import('./Analytics')),
  { pageName: 'Analytics', enableLazyLoading: true, enablePerformanceMonitoring: true }
);

export const OptimizedDataViz = withPageOptimization(
  lazy(() => import('./DataViz')),
  { pageName: 'DataViz', enableLazyLoading: true, enablePerformanceMonitoring: true }
);

export const OptimizedJournal = withPageOptimization(
  lazy(() => import('./Journal')),
  { pageName: 'Journal', enableLazyLoading: true, enablePerformanceMonitoring: true }
);

export const OptimizedZenPad = withPageOptimization(
  lazy(() => import('./ZenPad')),
  { pageName: 'ZenPad', enableLazyLoading: true, enablePerformanceMonitoring: true }
);

export const OptimizedHabitGrid = withPageOptimization(
  lazy(() => import('./HabitGrid')),
  { pageName: 'HabitGrid', enableLazyLoading: true, enablePerformanceMonitoring: true }
);

export const OptimizedMeditation = withPageOptimization(
  lazy(() => import('./Meditation')),
  { pageName: 'Meditation', enableLazyLoading: true, enablePerformanceMonitoring: true }
);

export const OptimizedMoodTracker = withPageOptimization(
  lazy(() => import('./MoodTracker')),
  { pageName: 'MoodTracker', enableLazyLoading: true, enablePerformanceMonitoring: true }
);

export const OptimizedMindfulBreath = withPageOptimization(
  lazy(() => import('./MindfulBreath')),
  { pageName: 'MindfulBreath', enableLazyLoading: true, enablePerformanceMonitoring: true }
);

export const OptimizedSleepAnalyzer = withPageOptimization(
  lazy(() => import('./SleepAnalyzer')),
  { pageName: 'SleepAnalyzer', enableLazyLoading: true, enablePerformanceMonitoring: true }
);

export const OptimizedGratitudeGarden = withPageOptimization(
  lazy(() => import('./GratitudeGarden')),
  { pageName: 'GratitudeGarden', enableLazyLoading: true, enablePerformanceMonitoring: true }
);

export const OptimizedHydroReminder = withPageOptimization(
  lazy(() => import('./HydroReminder')),
  { pageName: 'HydroReminder', enableLazyLoading: true, enablePerformanceMonitoring: true }
);

export const OptimizedEnergyBalance = withPageOptimization(
  lazy(() => import('./EnergyBalance')),
  { pageName: 'EnergyBalance', enableLazyLoading: true, enablePerformanceMonitoring: true }
);

export const OptimizedAnxietyHelper = withPageOptimization(
  lazy(() => import('./AnxietyHelper')),
  { pageName: 'AnxietyHelper', enableLazyLoading: true, enablePerformanceMonitoring: true }
);

export const OptimizedStressScanner = withPageOptimization(
  lazy(() => import('./StressScanner')),
  { pageName: 'StressScanner', enableLazyLoading: true, enablePerformanceMonitoring: true }
);

export const OptimizedSoundWeaver = withPageOptimization(
  lazy(() => import('./SoundWeaver')),
  { pageName: 'SoundWeaver', enableLazyLoading: true, enablePerformanceMonitoring: true }
);

export const OptimizedStatsPro = withPageOptimization(
  lazy(() => import('./StatsPro')),
  { pageName: 'StatsPro', enableLazyLoading: true, enablePerformanceMonitoring: true }
);

export const OptimizedLocalBoard = withPageOptimization(
  lazy(() => import('./LocalBoard')),
  { pageName: 'LocalBoard', enableLazyLoading: true, enablePerformanceMonitoring: true }
);

export const OptimizedEmotionWheel = withPageOptimization(
  lazy(() => import('./EmotionWheel')),
  { pageName: 'EmotionWheel', enableLazyLoading: true, enablePerformanceMonitoring: true }
);

export const OptimizedSelfCompassion = withPageOptimization(
  lazy(() => import('./SelfCompassion')),
  { pageName: 'SelfCompassion', enableLazyLoading: true, enablePerformanceMonitoring: true }
);

export const OptimizedMindfulEating = withPageOptimization(
  lazy(() => import('./MindfulEating')),
  { pageName: 'MindfulEating', enableLazyLoading: true, enablePerformanceMonitoring: true }
);

export const OptimizedCalendar = withPageOptimization(
  lazy(() => import('./Calendar')),
  { pageName: 'Calendar', enableLazyLoading: true, enablePerformanceMonitoring: true }
);

export const OptimizedGoals = withPageOptimization(
  lazy(() => import('./Goals')),
  { pageName: 'Goals', enableLazyLoading: true, enablePerformanceMonitoring: true }
);

export const OptimizedFavorites = withPageOptimization(
  lazy(() => import('./Favorites')),
  { pageName: 'Favorites', enableLazyLoading: true, enablePerformanceMonitoring: true }
);

export const OptimizedSettings = withPageOptimization(
  lazy(() => import('./Settings')),
  { pageName: 'Settings', enableLazyLoading: true, enablePerformanceMonitoring: true }
);

export const OptimizedAbout = withPageOptimization(
  lazy(() => import('./About')),
  { pageName: 'About', enableLazyLoading: true, enablePerformanceMonitoring: true }
);

export const OptimizedContact = withPageOptimization(
  lazy(() => import('./Contact')),
  { pageName: 'Contact', enableLazyLoading: true, enablePerformanceMonitoring: true }
);

export const OptimizedFitnessLog = withPageOptimization(
  lazy(() => import('./FitnessLog')),
  { pageName: 'FitnessLog', enableLazyLoading: true, enablePerformanceMonitoring: true }
);

export const OptimizedAstingSupport = withPageOptimization(
  lazy(() => import('./AstingSupport')),
  { pageName: 'AstingSupport', enableLazyLoading: true, enablePerformanceMonitoring: true }
);

// Performance metrics collection for all optimized pages
export const collectPageMetrics = (pageName: string) => {
  if (typeof window !== 'undefined') {
    setTimeout(() => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      const loadTime = navigation.loadEventEnd - navigation.loadEventStart;
      console.log(`${pageName} optimized load time: ${loadTime}ms`);
    }, 1000);
  }
};
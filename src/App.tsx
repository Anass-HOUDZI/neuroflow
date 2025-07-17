
import { Suspense, lazy, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { OptimizedErrorBoundary } from '@/core/components/OptimizedErrorBoundary'
import { OptimizedLoadingSpinner } from '@/core/components/OptimizedLoadingSpinner'
import { Toaster } from '@/components/ui/sonner'
import { ThemeProvider } from '@/core/theme/ThemeProvider'
import { FocusManager } from '@/core/accessibility/FocusManager'
import { useGlobalActions } from '@/core/stores/globalStore'
import { useKeyboardShortcuts, globalShortcuts } from '@/shared/hooks/useKeyboardShortcuts'
import { PageTransition } from '@/core/animations/components'

// Lazy load pages for optimal performance
const Index = lazy(() => import('@/pages/Index'))

// Wellness Module - Optimized versions
const OptimizedMoodTracker = lazy(() => import('@/modules/wellness/pages/OptimizedMoodTracker'))
const OptimizedMeditation = lazy(() => import('@/modules/wellness/pages/OptimizedMeditation'))

// Productivity Module - Optimized versions
const OptimizedJournal = lazy(() => import('@/modules/productivity/pages/OptimizedJournal'))
const OptimizedHabitGrid = lazy(() => import('@/modules/productivity/pages/OptimizedHabitGrid'))
const OptimizedZenPad = lazy(() => import('@/modules/productivity/pages/OptimizedZenPad'))

// Health Module - Optimized versions
const OptimizedSleepAnalyzer = lazy(() => import('@/modules/health/pages/OptimizedSleepAnalyzer'))

// Analytics Module - Optimized versions
const OptimizedAnalytics = lazy(() => import('@/modules/analytics/pages/OptimizedAnalytics'))

// Phase 5 - Finalization components
const TechnicalDocs = lazy(() => import('@/core/documentation/TechnicalDocs'))
const PerformanceTestSuite = lazy(() => import('@/core/testing/PerformanceTestSuite'))

// Keep original imports for non-optimized pages for now
const MindfulBreath = lazy(() => import('@/pages/MindfulBreath'))
const AnxietyHelper = lazy(() => import('@/pages/AnxietyHelper'))
const StressScanner = lazy(() => import('@/pages/StressScanner'))
const SelfCompassion = lazy(() => import('@/pages/SelfCompassion'))
const EmotionWheel = lazy(() => import('@/pages/EmotionWheel'))
const GratitudeGarden = lazy(() => import('@/pages/GratitudeGarden'))

// Other modules (to be optimized in next phases)
const LocalBoard = lazy(() => import('@/pages/LocalBoard'))
const Goals = lazy(() => import('@/pages/Goals'))
const Analytics = lazy(() => import('@/pages/Analytics'))
const Calendar = lazy(() => import('@/pages/Calendar'))

const SleepAnalyzer = lazy(() => import('@/pages/SleepAnalyzer'))
const FitnessLog = lazy(() => import('@/pages/FitnessLog'))
const HydroReminder = lazy(() => import('@/pages/HydroReminder'))
const NutrientTracker = lazy(() => import('@/pages/NutrientTracker'))
const AstingSupport = lazy(() => import('@/pages/AstingSupport'))
const MindfulEating = lazy(() => import('@/pages/MindfulEating'))
const EnergyBalance = lazy(() => import('@/pages/EnergyBalance'))

const DataViz = lazy(() => import('@/pages/DataViz'))
const StatsPro = lazy(() => import('@/pages/StatsPro'))
const SoundWeaver = lazy(() => import('@/pages/SoundWeaver'))

const Settings = lazy(() => import('@/pages/Settings'))
const About = lazy(() => import('@/pages/About'))
const Contact = lazy(() => import('@/pages/Contact'))
const Favorites = lazy(() => import('@/pages/Favorites'))
const NotFound = lazy(() => import('@/pages/NotFound'))

// Original pages imports
const MoodTracker = lazy(() => import('@/pages/MoodTracker'))
const ZenPad = lazy(() => import('@/pages/ZenPad'))
const Journal = lazy(() => import('@/pages/Journal'))
const HabitGrid = lazy(() => import('@/pages/HabitGrid'))

// Route tracker component
function RouteTracker() {
  const location = useLocation();
  const { setCurrentRoute } = useGlobalActions();
  
  useEffect(() => {
    setCurrentRoute(location.pathname);
  }, [location.pathname, setCurrentRoute]);
  
  return null;
}

// Connectivity manager
function ConnectivityManager() {
  const { setConnectivity } = useGlobalActions();
  
  useEffect(() => {
    function handleOnline() {
      setConnectivity('online');
    }
    
    function handleOffline() {
      setConnectivity('offline');
    }
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [setConnectivity]);
  
  return null;
}

function AppRoutes() {
  useKeyboardShortcuts({ shortcuts: globalShortcuts });
  
  return (
    <Routes>
      <Route path="/" element={
        <PageTransition>
          <Index />
        </PageTransition>
      } />
      
      {/* Wellness Module - Using correct routes */}
      <Route path="/mood" element={
        <PageTransition>
          <MoodTracker />
        </PageTransition>
      } />
      <Route path="/mood-tracker" element={
        <PageTransition>
          <OptimizedMoodTracker />
        </PageTransition>
      } />
      <Route path="/meditation" element={
        <PageTransition>
          <OptimizedMeditation />
        </PageTransition>
      } />
      <Route path="/mindfulbreath" element={
        <PageTransition>
          <MindfulBreath />
        </PageTransition>
      } />
      <Route path="/mindful-breath" element={
        <PageTransition>
          <MindfulBreath />
        </PageTransition>
      } />
      <Route path="/anxietyhelper" element={
        <PageTransition>
          <AnxietyHelper />
        </PageTransition>
      } />
      <Route path="/anxiety-helper" element={
        <PageTransition>
          <AnxietyHelper />
        </PageTransition>
      } />
      <Route path="/stressscanner" element={
        <PageTransition>
          <StressScanner />
        </PageTransition>
      } />
      <Route path="/stress-scanner" element={
        <PageTransition>
          <StressScanner />
        </PageTransition>
      } />
      <Route path="/selfcompassion" element={
        <PageTransition>
          <SelfCompassion />
        </PageTransition>
      } />
      <Route path="/self-compassion" element={
        <PageTransition>
          <SelfCompassion />
        </PageTransition>
      } />
      <Route path="/emotionwheel" element={
        <PageTransition>
          <EmotionWheel />
        </PageTransition>
      } />
      <Route path="/emotion-wheel" element={
        <PageTransition>
          <EmotionWheel />
        </PageTransition>
      } />
      <Route path="/gratitudegarden" element={
        <PageTransition>
          <GratitudeGarden />
        </PageTransition>
      } />
      <Route path="/gratitude-garden" element={
        <PageTransition>
          <GratitudeGarden />
        </PageTransition>
      } />
      
      {/* Productivity Module - Using correct routes */}
      <Route path="/journal" element={
        <PageTransition>
          <Journal />
        </PageTransition>
      } />
      <Route path="/habitgrid" element={
        <PageTransition>
          <HabitGrid />
        </PageTransition>
      } />
      <Route path="/habit-grid" element={
        <PageTransition>
          <OptimizedHabitGrid />
        </PageTransition>
      } />
      <Route path="/zenpad" element={
        <PageTransition>
          <ZenPad />
        </PageTransition>
      } />
      <Route path="/localboard" element={
        <PageTransition>
          <LocalBoard />
        </PageTransition>
      } />
      <Route path="/local-board" element={
        <PageTransition>
          <LocalBoard />
        </PageTransition>
      } />
      <Route path="/goals" element={
        <PageTransition>
          <Goals />
        </PageTransition>
      } />
      <Route path="/calendar" element={
        <PageTransition>
          <Calendar />
        </PageTransition>
      } />
      
      {/* Health Module - Using correct routes */}
      <Route path="/sleepanalyzer" element={
        <PageTransition>
          <SleepAnalyzer />
        </PageTransition>
      } />
      <Route path="/sleep-analyzer" element={
        <PageTransition>
          <OptimizedSleepAnalyzer />
        </PageTransition>
      } />
      <Route path="/fitnesslog" element={
        <PageTransition>
          <FitnessLog />
        </PageTransition>
      } />
      <Route path="/fitness-log" element={
        <PageTransition>
          <FitnessLog />
        </PageTransition>
      } />
      <Route path="/hydro" element={
        <PageTransition>
          <HydroReminder />
        </PageTransition>
      } />
      <Route path="/hydro-reminder" element={
        <PageTransition>
          <HydroReminder />
        </PageTransition>
      } />
      <Route path="/nutrienttracker" element={
        <PageTransition>
          <NutrientTracker />
        </PageTransition>
      } />
      <Route path="/nutrient-tracker" element={
        <PageTransition>
          <NutrientTracker />
        </PageTransition>
      } />
      <Route path="/astingsupport" element={
        <PageTransition>
          <AstingSupport />
        </PageTransition>
      } />
      <Route path="/asting-support" element={
        <PageTransition>
          <AstingSupport />
        </PageTransition>
      } />
      <Route path="/mindfuleating" element={
        <PageTransition>
          <MindfulEating />
        </PageTransition>
      } />
      <Route path="/mindful-eating" element={
        <PageTransition>
          <MindfulEating />
        </PageTransition>
      } />
      <Route path="/energybalance" element={
        <PageTransition>
          <EnergyBalance />
        </PageTransition>
      } />
      <Route path="/energy-balance" element={
        <PageTransition>
          <EnergyBalance />
        </PageTransition>
      } />
      
      {/* Analytics Module - Using correct routes */}
      <Route path="/analytics" element={
        <PageTransition>
          <OptimizedAnalytics />
        </PageTransition>
      } />
      
      {/* Data Module - Using correct routes */}
      <Route path="/dataviz" element={
        <PageTransition>
          <DataViz />
        </PageTransition>
      } />
      <Route path="/data-viz" element={
        <PageTransition>
          <DataViz />
        </PageTransition>
      } />
      <Route path="/statspro" element={
        <PageTransition>
          <StatsPro />
        </PageTransition>
      } />
      <Route path="/stats-pro" element={
        <PageTransition>
          <StatsPro />
        </PageTransition>
      } />
      <Route path="/soundweaver" element={
        <PageTransition>
          <SoundWeaver />
        </PageTransition>
      } />
      <Route path="/sound-weaver" element={
        <PageTransition>
          <SoundWeaver />
        </PageTransition>
      } />
      
      {/* Phase 5 - Finalization Routes */}
      <Route path="/technical-docs" element={
        <PageTransition>
          <TechnicalDocs />
        </PageTransition>
      } />
      <Route path="/performance-tests" element={
        <PageTransition>
          <PerformanceTestSuite />
        </PageTransition>
      } />
      
      {/* Utility Pages */}
      <Route path="/settings" element={
        <PageTransition>
          <Settings />
        </PageTransition>
      } />
      <Route path="/about" element={
        <PageTransition>
          <About />
        </PageTransition>
      } />
      <Route path="/contact" element={
        <PageTransition>
          <Contact />
        </PageTransition>
      } />
      <Route path="/favorites" element={
        <PageTransition>
          <Favorites />
        </PageTransition>
      } />
      <Route path="*" element={
        <PageTransition>
          <NotFound />
        </PageTransition>
      } />
    </Routes>
  );
}

function App() {
  return (
    <ThemeProvider>
      <FocusManager>
        <Router>
          <OptimizedErrorBoundary>
            <RouteTracker />
            <ConnectivityManager />
            <div className="App">
              <Suspense fallback={<OptimizedLoadingSpinner />}>
                <AppRoutes />
              </Suspense>
              <Toaster />
            </div>
          </OptimizedErrorBoundary>
        </Router>
      </FocusManager>
    </ThemeProvider>
  )
}

export default App

import { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { OptimizedErrorBoundary } from '@/core/components/OptimizedErrorBoundary'
import { OptimizedLoadingSpinner } from '@/core/components/OptimizedLoadingSpinner'
import { Toaster } from '@/components/ui/sonner'

// Lazy load pages for optimal performance
const Index = lazy(() => import('@/pages/Index'))

// Wellness Module - Optimized versions
const OptimizedMoodTracker = lazy(() => import('@/modules/wellness/pages/OptimizedMoodTracker'))
const OptimizedMeditation = lazy(() => import('@/modules/wellness/pages/OptimizedMeditation'))

// Productivity Module - Optimized versions
const OptimizedJournal = lazy(() => import('@/modules/productivity/pages/OptimizedJournal'))
const OptimizedHabitGrid = lazy(() => import('@/modules/productivity/pages/OptimizedHabitGrid'))
const OptimizedZenPad = lazy(() => import('@/modules/productivity/pages/OptimizedZenPad'))

// Health Module - Optimized versions (Phase 4)
const OptimizedSleepAnalyzer = lazy(() => import('@/modules/health/pages/OptimizedSleepAnalyzer'))

// Analytics Module - Optimized versions (Phase 4)
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

function App() {
  return (
    <Router>
      <OptimizedErrorBoundary>
        <div className="App">
          <Suspense fallback={<OptimizedLoadingSpinner />}>
            <Routes>
              <Route path="/" element={<Index />} />
              
              {/* Wellness Module - Using correct routes */}
              <Route path="/mood" element={<MoodTracker />} />
              <Route path="/mood-tracker" element={<OptimizedMoodTracker />} />
              <Route path="/meditation" element={<OptimizedMeditation />} />
              <Route path="/mindfulbreath" element={<MindfulBreath />} />
              <Route path="/mindful-breath" element={<MindfulBreath />} />
              <Route path="/anxietyhelper" element={<AnxietyHelper />} />
              <Route path="/anxiety-helper" element={<AnxietyHelper />} />
              <Route path="/stressscanner" element={<StressScanner />} />
              <Route path="/stress-scanner" element={<StressScanner />} />
              <Route path="/selfcompassion" element={<SelfCompassion />} />
              <Route path="/self-compassion" element={<SelfCompassion />} />
              <Route path="/emotionwheel" element={<EmotionWheel />} />
              <Route path="/emotion-wheel" element={<EmotionWheel />} />
              <Route path="/gratitudegarden" element={<GratitudeGarden />} />
              <Route path="/gratitude-garden" element={<GratitudeGarden />} />
              
              {/* Productivity Module - Using correct routes */}
              <Route path="/journal" element={<Journal />} />
              <Route path="/habitgrid" element={<HabitGrid />} />
              <Route path="/habit-grid" element={<OptimizedHabitGrid />} />
              <Route path="/zenpad" element={<ZenPad />} />
              <Route path="/localboard" element={<LocalBoard />} />
              <Route path="/local-board" element={<LocalBoard />} />
              <Route path="/goals" element={<Goals />} />
              <Route path="/calendar" element={<Calendar />} />
              
              {/* Health Module - Using correct routes */}
              <Route path="/sleepanalyzer" element={<SleepAnalyzer />} />
              <Route path="/sleep-analyzer" element={<OptimizedSleepAnalyzer />} />
              <Route path="/fitnesslog" element={<FitnessLog />} />
              <Route path="/fitness-log" element={<FitnessLog />} />
              <Route path="/hydro" element={<HydroReminder />} />
              <Route path="/hydro-reminder" element={<HydroReminder />} />
              <Route path="/nutrienttracker" element={<NutrientTracker />} />
              <Route path="/nutrient-tracker" element={<NutrientTracker />} />
              <Route path="/astingsupport" element={<AstingSupport />} />
              <Route path="/asting-support" element={<AstingSupport />} />
              <Route path="/mindfuleating" element={<MindfulEating />} />
              <Route path="/mindful-eating" element={<MindfulEating />} />
              <Route path="/energybalance" element={<EnergyBalance />} />
              <Route path="/energy-balance" element={<EnergyBalance />} />
              
              {/* Analytics Module - Using correct routes */}
              <Route path="/analytics" element={<Analytics />} />
              
              {/* Data Module - Using correct routes */}
              <Route path="/dataviz" element={<DataViz />} />
              <Route path="/data-viz" element={<DataViz />} />
              <Route path="/statspro" element={<StatsPro />} />
              <Route path="/stats-pro" element={<StatsPro />} />
              <Route path="/soundweaver" element={<SoundWeaver />} />
              <Route path="/sound-weaver" element={<SoundWeaver />} />
              
              {/* Phase 5 - Finalization Routes */}
              <Route path="/technical-docs" element={<TechnicalDocs />} />
              <Route path="/performance-tests" element={<PerformanceTestSuite />} />
              
              {/* Utility Pages */}
              <Route path="/settings" element={<Settings />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
          <Toaster />
        </div>
      </OptimizedErrorBoundary>
    </Router>
  )
}

export default App

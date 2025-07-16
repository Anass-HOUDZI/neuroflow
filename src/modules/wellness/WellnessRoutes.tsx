
import { Suspense, lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { OptimizedLoadingSpinner } from '@/core/components/OptimizedLoadingSpinner'

// Optimized wellness components
const OptimizedMoodTracker = lazy(() => import('./pages/OptimizedMoodTracker'))
const OptimizedMeditation = lazy(() => import('./pages/OptimizedMeditation'))

// Legacy wellness pages
const MindfulBreath = lazy(() => import('@/pages/MindfulBreath'))
const AnxietyHelper = lazy(() => import('@/pages/AnxietyHelper'))
const StressScanner = lazy(() => import('@/pages/StressScanner'))
const SelfCompassion = lazy(() => import('@/pages/SelfCompassion'))
const EmotionWheel = lazy(() => import('@/pages/EmotionWheel'))
const GratitudeGarden = lazy(() => import('@/pages/GratitudeGarden'))
const MoodTracker = lazy(() => import('@/pages/MoodTracker'))

export default function WellnessRoutes() {
  return (
    <Suspense fallback={<OptimizedLoadingSpinner />}>
      <Routes>
        {/* Wellness module routes */}
        <Route path="/mood-tracker" element={<OptimizedMoodTracker />} />
        <Route path="/meditation" element={<OptimizedMeditation />} />
        <Route path="/mindful-breath" element={<MindfulBreath />} />
        <Route path="/anxiety-helper" element={<AnxietyHelper />} />
        <Route path="/stress-scanner" element={<StressScanner />} />
        <Route path="/self-compassion" element={<SelfCompassion />} />
        <Route path="/emotion-wheel" element={<EmotionWheel />} />
        <Route path="/gratitude-garden" element={<GratitudeGarden />} />
        
        {/* Legacy direct routes */}
        <Route path="/mood" element={<MoodTracker />} />
        <Route path="/mindfulbreath" element={<MindfulBreath />} />
        <Route path="/anxietyhelper" element={<AnxietyHelper />} />
        <Route path="/stressscanner" element={<StressScanner />} />
        <Route path="/selfcompassion" element={<SelfCompassion />} />
        <Route path="/emotionwheel" element={<EmotionWheel />} />
        <Route path="/gratitudegarden" element={<GratitudeGarden />} />
        
        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/mood-tracker" replace />} />
      </Routes>
    </Suspense>
  )
}

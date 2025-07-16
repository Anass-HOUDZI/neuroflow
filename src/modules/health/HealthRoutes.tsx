
import { Suspense, lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { OptimizedLoadingSpinner } from '@/core/components/OptimizedLoadingSpinner'

// Optimized health components
const OptimizedSleepAnalyzer = lazy(() => import('./pages/OptimizedSleepAnalyzer'))

// Legacy health pages
const SleepAnalyzer = lazy(() => import('@/pages/SleepAnalyzer'))
const FitnessLog = lazy(() => import('@/pages/FitnessLog'))
const HydroReminder = lazy(() => import('@/pages/HydroReminder'))
const NutrientTracker = lazy(() => import('@/pages/NutrientTracker'))
const AstingSupport = lazy(() => import('@/pages/AstingSupport'))
const MindfulEating = lazy(() => import('@/pages/MindfulEating'))
const EnergyBalance = lazy(() => import('@/pages/EnergyBalance'))

export default function HealthRoutes() {
  return (
    <Suspense fallback={<OptimizedLoadingSpinner />}>
      <Routes>
        {/* Optimized health routes */}
        <Route path="/sleep-analyzer" element={<OptimizedSleepAnalyzer />} />
        <Route path="/fitness-log" element={<FitnessLog />} />
        <Route path="/hydro-reminder" element={<HydroReminder />} />
        <Route path="/nutrient-tracker" element={<NutrientTracker />} />
        <Route path="/mindful-eating" element={<MindfulEating />} />
        <Route path="/energy-balance" element={<EnergyBalance />} />
        <Route path="/asting-support" element={<AstingSupport />} />
        
        {/* Legacy direct routes */}
        <Route path="/sleepanalyzer" element={<SleepAnalyzer />} />
        <Route path="/fitnesslog" element={<FitnessLog />} />
        <Route path="/hydro" element={<HydroReminder />} />
        <Route path="/nutrienttracker" element={<NutrientTracker />} />
        <Route path="/mindfuleating" element={<MindfulEating />} />
        <Route path="/energybalance" element={<EnergyBalance />} />
        <Route path="/astingsupport" element={<AstingSupport />} />
        
        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/sleep-analyzer" replace />} />
      </Routes>
    </Suspense>
  )
}

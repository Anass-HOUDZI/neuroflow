
import { Suspense, lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { OptimizedLoadingSpinner } from '@/core/components/OptimizedLoadingSpinner'

// Optimized productivity components
const OptimizedJournal = lazy(() => import('./pages/OptimizedJournal'))
const OptimizedHabitGrid = lazy(() => import('./pages/OptimizedHabitGrid'))
const OptimizedZenPad = lazy(() => import('./pages/OptimizedZenPad'))

// Legacy productivity pages
const Journal = lazy(() => import('@/pages/Journal'))
const HabitGrid = lazy(() => import('@/pages/HabitGrid'))
const ZenPad = lazy(() => import('@/pages/ZenPad'))
const LocalBoard = lazy(() => import('@/pages/LocalBoard'))
const Goals = lazy(() => import('@/pages/Goals'))
const Calendar = lazy(() => import('@/pages/Calendar'))

export default function ProductivityRoutes() {
  return (
    <Suspense fallback={<OptimizedLoadingSpinner />}>
      <Routes>
        {/* Optimized productivity routes */}
        <Route path="/journal" element={<OptimizedJournal />} />
        <Route path="/habit-grid" element={<OptimizedHabitGrid />} />
        <Route path="/zenpad" element={<OptimizedZenPad />} />
        <Route path="/local-board" element={<LocalBoard />} />
        <Route path="/goals" element={<Goals />} />
        <Route path="/calendar" element={<Calendar />} />
        
        {/* Legacy direct routes */}
        <Route path="/habitgrid" element={<HabitGrid />} />
        <Route path="/localboard" element={<LocalBoard />} />
        
        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/journal" replace />} />
      </Routes>
    </Suspense>
  )
}

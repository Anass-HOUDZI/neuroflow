
import { Suspense, lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { OptimizedLoadingSpinner } from '@/core/components/OptimizedLoadingSpinner'

// Optimized analytics components
const OptimizedAnalytics = lazy(() => import('./pages/OptimizedAnalytics'))

// Legacy analytics pages
const Analytics = lazy(() => import('@/pages/Analytics'))
const DataViz = lazy(() => import('@/pages/DataViz'))
const StatsPro = lazy(() => import('@/pages/StatsPro'))

export default function AnalyticsRoutes() {
  return (
    <Suspense fallback={<OptimizedLoadingSpinner />}>
      <Routes>
        {/* Optimized analytics routes */}
        <Route path="/dashboard" element={<OptimizedAnalytics />} />
        <Route path="/data-viz" element={<DataViz />} />
        <Route path="/stats-pro" element={<StatsPro />} />
        
        {/* Legacy direct routes */}
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/dataviz" element={<DataViz />} />
        <Route path="/statspro" element={<StatsPro />} />
        
        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Suspense>
  )
}


import { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { OptimizedErrorBoundary } from '@/core/components/OptimizedErrorBoundary'
import { OptimizedLoadingSpinner } from '@/core/components/OptimizedLoadingSpinner'
import { Toaster } from '@/components/ui/sonner'

// Core pages - immediate loading
const Index = lazy(() => import('@/pages/Index'))
const NotFound = lazy(() => import('@/pages/NotFound'))

// Module routes - optimized lazy loading
const WellnessRoutes = lazy(() => import('@/modules/wellness/WellnessRoutes'))
const ProductivityRoutes = lazy(() => import('@/modules/productivity/ProductivityRoutes'))
const HealthRoutes = lazy(() => import('@/modules/health/HealthRoutes'))
const AnalyticsRoutes = lazy(() => import('@/modules/analytics/AnalyticsRoutes'))
const ToolsRoutes = lazy(() => import('@/modules/tools/ToolsRoutes'))

// Settings and static pages
const Settings = lazy(() => import('@/pages/Settings'))
const About = lazy(() => import('@/pages/About'))
const Contact = lazy(() => import('@/pages/Contact'))
const Favorites = lazy(() => import('@/pages/Favorites'))

function App() {
  return (
    <Router>
      <OptimizedErrorBoundary>
        <div className="App">
          <Suspense fallback={<OptimizedLoadingSpinner />}>
            <Routes>
              {/* Core routes */}
              <Route path="/" element={<Index />} />
              
              {/* Module routes */}
              <Route path="/wellness/*" element={<WellnessRoutes />} />
              <Route path="/productivity/*" element={<ProductivityRoutes />} />
              <Route path="/health/*" element={<HealthRoutes />} />
              <Route path="/analytics/*" element={<AnalyticsRoutes />} />
              <Route path="/tools/*" element={<ToolsRoutes />} />
              
              {/* Legacy direct routes for backward compatibility */}
              <Route path="/mood" element={<WellnessRoutes />} />
              <Route path="/mood-tracker" element={<WellnessRoutes />} />
              <Route path="/meditation" element={<WellnessRoutes />} />
              <Route path="/mindful-breath" element={<WellnessRoutes />} />
              <Route path="/anxiety-helper" element={<WellnessRoutes />} />
              <Route path="/stress-scanner" element={<WellnessRoutes />} />
              <Route path="/self-compassion" element={<WellnessRoutes />} />
              <Route path="/emotion-wheel" element={<WellnessRoutes />} />
              <Route path="/gratitude-garden" element={<WellnessRoutes />} />
              
              <Route path="/journal" element={<ProductivityRoutes />} />
              <Route path="/habit-grid" element={<ProductivityRoutes />} />
              <Route path="/zenpad" element={<ProductivityRoutes />} />
              <Route path="/local-board" element={<ProductivityRoutes />} />
              <Route path="/goals" element={<ProductivityRoutes />} />
              <Route path="/calendar" element={<ProductivityRoutes />} />
              
              <Route path="/sleep-analyzer" element={<HealthRoutes />} />
              <Route path="/fitness-log" element={<HealthRoutes />} />
              <Route path="/hydro-reminder" element={<HealthRoutes />} />
              <Route path="/nutrient-tracker" element={<HealthRoutes />} />
              <Route path="/mindful-eating" element={<HealthRoutes />} />
              <Route path="/energy-balance" element={<HealthRoutes />} />
              
              <Route path="/data-viz" element={<AnalyticsRoutes />} />
              <Route path="/stats-pro" element={<AnalyticsRoutes />} />
              
              <Route path="/sound-weaver" element={<ToolsRoutes />} />
              
              {/* Utility pages */}
              <Route path="/settings" element={<Settings />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/favorites" element={<Favorites />} />
              
              {/* 404 fallback */}
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

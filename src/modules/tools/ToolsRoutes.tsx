
import { Suspense, lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { OptimizedLoadingSpinner } from '@/core/components/OptimizedLoadingSpinner'

// Tools pages
const SoundWeaver = lazy(() => import('@/pages/SoundWeaver'))

export default function ToolsRoutes() {
  return (
    <Suspense fallback={<OptimizedLoadingSpinner />}>
      <Routes>
        {/* Tools routes */}
        <Route path="/sound-weaver" element={<SoundWeaver />} />
        
        {/* Legacy direct routes */}
        <Route path="/soundweaver" element={<SoundWeaver />} />
        
        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/sound-weaver" replace />} />
      </Routes>
    </Suspense>
  )
}

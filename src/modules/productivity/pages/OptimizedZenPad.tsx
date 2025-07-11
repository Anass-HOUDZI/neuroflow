
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Sun, Moon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { OptimizedZenEditor } from '../components/zenpad/OptimizedZenEditor'

export const OptimizedZenPad: React.FC = () => {
  const [isDark, setIsDark] = useState(false)
  
  const toggleTheme = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle('dark')
  }
  
  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-indigo-100'
    }`}>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div>
              <h1 className={`text-4xl font-bold ${
                isDark ? 'text-white' : 'text-gray-800'
              }`}>
                ZenPad Optimisé
              </h1>
              <p className={`text-xl ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Écriture zen et concentrée
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              title={isDark ? "Mode clair" : "Mode sombre"}
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          </div>
        </div>
        
        {/* Zen Editor */}
        <OptimizedZenEditor />
      </div>
    </div>
  )
}

export default OptimizedZenPad

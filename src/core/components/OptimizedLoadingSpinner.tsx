
import React, { memo } from 'react'
import { Loader2, Brain } from 'lucide-react'

interface OptimizedLoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  text?: string
  showBrain?: boolean
  className?: string
}

export const OptimizedLoadingSpinner = memo<OptimizedLoadingSpinnerProps>(({ 
  size = 'md',
  text = 'Chargement...',
  showBrain = false,
  className = ''
}) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  }

  const containerSizeClasses = {
    sm: 'gap-2',
    md: 'gap-3',
    lg: 'gap-4'
  }

  return (
    <div className={`min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 ${className}`}>
      <div className={`text-center space-y-4 ${containerSizeClasses[size]}`}>
        <div className="relative flex items-center justify-center">
          {showBrain ? (
            <>
              <Brain className={`${sizeClasses[size]} text-primary animate-pulse`} />
              <div className={`absolute inset-0 ${sizeClasses[size]} border-4 border-primary/20 rounded-full animate-spin border-t-primary`} />
            </>
          ) : (
            <>
              <Loader2 className={`${sizeClasses[size]} animate-spin text-primary`} />
              <div className={`absolute inset-0 ${sizeClasses[size]} border-4 border-primary/20 rounded-full animate-pulse`} />
            </>
          )}
        </div>
        
        <div className="space-y-2">
          <h3 className={`${size === 'lg' ? 'text-xl' : size === 'md' ? 'text-lg' : 'text-base'} font-semibold text-foreground`}>
            {text}
          </h3>
          <p className={`${size === 'lg' ? 'text-base' : 'text-sm'} text-muted-foreground`}>
            Préparation de votre outil de bien-être
          </p>
        </div>
        
        {/* Loading dots animation */}
        <div className="flex justify-center space-x-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"
              style={{
                animationDelay: `${i * 0.2}s`,
                animationDuration: '1s'
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
})

OptimizedLoadingSpinner.displayName = 'OptimizedLoadingSpinner'

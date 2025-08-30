/**
 * Unified Error Boundary - Single source of truth for error handling
 * Replaces all other error boundary implementations
 */

import React, { Component, ErrorInfo, ReactNode } from 'react'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface Props {
  children: ReactNode
  fallback?: React.ComponentType<{ error?: Error; resetError: () => void }>
  onError?: (error: Error, errorInfo: ErrorInfo) => void
  showErrorDetails?: boolean
}

interface State {
  hasError: boolean
  error?: Error
  errorInfo?: ErrorInfo
  errorId: string
}

export class UnifiedErrorBoundary extends Component<Props, State> {
  private retryTimeoutId: number | null = null

  public state: State = {
    hasError: false,
    errorId: ''
  }

  public static getDerivedStateFromError(error: Error): Partial<State> {
    const errorId = Math.random().toString(36).substring(2, 15)
    return { hasError: true, error, errorId }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ errorInfo })
    
    // Secure logging
    if (process.env.NODE_ENV === 'development') {
      console.error('UnifiedErrorBoundary caught an error:', { error, errorInfo })
    } else {
      console.error('Application error occurred:', this.state.errorId)
    }
    
    // Call optional error handler
    this.props.onError?.(error, errorInfo)
    
    // Auto-retry for network/chunk errors
    if (this.isNetworkError(error)) {
      this.retryTimeoutId = window.setTimeout(() => {
        this.handleRetry()
      }, 5000)
    }
  }

  public componentWillUnmount() {
    if (this.retryTimeoutId) {
      clearTimeout(this.retryTimeoutId)
    }
  }

  private isNetworkError(error: Error): boolean {
    return error.message.includes('Loading chunk') || 
           error.message.includes('ChunkLoadError') ||
           error.message.includes('Failed to fetch')
  }

  private handleRetry = () => {
    if (this.retryTimeoutId) {
      clearTimeout(this.retryTimeoutId)
      this.retryTimeoutId = null
    }
    
    this.setState({ 
      hasError: false, 
      error: undefined, 
      errorInfo: undefined,
      errorId: ''
    })
  }

  private handleGoHome = () => {
    window.location.href = '/'
  }

  private handleReload = () => {
    window.location.reload()
  }

  public render() {
    if (this.state.hasError) {
      // Use custom fallback if provided
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback
        return <FallbackComponent error={this.state.error} resetError={this.handleRetry} />
      }

      // Determine error type for better UX
      const isNetworkError = this.state.error && this.isNetworkError(this.state.error)
      const showDetails = this.props.showErrorDetails ?? process.env.NODE_ENV === 'development'
      
      return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-red-50 to-orange-50 dark:from-gray-900 dark:to-gray-800">
          <Card className="max-w-lg w-full bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-4">
                <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
              </div>
              <CardTitle>
                {isNetworkError ? 'Mise à jour disponible' : 'Oops ! Une erreur est survenue'}
              </CardTitle>
              <CardDescription>
                {isNetworkError 
                  ? 'Une nouvelle version est disponible. Veuillez actualiser la page.'
                  : 'L\'application a rencontré un problème inattendu.'
                }
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {showDetails && this.state.error && (
                <details className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg text-xs font-mono">
                  <summary className="cursor-pointer font-semibold mb-2">Détails de l'erreur</summary>
                  <div className="whitespace-pre-wrap">
                    <div className="mb-2">
                      <strong>ID:</strong> {this.state.errorId}
                    </div>
                    <div className="mb-2">
                      <strong>Message:</strong> {this.state.error.message}
                    </div>
                    {this.state.errorInfo?.componentStack && (
                      <div className="mt-2 pt-2 border-t border-gray-300 dark:border-gray-600">
                        <strong>Stack:</strong>
                        {this.state.errorInfo.componentStack}
                      </div>
                    )}
                  </div>
                </details>
              )}
              
              <div className="flex gap-2">
                <Button 
                  onClick={this.handleRetry}
                  className="flex-1"
                  variant="outline"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  {isNetworkError ? 'Actualiser' : 'Réessayer'}
                </Button>
                
                {isNetworkError ? (
                  <Button 
                    onClick={this.handleReload}
                    className="flex-1"
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Recharger
                  </Button>
                ) : (
                  <Button 
                    onClick={this.handleGoHome}
                    className="flex-1"
                  >
                    <Home className="h-4 w-4 mr-2" />
                    Accueil
                  </Button>
                )}
              </div>
              
              {isNetworkError && (
                <p className="text-xs text-center text-muted-foreground">
                  Actualisation automatique dans 5 secondes...
                </p>
              )}
              
              {!showDetails && (
                <p className="text-xs text-center text-muted-foreground">
                  Référence d'erreur: {this.state.errorId}
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      )
    }

    return this.props.children
  }
}

// Hooks pour utilisation facile
export function useErrorBoundary() {
  const [error, setError] = React.useState<Error | null>(null)
  
  const resetError = React.useCallback(() => {
    setError(null)
  }, [])
  
  const throwError = React.useCallback((error: Error) => {
    setError(error)
  }, [])
  
  React.useEffect(() => {
    if (error) {
      throw error
    }
  }, [error])
  
  return { throwError, resetError }
}

export default UnifiedErrorBoundary

import React, { Component, ErrorInfo, ReactNode } from 'react'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface Props {
  children: ReactNode
  fallback?: React.ComponentType<{ error?: Error; resetError: () => void }>
  onError?: (error: Error, errorInfo: ErrorInfo) => void
}

interface State {
  hasError: boolean
  error?: Error
  errorInfo?: ErrorInfo
}

export class OptimizedErrorBoundary extends Component<Props, State> {
  private retryTimeoutId: number | null = null

  public state: State = {
    hasError: false
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('OptimizedErrorBoundary caught an error:', error, errorInfo)
    
    this.setState({ errorInfo })
    
    // Call optional error handler
    this.props.onError?.(error, errorInfo)
    
    // Auto-retry after 5 seconds for network errors
    if (error.message.includes('Loading chunk') || error.message.includes('ChunkLoadError')) {
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

  private handleRetry = () => {
    if (this.retryTimeoutId) {
      clearTimeout(this.retryTimeoutId)
      this.retryTimeoutId = null
    }
    
    this.setState({ hasError: false, error: undefined, errorInfo: undefined })
  }

  private handleGoHome = () => {
    window.location.href = '/'
  }

  public render() {
    if (this.state.hasError) {
      // Use custom fallback if provided
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback
        return <FallbackComponent error={this.state.error} resetError={this.handleRetry} />
      }

      // Determine error type for better UX
      const isChunkError = this.state.error?.message.includes('Loading chunk') || 
                          this.state.error?.message.includes('ChunkLoadError')
      
      return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-red-50 to-orange-50 dark:from-gray-900 dark:to-gray-800">
          <Card className="max-w-md w-full bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-4">
                <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
              </div>
              <CardTitle>
                {isChunkError ? 'Mise à jour disponible' : 'Oops ! Une erreur est survenue'}
              </CardTitle>
              <CardDescription>
                {isChunkError 
                  ? 'Une nouvelle version est disponible. Veuillez actualiser la page.'
                  : 'L\'application a rencontré un problème inattendu.'
                }
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg text-xs font-mono">
                  <summary className="cursor-pointer font-semibold mb-2">Détails de l'erreur</summary>
                  <div className="whitespace-pre-wrap">
                    {this.state.error.message}
                    {this.state.errorInfo?.componentStack && (
                      <div className="mt-2 pt-2 border-t border-gray-300 dark:border-gray-600">
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
                  {isChunkError ? 'Actualiser' : 'Réessayer'}
                </Button>
                <Button 
                  onClick={this.handleGoHome}
                  className="flex-1"
                >
                  <Home className="h-4 w-4 mr-2" />
                  Accueil
                </Button>
              </div>
              
              {isChunkError && (
                <p className="text-xs text-center text-muted-foreground">
                  Actualisation automatique dans 5 secondes...
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


import { Loader2 } from 'lucide-react';

export const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
    <div className="text-center space-y-4">
      <div className="relative">
        <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
        <div className="absolute inset-0 h-12 w-12 border-4 border-primary/20 rounded-full animate-pulse" />
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-foreground">Chargement...</h3>
        <p className="text-sm text-muted-foreground">Préparation de votre outil de bien-être</p>
      </div>
    </div>
  </div>
);

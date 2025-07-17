
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, ArrowLeft, Search, Brain } from "lucide-react";
import GlobalLayout from "@/components/layout/GlobalLayout";

export default function NotFound() {
  return (
    <GlobalLayout showBreadcrumb={false}>
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-50 to-blue-100 dark:from-gray-900 dark:to-gray-900">
        <Card className="max-w-lg w-full text-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-2xl">
          <CardHeader className="pb-4">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                  <Brain className="h-10 w-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 text-4xl">🔍</div>
              </div>
            </div>
            <CardTitle className="text-2xl sm:text-3xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Page introuvable
            </CardTitle>
            <CardDescription className="text-base sm:text-lg mt-2">
              La page que vous recherchez n'existe pas ou a été déplacée.
              Retournez à l'accueil pour découvrir nos outils de bien-être.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pt-2">
            <div className="flex flex-col gap-3">
              <Button asChild className="w-full h-12 text-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                <Link to="/">
                  <Home className="h-5 w-5 mr-2" />
                  Retour à l'accueil
                </Link>
              </Button>
              
              <Button variant="outline" onClick={() => window.history.back()} className="w-full h-12 text-lg">
                <ArrowLeft className="h-5 w-5 mr-2" />
                Page précédente
              </Button>
            </div>
            
            <div className="pt-4 border-t">
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-3">
                <Search className="h-4 w-4" />
                <span>Outils populaires</span>
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                <Link to="/mood" className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-xs hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors">
                  Humeur
                </Link>
                <Link to="/zenpad" className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors">
                  ZenPad
                </Link>
                <Link to="/mindfulbreath" className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-xs hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors">
                  Respiration
                </Link>
                <Link to="/habitgrid" className="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-full text-xs hover:bg-orange-200 dark:hover:bg-orange-900/50 transition-colors">
                  Habitudes
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </GlobalLayout>
  );
}

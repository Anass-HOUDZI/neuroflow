import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ArrowLeft, BarChart3, PieChart, TrendingUp, Calendar, Brain, Heart, Target, Activity } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAnalyticsStore } from '@/core/stores/analyticsStore'
import { useProductivityStore } from '@/core/stores/productivityStore'
import { useWellnessStore } from '@/core/stores/wellnessStore'
import { useHealthStore } from '@/core/stores/healthStore'
import { PerformanceDashboard } from '../components/PerformanceDashboard'

export const OptimizedAnalytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'quarter'>('month')
  
  const { getConsolidatedInsights, getCrossModuleCorrelations } = useAnalyticsStore()
  const productivityStats = useProductivityStore((state) => state.getStats())
  const wellnessStats = useWellnessStore((state) => state.getStats())
  const healthStats = useHealthStore((state) => state.getSleepStats())
  
  const insights = getConsolidatedInsights(timeRange)
  const correlations = getCrossModuleCorrelations()
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
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
              <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
                Analytics Avancé
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Insights et performance en temps réel
              </p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button
              variant={timeRange === 'week' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTimeRange('week')}
            >
              Semaine
            </Button>
            <Button
              variant={timeRange === 'month' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTimeRange('month')}
            >
              Mois
            </Button>
            <Button
              variant={timeRange === 'quarter' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTimeRange('quarter')}
            >
              Trimestre
            </Button>
          </div>
        </div>
        
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Score Global</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{insights.overallScore}/100</div>
              <p className="text-xs text-muted-foreground">
                Bien-être général
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Productivité</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{productivityStats.journal.totalEntries}</div>
              <p className="text-xs text-muted-foreground">
                Entrées journal
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Bien-être</CardTitle>
              <Heart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{wellnessStats.mood.averageMood.toFixed(1)}</div>
              <p className="text-xs text-muted-foreground">
                Humeur moyenne
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sommeil</CardTitle>
              <Brain className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{healthStats.averageDuration.toFixed(1)}h</div>
              <p className="text-xs text-muted-foreground">
                Durée moyenne
              </p>
            </CardContent>
          </Card>
        </div>
        
        {/* Main Analytics */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
            <TabsTrigger value="performance">
              <Activity className="h-4 w-4 mr-2" />
              Performance
            </TabsTrigger>
            <TabsTrigger value="correlations">Corrélations</TabsTrigger>
            <TabsTrigger value="trends">Tendances</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Modules Actifs
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Journal</span>
                      <span className="font-medium">{productivityStats.journal.totalEntries} entrées</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Habitudes</span>
                      <span className="font-medium">{productivityStats.habits.activeHabits} actives</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Humeur</span>
                      <span className="font-medium">{wellnessStats.mood.totalEntries} suivis</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Sommeil</span>
                      <span className="font-medium">{healthStats.totalEntries} nuits</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="h-5 w-5" />
                    Répartition Activités
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Écriture</span>
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                        </div>
                        <span className="text-sm">75%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Méditation</span>
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                        </div>
                        <span className="text-sm">45%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Tracking</span>
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div className="bg-purple-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                        </div>
                        <span className="text-sm">60%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="performance" className="space-y-6">
            <PerformanceDashboard />
          </TabsContent>
          
          <TabsContent value="correlations" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Corrélations Inter-Modules</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {correlations.map((correlation, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{correlation.title}</span>
                        <span className={`text-sm px-2 py-1 rounded ${
                          correlation.strength === 'strong' ? 'bg-green-100 text-green-800' :
                          correlation.strength === 'moderate' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {correlation.strength === 'strong' ? 'Fort' :
                           correlation.strength === 'moderate' ? 'Modéré' : 'Faible'}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{correlation.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="trends" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Tendances sur {timeRange === 'week' ? '7 jours' : timeRange === 'month' ? '30 jours' : '90 jours'}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-muted-foreground">
                  <div className="text-center">
                    <Calendar className="h-12 w-12 mx-auto mb-4" />
                    <p>Graphiques de tendances</p>
                    <p className="text-sm">À implémenter avec Recharts</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="insights" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Insights Personnalisés</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {insights.recommendations.map((insight, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Brain className="h-4 w-4 text-blue-500" />
                        <span className="font-medium">{insight.title}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{insight.description}</p>
                      <div className={`text-xs px-2 py-1 rounded-full inline-block mt-2 ${
                        insight.priority === 'high' ? 'bg-red-100 text-red-800' :
                        insight.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        Priorité {insight.priority === 'high' ? 'Haute' : insight.priority === 'medium' ? 'Moyenne' : 'Basse'}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default OptimizedAnalytics

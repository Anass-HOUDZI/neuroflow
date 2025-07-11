
import React, { useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  BarChart3, 
  TrendingUp, 
  Brain, 
  Target, 
  Lightbulb,
  Activity,
  Heart,
  Moon,
  Dumbbell,
  BookOpen,
  Smile
} from 'lucide-react'
import { useAnalyticsStore } from '@/core/stores/analyticsStore'
import { useHealthStore } from '@/core/stores/healthStore'
import { useWellnessStore } from '@/core/stores/wellnessStore'
import { useProductivityStore } from '@/core/stores/productivityStore'
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts'

export const OptimizedAnalytics: React.FC = () => {
  const { 
    personalMetrics, 
    insights, 
    crossModuleCorrelations,
    updatePersonalMetrics,
    generateInsights,
    generateCorrelations
  } = useAnalyticsStore()
  
  const { sleepEntries } = useHealthStore()
  const { moodEntries } = useWellnessStore()
  const { journalEntries, habits } = useProductivityStore()
  
  // Generate analytics on component mount
  useEffect(() => {
    updatePersonalMetrics()
    generateInsights()
    generateCorrelations()
  }, [updatePersonalMetrics, generateInsights, generateCorrelations])
  
  // Prepare chart data
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - (6 - i))
    return date.toISOString().split('T')[0]
  })
  
  const trendData = last7Days.map((date, index) => {
    const dayMoodEntries = moodEntries.filter(entry => entry.date === date)
    const avgMood = dayMoodEntries.length > 0 
      ? dayMoodEntries.reduce((sum, entry) => sum + entry.mood, 0) / dayMoodEntries.length 
      : 0
    
    const daySleepEntries = sleepEntries.filter(entry => entry.date === date)
    const avgSleepQuality = daySleepEntries.length > 0
      ? daySleepEntries.reduce((sum, entry) => sum + entry.quality, 0) / daySleepEntries.length
      : 0
    
    return {
      day: `J-${6-index}`,
      mood: Math.round(avgMood * 10) / 10,
      sleep: Math.round(avgSleepQuality * 10) / 10,
      productivity: Math.random() * 3 + 7 // Mock data
    }
  })
  
  // Radar chart data for personal metrics
  const radarData = personalMetrics ? [
    { metric: 'Bien-être', value: personalMetrics.wellness.avgMood, fullMark: 10 },
    { metric: 'Productivité', value: personalMetrics.productivity.habitCompletion / 10, fullMark: 10 },
    { metric: 'Sommeil', value: personalMetrics.health.sleepQuality, fullMark: 10 },
    { metric: 'Forme', value: personalMetrics.health.fitnessConsistency / 10, fullMark: 10 },
    { metric: 'Nutrition', value: personalMetrics.health.nutritionScore / 10, fullMark: 10 },
    { metric: 'Hydratation', value: personalMetrics.health.hydrationLevel / 10, fullMark: 10 }
  ] : []
  
  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'trend': return <TrendingUp className="h-4 w-4" />
      case 'correlation': return <Brain className="h-4 w-4" />
      case 'anomaly': return <Activity className="h-4 w-4" />
      case 'prediction': return <Target className="h-4 w-4" />
      default: return <Lightbulb className="h-4 w-4" />
    }
  }
  
  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-red-500'
      case 'medium': return 'bg-yellow-500'
      case 'low': return 'bg-green-500'
      default: return 'bg-gray-500'
    }
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-violet-100 dark:bg-violet-900/20 rounded-lg">
            <BarChart3 className="h-8 w-8 text-violet-600 dark:text-violet-400" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
              Analytics Dashboard
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Insights cross-module et analytics avancées
            </p>
          </div>
        </div>
        
        {/* Personal Metrics Overview */}
        {personalMetrics && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Score Bien-être</CardTitle>
                <Smile className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {personalMetrics.wellness.avgMood.toFixed(1)}/10
                </div>
                <Badge variant="outline" className="mt-2">
                  {personalMetrics.wellness.moodTrend === 'improving' ? '↗️ En amélioration' :
                   personalMetrics.wellness.moodTrend === 'declining' ? '↘️ En baisse' : '→ Stable'}
                </Badge>
                <Progress value={personalMetrics.wellness.avgMood * 10} className="mt-2" />
              </CardContent>
            </Card>
            
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Performance Productivité</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">
                  {personalMetrics.productivity.habitCompletion}%
                </div>
                <p className="text-xs text-muted-foreground">
                  {personalMetrics.productivity.journalEntries} entrées journal
                </p>
                <Progress value={personalMetrics.productivity.habitCompletion} className="mt-2" />
              </CardContent>
            </Card>
            
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Score Santé</CardTitle>
                <Heart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">
                  {((personalMetrics.health.sleepQuality + personalMetrics.health.fitnessConsistency/10 + personalMetrics.health.nutritionScore/10) / 3).toFixed(1)}/10
                </div>
                <div className="flex gap-2 mt-2">
                  <Badge variant="outline" className="text-xs">
                    <Moon className="h-3 w-3 mr-1" />
                    {personalMetrics.health.sleepQuality}/10
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    <Dumbbell className="h-3 w-3 mr-1" />
                    {personalMetrics.health.fitnessConsistency}%
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Multi-Module Trends */}
          <div className="lg:col-span-2">
            <Card className="bg-white/80 backdrop-blur-sm mb-6">
              <CardHeader>
                <CardTitle>Tendances Cross-Module (7 derniers jours)</CardTitle>
                <CardDescription>
                  Corrélations entre humeur, sommeil et productivité
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={trendData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis domain={[0, 10]} />
                      <Tooltip 
                        formatter={(value, name) => [
                          `${value}/10`,
                          name === 'mood' ? 'Humeur' : name === 'sleep' ? 'Sommeil' : 'Productivité'
                        ]}
                      />
                      <Line type="monotone" dataKey="mood" stroke="#10b981" strokeWidth={2} name="mood" />
                      <Line type="monotone" dataKey="sleep" stroke="#3b82f6" strokeWidth={2} name="sleep" />
                      <Line type="monotone" dataKey="productivity" stroke="#8b5cf6" strokeWidth={2} name="productivity" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            {/* Personal Radar */}
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Profil Personnel Holistique</CardTitle>
                <CardDescription>
                  Vue d'ensemble de tous vos domaines de vie
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={radarData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="metric" />
                      <PolarRadiusAxis domain={[0, 10]} />
                      <Radar 
                        name="Score" 
                        dataKey="value" 
                        stroke="#8b5cf6" 
                        fill="#8b5cf6" 
                        fillOpacity={0.3}
                        strokeWidth={2}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Insights & Correlations */}
          <div className="space-y-6">
            {/* AI Insights */}
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  Insights IA
                </CardTitle>
                <CardDescription>
                  Recommandations personnalisées
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {insights.map((insight) => (
                  <div key={insight.id} className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {getInsightIcon(insight.type)}
                        <h4 className="font-medium text-sm">{insight.title}</h4>
                      </div>
                      <Badge variant="outline" className={`${getImpactColor(insight.impact)} text-white text-xs`}>
                        {insight.impact}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {insight.description}
                    </p>
                    {insight.recommendation && (
                      <div className="text-xs text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 p-2 rounded">
                        💡 {insight.recommendation}
                      </div>
                    )}
                    <div className="text-xs text-muted-foreground mt-2">
                      Confiance: {Math.round(insight.confidence * 100)}%
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
            
            {/* Cross-Module Correlations */}
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Corrélations Détectées
                </CardTitle>
                <CardDescription>
                  Liens entre vos différents domaines
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {crossModuleCorrelations.map((correlation) => (
                  <div key={correlation.id} className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-sm font-medium">
                        {correlation.variable1.label} ↔ {correlation.variable2.label}
                      </div>
                      <Badge variant="outline" className={
                        correlation.strength === 'strong' || correlation.strength === 'very strong' 
                          ? 'bg-green-500 text-white' 
                          : correlation.strength === 'moderate' 
                          ? 'bg-yellow-500 text-white' 
                          : 'bg-gray-500 text-white'
                      }>
                        {correlation.strength}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Corrélation: {correlation.correlation > 0 ? '+' : ''}{correlation.correlation.toFixed(2)}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {correlation.significance} (n={correlation.sampleSize})
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
            
            {/* Quick Actions */}
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Actions Rapides</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full justify-start" 
                  onClick={() => {
                    generateInsights()
                    generateCorrelations()
                  }}
                >
                  <Brain className="h-4 w-4 mr-2" />
                  Régénérer les insights
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Créer un rapport
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Target className="h-4 w-4 mr-2" />
                  Définir nouveaux objectifs
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

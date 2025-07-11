
import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Moon, Sun, Clock, TrendingUp, Target, Brain } from 'lucide-react'
import { useHealthStore } from '@/core/stores/healthStore'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts'

export const OptimizedSleepAnalyzer: React.FC = () => {
  const [bedtime, setBedtime] = useState('')
  const [waketime, setWaketime] = useState('')
  const [quality, setQuality] = useState(5)
  const [notes, setNotes] = useState('')
  
  const { 
    sleepEntries, 
    sleepGoals, 
    addSleepEntry, 
    setSleepGoals,
    generateInsights
  } = useHealthStore()
  
  const handleAddEntry = () => {
    if (!bedtime || !waketime) return
    
    const bedtimeDate = new Date(`2024-01-01T${bedtime}:00`)
    const waketimeDate = new Date(`2024-01-01T${waketime}:00`)
    
    // Handle overnight sleep
    if (waketimeDate < bedtimeDate) {
      waketimeDate.setDate(waketimeDate.getDate() + 1)
    }
    
    const duration = (waketimeDate.getTime() - bedtimeDate.getTime()) / (1000 * 60)
    const sleepDebt = Math.max(0, sleepGoals.targetDuration - duration)
    
    addSleepEntry({
      date: new Date().toISOString().split('T')[0],
      bedtime,
      waketime,
      quality,
      duration,
      sleepDebt,
      notes
    })
    
    // Reset form
    setBedtime('')
    setWaketime('')
    setQuality(5)
    setNotes('')
    
    // Generate new insights
    generateInsights()
  }
  
  // Calculate sleep statistics
  const recentEntries = sleepEntries.slice(0, 7)
  const avgDuration = recentEntries.length > 0 
    ? recentEntries.reduce((sum, entry) => sum + entry.duration, 0) / recentEntries.length 
    : 0
  const avgQuality = recentEntries.length > 0
    ? recentEntries.reduce((sum, entry) => sum + entry.quality, 0) / recentEntries.length
    : 0
  const totalSleepDebt = recentEntries.reduce((sum, entry) => sum + entry.sleepDebt, 0)
  
  // Chart data
  const chartData = sleepEntries.slice(0, 14).reverse().map((entry, index) => ({
    day: `J-${13-index}`,
    duration: Math.round(entry.duration / 60 * 10) / 10,
    quality: entry.quality,
    target: sleepGoals.targetDuration / 60
  }))
  
  const getQualityColor = (quality: number) => {
    if (quality >= 8) return 'bg-green-500'
    if (quality >= 6) return 'bg-yellow-500'
    return 'bg-red-500'
  }
  
  const getQualityText = (quality: number) => {
    if (quality >= 8) return 'Excellent'
    if (quality >= 6) return 'Bon'
    if (quality >= 4) return 'Moyen'
    return 'Mauvais'
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-indigo-100 dark:bg-indigo-900/20 rounded-lg">
            <Moon className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
              SleepAnalyzer Pro
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Optimisez votre sommeil avec des insights scientifiques
            </p>
          </div>
        </div>
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Durée Moyenne</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {(avgDuration / 60).toFixed(1)}h
              </div>
              <p className="text-xs text-muted-foreground">
                Objectif: {(sleepGoals.targetDuration / 60).toFixed(1)}h
              </p>
              <Progress 
                value={(avgDuration / sleepGoals.targetDuration) * 100} 
                className="mt-2"
              />
            </CardContent>
          </Card>
          
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Qualité Moyenne</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{avgQuality.toFixed(1)}/10</div>
              <Badge variant="outline" className={`mt-2 ${getQualityColor(avgQuality)} text-white`}>
                {getQualityText(avgQuality)}
              </Badge>
            </CardContent>
          </Card>
          
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Dette de Sommeil</CardTitle>
              <Brain className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {(totalSleepDebt / 60).toFixed(1)}h
              </div>
              <p className="text-xs text-muted-foreground">
                Sur 7 jours
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Consistency</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {recentEntries.filter(e => Math.abs(e.duration - sleepGoals.targetDuration) < 30).length}/{recentEntries.length}
              </div>
              <p className="text-xs text-muted-foreground">
                Nuits dans l'objectif
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Add Sleep Entry */}
          <div className="lg:col-span-1">
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Moon className="h-5 w-5" />
                  Nouvelle Nuit
                </CardTitle>
                <CardDescription>
                  Enregistrez votre sommeil d'hier soir
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="bedtime">Coucher</Label>
                    <Input
                      id="bedtime"
                      type="time"
                      value={bedtime}
                      onChange={(e) => setBedtime(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="waketime">Lever</Label>
                    <Input
                      id="waketime"
                      type="time"
                      value={waketime}
                      onChange={(e) => setWaketime(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Qualité du sommeil (1-10)</Label>
                  <div className="px-3 py-2">
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={quality}
                      onChange={(e) => setQuality(Number(e.target.value))}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground mt-1">
                      <span>Très mauvais</span>
                      <span className="font-medium">{quality}/10</span>
                      <span>Excellent</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes (optionnel)</Label>
                  <Textarea
                    id="notes"
                    placeholder="Rêves, réveils nocturnes, sensation au réveil..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                  />
                </div>
                
                <Button onClick={handleAddEntry} className="w-full" disabled={!bedtime || !waketime}>
                  Enregistrer la nuit
                </Button>
              </CardContent>
            </Card>
          </div>
          
          {/* Sleep Chart */}
          <div className="lg:col-span-2">
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Évolution du Sommeil (14 derniers jours)</CardTitle>
                <CardDescription>
                  Durée et qualité de votre sommeil
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis yAxisId="duration" orientation="left" />
                      <YAxis yAxisId="quality" orientation="right" domain={[0, 10]} />
                      <Tooltip 
                        formatter={(value, name) => [
                          name === 'duration' ? `${value}h` : `${value}/10`,
                          name === 'duration' ? 'Durée' : name === 'quality' ? 'Qualité' : 'Objectif'
                        ]}
                      />
                      <Line 
                        yAxisId="duration"
                        type="monotone" 
                        dataKey="duration" 
                        stroke="#3b82f6" 
                        strokeWidth={2}
                        name="duration"
                      />
                      <Line 
                        yAxisId="duration"
                        type="monotone" 
                        dataKey="target" 
                        stroke="#94a3b8" 
                        strokeDasharray="5 5"
                        name="target"
                      />
                      <Line 
                        yAxisId="quality"
                        type="monotone" 
                        dataKey="quality" 
                        stroke="#10b981" 
                        strokeWidth={2}
                        name="quality"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Recent Sleep Entries */}
        {recentEntries.length > 0 && (
          <Card className="mt-8 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Historique Récent</CardTitle>
              <CardDescription>
                Vos 7 dernières nuits
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentEntries.map((entry) => (
                  <div key={entry.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="text-sm text-muted-foreground">
                        {new Date(entry.date).toLocaleDateString('fr-FR')}
                      </div>
                      <div className="flex items-center gap-2">
                        <Moon className="h-4 w-4 text-indigo-500" />
                        <span className="text-sm">{entry.bedtime}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Sun className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm">{entry.waketime}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-sm">
                        <span className="font-medium">{(entry.duration / 60).toFixed(1)}h</span>
                      </div>
                      <Badge variant="outline" className={`${getQualityColor(entry.quality)} text-white`}>
                        {entry.quality}/10
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

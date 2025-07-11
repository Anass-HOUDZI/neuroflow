
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Moon, Sun, TrendingUp, Clock, Target } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useHealthStore } from '@/core/stores/healthStore'

export const OptimizedSleepAnalyzer: React.FC = () => {
  const [bedtime, setBedtime] = useState('')
  const [waketime, setWaketime] = useState('')
  const [quality, setQuality] = useState(5)
  const [notes, setNotes] = useState('')
  
  const { sleepEntries, addSleepEntry, getSleepStats } = useHealthStore()
  const stats = getSleepStats()
  
  const handleAddEntry = () => {
    if (!bedtime || !waketime) return
    
    addSleepEntry({
      date: new Date().toISOString().split('T')[0],
      bedtime,
      waketime,
      quality,
      notes: notes.trim(),
      duration: calculateDuration(bedtime, waketime)
    })
    
    // Reset form
    setBedtime('')
    setWaketime('')
    setQuality(5)
    setNotes('')
  }
  
  const calculateDuration = (bed: string, wake: string): number => {
    if (!bed || !wake) return 0
    
    const bedDate = new Date(`2000-01-01T${bed}:00`)
    let wakeDate = new Date(`2000-01-01T${wake}:00`)
    
    if (wakeDate <= bedDate) {
      wakeDate.setDate(wakeDate.getDate() + 1)
    }
    
    return (wakeDate.getTime() - bedDate.getTime()) / (1000 * 60 * 60) // hours
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
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
                Sleep Analyzer Optimisé
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Analysez et optimisez votre sommeil
              </p>
            </div>
          </div>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Moyenne Sommeil</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.averageDuration.toFixed(1)}h</div>
              <p className="text-xs text-muted-foreground">
                Par nuit
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Qualité Moyenne</CardTitle>
              <Sun className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.averageQuality.toFixed(1)}/10</div>
              <p className="text-xs text-muted-foreground">
                Score qualité
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Nuits Trackées</CardTitle>
              <Moon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalEntries}</div>
              <p className="text-xs text-muted-foreground">
                Total enregistré
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Objectif</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8h</div>
              <p className="text-xs text-muted-foreground">
                Recommandé
              </p>
            </CardContent>
          </Card>
        </div>
        
        {/* Sleep Entry Form */}
        <Card className="bg-white/80 backdrop-blur-sm mb-8">
          <CardHeader>
            <CardTitle>Enregistrer une nuit</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Heure de coucher</label>
                <input
                  type="time"
                  value={bedtime}
                  onChange={(e) => setBedtime(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Heure de réveil</label>
                <input
                  type="time"
                  value={waketime}
                  onChange={(e) => setWaketime(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Qualité du sommeil (1-10)</label>
              <input
                type="range"
                min="1"
                max="10"
                value={quality}
                onChange={(e) => setQuality(Number(e.target.value))}
                className="w-full"
              />
              <div className="text-center text-sm text-muted-foreground mt-1">
                {quality}/10
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Notes (optionnel)</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Comment vous êtes-vous senti ? Rêves, réveils nocturnes..."
                className="w-full px-3 py-2 border rounded-md resize-none"
                rows={3}
              />
            </div>
            
            <Button onClick={handleAddEntry} className="w-full">
              Enregistrer la nuit
            </Button>
          </CardContent>
        </Card>
        
        {/* Recent Entries */}
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Historique récent</CardTitle>
          </CardHeader>
          <CardContent>
            {sleepEntries.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                Aucune entrée pour le moment. Commencez à tracker votre sommeil !
              </p>
            ) : (
              <div className="space-y-4">
                {sleepEntries.slice(0, 7).map((entry) => (
                  <div key={entry.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <div className="font-medium">{entry.date}</div>
                      <div className="text-sm text-muted-foreground">
                        {entry.bedtime} → {entry.waketime} ({entry.duration.toFixed(1)}h)
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">Qualité: {entry.quality}/10</div>
                      {entry.notes && (
                        <div className="text-xs text-muted-foreground mt-1 max-w-xs truncate">
                          {entry.notes}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default OptimizedSleepAnalyzer

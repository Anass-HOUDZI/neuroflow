
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { ArrowLeft, Plus, Calendar, TrendingUp, Heart, Target } from 'lucide-react'
import { useProductivityStore } from '@/core/stores/productivityStore'
import { HabitForm } from '@/components/habit-grid/HabitForm'
import { HabitList } from '@/components/habit-grid/HabitList'
import { WeeklyGrid } from '@/components/habit-grid/WeeklyGrid'
import { EncouragementMessage } from '@/components/habit-grid/EncouragementMessage'

export const OptimizedHabitGrid: React.FC = () => {
  const [showAddForm, setShowAddForm] = useState(false)
  const [selectedWeek, setSelectedWeek] = useState(new Date())
  
  const { 
    habits, 
    habitEntries, 
    addHabit, 
    updateHabit, 
    deleteHabit, 
    addHabitEntry,
    getStats 
  } = useProductivityStore()
  
  const stats = getStats()
  
  const handleAddHabit = (habit: any) => {
    addHabit(habit)
    setShowAddForm(false)
  }
  
  const handleUpdateEntry = (habitId: string, date: string, value: number, note?: string) => {
    addHabitEntry({
      habitId,
      date,
      value,
      completed: value > 0,
      note
    })
  }
  
  const handleDeleteHabit = (habitId: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette habitude ?')) {
      deleteHabit(habitId)
    }
  }
  
  const handleToggleActive = (habitId: string) => {
    const habit = habits.find(h => h.id === habitId)
    if (habit) {
      updateHabit(habitId, { isActive: !habit.isActive })
    }
  }
  
  // Calculate weekly progress
  const getWeeklyProgress = () => {
    const activeHabits = habits.filter(h => h.isActive)
    if (activeHabits.length === 0) return 0

    const weekStart = new Date(selectedWeek)
    weekStart.setDate(weekStart.getDate() - weekStart.getDay())
    
    let totalPossible = 0
    let totalCompleted = 0

    for (let i = 0; i < 7; i++) {
      const date = new Date(weekStart)
      date.setDate(date.getDate() + i)
      const dateStr = date.toISOString().split('T')[0]

      activeHabits.forEach(habit => {
        totalPossible++
        const entry = habitEntries.find(e => e.habitId === habit.id && e.date === dateStr)
        if (entry && entry.value > 0) {
          totalCompleted++
        }
      })
    }

    return totalPossible > 0 ? Math.round((totalCompleted / totalPossible) * 100) : 0
  }
  
  const weeklyProgress = getWeeklyProgress()
  const activeHabits = habits.filter(h => h.isActive)
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800">
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
                HabitGrid Optimisé
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Tracker d'habitudes ultra-performant
              </p>
            </div>
          </div>
          <Button onClick={() => setShowAddForm(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            Nouvelle Habitude
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Progression Hebdo</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{weeklyProgress}%</div>
              <Progress value={weeklyProgress} className="mt-2" />
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Taux de Réussite</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.habits.completionRate}%</div>
              <p className="text-xs text-muted-foreground mt-2">
                Ce mois-ci
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Habitudes Actives</CardTitle>
              <Heart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeHabits.length}</div>
              <p className="text-xs text-muted-foreground mt-2">
                En cours de suivi
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Habitudes</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.habits.totalHabits}</div>
              <p className="text-xs text-muted-foreground mt-2">
                Créées au total
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Encouragement Message */}
        <EncouragementMessage 
          weeklyProgress={weeklyProgress}
          streak={stats.habits.longestStreak}
          activeHabitsCount={activeHabits.length}
        />

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Weekly Grid */}
          <div className="lg:col-span-2">
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Grille Hebdomadaire</CardTitle>
                <CardDescription>
                  Suivez vos habitudes jour par jour
                </CardDescription>
              </CardHeader>
              <CardContent>
                <WeeklyGrid
                  habits={activeHabits}
                  entries={habitEntries}
                  selectedWeek={selectedWeek}
                  onUpdateEntry={handleUpdateEntry}
                  onWeekChange={setSelectedWeek}
                />
              </CardContent>
            </Card>
          </div>

          {/* Habits List */}
          <div>
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Mes Habitudes</CardTitle>
                <CardDescription>
                  Gérez vos habitudes en cours
                </CardDescription>
              </CardHeader>
              <CardContent>
                <HabitList
                  habits={habits}
                  onDeleteHabit={handleDeleteHabit}
                  onToggleActive={handleToggleActive}
                />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Add Habit Form Modal */}
        {showAddForm && (
          <HabitForm
            onSubmit={handleAddHabit}
            onCancel={() => setShowAddForm(false)}
          />
        )}
      </div>
    </div>
  )
}

export default OptimizedHabitGrid


import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Plus, Calendar, TrendingUp, Heart } from "lucide-react";
import { HabitForm } from "@/components/habit-grid/HabitForm";
import { HabitList } from "@/components/habit-grid/HabitList";
import { WeeklyGrid } from "@/components/habit-grid/WeeklyGrid";
import { EncouragementMessage } from "@/components/habit-grid/EncouragementMessage";

export interface Habit {
  id: string;
  name: string;
  description: string;
  type: 'positive' | 'negative';
  scoringType: 'binary' | 'scale' | 'duration';
  color: string;
  createdAt: string;
  isActive: boolean;
}

export interface HabitEntry {
  habitId: string;
  date: string;
  value: number; // 0-1 for binary, 1-5 for scale, minutes for duration
  note?: string;
}

const HabitGrid = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [entries, setEntries] = useState<HabitEntry[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedWeek, setSelectedWeek] = useState(new Date());

  // Load data from localStorage
  useEffect(() => {
    const savedHabits = localStorage.getItem('habitgrid-habits');
    const savedEntries = localStorage.getItem('habitgrid-entries');
    
    if (savedHabits) {
      setHabits(JSON.parse(savedHabits));
    }
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries));
    }
  }, []);

  // Save data to localStorage
  useEffect(() => {
    localStorage.setItem('habitgrid-habits', JSON.stringify(habits));
  }, [habits]);

  useEffect(() => {
    localStorage.setItem('habitgrid-entries', JSON.stringify(entries));
  }, [entries]);

  const addHabit = (habit: Omit<Habit, 'id' | 'createdAt'>) => {
    const newHabit: Habit = {
      ...habit,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    setHabits(prev => [...prev, newHabit]);
    setShowAddForm(false);
  };

  const updateHabitEntry = (habitId: string, date: string, value: number, note?: string) => {
    const entryIndex = entries.findIndex(e => e.habitId === habitId && e.date === date);
    
    if (entryIndex >= 0) {
      const newEntries = [...entries];
      newEntries[entryIndex] = { habitId, date, value, note };
      setEntries(newEntries);
    } else {
      setEntries(prev => [...prev, { habitId, date, value, note }]);
    }
  };

  const deleteHabit = (habitId: string) => {
    setHabits(prev => prev.filter(h => h.id !== habitId));
    setEntries(prev => prev.filter(e => e.habitId !== habitId));
  };

  const toggleHabitActive = (habitId: string) => {
    setHabits(prev => prev.map(h => 
      h.id === habitId ? { ...h, isActive: !h.isActive } : h
    ));
  };

  // Calculate weekly progress
  const getWeeklyProgress = () => {
    const activeHabits = habits.filter(h => h.isActive);
    if (activeHabits.length === 0) return 0;

    const weekStart = new Date(selectedWeek);
    weekStart.setDate(weekStart.getDate() - weekStart.getDay());
    
    let totalPossible = 0;
    let totalCompleted = 0;

    for (let i = 0; i < 7; i++) {
      const date = new Date(weekStart);
      date.setDate(date.getDate() + i);
      const dateStr = date.toISOString().split('T')[0];

      activeHabits.forEach(habit => {
        totalPossible++;
        const entry = entries.find(e => e.habitId === habit.id && e.date === dateStr);
        if (entry && entry.value > 0) {
          totalCompleted++;
        }
      });
    }

    return totalPossible > 0 ? Math.round((totalCompleted / totalPossible) * 100) : 0;
  };

  const weeklyProgress = getWeeklyProgress();
  const activeHabits = habits.filter(h => h.isActive);
  const streak = calculateStreak();

  function calculateStreak(): number {
    // Simple streak calculation - consecutive days with at least one habit completed
    let streak = 0;
    const today = new Date();
    
    for (let i = 0; i < 365; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      const dayEntries = entries.filter(e => e.date === dateStr && e.value > 0);
      if (dayEntries.length > 0) {
        streak++;
      } else if (i > 0) {
        break;
      }
    }
    
    return streak;
  }

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
                HabitGrid
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Tracker d'habitudes bienveillant
              </p>
            </div>
          </div>
          <Button onClick={() => setShowAddForm(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            Nouvelle Habitude
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
              <CardTitle className="text-sm font-medium">Série Actuelle</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{streak} jours</div>
              <p className="text-xs text-muted-foreground mt-2">
                Continuez comme ça ! 🔥
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
        </div>

        {/* Encouragement Message */}
        <EncouragementMessage 
          weeklyProgress={weeklyProgress}
          streak={streak}
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
                  entries={entries}
                  selectedWeek={selectedWeek}
                  onUpdateEntry={updateHabitEntry}
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
                  onDeleteHabit={deleteHabit}
                  onToggleActive={toggleHabitActive}
                />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Add Habit Form Modal */}
        {showAddForm && (
          <HabitForm
            onSubmit={addHabit}
            onCancel={() => setShowAddForm(false)}
          />
        )}
      </div>
    </div>
  );
};

export default HabitGrid;

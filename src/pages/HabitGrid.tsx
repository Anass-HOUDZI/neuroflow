
import GlobalLayout from "@/components/layout/GlobalLayout";
import { PageLayout, PageHeader } from "@/components/layout/PageLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { CheckSquare, Plus, Trash2, TrendingUp, Calendar } from "lucide-react";
import { useState, useEffect } from "react";

interface HabitEntry {
  date: string;
  completed: boolean;
  value?: number;
}

interface Habit {
  id: string;
  name: string;
  description: string;
  type: 'boolean' | 'numeric';
  unit?: string;
  target?: number;
  color: string;
  entries: HabitEntry[];
  createdAt: string;
}

export default function HabitGrid() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [newHabit, setNewHabit] = useState({
    name: '',
    description: '',
    type: 'boolean' as 'boolean' | 'numeric',
    unit: '',
    target: 1,
    color: '#3B82F6'
  });
  const [showForm, setShowForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    const savedHabits = localStorage.getItem('habitgrid-habits');
    if (savedHabits) {
      setHabits(JSON.parse(savedHabits));
    }
  }, []);

  const saveHabits = (updatedHabits: Habit[]) => {
    setHabits(updatedHabits);
    localStorage.setItem('habitgrid-habits', JSON.stringify(updatedHabits));
  };

  const addHabit = () => {
    if (!newHabit.name.trim()) return;

    const habit: Habit = {
      id: Date.now().toString(),
      name: newHabit.name,
      description: newHabit.description,
      type: newHabit.type,
      unit: newHabit.unit,
      target: newHabit.target,
      color: newHabit.color,
      entries: [],
      createdAt: new Date().toISOString()
    };

    saveHabits([...habits, habit]);
    setNewHabit({
      name: '',
      description: '',
      type: 'boolean',
      unit: '',
      target: 1,
      color: '#3B82F6'
    });
    setShowForm(false);
  };

  const deleteHabit = (habitId: string) => {
    saveHabits(habits.filter(habit => habit.id !== habitId));
  };

  const toggleHabit = (habitId: string, date: string, value?: number) => {
    const updatedHabits = habits.map(habit => {
      if (habit.id !== habitId) return habit;

      const existingEntryIndex = habit.entries.findIndex(entry => entry.date === date);
      const newEntries = [...habit.entries];

      if (existingEntryIndex >= 0) {
        if (habit.type === 'boolean') {
          newEntries[existingEntryIndex].completed = !newEntries[existingEntryIndex].completed;
        } else {
          newEntries[existingEntryIndex].value = value || 0;
          newEntries[existingEntryIndex].completed = (value || 0) >= (habit.target || 1);
        }
      } else {
        newEntries.push({
          date,
          completed: habit.type === 'boolean' ? true : (value || 0) >= (habit.target || 1),
          value: habit.type === 'numeric' ? value : undefined
        });
      }

      return { ...habit, entries: newEntries };
    });

    saveHabits(updatedHabits);
  };

  const getHabitEntry = (habit: Habit, date: string) => {
    return habit.entries.find(entry => entry.date === date);
  };

  const getStreakCount = (habit: Habit) => {
    const sortedEntries = habit.entries
      .filter(entry => entry.completed)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    let streak = 0;
    const today = new Date();
    
    for (let i = 0; i < sortedEntries.length; i++) {
      const entryDate = new Date(sortedEntries[i].date);
      const daysDiff = Math.floor((today.getTime() - entryDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysDiff === i) {
        streak++;
      } else {
        break;
      }
    }
    
    return streak;
  };

  const getLast7Days = () => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      days.push(date.toISOString().split('T')[0]);
    }
    return days;
  };

  const last7Days = getLast7Days();
  const completionRate = habits.length > 0 
    ? Math.round((habits.reduce((sum, habit) => 
        sum + habit.entries.filter(entry => entry.completed && last7Days.includes(entry.date)).length
      , 0) / (habits.length * 7)) * 100)
    : 0;

  const colors = [
    '#3B82F6', '#EF4444', '#10B981', '#F59E0B', 
    '#8B5CF6', '#EC4899', '#06B6D4', '#84CC16'
  ];

  return (
    <GlobalLayout>
      <PageLayout className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800">
        <PageHeader
          title="HabitGrid"
          description="Suivez vos habitudes quotidiennes avec bienveillance"
          icon={<CheckSquare className="h-12 w-12 text-green-500" />}
          actions={
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                {completionRate}% cette semaine
              </Button>
              <Button onClick={() => setShowForm(true)} className="gap-2">
                <Plus className="h-4 w-4" />
                Nouvelle habitude
              </Button>
            </div>
          }
        />

        <div className="max-w-6xl mx-auto space-y-6">
          
          {/* Statistiques */}
          <div className="grid md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6 text-center">
                <CheckSquare className="h-8 w-8 mx-auto mb-2 text-green-500" />
                <div className="text-2xl font-bold">{habits.length}</div>
                <div className="text-sm text-muted-foreground">Habitudes</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <TrendingUp className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                <div className="text-2xl font-bold">{completionRate}%</div>
                <div className="text-sm text-muted-foreground">Taux de réussite</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <Calendar className="h-8 w-8 mx-auto mb-2 text-purple-500" />
                <div className="text-2xl font-bold">
                  {habits.reduce((max, habit) => Math.max(max, getStreakCount(habit)), 0)}
                </div>
                <div className="text-sm text-muted-foreground">Meilleure série</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="text-2xl mb-2">🎯</div>
                <div className="text-2xl font-bold">
                  {habits.filter(h => getHabitEntry(h, selectedDate)?.completed).length}
                </div>
                <div className="text-sm text-muted-foreground">Aujourd'hui</div>
              </CardContent>
            </Card>
          </div>

          {/* Formulaire d'ajout */}
          {showForm && (
            <Card>
              <CardHeader>
                <CardTitle>Nouvelle habitude</CardTitle>
                <CardDescription>Créez une habitude positive à suivre quotidiennement</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  placeholder="Nom de l'habitude (ex: Méditer 10 minutes)"
                  value={newHabit.name}
                  onChange={(e) => setNewHabit({...newHabit, name: e.target.value})}
                />
                <Input
                  placeholder="Description (optionnelle)"
                  value={newHabit.description}
                  onChange={(e) => setNewHabit({...newHabit, description: e.target.value})}
                />
                <div className="grid md:grid-cols-3 gap-4">
                  <select
                    value={newHabit.type}
                    onChange={(e) => setNewHabit({...newHabit, type: e.target.value as any})}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="boolean">Oui/Non</option>
                    <option value="numeric">Avec valeur numérique</option>
                  </select>
                  {newHabit.type === 'numeric' && (
                    <>
                      <Input
                        placeholder="Unité (ex: minutes, verres)"
                        value={newHabit.unit}
                        onChange={(e) => setNewHabit({...newHabit, unit: e.target.value})}
                      />
                      <Input
                        type="number"
                        placeholder="Objectif quotidien"
                        value={newHabit.target}
                        onChange={(e) => setNewHabit({...newHabit, target: Number(e.target.value)})}
                      />
                    </>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium">Couleur</label>
                  <div className="flex gap-2 mt-2">
                    {colors.map(color => (
                      <button
                        key={color}
                        className={`w-8 h-8 rounded-full border-2 ${newHabit.color === color ? 'border-gray-800' : 'border-gray-300'}`}
                        style={{ backgroundColor: color }}
                        onClick={() => setNewHabit({...newHabit, color})}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button onClick={addHabit}>Créer</Button>
                  <Button variant="outline" onClick={() => setShowForm(false)}>Annuler</Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Grille des habitudes */}
          <Card>
            <CardHeader>
              <CardTitle>Ma grille de la semaine</CardTitle>
              <CardDescription>
                Cliquez sur les cases pour marquer vos habitudes comme accomplies
              </CardDescription>
            </CardHeader>
            <CardContent>
              {habits.length === 0 ? (
                <div className="text-center py-12">
                  <CheckSquare className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-lg font-semibold mb-2">Aucune habitude définie</h3>
                  <p className="text-muted-foreground mb-4">
                    Commencez par créer votre première habitude positive
                  </p>
                  <Button onClick={() => setShowForm(true)}>
                    Créer ma première habitude
                  </Button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr>
                        <th className="text-left p-2 font-medium">Habitude</th>
                        {last7Days.map(date => (
                          <th key={date} className="text-center p-2 font-medium min-w-[60px]">
                            {new Date(date).toLocaleDateString('fr-FR', { 
                              day: 'numeric',
                              month: 'short'
                            })}
                          </th>
                        ))}
                        <th className="text-center p-2 font-medium">Série</th>
                        <th className="text-center p-2"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {habits.map(habit => (
                        <tr key={habit.id} className="border-t">
                          <td className="p-2">
                            <div className="flex items-center gap-2">
                              <div 
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: habit.color }}
                              />
                              <div>
                                <div className="font-medium">{habit.name}</div>
                                {habit.description && (
                                  <div className="text-xs text-muted-foreground">{habit.description}</div>
                                )}
                                {habit.type === 'numeric' && (
                                  <div className="text-xs text-muted-foreground">
                                    Objectif: {habit.target} {habit.unit}
                                  </div>
                                )}
                              </div>
                            </div>
                          </td>
                          {last7Days.map(date => {
                            const entry = getHabitEntry(habit, date);
                            return (
                              <td key={date} className="p-2 text-center">
                                {habit.type === 'boolean' ? (
                                  <button
                                    className={`w-8 h-8 rounded border-2 transition-colors ${
                                      entry?.completed 
                                        ? 'bg-green-500 border-green-500 text-white' 
                                        : 'border-gray-300 hover:border-gray-400'
                                    }`}
                                    onClick={() => toggleHabit(habit.id, date)}
                                  >
                                    {entry?.completed && '✓'}
                                  </button>
                                ) : (
                                  <input
                                    type="number"
                                    min="0"
                                    className="w-12 h-8 text-center border rounded text-xs"
                                    value={entry?.value || ''}
                                    onChange={(e) => toggleHabit(habit.id, date, Number(e.target.value))}
                                    placeholder="0"
                                  />
                                )}
                              </td>
                            );
                          })}
                          <td className="p-2 text-center">
                            <Badge 
                              style={{ backgroundColor: habit.color, color: 'white' }}
                              className="text-xs"
                            >
                              {getStreakCount(habit)} jours
                            </Badge>
                          </td>
                          <td className="p-2 text-center">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => deleteHabit(habit.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Message bienveillant */}
          <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-lg font-semibold mb-2">🌱 Rappel bienveillant</div>
                <p className="text-sm text-muted-foreground">
                  Les habitudes se construisent progressivement. Soyez patient avec vous-même et célébrez chaque petit progrès !
                  La régularité prime sur la perfection.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </PageLayout>
    </GlobalLayout>
  );
}

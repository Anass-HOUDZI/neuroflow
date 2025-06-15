
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Habit, HabitEntry } from "@/pages/HabitGrid";

interface WeeklyGridProps {
  habits: Habit[];
  entries: HabitEntry[];
  selectedWeek: Date;
  onUpdateEntry: (habitId: string, date: string, value: number, note?: string) => void;
  onWeekChange: (week: Date) => void;
}

export const WeeklyGrid = ({ 
  habits, 
  entries, 
  selectedWeek, 
  onUpdateEntry, 
  onWeekChange 
}: WeeklyGridProps) => {
  const [selectedCell, setSelectedCell] = useState<{habitId: string, date: string} | null>(null);

  // Get week start (Sunday)
  const getWeekStart = (date: Date) => {
    const start = new Date(date);
    start.setDate(start.getDate() - start.getDay());
    return start;
  };

  const weekStart = getWeekStart(selectedWeek);
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const day = new Date(weekStart);
    day.setDate(day.getDate() + i);
    return day;
  });

  const dayNames = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];

  const getEntry = (habitId: string, date: string) => {
    return entries.find(e => e.habitId === habitId && e.date === date);
  };

  const handleCellClick = (habitId: string, date: string, habit: Habit) => {
    const entry = getEntry(habitId, date);
    
    if (habit.scoringType === 'binary') {
      // Toggle binary value
      const newValue = entry?.value === 1 ? 0 : 1;
      onUpdateEntry(habitId, date, newValue);
    } else {
      // For scale and duration, open input
      setSelectedCell({ habitId, date });
    }
  };

  const handleValueSubmit = (value: number) => {
    if (selectedCell) {
      onUpdateEntry(selectedCell.habitId, selectedCell.date, value);
      setSelectedCell(null);
    }
  };

  const getCellClass = (habit: Habit, entry?: HabitEntry) => {
    const baseClass = "w-12 h-12 rounded-lg border-2 transition-all cursor-pointer flex items-center justify-center text-xs font-medium";
    
    if (!entry || entry.value === 0) {
      return `${baseClass} border-gray-200 bg-gray-50 hover:bg-gray-100`;
    }

    const intensity = habit.scoringType === 'binary' ? 1 : 
                     habit.scoringType === 'scale' ? entry.value / 5 : 
                     Math.min(entry.value / 60, 1); // Duration capped at 60min for visualization

    return `${baseClass} border-gray-300 hover:scale-105` + 
           ` bg-opacity-${Math.round(intensity * 100)}`;
  };

  const getCellContent = (habit: Habit, entry?: HabitEntry) => {
    if (!entry || entry.value === 0) return '';
    
    if (habit.scoringType === 'binary') return '✓';
    if (habit.scoringType === 'scale') return entry.value.toString();
    return `${entry.value}m`;
  };

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newWeek = new Date(selectedWeek);
    newWeek.setDate(newWeek.getDate() + (direction === 'next' ? 7 : -7));
    onWeekChange(newWeek);
  };

  if (habits.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>Ajoutez des habitudes pour commencer le suivi !</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Week Navigation */}
      <div className="flex items-center justify-between">
        <Button variant="outline" size="sm" onClick={() => navigateWeek('prev')}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h3 className="font-medium">
          Semaine du {weekStart.toLocaleDateString('fr-FR', { 
            day: 'numeric', 
            month: 'long',
            year: 'numeric'
          })}
        </h3>
        <Button variant="outline" size="sm" onClick={() => navigateWeek('next')}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Grid */}
      <div className="overflow-x-auto">
        <div className="min-w-full">
          {/* Header */}
          <div className="grid grid-cols-8 gap-2 mb-4">
            <div className="text-xs font-medium text-gray-500"></div>
            {weekDays.map((day, index) => (
              <div key={index} className="text-center">
                <div className="text-xs font-medium text-gray-500">
                  {dayNames[index]}
                </div>
                <div className="text-lg font-bold">
                  {day.getDate()}
                </div>
              </div>
            ))}
          </div>

          {/* Habits Rows */}
          {habits.map((habit) => (
            <div key={habit.id} className="grid grid-cols-8 gap-2 mb-3 items-center">
              {/* Habit Name */}
              <div className="text-sm font-medium truncate pr-2" title={habit.name}>
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: habit.color }}
                  />
                  <span className="truncate">{habit.name}</span>
                </div>
              </div>

              {/* Daily Cells */}
              {weekDays.map((day) => {
                const dateStr = day.toISOString().split('T')[0];
                const entry = getEntry(habit.id, dateStr);
                
                return (
                  <div
                    key={dateStr}
                    className={getCellClass(habit, entry)}
                    style={{
                      backgroundColor: entry && entry.value > 0 ? 
                        `${habit.color}${Math.round((habit.scoringType === 'binary' ? 1 : 
                          habit.scoringType === 'scale' ? entry.value / 5 : 
                          Math.min(entry.value / 60, 1)) * 255).toString(16).padStart(2, '0')}` : 
                        undefined
                    }}
                    onClick={() => handleCellClick(habit.id, dateStr, habit)}
                  >
                    {getCellContent(habit, entry)}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Value Input Modal */}
      {selectedCell && (
        <ValueInputModal
          habit={habits.find(h => h.id === selectedCell.habitId)!}
          currentValue={getEntry(selectedCell.habitId, selectedCell.date)?.value || 0}
          onSubmit={handleValueSubmit}
          onCancel={() => setSelectedCell(null)}
        />
      )}
    </div>
  );
};

interface ValueInputModalProps {
  habit: Habit;
  currentValue: number;
  onSubmit: (value: number) => void;
  onCancel: () => void;
}

const ValueInputModal = ({ habit, currentValue, onSubmit, onCancel }: ValueInputModalProps) => {
  const [value, setValue] = useState(currentValue);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(value);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-sm">
        <h3 className="font-medium mb-4">{habit.name}</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          {habit.scoringType === 'scale' ? (
            <div>
              <label className="block text-sm font-medium mb-2">
                Évaluation (1-5)
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setValue(num)}
                    className={`w-10 h-10 rounded-full border-2 ${
                      value === num ? 'border-blue-500 bg-blue-100' : 'border-gray-300'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium mb-2">
                Durée (minutes)
              </label>
              <input
                type="number"
                value={value}
                onChange={(e) => setValue(Number(e.target.value))}
                min="0"
                max="600"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          )}
          
          <div className="flex gap-3">
            <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
              Annuler
            </Button>
            <Button type="submit" className="flex-1">
              Enregistrer
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

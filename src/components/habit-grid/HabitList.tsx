import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Trash2, Calendar } from "lucide-react";
import { Habit } from "@/types/habit";

interface HabitListProps {
  habits: Habit[];
  onDeleteHabit: (habitId: string) => void;
  onToggleActive: (habitId: string) => void;
}

export const HabitList = ({ habits, onDeleteHabit, onToggleActive }: HabitListProps) => {
  if (habits.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
        <p>Aucune habitude pour le moment</p>
        <p className="text-sm">Commencez par en créer une !</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {habits.map((habit) => (
        <div
          key={habit.id}
          className="p-3 border rounded-lg bg-white/50 hover:bg-white/80 transition-colors"
        >
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: habit.color }}
              />
              <span className="font-medium text-sm">{habit.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <Switch
                checked={habit.isActive}
                onCheckedChange={() => onToggleActive(habit.id)}
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDeleteHabit(habit.id)}
                className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          </div>
          
          {habit.description && (
            <p className="text-xs text-gray-600 mb-2">{habit.description}</p>
          )}
          
          <div className="flex gap-1 flex-wrap">
            <Badge variant="secondary" className="text-xs">
              {habit.type === 'positive' ? 'Positive' : 'Négative'}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {habit.scoringType === 'binary' ? 'Binaire' : 
               habit.scoringType === 'scale' ? 'Échelle' : 'Durée'}
            </Badge>
            {!habit.isActive && (
              <Badge variant="destructive" className="text-xs">
                Inactive
              </Badge>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

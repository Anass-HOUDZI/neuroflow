
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
  value: number;
  note?: string;
}

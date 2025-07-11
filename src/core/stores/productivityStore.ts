
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface JournalEntry {
  id: string
  date: string
  title: string
  content: string
  mood?: number
  tags: string[]
}

interface Habit {
  id: string
  name: string
  description?: string
  color: string
  target: number
  unit: string
  isActive: boolean
}

interface HabitEntry {
  habitId: string
  date: string
  value: number
  completed: boolean
}

interface ProductivityState {
  // Journal
  journalEntries: JournalEntry[]
  addJournalEntry: (entry: Omit<JournalEntry, 'id'>) => void
  updateJournalEntry: (id: string, entry: Partial<JournalEntry>) => void
  
  // Habits
  habits: Habit[]
  habitEntries: HabitEntry[]
  addHabit: (habit: Omit<Habit, 'id'>) => void
  updateHabit: (id: string, habit: Partial<Habit>) => void
  addHabitEntry: (entry: HabitEntry) => void
  
  // Shared
  clearData: () => void
}

export const useProductivityStore = create<ProductivityState>()(
  persist(
    (set) => ({
      journalEntries: [],
      habits: [],
      habitEntries: [],
      
      addJournalEntry: (entry) => set((state) => ({
        journalEntries: [{
          ...entry,
          id: Date.now().toString()
        }, ...state.journalEntries]
      })),
      
      updateJournalEntry: (id, entry) => set((state) => ({
        journalEntries: state.journalEntries.map(j => 
          j.id === id ? { ...j, ...entry } : j
        )
      })),
      
      addHabit: (habit) => set((state) => ({
        habits: [{
          ...habit,
          id: Date.now().toString()
        }, ...state.habits]
      })),
      
      updateHabit: (id, habit) => set((state) => ({
        habits: state.habits.map(h => 
          h.id === id ? { ...h, ...habit } : h
        )
      })),
      
      addHabitEntry: (entry) => set((state) => ({
        habitEntries: [entry, ...state.habitEntries]
      })),
      
      clearData: () => set({
        journalEntries: [],
        habits: [],
        habitEntries: []
      })
    }),
    {
      name: 'neuroflow-productivity-store'
    }
  )
)

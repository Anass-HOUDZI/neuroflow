
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface MoodEntry {
  id: string
  date: string
  mood: number
  energy: number
  stress: number
  notes?: string
}

interface MeditationSession {
  id: string
  date: string
  duration: number
  technique: string
  quality: number
}

interface WellnessState {
  // Mood Tracker
  moodEntries: MoodEntry[]
  addMoodEntry: (entry: Omit<MoodEntry, 'id'>) => void
  
  // Meditation
  meditationSessions: MeditationSession[]
  addMeditationSession: (session: Omit<MeditationSession, 'id'>) => void
  
  // Shared
  clearData: () => void
}

export const useWellnessStore = create<WellnessState>()(
  persist(
    (set, get) => ({
      moodEntries: [],
      meditationSessions: [],
      
      addMoodEntry: (entry) => set((state) => ({
        moodEntries: [{
          ...entry,
          id: Date.now().toString()
        }, ...state.moodEntries]
      })),
      
      addMeditationSession: (session) => set((state) => ({
        meditationSessions: [{
          ...session,
          id: Date.now().toString()
        }, ...state.meditationSessions]
      })),
      
      clearData: () => set({
        moodEntries: [],
        meditationSessions: []
      })
    }),
    {
      name: 'neuroflow-wellness-store',
      partialize: (state) => ({
        moodEntries: state.moodEntries,
        meditationSessions: state.meditationSessions
      })
    }
  )
)

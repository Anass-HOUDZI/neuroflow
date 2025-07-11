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
  
  // Meditation - Enhanced
  meditationSessions: MeditationSession[]
  addMeditationSession: (session: Omit<MeditationSession, 'id'>) => void
  getMeditationStats: () => {
    totalSessions: number
    totalMinutes: number
    averageQuality: number
    favoritesTechniques: string[]
  }
  
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
      
      getMeditationStats: () => {
        const sessions = get().meditationSessions
        if (sessions.length === 0) {
          return {
            totalSessions: 0,
            totalMinutes: 0,
            averageQuality: 0,
            favoritesTechniques: []
          }
        }
        
        const totalMinutes = sessions.reduce((sum, s) => sum + s.duration, 0)
        const averageQuality = sessions.reduce((sum, s) => sum + s.quality, 0) / sessions.length
        
        // Find most used techniques
        const techniqueCount = sessions.reduce((acc, s) => {
          acc[s.technique] = (acc[s.technique] || 0) + 1
          return acc
        }, {} as Record<string, number>)
        
        const favoritesTechniques = Object.entries(techniqueCount)
          .sort(([,a], [,b]) => b - a)
          .slice(0, 3)
          .map(([technique]) => technique)
        
        return {
          totalSessions: sessions.length,
          totalMinutes,
          averageQuality: Math.round(averageQuality * 10) / 10,
          favoritesTechniques
        }
      },
      
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

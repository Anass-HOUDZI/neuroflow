
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface SleepEntry {
  id: string
  date: string
  bedtime: string
  waketime: string
  quality: string
  notes: string
}

interface FitnessSession {
  id: string
  date: string
  activity: string
  duration: string
  notes: string
}

interface HydrationEntry {
  id: string
  date: string
  amount: number
  time: string
}

interface HealthState {
  // Sleep
  sleepEntries: SleepEntry[]
  addSleepEntry: (entry: Omit<SleepEntry, 'id'>) => void
  
  // Fitness
  fitnessSessions: FitnessSession[]
  addFitnessSession: (session: Omit<FitnessSession, 'id'>) => void
  
  // Hydration
  hydrationEntries: HydrationEntry[]
  addHydrationEntry: (entry: Omit<HydrationEntry, 'id'>) => void
  
  // Shared
  clearData: () => void
}

export const useHealthStore = create<HealthState>()(
  persist(
    (set) => ({
      sleepEntries: [],
      fitnessSessions: [],
      hydrationEntries: [],
      
      addSleepEntry: (entry) => set((state) => ({
        sleepEntries: [{
          ...entry,
          id: Date.now().toString()
        }, ...state.sleepEntries]
      })),
      
      addFitnessSession: (session) => set((state) => ({
        fitnessSessions: [{
          ...session,
          id: Date.now().toString()
        }, ...state.fitnessSessions]
      })),
      
      addHydrationEntry: (entry) => set((state) => ({
        hydrationEntries: [{
          ...entry,
          id: Date.now().toString()
        }, ...state.hydrationEntries]
      })),
      
      clearData: () => set({
        sleepEntries: [],
        fitnessSessions: [],
        hydrationEntries: []
      })
    }),
    {
      name: 'neuroflow-health-store'
    }
  )
)

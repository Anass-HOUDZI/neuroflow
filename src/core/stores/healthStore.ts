
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Sleep Types
interface SleepEntry {
  id: string
  date: string
  bedtime: string
  waketime: string
  quality: number // 1-10
  duration: number // in hours
  sleepDebt: number // in hours
  notes: string
  stages?: {
    deep: number
    light: number
    rem: number
    awake: number
  }
}

interface SleepGoals {
  targetDuration: number // in hours
  targetBedtime: string
  targetWaketime: string
}

// Fitness Types
interface Exercise {
  id: string
  name: string
  category: string
  muscleGroups: string[]
  instructions: string[]
}

interface WorkoutEntry {
  id: string
  date: string
  name: string
  exercises: {
    exerciseId: string
    sets: number
    reps: number[]
    weight: number[]
    restTime: number
  }[]
  duration: number
  notes: string
  intensity: number // 1-10
}

interface FitnessGoals {
  weeklyWorkouts: number
  targetCalories: number
  focusAreas: string[]
}

// Nutrition Types
interface Food {
  id: string
  name: string
  calories: number
  macros: {
    protein: number
    carbs: number
    fat: number
    fiber: number
  }
  micronutrients: Record<string, number>
}

interface MealEntry {
  id: string
  date: string
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack'
  foods: {
    foodId: string
    quantity: number
    unit: string
  }[]
  totalCalories: number
  notes: string
}

interface NutritionGoals {
  dailyCalories: number
  macroRatios: {
    protein: number
    carbs: number
    fat: number
  }
  waterGoal: number
}

// Hydration Types
interface HydrationEntry {
  id: string
  date: string
  time: string
  amount: number // in ml
  type: 'water' | 'tea' | 'coffee' | 'other'
}

// Fasting Types
interface FastingSession {
  id: string
  startTime: string
  endTime?: string
  duration?: number // in minutes
  protocol: string
  status: 'active' | 'completed' | 'broken'
  notes: string
  symptoms: string[]
}

interface FastingProtocol {
  id: string
  name: string
  fastingHours: number
  eatingHours: number
  description: string
}

// Analytics Types
interface HealthInsight {
  id: string
  type: 'sleep' | 'fitness' | 'nutrition' | 'hydration' | 'fasting' | 'cross-module'
  title: string
  description: string
  recommendation: string
  impact: 'low' | 'medium' | 'high'
  date: string
}

interface HealthCorrelation {
  id: string
  variable1: string
  variable2: string
  correlation: number
  strength: 'weak' | 'moderate' | 'strong'
  significance: number
}

// Sleep Stats Interface
interface SleepStats {
  totalEntries: number
  averageDuration: number
  averageQuality: number
  sleepDebt: number
  consistency: number
}

// Main Store Interface
interface HealthState {
  // Sleep
  sleepEntries: SleepEntry[]
  sleepGoals: SleepGoals
  addSleepEntry: (entry: Omit<SleepEntry, 'id'>) => void
  updateSleepEntry: (id: string, entry: Partial<SleepEntry>) => void
  deleteSleepEntry: (id: string) => void
  setSleepGoals: (goals: SleepGoals) => void
  getSleepStats: () => SleepStats
  
  // Fitness
  workoutEntries: WorkoutEntry[]
  exercises: Exercise[]
  fitnessGoals: FitnessGoals
  addWorkoutEntry: (entry: Omit<WorkoutEntry, 'id'>) => void
  updateWorkoutEntry: (id: string, entry: Partial<WorkoutEntry>) => void
  deleteWorkoutEntry: (id: string) => void
  addExercise: (exercise: Omit<Exercise, 'id'>) => void
  setFitnessGoals: (goals: FitnessGoals) => void
  
  // Nutrition
  mealEntries: MealEntry[]
  foods: Food[]
  nutritionGoals: NutritionGoals
  addMealEntry: (entry: Omit<MealEntry, 'id'>) => void
  updateMealEntry: (id: string, entry: Partial<MealEntry>) => void
  deleteMealEntry: (id: string) => void
  addFood: (food: Omit<Food, 'id'>) => void
  setNutritionGoals: (goals: NutritionGoals) => void
  
  // Hydration
  hydrationEntries: HydrationEntry[]
  addHydrationEntry: (entry: Omit<HydrationEntry, 'id'>) => void
  deleteHydrationEntry: (id: string) => void
  
  // Fasting
  fastingSessions: FastingSession[]
  fastingProtocols: FastingProtocol[]
  addFastingSession: (session: Omit<FastingSession, 'id'>) => void
  updateFastingSession: (id: string, session: Partial<FastingSession>) => void
  deleteFastingSession: (id: string) => void
  
  // Analytics
  healthInsights: HealthInsight[]
  healthCorrelations: HealthCorrelation[]
  generateInsights: () => void
  
  // Utilities
  clearAllData: () => void
}

const defaultSleepGoals: SleepGoals = {
  targetDuration: 8, // 8 hours
  targetBedtime: '22:00',
  targetWaketime: '06:00'
}

const defaultFitnessGoals: FitnessGoals = {
  weeklyWorkouts: 3,
  targetCalories: 500,
  focusAreas: ['strength', 'cardio']
}

const defaultNutritionGoals: NutritionGoals = {
  dailyCalories: 2000,
  macroRatios: {
    protein: 25,
    carbs: 45,
    fat: 30
  },
  waterGoal: 2000
}

const defaultFastingProtocols: FastingProtocol[] = [
  {
    id: '16-8',
    name: '16:8',
    fastingHours: 16,
    eatingHours: 8,
    description: '16 heures de jeûne, 8 heures d\'alimentation'
  },
  {
    id: '18-6',
    name: '18:6',
    fastingHours: 18,
    eatingHours: 6,
    description: '18 heures de jeûne, 6 heures d\'alimentation'
  },
  {
    id: '20-4',
    name: '20:4',
    fastingHours: 20,
    eatingHours: 4,
    description: '20 heures de jeûne, 4 heures d\'alimentation'
  }
]

export const useHealthStore = create<HealthState>()(
  persist(
    (set, get) => ({
      // Sleep State
      sleepEntries: [],
      sleepGoals: defaultSleepGoals,
      
      // Fitness State
      workoutEntries: [],
      exercises: [],
      fitnessGoals: defaultFitnessGoals,
      
      // Nutrition State
      mealEntries: [],
      foods: [],
      nutritionGoals: defaultNutritionGoals,
      
      // Hydration State
      hydrationEntries: [],
      
      // Fasting State
      fastingSessions: [],
      fastingProtocols: defaultFastingProtocols,
      
      // Analytics State
      healthInsights: [],
      healthCorrelations: [],
      
      // Sleep Actions
      addSleepEntry: (entry) => set((state) => ({
        sleepEntries: [{
          ...entry,
          id: Date.now().toString()
        }, ...state.sleepEntries]
      })),
      
      updateSleepEntry: (id, entry) => set((state) => ({
        sleepEntries: state.sleepEntries.map(e => 
          e.id === id ? { ...e, ...entry } : e
        )
      })),
      
      deleteSleepEntry: (id) => set((state) => ({
        sleepEntries: state.sleepEntries.filter(e => e.id !== id)
      })),
      
      setSleepGoals: (goals) => set({ sleepGoals: goals }),
      
      getSleepStats: () => {
        const entries = get().sleepEntries
        if (entries.length === 0) {
          return {
            totalEntries: 0,
            averageDuration: 0,
            averageQuality: 0,
            sleepDebt: 0,
            consistency: 0
          }
        }
        
        const totalDuration = entries.reduce((sum, entry) => sum + entry.duration, 0)
        const totalQuality = entries.reduce((sum, entry) => sum + entry.quality, 0)
        const targetDuration = get().sleepGoals.targetDuration
        const sleepDebt = entries.reduce((sum, entry) => sum + Math.max(0, targetDuration - entry.duration), 0)
        
        return {
          totalEntries: entries.length,
          averageDuration: totalDuration / entries.length,
          averageQuality: totalQuality / entries.length,
          sleepDebt: sleepDebt,
          consistency: entries.length > 0 ? (entries.filter(e => Math.abs(e.duration - targetDuration) <= 1).length / entries.length) * 100 : 0
        }
      },
      
      // Fitness Actions
      addWorkoutEntry: (entry) => set((state) => ({
        workoutEntries: [{
          ...entry,
          id: Date.now().toString()
        }, ...state.workoutEntries]
      })),
      
      updateWorkoutEntry: (id, entry) => set((state) => ({
        workoutEntries: state.workoutEntries.map(e => 
          e.id === id ? { ...e, ...entry } : e
        )
      })),
      
      deleteWorkoutEntry: (id) => set((state) => ({
        workoutEntries: state.workoutEntries.filter(e => e.id !== id)
      })),
      
      addExercise: (exercise) => set((state) => ({
        exercises: [{
          ...exercise,
          id: Date.now().toString()
        }, ...state.exercises]
      })),
      
      setFitnessGoals: (goals) => set({ fitnessGoals: goals }),
      
      // Nutrition Actions
      addMealEntry: (entry) => set((state) => ({
        mealEntries: [{
          ...entry,
          id: Date.now().toString()
        }, ...state.mealEntries]
      })),
      
      updateMealEntry: (id, entry) => set((state) => ({
        mealEntries: state.mealEntries.map(e => 
          e.id === id ? { ...e, ...entry } : e
        )
      })),
      
      deleteMealEntry: (id) => set((state) => ({
        mealEntries: state.mealEntries.filter(e => e.id !== id)
      })),
      
      addFood: (food) => set((state) => ({
        foods: [{
          ...food,
          id: Date.now().toString()
        }, ...state.foods]
      })),
      
      setNutritionGoals: (goals) => set({ nutritionGoals: goals }),
      
      // Hydration Actions
      addHydrationEntry: (entry) => set((state) => ({
        hydrationEntries: [{
          ...entry,
          id: Date.now().toString()
        }, ...state.hydrationEntries]
      })),
      
      deleteHydrationEntry: (id) => set((state) => ({
        hydrationEntries: state.hydrationEntries.filter(e => e.id !== id)
      })),
      
      // Fasting Actions
      addFastingSession: (session) => set((state) => ({
        fastingSessions: [{
          ...session,
          id: Date.now().toString()
        }, ...state.fastingSessions]
      })),
      
      updateFastingSession: (id, session) => set((state) => ({
        fastingSessions: state.fastingSessions.map(s => 
          s.id === id ? { ...s, ...session } : s
        )
      })),
      
      deleteFastingSession: (id) => set((state) => ({
        fastingSessions: state.fastingSessions.filter(s => s.id !== id)
      })),
      
      // Analytics Actions
      generateInsights: () => {
        const state = get()
        const insights: HealthInsight[] = []
        
        // Sleep insights
        if (state.sleepEntries.length > 0) {
          const avgQuality = state.sleepEntries.reduce((sum, entry) => sum + entry.quality, 0) / state.sleepEntries.length
          if (avgQuality < 6) {
            insights.push({
              id: `sleep-quality-${Date.now()}`,
              type: 'sleep',
              title: 'Qualité de sommeil à améliorer',
              description: `Votre qualité de sommeil moyenne est de ${avgQuality.toFixed(1)}/10`,
              recommendation: 'Essayez d\'améliorer votre routine du coucher et votre environnement de sommeil',
              impact: 'high',
              date: new Date().toISOString()
            })
          }
        }
        
        // Fitness insights
        if (state.workoutEntries.length > 0) {
          const weeklyWorkouts = state.workoutEntries.filter(entry => {
            const entryDate = new Date(entry.date)
            const weekAgo = new Date()
            weekAgo.setDate(weekAgo.getDate() - 7)
            return entryDate >= weekAgo
          }).length
          
          if (weeklyWorkouts < state.fitnessGoals.weeklyWorkouts) {
            insights.push({
              id: `fitness-goal-${Date.now()}`,
              type: 'fitness',
              title: 'Objectif d\'entraînement non atteint',
              description: `Vous avez fait ${weeklyWorkouts} entraînements cette semaine sur ${state.fitnessGoals.weeklyWorkouts} prévus`,
              recommendation: 'Planifiez vos séances d\'entraînement à l\'avance pour atteindre vos objectifs',
              impact: 'medium',
              date: new Date().toISOString()
            })
          }
        }
        
        set({ healthInsights: insights })
      },
      
      // Utilities
      clearAllData: () => set({
        sleepEntries: [],
        workoutEntries: [],
        mealEntries: [],
        hydrationEntries: [],
        fastingSessions: [],
        healthInsights: [],
        healthCorrelations: []
      })
    }),
    {
      name: 'neuroflow-health-store'
    }
  )
)

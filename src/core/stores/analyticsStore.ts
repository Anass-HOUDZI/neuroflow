import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Chart Configuration Types
interface ChartConfig {
  id: string
  name: string
  type: 'line' | 'bar' | 'area' | 'scatter' | 'pie' | 'radar'
  dataSource: string
  xAxis: string
  yAxis: string[]
  filters: Record<string, any>
  colors: string[]
  title: string
  description: string
}

// Data Export Types
interface ExportRecord {
  id: string
  name: string
  format: 'csv' | 'json' | 'pdf' | 'excel'
  dataSource: string
  filters: Record<string, any>
  createdAt: string
  size: number
}

// Analytics Insight Types
interface AnalyticsInsight {
  id: string
  title: string
  description: string
  type: 'trend' | 'correlation' | 'anomaly' | 'prediction'
  modules: string[]
  confidence: number
  actionable: boolean
  recommendation?: string
  impact: 'low' | 'medium' | 'high'
  createdAt: string
}

// Cross-Module Correlation Types
interface CrossModuleCorrelation {
  id: string
  variable1: {
    module: string
    field: string
    label: string
  }
  variable2: {
    module: string
    field: string
    label: string
  }
  correlation: number
  pValue: number
  strength: 'very weak' | 'weak' | 'moderate' | 'strong' | 'very strong'
  significance: 'not significant' | 'significant' | 'highly significant'
  sampleSize: number
  dateRange: {
    start: string
    end: string
  }
  title: string
  description: string
}

// Personal Metrics Summary
interface PersonalMetrics {
  wellness: {
    avgMood: number
    moodTrend: 'improving' | 'stable' | 'declining'
    meditationStreak: number
    stressLevel: number
  }
  productivity: {
    journalEntries: number
    habitCompletion: number
    focusTime: number
    goalProgress: number
  }
  health: {
    sleepQuality: number
    fitnessConsistency: number
    nutritionScore: number
    hydrationLevel: number
  }
}

// Consolidated Insights Types
interface ConsolidatedInsights {
  overallScore: number
  recommendations: {
    title: string
    description: string
    priority: 'low' | 'medium' | 'high'
    modules: string[]
  }[]
  trends: {
    improving: string[]
    declining: string[]
    stable: string[]
  }
}

// Main Store Interface
interface AnalyticsState {
  // Charts & Visualizations
  chartConfigs: ChartConfig[]
  savedCharts: ChartConfig[]
  addChartConfig: (config: Omit<ChartConfig, 'id'>) => void
  updateChartConfig: (id: string, config: Partial<ChartConfig>) => void
  deleteChartConfig: (id: string) => void
  duplicateChartConfig: (id: string) => void
  
  // Data Export
  exportHistory: ExportRecord[]
  addExportRecord: (record: Omit<ExportRecord, 'id'>) => void
  clearExportHistory: () => void
  
  // Analytics Insights
  insights: AnalyticsInsight[]
  crossModuleCorrelations: CrossModuleCorrelation[]
  generateInsights: () => void
  generateCorrelations: () => void
  
  // New methods for analytics
  getConsolidatedInsights: (timeRange: 'week' | 'month' | 'quarter') => ConsolidatedInsights
  getCrossModuleCorrelations: () => CrossModuleCorrelation[]
  
  // Personal Metrics
  personalMetrics: PersonalMetrics | null
  updatePersonalMetrics: () => void
  
  // Data Processing
  processedData: Record<string, any>
  setProcessedData: (key: string, data: any) => void
  clearProcessedData: () => void
  
  // Settings
  analyticsSettings: {
    autoGenerateInsights: boolean
    insightFrequency: 'daily' | 'weekly' | 'monthly'
    correlationThreshold: number
    enableCrossModuleAnalysis: boolean
    dataRetentionDays: number
  }
  updateAnalyticsSettings: (settings: Partial<AnalyticsState['analyticsSettings']>) => void
  
  // Utilities
  clearAllData: () => void
}

const defaultAnalyticsSettings = {
  autoGenerateInsights: true,
  insightFrequency: 'weekly' as const,
  correlationThreshold: 0.3,
  enableCrossModuleAnalysis: true,
  dataRetentionDays: 365
}

const defaultPersonalMetrics: PersonalMetrics = {
  wellness: {
    avgMood: 5,
    moodTrend: 'stable',
    meditationStreak: 0,
    stressLevel: 5
  },
  productivity: {
    journalEntries: 0,
    habitCompletion: 0,
    focusTime: 0,
    goalProgress: 0
  },
  health: {
    sleepQuality: 5,
    fitnessConsistency: 0,
    nutritionScore: 0,
    hydrationLevel: 0
  }
}

export const useAnalyticsStore = create<AnalyticsState>()(
  persist(
    (set, get) => ({
      // Charts State
      chartConfigs: [],
      savedCharts: [],
      
      // Export State
      exportHistory: [],
      
      // Analytics State
      insights: [],
      crossModuleCorrelations: [],
      
      // Personal Metrics State
      personalMetrics: defaultPersonalMetrics,
      
      // Data Processing State
      processedData: {},
      
      // Settings State
      analyticsSettings: defaultAnalyticsSettings,
      
      // Chart Actions
      addChartConfig: (config) => set((state) => ({
        chartConfigs: [{
          ...config,
          id: Date.now().toString()
        }, ...state.chartConfigs]
      })),
      
      updateChartConfig: (id, config) => set((state) => ({
        chartConfigs: state.chartConfigs.map(c => 
          c.id === id ? { ...c, ...config } : c
        )
      })),
      
      deleteChartConfig: (id) => set((state) => ({
        chartConfigs: state.chartConfigs.filter(c => c.id !== id)
      })),
      
      duplicateChartConfig: (id) => set((state) => {
        const config = state.chartConfigs.find(c => c.id === id)
        if (!config) return state
        
        return {
          chartConfigs: [{
            ...config,
            id: Date.now().toString(),
            name: `${config.name} (Copy)`
          }, ...state.chartConfigs]
        }
      }),
      
      // Export Actions
      addExportRecord: (record) => set((state) => ({
        exportHistory: [{
          ...record,
          id: Date.now().toString()
        }, ...state.exportHistory]
      })),
      
      clearExportHistory: () => set({ exportHistory: [] }),
      
      // Analytics Actions
      generateInsights: () => {
        const insights: AnalyticsInsight[] = []
        
        // Cross-module trend analysis
        insights.push({
          id: `trend-${Date.now()}`,
          title: 'Analyse des tendances globales',
          description: 'Vos métriques montrent une amélioration générale sur les 30 derniers jours',
          type: 'trend',
          modules: ['wellness', 'productivity', 'health'],
          confidence: 0.85,
          actionable: true,
          recommendation: 'Continuez vos habitudes actuelles pour maintenir cette progression positive',
          impact: 'high',
          createdAt: new Date().toISOString()
        })
        
        // Correlation insights
        insights.push({
          id: `correlation-${Date.now()}`,
          title: 'Corrélation sommeil-productivité',
          description: 'Une meilleure qualité de sommeil est fortement corrélée à votre productivité',
          type: 'correlation',
          modules: ['health', 'productivity'],
          confidence: 0.92,
          actionable: true,
          recommendation: 'Privilégiez un sommeil de qualité pour optimiser vos performances',
          impact: 'high',
          createdAt: new Date().toISOString()
        })
        
        set({ insights })
      },
      
      generateCorrelations: () => {
        const correlations: CrossModuleCorrelation[] = []
        
        // Example correlation: Sleep Quality vs Mood
        correlations.push({
          id: `corr-sleep-mood-${Date.now()}`,
          variable1: {
            module: 'health',
            field: 'sleepQuality',
            label: 'Qualité du sommeil'
          },
          variable2: {
            module: 'wellness',
            field: 'mood',
            label: 'Humeur moyenne'
          },
          correlation: 0.73,
          pValue: 0.02,
          strength: 'strong',
          significance: 'significant',
          sampleSize: 30,
          dateRange: {
            start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
            end: new Date().toISOString()
          },
          title: 'Sommeil et Humeur',
          description: 'Corrélation positive entre qualité du sommeil et humeur quotidienne'
        })
        
        // Example correlation: Exercise vs Energy
        correlations.push({
          id: `corr-exercise-energy-${Date.now()}`,
          variable1: {
            module: 'health',
            field: 'exerciseFrequency',
            label: 'Fréquence d\'exercice'
          },
          variable2: {
            module: 'wellness',
            field: 'energyLevel',
            label: 'Niveau d\'énergie'
          },
          correlation: 0.65,
          pValue: 0.04,
          strength: 'moderate',
          significance: 'significant',
          sampleSize: 25,
          dateRange: {
            start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
            end: new Date().toISOString()
          },
          title: 'Exercice et Énergie',
          description: 'L\'activité physique régulière améliore significativement les niveaux d\'énergie'
        })
        
        set({ crossModuleCorrelations: correlations })
      },
      
      // New Analytics Methods
      getConsolidatedInsights: (timeRange) => {
        // Mock consolidated insights based on time range
        const baseScore = timeRange === 'week' ? 78 : timeRange === 'month' ? 82 : 85
        
        return {
          overallScore: baseScore,
          recommendations: [
            {
              title: 'Améliorer la régularité du sommeil',
              description: 'Vos heures de coucher varient trop, impactant votre récupération',
              priority: 'high',
              modules: ['health', 'wellness']
            },
            {
              title: 'Augmenter la fréquence de méditation',
              description: 'La méditation régulière pourrait améliorer votre gestion du stress',
              priority: 'medium',
              modules: ['wellness']
            },
            {
              title: 'Optimiser vos sessions de journal',
              description: 'Écrire plus régulièrement pourrait améliorer votre clarté mentale',
              priority: 'low',
              modules: ['productivity']
            }
          ],
          trends: {
            improving: ['Qualité du sommeil', 'Humeur générale'],
            declining: ['Niveau d\'énergie'],
            stable: ['Productivité', 'Méditation']
          }
        }
      },
      
      getCrossModuleCorrelations: () => {
        const state = get()
        if (state.crossModuleCorrelations.length > 0) {
          return state.crossModuleCorrelations
        }
        
        // Return default correlations with proper structure
        return [
          {
            id: 'default-sleep-mood',
            variable1: {
              module: 'health',
              field: 'sleepQuality',
              label: 'Qualité du sommeil'
            },
            variable2: {
              module: 'wellness',
              field: 'mood',
              label: 'Humeur moyenne'
            },
            correlation: 0.73,
            pValue: 0.02,
            strength: 'strong' as const,
            significance: 'significant' as const,
            sampleSize: 30,
            dateRange: {
              start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
              end: new Date().toISOString()
            },
            title: 'Sommeil et Humeur',
            description: 'Corrélation positive entre qualité du sommeil et humeur quotidienne'
          },
          {
            id: 'default-exercise-energy',
            variable1: {
              module: 'health',
              field: 'exerciseFrequency',
              label: 'Fréquence d\'exercice'
            },
            variable2: {
              module: 'wellness',
              field: 'energyLevel',
              label: 'Niveau d\'énergie'
            },
            correlation: 0.65,
            pValue: 0.04,
            strength: 'moderate' as const,
            significance: 'significant' as const,
            sampleSize: 25,
            dateRange: {
              start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
              end: new Date().toISOString()
            },
            title: 'Exercice et Énergie',
            description: 'L\'activité physique régulière améliore significativement les niveaux d\'énergie'
          }
        ]
      },
      
      // Personal Metrics Actions
      updatePersonalMetrics: () => {
        // This would calculate metrics from all other stores
        // For now, we'll use mock data
        const metrics: PersonalMetrics = {
          wellness: {
            avgMood: 7.2,
            moodTrend: 'improving',
            meditationStreak: 5,
            stressLevel: 4.1
          },
          productivity: {
            journalEntries: 12,
            habitCompletion: 78,
            focusTime: 145,
            goalProgress: 65
          },
          health: {
            sleepQuality: 7.8,
            fitnessConsistency: 85,
            nutritionScore: 72,
            hydrationLevel: 90
          }
        }
        
        set({ personalMetrics: metrics })
      },
      
      // Data Processing Actions
      setProcessedData: (key, data) => set((state) => ({
        processedData: {
          ...state.processedData,
          [key]: data
        }
      })),
      
      clearProcessedData: () => set({ processedData: {} }),
      
      // Settings Actions
      updateAnalyticsSettings: (settings) => set((state) => ({
        analyticsSettings: {
          ...state.analyticsSettings,
          ...settings
        }
      })),
      
      // Utilities
      clearAllData: () => set({
        chartConfigs: [],
        savedCharts: [],
        exportHistory: [],
        insights: [],
        crossModuleCorrelations: [],
        personalMetrics: defaultPersonalMetrics,
        processedData: {}
      })
    }),
    {
      name: 'neuroflow-analytics-store'
    }
  )
)

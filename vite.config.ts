import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Core framework chunks
          'react-vendor': ['react', 'react-dom'],
          'router': ['react-router-dom'],
          'ui-vendor': ['@radix-ui/react-slot', '@radix-ui/react-toast', '@radix-ui/react-progress'],
          
          // State management
          'state': ['zustand'],
          
          // Wellness Module - Optimized chunking
          'wellness-core': [
            './src/modules/wellness/components/MoodEntryForm',
            './src/modules/wellness/components/MoodHistory',
            './src/core/stores/wellnessStore'
          ],
          'wellness-meditation': [
            './src/modules/wellness/components/MeditationLibrary',
            './src/modules/wellness/components/MeditationPlayer'
          ],
          
          // Productivity Module - Ultra-optimized chunking
          'productivity-core': [
            './src/core/stores/productivityStore',
            './src/modules/productivity/hooks/useDebouncedSave',
            './src/modules/productivity/hooks/useVirtualScrolling'
          ],
          'productivity-journal': [
            './src/modules/productivity/components/journal/OptimizedJournalEditor',
            './src/modules/productivity/components/journal/OptimizedJournalList',
            './src/modules/productivity/pages/OptimizedJournal'
          ],
          'productivity-habits': [
            './src/modules/productivity/pages/OptimizedHabitGrid',
            './src/components/habit-grid/HabitForm',
            './src/components/habit-grid/HabitList',
            './src/components/habit-grid/WeeklyGrid'
          ],
          'productivity-zenpad': [
            './src/modules/productivity/components/zenpad/OptimizedZenEditor',
            './src/modules/productivity/pages/OptimizedZenPad'
          ],
          
          // Other modules (to be optimized in future phases)
          'productivity-legacy': [
            './src/pages/LocalBoard',
            './src/pages/Goals',
            './src/pages/Analytics',
            './src/pages/Calendar'
          ],
          'health': [
            './src/pages/SleepAnalyzer',
            './src/pages/FitnessLog',
            './src/pages/HydroReminder'
          ],
          'data-tools': [
            './src/pages/DataViz',
            './src/pages/StatsPro'
          ]
        }
      }
    },
    chunkSizeWarningLimit: 1000,
    sourcemap: false
  },
});

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
          
          // Other modules (to be optimized in future phases)
          'productivity': [
            './src/pages/Journal',
            './src/pages/HabitGrid',
            './src/pages/ZenPad'
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

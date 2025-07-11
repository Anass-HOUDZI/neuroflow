
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from 'vite-plugin-pwa';
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,woff,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // <== 365 days
              },
              cacheKeyWillBeUsed: async ({ request }) => {
                return `${request.url}?version=1`;
              }
            }
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'gstatic-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // <== 365 days
              }
            }
          }
        ]
      },
      includeAssets: ['favicon.ico', 'apple-touch-icon.png'],
      manifest: {
        name: 'NeuroFlow Suite',
        short_name: 'NeuroFlow',
        description: 'Suite d\'applications pour la productivité, créativité et bien-être mental',
        theme_color: '#3b82f6',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ],
        categories: ['productivity', 'health', 'lifestyle'],
        lang: 'fr-FR'
      }
    })
  ],
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
    sourcemap: false,
    target: 'esnext',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'zustand']
  }
});

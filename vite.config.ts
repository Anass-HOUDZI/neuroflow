
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff,woff2}'],
        maximumFileSizeToCacheInBytes: 10 * 1024 * 1024, // 10MB limit increased
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/images\.unsplash\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'unsplash-images',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
              }
            }
          },
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'google-fonts-stylesheets',
            }
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-webfonts',
              expiration: {
                maxEntries: 30,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              }
            }
          }
        ]
      },
      manifest: {
        name: 'NeuroFlow Suite',
        short_name: 'NeuroFlow',
        description: 'Le compagnon neuroscience du mieux-être. Tout local, sans distraction.',
        theme_color: '#3b82f6',
        background_color: '#f9fafb',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: '/icons/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icons/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/icons/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Core libraries
          'react-vendor': ['react', 'react-dom'],
          'router': ['react-router-dom'],
          
          // UI libraries by usage frequency
          'ui-core': ['@radix-ui/react-dialog', '@radix-ui/react-popover', '@radix-ui/react-tabs', '@radix-ui/react-toast'],
          'ui-forms': ['@radix-ui/react-select', '@radix-ui/react-slider', '@radix-ui/react-switch', '@radix-ui/react-checkbox'],
          'ui-navigation': ['@radix-ui/react-dropdown-menu', '@radix-ui/react-navigation-menu', '@radix-ui/react-menubar'],
          
          // Business logic by domain
          'wellness': [
            './src/pages/MoodTracker',
            './src/pages/Meditation', 
            './src/pages/MindfulBreath',
            './src/pages/AnxietyHelper',
            './src/pages/StressScanner',
            './src/pages/SelfCompassion',
            './src/pages/EmotionWheel',
            './src/pages/GratitudeGarden'
          ],
          'productivity': [
            './src/pages/Journal',
            './src/pages/Goals',
            './src/pages/HabitGrid', 
            './src/pages/ZenPad',
            './src/pages/LocalBoard',
            './src/pages/Analytics',
            './src/pages/Calendar'
          ],
          'health': [
            './src/pages/SleepAnalyzer',
            './src/pages/FitnessLog',
            './src/pages/HydroReminder',
            './src/pages/NutrientTracker',
            './src/pages/AstingSupport',
            './src/pages/MindfulEating',
            './src/pages/EnergyBalance'
          ],
          'data-tools': [
            './src/pages/DataViz',
            './src/pages/StatsPro', 
            './src/pages/SoundWeaver'
          ],
          
          // Heavy libraries
          'charts': ['recharts'],
          'query': ['@tanstack/react-query'],
          'state': ['zustand'],
          'icons': ['lucide-react']
        }
      }
    },
    target: 'es2020',
    minify: 'esbuild',
    cssMinify: true,
    reportCompressedSize: false,
    sourcemap: mode === 'development',
    chunkSizeWarningLimit: 1000 // Increase threshold for our optimized chunks
  },
  optimizeDeps: {
    include: [
      'react', 
      'react-dom', 
      'react-router-dom', 
      'lucide-react',
      'zustand',
      '@tanstack/react-query'
    ],
    // Pre-bundle frequently used dependencies
    force: mode === 'development'
  },
  // Performance optimizations
  esbuild: {
    drop: mode === 'production' ? ['console', 'debugger'] : [],
  }
}));

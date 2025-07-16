
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from 'vite-plugin-pwa';
import { componentTagger } from "lovable-tagger";
import path from "path";

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
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,woff,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365
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
                maxAgeSeconds: 60 * 60 * 24 * 365
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
          // Core framework chunks - optimized
          'react-core': ['react', 'react-dom'],
          'routing': ['react-router-dom'],
          
          // UI chunks - ultra-optimized
          'ui-core': ['@radix-ui/react-slot', '@radix-ui/react-toast'],
          'ui-forms': ['@radix-ui/react-progress', '@radix-ui/react-dialog'],
          
          // Icons - separate chunk for better caching
          'icons': ['lucide-react'],
          
          // Utils and hooks
          'utils': ['clsx', 'tailwind-merge', 'class-variance-authority'],
          
          // Productivity tools - highly optimized
          'productivity-main': [
            './src/pages/Journal',
            './src/pages/HabitGrid',
            './src/pages/ZenPad'
          ],
          'productivity-secondary': [
            './src/pages/LocalBoard',
            './src/pages/Goals',
            './src/pages/Calendar'
          ],
          
          // Wellness tools - optimized chunking
          'wellness-main': [
            './src/pages/MoodTracker',
            './src/pages/MindfulBreath'
          ],
          'wellness-secondary': [
            './src/pages/AnxietyHelper',
            './src/pages/StressScanner',
            './src/pages/SelfCompassion'
          ],
          
          // Health tools
          'health-main': [
            './src/pages/HydroReminder',
            './src/pages/SleepAnalyzer'
          ],
          'health-secondary': [
            './src/pages/FitnessLog',
            './src/pages/NutrientTracker',
            './src/pages/EnergyBalance'
          ],
          
          // Data and tools
          'tools': [
            './src/pages/DataViz',
            './src/pages/StatsPro',
            './src/pages/SoundWeaver',
            './src/pages/Analytics'
          ]
        }
      }
    },
    chunkSizeWarningLimit: 500, // Reduced for better performance
    sourcemap: false,
    target: 'esnext',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.warn'],
        passes: 2
      },
      mangle: {
        safari10: true
      }
    },
    // Ultra performance optimizations
    reportCompressedSize: false,
    assetsInlineLimit: 4096
  },
  optimizeDeps: {
    include: [
      'react', 
      'react-dom', 
      'react-router-dom',
      'lucide-react'
    ],
    exclude: ['@vite/client', '@vite/env']
  },
  // Additional performance optimizations
  esbuild: {
    target: 'esnext',
    platform: 'browser',
    treeShaking: true
  }
}));

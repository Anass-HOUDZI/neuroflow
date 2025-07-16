
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
          // Core framework chunks - ultra-optimized
          'react-vendor': ['react', 'react-dom'],
          'router': ['react-router-dom'],
          
          // UI chunks - optimized by functionality
          'ui-core': [
            '@radix-ui/react-slot', 
            '@radix-ui/react-toast',
            '@radix-ui/react-dialog',
            '@radix-ui/react-progress'
          ],
          
          // Icons - separate chunk for aggressive caching
          'icons': ['lucide-react'],
          
          // Utils and shared logic
          'shared': ['clsx', 'tailwind-merge', 'class-variance-authority'],
          
          // Module chunks - domain-specific bundles
          'wellness-module': [
            './src/modules/wellness/WellnessRoutes',
            './src/modules/wellness/pages/OptimizedMoodTracker',
            './src/modules/wellness/pages/OptimizedMeditation'
          ],
          
          'productivity-module': [
            './src/modules/productivity/ProductivityRoutes',
            './src/modules/productivity/pages/OptimizedJournal',
            './src/modules/productivity/pages/OptimizedHabitGrid',
            './src/modules/productivity/pages/OptimizedZenPad'
          ],
          
          'health-module': [
            './src/modules/health/HealthRoutes',
            './src/modules/health/pages/OptimizedSleepAnalyzer'
          ],
          
          'analytics-module': [
            './src/modules/analytics/AnalyticsRoutes',
            './src/modules/analytics/pages/OptimizedAnalytics'
          ],
          
          'tools-module': [
            './src/modules/tools/ToolsRoutes'
          ]
        }
      }
    },
    chunkSizeWarningLimit: 300, // Ultra-strict chunk size
    sourcemap: false,
    target: 'esnext',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.warn', 'console.info'],
        passes: 3, // More aggressive compression
        unsafe: true,
        unsafe_comps: true,
        unsafe_math: true,
        unsafe_proto: true
      },
      mangle: {
        safari10: true,
        properties: {
          regex: /^_/
        }
      }
    },
    // Ultra performance optimizations
    reportCompressedSize: false,
    assetsInlineLimit: 8192, // Inline more assets
    cssCodeSplit: true
  },
  optimizeDeps: {
    include: [
      'react', 
      'react-dom', 
      'react-router-dom',
      'lucide-react',
      '@radix-ui/react-slot',
      '@radix-ui/react-toast'
    ],
    exclude: ['@vite/client', '@vite/env']
  },
  // Additional ultra performance optimizations
  esbuild: {
    target: 'esnext',
    platform: 'browser',
    treeShaking: true,
    minifyIdentifiers: true,
    minifySyntax: true,
    minifyWhitespace: true
  },
  // Performance hints
  performance: {
    hints: 'warning',
    maxAssetSize: 250000, // 250kb max per asset
    maxEntrypointSize: 400000 // 400kb max entrypoint
  }
}));

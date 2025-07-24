
// Advanced Service Worker for NeuroFlow
// Intelligent caching with performance optimization

const CACHE_VERSION = 'v2.1.0';
const STATIC_CACHE = `neuroflow-static-${CACHE_VERSION}`;
const DYNAMIC_CACHE = `neuroflow-dynamic-${CACHE_VERSION}`;
const FONTS_CACHE = `neuroflow-fonts-${CACHE_VERSION}`;
const IMAGES_CACHE = `neuroflow-images-${CACHE_VERSION}`;

// Critical resources for instant loading
const CRITICAL_ASSETS = [
  '/',
  '/manifest.json',
  '/static/js/main.js',
  '/static/css/main.css'
];

// Tools to preload based on usage patterns
const HIGH_PRIORITY_TOOLS = [
  '/journal',
  '/mood-tracker',
  '/meditation',
  '/zenpad'
];

// Cache strategies
const CACHE_STRATEGIES = {
  // Instant load for critical assets
  'stale-while-revalidate': [
    /\.(js|css|html)$/,
    /\/api\/critical\//
  ],
  
  // Cache first for static assets
  'cache-first': [
    /\.(png|jpg|jpeg|svg|webp|woff|woff2)$/,
    /\/static\//
  ],
  
  // Network first for dynamic content
  'network-first': [
    /\/api\/user\//,
    /\/api\/data\//
  ]
};

// Install event - cache critical resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    Promise.all([
      // Cache critical assets
      caches.open(STATIC_CACHE).then((cache) => {
        return cache.addAll(CRITICAL_ASSETS);
      }),
      
      // Preload high-priority tools
      caches.open(DYNAMIC_CACHE).then((cache) => {
        return cache.addAll(HIGH_PRIORITY_TOOLS);
      })
    ]).then(() => {
      // Skip waiting to activate immediately
      self.skipWaiting();
    })
  );
});

// Activate event - cleanup old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    Promise.all([
      // Delete old cache versions
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((name) => name.includes('neuroflow') && !name.includes(CACHE_VERSION))
            .map((name) => caches.delete(name))
        );
      }),
      
      // Claim clients immediately
      self.clients.claim()
    ])
  );
});

// Fetch event - intelligent routing
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests and chrome-extension
  if (request.method !== 'GET' || url.protocol === 'chrome-extension:') {
    return;
  }

  event.respondWith(handleRequest(request));
});

async function handleRequest(request) {
  const url = new URL(request.url);
  
  // API requests - network first with cache fallback
  if (url.pathname.startsWith('/api/')) {
    return networkFirstStrategy(request, DYNAMIC_CACHE);
  }
  
  // Fonts - cache first with network fallback
  if (request.destination === 'font' || url.pathname.includes('/fonts/')) {
    return cacheFirstStrategy(request, FONTS_CACHE);
  }
  
  // Images - cache first with optimization
  if (request.destination === 'image') {
    return cacheFirstStrategy(request, IMAGES_CACHE);
  }
  
  // Static assets - stale while revalidate
  if (isStaticAsset(url)) {
    return staleWhileRevalidateStrategy(request, STATIC_CACHE);
  }
  
  // Navigation - network first with offline fallback
  if (request.mode === 'navigate') {
    return navigationStrategy(request);
  }
  
  // Default - network with cache fallback
  return networkFirstStrategy(request, DYNAMIC_CACHE);
}

// Cache strategies implementation
async function staleWhileRevalidateStrategy(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);
  
  const fetchPromise = fetch(request).then((response) => {
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  }).catch(() => cachedResponse);
  
  return cachedResponse || fetchPromise;
}

async function cacheFirstStrategy(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);
  
  if (cachedResponse) {
    return cachedResponse;
  }
  
  try {
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    // Return offline fallback for images
    if (request.destination === 'image') {
      return new Response(
        '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><rect width="200" height="200" fill="#f3f4f6"/><text x="100" y="100" text-anchor="middle" fill="#9ca3af">Image non disponible</text></svg>',
        { headers: { 'Content-Type': 'image/svg+xml' } }
      );
    }
    throw error;
  }
}

async function networkFirstStrategy(request, cacheName) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    throw error;
  }
}

async function navigationStrategy(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    // Return cached page or offline fallback
    const cache = await caches.open(DYNAMIC_CACHE);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Return offline page
    return caches.match('/') || new Response(
      '<!DOCTYPE html><html><head><title>NeuroFlow - Hors ligne</title></head><body><h1>Vous êtes hors ligne</h1><p>Veuillez vérifier votre connexion internet.</p></body></html>',
      { headers: { 'Content-Type': 'text/html' } }
    );
  }
}

// Helper functions
function isStaticAsset(url) {
  return CACHE_STRATEGIES['cache-first'].some(pattern => pattern.test(url.pathname));
}

// Background sync for offline data
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(syncOfflineData());
  }
});

async function syncOfflineData() {
  // Sync any offline data when connection is restored
  const clients = await self.clients.matchAll();
  clients.forEach(client => {
    client.postMessage({ type: 'SYNC_OFFLINE_DATA' });
  });
}

// Push notifications for reminders
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'Rappel NeuroFlow',
    icon: '/pwa-192x192.png',
    badge: '/pwa-192x192.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'open-app',
        title: 'Ouvrir l\'app'
      },
      {
        action: 'dismiss',
        title: 'Plus tard'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('NeuroFlow', options)
  );
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'open-app') {
    event.waitUntil(
      self.clients.openWindow('/')
    );
  }
});

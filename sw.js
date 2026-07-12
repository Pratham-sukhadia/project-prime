/* ============================================================
   PROJECT PRIME — Service Worker
   Offline-first PWA with App Shell caching strategy
   ============================================================ */

const CACHE_VERSION = 'prime-v1';
const STATIC_CACHE = `${CACHE_VERSION}-static`;
const DYNAMIC_CACHE = `${CACHE_VERSION}-dynamic`;

// App Shell — critical assets to pre-cache on install
const APP_SHELL = [
  './',
  './index.html',
  './offline.html',
  './manifest.json',
  './css/design-system.css',
  './css/components.css',
  './css/pages.css',
  './css/animations.css',
  './js/app.js',
  './js/router.js',
  './js/store.js',
  './js/components/nav.js',
  './js/components/card.js',
  './js/components/chart.js',
  './js/components/progress-ring.js',
  './js/components/modal.js',
  './js/components/toast.js',
  './js/components/timer.js',
  './js/components/habit-check.js',
  './js/pages/dashboard.js',
  './js/pages/workout.js',
  './js/pages/nutrition.js',
  './js/pages/progress.js',
  './js/pages/habits.js',
  './js/pages/schedule.js',
  './js/pages/exercise-lib.js',
  './js/pages/coach.js',
  './js/pages/settings.js',
  './js/pages/achievements.js',
  './js/data/workouts.js',
  './js/data/exercises.js',
  './js/data/meals.js',
  './js/data/achievements.js',
  './js/data/quotes.js',
  './js/utils/date.js',
  './js/utils/animations.js',
  './js/utils/notifications.js'
];

// Install — Pre-cache App Shell
self.addEventListener('install', (event) => {
  console.log('[SW] Installing Service Worker v1...');
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('[SW] Pre-caching App Shell');
        return cache.addAll(APP_SHELL);
      })
      .then(() => self.skipWaiting())
      .catch((err) => {
        console.error('[SW] Pre-cache failed:', err);
      })
  );
});

// Activate — Clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating Service Worker v1...');
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((name) => name !== STATIC_CACHE && name !== DYNAMIC_CACHE)
            .map((name) => {
              console.log('[SW] Deleting old cache:', name);
              return caches.delete(name);
            })
        );
      })
      .then(() => self.clients.claim())
  );
});

// Fetch — Cache-first for static, stale-while-revalidate for pages
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Skip Chrome extension requests and external URLs we don't control
  if (url.protocol === 'chrome-extension:') return;

  // For navigation requests (HTML pages) — Network first, fallback to cache, then offline page
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Clone and cache the fresh response
          const responseClone = response.clone();
          caches.open(DYNAMIC_CACHE).then((cache) => {
            cache.put(request, responseClone);
          });
          return response;
        })
        .catch(() => {
          return caches.match(request)
            .then((cached) => cached || caches.match('./offline.html'));
        })
    );
    return;
  }

  // For static assets (JS, CSS, images) — Cache first, network fallback
  if (
    url.pathname.endsWith('.js') ||
    url.pathname.endsWith('.css') ||
    url.pathname.endsWith('.png') ||
    url.pathname.endsWith('.jpg') ||
    url.pathname.endsWith('.svg') ||
    url.pathname.endsWith('.woff2') ||
    url.pathname.endsWith('.json')
  ) {
    event.respondWith(
      caches.match(request)
        .then((cached) => {
          if (cached) return cached;
          return fetch(request)
            .then((response) => {
              // Only cache successful responses
              if (!response || response.status !== 200) return response;
              const responseClone = response.clone();
              caches.open(STATIC_CACHE).then((cache) => {
                cache.put(request, responseClone);
              });
              return response;
            })
            .catch(() => {
              // Return nothing for failed static asset fetches
              return new Response('', { status: 408, statusText: 'Offline' });
            });
        })
    );
    return;
  }

  // For CDN resources (fonts, libraries) — Stale while revalidate
  event.respondWith(
    caches.match(request)
      .then((cached) => {
        const fetchPromise = fetch(request)
          .then((response) => {
            if (response && response.status === 200) {
              const responseClone = response.clone();
              caches.open(DYNAMIC_CACHE).then((cache) => {
                cache.put(request, responseClone);
              });
            }
            return response;
          })
          .catch(() => cached);

        return cached || fetchPromise;
      })
  );
});

// Handle messages from the main app
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

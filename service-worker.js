// Define a cache name for your application assets. Update this when you change cached files.
const CACHE_NAME = 'jee-timetable-v1.0.2'; // Changed version to trigger update

// List of URLs to cache (your static assets).
// This includes your HTML, CSS (Tailwind CDN), JavaScript, and Firebase CDN links.
const urlsToCache = [
  './', // Caches the root (index.html)
  './index.html',
  'https://cdn.tailwindcss.com',
  'https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js',
  'https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js',
  'https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js'
];

// Install event: This fires when the service worker is first registered.
// It caches all the essential assets for offline use.
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[Service Worker] Caching all app shell assets');
        return cache.addAll(urlsToCache);
      })
      .catch((error) => {
        console.error('[Service Worker] Cache addAll failed:', error);
      })
  );
});

// Activate event: This fires when the service worker is activated.
// It cleans up old caches to ensure only the latest version is used.
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('[Service Worker] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  // Ensure the service worker takes control of clients immediately.
  return self.clients.claim();
});

// Fetch event: This fires every time the browser requests a resource.
// It implements the "cache-first, then network" strategy.
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // If the resource is in the cache, return it.
        if (response) {
          console.log('[Service Worker] Serving from cache:', event.request.url);
          return response;
        }
        // If not in cache, fetch from the network.
        console.log('[Service Worker] Fetching from network:', event.request.url);
        return fetch(event.request)
          .then((networkResponse) => {
            // Check if we received a valid response
            if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
              return networkResponse;
            }
            // Clone the response because it's a stream and can only be consumed once.
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });
            return networkResponse;
          })
          .catch((error) => {
            console.error('[Service Worker] Fetch failed and no cache match:', event.request.url, error);
            // This is where you might return an offline fallback page if needed
            // For now, it will just fail to load the resource.
            // Example: return caches.match('/offline.html');
          });
      })
  );
});

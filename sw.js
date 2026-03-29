// v3 - no caching, network-only pass-through
self.addEventListener('install', function () {
  self.skipWaiting();
});

self.addEventListener('activate', function (e) {
  // Take control of all pages immediately
  e.waitUntil(
    caches.keys().then(function (names) {
      // Delete any caches that might exist
      return Promise.all(names.map(function (name) { return caches.delete(name); }));
    }).then(function () {
      return self.clients.claim();
    })
  );
});

self.addEventListener('fetch', function (e) {
  // Always go to network, never serve from cache
  e.respondWith(fetch(e.request));
});

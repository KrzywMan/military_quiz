const CACHE_NAME = 'military-quiz-v2';
const CORE_ASSETS = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './vehicles_data.js',
  './manifest.json'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      for (const asset of CORE_ASSETS) {
        try {
          await cache.add(asset);
        } catch (err) {
          // Ignore individual missing assets so install never throws
        }
      }
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((k) => {
          if (k !== CACHE_NAME) return caches.delete(k);
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  // Let external image requests pass through cleanly
  if (e.request.url.startsWith('http')) {
    e.respondWith(
      caches.match(e.request).then((res) => {
        return res || fetch(e.request).catch(() => caches.match('./index.html'));
      })
    );
  }
});

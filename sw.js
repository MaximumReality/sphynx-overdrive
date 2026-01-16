const CACHE_NAME = 'sphynx-v1';
const ASSETS = [
  'index.html',
  'manifest.json',
  'flyazulo.png',
  'mochkil_front_kart.png',
  'mochkil_walk_right_cake.png',
  'logo.png',
  'hacker-favicon.PNG'
  'sw.js'
];

  
  // Add any additional files you want cached: e.g., images/icons
];

// Install service worker and cache assets
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

// Fetch assets from cache, fallback to network
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});

// Activate and clean up old caches
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(key => {
        if (key !== CACHE_NAME) return caches.delete(key);
      }))
    )
  );
});

const CACHE_NAME = "cli-home-v3";

const FILES = [
  "./",
  "./index.html",
  "./manifest.json",

  "./css/terminal.css",
  "./css/componets.css",

  "./js/app.js",
  "./js/storage.js",
  "./js/habits.js",
  "./js/eisenhower.js",
  "./js/heatmap.js",
  "./js/notes.js",

  "./assets/icon.svg",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILES);
    }),
  );

  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key)),
      );
    }),
  );

  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  // Only handle GET requests.
  if (event.request.method !== "GET") {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) {
        return cached;
      }

      return fetch(event.request).then((response) => {
        // Don't cache invalid responses.
        if (
          !response ||
          response.status !== 200 ||
          response.type === "opaque"
        ) {
          return response;
        }

        const copy = response.clone();

        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, copy);
        });

        return response;
      });
    }),
  );
});

const CACHE_NAME = "enjoy-v2";

const FILES_TO_CACHE = [
  "/enjoy/",
  "/enjoy/index.html",
  "/enjoy/dotto.css",
  "/enjoy/dotto.js",
  "/enjoy/admin.html",
  "/enjoy/admin.css",
  "/enjoy/admin.js",
  "/enjoy/myrequests.html",
  "/enjoy/myrequests.js",
  "/enjoy/manifest.json"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES_TO_CACHE))
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

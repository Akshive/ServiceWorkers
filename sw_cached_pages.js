const cacheName = "v1";
const cacheAssets = ["index.html", "about.html", "/js/main.js"];

self.addEventListener("install", (ev) => {
  console.log("sw installed", ev);
  ev.waitUntil(
    caches
      .open(cacheName)
      .then((cache) => {
        console.log("sw: caching files");
        cache.addAll(cacheAssets);
      })
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (ev) => {
  console.log("sw acivated", ev);
  ev.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== cacheName) {
            console.log(`deleting ${cache}`);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", (ev) => {
  console.log("sw fetching");
  ev.respondWith(fetch(ev.request).catch(() => caches.match(ev.request)));
});

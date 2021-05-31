const cacheName = "v2";

self.addEventListener("install", (ev) => {
  console.log("sw installed", ev);
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
  ev.respondWith(
    fetch(ev.request)
      .then((res) => {
        const resClone = res.clone();
        caches.open(cacheName).then((cache) => cache.put(ev.request, resClone));
        return res;
      })
      .catch((err) => caches.match(ev.request).then((res) => res))
  );
});

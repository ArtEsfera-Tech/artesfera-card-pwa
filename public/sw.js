self.addEventListener("fetch", (event) => {
  const request = event.request;

  // 🛑 Ignorar requisições que não sejam GET (como POST)
  if (request.method !== "GET") return;

  const url = new URL(request.url);

  // Cache Google Fonts
  if (
    url.origin.includes("fonts.googleapis.com") ||
    url.origin.includes("fonts.gstatic.com")
  ) {
    event.respondWith(
      caches.open("google-fonts-cache").then((cache) =>
        cache.match(request).then((cachedResponse) => {
          const fetchPromise = fetch(request)
            .then((networkResponse) => {
              cache.put(request, networkResponse.clone());
              return networkResponse;
            })
            .catch(() => cachedResponse);

          return cachedResponse || fetchPromise;
        })
      )
    );
    return;
  }

  // Cache First para _next
  if (url.pathname.startsWith("/_next/")) {
    event.respondWith(
      caches.open("next-cache").then((cache) =>
        cache.match(request).then((cachedResponse) => {
          return (
            cachedResponse ||
            fetch(request).then((networkResponse) => {
              cache.put(request, networkResponse.clone());
              return networkResponse;
            })
          );
        })
      )
    );
    return;
  }

  // Cache First para o restante do app
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      return (
        cachedResponse ||
        fetch(request)
          .then((networkResponse) => {
            return caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, networkResponse.clone());
              return networkResponse;
            });
          })
          .catch(() => (request.mode === "navigate" ? caches.match("/") : null))
      );
    })
  );
});

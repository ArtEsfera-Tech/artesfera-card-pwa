const CACHE_NAME = "artesfera-cache-v2";

const ASSETS_TO_CACHE = [
  "/",
  "/favicon.ico",
  "/android-chrome-192x192.svg",
  "/android-chrome-512x512.svg",
  "/android-chrome-1024x1024.svg",
  "/favicon-32x32.png",
  "/apple-touch-icon.png",
  "/manifest.webmanifest",
  "/images/qr-code-business.svg",
];

// INSTALAÇÃO - Cache dos arquivos principais
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// ATIVAÇÃO - Limpa caches antigos
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key))
        )
      )
  );
  self.clients.claim();
});

// FETCH - Estrutura existente, mantém só uma vez
self.addEventListener("fetch", (event) => {
  const request = event.request;

  // Ignorar requisições que não sejam GET
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

  // Cache First para o restante
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

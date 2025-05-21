const CACHE_NAME = "artesfera-cache-v3";
const DATA_CACHE_NAME = "artesfera-data-cache-v1";
const STATIC_CACHE_NAME = "artesfera-next-static-v1";
const GOOGLE_FONTS_CACHE = "google-fonts-cache";

const ASSETS_TO_CACHE = [
  "/",
  "/favicon.ico",
  "/android-chrome-192x192.png",
  "/android-chrome-512x512.png",
  "/android-chrome-1024x1024.png",
  "/favicon-32x32.png",
  "/apple-touch-icon.png",
  "/manifest.webmanifest",
  "/images/qr-code-business.svg",
];

// Instalação – pré-cache dos arquivos principais
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE))
  );
  self.skipWaiting();
});

// Ativação – limpa caches antigos
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter(
              (key) =>
                key !== CACHE_NAME &&
                key !== DATA_CACHE_NAME &&
                key !== STATIC_CACHE_NAME &&
                key !== GOOGLE_FONTS_CACHE
            )
            .map((key) => caches.delete(key))
        )
      )
  );
  self.clients.claim();
});

// FETCH – Regras específicas primeiro, fallback depois
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Ignorar métodos não-GET
  if (request.method !== "GET") return;

  // 1. Dados de rotas dinâmicas (_next/data) – Network First
  if (url.pathname.startsWith("/_next/data/")) {
    event.respondWith(
      caches.open(DATA_CACHE_NAME).then((cache) =>
        fetch(request)
          .then((networkRes) => {
            cache.put(request, networkRes.clone());
            return networkRes;
          })
          .catch(() => cache.match(request))
      )
    );
    return;
  }

  // 2. Arquivos estáticos do Next.js (_next/static) – Cache First
  if (url.pathname.startsWith("/_next/static/")) {
    event.respondWith(
      caches.open(STATIC_CACHE_NAME).then((cache) =>
        cache.match(request).then(
          (cached) =>
            cached ||
            fetch(request).then((networkRes) => {
              cache.put(request, networkRes.clone());
              return networkRes;
            })
        )
      )
    );
    return;
  }

  // 3. Google Fonts – Cache First com atualização em background
  if (
    url.origin.includes("fonts.googleapis.com") ||
    url.origin.includes("fonts.gstatic.com")
  ) {
    event.respondWith(
      caches.open(GOOGLE_FONTS_CACHE).then((cache) =>
        cache.match(request).then((cached) => {
          const fetchPromise = fetch(request)
            .then((networkRes) => {
              cache.put(request, networkRes.clone());
              return networkRes;
            })
            .catch(() => cached);
          return cached || fetchPromise;
        })
      )
    );
    return;
  }

  // 4. Fallback genérico – Cache First, retorna "/" se for navigation offline
  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request)
        .then((networkRes) => {
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, networkRes.clone());
            return networkRes;
          });
        })
        .catch(() =>
          request.mode === "navigate" ? caches.match("/") : undefined
        );
    })
  );
});

// Foghlaim service worker: makes the app work offline.
// When you change any file, bump VERSION so installed copies pick up the update.
const VERSION = "foghlaim-v5";
const AUDIO = "foghlaim-audio"; // spoken phrases from abair.ie, kept across updates
const SHELL = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/maskable-512.png",
  "./icons/apple-touch-icon.png",
  "./icons/favicon-32.png"
];

self.addEventListener("install", event => {
  event.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== VERSION && k !== AUDIO).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  const sameOrigin = url.origin === self.location.origin;
  const isFont = url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com";

  // Pronunciation audio: reuse a phrase once it has been fetched, so it also plays offline.
  if (url.hostname === "synthesis.abair.ie") {
    event.respondWith(
      caches.open(AUDIO).then(async cache => {
        const hit = await cache.match(req);
        if (hit) return hit;
        const res = await fetch(req);
        if (res.ok) cache.put(req, res.clone());
        return res;
      })
    );
    return;
  }
  if (!sameOrigin && !isFont) return; // e.g. teanglann.ie links open in the browser as normal

  // Serve from cache straight away, refresh the cache in the background.
  event.respondWith(
    caches.open(VERSION).then(async cache => {
      const cached = await cache.match(req, { ignoreSearch: sameOrigin });
      const network = fetch(req).then(res => {
        if (res && (res.ok || res.type === "opaque")) cache.put(req, res.clone());
        return res;
      }).catch(() => null);
      if (cached) { event.waitUntil(network); return cached; }
      const res = await network;
      if (res) return res;
      if (req.mode === "navigate") return cache.match("./index.html");
      return new Response("", { status: 504, statusText: "Offline" });
    })
  );
});

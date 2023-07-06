/* eslint-disable no-restricted-globals */

import { clientsClaim } from "workbox-core";
import { ExpirationPlugin } from "workbox-expiration";
import { precacheAndRoute, createHandlerBoundToURL } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import { StaleWhileRevalidate } from "workbox-strategies";

declare const self: Window & { __WB_MANIFEST: any; skipWaiting: any };

clientsClaim();

precacheAndRoute(self.__WB_MANIFEST);

const fileExtensionRegexp = /\/[^/?]+\.[^/]+$/;
registerRoute(({ request, url }) => {
  if (request.mode !== "navigate") {
    return false;
  }
  if (url.pathname.startsWith("/_")) {
    return false;
  }
  return !fileExtensionRegexp.exec(url.pathname);
}, createHandlerBoundToURL(`${process.env.PUBLIC_URL}/index.html`));

registerRoute(
  ({ url }) =>
    url.origin === self.location.origin && url.pathname.endsWith(".png"),
  new StaleWhileRevalidate({
    cacheName: "images",
    plugins: [new ExpirationPlugin({ maxEntries: 50 })],
  })
);

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

// Any other custom service worker logic can go here.

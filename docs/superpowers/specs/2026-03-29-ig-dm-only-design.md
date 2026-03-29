# IG DM Only — Design Spec

## Overview

A static PWA that redirects users to Instagram's DM inbox. No backend, no tracking, no dependencies, no build step. Hosted on GitHub Pages.

## Architecture

Six files served statically:

```
/
├── index.html          # Landing page + redirect logic
├── manifest.json       # PWA manifest
├── sw.js               # Minimal service worker (installability only)
├── style.css           # Styles with light/dark mode via prefers-color-scheme
├── icons/
│   ├── icon-192.png    # Placeholder (192x192)
│   └── icon-512.png    # Placeholder (512x512)
└── README.md
```

No frameworks, no bundler, no build step. Vanilla HTML, CSS, and JS.

## Core Flow

1. User visits `index.html`.
2. JS checks if running as an installed PWA:
   ```js
   const isStandalone =
     window.matchMedia('(display-mode: standalone)').matches ||
     window.navigator.standalone === true;
   ```
3. **If PWA (standalone):** Show splash ("Opening your DMs..." with app icon), then redirect to `https://www.instagram.com/direct/inbox/` immediately via `window.location.href`. The splash is visible only during navigation latency — no artificial delay.
4. **If browser:** Show landing page with install instructions.

## Landing Page Structure

Minimal, clean design. Single scroll, no navigation.

### Sections (top to bottom)

1. **Hero** — App icon (placeholder) + "IG DM Only" + tagline: "Check your Instagram DMs without the addictive feed"
2. **How it works** — Three short steps: Install → Open → DMs. One line each.
3. **Install instructions** — Auto-detected for the user's platform. Fallback link to show all platforms.
4. **Privacy statement** — One paragraph: no data, no accounts, no tracking, open source.
5. **Footer** — Link to GitHub repo.

### Platform Detection

Detect the user's platform to show relevant install instructions only:

```js
const ua = navigator.userAgent;
const isIOS = /iPad|iPhone|iPod/.test(ua) ||
  (navigator.maxTouchPoints > 0 && /Macintosh/.test(ua));

if (isIOS) {
  // iOS instructions
} else if (/Android/.test(ua)) {
  // Android instructions
} else {
  // Desktop instructions
}
```

Note: The `Macintosh` + `maxTouchPoints` check handles iPadOS 13+ which reports a desktop user agent.

A "Show instructions for other platforms" link expands to display all three.

### Install Instructions by Platform

- **iOS (Safari):** Tap the Share button → "Add to Home Screen"
- **Android (Chrome):** Tap menu (⋮) → "Add to Home Screen" (browser may also show install banner)
- **Desktop (Chrome/Edge):** Click the install icon in the address bar

## PWA Splash Screen

Shown briefly when the app is opened in standalone mode, before the redirect fires:

- Centered app icon (placeholder)
- "Opening your DMs..." text below
- Clean white (or dark) background matching system theme

## Dark Mode

Uses `prefers-color-scheme: dark` media query. Swaps background and text colors. Same layout, same structure. Applies to both the landing page and the PWA splash screen.

## PWA Manifest

```json
{
  "name": "IG DM Only",
  "short_name": "IG DM",
  "description": "Check Instagram DMs without the addictive feed",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#833AB4",
  "icons": [
    { "src": "/icons/icon-192.png", "sizes": "192x192", "type": "image/png", "purpose": "any maskable" },
    { "src": "/icons/icon-512.png", "sizes": "512x512", "type": "image/png", "purpose": "any maskable" }
  ]
}
```

## Service Worker

Minimal — exists only to satisfy PWA installability requirements. Pass through all fetch requests to the network:

```js
self.addEventListener('install', (e) => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', (e) => e.respondWith(fetch(e.request)));
```

No caching strategy. The landing page is tiny and the PWA immediately navigates away from our domain on launch.

## Required Meta Tags

```html
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="default">
<meta name="theme-color" content="#833AB4">
<link rel="apple-touch-icon" href="/icons/icon-192.png">
```

## Visual Style

- **Font:** System font stack (`-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`). No web fonts.
- **Light mode:** `#ffffff` background, `#111111` text
- **Dark mode:** `#111111` background, `#f5f5f5` text
- **Accent:** `#833AB4` (Instagram purple) for links and highlights

## Hosting

GitHub Pages, served from the repo root. All paths in `manifest.json` and `index.html` use root-relative URLs (e.g., `/icons/icon-192.png`). No custom domain initially.

## Placeholder Icons

Simple colored squares or circles with "IG DM" text, generated as PNG. The user will design proper icons later.

## Out of Scope (v1)

- Usage timer
- Delay gate / mindfulness prompt
- Configurable redirect target
- Browser extension
- Custom domain
- Analytics of any kind

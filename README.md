# IG DM Only

**Check your Instagram DMs without the addictive feed.**

Instagram is designed to keep you scrolling — the feed, Reels, Explore page, and Stories are all engineered for maximum engagement. Many people delete the app to reclaim their time, but then they miss DMs because people use Instagram to message them.

IG DM Only solves this. It's a lightweight Progressive Web App (PWA) that takes you straight to your Instagram DM inbox — and nothing else. No feed. No Reels. No Explore. Just your messages.

## How It Works

1. **Visit** [oceanoaden.github.io/only-dm-ig](https://oceanoaden.github.io/only-dm-ig) on your phone
2. **Install** — Add the app to your home screen (the site walks you through it)
3. **Open** — Tap the icon like any other app
4. **DMs** — You're redirected straight to `instagram.com/direct/inbox/`

That's it. The app is essentially a purpose-built bookmark with its own icon and splash screen. When opened, it skips everything and lands you directly in your DM inbox.

## Why a PWA?

- Works on iOS, Android, and desktop with a single codebase
- No app store approval needed
- Installs in seconds from the browser
- No updates to manage — it's just a web page

## Privacy

- No data collected. Ever.
- No accounts or sign-ups
- No tracking or analytics
- No backend or server — fully static
- Open source — inspect the code yourself

## Tech Stack

- Vanilla HTML, CSS, and JS — no frameworks, no dependencies
- PWA manifest + minimal service worker
- Hosted on GitHub Pages (free, zero maintenance)
- Dark mode support via system preference

## Development

Clone the repo and serve locally:

```bash
git clone https://github.com/OceanOaden/only-dm-ig.git
cd only-dm-ig
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Known Limitations

- **Not a DM client.** The PWA redirects to Instagram's web interface. Instagram controls the experience once you're there.
- **Requires login.** Instagram handles auth — you log in through their site. Session persistence depends on your browser's cookie handling.
- **URL could change.** If Instagram changes `/direct/inbox/`, the redirect breaks. A simple one-line fix.

## License

MIT

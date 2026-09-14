# Sthira Living Interiors — website

A single-page, fully static marketing site. **No backend, no database, no server costs.**
Leads arrive on the owner's WhatsApp.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # static output in dist/
```

---

## Going live — 3 things to change

Everything you need is in **`src/config/site.ts`**. Nothing else needs editing.

### 1. The WhatsApp number

Already set to the number you gave:

```ts
whatsapp: "917981592712",   // country code, no +, no spaces
phone: "+91 79815 92712",   // display + tap-to-call
```

### 2. The email backup (recommended, free)

Go to **https://web3forms.com**, paste the owner's email, and they mail an access
key back instantly — no signup. Paste it in:

```ts
web3formsKey: "your-key-here",
```

Leave it as `""` and the site still works; you just lose the email copy of leads
that don't complete the WhatsApp send.

*The key is a public alias for the email address, not a secret — it is meant to
ship in client-side code.*

### 3. Brand, photos and copy

Brand name, city, address, services, projects, testimonials and prices are all
arrays in the same file. Photos are currently Unsplash URLs; swap them for real
project photos by dropping files in `public/` and pointing to `/your-photo.jpg`.

---

## How a lead reaches the owner

A static page **cannot** push a message into someone's WhatsApp — that requires an
API token, and any token shipped to a browser is public. So the site does this:

1. **Primary — `wa.me` deep link.** On submit, the form builds a formatted message
   and opens WhatsApp with everything pre-typed. The visitor taps send. The owner
   receives the enquiry *with the customer's number attached*, so replying is one tap.

2. **Backup — Web3Forms.** The same data is POSTed in the background, so the lead
   lands in the owner's inbox even if the visitor never taps send.

Both live in `src/lib/lead.ts`. Two details there are load-bearing:

- The POST is **not awaited**. Awaiting it moves `window.open` outside the user-gesture
  window and iOS Safari silently blocks the WhatsApp handoff.
- Web3Forms is sent **`application/json`**. Form-urlencoded gets a 301, which the
  browser reports as an opaque CORS failure.

Want the owner notified with *no* action from the visitor? That needs a serverless
function or a Make.com relay plus the Meta Cloud API (~₹0.12/message) — i.e. a backend.

---

## Performance

three.js is **not** in the initial download. It loads only when the 360° section
scrolls into view, and is skipped entirely on low-power phones and for
`prefers-reduced-motion` users, who get a poster image and a "View in 3D" button.

| Initial load | gzip |
|---|---|
| app + React | ~89 kB |
| GSAP | ~47 kB |
| CSS | ~7 kB |
| **total** | **~143 kB** |
| three.js (deferred) | 132 kB |

---

## Loading screen

`src/components/Preloader.tsx` holds a branded curtain over the page until the
webfonts and hero image are ready (hard cap 2.8s, plus a plain-timer failsafe
in case requestAnimationFrame stalls). The hero animation waits on it via
`src/lib/boot.ts`, so the reveal plays to a visible page rather than behind the
overlay.

It also owns the scroll position on load: `history.scrollRestoration` is set to
`manual`, so a reload starts at the top instead of the browser restoring a
half-scrolled position and fighting the router.

**Scrolling always goes through Lenis** (`scrollToSection` in `src/lib/router.ts`).
While Lenis is running it owns the scroll position, and a raw `window.scrollTo`
is silently reverted on its next frame.

---

## URLs

The page is one continuous scroll, but every section has a real path — the
address bar updates as you scroll, and each path is a working deep link:

| Path | Section |
|---|---|
| `/` | Hero |
| `/services` | Services |
| `/work` | Portfolio |
| `/room` | 360° room |
| `/packages` | Packages |
| `/estimate` | Cost estimator |
| `/process` | Process |
| `/faq` | FAQ |
| `/quote` | Enquiry form |

Deep links need the host to serve `index.html` for unknown paths. That is
already configured: `public/_redirects` (Netlify) and `vercel.json` (Vercel).
On any other host, add the same SPA-fallback rule or `/services` will 404.

Routes live in `src/lib/router.ts`; the nav and footer build themselves from
that one list. `nav: false` keeps a route out of the header but still linked in
the footer, so the header stays at six items.

---

## The cost estimator

`src/components/Estimator.tsx` computes a range client-side from the numbers in
`ESTIMATOR` (`src/config/site.ts`) — property base × package multiplier, plus
add-ons scaled by property size, ± the `spread`. Nothing is sent anywhere until
the visitor presses the button, which hands the whole configuration to WhatsApp
through the same `submitLead` path as the main form.

To retune pricing, edit `ESTIMATOR` — no component changes needed.

---

## Deploying

Static output — drop `dist/` anywhere.

- **Netlify / Vercel**: connect the repo, build `npm run build`, publish `dist`.
- **Anywhere else**: upload `dist/`. No Node runtime needed in production.

---

## Stack

Vite · React · TypeScript · Tailwind v4 · GSAP (ScrollTrigger + SplitText, free
since 3.13) · Lenis smooth scroll · three.js (lazy).

Panorama: Poly Haven (CC0). Placeholder photography: Unsplash.

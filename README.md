# LOGRA — Landings

Landings for LOGRA (Juan Diego Gómez Sisco, real estate in Puerto Rico), built by SYNX BUILD.
Next.js 16 (App Router) + React 19 + Tailwind CSS v4 + GSAP/ScrollTrigger + Lenis.

```bash
pnpm install
pnpm dev        # http://localhost:3000 → redirects to /eventonline
pnpm build
```

## Routes

| Route | Purpose |
| --- | --- |
| `/eventonline` | Free live masterclass registration landing |
| `/eventonline/confirmacion` | Post-registration confirmation (noindex) |
| `/api/register` | Server-side registration endpoint |
| `/` | 307 redirect to `/eventonline` |

## Structure (one route per landing)

```
src/app/layout.tsx                  <html>, ALL font variables (Poppins, Playfair Display, Cinzel), Meta Pixel
src/app/globals.css                 Tailwind + raw tokens shared by every landing (no landing styles here)
src/app/eventonline/                layout (metadata, .eo-scope, registration dialog), page, landing CSS, confirmacion/
src/app/api/register/route.ts       re-validates and forwards leads; webhook URL never reaches the browser
src/components/eventonline/
  content.ts                        ALL copy and data for the landing
  registration.ts                   validation shared by client form and API route
  sections/                         one file per section
  ui/                               motion layer, registration dialog, CTA, compare slider, countdown, accordion
```

Landing styles live in `src/app/eventonline/eventonline.css`, inside `@layer components` so Tailwind utilities can override them.

## Motion

`ui/motion.tsx` mounts Lenis (synced to the GSAP ticker) and wires scroll animations through data attributes:
`data-reveal`, `data-reveal-group`, `data-parallax`, `data-drift-x`, `data-count`, `data-scroll-progress`.
Section-specific motion (marquee velocity, pillars timeline, compare slider hint) lives in those components.
Everything respects `prefers-reduced-motion`.

## Environment variables

| Variable | Purpose |
| --- | --- |
| `REGISTRATION_WEBHOOK_URL` | Server-only. Lead destination (CRM / webhook). Missing in production → the API returns an error, never a fake success. Missing in dev → demo success. |
| `NEXT_PUBLIC_META_PIXEL_ID` | Meta Pixel. The current live landing uses `2269346420545934`. Leave empty in demos. |
| `NEXT_PUBLIC_SITE_URL` | Base URL for Open Graph images (defaults to `https://lograbienesraicespr.com`). |

## Registration form

Mirrors the current Typeform (`ndgYv5uR`): full name (required), phone (optional, PR/+1 default), email (optional).
Lead payload sent to the webhook: `{ fullName, phone (E.164), email, source: "logra-eventonline", createdAt }`.

## Pending client validation

- How the 40,000–80,000 USD potential range is calculated. The live site's pillar 05 says "$30,000–$100,000 per property" (inconsistent; removed here).
- Per student case: operation type and whether the monthly income is gross or net.
- "+50 people used the system" vs "160+ LOGRA students": confirm both figures.
- Whether phone/email should become required (Typeform currently only requires the name).
- Real CRM/webhook for leads, and legal page URLs (Privacy, Terms, Cookies).
- A high-resolution hero photo: the current `logra-background-*.webp` files are heavily pre-darkened and low-res (21–38 KB).
- Before/after: only pairs 1, 2, 4 and 5 show the same area, so only those use the drag-to-compare viewer. Pairs 3 and 6 are different rooms and are shown as standalone interior details. Same-angle photos would make the comparison even stronger.

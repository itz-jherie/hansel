# Motion Vault — Client Demo Preview

A curated motion-design feed (3D Motion, 2D Motion, VFX, 3D Renders) built on a
rebuild of the [Hansler](https://hansler.framer.ai) Framer template.

**This is a front-end demo.** All data is mocked and persisted to `localStorage`
so the flows are clickable end-to-end, but there is no backend, no auth and no
database yet.

## Stack

- Next.js 16 (App Router) + React 19
- TypeScript
- Tailwind CSS v4
- Fonts: Instrument Sans (UI) + IBM Plex Mono (meta)

## Getting started

```bash
npm install
npm run dev     # http://localhost:3000, with hot reload
npm run build   # static export -> ./out
```

## Deploying

`next.config.ts` sets `output: "export"`, so `npm run build` emits a fully
static site into `out/`. That folder is the deployable artifact — it needs no
Node server, only static file hosting.

| Host | Setting |
| --- | --- |
| Vercel | Import repo, framework auto-detects Next.js, build `npm run build` |
| Netlify | Build `npm run build`, publish `out` |
| Cloudflare Pages | Build `npm run build`, output `out` |
| GitHub Pages | Build `npm run build`, publish `out` to the branch |
| Any static host / S3 | Upload the `out` folder |

To preview exactly what will be deployed:

```bash
npm run build
npx serve out        # or: python3 -m http.server 8000 --directory out
```

Images use `unoptimized: true` (required for static export, since there's no
optimization server) and load directly from `picsum.photos`.

## Design system

| Path | Purpose |
| --- | --- |
| `lib/tokens.ts` | Colors, type scale, radii, breakpoints, categories, sort modes |
| `app/globals.css` | `@theme` tokens (Tailwind utilities like `bg-paper`, `text-ink`, `border-line`) + reveal/zoom keyframes |
| `components/design-system.tsx` | `Pill`, `FilterPills`, `SortPills`, `YearPill`, `CatPill`, `AvailabilityDot`, `Modal`, `Field`, `PrimaryBtn`, `GhostBtn`, inline SVG icons |
| `lib/cn.ts` | Class-name joiner |

Theme colors are exposed as Tailwind utilities, so new components stay on-token
by default: `bg-paper text-ink text-smoke text-fog bg-cloud border-line
bg-glass text-moss`.

## Demo flows

**Visitor**
- Browse the feed, filter by category, sort by Recent / Popular, search artists
- Open a post popup: big view, username + Instagram link, views/likes,
  Save Post, **View Original Post**
- Mobile: Recent-style full menu (search, nav links, categories)

**Registered user** (mock Google sign-in, one click)
- Save posts; saving while signed out prompts login
- Dashboard: Saved, My Posts (Edit / Delete), Settings (avatar upload with a
  1MB limit, name, email, delete account), Connections (email + Instagram
  username), Logout
- Submit a post: Instagram username (with `instagram.com/` prefix, stored once
  and auto-reused), post link, category

**Admin**
- Pending queue: Approve (goes public), Reject (email notification simulated),
  Open review, Copy link
- Review view: submitted link, copy link, admin-only upload placeholder
- Create posts manually with **username autocomplete** from previously used artists
- Posts are keyed by Instagram username, so when an artist later connects the
  same username their existing posts auto-link to their account

## Notes / not implemented

- No backend, database, Google OAuth or email delivery — all mocked client-side
- Images are `picsum.photos` placeholders keyed by seed
- `eslint` / `eslint-config-next` are intentionally not wired up yet; run
  `npm i -D eslint eslint-config-next` if you want linting

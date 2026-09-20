# Makato

Compare what Tanzanian mobile money operators charge to withdraw cash or send
money — the published tariffs, side by side, in English or Swahili.

The app is a single Next.js screen. Every figure it shows comes from the
`makato` Supabase catalog (`providers`, `tariffs`, `catalog_meta`); nothing is
computed from estimates. Where an operator has not published a tariff for a
route, the app says so instead of guessing.

## Running it

```bash
cd makato
npm install
cp .env.example .env.local   # then fill in the publishable key
npm run dev
```

`.env.local` needs the read-only catalog credentials:

| Variable | Meaning |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Publishable (anon) key — the catalog tables are read-only to it |

## Layout

- `makato/app` — the route; `page.tsx` loads the catalog on the server.
- `makato/components` — the screen, split into cards; `ChargeExplorer.tsx` holds the state.
- `makato/lib` — `catalog.ts` (loading), `charges.ts` (band lookup and pricing), `i18n.ts` (both languages).
- `makato/scripts/normalize-logos.mjs` — normalizes operator logos onto one 3:1 canvas (`npm run logos`).

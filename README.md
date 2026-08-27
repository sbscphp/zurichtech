# Zuritech Website

Turborepo + pnpm monorepo holding the Zuritech marketing site and its Sanity Studio.

```
apps/
  website/   Next.js 15 App Router site (Tailwind v4, shadcn primitives, React Query)
  cms/       Sanity Studio v4 — schemas, desk structure, seed script
```

## Getting started

```bash
pnpm install

cp apps/website/.env.example apps/website/.env.local
cp apps/cms/.env.example apps/cms/.env.local
# fill in the Sanity project id in both files

pnpm dev          # website on :3000, studio on :3333
```

Everything renders with built-in fallback content, so the site runs before Sanity
or the backend API are configured.

## Scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Run website + studio |
| `pnpm build` | Build every app |
| `pnpm check-types` | `tsc --noEmit` across the workspace |
| `pnpm test` | Run unit tests |
| `pnpm --filter website build:static` | Static export to `apps/website/out` |
| `pnpm --filter cms seed` | Populate a fresh dataset with the starter content |

## How content flows

1. **Server render** — each page calls a `lib/sanity/*` fetcher, which maps the raw
   GROQ result onto a typed shape and falls back to hard-coded defaults when a
   field (or the whole dataset) is missing.
2. **Client refetch** — that server result is handed to a `hooks/sanity/*` React
   Query hook as `initialData`, so Studio publishes appear without a rebuild.
3. **Cache busting** — point a Sanity webhook at `POST /api/revalidate` with the
   `x-revalidate-secret` header to purge the `sanity` cache tag immediately.

Forms are the other direction: they post to an external backend through
`lib/api/*` (axios) via `hooks/api/*` mutations. See
[apps/website/README.md](apps/website/README.md) for the endpoint contract.

## Adding a page

1. Add the schema in `apps/cms/schemaTypes/`, export it from `index.ts`, and list
   it in `apps/cms/structure.ts`.
2. Add the GROQ query to `apps/website/lib/sanity/queries.ts` and a typed fetcher
   (with fallbacks) beside it.
3. Add the React Query hook in `apps/website/hooks/sanity/`.
4. Add the route under `apps/website/app/` and pass the server result down as
   `initialData`.

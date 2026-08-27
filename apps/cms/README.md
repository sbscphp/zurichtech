# CMS

Sanity Studio v4 for the Zuritech website.

```bash
cp .env.example .env.local   # add SANITY_STUDIO_PROJECT_ID
pnpm --filter cms dev        # http://localhost:3333
pnpm --filter cms seed       # optional: fill a fresh dataset (needs an Editor token)
pnpm --filter cms deploy     # deploy the studio
```

## Content model

| Type | Kind | Used by |
| --- | --- | --- |
| `siteSettings` | singleton | header, footer, contact details |
| `homePage` | singleton | `/` |
| `aboutPage` | singleton | `/about` |
| `servicesPage` | singleton | `/services` hero + directory copy |
| `service` | collection | `/services` cards, `/services/[slug]` |
| `contactPage` | singleton | `/contact` |

Singletons are pinned to a fixed document id in `structure.ts` so editors get one
document rather than a list. Shared field groups (`label`/`href`,
`title`/`description`) live in `schemaTypes/objects.ts`.

## Adding a type

1. Create `schemaTypes/<name>.ts` with `defineType`.
2. Export it from `schemaTypes/index.ts`.
3. Add it to `structure.ts` — `S.documentTypeListItem` for a collection, a pinned
   `S.document().documentId()` for a singleton.
4. Mirror it on the website (query → fetcher → hook → page).

## Instant website updates

Add a webhook in Sanity Manage pointing at
`https://<site>/api/revalidate`, method `POST`, with header
`x-revalidate-secret: <SANITY_REVALIDATE_SECRET>`.

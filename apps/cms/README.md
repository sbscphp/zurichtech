# CMS

Sanity Studio v4 for the Zuritech website.

```bash
cp .env.example .env.local   # add SANITY_STUDIO_PROJECT_ID
pnpm --filter cms dev        # http://localhost:3333
pnpm --filter cms deploy:production   # deploy Studio UI/schema (does not touch content)
```

### Seeding (content overwrite)

`seed` uses `createOrReplace` — it **replaces documents** in the target dataset. It is **not** part of deploy.

| Command | Dataset | When to use |
| --- | --- | --- |
| `pnpm --filter cms seed:dev` | `development` | Local/staging starter content (recommended) |
| `pnpm --filter cms seed` | from `.env.local` | Blocked if dataset is `production` |
| `pnpm --filter cms seed:production` | from `.env.local` | Intentional production reset only |

**Prevent production accidents**

1. Set `SANITY_STUDIO_DATASET=development` in `apps/cms/.env.local` for day-to-day work.
2. Create a `development` dataset in [Sanity Manage](https://www.sanity.io/manage) if you do not have one.
3. Use `deploy:production` for Studio updates; never run `seed` against production unless you mean to wipe editor changes.
4. Before any production seed, export/backup the dataset from Sanity Manage.

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

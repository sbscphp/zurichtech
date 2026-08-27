# Website

Next.js 15 (App Router) + Tailwind v4 + shadcn primitives.

## Pages

| Route | Source |
| --- | --- |
| `/` | `homePage` singleton |
| `/about` | `aboutPage` singleton |
| `/services` | `servicesPage` singleton + `service` documents |
| `/services/[slug]` | `service` document (statically generated) |
| `/contact` | `contactPage` singleton + `siteSettings` |

## Layout

```
app/        routes, root layout, /api/revalidate webhook
components/ layout/ (header, footer, shell), ui/ (shadcn), shared/, and one folder per page
hooks/      sanity/ (React Query reads), api/ (React Query mutations)
lib/        sanity/ (client, queries, typed fetchers), api/ (axios client + endpoints), query/, utils
```

## Environment

Copy `.env.example` to `.env.local`.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity project. Unset ⇒ every page uses fallback content. |
| `NEXT_PUBLIC_SANITY_DATASET` | Defaults to `production`. |
| `NEXT_PUBLIC_SANITY_API_VERSION` | Defaults to `2024-01-01`. |
| `NEXT_PUBLIC_SANITY_USE_CDN` | Leave `false` so publishes appear immediately. |
| `SANITY_REVALIDATE_SECRET` | Shared secret for the `/api/revalidate` webhook. |
| `NEXT_PUBLIC_API_BASE_URL` | External backend. Unset ⇒ forms error instead of posting. |

## External API contract

`lib/api/` expects the backend at `NEXT_PUBLIC_API_BASE_URL` to expose:

```http
POST /contact/submit
{ "full_name": "...", "email": "...", "company": "...", "message": "..." }
→ 200 { "message": "..." }

POST /newsletter/subscribe
{ "email": "..." }
→ 200 { "message": "..." }
```

Both return a `message` used for the toast; on failure the axios error message is
surfaced through `getApiErrorMessage`. To add an endpoint: extend
`lib/api/types.ts`, add the caller in `lib/api/`, and wrap it in a
`hooks/api/use-*.ts` mutation.

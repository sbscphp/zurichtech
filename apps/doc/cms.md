# Linking & syncing Sanity CMS with a website

How to keep Studio publishes and the public website in sync — on **any host** (Vercel, Netlify, AWS S3/CloudFront, LiteSpeed, etc.).

This guide is based on the Geomatics setup (`apps/cms` + `apps/website`) and applies to other apps the same way.

---

## Mental model

| Piece              | What it is                            | What it does **not** do                 |
| ------------------ | ------------------------------------- | --------------------------------------- |
| **Sanity dataset** | Source of truth for published content | Deploy your website                     |
| **Sanity Studio**  | Editor UI (`*.sanity.studio`)         | Push HTML to Netlify/AWS                |
| **Website**        | Consumer of the dataset               | Automatically know about Studio deploys |

Publishing in Studio updates the **dataset**. The website only shows that change if it **reads the dataset again** (at request time, in the browser, or via a rebuild).

Deploying Studio (`sanity deploy`) only updates the editor UI/schema. It does **not** wipe or rewrite website HTML, and it does **not** replace dataset documents. Seeding (`createOrReplace`) **can** overwrite content — do not run seed against production unless intentional.

---

## Choose a sync strategy by host

### A. Live Next.js host (Vercel / Node `next start`)

Server can fetch Sanity on each request (or with ISR + on-demand revalidation).

**Recommended**

1. Fetch with `cache: "no-store"` (or short revalidate) and cache tags.
2. Add `/api/revalidate` that calls `revalidateTag` / `revalidatePath`.
3. Point a Sanity webhook (on publish) at that route with a shared secret.

Works well when the host runs a Next server. **Does not work** on pure static export (no route handlers).

### B. Static export / static hosting (Netlify, S3, CloudFront, many cPanels)

HTML is generated at **build** time. There is no Next server, so `/api/revalidate` cannot run.

**Recommended (same idea as calling a public API from a form)**

1. **Seed at build** — fetch Sanity during `next build` / `build:static` and pass results as `initialData` so the first paint is never empty.
2. **Refetch in the browser** — use `@sanity/client` + React Query (or similar) so Studio publishes appear after refresh without a rebuild.
3. **Configure Sanity CORS** for every public website origin (required for browser → Sanity).

Optional extras:

- Sanity webhook → Netlify/AWS **build hook** so new **slugs** get HTML files.
- Keep `NEXT_PUBLIC_SANITY_*` in the static build env so the browser client knows which project/dataset to hit.

### C. Hybrid (what this repo uses)

| When                         | Behavior                                         |
| ---------------------------- | ------------------------------------------------ |
| Build / SSR                  | `getProjects()` etc. populate `initialData`      |
| Browser                      | Same getters run again via React Query           |
| Live fetch fails (e.g. CORS) | Keep showing `initialData` — never wipe to empty |
| Live fetch succeeds          | UI updates to the latest published documents     |

Treat CMS reads like contact/newsletter: **runtime calls to a public API**, not “frozen forever in HTML.”

---

## One-time project linking checklist

Do this once per Sanity project + website environment.

### 1. Same project & dataset everywhere

Studio and website must share:

| Variable (Studio)          | Variable (Website)               | Example                                          |
| -------------------------- | -------------------------------- | ------------------------------------------------ |
| `SANITY_STUDIO_PROJECT_ID` | `NEXT_PUBLIC_SANITY_PROJECT_ID`  | `9yn2z7vf`                                       |
| `SANITY_STUDIO_DATASET`    | `NEXT_PUBLIC_SANITY_DATASET`     | `production`                                     |
| —                          | `NEXT_PUBLIC_SANITY_API_VERSION` | `2024-01-01`                                     |
| —                          | `NEXT_PUBLIC_SANITY_USE_CDN`     | `false` for freshest reads; `true` for CDN speed |

Website vars that the **browser** needs must be `NEXT_PUBLIC_*` and present at **build** time for static export (they get inlined into the JS bundle).

### 2. Sanity CORS origins (critical for static hosts)

Browser fetches to `*.api.sanity.io` / `*.apicdn.sanity.io` fail without CORS → site looks “stuck” on old build data or goes empty if you don’t keep `initialData`.

In [Sanity Manage](https://www.sanity.io/manage) → your project → **API** → **CORS origins**, add **exact** origins (scheme + host, no path):

```text
http://localhost:3000
https://your-site.netlify.app
https://yourdomain.com
https://www.yourdomain.com
https://your-app.vercel.app
```

CLI (from the CMS app, logged in / token available):

```bash
pnpm --filter cms exec sanity cors add https://your-site.netlify.app --credentials
pnpm --filter cms exec sanity cors list
```

Add a new origin whenever you get a **new** preview URL or production domain.

### 3. Dataset visibility

For tokenless public reads (typical marketing site):

- Dataset should allow public API reads for published documents.
- Do not put write tokens in the website frontend.

### 4. Confirm data is published

Studio **Draft** ≠ live site. Only **Published** documents are returned by default public queries.

Quick check from the website package:

```bash
node -e "
const { createClient } = require('@sanity/client');
const c = createClient({
  projectId: 'YOUR_PROJECT_ID',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
});
c.fetch('*[_type == \"project\"][0]{title, \"slug\": slug.current, _updatedAt}')
  .then(console.log)
  .catch(console.error);
"
```

If Studio shows an update but this query does not, you are on the wrong project/dataset or the doc is not published.

---

## Implementation pattern (recommended)

### Shared fetch

```ts
// Works in Node (build/SSR) and in the browser
export async function sanityFetch<T>(query: string, params = {}) {
  const client = getSanityClient({ useCdn: false });
  if (!client) return null;

  try {
    if (typeof window !== "undefined") {
      return await client.fetch<T>(query, params);
    }
    // Server / static build: optional Next cache options here
    return await client.fetch<T>(query, params);
  } catch (error) {
    if (typeof window !== "undefined") {
      // Rethrow so React Query keeps initialData instead of clearing the UI
      throw error;
    }
    return null;
  }
}
```

### React Query hook

```ts
useQuery({
  queryKey: ["sanity", "projects"],
  queryFn: getProjects,
  initialData: projectsFromBuild, // from server/build
  initialDataUpdatedAt: 0, // treat as stale → refetch on mount
  staleTime: 30_000,
  refetchOnWindowFocus: true,
});
```

### Page shape

```tsx
// Server / build
export default async function ProjectsPage() {
  const projects = await getProjects();
  return <ProjectsPageContent initialProjects={projects} />;
}

// Client
("use client");
export function ProjectsPageContent({ initialProjects }) {
  const { data = [] } = useProjects(initialProjects);
  return <ProjectsGrid projects={data} />;
}
```

---

## Host-specific notes

### Netlify / AWS static / any CDN of `out/`

1. Build with Sanity env vars set.
2. Deploy `out/` (or your static output).
3. Ensure CORS includes that site’s origin.
4. Hard-refresh after Studio publish to confirm live refetch.
5. **New detail URLs** (`/projects/brand-new-slug`) still need a rebuild (or a catch-all SPA strategy) because static hosts only have HTML files that existed at build time. Editing **existing** pages works via browser refetch.

### Vercel (Next server)

1. Prefer server fetch + webhook revalidation **or** the same browser refetch pattern.
2. Custom domain must point at the **same** Vercel project that has the revalidate route / env.
3. If `example.com` is on LiteSpeed/cPanel and `*.vercel.app` is on Vercel, they are different hosts — fixing one does not update the other.

### Multiple domains

Each public origin needs its own CORS entry. Apex and `www` are different origins.

---

## Tokens (do not mix them up)

| Token          | Use                           | Never use for           |
| -------------- | ----------------------------- | ----------------------- |
| Deploy Studio  | `sanity deploy` / CI          | Seeding content         |
| Editor / write | Seed scripts, migrations      | Frontend website bundle |
| Viewer / none  | Public site reads (published) | Writes                  |

Deploying Studio with a Deploy token is safe for **content**. Running `seed` with `createOrReplace` is not — it overwrites documents.

---

## Debugging “Studio updated but website didn’t”

Work top to bottom:

1. **Is the document published?** (not only draft)
2. **Same project ID + dataset?** Compare Studio Manage URL with website `NEXT_PUBLIC_SANITY_*`.
3. **API returns the new value?** Run the Node snippet above.
4. **Which host are you looking at?** Preview vs production vs custom domain can be different deploys.
5. **Static host?**
   - Old HTML in the page source → build snapshot; browser refetch should replace it if CORS is OK.
   - Open DevTools → Network → look for `api.sanity.io` / `apicdn.sanity.io`.
   - CORS error → add the origin in Sanity Manage.
6. **Live Next host?** Check webhook / `/api/revalidate` logs and secrets.
7. **Empty site after a code change?** Ensure failed browser fetches **throw** (keep `initialData`) instead of returning `null` / `[]` that wipe the UI.

---

## Production go-live checklist

Copy for each new app or environment:

- [ ] Studio and website share `projectId` + `dataset`
- [ ] Website build has `NEXT_PUBLIC_SANITY_PROJECT_ID`, `DATASET`, `API_VERSION`
- [ ] CORS origins include localhost + every deployed website URL
- [ ] Content is **published** in Studio
- [ ] Static host: browser refetch (or build hook) wired; `initialData` seeded at build
- [ ] Server host: revalidate webhook **or** `no-store` fetch verified
- [ ] Custom domain DNS points at the host you expect (not an old static box)
- [ ] Seed scripts are **not** run against production unless intentionally refreshing content
- [ ] Smoke test: change a published title in Studio → hard-refresh website → title updates

---

## Geomatics repo map

| Path                                    | Role                                       |
| --------------------------------------- | ------------------------------------------ |
| `apps/cms`                              | Sanity Studio                              |
| `apps/website/lib/sanity/*`             | Queries, client, mappers, `sanityFetch`    |
| `apps/website/hooks/sanity/*`           | React Query hooks (`useCmsQuery`, etc.)    |
| `apps/website/app/api/revalidate`       | On-demand revalidation (server hosts only) |
| `apps/website/scripts/build-static.mjs` | Static export (`NEXT_BUILD_TARGET=export`) |

Studio production URL (this project): `https://geomatics.sanity.studio`

# Allow MENA Delivery — API documentation

Docusaurus site documenting every HTTP endpoint of the Allow MENA Delivery platform: the public
partner order API, the webhooks, the internal service API, the operations portal API and the driver
app's authentication flow.

The source of truth is the backend at `../DEBS-backend`. Every page here was written against the
implementation — routers, serializers, Pydantic schemas and tests — not against a Postman export.

## Requirements

- **Node 20 or newer.** Docusaurus 3.10 requires it. An `.nvmrc` pins Node 22:

  ```bash
  nvm use
  ```

## Run it

```bash
npm install
npm run start     # dev server with hot reload, http://localhost:3000
npm run build     # production build into build/
npm run serve     # serve the production build locally
```

`npm run build` fails on a broken internal link, a broken anchor, a duplicate route or a broken
Markdown link. That is deliberate — a dead link in API documentation is a bug, so CI should run the
build and treat a failure as one.

### Build-time configuration

| Variable | Default | Effect |
| --- | --- | --- |
| `SITE_URL` | `https://developers.allowmena.com` | Absolute site URL, used for canonical links, sitemap and Open Graph tags. |
| `BASE_URL` | `/` | Sub-path when the site is not served from the domain root. |
| `SHOW_LAST_UPDATE` | unset | Set to `true` once the docs are committed to git, to show a last-updated stamp per page and real `lastmod` values in the sitemap. Needs a git worktree with at least one commit. |

```bash
SITE_URL=https://developers.allowmena.com SHOW_LAST_UPDATE=true npm run build
```

## Layout

```
docs/                     Every documentation page (.mdx)
  getting-started/        Base URL, auth, headers, envelopes, errors
  api/partner/            Public integration API — v1, v2, v3
  api/webhooks/           Callbacks the platform sends to partners
  api/service/            Internal service-to-service order API
  api/operations/         Operations portal API, grouped by module
  api/driver/             Driver app authentication
  concepts/               Pagination, filtering, dates, permissions, enums
  coverage.mdx            Endpoint-by-endpoint audit and known discrepancies
  changelog.mdx
src/
  components/             Endpoint, ParamTable, ErrorTable, Landing
  theme/MDXComponents.tsx Registers those components globally for MDX
  css/custom.css          The whole design system: tokens, type, tables, badges
static/img/               Logo, favicon, Open Graph card
docusaurus.config.ts
sidebars.ts               Hand-written navigation
```

## Writing a new endpoint page

Components are registered globally in `src/theme/MDXComponents.tsx`, so **no imports are needed**.
Copy the nearest existing page and change the content — the structure is deliberately uniform:

```mdx
---
id: create-thing
title: Create Thing
sidebar_label: Create Thing
sidebar_position: 3
description: One sentence. This becomes the page's meta description and its search snippet.
---

# Create Thing

<Endpoint
  method="POST"
  path="/api/v1/web-app/things"
  auth="Bearer token"
  permission="create-thing"
/>

What it does, when to use it, what it returns — two or three sentences.

## Request body

<ParamTable
  params={[
    { name: 'title', type: 'string', required: true, description: 'What it is.', example: '"Widget"' },
    { name: 'status', type: 'string', required: false, default: "'ACTIVE'", values: ['ACTIVE', 'INACTIVE'], description: 'Whether it is usable.' },
  ]}
/>

## Request example

<Tabs groupId="lang">
<TabItem value="curl" label="cURL">…</TabItem>
<TabItem value="python" label="Python">…</TabItem>
<TabItem value="js" label="JavaScript">…</TabItem>
</Tabs>

## Response

## Errors

<ErrorTable
  errors={[
    { status: 403, code: 'FORBIDDEN', when: <>The token lacks <code>create-thing</code>.</> },
  ]}
/>
```

Then add the page id to `sidebars.ts`. A page not in the sidebar still builds, but nobody will find
it.

### House rules

- **`groupId="lang"`** on every `<Tabs>`. It keeps a reader's cURL/Python/JavaScript choice synced
  across pages.
- **Document only what the backend does.** If something cannot be confirmed from the code, say so in
  an admonition and add it to `docs/coverage.mdx` — do not guess.
- **Only list statuses the endpoint can actually return.** The shared envelope lives on
  `getting-started/errors.mdx`; per-endpoint tables are for that endpoint's real failures.
- **Placeholders only.** `YOUR_TOKEN`, `YOUR_API_KEY`, `YOUR_SERVICE_KEY`. Never a real credential.

## Keeping it in step with the backend

The backend exposes a live OpenAPI document at `/api/openapi.json` (and Swagger UI at `/api/docs`)
for the FastAPI service. The fastest way to check this site against the code is to diff the route
table:

```bash
# From the backend checkout, with its virtualenv active:
python -c "import json; from app.main import app; print(json.dumps(app.openapi(), indent=2))" \
  > /tmp/openapi.json
```

Then compare the paths in that document against `docs/coverage.mdx`. Anything new in the route table
and absent from the audit needs a page.

Suggested rhythm:

1. **Every PR that changes a route, schema or permission** updates the matching page here.
2. **Every release** re-checks `docs/coverage.mdx` against the route table above.
3. **CI** runs `npm run build` so a broken cross-reference fails the pipeline.

The partner API lives in the Django service and has no generated schema, so those pages are checked
by reading `backend/v{1,2,3}/views/integration/orders.py` and the serializers beside them.

## Notes on the configuration

- `future.v4.mdx1CompatDisabledByDefault` is deliberately **off**. Turning it on silently breaks
  every `:::note` / `:::caution` block — they render as literal `:::` text with no build error. The
  other v4 flags are on, including the faster Rspack build.
- Search is `@easyops-cn/docusaurus-search-local`: an index built at build time, shipped with the
  site. No Algolia account, no crawler to operate, works offline and on a private host.

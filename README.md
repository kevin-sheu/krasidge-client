# @krasidge/client

React SPA for the KRASIDGE LLC website (`https://krasidge.org`).

## Prerequisites

- Node.js 20+
- Running API (see [`server`](../server)) for full local development

## Setup

```bash
cp .env.example .env
npm install   # also builds vendored ./shared via prepare
npm run dev
```

Dev server: `http://localhost:5173` (Vite proxies `/api` and `/uploads` to `:5000`).

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Vite dev server |
| `npm run build` | Build shared + typecheck + production bundle |
| `npm run preview` | Preview production build |
| `npm run test` | Vitest |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript project references check |

## Shared dependency

`@krasidge/shared` is vendored at [`./shared`](./shared) so Cloudflare Pages and other
client-only deploys resolve types without a sibling package:

```json
"@krasidge/shared": "file:./shared"
```

Keep this copy in sync with the meta-root `../shared` used by the server when schemas change.

## Cloudflare Pages

- **Root directory:** `/` (repository root = this package)
- **Build command:** `npm run build`
- **Output directory:** `dist`
- Set `VITE_API_URL` and `VITE_SITE_URL` as build environment variables

## Docker

```bash
# from Krasidge/ (compose) or from this directory:
docker build -t krasidge-client .
```

## Environment

See [`.env.example`](.env.example):

- `VITE_API_URL` — e.g. `http://localhost:5000/api/v1`
- `VITE_SITE_URL` — e.g. `http://localhost:5173`

## Logo

Official logo: `src/assets/krasidge-logo.png` (also `public/favicon.png`).

## License

Proprietary — © KRASIDGE LLC. All rights reserved.

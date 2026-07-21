# @krasidge/client

React SPA for the KRASIDGE LLC website (`https://krasidge.org`).

## Prerequisites

- Node.js 20+
- Sibling [`shared`](../shared) package (or a published `@krasidge/shared`)
- Running API (see [`server`](../server)) for full local development

## Setup

```bash
# From shared (first time / after schema changes)
cd ../shared && npm install && npm run build && cd ../client

cp .env.example .env
npm install
npm run dev
```

Dev server: `http://localhost:5173` (Vite proxies `/api` and `/uploads` to `:5000`).

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Vite dev server |
| `npm run build` | Typecheck + production build |
| `npm run preview` | Preview production build |
| `npm run test` | Vitest |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript project references check |

## Shared dependency

```json
"@krasidge/shared": "file:../shared"
```

When `shared` is a separate remote, switch to a published version or git URL.

## Docker

Build from the meta root (sibling layout):

```bash
# from Krasidge/
docker compose build client
```

## Environment

See [`.env.example`](.env.example):

- `VITE_API_URL` — e.g. `http://localhost:5000/api/v1`
- `VITE_SITE_URL` — e.g. `http://localhost:5173`

## Logo

Official logo: `src/assets/krasidge-logo.png` (also `public/favicon.png`).

## License

Proprietary — © KRASIDGE LLC. All rights reserved.

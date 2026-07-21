# @krasidge/shared (vendored for client)

Copy of the KRASIDGE shared Zod schemas and API types, committed here so standalone
deploys (e.g. Cloudflare Pages) can resolve `@krasidge/shared` without the sibling
meta-root package.

When you change schemas, update this tree **and** the meta-root `../shared` (used by
the server) so both stay aligned.

```bash
npm install
npm run build
```

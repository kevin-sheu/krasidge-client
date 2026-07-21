# Brand assets

## Official logo

- **File:** `krasidge-logo.png`
- **Usage:** Header, footer, auth pages, admin layout, favicon source
- **Rule:** Do not redesign or alter this artwork unless explicitly requested.

To replace the logo, overwrite `krasidge-logo.png` and copy the same file to `../../public/favicon.png`.

An SVG version may be added later as `krasidge-logo.svg` without changing component structure—update imports in:

- `components/site-header.tsx`
- `components/site-footer.tsx`
- `layouts/admin-layout.tsx`
- `pages/login.tsx`
- `pages/register.tsx`

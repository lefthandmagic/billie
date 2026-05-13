<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Cursor Cloud specific instructions

### Overview
Billie is a fully client-side Next.js 16 superbill generator. All data lives in browser `localStorage` — no backend, database, or external service is required for local development.

### Running the app
- `npm run dev` starts the dev server on port 3000 (uses `--webpack` flag).
- No `.env` file is needed; all env vars (`NEXT_PUBLIC_POSTHOG_KEY`, `NEXT_PUBLIC_FORMSPREE_ID`, etc.) have safe fallbacks.

### Testing & Linting
- `npm test` runs Vitest unit tests (4 test files, 40 tests).
- `npm run lint` runs ESLint 9 with `eslint-config-next`. The codebase currently has pre-existing lint errors (unescaped entities, unused vars, etc.) — these are not regressions.
- `npm run build` performs a full production build including TypeScript checking.

### Gotchas
- The `dev` and `build` scripts use the `--webpack` flag (not Turbopack).
- `@react-pdf/renderer` is used for client-side PDF generation; it renders in the browser, not on the server.
- The Vite CJS deprecation warning during `npm test` is cosmetic and can be ignored.

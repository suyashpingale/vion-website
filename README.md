# VION — Digital Laboratory

Marketing site for VION, a sovereign health intelligence interface. Built with
Vite, React 19, TypeScript, and Tailwind CSS v4. Deployed on Vercel
(vion-global.com).

## Prerequisites

- Node.js 20+

## Run locally

```bash
npm install
npm run dev      # starts the dev server on http://localhost:3000
```

## Other scripts

```bash
npm run build    # production build to dist/
npm run preview  # preview the production build locally
npm run lint     # eslint (zero-warning policy)
```

## Deployment

Production is hosted on Vercel and connected to the `vion-global.com` domain.
Vercel auto-detects the Vite framework preset: it runs `npm install` then
`npm run build` and serves `dist/`. No environment variables are required.

> Note: `node_modules/` and `dist/` are intentionally git-ignored. Never commit
> them — committed dependencies are platform-specific and will break the build
> on other machines (e.g. Linux CI / Vercel).

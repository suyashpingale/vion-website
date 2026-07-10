# VION Website — working notes for Claude

## Project
- Vite + React 19 + TypeScript + Tailwind. Marketing site, deployed on Vercel → vion-global.com.
- `main` is production. Active visual work happens on `visual-updates`.
- Color tokens (`cosmos`, `abyss`, `electro`, `noise`, …) come from the **runtime CDN Tailwind** config in `index.html` (the Vite `tailwind.config.js` has no colors). Custom design-system classes (`.eyebrow`, `.bg-clinical`, `.bg-emphasis`, `.bg-hero`, `.text-link`) live in `index.css`.
- Shared animation presets in `components/motion.ts` (Emil Kowalski easing). Mono font is reserved for links/nav only.

## Standing working agreements
- **After every `git push`, output a copy-paste-ready prompt for Antigravity** (the local agent that pulls our pushes and showcases the site). The prompt should tell Antigravity which branch + commit to pull, to `npm install` and run the site, and what to look at.
- Antigravity owns the local showcase of `visual-updates`. Coordinate to avoid collisions.
- Keep the repo clean: never commit `node_modules/`, `dist/`, `.agents/`, or `skills-lock.json`.

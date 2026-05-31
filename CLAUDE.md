# VION Website — working notes for Claude

## Project

- **Stack:** Vite + React 19 + TypeScript + Tailwind CSS v4 (CDN runtime in `index.html` + Vite build)
- **Deploy:** Vercel → vion-global.com. `main` is production.
- **Active branch:** `visual-updates` (all visual work lives here; merge to `main` to ship)

## Design system

- **Color tokens** — defined in the CDN Tailwind config in `index.html` (NOT `tailwind.config.js`):
  - `cosmos` = #082230 (deep navy, primary dark surface + text)
  - `abyss`  = #090C12 (near-black, nav drawer)
  - `electro` = #46B3EB (cyan accent)
  - `noise`  = #F5F7F7 (off-white, light surface text + bg)
  - `synapse` = #FFC300 (amber, reserved)
- **Custom classes** in `index.css`: `.eyebrow`, `.text-link`, `.bg-clinical`, `.bg-emphasis`, `.bg-hero`, `.rule-soft`
- **Fonts:** Switzer (`font-sans`) for ALL text including headings. IBM Plex Mono (`font-mono` / `.text-link`) for links and nav ONLY — never on body copy, headings, or eyebrows.
- **Type scale** (CDN config): `text-h1` = clamp(2.5rem, 5vw, 5rem), `text-h2` = clamp(2rem, 4vw, 3.75rem), `text-body1`, `text-body2`
- **Shared animation presets:** `components/motion.ts` — `fadeUp`, `transition(delay, duration)`, `easeOutExpo = [0.22, 1, 0.36, 1]`
- **Heading style pattern** used by card/grid sections: `font-sans font-medium tracking-[-0.02em] text-3xl md:text-5xl xl:text-6xl leading-[1.08]` with opacity system (dim words at /25, key words full)

## Section sequence (current — `visual-updates`)

```
1.  Hero
2.  Highlights          — Apple-style product carousel (light cards, dark device screen)
3.  The Problem         — SilentDrift (scroll-driven SVG timeline, 200vh)
4.  The Data            — ImpactMetrics (sticky-stack scroll, 400vh, 4 cards)
5.  The Solution        — Solution (centered statement, 3 risk-class chips)
6.  Fluidic Intelligence — Foresight ("Sweat is data." full-bleed SWEAT-IS-DATA image)
7.  Non-Invasive        — Anatomy ("No needles." full-bleed NO-NEEDLES image)
8.  The Power           — SystemLogic ("You are the battery." full-bleed image)
9.  How It Works        — AnatomyLayers (curtain scroll 3 layers, 300dvh)
10. The Difference      — EpisodicVsContinuous (two-column comparison, light)
11. All Inclusive       — Showcase slide 1 (FOR-EVERYONE image)
12. Adaptability        — Showcase slide 2 (SELECTIVE-SHIELD image)
13. The Form            — Showcase slide 3 (INVISIBLE image)
14. The Interface       — DashboardMock (inline SVG line chart)
    Footer
```

**Sections 6–8** (Foresight / Anatomy / SystemLogic) share `bg-cosmos` backgrounds — they chain as a continuous dark arc. Use `bg-cosmos` token, not the raw hex `#082230`.

## Content constraints (Part 7 of VION_KNOWLEDGE_REPOSITORY)

- Never say VION "diagnoses" — it **stratifies / classifies drift**
- No fitness-tracker comparisons
- Only use numbers sourced from Part 3 (with attribution)
- Banned words: revolutionary, game-changer, unlock, supercharge, empower, magic, cutting-edge, next-generation, disruptive
- NO exclamation marks

## Standing working agreements

- **After every `git push`, output a copy-paste-ready prompt for Antigravity.** Include: branch name, commit hash + message, `npm install` instruction, and specific things to look at / test.
- Antigravity owns the local showcase of `visual-updates`. Coordinate to avoid collisions.
- **Gates before every push:** `npx tsc --noEmit && npm run lint && npm run build`. All three must pass.
- Keep the repo clean: never commit `node_modules/`, `dist/`, `.agents/`, or `skills-lock.json`.

## Completed work (this pass)

| Area | What was done |
|------|--------------|
| Repo hygiene | Added `.gitignore`; untracked 10,928 committed node_modules files; clean `npm install` |
| Design system | `index.css` v2: `.eyebrow`, `.text-link`, `.bg-clinical`, `.bg-emphasis`, `.bg-hero`, `.rule-soft`; `components/motion.ts` presets |
| Hero | Rewrote: `bg-hero` gradient, drifting glow orb, opacity-system headline, CTA anchors to `#highlights` |
| Highlights | Rebuilt as Apple "Get the highlights" carousel: light white cards, dark device-screen readout, segment progress bar + play/pause, drag/arrow-key/tap navigation, 6 VION-sourced slides |
| SilentDrift | Scroll-driven SVG with gradient stroke, Day 40 marker, "VION's territory" label, Tabak et al. 2009 source caption |
| ImpactMetrics | 4 sticky-stack cards with real numbers: 84% (CDC/NIDDK), 100+ (Tabak 2009), 120+ (sweat literature), zero (architecture spec). Sub-labels use `.eyebrow` class |
| Solution | Dark emphasis, centered statement, 3 risk-class chips (Baseline / Elevated Silent Drift / Critical) |
| AnatomyLayers | 3-layer curtain scroll; spec stats per layer (F-beta 0.94; ~972 J/day · 12× headroom · 100,000+ cycles; Janus membrane); headings normalized to `font-medium` |
| BiomarkerGrid | 6-analyte grid with sensor type + clinical mapping; Czarnowski 1992 / Nernstian footnotes. *Currently out of the section flow — component kept in `components/BiomarkerGrid.tsx`* |
| EpisodicVsContinuous | Two-column comparison, staggered step reveals, animated gradient connector |
| Foresight / Anatomy / SystemLogic / Showcase | Restored full-bleed editorial image sections; eyebrows use `.eyebrow` class; `bg-cosmos` token |
| Footer | Replaced gimmicky canvas line-field with restrained editorial footer: brand statement, 3 link columns, oversized faint wordmark, legal bar. Deleted `ui/animated-footer.tsx` |
| UI consistency | All live sections: `bg-[#082230]` → `bg-cosmos`, `bg-[#F5F7F7]` → `bg-noise`; font-mono violations cleared from live components |
| Section reorder | Narrative sequence established (see above) |

## Next — planned / not yet done

- [ ] **New sections** (user noted "we'll work on some more sections after this of the actual product") — to be designed after current sequence is approved
- [ ] **BiomarkerGrid** — decide whether to slot back in or retire. Best position if kept: between How It Works and The Difference
- [ ] **"The Interface" (DashboardMock)** — may need a full redesign to match the editorial quality of the image sections above it
- [ ] **Dead code cleanup** — 7 unused component files not in the narrative: `ProcessFlow.tsx`, `EngineeredReality.tsx`, `FeatureStack.tsx`, `HorizontalFeatures.tsx`, `Validation.tsx`, `ZeroMaintenance.tsx`, `BentoGrid.tsx`. Confirm then delete.
- [ ] **Navigation links** — currently all point to `#`. Wire to actual section anchors once sequence is locked.
- [ ] **Performance** — some image assets are 300–400 kB. Consider next-gen formats (WebP/AVIF) if Lighthouse flags them.

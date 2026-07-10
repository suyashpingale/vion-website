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

## Enrichment pass — in progress (branch: visual-updates)
Goal (from user + VION_KNOWLEDGE_REPOSITORY): enrich each section with REAL sourced
content, "more information not less", section-wise. Reference forensics files were
mostly placeholders; only signal = Function Health uses "GT America" clean sans
(validates our Switzer + mono-for-links-only direction). Lean on repo Part 5
(Pattern Library) + Parts 3–4 (data) + Part 7 (constraints).

CONSTRAINTS (Part 7): never say VION "diagnoses" (it stratifies/classifies drift);
no fitness-tracker comparisons; only use numbers from Part 3 (with sources);
banned words: revolutionary, game-changer, unlock, supercharge, empower, magic,
cutting-edge, next-generation, disruptive; NO exclamation marks.

DONE this pass:
- components/Highlights.tsx (NEW, Pattern A) wired into App after Hero. 6 truths.

NEXT STEPS (not yet done):
1. Hero CTA → anchor-scroll to #highlights (currently a plain button).
2. ImpactMetrics: replace placeholder sub-labels (Late diagnosis/Silent drift/
   Validation/Zero burden) with real ones + tiny source caption (CDC/NIDDK; Tabak
   2009). Numbers: 84%, 100+, 120+, zero.
3. BiomarkerGrid: add sensor type (Potentiometric ISE / Enzymatic amperometric) +
   clinical mapping per analyte; NH₄⁺ source Czarnowski 1992. (Part 4)
4. AnatomyLayers: add a spec stat under each layer — Logic: F-beta 0.94;
   Power: ~972 J/day · 12× headroom · 100,000 cycles; Transport: 59.2 mV/decade.
5. SilentDrift: annotate curve with Day 40 / Day 110 markers + "VION's territory"
   label; source caption (Tabak et al. 2009).
6. Solution: system voice could note 3 risk classes (Baseline / Elevated Silent
   Drift / Critical).
7. Consider Pattern D secondary stat strip (4-hour / 6 analytes / 0 blood draws /
   self-powered) and Pattern E product-viewer carousel (Janus membrane, ISE,
   supercapacitor, BLE SoC).
Verify after each: npx tsc --noEmit && npm run lint && npm run build. Push, then
output an Antigravity prompt (standing agreement).

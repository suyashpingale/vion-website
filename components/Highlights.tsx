import React from 'react';
import { motion } from 'framer-motion';
import { fadeUp, transition, easeOutExpo } from './motion';

/**
 * SECTION 1.5 — Highlights (Pattern A, light)
 *
 * Fulfils the Hero "Get the highlights" CTA. Six equally-weighted product
 * truths, each one icon + title + one line. Grid on desktop, horizontal
 * snap-scroll on mobile. Content sourced from the VION knowledge repository.
 */

interface Highlight {
  title: string;
  note: string;
  icon: React.ReactNode;
}

const s = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.4, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };

const HIGHLIGHTS: Highlight[] = [
  {
    title: 'No needles',
    note: 'Reads sweat at the skin. Nothing breaks the surface.',
    icon: (<svg viewBox="0 0 24 24" {...s}><path d="M3 21 21 3M14 6l4 4M8 12l4 4" /><path d="M21 3l-3 1 2 2 1-3Z" /></svg>),
  },
  {
    title: 'No batteries',
    note: 'Self-powered by catalytic oxidation — ~972 J/day, 12× headroom.',
    icon: (<svg viewBox="0 0 24 24" {...s}><rect x="2" y="8" width="16" height="8" rx="2" /><path d="M20 11v2M11 9l-2 6 4-2-1 4" /></svg>),
  },
  {
    title: 'No clinic visits',
    note: 'At-home wearable operation. Zero appointments.',
    icon: (<svg viewBox="0 0 24 24" {...s}><path d="M3 21V8l9-5 9 5v13" /><path d="M9 21v-6h6v6M12 7v0" /></svg>),
  },
  {
    title: '4-hour sessions',
    note: 'A single-use cartridge runs one longitudinal window.',
    icon: (<svg viewBox="0 0 24 24" {...s}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>),
  },
  {
    title: 'Six analytes',
    note: 'Na⁺ · K⁺ · Cl⁻ · NH₄⁺ · pH · Lactate from one surface.',
    icon: (<svg viewBox="0 0 24 24" {...s}><path d="M12 3l7 4v10l-7 4-7-4V7l7-4Z" /><path d="M12 8v8M8 10v4M16 10v4" /></svg>),
  },
  {
    title: 'ML-powered risk',
    note: 'CatBoost classifier, recall-optimized. F-beta 0.94.',
    icon: (<svg viewBox="0 0 24 24" {...s}><rect x="5" y="5" width="14" height="14" rx="2" /><path d="M9 9h6v6H9zM5 10h-2M5 14H3M21 10h-2M21 14h-2M10 5V3M14 5V3M10 21v-2M14 21v-2" /></svg>),
  },
];

const Highlights: React.FC = () => {
  return (
    <section id="highlights" className="w-full bg-clinical snap-start py-24 md:py-32 px-6 md:px-12 xl:px-24">
      <motion.div {...fadeUp} transition={transition(0)} className="flex items-center gap-2.5 mb-6">
        <span className="h-1.5 w-1.5 rounded-full bg-electro" />
        <span className="eyebrow text-cosmos/45">The Highlights</span>
      </motion.div>

      <motion.h2
        {...fadeUp}
        transition={transition(0.05)}
        className="font-sans font-medium tracking-[-0.02em] text-3xl md:text-5xl xl:text-6xl mb-14 md:mb-20 max-w-3xl leading-[1.08]"
      >
        <span className="text-cosmos/25">A clinical lab, reduced to </span>
        <span className="text-cosmos">six truths.</span>
      </motion.h2>

      {/* Grid on md+, horizontal snap-scroll on mobile */}
      <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 overflow-x-auto md:overflow-visible snap-x snap-mandatory -mx-6 px-6 md:mx-0 md:px-0 pb-2 md:pb-0 [scrollbar-width:none]">
        {HIGHLIGHTS.map((h, i) => (
          <motion.div
            key={h.title}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: easeOutExpo, delay: (i % 3) * 0.06 }}
            className="group shrink-0 w-[78vw] sm:w-[60vw] md:w-auto snap-start rounded-2xl border border-cosmos/10 bg-white/50 p-7 transition-colors duration-300 hover:border-electro/40 hover:bg-white"
          >
            <div className="mb-6 grid h-11 w-11 place-items-center rounded-xl bg-electro/10 text-electro transition-colors group-hover:bg-electro/20">
              <span className="h-5 w-5 block">{h.icon}</span>
            </div>
            <h3 className="font-sans text-lg font-medium text-cosmos mb-2">{h.title}</h3>
            <p className="font-sans text-sm leading-relaxed text-cosmos/55">{h.note}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Highlights;

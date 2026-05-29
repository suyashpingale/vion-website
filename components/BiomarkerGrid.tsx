import React from 'react';
import { motion } from 'framer-motion';
import { fadeUp, transition, easeOutExpo } from './motion';

/**
 * SECTION 6 — What We Measure: Biomarker Grid (dark emphasis, design pass)
 *
 * A 3×2 / 2×3 / 1×6 grid of analyte cards. Symbols glow in electro; cards
 * stagger in and brighten on hover (fine-pointer only). Mono retired.
 */

interface Biomarker {
  symbol: string;
  name: string;
  target: string;
  spec: string;
}

const BIOMARKERS: Biomarker[] = [
  { symbol: 'NH₄⁺', name: 'Ammonium', target: 'Renal function', spec: 'Nernst slope: 55–62 mV/decade' },
  { symbol: 'Na⁺', name: 'Sodium', target: 'Hydration & adrenal', spec: 'Nernst slope: 54–60 mV/decade' },
  { symbol: 'Cl⁻', name: 'Chloride', target: 'Cystic fibrosis screening', spec: 'Nernst slope: 50–58 mV/decade' },
  { symbol: 'H⁺', name: 'pH', target: 'Metabolic acidosis', spec: 'Range: 4.0–7.0' },
  { symbol: 'Lactate', name: 'Lactate', target: 'Anaerobic threshold', spec: 'Enzymatic amperometric' },
  { symbol: 'K⁺', name: 'Potassium', target: 'Cardiac & muscular', spec: 'Nernst slope: 52–59 mV/decade' },
];

const BiomarkerGrid: React.FC = () => {
  return (
    <section className="w-full bg-emphasis snap-start py-24 md:py-32 px-6 md:px-12 xl:px-24">
      <motion.div {...fadeUp} transition={transition(0)} className="flex items-center gap-2.5 mb-6">
        <span className="h-1.5 w-1.5 rounded-full bg-electro" />
        <span className="eyebrow text-electro/80">What We Measure</span>
      </motion.div>

      {/* Heading — opacity system */}
      <motion.h2
        {...fadeUp}
        transition={transition(0.05)}
        className="font-sans font-medium tracking-[-0.02em] text-3xl md:text-5xl xl:text-6xl mb-16 md:mb-20 max-w-3xl leading-[1.08]"
      >
        <span className="text-white/25">Six analytes. One </span>
        <span className="text-white">surface.</span>
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.07] max-w-6xl rounded-2xl overflow-hidden ring-1 ring-white/10">
        {BIOMARKERS.map((b, i) => (
          <motion.div
            key={b.name}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: easeOutExpo, delay: (i % 3) * 0.06 }}
            className="group relative bg-[#080C12] p-8 md:p-10 transition-colors duration-300 hover:bg-white/[0.03]"
          >
            <div className="font-sans font-light text-electro text-4xl md:text-5xl mb-6 tabular-nums tracking-tight drop-shadow-[0_0_18px_rgba(70,179,235,0.35)]">
              {b.symbol}
            </div>
            <div className="text-white/70 text-base">{b.name}</div>
            <div className="text-white/40 text-sm mb-6">{b.target}</div>
            <hr className="border-white/10 group-hover:border-white/20 transition-colors mb-5" />
            <div className="font-sans text-xs tracking-wide text-white/30">{b.spec}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default BiomarkerGrid;

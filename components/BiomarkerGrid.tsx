import React from 'react';

/**
 * SECTION 6 — What We Measure: Biomarker Grid
 *
 * Dark background. A 3×2 (desktop) / 2×3 (tablet) / 1×6 (mobile) grid of
 * transparent cards with a thin border, each describing one analyte.
 * No scroll animation. Subtle border-brighten hover.
 *
 * Structure-first: placeholder Tailwind utilities + brand color tokens only.
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
    <section className="w-full bg-[#090C12] snap-start py-20 md:py-28 px-6 md:px-12 xl:px-20">
      {/* Heading — opacity system */}
      <h2 className="font-sans tracking-tight text-3xl md:text-5xl xl:text-6xl mb-16 md:mb-24 max-w-3xl">
        <span className="text-white/25">Six analytes. One </span>
        <span className="text-white">surface.</span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 max-w-6xl border border-white/10">
        {BIOMARKERS.map((b) => (
          <div
            key={b.name}
            className="group bg-[#090C12] p-8 md:p-10 transition-colors hover:bg-white/[0.02]"
          >
            <div className="font-mono text-electro text-4xl md:text-5xl mb-6 tabular-nums">
              {b.symbol}
            </div>
            <div className="text-white/60 text-sm">{b.name}</div>
            <div className="text-white/40 text-sm mb-5">{b.target}</div>
            <hr className="border-white/10 group-hover:border-white/20 transition-colors mb-5" />
            <div className="font-mono text-[10px] uppercase tracking-[0.1em] text-white/30">
              {b.spec}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BiomarkerGrid;

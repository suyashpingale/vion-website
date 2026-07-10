import React from 'react';
import { motion } from 'framer-motion';

/**
 * SECTION 8 — Dashboard Mock
 *
 * Light background. A centered, stylized dark "app screen" card containing an
 * inline-SVG line chart (4-hour ammonium window) with a confidence band and a
 * dashed baseline, plus three stat boxes. Fades in on viewport entry.
 *
 * The chart is illustrative — static inline SVG, no charting library.
 * Structure-first: placeholder Tailwind utilities + brand color tokens only.
 */

// Chart geometry (viewBox 340 x 160). Plot area x:20→320, y:20→130.
const LINE = [
  [20, 96], [54, 92], [88, 98], [122, 88], [156, 90],
  [190, 80], [224, 84], [258, 72], [292, 68], [320, 60],
];
const BAND_UP = LINE.map(([x, y]) => [x, y - 12]);
const BAND_DOWN = [...LINE].reverse().map(([x, y]) => [x, y + 12]);

const toPoints = (pts: number[][]) => pts.map(([x, y]) => `${x},${y}`).join(' ');

const STATS = [
  { label: 'Mean', value: '4.2 mM' },
  { label: 'Drift', value: '+0.3 mM' },
  { label: 'Risk', value: 'Low' },
];

const DashboardMock: React.FC = () => {
  return (
    <section className="w-full bg-[#F5F7F7] snap-start py-20 md:py-28 px-6 flex flex-col items-center">
      {/* Heading — opacity system */}
      <h2 className="font-sans tracking-tight text-3xl md:text-5xl xl:text-6xl mb-16 md:mb-20 text-center">
        <span className="text-cosmos/25">Your baseline. </span>
        <span className="text-cosmos">Tracked.</span>
      </h2>

      {/* App card */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="w-full max-w-[380px] rounded-2xl bg-[#090C12] p-6"
      >
        {/* Top bar */}
        <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-white/40 mb-5">
          NH₄⁺ — Session 14
        </div>

        {/* Chart */}
        <svg viewBox="0 0 340 160" className="w-full h-auto">
          {/* Y axis + X axis */}
          <line x1="20" y1="20" x2="20" y2="130" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
          <line x1="20" y1="130" x2="320" y2="130" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />

          {/* Confidence band */}
          <polygon
            points={toPoints([...BAND_UP, ...BAND_DOWN])}
            fill="#46B3EB"
            opacity={0.1}
          />

          {/* Baseline (dashed) */}
          <line x1="20" y1="100" x2="320" y2="100" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="4 4" />
          <text x="24" y="96" fill="rgba(255,255,255,0.3)" fontSize="9" fontFamily="'IBM Plex Mono', monospace">Baseline</text>

          {/* Reading line */}
          <polyline points={toPoints(LINE)} fill="none" stroke="#46B3EB" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />

          {/* X ticks */}
          <text x="20" y="150" fill="rgba(255,255,255,0.3)" fontSize="9" fontFamily="'IBM Plex Mono', monospace">0h</text>
          <text x="300" y="150" fill="rgba(255,255,255,0.3)" fontSize="9" fontFamily="'IBM Plex Mono', monospace">4h</text>
        </svg>

        {/* Stat boxes */}
        <div className="grid grid-cols-3 gap-3 mt-6">
          {STATS.map((s) => (
            <div key={s.label} className="rounded-lg border border-white/10 px-3 py-3">
              <div className="font-mono text-[9px] uppercase tracking-[0.1em] text-white/40">{s.label}</div>
              <div className="font-mono text-[11px] text-white/70 mt-1">{s.value}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* System-voice line */}
      <p className="font-mono mt-12 max-w-md text-center text-xs uppercase tracking-[0.1em] text-cosmos/40">
        This is not a diagnosis. It is a signal — a shift from your molecular
        baseline that warrants attention.
      </p>
    </section>
  );
};

export default DashboardMock;

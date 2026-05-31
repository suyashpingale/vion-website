import React from 'react';
import { motion } from 'framer-motion';
import { fadeUp, transition, easeOutExpo } from './motion';

/**
 * SECTION 8 — Dashboard Mock (light, design pass)
 *
 * A centered dark "app screen" with an inline-SVG line chart (4-hour ammonium
 * window): gradient area fill, confidence band, dashed baseline, animated line
 * draw on view, and stat boxes. Card lifts in on viewport entry. Mono retired.
 */

// Chart geometry (viewBox 340 x 160). Plot area x:20→320, y:20→130.
const LINE = [
  [20, 96], [54, 92], [88, 98], [122, 88], [156, 90],
  [190, 80], [224, 84], [258, 72], [292, 68], [320, 60],
];
const BAND_UP = LINE.map(([x, y]) => [x, y - 12]);
const BAND_DOWN = [...LINE].reverse().map(([x, y]) => [x, y + 12]);
const AREA = [...LINE, [320, 130], [20, 130]];

const toPoints = (pts: number[][]) => pts.map(([x, y]) => `${x},${y}`).join(' ');
const toPath = (pts: number[][]) => pts.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x} ${y}`).join(' ');

const STATS = [
  { label: 'Mean', value: '4.2 mM' },
  { label: 'Drift', value: '+0.3 mM' },
  { label: 'Risk', value: 'Low' },
];

const DashboardMock: React.FC = () => {
  return (
    <section className="w-full bg-clinical snap-start py-24 md:py-32 px-6 flex flex-col items-center">
      <motion.div {...fadeUp} transition={transition(0)} className="flex items-center gap-2.5 mb-6">
        <span className="h-1.5 w-1.5 rounded-full bg-electro" />
        <span className="eyebrow text-cosmos/45">The Interface</span>
      </motion.div>

      {/* Heading — opacity system */}
      <motion.h2
        {...fadeUp}
        transition={transition(0.05)}
        className="font-sans font-medium tracking-[-0.02em] text-3xl md:text-5xl xl:text-6xl mb-16 md:mb-20 text-center leading-[1.08]"
      >
        <span className="text-cosmos/25">Your baseline. </span>
        <span className="text-cosmos">Tracked.</span>
      </motion.h2>

      {/* App card */}
      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, ease: easeOutExpo }}
        className="w-full max-w-[380px] rounded-3xl bg-[#080C12] p-6 shadow-[0_30px_80px_-20px_rgba(8,34,48,0.35)] ring-1 ring-cosmos/5"
      >
        <div className="flex items-center justify-between mb-5">
          <span className="font-sans text-xs uppercase tracking-[0.14em] text-white/45">NH₄⁺ · Session 14</span>
          <span className="h-2 w-2 rounded-full bg-electro shadow-[0_0_10px_rgba(70,179,235,0.8)]" />
        </div>

        <svg viewBox="0 0 340 160" className="w-full h-auto">
          <defs>
            <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#46B3EB" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#46B3EB" stopOpacity="0" />
            </linearGradient>
          </defs>

          <line x1="20" y1="20" x2="20" y2="130" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
          <line x1="20" y1="130" x2="320" y2="130" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />

          {/* Confidence band */}
          <polygon points={toPoints([...BAND_UP, ...BAND_DOWN])} fill="#46B3EB" opacity={0.1} />

          {/* Area fill under the line */}
          <polygon points={toPoints(AREA)} fill="url(#areaFill)" />

          {/* Baseline */}
          <line x1="20" y1="100" x2="320" y2="100" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="4 4" />
          <text x="24" y="96" fill="rgba(255,255,255,0.3)" fontSize="9" fontFamily="'Switzer','Inter',sans-serif">Baseline</text>

          {/* Reading line — draws in on view */}
          <motion.path
            d={toPath(LINE)}
            fill="none"
            stroke="#46B3EB"
            strokeWidth="2"
            strokeLinejoin="round"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, ease: easeOutExpo, delay: 0.2 }}
          />
          {/* Latest point */}
          <circle cx="320" cy="60" r="3.5" fill="#7FD0F2" />

          <text x="20" y="150" fill="rgba(255,255,255,0.3)" fontSize="9" fontFamily="'Switzer','Inter',sans-serif">0h</text>
          <text x="305" y="150" fill="rgba(255,255,255,0.3)" fontSize="9" fontFamily="'Switzer','Inter',sans-serif">4h</text>
        </svg>

        <div className="grid grid-cols-3 gap-3 mt-6">
          {STATS.map((s) => (
            <div key={s.label} className="rounded-xl border border-white/10 px-3 py-3">
              <div className="font-sans text-[10px] uppercase tracking-[0.12em] text-white/40">{s.label}</div>
              <div className="font-sans text-sm text-white/80 mt-1">{s.value}</div>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.p
        {...fadeUp}
        transition={transition(0.1)}
        className="font-sans mt-12 max-w-md text-center text-sm leading-relaxed text-cosmos/45"
      >
        This is not a diagnosis. It is a signal — a shift from your molecular baseline
        that warrants attention.
      </motion.p>
    </section>
  );
};

export default DashboardMock;

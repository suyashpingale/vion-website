import React from 'react';
import { motion } from 'framer-motion';
import { fadeUp, transition, easeOutExpo } from './motion';

/**
 * SECTION 3 — Episodic vs Continuous (light, design pass)
 *
 * Two-column comparison. Left (episodic) is muted + dashed connector; right
 * (continuous) is active + solid connector with an electro accent. Steps
 * stagger in on scroll. Labels are Switzer (mono retired).
 */

interface Step {
  label: string;
  note: string;
}

const EPISODIC: Step[] = [
  { label: 'Blood draw', note: 'Lab visit required' },
  { label: '3–5 day wait', note: 'Results delayed' },
  { label: 'Single data point', note: 'One snapshot in time' },
  { label: 'Repeat in 6–12 months', note: 'No continuity' },
];

const CONTINUOUS: Step[] = [
  { label: 'Sweat acquisition', note: 'No needles' },
  { label: 'Real-time processing', note: 'On-device ML' },
  { label: '4-hour longitudinal window', note: 'Drift detection' },
  { label: 'Repeat every session', note: 'Baseline builds over time' },
];

const StepList: React.FC<{ steps: Step[]; active: boolean }> = ({ steps, active }) => (
  <ol className="relative flex flex-col gap-9 md:gap-11 pl-9">
    {/* Connecting line */}
    <span
      aria-hidden
      className={`absolute left-[8px] top-3 bottom-3 ${
        active ? 'w-px bg-gradient-to-b from-electro via-electro/60 to-electro/10' : 'w-0 border-l border-dashed border-cosmos/25'
      }`}
    />
    {steps.map((step, i) => (
      <motion.li
        key={i}
        className="relative"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.5, ease: easeOutExpo, delay: i * 0.06 }}
      >
        {/* Node */}
        <span
          aria-hidden
          className={`absolute -left-9 top-1 h-3.5 w-3.5 rounded-full border-2 ${
            active ? 'bg-electro border-electro shadow-[0_0_0_4px_rgba(70,179,235,0.15)]' : 'bg-[#F5F7F7] border-cosmos/30'
          }`}
        />
        <p className={`text-base md:text-lg ${active ? 'text-cosmos font-medium' : 'text-cosmos/45'}`}>
          {step.label}
        </p>
        <p className={`text-sm mt-1 ${active ? 'text-electro' : 'text-cosmos/35'}`}>
          {step.note}
        </p>
      </motion.li>
    ))}
  </ol>
);

const EpisodicVsContinuous: React.FC = () => {
  return (
    <section className="w-full bg-clinical snap-start py-24 md:py-32 px-6 md:px-12 xl:px-24">
      <motion.div {...fadeUp} transition={transition(0)} className="flex items-center gap-2.5 mb-6">
        <span className="h-1.5 w-1.5 rounded-full bg-electro" />
        <span className="eyebrow text-cosmos/45">The Difference</span>
      </motion.div>

      {/* Heading — opacity system */}
      <motion.h2
        {...fadeUp}
        transition={transition(0.05)}
        className="font-sans font-medium tracking-[-0.02em] text-3xl md:text-5xl xl:text-6xl mb-16 md:mb-24 max-w-4xl leading-[1.08]"
      >
        <span className="text-cosmos/25">Testing was built for </span>
        <span className="text-cosmos">snapshots.</span>
        <span className="text-cosmos/25"> Biology doesn't </span>
        <span className="text-cosmos">pause.</span>
      </motion.h2>

      {/* Two columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-14 max-w-5xl">
        {/* Episodic (muted) */}
        <motion.div {...fadeUp} transition={transition(0.1)}>
          <div className="flex items-center gap-3 mb-10">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-cosmos/40">
              <path d="M9 2h6M10 2v7l-3 8a3 3 0 0 0 3 4h4a3 3 0 0 0 3-4l-3-8V2" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            </svg>
            <h3 className="font-sans text-sm font-medium uppercase tracking-[0.16em] text-cosmos/40">Episodic Testing</h3>
          </div>
          <StepList steps={EPISODIC} active={false} />
        </motion.div>

        {/* Continuous (active) */}
        <motion.div {...fadeUp} transition={transition(0.18)} className="md:rounded-2xl md:p-8 md:-m-8 md:bg-gradient-to-b md:from-electro/[0.06] md:to-transparent">
          <div className="flex items-center gap-3 mb-10">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-electro">
              <path d="M2 12h3l2-6 4 12 3-9 2 3h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <h3 className="font-sans text-sm font-medium uppercase tracking-[0.16em] text-cosmos/70">Continuous Stratification</h3>
          </div>
          <StepList steps={CONTINUOUS} active />
        </motion.div>
      </div>
    </section>
  );
};

export default EpisodicVsContinuous;

import React from 'react';

/**
 * SECTION 3 — Episodic vs Continuous
 *
 * Light background, two-column comparison. No scroll animation (static layout).
 * Each column is a vertical list of steps connected by an SVG line with nodes.
 * Left (episodic) is muted + dashed; right (continuous) is active + solid.
 *
 * Structure-first: placeholder Tailwind utilities + brand color tokens only.
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
  <ol className="relative flex flex-col gap-8 md:gap-10 pl-8">
    {/* Connecting line */}
    <span
      aria-hidden
      className={`absolute left-[7px] top-2 bottom-2 w-px ${
        active ? 'bg-cosmos' : 'border-l border-dashed border-cosmos/30 w-0'
      }`}
    />
    {steps.map((step, i) => (
      <li key={i} className="relative">
        {/* Node */}
        <span
          aria-hidden
          className={`absolute -left-8 top-1 h-3.5 w-3.5 rounded-full border ${
            active ? 'bg-electro border-electro' : 'bg-transparent border-cosmos/40'
          }`}
        />
        <p className={`text-base md:text-lg ${active ? 'text-cosmos/80 font-medium' : 'text-cosmos/40'}`}>
          {step.label}
        </p>
        <p className={`text-xs md:text-sm mt-1 ${active ? 'text-electro' : 'text-cosmos/40'}`}>
          {step.note}
        </p>
      </li>
    ))}
  </ol>
);

const EpisodicVsContinuous: React.FC = () => {
  return (
    <section className="w-full bg-[#F5F7F7] snap-start py-20 md:py-28 px-6 md:px-12 xl:px-20">
      {/* Heading — opacity system */}
      <h2 className="font-sans tracking-tight text-3xl md:text-5xl xl:text-6xl mb-16 md:mb-24 max-w-4xl">
        <span className="text-cosmos/25">Testing was built for </span>
        <span className="text-cosmos">snapshots.</span>
        <span className="text-cosmos/25"> Biology doesn't </span>
        <span className="text-cosmos">pause.</span>
      </h2>

      {/* Two columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-12 max-w-5xl">
        {/* Episodic (muted) */}
        <div>
          <div className="flex items-center gap-3 mb-10">
            {/* Vial icon */}
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-cosmos/40">
              <path d="M9 2h6M10 2v7l-3 8a3 3 0 0 0 3 4h4a3 3 0 0 0 3-4l-3-8V2" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            </svg>
            <h3 className="font-mono text-xs uppercase tracking-[0.15em] text-cosmos/40">Episodic Testing</h3>
          </div>
          <StepList steps={EPISODIC} active={false} />
        </div>

        {/* Continuous (active) */}
        <div>
          <div className="flex items-center gap-3 mb-10">
            {/* Waveform icon */}
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-electro">
              <path d="M2 12h3l2-6 4 12 3-9 2 3h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <h3 className="font-mono text-xs uppercase tracking-[0.15em] text-cosmos/70">Continuous Stratification</h3>
          </div>
          <StepList steps={CONTINUOUS} active />
        </div>
      </div>
    </section>
  );
};

export default EpisodicVsContinuous;

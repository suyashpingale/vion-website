import React from 'react';
import { motion } from 'framer-motion';
import { fadeUp, transition } from './motion';

/**
 * SECTION 4 — Solution Statement (dark emphasis, design pass)
 *
 * "A lab. On your arm." Centered statement with a soft electro glow, body copy
 * and a quiet system-voice paragraph. Mono retired in favour of Switzer.
 */
const Solution: React.FC = () => {
  return (
    <section className="relative bg-emphasis min-h-[100dvh] overflow-hidden flex flex-col justify-center py-24 md:py-32 px-6 md:px-12 xl:px-24 snap-start">

      <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto w-full">
        {/* Eyebrow */}
        <motion.div {...fadeUp} transition={transition(0)} className="flex items-center gap-2.5 mb-8">
          <span className="h-1.5 w-1.5 rounded-full bg-electro" />
          <span className="eyebrow text-electro/80">The Solution</span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          {...fadeUp}
          transition={transition(0.06)}
          className="font-sans font-medium text-5xl md:text-7xl xl:text-8xl text-white mb-10 md:mb-12 tracking-[-0.03em] leading-[0.98]"
        >
          A lab.<br />
          On your <span className="text-electro">arm.</span>
        </motion.h2>

        {/* Body */}
        <motion.p
          {...fadeUp}
          transition={transition(0.14)}
          className="font-sans text-lg md:text-xl text-white/55 max-w-[520px] leading-relaxed"
        >
          We took a clinical diagnostic machine and shrank it. No needles. No wires.
          No batteries. It just works — clinical-grade health prediction from sweat.
          You don't need to manage it. You won't even feel it.
        </motion.p>

        {/* Three risk classes */}
        <motion.div {...fadeUp} transition={transition(0.2)} className="flex flex-wrap items-center justify-center gap-3 mt-12">
          {[
            { label: 'Baseline', tone: 'text-white/60 border-white/15' },
            { label: 'Elevated Silent Drift', tone: 'text-electro border-electro/40' },
            { label: 'Critical', tone: 'text-white border-white/30' },
          ].map((c) => (
            <span key={c.label} className={`rounded-full border px-4 py-1.5 text-sm ${c.tone}`}>
              {c.label}
            </span>
          ))}
        </motion.div>
      </div>

      {/* System-voice paragraph — bottom-left, quiet (sans) */}
      <motion.p
        {...fadeUp}
        transition={transition(0.2)}
        className="relative z-10 font-sans text-sm leading-relaxed text-white/35 text-left max-w-[560px] mt-20 md:mt-28 mx-auto xl:mx-0"
      >
        VION is built on a simple premise: health does not fail suddenly. It shifts
        quietly, long before symptoms appear. Our system observes these shifts
        continuously — without disruption, without alarm — allowing foresight to
        emerge over time.
      </motion.p>
    </section>
  );
};

export default Solution;

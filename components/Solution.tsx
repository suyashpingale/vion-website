import React from 'react';
import { motion } from 'framer-motion';

/**
 * SECTION 4 — Solution Statement (revised from LatencyGap)
 *
 * Dark section: "A lab. On your arm." Body paragraph is right-aligned on
 * desktop / centered on mobile. A system-voice mono paragraph is anchored at
 * the bottom-left. Keeps the existing scroll-fade entrance behavior.
 */
const Solution: React.FC = () => {
  return (
    <section className="bg-[#0B151E] min-h-[100dvh] relative overflow-hidden flex flex-col justify-center py-16 md:py-24 px-gr-1 md:px-gr-2 snap-start">

      <div className="flex flex-col items-center xl:items-end text-center xl:text-right max-w-5xl mx-auto z-10 w-full relative">

        {/* Top Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="border border-white/10 px-3 py-1.5 mb-10 md:mb-14"
        >
          <span className="font-mono text-[10px] md:text-body2 tracking-[0.2em] text-white/50 uppercase font-medium">
            The Solution
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-sans text-h1 text-white mb-8 md:mb-12 tracking-tight"
        >
          A lab.<br />
          On your <span className="text-electro">arm.</span>
        </motion.h2>

        {/* Body paragraph — right-aligned on desktop, centered on mobile */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-sans text-body1 text-white/90 font-medium max-w-[480px] text-center xl:text-right"
        >
          We took a clinical diagnostic machine and shrank it. No needles. No wires.
          No batteries. It just works. Clinical-grade health prediction from sweat —
          you don't need to manage it. You won't even feel it.
        </motion.p>
      </div>

      {/* System-voice paragraph — bottom-left */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="font-mono text-[10px] uppercase tracking-[0.1em] text-white/40 text-left max-w-[560px] mt-20 md:mt-28"
      >
        VION is built on a simple premise: health does not fail suddenly. It shifts
        quietly, long before symptoms appear. Our system is designed to observe these
        shifts continuously — without disruption, without alarm — allowing foresight
        to emerge over time.
      </motion.p>
    </section>
  );
};

export default Solution;

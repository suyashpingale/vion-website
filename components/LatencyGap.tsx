import React from 'react';
import { motion } from 'framer-motion';

const LatencyGap: React.FC = () => {
  return (
    <section className="bg-[#0B151E] min-h-[100dvh] relative overflow-hidden flex flex-col justify-center items-center py-16 md:py-24 px-gr-1 md:px-gr-2 snap-start">

      <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto z-10 w-full relative">

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

        {/* Paragraph with explicit <br/> to exactly match screenshot line-breaks */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-sans text-body1 text-white/90 text-center font-medium"
        >
          We took a clinical diagnostic machine and shrank it. No<br className="hidden md:block" />
          needles. No wires. No batteries. It just works. Clinical-<br className="hidden md:block" />
          grade health prediction from sweat, you don't need to<br className="hidden md:block" />
          manage it. You won't even feel it.
        </motion.p>

      </div>

    </section>
  );
};

export default LatencyGap;
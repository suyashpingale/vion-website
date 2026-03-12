import React from 'react';
import { motion } from 'framer-motion';

const HorizontalFeatures: React.FC = () => {
  return (
    <section className="bg-[#F4F6F6] min-h-[100dvh] w-full flex flex-col items-center justify-center py-16 md:py-24 px-gr-1 md:px-gr-2 relative overflow-hidden snap-start">

      <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto z-10 w-full">

        {/* Top Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="border border-cosmos/10 px-3 py-1.5 mb-8 md:mb-12"
        >
          <span className="font-mono text-[10px] md:text-body2 tracking-[0.2em] text-cosmos/60 uppercase font-medium">
            The Tech
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-sans text-h1 text-cosmos mb-8 md:mb-12 tracking-tight"
        >
          Anatomy<br />
          of Autonomy.
        </motion.h2>

        {/* Paragraph with explicit <br/> to exactly match screenshot line-breaks */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12 md:mb-16"
        >
          <p className="font-sans text-body1 font-medium text-cosmos/90 text-center max-w-2xl mx-auto">
            We took a clinical diagnostic machine and shrank it. No needles. No<br className="hidden md:block" />
            wires. No batteries. It just works. Clinical-grade health prediction<br className="hidden md:block" />
            from sweat, you don't need to manage it. You won't even feel it.
          </p>
        </motion.div>

        {/* Call to Action */}
        <motion.a
          href="#highlights"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="group flex items-center gap-3 cursor-pointer min-h-[44px]"
        >
          <span className="font-mono text-[10px] md:text-body2 tracking-[0.2em] text-cosmos/70 uppercase group-hover:text-cosmos transition-colors duration-300 font-medium">
            Get the highlights
          </span>
          <span className="w-2 h-2 bg-electro transition-transform duration-300 group-hover:scale-110" />
        </motion.a>

      </div>

    </section>
  );
};

export default HorizontalFeatures;
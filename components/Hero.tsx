import React from 'react';
import { motion } from 'framer-motion';
import heroBandImg from './Assets/HERO-SECTION-BAND.jpg';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[80vh] sm:min-h-[100dvh] w-full bg-[#F5F7F7] overflow-hidden flex flex-col md:flex-row">
      {/* Left Column: Device Visual (50vw) */}
      <div className="w-full md:w-1/2 h-[40vh] md:h-auto relative overflow-hidden bg-[#F5F7F7] flex items-center justify-start">
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="w-full h-full relative flex items-center justify-start"
        >
          {/* The Ring Device */}
          <img
            src={heroBandImg}
            alt="VION Bio-Interface"
            className="w-[90%] h-auto md:w-[100%] max-w-none object-contain"
          />
        </motion.div>
      </div>

      {/* Right Column: Typography (50vw) */}
      <div className="w-full md:w-1/2 flex-1 md:h-auto flex flex-col justify-center px-gr-1 md:px-gr-2 lg:px-gr-3 3xl:px-gr-4 py-8 md:py-0 bg-[#F5F7F7] relative z-10">

        <div className="max-w-xl">
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mb-8 md:mb-12 lg:mb-16 inline-block border border-slate-300 px-3 py-1.5"
          >
            <p className="font-mono text-body2 tracking-[0.2em] text-slate-500 uppercase font-medium">
              The Hypothesis
            </p>
          </motion.div>

          {/* Main Headline */}
          <div className="mb-6 md:mb-8 lg:mb-10">
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="font-sans text-h2 text-slate-400 tracking-tight"
            >
              What if health<br />
              could be <span className="text-cosmos font-medium">predicted</span>,<br />
              not just observed?
            </motion.h2>
          </div>

          {/* Sub Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="font-sans text-h2 text-cosmos font-medium mb-10 md:mb-16 tracking-tight"
          >
            VION <span className="text-slate-400 font-normal">does that...</span>
          </motion.h2>

          {/* Call to Action */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="group flex items-center gap-3 font-mono text-body2 uppercase tracking-[0.15em] text-slate-500 hover:text-cosmos transition-colors font-medium min-h-[44px]"
          >
            Get the highlights
            <span className="w-2.5 h-2.5 bg-electro shadow-sm block" />
          </motion.button>
        </div>
      </div>

    </section>
  );
};

export default Hero;
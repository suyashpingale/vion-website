import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import heroBandDesktop from './Assets/images-compressed/HERO-BAND.jpg';
import heroBandTablet from './Assets/images-compressed/HERO-BAND-TABLET.jpg';
import heroBandMobile from './Assets/images-compressed/HERO-BAND-MOBILE.jpg';
import ResponsivePicture from './ResponsivePicture';

/**
 * SECTION 1 — Hero (revised)
 *
 * Desktop: two columns (image left, text right). Image uses object-contain so
 * the band has breathing room. Text column capped at 440px (xl) / 520px (2xl).
 * Mobile: image sits absolutely behind the text; text is top-anchored with a
 * transparent wrapper. Opacity system: bracketed words full, rest at 25%.
 */
const Hero: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Fade out as the user scrolls down.
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative h-[100dvh] min-h-[100dvh] w-full bg-[#F5F7F7] overflow-hidden snap-start"
    >
      <motion.div style={{ opacity }} className="relative w-full h-full xl:flex xl:flex-row">

        {/* Image — absolute behind text on mobile, static left column on desktop */}
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="absolute inset-0 xl:static xl:w-1/2 xl:h-auto flex items-end xl:items-center justify-center xl:justify-start"
        >
          <ResponsivePicture
            desktopSrc={heroBandDesktop}
            tabletSrc={heroBandTablet}
            mobileSrc={heroBandMobile}
            alt="VION Bio-Interface"
            imgClassName="w-full h-full xl:h-auto object-cover xl:object-contain object-bottom xl:object-center pointer-events-none xl:p-8"
          />
        </motion.div>

        {/* Typography */}
        <div className="relative z-10 w-full xl:w-1/2 h-full flex flex-col items-center xl:items-start text-center xl:text-left justify-start xl:justify-center px-gr-1 md:px-gr-2 lg:px-gr-3 3xl:px-gr-4 pt-20 xl:pt-0 bg-transparent xl:bg-[#F5F7F7]">

          <div className="w-full max-w-xl xl:max-w-[440px] 2xl:max-w-[520px] flex flex-col items-center xl:items-start text-center xl:text-left">

            {/* Pill */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="mb-8 md:mb-12 inline-block border border-slate-300 px-3 py-1.5"
            >
              <p className="font-mono text-body2 tracking-[0.2em] text-cosmos/40 uppercase font-medium">
                The Hypothesis
              </p>
            </motion.div>

            {/* Headline — opacity system */}
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="font-sans text-[clamp(1.75rem,3.2vw,3rem)] leading-[1.1] tracking-tight mb-6 md:mb-8"
            >
              <span className="text-cosmos/25">What if health could be </span>
              <span className="text-cosmos font-medium">predicted</span>
              <span className="text-cosmos/25">, not just observed?</span>
            </motion.h2>

            {/* Sub headline — opacity system */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="font-sans text-[clamp(1.5rem,2.6vw,2.5rem)] leading-[1.1] tracking-tight mb-10 md:mb-12"
            >
              <span className="text-cosmos font-medium">VION</span>
              <span className="text-cosmos/25"> does that...</span>
            </motion.p>

            {/* CTA */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="group flex items-center gap-3 font-mono text-body2 uppercase tracking-[0.15em] text-cosmos/40 hover:text-cosmos transition-colors font-medium min-h-[44px]"
            >
              Get the highlights
              <span className="w-2.5 h-2.5 bg-electro shadow-sm block" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;

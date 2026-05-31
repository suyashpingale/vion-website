import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import heroBandDesktop from './Assets/images-compressed/HERO-BAND.jpg';
import heroBandTablet from './Assets/images-compressed/HERO-BAND-TABLET.jpg';
import heroBandMobile from './Assets/images-compressed/HERO-BAND-MOBILE.jpg';
import ResponsivePicture from './ResponsivePicture';

/**
 * SECTION 1 — Hero (design pass)
 *
 * Light-clinical with a subtle premium gradient backdrop (.bg-hero) plus a
 * slowly drifting electro glow. Two columns on desktop (image left, text
 * right); on mobile the image sits behind top-anchored, transparent text.
 * Opacity system: bracketed words full, rest muted. Mono kept only on the CTA.
 */
const Hero: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const yShift = useTransform(scrollYProgress, [0, 0.5], [0, -40]);

  return (
    <section
      ref={containerRef}
      className="relative h-[100dvh] min-h-[100dvh] w-full bg-hero overflow-hidden snap-start"
    >
      {/* Drifting glow orb (premium gradient accent) */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-1/4 right-[-10%] h-[70vh] w-[70vh] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(70,179,235,0.18) 0%, rgba(70,179,235,0) 70%)' }}
        animate={{ y: [0, 30, 0], x: [0, -20, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div style={{ opacity, y: yShift }} className="relative w-full h-full xl:flex xl:flex-row">

        {/* Image — behind text on mobile, left column on desktop */}
        <motion.div
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 xl:static xl:w-1/2 xl:h-auto flex items-end xl:items-center justify-center xl:justify-start"
        >
          <ResponsivePicture
            desktopSrc={heroBandDesktop}
            tabletSrc={heroBandTablet}
            mobileSrc={heroBandMobile}
            alt="VION Bio-Interface"
            imgClassName="w-full h-full xl:h-auto object-cover xl:object-contain object-bottom xl:object-center pointer-events-none xl:p-10"
          />
        </motion.div>

        {/* Typography */}
        <div className="relative z-10 w-full xl:w-1/2 h-full flex flex-col items-center xl:items-start text-center xl:text-left justify-start xl:justify-center px-gr-1 md:px-gr-2 lg:px-gr-3 3xl:px-gr-4 pt-20 xl:pt-0 bg-transparent xl:bg-transparent">

          <div className="w-full max-w-xl xl:max-w-[440px] 2xl:max-w-[520px] flex flex-col items-center xl:items-start text-center xl:text-left">

            {/* Eyebrow (sans, not mono) */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="mb-7 md:mb-10 inline-flex items-center gap-2.5"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-electro" />
              <span className="eyebrow text-cosmos/50">The Hypothesis</span>
            </motion.div>

            {/* Headline — opacity system */}
            <motion.h1
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.55, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="font-sans font-medium text-[clamp(2rem,3.4vw,3.25rem)] leading-[1.08] tracking-[-0.02em] mb-6 md:mb-7"
            >
              <span className="text-cosmos/30">What if health could be </span>
              <span className="text-cosmos">predicted</span>
              <span className="text-cosmos/30">, not just observed?</span>
            </motion.h1>

            {/* Sub headline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.8 }}
              className="font-sans text-[clamp(1.25rem,2vw,1.875rem)] leading-[1.15] tracking-[-0.01em] mb-10 md:mb-12"
            >
              <span className="text-cosmos font-medium">VION</span>
              <span className="text-cosmos/30"> does that.</span>
            </motion.p>

            {/* CTA (mono — link) */}
            <motion.a
              href="#highlights"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.8 }}
              className="group inline-flex items-center gap-3 text-link text-[12px] text-cosmos/60 hover:text-cosmos transition-colors min-h-[44px]"
            >
              Get the highlights
              <span className="grid place-items-center h-6 w-6 rounded-full bg-electro/15 group-hover:bg-electro/30 transition-colors">
                <span className="h-1.5 w-1.5 rounded-full bg-electro" />
              </span>
            </motion.a>
          </div>
        </div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        aria-hidden
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden xl:flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
      >
        <motion.span
          className="h-8 w-px bg-gradient-to-b from-cosmos/40 to-transparent"
          animate={{ scaleY: [0.4, 1, 0.4], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: 'top' }}
        />
      </motion.div>
    </section>
  );
};

export default Hero;

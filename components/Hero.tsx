import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import heroBandDesktop from './Assets/images-compressed/HERO-BAND.jpg';
import heroBandTablet from './Assets/images-compressed/HERO-BAND-TABLET.jpg';
import heroBandMobile from './Assets/images-compressed/HERO-BAND-MOBILE.jpg';
import curtainImg from './Assets/CURTAIN-4.png';
import ResponsivePicture from './ResponsivePicture';
const Hero: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Fade out opacity dynamically as user scrolls down
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={containerRef} className="relative h-[100dvh] min-h-[100dvh] w-full bg-[#F5F7F7] overflow-hidden snap-start">
      <motion.div style={{ opacity }} className="w-full h-[100dvh] min-h-[100dvh] flex flex-col-reverse xl:flex-row">
        {/* Left Column: Device Visual (50vw) */}
        <div className="w-full xl:w-1/2 h-[60vh] xl:h-auto relative overflow-hidden xl:overflow-visible bg-[#F5F7F7] flex items-end xl:items-center justify-center xl:justify-start">
          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="w-full h-full relative flex items-end xl:items-center justify-center xl:justify-start"
          >
            {/* The Ring Device */}
            <div className="w-full h-full xl:h-auto overflow-hidden sm:overflow-visible flex items-end xl:items-center justify-center xl:justify-start">
              <ResponsivePicture
                desktopSrc={heroBandDesktop}
                tabletSrc={heroBandTablet}
                mobileSrc={heroBandMobile}
                alt="VION Bio-Interface"
                imgClassName="w-full max-w-[150%] sm:max-w-none sm:w-[100%] xl:w-full h-full xl:h-auto object-cover sm:object-contain object-bottom xl:object-left pointer-events-none xl:-mb-0"
              />
            </div>
          </motion.div>
        </div>

        {/* Right Column: Typography (50vw) */}
        <div className="w-full xl:w-1/2 flex-1 flex flex-col items-center xl:items-start text-center xl:text-left justify-end xl:justify-center px-gr-1 md:px-gr-2 lg:px-gr-3 3xl:px-gr-4 pt-0 xl:pt-0 pb-0 xl:pb-0 bg-[#F5F7F7] relative z-10">

          <div className="max-w-xl 2xl:max-w-3xl 3xl:max-w-5xl 4xl:max-w-[1200px] flex flex-col items-center xl:items-start text-center xl:text-left">
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
            <div className="mb-6 md:mb-8 lg:mb-10 lg:pr-12 2xl:pr-0">
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="font-sans text-[clamp(1.75rem,5vw,5rem)] 2xl:text-[72px] 2xl:leading-[80px] 3xl:text-[100px] 3xl:leading-[110px] 4xl:text-[130px] 4xl:leading-[140px] font-light tracking-[-0.02em] text-cosmos/60"
              >
                What if health<br className="xl:hidden" />
                could be <span className="font-bold text-cosmos">predicted</span>,<br className="xl:hidden" />
                not just observed?
              </motion.h1>
            </div>

            {/* Sub Headline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="font-sans text-[clamp(1.5rem,4.5vw,3rem)] 2xl:text-[72px] 2xl:leading-[80px] 3xl:text-[100px] 3xl:leading-[110px] 4xl:text-[130px] 4xl:leading-[140px] font-light tracking-[-0.02em] text-cosmos/60 mb-10 md:mb-16"
            >
              <span className="font-bold text-cosmos">VION</span> does that...
            </motion.p>

            {/* Call to Action */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="group flex items-center gap-3 font-mono text-body2 uppercase tracking-[0.15em] text-slate-500 hover:text-cosmos transition-colors font-medium min-h-[44px]"
            >
              GET THE HIGHLIGHTS
              <span className="w-2.5 h-2.5 bg-electro shadow-sm block" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
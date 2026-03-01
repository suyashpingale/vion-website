import React from 'react';
import { motion } from 'framer-motion';
import ResponsivePicture from './ResponsivePicture';

// Import the background images directly to enable Vite's asset handling
// @ts-ignore
import bgImageDesktop from './Assets/images-compressed/NO-NEEDLES.jpg';
// @ts-ignore
import bgImageTablet from './Assets/images-compressed/NO-NEEDLES-TABLET.jpg';
// @ts-ignore
import bgImageMobile from './Assets/images-compressed/NO-NEEDLES-MOBILE.jpg';

const Anatomy: React.FC = () => {
  return (
    <section className="relative min-h-[100dvh] w-full bg-[#082230] overflow-hidden snap-start flex items-start pt-[18vh] lg:pt-[22vh]">

      {/* Background Image */}
      <div className="absolute inset-0 z-0 h-full w-full">
        <ResponsivePicture
          desktopSrc={bgImageDesktop}
          tabletSrc={bgImageTablet}
          mobileSrc={bgImageMobile}
          alt="No needles"
          className="w-full h-full block"
          imgClassName="w-full h-full object-cover object-center transition-opacity duration-1000 ease-in-out"
        />
      </div>

      {/* Main Content Container with max-width for ultra-wide screens */}
      <div className="w-full max-w-[1440px] mx-auto px-gr-1 md:px-gr-2 lg:px-gr-3 3xl:px-gr-4 flex justify-end relative z-10">

        {/* Text Container positioned in the left on tablet, right half on desktop */}
        <div className="w-full md:w-[80%] xl:w-[40%] flex flex-col items-start text-left pl-4 md:pl-8 xl:pl-12 absolute xl:relative left-0 xl:left-auto mt-[-5vh] xl:mt-0">

          {/* Label */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-mono text-[10px] md:text-body2 xl:text-[11px] tracking-[0.2em] text-[#E5E5E5] uppercase mb-4"
          >
            Non-Invasive
          </motion.p>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-sans text-h2 xl:text-[clamp(2.5rem,5vw,4.5rem)] font-medium text-white mb-6 md:mb-8 tracking-tight"
          >
            No needles.
          </motion.h2>

          {/* Paragraph configured with max-width to handle natural text wrapping */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-sans font-normal text-body1 text-[#F5F5F5] w-full max-w-[480px] md:max-w-[560px] xl:max-w-[480px]"
          >
            <span className="md:hidden">
              Advanced electrochemical arrays<br />
              extract deep metabolic data directly<br />
              from the skin surface, eliminating<br />
              needles and blood draws.
            </span>
            <span className="hidden md:inline xl:hidden">
              Advanced electrochemical arrays extract deep<br />
              metabolic data directly from the skin surface,<br />
              eliminating needles and blood draws.
            </span>
            <span className="hidden xl:inline">
              Advanced electrochemical arrays extract deep metabolic data directly from the skin surface, eliminating needles and blood draws.
            </span>
          </motion.p>

        </div>
      </div>

    </section>
  );
};

export default Anatomy;
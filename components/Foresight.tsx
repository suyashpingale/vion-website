import React from 'react';
import { motion } from 'framer-motion';
import ResponsivePicture from './ResponsivePicture';
// @ts-ignore
import sweatIsDataImg from './Assets/images-compressed/SWEAT-IS-DATA.jpg';
// @ts-ignore
import sweatIsDataTabletImg from './Assets/images-compressed/SWEAT-IS-DATA-TABLET.jpg';
// @ts-ignore
import sweatIsDataMobileImg from './Assets/images-compressed/SWEAT-IS-DATA-MOBILE.jpg';

const Foresight: React.FC = () => {
  return (
    <section className="relative min-h-[100dvh] w-full flex items-center bg-[#082230] overflow-hidden snap-start">

      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <ResponsivePicture
          desktopSrc={sweatIsDataImg}
          tabletSrc={sweatIsDataTabletImg}
          mobileSrc={sweatIsDataMobileImg}
          alt="Athlete running outdoors"
          className="w-full h-full block"
          imgClassName="w-full h-full object-cover object-center transition-opacity duration-1000 ease-in-out"
        />
      </div>

      <div className="w-full max-w-[1440px] mx-auto px-gr-1 md:px-gr-2 lg:px-gr-3 3xl:px-gr-4 flex justify-center xl:justify-end relative z-10 xl:pr-0">

        {/* Text Container aligned to the right on desktop, centered on tablet/mobile */}
        <div className="w-full md:w-[80%] xl:w-[42%] flex flex-col items-center xl:items-start text-center xl:text-left mt-[-30vh] md:mt-[-40vh] xl:mt-[-25vh] xl:-mr-[4%]">

          {/* Label */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-mono text-body2 tracking-[0.2em] text-white/70 uppercase mb-6 font-medium"
          >
            Fluidic Intelligence
          </motion.p>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-sans text-h2 text-white mb-6 md:mb-8 tracking-tight"
          >
            Sweat is data.
          </motion.h2>

          {/* Paragraph with explicit <br/> to exactly match screenshot line-breaks */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-sans text-body1 text-white/90 font-medium"
          >
            A passive microfluidic mesh captures<br />
            biomarkers continuously, transforming<br />
            <span className="xl:hidden">
              natural perspiration into a clinical-<br />
              grade diagnostic medium.
            </span>
            <span className="hidden xl:inline">
              natural perspiration into a clinical-grade<br />
              diagnostic medium.
            </span>
          </motion.p>

        </div>
      </div>

    </section>
  );
};

export default Foresight;
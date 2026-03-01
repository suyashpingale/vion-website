import React from 'react';
import { motion } from 'framer-motion';
import ResponsivePicture from './ResponsivePicture';
// @ts-ignore
import youAreBatteryImg from './Assets/images-compressed/YOU-ARE-THE-BATTERY.jpg';
// @ts-ignore
import youAreBatteryTabletImg from './Assets/images-compressed/YOU-ARE-THE-BATTERY-TABLET.jpg';
// @ts-ignore
import youAreBatteryMobileImg from './Assets/images-compressed/YOU-ARE-THE-BATTERY-MOBILE.jpg';

const SystemLogic: React.FC = () => {
  return (
    <div className="relative min-h-[100dvh] w-full flex items-start bg-[#082230] overflow-hidden snap-start">

      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <ResponsivePicture
          desktopSrc={youAreBatteryImg}
          tabletSrc={youAreBatteryTabletImg}
          mobileSrc={youAreBatteryMobileImg}
          alt="Hikers resting on rocks"
          className="w-full h-full block"
          imgClassName="w-full h-full object-cover object-center transition-opacity duration-1000 ease-in-out"
        />
      </div>

      <div className="w-full max-w-[1440px] mx-auto px-gr-1 pt-[10vh] md:px-gr-2 md:pt-[15vh] lg:px-gr-3 lg:pt-[20vh] 3xl:px-gr-4 flex justify-start relative z-10">

        {/* Text Container aligned to the left half */}
        <div className="w-full md:w-1/2 lg:w-[45%] flex flex-col items-start text-left">

          {/* Label */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-mono text-body2 tracking-[0.2em] text-white/70 uppercase mb-6 md:mb-8 font-medium"
          >
            The Power
          </motion.p>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-sans text-h2 text-white mb-6 md:mb-8 tracking-tight"
          >
            You are<br />
            the battery.
          </motion.h2>

          {/* Paragraph with explicit <br/> to exactly match screenshot line-breaks */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-sans text-body1 text-white/90 font-medium"
          >
            <span className="md:hidden">
              The system powers itself through catalytic<br />
              oxidation of the sweat fluid, eliminating the<br />
              need for batteries or charging interruptions.
            </span>
            <span className="hidden md:inline">
              The system powers itself through catalytic<br />
              oxidation of the sweat fluid, eliminating the<br />
              need for batteries or charging interruptions.
            </span>
          </motion.p>

        </div>
      </div>

    </div>
  );
};

export default SystemLogic;
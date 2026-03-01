import React from 'react';
import { motion } from 'framer-motion';

const EngineeredReality: React.FC = () => {
  return (
    <section className="bg-[#0B151E] min-h-[100dvh] w-full flex items-center justify-center p-gr-1 py-[60px] md:py-[80px] 3xl:p-gr-4 snap-start">

      {/* 
        Main Bento Grid Container: 
        Fills the viewport minus padding. 
        Has exact 20px gap. 
      */}
      <div className="w-full max-w-[1440px] h-full min-h-[calc(100dvh-160px)] grid grid-cols-1 lg:grid-cols-2 gap-[20px]">

        {/* Left Bento - The Function */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-[#111C24] w-full p-6 md:p-8 lg:p-12 3xl:p-gr-4 flex flex-col justify-between rounded-sm"
        >
          {/* Top Section */}
          <div>
            <div className="border border-white/10 px-3 py-1.5 mb-8 inline-block">
              <span className="font-mono text-[10px] md:text-body2 tracking-[0.2em] text-white/50 uppercase font-medium">
                The Function
              </span>
            </div>

            <h2 className="font-sans text-h2 text-white tracking-tight">
              Engineered<br />
              for <span className="text-electro">reality.</span>
            </h2>
          </div>

          {/* Bottom Paragraph */}
          <div className="mt-12 lg:mt-0">
            <p className="font-sans text-body1 text-white/90 font-medium">
              We took a clinical diagnostic machine and<br className="hidden lg:block" />
              shrank it. No needles. No wires. No batteries.<br className="hidden lg:block" />
              It just works. Clinical-grade health prediction<br className="hidden lg:block" />
              from sweat, you don't need to manage it.<br className="hidden lg:block" />
              You won't even feel it.
            </p>
          </div>
        </motion.div>

        {/* Right Bento - 4 Grid Items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 grid-rows-2 gap-[20px]">

          {/* 01 Sweat */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-[#111C24] p-6 md:p-8 lg:p-10 3xl:p-gr-4 flex flex-col justify-between rounded-sm min-h-[250px] sm:min-h-[300px]"
          >
            <h3 className="font-sans text-h2 text-white/90 mb-6 md:mb-8">01</h3>
            <p className="font-sans text-body2 text-white/80 font-medium">
              <span className="text-electro">Sweat.</span> A hydrophilized polyester mesh<br className="hidden lg:block" />
              interface captures perspiration at the skin<br className="hidden lg:block" />
              boundary. The structure is engineered with a<br className="hidden lg:block" />
              differential wettability gradient to maximize<br className="hidden lg:block" />
              fluid uptake without requiring active suction.
            </p>
          </motion.div>

          {/* 02 Microfluids */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-[#111C24] p-6 md:p-8 lg:p-10 3xl:p-gr-4 flex flex-col justify-between rounded-sm min-h-[250px] sm:min-h-[300px]"
          >
            <h3 className="font-sans text-h2 text-white/90 mb-6 md:mb-8">02</h3>
            <p className="font-sans text-body2 text-white/80 font-medium">
              <span className="text-electro">Microfluids.</span> Once captured, fluid is routed<br className="hidden lg:block" />
              through micro-channels via passive capillary<br className="hidden lg:block" />
              action. The system eliminates mechanical<br className="hidden lg:block" />
              pumps, ensuring silent, energy-neutral<br className="hidden lg:block" />
              delivery to the analysis zones.
            </p>
          </motion.div>

          {/* 03 Sensors */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-[#111C24] p-6 md:p-8 lg:p-10 3xl:p-gr-4 flex flex-col justify-between rounded-sm min-h-[250px] sm:min-h-[300px]"
          >
            <h3 className="font-sans text-h2 text-white/90 mb-6 md:mb-8">03</h3>
            <p className="font-sans text-body2 text-white/80 font-medium">
              <span className="text-electro">Sensors.</span> The fluid stream engages a redox-<br className="hidden lg:block" />
              active oxidation layer. Here, lactate and<br className="hidden lg:block" />
              glucose molecules are catalytically broken<br className="hidden lg:block" />
              down to generate the autonomous electrical<br className="hidden lg:block" />
              current that powers the device.
            </p>
          </motion.div>

          {/* 04 Prediction */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-[#111C24] p-6 md:p-8 lg:p-10 3xl:p-gr-4 flex flex-col justify-between rounded-sm min-h-[250px] sm:min-h-[300px]"
          >
            <h3 className="font-sans text-h2 text-white/90 mb-6 md:mb-8">04</h3>
            <p className="font-sans text-body2 text-white/80 font-medium">
              <span className="text-electro">Prediction.</span> Raw biochemical noise is
              processed locally. Onboard algorithms filter
              artifacts and translate electrochemical
              signals into structured, clinical-grade data
              before transmission.
            </p>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default EngineeredReality;
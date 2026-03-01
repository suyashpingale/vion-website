import React from 'react';
import { motion } from 'framer-motion';

const Validation: React.FC = () => {
  return (
    <section className="bg-[#0A1117] min-h-[100dvh] w-full flex items-center justify-center p-gr-1 py-[60px] md:py-[80px] 3xl:p-gr-4 snap-start">

      {/* 
        Main Bento Grid Container: 
        Fills the viewport minus padding. 
        Has exact 20px gap. 
      */}
      <div className="w-full max-w-[1440px] h-full min-h-[calc(100dvh-160px)] grid grid-cols-1 lg:grid-cols-2 gap-[20px]">

        {/* Left Bento - Academic Validation */}
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
                ACADEMIC VALIDATION
              </span>
            </div>

            <h2 className="font-sans text-h2 text-white tracking-tight">
              Clinical<br />
              Decision<br />
              Support.
            </h2>
          </div>

          {/* Bottom Paragraph */}
          <div className="mt-12 lg:mt-0">
            <p className="font-sans text-body1 text-white/90 mb-8 font-medium">
              VION bridges the translational gap. We<br className="hidden lg:block" />
              structure raw, longitudinal biological signals<br className="hidden lg:block" />
              into clinical-grade reporting formats, providing<br className="hidden lg:block" />
              evidence for precise intervention.
            </p>

            <a href="#" className="inline-flex items-center uppercase font-mono text-[10px] md:text-body2 tracking-[0.2em] text-white/90 hover:text-white transition-colors group font-medium min-h-[44px]">
              LEARN MORE ABOUT US <span className="w-2 h-2 bg-electro ml-2 inline-block group-hover:scale-110 transition-transform"></span>
            </a>
          </div>
        </motion.div>

        {/* Right Bento - 4 Grid Items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 grid-rows-2 gap-[20px]">

          {/* 1 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-[#111C24] p-6 md:p-8 lg:p-10 3xl:p-gr-4 flex flex-col justify-end rounded-sm min-h-[250px] sm:min-h-[300px]"
          >
            <h3 className="font-sans text-body1 text-electro mb-2 font-medium">IIITDM Jabalpur.</h3>
            <p className="font-sans text-body2 text-white/90 font-medium">
              Primary research facility for<br className="hidden lg:block" />
              microfluidic channel optimization<br className="hidden lg:block" />
              and sensor array durability testing.
            </p>
          </motion.div>

          {/* 2 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-[#111C24] p-6 md:p-8 lg:p-10 3xl:p-gr-4 flex flex-col justify-end rounded-sm min-h-[250px] sm:min-h-[300px]"
          >
            <h3 className="font-sans text-body1 text-electro mb-2 font-medium">ISSS Award Nominee</h3>
            <p className="font-sans text-body2 text-white/90 font-medium">
              Recognized for innovation in self-<br className="hidden lg:block" />
              powered smart systems and non-<br className="hidden lg:block" />
              invasive biomarker extraction.
            </p>
          </motion.div>

          {/* 3 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-[#111C24] p-6 md:p-8 lg:p-10 3xl:p-gr-4 flex flex-col justify-end rounded-sm min-h-[250px] sm:min-h-[300px]"
          >
            <h3 className="font-sans text-body1 text-electro mb-2 font-medium">CatBoost Logic</h3>
            <p className="font-sans text-body2 text-white/90 font-medium">
              Explainable AI architecture ensuring<br className="hidden lg:block" />
              every risk prediction triggers a<br className="hidden lg:block" />
              traceable data lineage.
            </p>
          </motion.div>

          {/* 4 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-[#111C24] p-6 md:p-8 lg:p-10 3xl:p-gr-4 flex flex-col justify-end rounded-sm min-h-[250px] sm:min-h-[300px]"
          >
            <h3 className="font-sans text-body1 text-electro mb-2 font-medium">ISSS Award Nominee</h3>
            <p className="font-sans text-body2 text-white/90 font-medium">
              Recognized for innovation in self-<br className="hidden lg:block" />
              powered smart systems and non-<br className="hidden lg:block" />
              invasive biomarker extraction.
            </p>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default Validation;
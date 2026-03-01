import React from 'react';
import { motion } from 'framer-motion';

const metrics = [
  {
    id: 1,
    value: "74%",
    text: "Clinical diagnoses arriving after measurable biochemical drift has already occurred.",
  },
  {
    id: 2,
    value: "≈ 100",
    text: "Days before symptoms appear, biochemical markers already start drifting from baseline.",
  },
  {
    id: 3,
    value: "120+",
    text: "Diagnostic molecular indicators are carried inside sweat, yet remains unused.",
  },
  {
    id: 4,
    value: "0",
    text: "Mainstream wearables / everyday devices use these indicators",
  }
];

const ImpactMetrics: React.FC = () => {
  return (
    <section className="w-full min-h-[80vh] sm:min-h-[100dvh] bg-[#EFF1F1] flex items-center justify-center snap-start overflow-hidden py-12 sm:py-0">
      <div className="w-full max-w-[1440px] mx-auto px-gr-1 md:px-gr-2 lg:px-gr-3 3xl:px-gr-4">
        {/* 4-Column Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {metrics.map((item, index) => {
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative bg-[#F5F7F7] w-full aspect-auto sm:aspect-square flex flex-col justify-between pt-8 pb-8 px-6 sm:pt-12 sm:pb-10 sm:px-8 lg:pt-16 lg:pb-12 lg:px-10 overflow-hidden cursor-default transition-all duration-300 min-h-[180px] sm:min-h-0"
              >
                {/* The blue line animation on hover (draws from top to bottom) */}
                <div className="absolute top-0 left-0 w-[6px] h-0 bg-[#48D3EB] group-hover:h-full transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]" />

                {/* Metric Value */}
                <div className="z-10 relative">
                  <h2 className="font-sans font-normal text-h2 text-cosmos tracking-tight">
                    {item.value}
                  </h2>
                </div>

                {/* Metric Description */}
                <div className="z-10 relative pr-4 mt-4 sm:mt-0">
                  <p className="font-sans font-medium text-body2 text-cosmos/80">
                    {item.text}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ImpactMetrics;
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const metrics = [
  {
    id: 1,
    value: "84%",
    text: "Clinical diagnoses arriving after measurable biochemical drift has already occurred.",
    bgClass: "bg-[#B5C8D8]",
    textClass: "text-cosmos"
  },
  {
    id: 2,
    value: "100+",
    text: "Days before symptoms appear, biochemical markers already start drifting from baseline.",
    bgClass: "bg-[#9CB8D0]",
    textClass: "text-cosmos"
  },
  {
    id: 3,
    value: "120+",
    text: "Diagnostic molecular indicators are carried inside sweat, yet remains unused.",
    bgClass: "bg-[#7192AB]",
    textClass: "text-cosmos"
  },
  {
    id: 4,
    value: "zero",
    text: "Mainstream wearables / everyday devices use these indicators",
    bgClass: "bg-[#0B151E]",
    textClass: "text-white"
  }
];

// Each of the first 3 cards occupies 1/3 of the viewport as its visible stripe
const SLICE_DVH = 100 / 3; // ≈ 33.33dvh

const ImpactMetrics: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Push text content upward as the next card slides in
  const y1 = useTransform(scrollYProgress, [0.15, 0.33], [0, -180]);
  const y2 = useTransform(scrollYProgress, [0.33, 0.55], [0, -180]);
  const y3 = useTransform(scrollYProgress, [0.55, 0.75], [0, -180]);

  const transforms = [
    { y: y1 },
    { y: y2 },
    { y: y3 },
    { y: null },
  ];

  return (
    /*
      Layout:
        4 sticky cards × 100dvh = 400dvh of snap points
        Zero card is the 4th sticky at top:0 (covers all when scrolled to)
        First 3 cards are sticky at 0, 33, 66dvh (equal thirds)
        Extra 100dvh at end so zero "breathes" after covering all cards
        Total = 500dvh
    */
    <section ref={containerRef} className="w-full relative bg-[#EFF1F1] h-[500dvh]">
      {metrics.map((item, index) => {
        const isLast = index === metrics.length - 1;
        const currentTransform = transforms[index];
        const sliceTopDvh = index * SLICE_DVH;

        return (
          <div
            key={item.id}
            className={`
              sticky h-[100dvh] w-full snap-always snap-start
              ${item.bgClass}
              ${isLast ? 'overflow-hidden z-[50]' : 'overflow-visible'}
            `}
            style={{
              top: isLast ? '0dvh' : `${sliceTopDvh}dvh`,
              zIndex: isLast ? 50 : index,
            }}
          >
            <motion.div
              style={currentTransform.y ? { y: currentTransform.y } : {}}
              className="w-full h-full relative"
            >
              {isLast ? (
                /* ── Zero card: content vertically centered in the full 100dvh card ── */
                <div className="w-full max-w-[1440px] px-gr-1 md:px-gr-2 lg:px-gr-3 3xl:px-gr-4 mx-auto h-full flex items-center justify-between">
                  <div className="ml-[-4vw] md:ml-[-1vw] w-[50%] z-10">
                    <h2
                      className={`font-sans font-medium tracking-tighter leading-none ${item.textClass} opacity-90`}
                      style={{ fontSize: "clamp(120px, 20vw, 250px)" }}
                    >
                      {item.value}
                    </h2>
                  </div>
                  <div className="w-[50%] flex justify-end relative z-10">
                    <div className="w-full md:w-[80%] flex justify-start">
                      <p className={`font-sans font-medium text-body1 ${item.textClass} max-w-[320px] lg:max-w-[400px]`}>
                        {item.text}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                /* ── Cards 1–3: content bottom-anchored to the visible stripe ──
                   paddingBottom pushes content up so it sits just above the
                   next card's dividing line. */
                <div
                  className="w-full max-w-[1440px] px-gr-1 md:px-gr-2 lg:px-gr-3 3xl:px-gr-4 mx-auto h-full flex justify-between items-end"
                  style={{ paddingBottom: `${(SLICE_DVH * (metrics.length - 2 - index)) + 5}dvh` }}
                >
                  {/* Giant number — bleeds left and below into next card */}
                  <div className="ml-[-4vw] md:ml-[-1vw] w-[50%] z-10">
                    <h2
                      className={`font-sans font-medium tracking-tighter leading-none ${item.textClass} opacity-90`}
                      style={{ fontSize: "clamp(120px, 20vw, 250px)" }}
                    >
                      {item.value}
                    </h2>
                  </div>

                  {/* Body text — right half */}
                  <div className="w-[50%] flex justify-end relative z-10">
                    <div className="w-full md:w-[80%] flex justify-start">
                      <p className={`font-sans font-medium text-body1 ${item.textClass} max-w-[320px] lg:max-w-[400px]`}>
                        {item.text}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        );
      })}
    </section>
  );
};

export default ImpactMetrics;
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import explodedBandImg from './Assets/VION-BAND-EXPLODED-NEW.jpg';
import curtainImg from './Assets/CURTAIN-1.png';
import curtain2Img from './Assets/CURTAIN-2.png';
import curtain3Img from './CURTAIN-3.png';

const AnatomyLayers: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // The container is 300dvh.
  // Stage 1 (Layer 1): 0.0 to 0.33
  // Stage 2 (Layer 2): 0.33 to 0.66
  // Stage 3 (Layer 3): 0.66 to 1.0
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Text 1 Opacity (Fades out slowly between 0.1 and 0.25)
  const text1Opacity = useTransform(scrollYProgress, [0, 0.1, 0.25, 1], [1, 1, 0, 0]);

  // Text 2 Opacity (Fades in slowly 0.25 -> 0.40, stays until 0.60, fades out 0.60 -> 0.75)
  const text2Opacity = useTransform(scrollYProgress, [0, 0.25, 0.4, 0.6, 0.75, 1], [0, 0, 1, 1, 0, 0]);

  // Text 3 Opacity (Fades in slowly 0.75 -> 0.90, stays until end)
  const text3Opacity = useTransform(scrollYProgress, [0, 0.75, 0.9, 1], [0, 0, 1, 1]);

  // Curtain Opacities (Wide simultaneous crossfades spanning the entire text transition periods)
  // Transition 1: 0.1 -> 0.4
  // Transition 2: 0.6 -> 0.9
  const curtain1Opacity = useTransform(scrollYProgress, [0, 0.1, 0.4, 1], [1, 1, 0, 0]);
  const curtain2Opacity = useTransform(scrollYProgress, [0, 0.1, 0.4, 0.6, 0.9, 1], [0, 0, 1, 1, 0, 0]);
  const curtain3Opacity = useTransform(scrollYProgress, [0, 0.6, 0.9, 1], [0, 0, 1, 1]);

  // Shared text block classes for the three layers
  const textBlockClasses = "absolute top-[50%] right-gr-1 md:right-auto md:left-[55%] w-[calc(100%-32px)] md:w-auto md:max-w-[400px] pointer-events-auto flex flex-col items-start text-left -translate-y-1/2";

  return (
    <section ref={containerRef} className="bg-[#F5F7F7] w-full relative h-[300dvh]">

      {/* Sticky Viewport */}
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden">

        {/* Static Image Box: responsive width, full height, mix-blend-multiply */}
        <div className="absolute top-0 left-0 w-full md:w-1/2 h-[50dvh] md:h-[100dvh] z-0 mix-blend-multiply">
          <img
            src={explodedBandImg}
            alt="Vion Anatomy Overview"
            className="w-full h-full object-contain object-center absolute inset-0 z-0"
          />

          {/* Curtain Overlay for Layer One */}
          <motion.img
            src={curtainImg}
            alt="Gradient Curtain Overlay 1"
            className="absolute bottom-0 left-0 w-full h-[50dvh] md:h-[100dvh] object-cover object-bottom z-10 pointer-events-none"
            style={{ opacity: curtain1Opacity }}
          />

          {/* Curtain Overlay for Layer Two */}
          <motion.img
            src={curtain2Img}
            alt="Gradient Curtain Overlay 2"
            className="absolute bottom-0 left-0 w-full h-[50dvh] md:h-[100dvh] object-cover object-bottom z-10 pointer-events-none"
            style={{ opacity: curtain2Opacity }}
          />

          {/* Curtain Overlay for Layer Three */}
          <motion.img
            src={curtain3Img}
            alt="Gradient Curtain Overlay 3"
            className="absolute bottom-0 left-0 w-full h-[50dvh] md:h-[100dvh] object-cover object-bottom z-10 pointer-events-none"
            style={{ opacity: curtain3Opacity }}
          />

        </div>

        {/* Global Text Container */}
        <div className="absolute inset-0 w-full h-[100dvh] pointer-events-none z-10">

          {/* Text 1: The Logic */}
          <motion.div
            className={textBlockClasses}
            style={{ opacity: text1Opacity }}
          >
            <p className="font-mono text-[10px] md:text-body2 tracking-[0.2em] text-cosmos/50 uppercase mb-5 font-medium">
              Layer One
            </p>
            <h2 className="font-sans text-[clamp(1.75rem,3.5vw,3.75rem)] text-cosmos tracking-tight mb-5">
              The Logic.
            </h2>
            <p className="font-sans font-medium text-body1 text-cosmos/80">
              The Logic CatBoost Integration. Recall-<br className="hidden xl:block" />
              optimized machine learning model (F-beta<br className="hidden xl:block" />
              0.94). Tuned specifically for renal health<br className="hidden xl:block" />
              markers and CKD prediction.
            </p>
          </motion.div>

          {/* Text 2: The Power */}
          <motion.div
            className={textBlockClasses}
            style={{ opacity: text2Opacity }}
          >
            <p className="font-mono text-[10px] md:text-body2 tracking-[0.2em] text-cosmos/50 uppercase mb-5 font-medium">
              Layer Two
            </p>
            <h2 className="font-sans text-[clamp(1.75rem,3.5vw,3.75rem)] text-cosmos tracking-tight mb-5">
              The Power.
            </h2>
            <p className="font-sans font-medium text-body1 text-cosmos/80">
              Don't Charge. Catalytic Oxidation Layer.<br className="hidden xl:block" />
              Converts sweat lactate into electrical<br className="hidden xl:block" />
              energy, stored via a Supercapacitor<br className="hidden xl:block" />
              Array. Status: Self-Sustained.
            </p>
          </motion.div>

          {/* Text 3: The Transport */}
          <motion.div
            className={textBlockClasses}
            style={{ opacity: text3Opacity }}
          >
            <p className="font-mono text-[10px] md:text-body2 tracking-[0.2em] text-cosmos/50 uppercase mb-5 font-medium">
              Layer Three
            </p>
            <h2 className="font-sans text-[clamp(1.75rem,3.5vw,3.75rem)] text-cosmos tracking-tight mb-5">
              The Transport.
            </h2>
            <p className="font-sans font-medium text-body1 text-cosmos/80">
              The Transport Directed Microfluidics.<br className="hidden xl:block" />
              Hydrophilic polyester mesh with PDMS<br className="hidden xl:block" />
              hydrophobic barriers. Sweat is channeled,<br className="hidden xl:block" />
              not absorbed. Result: Zero lateral diffusion.
            </p>
          </motion.div>
        </div>

      </div>

      {/* Snap Spacers */}
      <div className="absolute top-0 w-full h-[300dvh] pointer-events-none flex flex-col pt-[1px]">
        <div className="h-[100dvh] w-full snap-start snap-always" />
        <div className="h-[100dvh] w-full snap-start snap-always" />
        <div className="h-[100dvh] w-full snap-start snap-always" />
      </div>

    </section>
  );
};

export default AnatomyLayers;

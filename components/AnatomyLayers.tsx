import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import explodedBandImg from './Assets/VION-BAND-EXPLODED-NEW.jpg';
import explodedBandImgMobile from './Assets/EXPLODED-VIEW-MOBILE.jpg';
import explodedBandImgTablet from './Assets/EXPLODED-VIEW-TABLET.jpg';
import curtainImg from './Assets/CURTAIN-1.png';
import curtainImgMobile from './Assets/CURTAIN-1-MOBILE.png';
import curtainImgTablet from './Assets/CURTAIN-1-TABLET.png';
import curtain2Img from './Assets/CURTAIN-2.png';
import curtain2ImgMobile from './Assets/CURTAIN-2-MOBILE.png';
import curtain2ImgTablet from './Assets/CURTAIN-2-TABLEY.png';
import curtain3Img from './CURTAIN-3.png';
import curtain3ImgMobile from './Assets/CURTAIN-3-MOBILE.png';
import curtain3ImgTablet from './Assets/CURTAIN-3-TABLET.png';

interface AnatomyLayersProps {
  scrollerRef?: React.RefObject<HTMLDivElement | null>;
}

const AnatomyLayers: React.FC<AnatomyLayersProps> = ({ scrollerRef }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1280);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // The container is 300dvh.
  // Stage 1 (Layer 1): 0.0 to 0.33
  // Stage 2 (Layer 2): 0.33 to 0.66
  // Stage 3 (Layer 3): 0.66 to 1.0
  const { scrollYProgress } = useScroll({
    target: containerRef,
    container: scrollerRef || undefined,
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
  const textBlockClasses = `absolute pointer-events-auto flex flex-col ${
    isMobile
      ? "top-[70dvh] left-0 right-0 text-center items-center px-6"
      : isTablet
      ? "top-[67dvh] left-[calc(50%-240px)] w-[480px] text-center items-center px-8"
      : "md:items-start md:text-left w-auto max-w-[400px] top-[50%] -translate-y-1/2 left-[55vw]"
  }`;

  return (
    <section ref={containerRef} className="snap-start bg-noise w-full relative h-[300dvh] z-10 overscroll-none">

      {/* Sticky Viewport */}
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden">

        {/* Static Image Box: responsive width, height, mix-blend-multiply */}
        <div className={`absolute z-0 mix-blend-multiply ${
          isMobile
            ? "top-0 left-0 w-full h-[80dvh]"
            : isTablet
            ? "top-0 left-[calc(50%-280px)] w-[560px] h-[60dvh]"
            : "top-0 left-0 w-1/2 h-[100dvh]"
        }`}>
          <img
            src={isMobile ? explodedBandImgMobile : isTablet ? explodedBandImgTablet : explodedBandImg}
            alt="Vion Anatomy Overview"
            className={`w-full h-full absolute inset-0 z-0 ${
              isMobile
                ? "object-cover object-top"
                : isTablet
                ? "object-contain object-center"
                : "object-contain object-center"
            }`}
          />

          {/* Curtain Overlay for Layer One */}
          <motion.img
            src={isMobile ? curtainImgMobile : isTablet ? curtainImgTablet : curtainImg}
            alt="Gradient Curtain Overlay 1"
            className="absolute bottom-0 left-0 w-full h-full object-cover object-bottom z-10 pointer-events-none"
            style={{ opacity: curtain1Opacity }}
          />

          {/* Curtain Overlay for Layer Two */}
          <motion.img
            src={isMobile ? curtain2ImgMobile : isTablet ? curtain2ImgTablet : curtain2Img}
            alt="Gradient Curtain Overlay 2"
            className="absolute bottom-0 left-0 w-full h-full object-cover object-bottom z-10 pointer-events-none"
            style={{ opacity: curtain2Opacity }}
          />

          {/* Curtain Overlay for Layer Three */}
          <motion.img
            src={isMobile ? curtain3ImgMobile : isTablet ? curtain3ImgTablet : curtain3Img}
            alt="Gradient Curtain Overlay 3"
            className="absolute bottom-0 left-0 w-full h-full object-cover object-bottom z-10 pointer-events-none"
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
            <p className="eyebrow text-cosmos/45 mb-5">
              Layer One
            </p>
            <h2 className="font-sans font-medium text-[clamp(1.75rem,3.5vw,3.75rem)] text-cosmos tracking-[-0.02em] mb-5">
              The Logic.
            </h2>
            <p className="font-sans text-body1 text-cosmos/55 leading-[1.5]">
              CatBoost Integration. Recall-optimized machine learning model (F-beta 0.94).
              Calibrated for risk stratification and early detection of physiological drift
              across biomarkers.
            </p>
            <p className="font-sans text-sm text-electro/80 mt-4 tracking-wide">F-beta 0.94 · 3 risk classes</p>
          </motion.div>

          {/* Text 2: The Power */}
          <motion.div
            className={textBlockClasses}
            style={{ opacity: text2Opacity }}
          >
            <p className="eyebrow text-cosmos/45 mb-5">
              Layer Two
            </p>
            <h2 className="font-sans font-medium text-[clamp(1.75rem,3.5vw,3.75rem)] text-cosmos tracking-[-0.02em] mb-5">
              The Power.
            </h2>
            <p className="font-sans text-body1 text-cosmos/55 leading-[1.5]">
              Catalytic Oxidation Layer. Converts sweat lactate into electrical energy,
              stored via a Supercapacitor Array. No charging. Self-sustained.
            </p>
            <p className="font-sans text-sm text-electro/80 mt-4 tracking-wide">~972 J/day · 12× headroom · 100,000+ cycles</p>
          </motion.div>

          {/* Text 3: The Transport */}
          <motion.div
            className={textBlockClasses}
            style={{ opacity: text3Opacity }}
          >
            <p className="eyebrow text-cosmos/45 mb-5">
              Layer Three
            </p>
            <h2 className="font-sans font-medium text-[clamp(1.75rem,3.5vw,3.75rem)] text-cosmos tracking-[-0.02em] mb-5">
              The Transport.
            </h2>
            <p className="font-sans text-body1 text-cosmos/55 leading-[1.5]">
              Directed Microfluidics. Hydrophilic polyester mesh with PDMS hydrophobic
              barriers. Sweat is channeled, not absorbed. Result: Zero lateral diffusion.
            </p>
            <p className="font-sans text-sm text-electro/80 mt-4 tracking-wide">Janus membrane · pilocarpine iontophoresis</p>
          </motion.div>
        </div>

      </div>



    </section>
  );
};

export default AnatomyLayers;

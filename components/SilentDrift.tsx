import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { fadeUp, transition } from './motion';

interface SilentDriftProps {
  scrollerRef?: React.RefObject<HTMLDivElement | null>;
}

/**
 * SECTION 2 — The Problem: Silent Drift Timeline (dark emphasis)
 *
 * 200vh: a 100vh sticky viewport + 100vh scroll travel. The biomarker-drift
 * curve draws left-to-right on scroll (gradient stroke + soft glow). The
 * "Silent Window" tint, "Symptoms appear" line, and system-voice copy reveal
 * toward the end. Labels are Switzer (mono retired).
 */
const SilentDrift: React.FC<SilentDriftProps> = ({ scrollerRef }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    container: scrollerRef || undefined,
    offset: ['start start', 'end end'],
  });

  const dashOffset = useTransform(scrollYProgress, [0.05, 0.8], [1, 0]);
  const symptomsOpacity = useTransform(scrollYProgress, [0.6, 0.9], [0, 1]);
  const tintOpacity = useTransform(scrollYProgress, [0.1, 0.5], [0, 0.12]);
  const dotOpacity = useTransform(scrollYProgress, [0.78, 0.9], [0, 1]);

  const SYMPTOMS_X = 820;
  const CURVE = 'M40 320 C 260 312, 440 296, 600 250 S 820 120, 960 40';
  const LABEL_FONT = "'Switzer', 'Inter', sans-serif";

  return (
    <section ref={containerRef} className="relative h-[200vh] w-full bg-emphasis snap-start">
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden flex flex-col justify-center px-6 md:px-12 xl:px-24">

        {/* Eyebrow */}
        <motion.div {...fadeUp} transition={transition(0)} className="flex items-center gap-2.5 mb-6">
          <span className="h-1.5 w-1.5 rounded-full bg-electro" />
          <span className="eyebrow text-electro/80">The Problem</span>
        </motion.div>

        {/* Heading — opacity system */}
        <motion.h2
          {...fadeUp}
          transition={transition(0.05)}
          className="font-sans font-medium tracking-[-0.02em] text-4xl md:text-6xl xl:text-7xl mb-12 md:mb-16 max-w-3xl"
        >
          <span className="text-white/25">Health fails </span>
          <span className="text-white">quietly.</span>
        </motion.h2>

        {/* Timeline */}
        <div className="w-full max-w-5xl">
          <svg viewBox="0 0 1000 360" className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
            <defs>
              <linearGradient id="driftStroke" x1="0" y1="1" x2="1" y2="0">
                <stop offset="0%" stopColor="#46B3EB" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#7FD0F2" stopOpacity="1" />
              </linearGradient>
              <filter id="driftGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Silent-window tint */}
            <motion.rect x="40" y="20" width={SYMPTOMS_X - 40} height="300" fill="#46B3EB" style={{ opacity: tintOpacity }} />

            {/* Gridlines */}
            {[80, 140, 200, 260].map((y) => (
              <line key={y} x1="40" y1={y} x2="960" y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
            ))}

            {/* Axes */}
            <line x1="40" y1="320" x2="960" y2="320" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
            <line x1="40" y1="20" x2="40" y2="320" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />

            {/* Drift curve — draws on scroll */}
            <motion.path
              d={CURVE}
              fill="none"
              stroke="url(#driftStroke)"
              strokeWidth="3"
              strokeLinecap="round"
              filter="url(#driftGlow)"
              pathLength={1}
              strokeDasharray={1}
              style={{ strokeDashoffset: dashOffset }}
            />

            {/* End data dot */}
            <motion.circle cx="960" cy="40" r="6" fill="#7FD0F2" style={{ opacity: dotOpacity }} filter="url(#driftGlow)" />

            {/* Symptoms dashed line + label */}
            <motion.g style={{ opacity: symptomsOpacity }}>
              <line x1={SYMPTOMS_X} y1="20" x2={SYMPTOMS_X} y2="320" stroke="rgba(255,255,255,0.45)" strokeWidth="1" strokeDasharray="4 5" />
              <text x={SYMPTOMS_X + 10} y="36" fill="rgba(255,255,255,0.7)" fontSize="13" fontFamily={LABEL_FONT}>Symptoms appear</text>
            </motion.g>

            {/* Region labels */}
            <text x="50" y="310" fill="rgba(255,255,255,0.45)" fontSize="12" fontFamily={LABEL_FONT} letterSpacing="0.04em">The Silent Window</text>
            <motion.text x={SYMPTOMS_X + 10} y="310" fill="rgba(255,255,255,0.4)" fontSize="12" fontFamily={LABEL_FONT} letterSpacing="0.04em" style={{ opacity: symptomsOpacity }}>Clinical Detection</motion.text>

            {/* Axis labels */}
            <text x="40" y="346" fill="rgba(255,255,255,0.3)" fontSize="11" fontFamily={LABEL_FONT}>Day 0</text>
            <text x="905" y="346" fill="rgba(255,255,255,0.3)" fontSize="11" fontFamily={LABEL_FONT}>Day 110+</text>
          </svg>
        </div>

        {/* System-voice paragraph (sans) */}
        <motion.p
          style={{ opacity: symptomsOpacity }}
          className="font-sans mt-10 md:mt-14 max-w-xl text-sm md:text-base leading-relaxed text-white/45"
        >
          Pathology begins as metabolic drift — a slow deviation from your molecular
          baseline. By the time symptoms appear, the window for early intervention has
          narrowed. <span className="text-white/80">VION reads the drift.</span>
        </motion.p>
      </div>
    </section>
  );
};

export default SilentDrift;

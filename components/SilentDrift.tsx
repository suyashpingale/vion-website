import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface SilentDriftProps {
  scrollerRef?: React.RefObject<HTMLDivElement | null>;
}

/**
 * SECTION 2 — The Problem: Silent Drift Timeline
 *
 * 200vh section: a 100vh sticky viewport plus 100vh of scroll travel.
 * As the user scrolls, an SVG biomarker-drift curve draws left-to-right
 * (via stroke-dashoffset). The "Silent Window" tint, the "Symptoms appear"
 * dashed line, and the system-voice paragraph fade in toward the end.
 *
 * Structure-first: placeholder Tailwind utilities + brand color tokens only.
 */
const SilentDrift: React.FC<SilentDriftProps> = ({ scrollerRef }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    container: scrollerRef || undefined,
    offset: ['start start', 'end end'],
  });

  // Curve draws as we scroll (1 = hidden, 0 = fully drawn).
  const dashOffset = useTransform(scrollYProgress, [0.05, 0.85], [1, 0]);
  // Symptoms line + clinical-detection label reveal near the end.
  const symptomsOpacity = useTransform(scrollYProgress, [0.6, 0.9], [0, 1]);
  // Silent-window tint fades in early.
  const tintOpacity = useTransform(scrollYProgress, [0.1, 0.5], [0, 1]);

  // SVG geometry. viewBox 1000 x 360. Day 0 at x=40, Day 110 at x=960.
  // Symptoms line sits at ~Day 100 (x≈820).
  const SYMPTOMS_X = 820;
  // Drift curve: flat-ish near baseline, accelerating upward (deviation grows).
  const CURVE = 'M40 320 C 260 312, 440 296, 600 250 S 820 120, 960 40';

  return (
    <section ref={containerRef} className="relative h-[200vh] w-full bg-[#090C12] snap-start">
      {/* Sticky viewport */}
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden flex flex-col justify-center px-6 md:px-12 xl:px-20">

        {/* Heading — opacity system (most words 25%, "quietly" 100%) */}
        <h2 className="font-sans tracking-tight text-3xl md:text-5xl xl:text-6xl mb-10 md:mb-16 max-w-3xl">
          <span className="text-white/25">Health fails </span>
          <span className="text-white">quietly.</span>
        </h2>

        {/* Timeline */}
        <div className="w-full max-w-5xl">
          <svg viewBox="0 0 1000 360" className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
            {/* Silent-window tint (left of symptoms line) */}
            <motion.rect
              x="40" y="20" width={SYMPTOMS_X - 40} height="300"
              fill="#46B3EB" style={{ opacity: tintOpacity }} opacity={0.1}
            />

            {/* Axes */}
            <line x1="40" y1="320" x2="960" y2="320" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
            <line x1="40" y1="20" x2="40" y2="320" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />

            {/* Drift curve — draws on scroll */}
            <motion.path
              d={CURVE}
              fill="none"
              stroke="#46B3EB"
              strokeWidth="2.5"
              pathLength={1}
              strokeDasharray={1}
              style={{ strokeDashoffset: dashOffset }}
            />

            {/* Symptoms dashed line + label */}
            <motion.g style={{ opacity: symptomsOpacity }}>
              <line
                x1={SYMPTOMS_X} y1="20" x2={SYMPTOMS_X} y2="320"
                stroke="rgba(255,255,255,0.5)" strokeWidth="1" strokeDasharray="4 4"
              />
              <text x={SYMPTOMS_X + 8} y="36" fill="rgba(255,255,255,0.7)" fontSize="13" fontFamily="'IBM Plex Mono', monospace">
                Symptoms appear
              </text>
            </motion.g>

            {/* Region labels */}
            <text x="48" y="312" fill="rgba(255,255,255,0.4)" fontSize="12" fontFamily="'IBM Plex Mono', monospace">
              The Silent Window
            </text>
            <motion.text
              x={SYMPTOMS_X + 8} y="312" fill="rgba(255,255,255,0.4)" fontSize="12"
              fontFamily="'IBM Plex Mono', monospace" style={{ opacity: symptomsOpacity }}
            >
              Clinical Detection
            </motion.text>

            {/* Axis labels */}
            <text x="40" y="345" fill="rgba(255,255,255,0.3)" fontSize="11" fontFamily="'IBM Plex Mono', monospace">Day 0</text>
            <text x="900" y="345" fill="rgba(255,255,255,0.3)" fontSize="11" fontFamily="'IBM Plex Mono', monospace">Day 110+</text>
          </svg>
        </div>

        {/* System-voice paragraph */}
        <motion.p
          style={{ opacity: symptomsOpacity }}
          className="font-mono mt-10 md:mt-14 max-w-xl text-xs md:text-sm uppercase tracking-[0.1em] text-white/40"
        >
          Pathology begins as metabolic drift — a slow deviation from your molecular
          baseline. By the time symptoms appear, the window for early intervention has
          narrowed. VION reads the drift.
        </motion.p>
      </div>
    </section>
  );
};

export default SilentDrift;

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const CARDS = [
  {
    stat: "84%",
    label: "Late diagnosis",
    copy: "of chronic kidney disease cases are diagnosed at Stage 3 or later",
    bg: "#B8CAD8",
    textColor: "#082230",
  },
  {
    stat: "100+",
    label: "Silent drift",
    copy: "days of metabolic drift occur before clinical symptoms emerge",
    bg: "#94ADBE",
    textColor: "#082230",
  },
  {
    stat: "120+",
    label: "Validation",
    copy: "peer-reviewed studies validate sweat as a biomarker source",
    bg: "#6D8DA8",
    textColor: "#082230",
  },
  {
    stat: "zero",
    label: "Zero burden",
    copy: "blood draws. Zero batteries. Zero clinic visits.",
    bg: "#082230",
    textColor: "#ffffff",
  },
];

/**
 * Custom quintic ease-in-out to simulate "75% Influence" in After Effects.
 * This curve is extremely steep in the middle and very flat at the ends.
 */
const ease75 = (t: number) => {
  if (t <= 0) return 0;
  if (t >= 1) return 1;
  return t < 0.5 
    ? 16 * Math.pow(t, 5) 
    : 1 - Math.pow(-2 * t + 2, 5) / 2;
};

interface ImpactMetricsProps {
  scrollerRef?: React.RefObject<HTMLDivElement | null>;
}

export default function ImpactMetrics({ scrollerRef }: ImpactMetricsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress of the entire 400vh section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    container: scrollerRef || undefined,
    offset: ["start start", "end end"]
  });

  // Re-introducing a high-performance spring. 
  // mass: 0.01 makes it react instantly to prevent 'lag' overlap,
  // but it still filters out the 'stepping' jitter of raw scroll events.
  const progress = useSpring(scrollYProgress, {
    damping: 30,
    stiffness: 400,
    mass: 0.01,
    restDelta: 0.001
  });

  return (
    <div 
      ref={containerRef} 
      className="relative w-full overscroll-none" 
      style={{ height: "400vh" }}
    >
      {CARDS.map((card, i) => {
        const start = i * 0.25;
        const end = (i + 1) * 0.25;
        
        // Local progress (0 to 1) for the current overlap phase
        /* eslint-disable react-hooks/rules-of-hooks */
        const rawOv = useTransform(progress, [start, end], [0, 1]);
        const ov = useTransform(rawOv, (v) => ease75(v));

        // Layout math matching the user's reference
        const initialTop = i === 3 ? 50 : 50 - i * (100 / 6);
        const pushUp = useTransform(ov, (v) => i === 3 ? 0 : v * (initialTop - (100 / 6)));

        const translateY = useTransform(pushUp, (p) => `calc(-50% - ${p}vh)`);
        // Copy tracks the incoming card's overlap directly (overlap * 50vh).
        const copyTranslateY = useTransform(ov, (v) => `calc(-50% - ${i === 3 ? 0 : v * 50}vh)`);

        return (
          <div
            key={i}
            className="snap-start"
            style={{
              position: "sticky",
              top: i === 3 ? "0vh" : `${i * 33.333}vh`,
              width: "100%",
              height: "100vh",
              zIndex: i + 1,
              background: card.bg,
              overflow: "hidden",
              scrollSnapStop: "always",
            }}
          >
            {/* Stat Number + sub-label */}
            <motion.div
              style={{
                position: "absolute",
                left: 0,
                top: `${initialTop}%`,
                y: translateY,
                paddingLeft: "2vw",
                lineHeight: 0.9,
                pointerEvents: "none",
                userSelect: "none",
              }}
            >
              <span
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: "clamp(4rem, 10vw, 9rem)",
                  fontWeight: 300,
                  color: card.textColor,
                  letterSpacing: "-0.03em",
                  display: "block",
                }}
              >
                {card.stat}
              </span>
              <span
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: "10px",
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  color: card.textColor,
                  opacity: 0.4,
                  display: "block",
                  marginTop: "1.25rem",
                }}
              >
                {card.label}
              </span>
            </motion.div>

            {/* Body Copy */}
            <motion.div
              style={{
                position: "absolute",
                left: "54%",
                top: `${initialTop}%`,
                y: copyTranslateY,
                maxWidth: 280,
              }}
            >
              <p
                className="font-sans font-normal text-body1"
                style={{ color: card.textColor }}
              >
                {card.copy}
              </p>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}
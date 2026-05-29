/**
 * Shared motion presets — keeps scroll-reveal animation consistent across
 * every section (Function Health-style fade-ups).
 */

export const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 } as const,
};

// Easing tuned for a soft, premium settle.
export const easeOutExpo = [0.22, 1, 0.36, 1] as const;

export const transition = (delay = 0, duration = 0.7) => ({
  duration,
  ease: easeOutExpo,
  delay,
});

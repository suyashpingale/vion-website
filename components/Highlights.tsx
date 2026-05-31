import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause } from 'lucide-react';
import { fadeUp, transition, easeOutExpo } from './motion';

/**
 * SECTION 1.5 — Highlights (Apple "Get the highlights" carousel)
 *
 * A center-stage product carousel: one big section headline, then a track of
 * black product cards. The active card is centered; its neighbours peek at the
 * edges, dimmed. Each card pairs a single line of copy with a live VION
 * device-screen visual — NO eyebrow / head / subhead per slide. A bottom pill
 * holds a segmented progress bar + play/pause; it autoplays and supports
 * drag, arrow keys and segment taps.
 */

interface Metric {
  value: string;
  unit?: string;
  label?: string;
  accent?: boolean;
}

interface Slide {
  copy: React.ReactNode;
  glyph: string;            // small status glyph in the device header
  status: string;           // device header label
  hero: Metric;             // oversized hero readout
  rows: Metric[];           // supporting metric rows
}

const SLIDES: Slide[] = [
  {
    copy: (
      <>Six analytes — Na⁺, K⁺, Cl⁻, NH₄⁺, pH and lactate — read continuously from a single skin-worn patch.</>
    ),
    glyph: '⬡',
    status: 'Live panel',
    hero: { value: '142', unit: 'mmol/L', label: 'Sodium · Na⁺', accent: true },
    rows: [
      { value: '4.1', unit: 'mmol/L', label: 'Potassium · K⁺' },
      { value: '6.4', unit: 'pH', label: 'Acid–base' },
      { value: '8.2', unit: 'mmol/L', label: 'Lactate' },
      { value: '0.9', unit: 'mmol/L', label: 'Ammonium · NH₄⁺' },
    ],
  },
  {
    copy: (
      <>Clinical-grade readings taken straight from your skin. Nothing breaks the surface — no needles, no blood.</>
    ),
    glyph: '◠',
    status: 'Acquisition',
    hero: { value: '0', unit: 'punctures', label: 'Skin barrier intact', accent: true },
    rows: [
      { value: 'Sweat', label: 'Sampling medium' },
      { value: 'Passive', label: 'Microfluidic mesh' },
      { value: 'Continuous', label: 'Surface contact' },
    ],
  },
  {
    copy: (
      <>Self-powered by your own biochemistry — roughly 972 joules a day, with 12× the headroom it needs.</>
    ),
    glyph: '⚡',
    status: 'Power',
    hero: { value: '972', unit: 'J / day', label: 'Harvested', accent: true },
    rows: [
      { value: '12×', label: 'Energy headroom' },
      { value: '100k+', label: 'Charge cycles' },
      { value: '0', label: 'Batteries · charging' },
    ],
  },
  {
    copy: (
      <>One cartridge runs a four-hour longitudinal window — enough to watch your metabolism move, not just snapshot it.</>
    ),
    glyph: '◷',
    status: 'Session',
    hero: { value: '03:47', unit: 'elapsed', label: 'Longitudinal window', accent: true },
    rows: [
      { value: '4 h', label: 'Cartridge runtime' },
      { value: '1 Hz', label: 'Sample rate' },
      { value: 'Drift', label: 'Detection mode' },
    ],
  },
  {
    copy: (
      <>A recall-tuned classifier turns raw signal into a clear risk class — calibrated to an F-beta of 0.94.</>
    ),
    glyph: '◈',
    status: 'Stratification',
    hero: { value: 'Elevated', unit: '', label: 'Silent drift detected', accent: true },
    rows: [
      { value: '0.94', label: 'F-beta · recall-tuned' },
      { value: '3', label: 'Risk classes' },
      { value: 'CatBoost', label: 'Model' },
    ],
  },
  {
    copy: (
      <>Your lab comes to you. Zero appointments, zero waiting rooms — the diagnostic runs wherever you are.</>
    ),
    glyph: '⌂',
    status: 'At home',
    hero: { value: '0', unit: 'visits', label: 'Clinic appointments', accent: true },
    rows: [
      { value: 'Wear', label: 'Apply & forget' },
      { value: 'Sync', label: 'Results to phone' },
      { value: 'Anywhere', label: 'No facility needed' },
    ],
  },
];

const AUTOPLAY_MS = 6000;
const GAP = 24;

/* ── Device screen — the live VION readout that swaps per slide.
   The device itself stays dark (it's a screen), but the surrounding
   card surface is light. ──────────────────────────────────────────── */
const DeviceScreen: React.FC<{ slide: Slide }> = ({ slide }) => (
  <div className="relative w-full max-w-[280px] aspect-[9/13] rounded-[2rem] bg-gradient-to-b from-[#0d1320] to-[#06090f] ring-1 ring-cosmos/15 shadow-[0_24px_60px_-22px_rgba(8,34,48,0.45)] overflow-hidden">
    <div className="pointer-events-none absolute -top-1/4 left-1/2 h-1/2 w-3/4 -translate-x-1/2 rounded-full bg-electro/20 blur-3xl" />

    <div className="relative flex h-full flex-col px-5 py-5">
      {/* header */}
      <div className="flex items-center justify-between">
        <span className="grid h-7 w-7 place-items-center rounded-full bg-electro/15 text-electro text-sm">
          {slide.glyph}
        </span>
        <span className="font-sans text-[10px] uppercase tracking-[0.18em] text-white/40">
          {slide.status}
        </span>
      </div>

      {/* hero metric */}
      <div className="mt-6">
        <div className="flex items-baseline gap-2">
          <span
            className={`font-sans font-light leading-none tracking-tight tabular-nums ${
              slide.hero.accent ? 'text-electro' : 'text-white'
            } text-[clamp(2.25rem,5vw,3rem)]`}
          >
            {slide.hero.value}
          </span>
          {slide.hero.unit ? (
            <span className="font-sans text-xs text-white/40">{slide.hero.unit}</span>
          ) : null}
        </div>
        {slide.hero.label ? (
          <p className="mt-1.5 font-sans text-[12px] text-white/45">{slide.hero.label}</p>
        ) : null}
      </div>

      {/* supporting rows */}
      <div className="mt-auto flex flex-col gap-px overflow-hidden rounded-xl bg-white/[0.06]">
        {slide.rows.map((r) => (
          <div
            key={r.label}
            className="flex items-baseline justify-between gap-3 bg-[#070b10] px-3 py-2"
          >
            <span className="font-sans text-[11px] text-white/45">{r.label}</span>
            <span className="font-sans tabular-nums text-[13px] text-white/85">
              {r.value}
              {r.unit ? <span className="ml-1 text-white/35 text-[10px]">{r.unit}</span> : null}
            </span>
          </div>
        ))}
      </div>

      {/* page dots */}
      <div className="mt-3 flex justify-center gap-1.5">
        {[0, 1, 2].map((d) => (
          <span
            key={d}
            className={`h-1 w-1 rounded-full ${d === 1 ? 'bg-white/70' : 'bg-white/25'}`}
          />
        ))}
      </div>
    </div>
  </div>
);

const Highlights: React.FC = () => {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [progress, setProgress] = useState(0); // 0..1 for the active segment
  const viewportRef = useRef<HTMLDivElement>(null);
  const [vw, setVw] = useState(0);

  const last = SLIDES.length - 1;
  const cardW = vw ? Math.min(880, vw * (vw < 640 ? 0.86 : 0.82)) : 0;
  const trackX = vw ? (vw - cardW) / 2 - active * (cardW + GAP) : 0;

  // Measure viewport
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const measure = () => setVw(el.clientWidth);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const goTo = useCallback((i: number) => {
    setActive(Math.max(0, Math.min(last, i)));
    setProgress(0);
  }, [last]);

  const next = useCallback(() => {
    setActive((a) => (a + 1) % SLIDES.length);
    setProgress(0);
  }, []);

  // Autoplay — drive the active segment, advance on completion
  useEffect(() => {
    if (!playing) return;
    const step = 50;
    const id = setInterval(() => {
      setProgress((p) => {
        const np = p + step / AUTOPLAY_MS;
        if (np >= 1) {
          next();
          return 0;
        }
        return np;
      });
    }, step);
    return () => clearInterval(id);
  }, [playing, next]);

  // Keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goTo(active + 1);
      if (e.key === 'ArrowLeft') goTo(active - 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active, goTo]);

  return (
    <section id="highlights" className="w-full bg-clinical snap-start py-20 md:py-28 overflow-hidden">
      {/* Section headline — the one heading; slides carry no kicker */}
      <motion.h2
        {...fadeUp}
        transition={transition(0)}
        className="px-6 md:px-12 xl:px-24 font-sans font-medium tracking-[-0.02em] text-cosmos text-[clamp(2.25rem,5vw,4rem)] leading-[1.02] mb-12 md:mb-16"
      >
        The highlights.
      </motion.h2>

      {/* Carousel viewport */}
      <div ref={viewportRef} className="relative w-full">
        <motion.div
          className="flex items-stretch"
          style={{ gap: GAP }}
          animate={{ x: trackX }}
          transition={{ duration: 0.7, ease: easeOutExpo }}
          drag="x"
          dragConstraints={{ left: trackX, right: trackX }}
          dragElastic={0.12}
          onDragEnd={(_, info) => {
            if (info.offset.x < -80) goTo(active + 1);
            else if (info.offset.x > 80) goTo(active - 1);
          }}
        >
          {SLIDES.map((slide, i) => {
            const isActive = i === active;
            return (
              <motion.div
                key={i}
                className="shrink-0 cursor-pointer"
                style={{ width: cardW || '82vw' }}
                animate={{ opacity: isActive ? 1 : 0.35, scale: isActive ? 1 : 0.97 }}
                transition={{ duration: 0.7, ease: easeOutExpo }}
                onClick={() => !isActive && goTo(i)}
              >
                <div className="relative h-full overflow-hidden rounded-[1.75rem] bg-white ring-1 ring-cosmos/8 shadow-[0_18px_50px_-30px_rgba(8,34,48,0.25)]">
                  <div className="grid h-full grid-cols-1 items-center gap-8 p-8 md:grid-cols-2 md:gap-6 md:p-12 lg:p-16">
                    {/* Copy — no eyebrow, no subhead. Just the line. */}
                    <p className="order-2 md:order-1 font-sans font-medium text-cosmos text-[clamp(1.5rem,2.4vw,2.25rem)] leading-[1.18] tracking-[-0.01em] max-w-[460px]">
                      {slide.copy}
                    </p>
                    {/* Device visual */}
                    <div className="order-1 md:order-2 flex justify-center md:justify-end">
                      <DeviceScreen slide={slide} />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Control pill — segmented progress + play/pause */}
      <div className="mt-10 flex justify-center px-6">
        <div className="flex items-center gap-4 rounded-full bg-cosmos/[0.06] px-5 py-2.5 ring-1 ring-cosmos/10">
          <div className="flex items-center gap-1.5">
            {SLIDES.map((_, i) => {
              const fill = i < active ? 1 : i === active ? progress : 0;
              return (
                <button
                  key={i}
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => goTo(i)}
                  className="group py-1.5"
                >
                  <span
                    className={`block h-1 overflow-hidden rounded-full bg-cosmos/15 transition-all duration-300 ${
                      i === active ? 'w-9' : 'w-1.5 group-hover:w-3'
                    }`}
                  >
                    <span
                      className="block h-full rounded-full bg-cosmos"
                      style={{ width: `${fill * 100}%` }}
                    />
                  </span>
                </button>
              );
            })}
          </div>

          <button
            aria-label={playing ? 'Pause' : 'Play'}
            onClick={() => setPlaying((p) => !p)}
            className="grid h-7 w-7 place-items-center rounded-full text-cosmos/70 transition-colors hover:bg-cosmos/10 hover:text-cosmos"
          >
            {playing ? <Pause size={13} fill="currentColor" /> : <Play size={13} fill="currentColor" />}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Highlights;

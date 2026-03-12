"use client";

import React, { useEffect, useRef } from "react";

/**
 * VION Animated Footer — Line Field
 *
 * TWO FULLY DECOUPLED DRAW MODES:
 *
 * 1. RESTING STATE (no cursor)
 *    t = y / logicalH  ← pure linear position in canvas, 0=top, 1=bottom
 *    thick = lerp(THICK_MIN, THICK_MAX, t)
 *    gap   = lerp(GAP_MAX,   GAP_MIN,   t)
 *    Result: thin+sparse at top → thick+dense at bottom. Matches reference exactly.
 *    No cursor math. No bell curve. No artifacts.
 *
 * 2. HOVER STATE (cursor present)
 *    dist = |mouseY - y|
 *    t_hover = clamp(dist / INFLUENCE_RADIUS, 0, 1) ^ 2   (quadratic)
 *    thick = lerp(THICK_MIN, THICK_MAX, t_hover)
 *    gap   = lerp(GAP_MAX,   GAP_MIN,   t_hover)
 *    Result: thin+sparse at cursor → thick+dense away from cursor.
 *
 * BLEND:
 *    hoverWeight (0→1) lerps in over ~30 frames on mouse enter,
 *    lerps out on mouse leave. This prevents a hard snap between modes.
 *    Final thick/gap = lerp(resting values, hover values, hoverWeight)
 *
 * CORE MECHANIC — Dynamic Y-Accumulation:
 *    Lines have no fixed addresses. Each y is accumulated from the previous
 *    line's bottom + gap. Both thick and gap are computed fresh per frame.
 *
 * RESPONSIVE:
 *    Desktop  ≥1024px  canvas 70vh, full hover
 *    Tablet   640-1023 canvas 55vh, full hover
 *    Mobile   <640px   canvas 45vh, resting only
 */

const PRESETS = {
  desktop: {
    THICK_MIN:      1,    // top of resting ramp / cursor point in hover
    THICK_MAX:     18,    // bottom of resting ramp / far point in hover
    GAP_MIN:        6,    // bottom of resting ramp (dense)
    GAP_MAX:       72,    // top of resting ramp (sparse) / cursor point in hover
    INFLUENCE:      0.7,  // hover influence radius as fraction of canvas height
    SMOOTH:         0.1,  // cursor lerp speed
    BLEND_IN:       0.08, // hoverWeight ramp-in speed (~12 frames)
    BLEND_OUT:      0.055, // hoverWeight ramp-out speed (~18 frames, ~300ms return)
    CANVAS_H:      "60vh",
  },
  tablet: {
    THICK_MIN:      1,
    THICK_MAX:     13,
    GAP_MIN:        5,
    GAP_MAX:       55,
    INFLUENCE:      0.7,
    SMOOTH:         0.1,
    BLEND_IN:       0.08,
    BLEND_OUT:      0.055,
    CANVAS_H:      "50vh",
  },
  mobile: {
    THICK_MIN:      1,
    THICK_MAX:      9,
    GAP_MIN:        4,
    GAP_MAX:       38,
    INFLUENCE:      0.7,
    SMOOTH:         0.1,
    BLEND_IN:       0.08,
    BLEND_OUT:      0.055,
    CANVAS_H:      "40vh",
  },
} as const;

type PresetKey = keyof typeof PRESETS;

function getKey(): PresetKey {
  const w = window.innerWidth;
  if (w >= 1024) return "desktop";
  if (w >= 640)  return "tablet";
  return "mobile";
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export default function AnimatedFooter() {
  const canvasRef     = useRef<HTMLCanvasElement>(null);
  const mouseRef      = useRef({ y: 0, active: false });
  const smoothYRef    = useRef(0);
  const hoverWtRef    = useRef(0);  // 0 = resting, 1 = fully hovered
  const rafRef        = useRef<number>(0);
  const winWRef       = useRef(typeof window !== "undefined" ? window.innerWidth : 1280);

  useEffect(() => {
    const onResize = () => { winWRef.current = window.innerWidth; };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // DPR-aware resize
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width  = canvas.offsetWidth  * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Mouse — desktop + tablet only
    const onMove = (e: MouseEvent) => {
      if (winWRef.current < 640) return;
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { y: e.clientY - rect.top, active: true };
    };
    const onLeave = () => { mouseRef.current.active = false; };
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);

    const draw = () => {
      const p        = PRESETS[getKey()];
      const W        = canvas.offsetWidth;
      const H        = canvas.offsetHeight;
      const { y: rawY, active } = mouseRef.current;

      // ── Smooth cursor ──────────────────────────────────────────────────────
      smoothYRef.current = active
        ? lerp(smoothYRef.current, rawY, p.SMOOTH)
        : smoothYRef.current; // frozen when inactive

      // ── Blend weight ──────────────────────────────────────────────────────
      // Ramps 0→1 on enter, 1→0 on leave
      hoverWtRef.current = active
        ? Math.min(hoverWtRef.current + p.BLEND_IN,  1)
        : Math.max(hoverWtRef.current - p.BLEND_OUT, 0);

      const hw     = hoverWtRef.current;
      const mouseY = smoothYRef.current;
      const radius = H * p.INFLUENCE;

      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "#48D3EB";

      // ── Dynamic accumulation walk ──────────────────────────────────────────
      let y = 0;
      while (y < H) {

        // RESTING: bell-curve eased ramp (smoothstep at 75% blend)
        // smoothstep t²(3-2t): slow at both ends, fast in the middle.
        // 75% blend toward smoothstep keeps endpoints moving but clusters
        // the density transition dramatically in the center band.
        const tLinear = y / H;
        const tSmooth = tLinear * tLinear * (3 - 2 * tLinear);
        const tRest   = lerp(tLinear, tSmooth, 0.75);
        const thickR  = lerp(p.THICK_MIN, p.THICK_MAX, tRest);
        const gapR    = lerp(p.GAP_MAX,   p.GAP_MIN,   tRest);

        // HOVER: distance-based lens
        const dist   = Math.abs(mouseY - y);
        const tH     = Math.min(dist / radius, 1);
        const tHe    = tH * tH;                      // quadratic easing
        const thickH = lerp(p.THICK_MIN, p.THICK_MAX, tHe);
        const gapH   = lerp(p.GAP_MAX,   p.GAP_MIN,   tHe);

        // BLEND between the two modes
        const thick = lerp(thickR, thickH, hw);
        const gap   = lerp(gapR,   gapH,   hw);

        ctx.fillRect(0, y, W, thick);
        y += thick + gap;
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  // Layout helpers
  const vw        = winWRef.current;
  const isDesktop = vw >= 1024;
  const isTablet  = vw >= 640;
  
  // Matching Navigation.tsx padding: p-gr-1 (approx 24px) mobile, md:p-[20px] desktop/tablet
  const navPad    = vw >= 768 ? "20px" : "24px"; 
  
  const sz        = isDesktop ? { logo: "11px", link: "12px" } : { logo: "10px", link: "11px" };

  const linkStyle: React.CSSProperties = {
    color: "rgba(255,255,255,0.45)",
    fontSize: sz.link,
    fontFamily: "'Switzer', sans-serif",
    cursor: "pointer",
    textDecoration: "none",
    transition: "color 0.2s",
  };

  return (
    <footer className="snap-start" style={{
      background: "#090C12",
      width: "100%",
      height: "100vh",          // locked to exactly one viewport height
      display: "flex",
      flexDirection: "column",
      position: "relative",
      overflow: "hidden",
    }}>

      {/* Text block — top 50vh, content anchored to top */}
      <div style={{
        height: "50vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",  // nav row top, copyright row bottom
        flexShrink: 0,
      }}>

        {/* Top nav row */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexWrap: "wrap",
          gap: "16px",
          padding: navPad,
          position: "relative",
          zIndex: 2,
        }}>
          {/* Left — legal */}
          <div style={{ display: "flex", gap: isDesktop ? "32px" : "20px", flexWrap: "wrap" }}>
            <span style={linkStyle}>Terms &amp; policies</span>
            <span style={linkStyle}>Privacy policy</span>
          </div>

          {/* Right — site links */}
          <div style={{ display: "flex", gap: isDesktop ? "28px" : "16px", flexWrap: "wrap", justifyContent: "flex-end" }}>
            {["Careers", "About", "Help Center", "Twitter", "Instagram", "GitHub"].map(l => (
              <span key={l} style={linkStyle}>{l}</span>
            ))}
          </div>
        </div>

        {/* Bottom row — copyright + back to top */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: navPad,
          position: "relative",
          zIndex: 2,
        }}>
          <span style={{ ...linkStyle, fontSize: sz.link }}>
            © VION {new Date().getFullYear()}. All Rights Reserved
          </span>
          <span
            style={{ ...linkStyle, color: "rgba(255,255,255,0.45)" }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Back to top ↑
          </span>
        </div>
      </div>

      {/* Canvas — bottom 50vh, exact */}
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "50vh",        // fixed, not minHeight — canvas fills exactly half
          flexShrink: 0,
          display: "block",
          cursor: vw >= 640 ? "crosshair" : "default",
        }}
      />
    </footer>
  );
}

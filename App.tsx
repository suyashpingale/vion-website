import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Hero from './components/Hero';
import Highlights from './components/Highlights';
import SilentDrift from './components/SilentDrift';
import EpisodicVsContinuous from './components/EpisodicVsContinuous';
import Solution from './components/Solution';
import AnatomyLayers from './components/AnatomyLayers';
import BiomarkerGrid from './components/BiomarkerGrid';
import ImpactMetrics from './components/ImpactMetrics';
import DashboardMock from './components/DashboardMock';
import Footer from './components/Footer';
import Navigation from './components/Navigation';
// Editorial product-image sections (restored)
import Foresight from './components/Foresight';
import Anatomy from './components/Anatomy';
import SystemLogic from './components/SystemLogic';
import Showcase from './components/Showcase';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Check viewport for push effect (only push on desktop)
  useEffect(() => {
    const checkIsDesktop = () => setIsDesktop(window.innerWidth >= 768);
    checkIsDesktop();
    window.addEventListener('resize', checkIsDesktop);
    return () => window.removeEventListener('resize', checkIsDesktop);
  }, []);

  return (
    <main className="w-full bg-[#EEF2F5] h-screen overflow-hidden text-cosmos selection:bg-electro selection:text-white antialiased">
      {/* Navigation sits outside the pushed content to remain "intact" (fixed) */}
      <Navigation isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} scrollerRef={containerRef} />

      {/* Main Content Wrapper - Pushes Left on Desktop */}
      <motion.div
        ref={containerRef}
        animate={{
          x: isMenuOpen && isDesktop ? "-50vw" : 0,
          opacity: isMenuOpen && !isDesktop ? 0 : 1 // Fade out on mobile behind menu
        }}
        initial={false}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        // CRITICAL FIX: Explicitly remove transform when x is 0 to restore position:sticky support
        transformTemplate={({ x }, generated) => {
          if (x === 0 || x === "0px" || x === "0%") {
            return "none";
          }
          return generated;
        }}
        style={{
          // Optimization: Only hint will-change during the interaction to avoid persistent layer creation
          willChange: isMenuOpen ? 'transform' : 'auto'
        }}
        className="w-full h-full relative bg-[#EEF2F5] overflow-y-auto scroll-smooth overscroll-none"
      >
        {/* 1. Hero */}
        <Hero />

        {/* 1.5 Highlights — fulfils the Hero CTA */}
        <Highlights />

        {/* 2. The Problem — Silent Drift Timeline (scroll-driven) */}
        <SilentDrift scrollerRef={containerRef} />

        {/* 3. Why sweat — editorial: "Sweat is data." */}
        <Foresight />

        {/* 4. Episodic vs Continuous */}
        <EpisodicVsContinuous />

        {/* 5. Solution Statement */}
        <Solution />

        {/* 6. Anatomy Layers / How It Works (handles its own scroll spy) */}
        <AnatomyLayers scrollerRef={containerRef} />

        {/* 7. Editorial product story: No needles → You are the battery */}
        <Anatomy />
        <SystemLogic />

        {/* 8. What We Measure — Biomarker Grid */}
        <BiomarkerGrid />

        {/* 9. Impact Metrics / Stats (sticky-stack scroll) */}
        <ImpactMetrics scrollerRef={containerRef} />

        {/* 10. Editorial form story: For everyone → Selective Shield → Invisible */}
        <Showcase />

        {/* 11. Dashboard Mock */}
        <DashboardMock />

        {/* 12. Footer */}
        <Footer />
      </motion.div>
    </main>
  );
}

export default App;
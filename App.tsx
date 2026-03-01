import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Hero from './components/Hero';
import HorizontalFeatures from './components/HorizontalFeatures';
import ImpactMetrics from './components/ImpactMetrics';
import LatencyGap from './components/LatencyGap';
import Foresight from './components/Foresight';
import SystemLogic from './components/SystemLogic';
import Anatomy from './components/Anatomy';
import EngineeredReality from './components/EngineeredReality';
import Footer from './components/Footer';
import Navigation from './components/Navigation';
import AnatomyLayers from './components/AnatomyLayers';
import Showcase from './components/Showcase';
import Validation from './components/Validation';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  // Check viewport for push effect (only push on desktop)
  useEffect(() => {
    const checkIsDesktop = () => setIsDesktop(window.innerWidth >= 768);
    checkIsDesktop();
    window.addEventListener('resize', checkIsDesktop);
    return () => window.removeEventListener('resize', checkIsDesktop);
  }, []);

  return (
    <main className="w-full bg-cosmos min-h-[100dvh] text-noise selection:bg-electro selection:text-white antialiased">
      {/* Navigation sits outside the pushed content to remain "intact" (fixed) */}
      <Navigation isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />

      {/* Main Content Wrapper - Pushes Left on Desktop */}
      <motion.div
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
        className="w-full relative bg-cosmos"
      >
        {/* Sections wrapped with snap-start for scroll behavior */}
        <section className="snap-start">
          <Hero />
        </section>

        <section className="snap-start">
          <ImpactMetrics />
        </section>

        {/* Section 3 */}
        <section className="snap-start">
          <LatencyGap />
        </section>

        {/* Section 4: Foresight */}
        <section className="snap-start">
          <Foresight />
        </section>

        {/* Section 5: System Logic (Replaces ProcessFlow, new layout) */}
        <section className="snap-start">
          <SystemLogic />
        </section>

        {/* Anatomy handles its own internal snapping */}
        <Anatomy />

        {/* <section className="snap-start">
          <ZeroMaintenance />
        </section> */}

        {/* EngineeredReality handles its own internal snapping */}
        <EngineeredReality />

        <section className="snap-start">
          <HorizontalFeatures />
        </section>

        {/* Anatomy Layers scroll spy handles its own internal snapping */}
        <AnatomyLayers />

        <section className="snap-start">
          <Showcase />
        </section>

        <section className="snap-start">
          <Validation />
        </section>

        <section className="snap-start">
          <Footer />
        </section>
      </motion.div>
    </main>
  );
}

export default App;
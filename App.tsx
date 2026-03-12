import React, { useState, useEffect, useRef } from 'react';
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
  const containerRef = useRef<HTMLDivElement>(null);

  // Check viewport for push effect (only push on desktop)
  useEffect(() => {
    const checkIsDesktop = () => setIsDesktop(window.innerWidth >= 768);
    checkIsDesktop();
    window.addEventListener('resize', checkIsDesktop);
    return () => window.removeEventListener('resize', checkIsDesktop);
  }, []);

  return (
    <main className="w-full bg-cosmos h-screen overflow-hidden text-noise selection:bg-electro selection:text-white antialiased">
      {/* Navigation sits outside the pushed content to remain "intact" (fixed) */}
      <Navigation isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />

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
        className="w-full h-full relative bg-cosmos overflow-y-auto scroll-smooth overscroll-none"
      >
        {/* Sections wrapped with snap-start for scroll behavior */}
        <Hero />

        <ImpactMetrics scrollerRef={containerRef} />

        {/* Section 3 */}
        <LatencyGap />

        {/* Section 4: Foresight */}
        <Foresight />

        <SystemLogic />

        {/* Anatomy handles its own internal snapping */}
        <Anatomy />

        {/* <section className="snap-start">
          <ZeroMaintenance />
        </section> */}

        {/* EngineeredReality handles its own internal snapping */}
        <EngineeredReality />

        <HorizontalFeatures />

        {/* Anatomy Layers scroll spy handles its own internal snapping */}
        <AnatomyLayers scrollerRef={containerRef} />

        <Showcase />

        <Validation />

        <Footer />
      </motion.div>
    </main>
  );
}

export default App;
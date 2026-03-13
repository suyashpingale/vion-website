import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
// @ts-ignore
import vionLogo from './Assets/LOGO-ICON-SVG.svg';

interface NavigationProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  scrollerRef?: React.RefObject<HTMLDivElement | null>;
}

const navLinks = [
  { label: "Technology", href: "#" },
  { label: "Science", href: "#" },
  { label: "Interface", href: "#" },
  { label: "Company", href: "#" },
];

const Navigation: React.FC<NavigationProps> = ({ isOpen, setIsOpen, scrollerRef }) => {
  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  // "Flattened bell curve" / Premium smooth easing
  const transition = { duration: 0.8, ease: [0.76, 0, 0.24, 1] };

  const menuVariants = {
    initial: { x: "100%" },
    animate: { x: "0%" },
    exit: { x: "100%" }
  };

  const linkVariants = {
    initial: { opacity: 0, y: 30 },
    animate: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.76, 0, 0.24, 1],
        delay: 0.3 + (i * 0.1)
      }
    }),
    exit: { opacity: 0, transition: { duration: 0.3 } }
  };

  // Responsive scroll-fade logic — fade out when nearing the bottom (footer area)
  const { scrollYProgress } = useScroll({
    container: scrollerRef || undefined,
  });
  const [navOpacity, setNavOpacity] = useState(1);
  const [navPointerEvents, setNavPointerEvents] = useState<'auto' | 'none'>('auto');

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // The footer is exactly 100vh tall. When scrollYProgress nears 1.0 (e.g. > 0.95), we are in the footer zone.
    if (latest > 0.95 && !isOpen) {
      setNavOpacity(0);
      setNavPointerEvents('none');
    } else {
      setNavOpacity(1);
      setNavPointerEvents('auto');
    }
  });

  // Dynamic Background Lightness Thresholding
  const [logoColor, setLogoColor] = useState("#48D3EB");

  useEffect(() => {
    let ticking = false;

    // Helper to extract luminance from an exact pixel on an image
    const getLuminanceFromImage = (imgEl: HTMLImageElement, clientX: number, clientY: number): number | null => {
      try {
        const rect = imgEl.getBoundingClientRect();
        const style = window.getComputedStyle(imgEl);
        
        let canvas = (imgEl as any).__lumaCanvas as HTMLCanvasElement;
        let ctx = (imgEl as any).__lumaCtx as CanvasRenderingContext2D;
        
        // Render or update cache if dimensions change
        if (!canvas || canvas.width !== Math.round(rect.width) || canvas.height !== Math.round(rect.height)) {
          canvas = document.createElement('canvas');
          canvas.width = Math.round(rect.width) || 1;
          canvas.height = Math.round(rect.height) || 1;
          ctx = canvas.getContext('2d', { willReadFrequently: true })!;
          
          if (style.objectFit === 'cover') {
            const imgRatio = imgEl.naturalWidth / imgEl.naturalHeight;
            const canvasRatio = canvas.width / canvas.height;
            let sx = 0, sy = 0, sWidth = imgEl.naturalWidth, sHeight = imgEl.naturalHeight;
            
            if (imgRatio > canvasRatio) {
              sWidth = sHeight * canvasRatio;
              sx = (imgEl.naturalWidth - sWidth) / 2;
            } else {
              sHeight = sWidth / canvasRatio;
              sy = (imgEl.naturalHeight - sHeight) / 2;
            }
            ctx.drawImage(imgEl, sx, sy, sWidth, sHeight, 0, 0, canvas.width, canvas.height);
          } else {
            ctx.drawImage(imgEl, 0, 0, canvas.width, canvas.height);
          }
          
          (imgEl as any).__lumaCanvas = canvas;
          (imgEl as any).__lumaCtx = ctx;
        }

        const x = Math.max(0, Math.min(Math.floor(clientX - rect.left), canvas.width - 1));
        const y = Math.max(0, Math.min(Math.floor(clientY - rect.top), canvas.height - 1));
        
        const pixel = ctx.getImageData(x, y, 1, 1).data;
        if (pixel[3] > 0) { // Not fully transparent
          return (0.299 * pixel[0] + 0.587 * pixel[1] + 0.114 * pixel[2]) / 255;
        }
      } catch (e) {
        // Cross-origin image blocks pixel reading, gracefully fallback
      }
      return null;
    };

    const checkBgLuminance = () => {
      const logoEl = document.getElementById('navbar-logo-container');
      if (!logoEl) {
        ticking = false;
        return;
      }

      const rect = logoEl.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;

      // Get all elements strictly under the center pixel of the logo
      const els = document.elementsFromPoint(x, y);

      let foundLuminance: number | null = null;
      
      for (const el of els) {
        // 1. Check if the element is an image and pull actual pixel data
        if (el.tagName.toLowerCase() === 'img') {
          const imgLuma = getLuminanceFromImage(el as HTMLImageElement, x, y);
          if (imgLuma !== null) {
            foundLuminance = imgLuma;
            break;
          }
        }

        // 2. Check CSS background colors
        const style = window.getComputedStyle(el);
        const bgColor = style.backgroundColor;
        
        if (bgColor && bgColor !== 'rgba(0, 0, 0, 0)' && bgColor !== 'transparent') {
          // Verify it's not a highly transparent layer
          if (!bgColor.startsWith('rgba') || !bgColor.includes(', 0)')) {
            const match = bgColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
            if (match) {
              const r = parseInt(match[1]);
              const g = parseInt(match[2]);
              const b = parseInt(match[3]);
              foundLuminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
              break;
            }
          }
        }
      }

      if (foundLuminance !== null) {
        // 0.4 threshold cleanly splits dark themes vs light backgrounds
        if (foundLuminance > 0.4) {
           setLogoColor("#0B2230"); // Light BG -> Dark Navy Logo
        } else {
           setLogoColor("#48D3EB"); // Dark BG -> Cyan Logo
        }
      } else {
        setLogoColor("#48D3EB"); // Fallback
      }
      
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(checkBgLuminance);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    requestAnimationFrame(checkBgLuminance);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <>
      {/* Fixed Header Bar - Stays constant/intact */}
      <motion.nav
        className="fixed top-0 left-0 w-full z-50 flex justify-between items-center p-gr-1 md:p-[20px]"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: navOpacity, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        style={{ pointerEvents: navPointerEvents }}
      >
        {/* Logo */}
        <div 
          id="navbar-logo-container"
          className="z-50 pointer-events-auto flex items-center min-h-[44px] min-w-[44px] justify-center" 
          aria-label="VION Home"
        >
          <motion.svg 
            width="24" height="24" viewBox="0 0 24 24" 
            className="w-[15px] h-auto"
            animate={{ fill: logoColor }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <path fillRule="evenodd" clipRule="evenodd" d="M9.19985 0L11.8938 14.7738L14.8001 0H24V24H0V0H9.19985Z" />
          </motion.svg>
        </div>

        {/* Menu Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="z-50 group flex items-center cursor-pointer pointer-events-auto min-h-[44px] min-w-[44px] justify-center"
        >
          <span className="font-sans text-body2 font-semibold uppercase tracking-[0.2em] text-slate-400 hover:text-cosmos transition-colors antialiased">
            {isOpen ? 'Close' : 'Menu'}
          </span>
        </button>
      </motion.nav>

      {/* Backdrop (Mobile Only) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="md:hidden fixed inset-0 bg-cosmos/80 backdrop-blur-sm z-30"
          />
        )}
      </AnimatePresence>

      {/* Menu Drawer - Right Side */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={transition}
            className="fixed inset-y-0 right-0 z-40 bg-abyss flex flex-col h-full w-full md:w-[50vw] overflow-hidden shadow-2xl border-l border-white/5"
          >
            {/* Content Container */}
            <div className="flex flex-col justify-between h-full p-6 md:p-12 lg:p-24 relative">

              {/* Main Links */}
              <div className="flex flex-col gap-2 mt-20 md:mt-12">
                {navLinks.map((link, i) => (
                  <div key={link.label} className="overflow-hidden">
                    <motion.a
                      href={link.href}
                      custom={i}
                      variants={linkVariants}
                      className="font-sans font-medium text-h2 md:text-h1 text-noise hover:text-electro transition-all duration-500 ease-out leading-tight tracking-tight block w-max hover:translate-x-4 min-h-[44px] flex items-center"
                      onClick={() => setIsOpen(false)}
                      style={{
                        WebkitFontSmoothing: 'antialiased',
                        MozOsxFontSmoothing: 'grayscale'
                      }}
                    >
                      {link.label}
                    </motion.a>
                  </div>
                ))}
              </div>

              {/* Footer / Socials Area */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="flex flex-col gap-8 md:gap-10"
              >
                <div className="flex flex-col gap-2">
                  <a href="#" className="font-mono text-white/40 text-body2 uppercase tracking-widest hover:text-white transition-colors duration-300 font-medium min-h-[44px] flex items-center">Instagram</a>
                  <a href="#" className="font-mono text-white/40 text-body2 uppercase tracking-widest hover:text-white transition-colors duration-300 font-medium min-h-[44px] flex items-center">LinkedIn</a>
                </div>

                <button className="bg-synapse text-abyss px-6 md:px-8 py-4 font-mono text-body2 font-bold uppercase tracking-widest hover:bg-white transition-colors duration-300 rounded-sm flex items-center justify-between w-full md:w-64 group min-h-[44px]">
                  Vion Systems
                  <ArrowUpRight size={16} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform duration-300" />
                </button>

                <div className="flex justify-between items-end border-t border-white/5 pt-6">
                  <span className="font-mono text-white/20 text-body2 font-medium">©2026 VION</span>
                  <span className="font-mono text-white/20 text-body2 font-medium">SAN FRANCISCO, CA</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
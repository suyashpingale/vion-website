import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
// @ts-ignore
import vionLogo from './Assets/LOGO-ICON-SVG.svg';

interface NavigationProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const navLinks = [
  { label: "Technology", href: "#" },
  { label: "Science", href: "#" },
  { label: "Interface", href: "#" },
  { label: "Company", href: "#" },
];

const Navigation: React.FC<NavigationProps> = ({ isOpen, setIsOpen }) => {
  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
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

  return (
    <>
      {/* Fixed Header Bar - Stays constant/intact */}
      <motion.nav
        className="fixed top-0 left-0 w-full z-50 flex justify-between items-center p-gr-1 md:p-[20px] text-cosmos pointer-events-none"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Logo */}
        <div className="z-50 pointer-events-auto flex items-center min-h-[44px] min-w-[44px] justify-center" aria-label="VION Home">
          <img src={vionLogo} alt="VION Logo" className="w-[15px] h-auto" />
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
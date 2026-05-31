import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { fadeUp, transition } from './motion';

// VION mark — the wordmark "V" glyph used in the nav, scaled for the footer lockup.
const VionGlyph: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.19985 0L11.8938 14.7738L14.8001 0H24V24H0V0H9.19985Z"
      fill="currentColor"
    />
  </svg>
);

const columns: { heading: string; links: { label: string; href: string }[] }[] = [
  {
    heading: 'Platform',
    links: [
      { label: 'Technology', href: '#' },
      { label: 'The Science', href: '#' },
      { label: 'Biomarkers', href: '#' },
      { label: 'Interface', href: '#' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About', href: '#' },
      { label: 'Research', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Press', href: '#' },
    ],
  },
  {
    heading: 'Connect',
    links: [
      { label: 'Contact', href: '#' },
      { label: 'LinkedIn', href: '#' },
      { label: 'Instagram', href: '#' },
      { label: 'X / Twitter', href: '#' },
    ],
  },
];

const legal = [
  { label: 'Privacy', href: '#' },
  { label: 'Terms', href: '#' },
  { label: 'Cookies', href: '#' },
];

const Footer: React.FC = () => {
  return (
    <footer className="bg-emphasis relative w-full overflow-hidden snap-start text-noise">
      <div className="mx-auto w-full max-w-[1440px] px-gr-1 md:px-gr-2 lg:px-gr-3 pt-[14vh] md:pt-[16vh] pb-10">

        {/* Top — statement + columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">

          {/* Brand statement */}
          <motion.div {...fadeUp} transition={transition()} className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-8">
              <VionGlyph className="w-5 h-5 text-electro" />
              <span className="text-link text-noise text-sm">VION</span>
            </div>
            <h2 className="font-sans text-[clamp(1.75rem,3.2vw,2.75rem)] leading-[1.1] tracking-tight text-noise max-w-[420px]">
              Sovereign health intelligence.
              <span className="block text-noise/40">Biology, uninterrupted.</span>
            </h2>

            <a
              href="#"
              className="group mt-10 inline-flex items-center gap-2 text-link text-sm text-electro hover:text-noise transition-colors duration-300"
            >
              Request access
              <ArrowUpRight
                size={15}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          </motion.div>

          {/* Spacer on desktop */}
          <div className="hidden lg:block lg:col-span-1" />

          {/* Link columns */}
          {columns.map((col, i) => (
            <motion.nav
              key={col.heading}
              {...fadeUp}
              transition={transition(0.06 * (i + 1))}
              className="lg:col-span-2"
              aria-label={col.heading}
            >
              <p className="eyebrow text-noise/40 mb-5">{col.heading}</p>
              <ul className="flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="font-sans text-body2 text-noise/65 hover:text-noise transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.nav>
          ))}
        </div>

        {/* Oversized wordmark — quiet, anchored, not interactive */}
        <div className="mt-[12vh] md:mt-[16vh] select-none" aria-hidden="true">
          <div className="h-px w-full bg-noise/10 mb-8" />
          <p className="font-sans font-medium leading-none tracking-tight text-noise/[0.06] text-[clamp(5rem,22vw,17rem)]">
            VION
          </p>
        </div>

        {/* Bottom legal bar */}
        <div className="mt-8 flex flex-col-reverse md:flex-row md:items-center md:justify-between gap-6">
          <span className="text-link text-noise/30 text-xs">
            © {new Date().getFullYear()} VION — San Francisco, CA
          </span>

          <div className="flex items-center gap-6">
            {legal.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-link text-noise/40 text-xs hover:text-noise/80 transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => document.querySelector<HTMLElement>('.overflow-y-auto')?.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-link text-noise/40 text-xs hover:text-noise/80 transition-colors duration-200"
            >
              Back to top ↑
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

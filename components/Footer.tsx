import React from 'react';
import { Github, Linkedin, Twitter, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-cosmos/5 pt-16 md:pt-24 3xl:pt-gr-4 pb-12 px-gr-1 md:px-gr-2 lg:px-gr-3 w-full">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start mb-16 md:mb-24 gap-10 lg:gap-0">

          {/* Brand Column */}
          <div className="lg:w-1/5">
            <div className="w-12 h-12 bg-cosmos flex items-center justify-center mb-8">
              {/* Abstract VION Mark - Square Geometry */}
              <div className="w-4 h-4 bg-white" />
            </div>
            <p className="font-sans text-cosmos/60 text-body2 max-w-xs font-medium">
              Sovereign health intelligence.<br />
              Biology. Uninterrupted.
            </p>
          </div>

          {/* Navigation Columns */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10 lg:gap-16 w-full lg:w-3/4 justify-end">

            <div className="flex flex-col gap-3 md:gap-4">
              <h4 className="font-mono text-body2 uppercase tracking-widest text-cosmos/40 mb-1 md:mb-2 font-medium">Technology</h4>
              <a href="#" className="font-sans text-body2 text-cosmos hover:text-electro transition-colors font-medium min-h-[44px] sm:min-h-0 flex items-center">Sensing Array</a>
              <a href="#" className="font-sans text-body2 text-cosmos hover:text-electro transition-colors font-medium min-h-[44px] sm:min-h-0 flex items-center">Energy Harvest</a>
              <a href="#" className="font-sans text-body2 text-cosmos hover:text-electro transition-colors font-medium min-h-[44px] sm:min-h-0 flex items-center">Microfluidics</a>
              <a href="#" className="font-sans text-body2 text-cosmos hover:text-electro transition-colors font-medium min-h-[44px] sm:min-h-0 flex items-center">Data Security</a>
            </div>

            <div className="flex flex-col gap-3 md:gap-4">
              <h4 className="font-mono text-body2 uppercase tracking-widest text-cosmos/40 mb-1 md:mb-2 font-medium">Science</h4>
              <a href="#" className="font-sans text-body2 text-cosmos hover:text-electro transition-colors font-medium min-h-[44px] sm:min-h-0 flex items-center">Clinical Validity</a>
              <a href="#" className="font-sans text-body2 text-cosmos hover:text-electro transition-colors font-medium min-h-[44px] sm:min-h-0 flex items-center">Biomarkers</a>
              <a href="#" className="font-sans text-body2 text-cosmos hover:text-electro transition-colors font-medium min-h-[44px] sm:min-h-0 flex items-center">Research</a>
              <a href="#" className="font-sans text-body2 text-cosmos hover:text-electro transition-colors font-medium min-h-[44px] sm:min-h-0 flex items-center">Publications</a>
            </div>

            <div className="flex flex-col gap-3 md:gap-4">
              <h4 className="font-mono text-body2 uppercase tracking-widest text-cosmos/40 mb-1 md:mb-2 font-medium">Interface</h4>
              <a href="#" className="font-sans text-body2 text-cosmos hover:text-electro transition-colors font-medium min-h-[44px] sm:min-h-0 flex items-center">Mobile App</a>
              <a href="#" className="font-sans text-body2 text-cosmos hover:text-electro transition-colors font-medium min-h-[44px] sm:min-h-0 flex items-center">Developer API</a>
              <a href="#" className="font-sans text-body2 text-cosmos hover:text-electro transition-colors font-medium min-h-[44px] sm:min-h-0 flex items-center">Integrations</a>
              <a href="#" className="font-sans text-body2 text-cosmos hover:text-electro transition-colors font-medium min-h-[44px] sm:min-h-0 flex items-center">Status</a>
            </div>

            <div className="flex flex-col gap-3 md:gap-4">
              <h4 className="font-mono text-body2 uppercase tracking-widest text-cosmos/40 mb-1 md:mb-2 font-medium">Company</h4>
              <a href="#" className="font-sans text-body2 text-cosmos hover:text-electro transition-colors font-medium min-h-[44px] sm:min-h-0 flex items-center">Manifesto</a>
              <a href="#" className="font-sans text-body2 text-cosmos hover:text-electro transition-colors font-medium min-h-[44px] sm:min-h-0 flex items-center">Careers</a>
              <a href="#" className="font-sans text-body2 text-cosmos hover:text-electro transition-colors font-medium min-h-[44px] sm:min-h-0 flex items-center">Media Kit</a>
              <a href="#" className="font-sans text-body2 text-cosmos hover:text-electro transition-colors font-medium min-h-[44px] sm:min-h-0 flex items-center">Contact</a>
            </div>

          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-end border-t border-cosmos/5 pt-8">
          <div className="flex flex-wrap gap-4 md:gap-8 items-center mb-8 md:mb-0 w-full md:w-auto">
            <span className="font-mono text-body2 text-cosmos/40 whitespace-nowrap font-medium">© 2026 VION</span>
            <a href="#" className="font-mono text-body2 text-cosmos/60 hover:text-cosmos transition-colors whitespace-nowrap font-medium min-h-[44px] sm:min-h-0 flex items-center">IMPRINT</a>
            <a href="#" className="font-mono text-body2 text-cosmos/60 hover:text-cosmos transition-colors whitespace-nowrap font-medium min-h-[44px] sm:min-h-0 flex items-center">TERMS OF SERVICE</a>
            <a href="#" className="font-mono text-body2 text-cosmos/60 hover:text-cosmos transition-colors whitespace-nowrap font-medium min-h-[44px] sm:min-h-0 flex items-center">PRIVACY POLICY</a>
            <a href="#" className="font-mono text-body2 text-cosmos/60 hover:text-cosmos transition-colors whitespace-nowrap font-medium min-h-[44px] sm:min-h-0 flex items-center">COOKIE POLICY</a>
          </div>

          <div className="flex gap-6 text-cosmos w-full md:w-auto justify-end">
            <Github size={20} strokeWidth={1.5} className="hover:text-electro transition-colors cursor-pointer" />
            <Linkedin size={20} strokeWidth={1.5} className="hover:text-electro transition-colors cursor-pointer" />
            <Youtube size={20} strokeWidth={1.5} className="hover:text-electro transition-colors cursor-pointer" />
            <Twitter size={20} strokeWidth={1.5} className="hover:text-electro transition-colors cursor-pointer" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
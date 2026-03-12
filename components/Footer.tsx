import React from 'react';
import AnimatedFooter from '@/components/ui/animated-footer';

// VION wordmark as SVG logo
const VionLogo: React.FC = () => (
  <div className="flex items-center gap-3">
    <div className="w-8 h-8 bg-white flex items-center justify-center">
      <div className="w-3 h-3 bg-cosmos" />
    </div>
    <span className="font-mono text-white text-xl font-semibold tracking-[0.15em] uppercase">
      VION
    </span>
  </div>
);

const Footer: React.FC = () => {
  return (
    <AnimatedFooter
      logo={<VionLogo />}
      tagline={
        <>
          Sovereign health intelligence.<br />
          Biology. Uninterrupted.
        </>
      }
      leftLinks={[
        { href: '#', label: 'Imprint' },
        { href: '#', label: 'Terms of Service' },
        { href: '#', label: 'Privacy Policy' },
        { href: '#', label: 'Cookie Policy' },
      ]}
      rightLinks={[
        { href: '#', label: 'Technology' },
        { href: '#', label: 'Science' },
        { href: '#', label: 'Manifesto' },
        { href: '#', label: 'Careers' },
        { href: '#', label: 'Media Kit' },
        { href: '#', label: 'Contact' },
      ]}
      copyrightText="© 2026 VION. All Rights Reserved."
      barCount={30}
    />
  );
};

export default Footer;
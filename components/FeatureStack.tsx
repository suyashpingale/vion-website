import React from 'react';

const FeatureStack: React.FC = () => {
  return (
    <section className="bg-abyss text-white">
      {/* Card 1: Power */}
      <div className="min-h-[80vh] flex flex-col md:flex-row border-b border-white/5">
        <div className="w-full md:w-1/2 p-12 md:p-24 flex flex-col justify-center border-r border-white/5">
          <span className="font-mono text-electro text-body2 mb-4 font-medium">POWER ARCHITECTURE</span>
          <h2 className="font-serif text-h2 md:text-h1 mb-8">Infinite-Horizon Sensing.</h2>
          <p className="font-sans text-white/60 text-body1 mb-8 max-w-md font-medium">
            Batteries die. Charging breaks data continuity. A sensor that isn't worn is a sensor that is blind.
          </p>
          <ul className="space-y-4 font-mono text-body2 text-white/80 font-medium">
            <li className="flex items-center gap-3">
              <span className="w-2 h-2 bg-electro rounded-full"></span>
              Harvest
            </li>
            <li className="flex items-center gap-3">
              <span className="w-2 h-2 bg-electro rounded-full"></span>
              Buffer
            </li>
            <li className="flex items-center gap-3">
              <span className="w-2 h-2 bg-electro rounded-full"></span>
              Sense
            </li>
          </ul>
        </div>
        <div className="w-full md:w-1/2 relative bg-cosmos overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-electro/20 to-abyss"></div>
          <div className="absolute bottom-12 left-12">
            <h3 className="font-sans text-h2 font-bold text-white mb-2">Zero-Gap Data</h3>
            <p className="font-mono text-white/50">SET AND FORGET</p>
          </div>
        </div>
      </div>

      {/* Card 2: Sensing */}
      <div className="min-h-[80vh] flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 relative bg-oxblood/5 overflow-hidden order-2 md:order-1">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-oxblood/20 to-abyss"></div>
          {/* Abstract Microfluidic Art */}
          <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,50 Q25,30 50,50 T100,50" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-white" />
            <path d="M0,60 Q25,40 50,60 T100,60" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-white" />
          </svg>
          <div className="absolute bottom-12 left-12">
            <h3 className="font-sans text-h2 font-bold text-white mb-2">Molecular Fidelity</h3>
            <p className="font-mono text-white/50">NO SKIN PENETRATION</p>
          </div>
        </div>
        <div className="w-full md:w-1/2 p-12 md:p-24 flex flex-col justify-center order-1 md:order-2">
          <span className="font-mono text-synapse text-body2 mb-4 font-medium">SENSING ARCHITECTURE</span>
          <h2 className="font-serif text-h2 md:text-h1 mb-8">Molecular Access.</h2>
          <p className="font-sans text-white/60 text-body1 mb-8 max-w-md font-medium">
            We do not guess using light (Optical PPG). We measure using chemistry (Electrochemical Sensing).
            Utilizing Janus Membrane Technology to achieve unidirectional flow.
          </p>
          <div className="border border-white/10 p-6 rounded-sm bg-white/5">
            <p className="font-mono text-body2 text-white uppercase tracking-widest font-medium">Target Biomarkers</p>
            <div className="mt-4 flex gap-4">
              <span className="bg-synapse/10 text-synapse px-3 py-1 rounded-sm text-body2 font-mono font-medium">LACTATE</span>
              <span className="bg-synapse/10 text-synapse px-3 py-1 rounded-sm text-body2 font-mono font-medium">SODIUM</span>
              <span className="bg-synapse/10 text-synapse px-3 py-1 rounded-sm text-body2 font-mono font-medium">POTASSIUM</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureStack;
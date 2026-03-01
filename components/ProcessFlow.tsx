/* eslint-disable react-hooks/purity */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Droplets, Wind, Zap, Activity, BrainCircuit } from 'lucide-react';

const steps = [
  {
    id: 0,
    icon: Droplets,
    title: "Sweat Capture",
    subtitle: "Differential Wettability",
    body: "The interface uses a specialized hydrophilic polyester mesh. It bypasses the skin's surface tension, capturing perspiration instantly without mechanical suction or airtight seals."
  },
  {
    id: 1,
    icon: Wind,
    title: "Microfluidics",
    subtitle: "Passive Transport",
    body: "Capillary action channels transport the sample to the sensor array. The channel geometry forces unidirectional flow, ensuring fresh sample delivery and preventing backflow contamination."
  },
  {
    id: 2,
    icon: Zap,
    title: "Redox Activity",
    subtitle: "Catalytic Oxidation",
    body: "At the electrode surface, engineered enzymes catalyze the breakdown of lactate. This oxidation event releases electrons, generating a measurable current directly proportional to concentration."
  },
  {
    id: 3,
    icon: Activity,
    title: "Signal Analysis",
    subtitle: "Impedance & Amperometry",
    body: "The onboard potentiostat measures the generated current while simultaneously checking impedance to verify sensor contact quality and skin hydration levels, rejecting noise."
  },
  {
    id: 4,
    icon: BrainCircuit,
    title: "Risk Prediction",
    subtitle: "CatBoost Inference",
    body: "ML algorithms process the multi-modal signal inputs, filtering motion artifacts and mapping the biochemical data to your personalized risk baseline to forecast physiological drift."
  }
];

// --- Visual Components for the Right Panel ---

const CaptureVisual = () => (
  <div className="w-full h-full relative flex items-center justify-center">
    <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 gap-2 opacity-20">
      {Array.from({ length: 36 }).map((_, i) => (
        <div key={i} className="border border-electro/30 rounded-sm" />
      ))}
    </div>
    <div className="relative z-10 grid grid-cols-4 grid-rows-4 gap-4">
      {Array.from({ length: 16 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: i * 0.05, type: "spring", stiffness: 200 }}
          className="w-12 h-12 bg-electro/10 border border-electro rounded-sm flex items-center justify-center shadow-[0_0_15px_rgba(70,179,235,0.2)]"
        >
          <div className="w-2 h-2 bg-electro rounded-full" />
        </motion.div>
      ))}
    </div>
  </div>
);

const FluidicsVisual = () => (
  <div className="w-full h-full relative flex items-center justify-center overflow-hidden">
    {/* Channels */}
    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-24 border-y border-white/10 flex flex-col justify-between py-2">
      {[1, 2, 3].map(i => (
        <div key={i} className="w-full h-[1px] bg-white/5" />
      ))}
    </div>

    {/* Flowing Particles */}
    {Array.from({ length: 20 }).map((_, i) => (
      <motion.div
        key={i}
        className="absolute h-1 w-8 bg-gradient-to-r from-transparent to-electro rounded-full"
        initial={{ x: -200, y: (Math.random() * 80) - 40, opacity: 0 }}
        animate={{ x: 600, opacity: [0, 1, 0] }}
        transition={{
          duration: 2 + Math.random(),
          repeat: Infinity,
          delay: Math.random() * 2,
          ease: "linear"
        }}
      />
    ))}
  </div>
);

const RedoxVisual = () => (
  <div className="w-full h-full relative flex items-center justify-center">
    <div className="relative w-64 h-64">
      {/* Orbitals */}
      {[0, 60, 120].map((deg, i) => (
        <motion.div
          key={i}
          className="absolute inset-0 border border-electro/20 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 10 + i * 2, repeat: Infinity, ease: "linear" }}
          style={{ rotate: deg }}
        />
      ))}
      {/* Core Reaction */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-24 h-24 bg-electro/20 blur-xl rounded-full"
        />
        <div className="w-4 h-4 bg-white rounded-full shadow-[0_0_30px_rgba(255,255,255,0.8)] z-10" />
        {/* Electrons */}
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-synapse rounded-full"
            animate={{
              x: Math.cos(i) * 60,
              y: Math.sin(i) * 60,
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0]
            }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </div>
    </div>
  </div>
);

const AnalysisVisual = () => (
  <div className="w-full h-full relative flex items-center justify-center px-12">
    <div className="w-full h-32 flex items-end justify-between gap-1">
      {Array.from({ length: 24 }).map((_, i) => (
        <motion.div
          key={i}
          className="w-full bg-electro/80 rounded-sm"
          animate={{ height: ["10%", `${Math.random() * 90 + 10}%`, "10%"] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.05, ease: "easeInOut" }}
        />
      ))}
    </div>
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className="w-full h-[1px] bg-white/20" />
    </div>
  </div>
);

const PredictionVisual = () => (
  <div className="w-full h-full relative flex items-center justify-center">
    <div className="relative w-72 h-72 border border-white/10 rounded-full flex items-center justify-center">
      <motion.div
        className="absolute inset-2 border-2 border-t-electro border-r-electro border-b-transparent border-l-transparent rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      />
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-h1 font-mono font-light text-white mb-2"
        >
          98.4<span className="text-body1 text-white/50 font-medium">%</span>
        </motion.div>
        <div className="text-body2 font-mono text-electro tracking-widest uppercase font-medium">Confidence</div>
      </div>
    </div>
  </div>
);

const VisualContainer = ({ activeStep }: { activeStep: number }) => {
  return (
    <div className="w-full h-full bg-abyss rounded-sm relative overflow-hidden border border-white/5 shadow-2xl">
      {/* Background Grid */}
      <div className="absolute inset-0 z-0 opacity-[0.03]"
        style={{ backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)', backgroundSize: '50px 50px' }}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.4 }}
          className="w-full h-full absolute inset-0"
        >
          {activeStep === 0 && <CaptureVisual />}
          {activeStep === 1 && <FluidicsVisual />}
          {activeStep === 2 && <RedoxVisual />}
          {activeStep === 3 && <AnalysisVisual />}
          {activeStep === 4 && <PredictionVisual />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

// --- Main Component ---

const ProcessFlow: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="bg-cosmos py-32 px-6 md:px-12 min-h-screen flex flex-col justify-center text-white relative z-10">
      <div className="max-w-[90rem] mx-auto w-full">

        {/* Header */}
        <div className="mb-24">
          <span className="font-mono text-electro text-body2 uppercase tracking-widest mb-4 block font-medium">System Architecture</span>
          <h2 className="font-sans font-semibold text-h2 md:text-h1 tracking-tight text-white">
            Process Logic.
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 h-auto lg:h-[600px]">

          {/* Left: Controls / List */}
          <div className="w-full lg:w-4/12 flex flex-col justify-between py-4">
            <div className="flex flex-col gap-4">
              {steps.map((step, index) => {
                const isActive = activeStep === index;
                return (
                  <div key={step.id} className="relative">
                    <button
                      onClick={() => setActiveStep(index)}
                      className={`
                          w-full text-left p-6 flex flex-col gap-4
                          transition-all duration-300 rounded-sm border
                          ${isActive
                          ? 'bg-white/5 border-electro shadow-[0_0_20px_rgba(70,179,235,0.1)]'
                          : 'bg-transparent border-white/10 hover:border-white/30 hover:bg-white/5'}
                        `}
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-4">
                          <div className={`p-2 rounded-sm ${isActive ? 'bg-electro text-cosmos' : 'bg-white/10 text-white/70'}`}>
                            <step.icon size={20} strokeWidth={1.5} />
                          </div>
                          <span className={`font-sans font-medium text-body1 ${isActive ? 'text-white' : 'text-white/60'}`}>
                            {step.title}
                          </span>
                        </div>
                        <span className={`transition-transform duration-300 ${isActive ? 'rotate-180 text-electro' : 'text-white/40'}`}>
                          {isActive ? <Minus size={16} /> : <Plus size={16} />}
                        </span>
                      </div>

                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="pt-2 pl-[52px]">
                              <p className="font-sans text-body2 text-white/70 font-medium">
                                {step.body}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Visual Showcase */}
          <div className="w-full lg:w-8/12 h-[50vh] lg:h-full sticky top-32">
            <VisualContainer activeStep={activeStep} />
          </div>

        </div>
      </div>
    </section>
  );
};

export default ProcessFlow;
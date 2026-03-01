import React, { useState } from 'react';
import { Activity, Zap, Wind } from 'lucide-react';

interface CardProps {
  icon: React.ReactNode;
  title: string;
  body: string;
  index: number;
  hoveredIndex: number | null;
  setHoveredIndex: (index: number | null) => void;
}

const Card: React.FC<CardProps> = ({ icon, title, body, index, hoveredIndex, setHoveredIndex }) => {
  const isBlurred = hoveredIndex !== null && hoveredIndex !== index;
  const isHovered = hoveredIndex === index;

  return (
    <div 
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={() => setHoveredIndex(null)}
      className={`
        bg-white p-8 md:p-10 flex flex-col justify-between h-[500px] relative overflow-hidden 
        transition-all duration-500 ease-out cursor-default
        ${isBlurred ? 'opacity-40 blur-[2px] scale-[0.98]' : 'opacity-100 blur-0 scale-100'}
      `}
    >
      {/* Blue Line Animation (The Electro Trace) - Top to Bottom */}
      <div 
        className={`absolute left-0 top-0 w-3 h-full bg-electro transform transition-transform duration-500 ease-out origin-top ${isHovered ? 'scale-y-100' : 'scale-y-0'}`}
      />

      {/* Icon */}
      <div className="text-cosmos mb-6 pl-4 relative z-10">
        {React.cloneElement(icon as React.ReactElement<any>, { size: 48, strokeWidth: 1.5 })}
      </div>
      
      {/* Content */}
      <div className="mt-auto pl-4 relative z-10 flex flex-col justify-end">
          <h3 className="font-sans font-medium text-h2 text-cosmos leading-tight tracking-tight mb-4">
            {title}
          </h3>
          
          <div className={`overflow-hidden transition-all duration-500 ease-out ${isHovered ? 'max-h-48 opacity-100 translate-y-0' : 'max-h-0 opacity-0 translate-y-4'}`}>
              <p className="font-sans text-body1 text-cosmos/70 pb-2 font-medium">
                {body}
              </p>
          </div>
      </div>
    </div>
  );
};

const ZeroMaintenance: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="bg-noise py-32 px-6 md:px-12">
      <div className="max-w-[90rem] mx-auto">
        <div className="mb-20 w-full flex justify-center text-center">
          <h2 className="font-sans font-semibold text-h2 md:text-h1 text-cosmos mb-6 tracking-tight max-w-3xl">
            Zero-Maintenance Architecture.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card 
            index={0}
            hoveredIndex={hoveredIndex}
            setHoveredIndex={setHoveredIndex}
            icon={<Activity />}
            title="Adaptive Fidelity."
            body="The sensor logic distinguishes between the acute perspiration of high-exertion training and the low-volume output of sedentary work. It automatically adjusts sampling rates in real-time."
          />
          <Card 
            index={1}
            hoveredIndex={hoveredIndex}
            setHoveredIndex={setHoveredIndex}
            icon={<Zap />}
            title="Metabolic Power."
            body="Energy autonomy is achieved through a catalytic oxidation layer that harvests power directly from lactate. Eliminating the primary cause of data fragmentation: the need to recharge."
          />
          <Card 
            index={2}
            hoveredIndex={hoveredIndex}
            setHoveredIndex={setHoveredIndex}
            icon={<Wind />}
            title="Passive Profile."
            body="Engineered to disappear. With no haptics, screens, or vibration motors, the polyimide architecture eliminates notification fatigue. Prioritizing data continuity over user engagement."
          />
        </div>
      </div>
    </section>
  );
};

export default ZeroMaintenance;

import React from 'react';

interface InstallStepProps {
  number: number;
  title: string;
  description: string;
  delay?: number;
}

const InstallStep: React.FC<InstallStepProps> = ({ number, title, description, delay = 0 }) => {
  return (
    <div 
      className="bg-glass-gradient backdrop-blur-sm border border-white/10 p-6 rounded-xl shadow-glass-sm relative reveal"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="bg-blue-500/20 text-blue-400 w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -left-3 text-lg font-light">
        {number}
      </div>
      
      <h3 className="text-lg font-light mb-2 mt-2">{title}</h3>
      <p className="text-sm text-white/70">{description}</p>
    </div>
  );
};

export default InstallStep;

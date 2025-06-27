
import React from 'react';
import { AudioLines } from 'lucide-react';

export const AudioVisualizer: React.FC = () => {
  return (
    <div className="w-full flex justify-center mt-10">
      <AudioLines className="w-24 h-10 text-blue-400/60" />
    </div>
  );
};

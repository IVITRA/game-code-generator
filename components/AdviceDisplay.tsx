import React from 'react';

interface AdviceDisplayProps {
  advice: string;
}

const AdviceDisplay: React.FC<AdviceDisplayProps> = ({ advice }) => {
  return (
    <div className="relative bg-gray-900/70 rounded-b-xl p-6">
      <div 
        className="prose prose-sm prose-invert max-w-none text-gray-300 whitespace-pre-wrap leading-relaxed"
        dangerouslySetInnerHTML={{ __html: advice.replace(/## (.*)/g, '<h2 class="text-lg font-bold text-blue-300 mt-4 mb-2">$1</h2>').replace(/\* (.*)/g, '<li class="ml-4">$1</li>') }}
      />
    </div>
  );
};

export default AdviceDisplay;
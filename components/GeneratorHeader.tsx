import React from 'react';

interface GeneratorHeaderProps {
  title: string;
  description: string;
  example: string;
}

const GeneratorHeader: React.FC<GeneratorHeaderProps> = ({ title, description, example }) => {
  return (
    <div className="text-center max-w-3xl mx-auto mb-8">
      <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
        {title}
      </h2>
      <p className="mt-3 text-md text-gray-400 leading-relaxed">
        {description}
      </p>
      <div className="mt-4 text-sm bg-gray-800/50 border border-gray-700/60 rounded-lg px-3 py-2 inline-block">
        <span className="text-gray-500 font-medium" dir="ltr">{example}</span>
      </div>
    </div>
  );
};

export default GeneratorHeader;

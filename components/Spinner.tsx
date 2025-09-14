import React from 'react';

interface SpinnerProps {
    text?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ text }) => {
  return (
    <div className="flex flex-col justify-center items-center text-center">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-400"></div>
      {text && <p className="text-gray-400 mt-4 text-sm">{text}</p>}
    </div>
  );
};

export default Spinner;
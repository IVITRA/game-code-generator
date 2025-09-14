import React from 'react';

interface OptionSelectorProps<T extends string> {
  label: string;
  options: T[];
  selectedOption: T;
  onSelect: (option: T) => void;
}

const OptionSelector = <T extends string>({ label, options, selectedOption, onSelect }: OptionSelectorProps<T>) => {
  return (
    <div className="mb-6">
      <label className="block text-md font-medium text-gray-300 mb-3">{label}</label>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => onSelect(option)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 ${
              selectedOption === option
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                : 'bg-gray-700/60 text-gray-300 hover:bg-gray-700'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default OptionSelector;
import React from 'react';
import CheckIcon from './icons/CheckIcon';

interface CheckboxOption {
  value: string;
  label: string;
}

interface CheckboxGroupProps {
  label: string;
  options: CheckboxOption[];
  selected: string[];
  onChange: (selected: string[]) => void;
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({ label, options, selected, onChange }) => {
  const handleToggle = (optionValue: string) => {
    const newSelected = selected.includes(optionValue)
      ? selected.filter((item) => item !== optionValue)
      : [...selected, optionValue];
    onChange(newSelected);
  };

  return (
    <div className="mb-6">
      <label className="block text-md font-medium text-gray-300 mb-3">{label}</label>
      <div className="grid grid-cols-2 gap-3">
        {options.map((option) => {
          const isSelected = selected.includes(option.value);
          return (
            <button
              key={option.value}
              onClick={() => handleToggle(option.value)}
              role="checkbox"
              aria-checked={isSelected}
              className={`flex items-center gap-3 p-3 rounded-lg text-sm font-semibold transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 text-left ${
                isSelected
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                  : 'bg-gray-700/60 text-gray-300 hover:bg-gray-700'
              }`}
            >
              <div
                className={`flex items-center justify-center w-5 h-5 rounded border-2 transition-all duration-200 ${
                  isSelected ? 'bg-white border-white' : 'border-gray-400 bg-transparent'
                }`}
              >
                {isSelected && <CheckIcon className="w-4 h-4 text-blue-600" />}
              </div>
              <span className="flex-1">{option.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CheckboxGroup;

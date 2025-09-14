import React from 'react';

interface ToggleSwitchProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ label, checked, onChange }) => {
  const handleToggle = () => {
    onChange(!checked);
  };

  return (
    <div className="flex items-center justify-between my-6">
      <label htmlFor="toggle-switch" className="text-md font-medium text-gray-300">
        {label}
      </label>
      <button
        id="toggle-switch"
        role="switch"
        aria-checked={checked}
        onClick={handleToggle}
        className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500 ${
          checked ? 'bg-blue-600' : 'bg-gray-600'
        }`}
      >
        <span
          className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-300 ease-in-out ${
            checked 
              ? 'translate-x-6 rtl:-translate-x-6' 
              : 'translate-x-1 rtl:-translate-x-1'
          }`}
        />
      </button>
    </div>
  );
};

export default ToggleSwitch;
import React, { useState } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import CodeSnippet from './CodeSnippet';
import AdviceDisplay from './AdviceDisplay';

interface OutputDisplayProps {
  code: string;
  advice?: string;
  language?: string;
}

const OutputDisplay: React.FC<OutputDisplayProps> = ({ code, advice, language }) => {
  const [activeTab, setActiveTab] = useState<'code' | 'advice'>('code');
  const { t } = useTranslation();

  const hasAdvice = advice && advice.trim().length > 0;

  return (
    <div className="w-full border border-gray-700 rounded-xl overflow-hidden">
      <div className="flex bg-gray-800/80 border-b border-gray-700">
        <TabButton
          label={t('tabCode')}
          isActive={activeTab === 'code'}
          onClick={() => setActiveTab('code')}
        />
        {hasAdvice && (
          <TabButton
            label={t('tabAdvice')}
            isActive={activeTab === 'advice'}
            onClick={() => setActiveTab('advice')}
          />
        )}
      </div>
      <div>
        {activeTab === 'code' && <CodeSnippet code={code} language={language} />}
        {activeTab === 'advice' && hasAdvice && <AdviceDisplay advice={advice} />}
      </div>
    </div>
  );
};

interface TabButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const TabButton: React.FC<TabButtonProps> = ({ label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 text-sm font-semibold transition-colors duration-200 relative ${
      isActive ? 'text-white' : 'text-gray-400 hover:text-white'
    }`}
  >
    {label}
    {isActive && (
      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 rounded-full"></span>
    )}
  </button>
);

export default OutputDisplay;

import React from 'react';
import { useTranslation } from '../hooks/useTranslation';
import LanguageSwitcher from './LanguageSwitcher';

const Header: React.FC = () => {
  const { t } = useTranslation();

  return (
    <header className="py-6 border-b border-gray-500/10 mb-8">
       <div className="container mx-auto flex justify-between items-center">
        <div className="text-left">
            <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                {t('appTitle')}
            </h1>
            <p className="mt-2 text-md text-gray-400">
                {t('appDescription')}
            </p>
        </div>
        <LanguageSwitcher />
      </div>
    </header>
  );
};

export default Header;
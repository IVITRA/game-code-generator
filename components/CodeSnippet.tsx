import React, { useState, useEffect } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import CopyIcon from './icons/CopyIcon';
import CheckIcon from './icons/CheckIcon';

interface CodeSnippetProps {
  code: string;
  language?: string;
}

const CodeSnippet: React.FC<CodeSnippetProps> = ({ code, language = 'csharp' }) => {
  const [isCopied, setIsCopied] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => setIsCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isCopied]);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setIsCopied(true);
  };

  return (
    <div className="relative bg-gray-900/70 rounded-b-xl group">
      <div className="flex justify-between items-center px-4 py-2 bg-gray-800/80">
        <span className="text-xs font-semibold text-gray-400 uppercase">{language}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors"
          aria-label={t('copyCode')}
        >
          {isCopied ? (
            <>
              <CheckIcon className="w-4 h-4 text-green-400" />
              <span>{t('copied')}</span>
            </>
          ) : (
            <>
              <CopyIcon className="w-4 h-4" />
              <span>{t('copyCode')}</span>
            </>
          )}
        </button>
      </div>
      <pre className="p-4 text-left text-sm whitespace-pre-wrap break-words" dir="ltr">
        <code>{code}</code>
      </pre>
    </div>
  );
};

export default CodeSnippet;
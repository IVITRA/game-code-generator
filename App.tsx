import React, { useState, useCallback, useMemo, useRef } from 'react';
import Header from './components/Header';
import CategoryCard from './components/CategoryCard';
import OptionSelector from './components/OptionSelector';
import Spinner from './components/Spinner';
import ToggleSwitch from './components/ToggleSwitch';
import OutputDisplay from './components/OutputDisplay';
import { Category, Dimension, Engine, Genre, AllOptions, MovementOptions, TipsOptions, ProtectionOptions, ProtectionType, UiManagerOptions, UiComponent } from './types';
import { generateGameCode, generateGameTips } from './services/geminiService';
import { useTranslation } from './hooks/useTranslation';
import CodeIcon from './components/icons/CodeIcon';
import ShieldIcon from './components/icons/ShieldIcon';
import InventoryIcon from './components/icons/InventoryIcon';
import UIIcon from './components/icons/UIIcon';
import LightbulbIcon from './components/icons/LightbulbIcon';
import AdviceDisplay from './components/AdviceDisplay';
import GeneratorHeader from './components/GeneratorHeader';
import CheckboxGroup from './components/CheckboxGroup';


const App: React.FC = () => {
  const { t, language, dir } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const [userOptions, setUserOptions] = useState({
    engine: Engine.UNITY,
    dimension: Dimension.THREE_D,
    protectionType: ProtectionType.SPEED_HACK,
    uiComponents: [UiComponent.HEALTH_BAR, UiComponent.SCORE_TEXT],
    genre: Genre.PLATFORMER,
    customPrompt: '',
    gameDescription: '',
    includeComments: true,
  });

  const [generatedCode, setGeneratedCode] = useState<string>('');
  const [generatedAdvice, setGeneratedAdvice] = useState<string | undefined>(undefined);
  const [generatedTips, setGeneratedTips] = useState<string>('');

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingStatus, setLoadingStatus] = useState<string>('');
  const [error, setError] = useState<string>('');
  
  const outputRef = useRef<HTMLDivElement>(null);

  const handleOptionChange = (key: keyof typeof userOptions, value: any) => {
    setUserOptions(prev => ({ ...prev, [key]: value }));
  };
  
  const resetOutput = () => {
      setGeneratedCode('');
      setGeneratedAdvice(undefined);
      setGeneratedTips('');
      setError('');
  };

  const scrollToOutput = () => {
      if (outputRef.current && window.innerWidth < 1024) { // lg breakpoint
          setTimeout(() => {
              outputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 100);
      }
  };

  const handleGenerateCode = useCallback(async () => {
    if (!selectedCategory || selectedCategory === Category.TIPS) return;
    
    setIsLoading(true);
    resetOutput();
    scrollToOutput();

    try {
        let currentOptions: AllOptions;

        switch(selectedCategory) {
            case Category.MOVEMENT:
                currentOptions = { engine: userOptions.engine, dimension: userOptions.dimension } as MovementOptions;
                break;
            case Category.PROTECTION:
                currentOptions = { engine: userOptions.engine, protectionType: userOptions.protectionType } as ProtectionOptions;
                break;
            case Category.UI_MANAGER:
                 if (userOptions.uiComponents.length === 0) {
                    setError(t('errorUiManagerComponents'));
                    setIsLoading(false);
                    return;
                }
                currentOptions = { engine: userOptions.engine, components: userOptions.uiComponents } as UiManagerOptions;
                break;
            default:
                currentOptions = { engine: userOptions.engine };
        }
        
        const result = await generateGameCode(selectedCategory, currentOptions, userOptions.customPrompt, language, userOptions.includeComments, (status) => setLoadingStatus(t(status)));
        setGeneratedCode(result.code);
        setGeneratedAdvice(result.advice);
    } catch (err: any) {
        setError(t('errorOccurred'));
        console.error(err);
    } finally {
        setIsLoading(false);
        setLoadingStatus('');
    }
  }, [selectedCategory, userOptions, t, language]);

  const handleGenerateTips = useCallback(async () => {
    if (!userOptions.gameDescription.trim()) return;

    setIsLoading(true);
    resetOutput();
    scrollToOutput();

    try {
        const tipsOptions: TipsOptions = {
            engine: userOptions.engine,
            genre: userOptions.genre,
            description: userOptions.gameDescription,
        };
        const tips = await generateGameTips(tipsOptions, language, (status) => setLoadingStatus(t(status)));
        setGeneratedTips(tips);
    } catch (err: any) {
        setError(t('errorOccurredTips'));
        console.error(err);
    } finally {
        setIsLoading(false);
        setLoadingStatus('');
    }
  }, [userOptions, t, language]);

  const handleBack = () => {
    setSelectedCategory(null);
    resetOutput();
    setUserOptions(prev => ({ ...prev, customPrompt: '', gameDescription: '' }));
  };
  
  const langForSnippet = useMemo(() => {
    const lang = userOptions.engine.split(' ')[1].replace(/[()]/g, '').toLowerCase();
    if (lang === 'c#') return 'csharp';
    if (lang === 'c++') return 'cpp';
    return lang;
  }, [userOptions.engine]);

  const categoryIcons: Record<string, React.ReactNode> = {
    [Category.MOVEMENT]: <CodeIcon className="w-10 h-10" />,
    [Category.PROTECTION]: <ShieldIcon className="w-10 h-10" />,
    [Category.INVENTORY]: <InventoryIcon className="w-10 h-10" />,
    [Category.UI_MANAGER]: <UIIcon className="w-10 h-10" />,
    [Category.TIPS]: <LightbulbIcon className="w-10 h-10" />,
  };
  
  const protectionTypeOptions = useMemo(() => Object.values(ProtectionType).map(value => ({ value, label: t(`protectionType${value.replace(/\s/g, '')}`) })), [t]);
  const uiComponentOptions = useMemo(() => Object.values(UiComponent).map(value => ({ value, label: t(`uiComponent${value.replace(/\s/g, '')}`) })), [t]);

  const renderCategorySelection = () => (
     <div className="mt-10 animate-fade-in">
      <h2 className="text-2xl font-bold text-center text-gray-300 mb-8">{t('selectCategory')}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
        {Object.values(Category).map(cat => (
          <CategoryCard
            key={cat}
            icon={categoryIcons[cat]}
            title={t(`${cat.toLowerCase()}Title`)}
            description={t(`${cat.toLowerCase()}Description`)}
            onClick={() => setSelectedCategory(cat)}
          />
        ))}
      </div>
    </div>
  );

  const BackButton = () => {
    const backButtonArrow = dir === 'rtl' ? '→' : '←';
    return <button onClick={handleBack} className="mb-6 text-blue-400 hover:text-blue-300 transition-colors font-semibold flex items-center gap-2">{backButtonArrow} {t('backToCategories')}</button>;
  }

  const renderCodeGenerator = () => (
    <div className="w-full max-w-6xl mx-auto animate-fade-in">
      <BackButton />
      {selectedCategory && (
        <GeneratorHeader 
          title={t(`${selectedCategory.toLowerCase()}Title`)}
          description={t(`${selectedCategory.toLowerCase()}HeaderDescription`)}
          example={t(`${selectedCategory.toLowerCase()}HeaderExample`)}
        />
      )}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mt-8">
        <div className="lg:sticky top-8 flex flex-col lg:max-h-[calc(100vh-4rem)] bg-gray-900/40 backdrop-blur-sm border border-gray-700/80 rounded-2xl">
          <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
            {selectedCategory === Category.MOVEMENT && (
              <OptionSelector<Dimension>
                label={t('selectDimensions')}
                options={Object.values(Dimension)}
                selectedOption={userOptions.dimension}
                onSelect={(dim) => handleOptionChange('dimension', dim)}
              />
            )}
            
            {selectedCategory === Category.PROTECTION && (
               <OptionSelector
                  label={t('selectProtectionType')}
                  options={protectionTypeOptions.map(o => o.value)}
                  selectedOption={userOptions.protectionType}
                  onSelect={(val) => handleOptionChange('protectionType', val)}
               />
            )}

            {selectedCategory === Category.UI_MANAGER && (
              <CheckboxGroup
                  label={t('uiManagerSelectComponents')}
                  options={uiComponentOptions}
                  selected={userOptions.uiComponents}
                  onChange={(val) => handleOptionChange('uiComponents', val)}
              />
            )}

            <OptionSelector<Engine>
              label={t('selectEngine')}
              options={Object.values(Engine)}
              selectedOption={userOptions.engine}
              onSelect={(eng) => handleOptionChange('engine', eng)}
            />
            
            <ToggleSwitch 
              label={t('includeCommentsLabel')}
              checked={userOptions.includeComments}
              onChange={(checked) => handleOptionChange('includeComments', checked)}
            />

            <div className="mt-6">
              <label htmlFor="custom-prompt" className="block text-md font-medium text-gray-300 mb-3">{t('customInstructionsLabel')}</label>
              <textarea
                id="custom-prompt"
                value={userOptions.customPrompt}
                onChange={(e) => handleOptionChange('customPrompt', e.target.value)}
                placeholder={t('customInstructionsPlaceholder')}
                className="w-full bg-gray-800/80 border border-gray-600 rounded-lg p-3 text-sm text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                rows={3}
              />
            </div>
          </div>
          <div className="p-6 border-t border-gray-700/80">
            <button
              onClick={handleGenerateCode}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 px-4 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
            >
              {isLoading ? t('generating') : t('generateCode')}
            </button>
          </div>
        </div>
        <div ref={outputRef} className="min-h-[400px] flex flex-col justify-center min-w-0">
          {isLoading && <Spinner text={loadingStatus}/>}
          {error && <p className="text-center text-red-400">{error}</p>}
          {generatedCode && !isLoading && (
            <OutputDisplay code={generatedCode} advice={generatedAdvice} language={langForSnippet} />
          )}
        </div>
      </div>
    </div>
  );

  const renderTipsGenerator = () => (
    <div className="w-full max-w-6xl mx-auto animate-fade-in">
        <BackButton />
        {selectedCategory && (
            <GeneratorHeader 
                title={t(`${selectedCategory.toLowerCase()}Title`)}
                description={t(`${selectedCategory.toLowerCase()}HeaderDescription`)}
                example={t(`${selectedCategory.toLowerCase()}HeaderExample`)}
            />
        )}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mt-8">
            <div className="lg:sticky top-8 flex flex-col lg:max-h-[calc(100vh-4rem)] bg-gray-900/40 backdrop-blur-sm border border-gray-700/80 rounded-2xl">
                <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
                  <OptionSelector<Engine>
                      label={t('selectEngine')}
                      options={Object.values(Engine)}
                      selectedOption={userOptions.engine}
                      onSelect={(eng) => handleOptionChange('engine', eng)}
                  />
                  <OptionSelector<Genre>
                      label={t('selectGenre')}
                      options={Object.values(Genre)}
                      selectedOption={userOptions.genre}
                      onSelect={(g) => handleOptionChange('genre', g)}
                  />
                  <div className="mt-6">
                      <label htmlFor="game-desc" className="block text-md font-medium text-gray-300 mb-3">{t('gameDescriptionLabel')}</label>
                      <textarea
                          id="game-desc"
                          value={userOptions.gameDescription}
                          onChange={(e) => handleOptionChange('gameDescription', e.target.value)}
                          placeholder={t('gameDescriptionPlaceholder')}
                          className="w-full bg-gray-800/80 border border-gray-600 rounded-lg p-3 text-sm text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                          rows={4}
                      />
                  </div>
                </div>
                <div className="p-6 border-t border-gray-700/80">
                  <button
                      onClick={handleGenerateTips}
                      disabled={isLoading || !userOptions.gameDescription.trim()}
                      className="w-full bg-gradient-to-r from-green-500 to-teal-600 text-white font-bold py-3 px-4 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
                  >
                      {isLoading ? t('generating') : t('getAdvice')}
                  </button>
                </div>
            </div>
            <div ref={outputRef} className="min-h-[400px] flex flex-col justify-center min-w-0">
                {isLoading && <Spinner text={loadingStatus} />}
                {error && <p className="text-center text-red-400">{error}</p>}
                {generatedTips && !isLoading && (
                    <AdviceDisplay advice={generatedTips} />
                )}
            </div>
        </div>
    </div>
  );

  const renderCurrentView = () => {
    if (selectedCategory === null) return renderCategorySelection();
    if (selectedCategory === Category.TIPS) return renderTipsGenerator();
    return renderCodeGenerator();
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <main className="container mx-auto">
        <Header />
        {renderCurrentView()}
      </main>
    </div>
  );
};

export default App;
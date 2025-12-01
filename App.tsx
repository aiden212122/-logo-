import React, { useState, useEffect } from 'react';
import { APP_NAME, APP_TAGLINE } from './constants';
import { SpaFormData, SpaStyle, GeneratedLogo } from './types';
import { analyzeBrandIdentity, generateLogoImage } from './services/geminiService';
import LogoForm from './components/LogoForm';
import LoadingState from './components/LoadingState';
import ResultView from './components/ResultView';

const App: React.FC = () => {
  const [hasApiKey, setHasApiKey] = useState<boolean>(false);
  const [formData, setFormData] = useState<SpaFormData>({
    storeName: '',
    subText: '',
    services: [],
    style: SpaStyle.TRADITIONAL,
    referenceImage: null,
    additionalRequirements: ''
  });

  const [loadingStage, setLoadingStage] = useState<'idle' | 'analyzing' | 'painting'>('idle');
  const [result, setResult] = useState<GeneratedLogo | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkKey = async () => {
      // 1. Check for AI Studio (Development Env)
      if (window.aistudio) {
        const hasKey = await window.aistudio.hasSelectedApiKey();
        setHasApiKey(hasKey);
      } 
      // 2. Check for Process Env (Vercel / Production Env)
      else if (process.env.API_KEY) {
        setHasApiKey(true);
      }
    };
    checkKey();
  }, []);

  const handleConnect = async () => {
    if (window.aistudio) {
      await window.aistudio.openSelectKey();
      setHasApiKey(true);
    }
  };

  const handleSubmit = async () => {
    if (!formData.storeName) return;

    setError(null);
    setLoadingStage('analyzing');
    setResult(null);

    try {
      const analysis = await analyzeBrandIdentity(formData);
      setLoadingStage('painting');
      const base64Image = await generateLogoImage(formData, analysis);

      setResult({
        imageUrl: base64Image,
        promptUsed: '', 
        analysis: analysis
      });

      setLoadingStage('idle');
    } catch (err: any) {
      console.error(err);
      const errorMessage = err.message || "An unexpected error occurred.";
      setError(errorMessage);
      setLoadingStage('idle');

      if (errorMessage.includes("Requested entity was not found") || errorMessage.includes("403")) {
        // If it's a permission error, keep hasApiKey true on Vercel (user needs to fix Env Var),
        // but set it false on AI Studio so they can reconnect.
        if (window.aistudio) {
          setHasApiKey(false);
        }
        setError("API Key 验证失败或权限不足。请检查您的配置。");
      }
    }
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!hasApiKey) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-[#EBEAE5]">
        <div className="bg-white p-12 max-w-md w-full shadow-2xl shadow-stone-900/10 border-t-4 border-spa-800 text-center">
          <div className="w-16 h-16 bg-spa-800 text-white mx-auto flex items-center justify-center text-2xl font-serif font-bold mb-6">Z</div>
          <h1 className="text-3xl font-serif text-stone-900 mb-2">{APP_NAME}</h1>
          <p className="text-stone-500 mb-8">{APP_TAGLINE}</p>
          
          {window.aistudio ? (
            <button
              onClick={handleConnect}
              className="w-full py-4 px-6 bg-spa-800 text-white font-medium hover:bg-spa-900 transition-colors shadow-lg"
            >
              连接 Google Cloud
            </button>
          ) : (
            <div className="text-left bg-stone-50 p-4 rounded border border-stone-200 text-sm text-stone-600">
              <p className="font-bold mb-2 text-spa-800">未检测到 API Key</p>
              <p className="mb-2">如果您已部署到 Vercel，请前往后台设置：</p>
              <ul className="list-disc pl-4 space-y-1">
                <li>进入 <strong>Settings</strong> &gt; <strong>Environment Variables</strong></li>
                <li>Key: <code>VITE_API_KEY</code></li>
                <li>Value: <code>您的 Gemini API Key</code></li>
              </ul>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#EBEAE5] text-stone-800 font-sans selection:bg-gold-200 selection:text-spa-900 flex flex-col items-center py-8 sm:py-12">
      
      {/* Decorative Top Bar */}
      <div className="fixed top-0 left-0 w-full h-2 bg-spa-800 z-50"></div>

      <main className="w-full max-w-7xl px-4 sm:px-6 z-10">
        
        {/* Error Notification */}
        {error && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-500 text-red-700 p-4 shadow-sm" role="alert">
            <p className="font-bold">Error</p>
            <p>{error}</p>
          </div>
        )}

        {loadingStage !== 'idle' ? (
          <div className="bg-white min-h-[600px] shadow-2xl shadow-stone-400/20 flex items-center justify-center">
            <LoadingState stage={loadingStage} />
          </div>
        ) : result ? (
          <ResultView logoData={result} onReset={handleReset} />
        ) : (
          <LogoForm 
            formData={formData} 
            setFormData={setFormData} 
            onSubmit={handleSubmit}
            isSubmitting={false}
          />
        )}
      </main>

      <footer className="mt-12 text-stone-400 text-xs tracking-widest uppercase font-medium">
        Powered by Google Gemini 3 Pro
      </footer>
    </div>
  );
};

export default App;
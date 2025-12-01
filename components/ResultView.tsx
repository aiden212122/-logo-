import React from 'react';
import { GeneratedLogo } from '../types';

interface ResultViewProps {
  logoData: GeneratedLogo;
  onReset: () => void;
}

const ResultView: React.FC<ResultViewProps> = ({ logoData, onReset }) => {
  return (
    <div className="w-full max-w-6xl mx-auto animate-fade-in-up pb-10">
      
      {/* Top Action Bar */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-serif text-spa-900">设计方案完成</h2>
        <button 
           onClick={onReset}
           className="px-6 py-2 rounded-full border border-spa-300 text-spa-600 font-medium hover:bg-white hover:border-spa-400 transition flex items-center gap-2 bg-white/50 backdrop-blur-sm"
         >
           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.058M20.5 18H21a1 1 0 01-1 1h-1M21 4v16a2 2 0 01-2 2H5a2 2 0 01-2-2V4a2 2 0 012-2h14a2 2 0 012 2z"></path></svg>
           开始新设计
         </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        
        {/* Left Column: The Logo (3/5 width) */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white rounded-3xl shadow-2xl shadow-spa-900/10 overflow-hidden border border-spa-100 relative group">
             {/* Mockup Presentation Layer */}
             <div className="relative w-full aspect-square flex items-center justify-center bg-[#fcfcfc]">
                {/* Subtle Grain Texture */}
                <div 
                  className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                  style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")'}}
                ></div>
                
                {/* Logo Image */}
                <img 
                  src={logoData.imageUrl} 
                  alt="生成的 Logo" 
                  className="max-w-[80%] max-h-[80%] object-contain drop-shadow-2xl transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Floating Action Buttons */}
                <div className="absolute bottom-6 right-6 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                   <a 
                     href={logoData.imageUrl} 
                     download="zenlogo-spa-design.png"
                     className="bg-spa-800 text-white px-5 py-3 rounded-xl shadow-lg hover:bg-spa-900 transition flex items-center gap-2 font-medium"
                   >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                      下载原图
                   </a>
                </div>
             </div>
          </div>
          <div className="flex justify-center">
             <p className="text-spa-400 text-sm flex items-center gap-2">
               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
               AI 原创设计 • 2048x2048px 高清矢量级渲染
             </p>
          </div>
        </div>

        {/* Right Column: Brand DNA (2/5 width) */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-lg border border-white p-8 h-full">
            <h4 className="font-serif text-2xl text-spa-900 mb-6 flex items-center gap-3">
              <span className="w-1 h-8 bg-gold-500 rounded-full"></span>
              品牌基因解码
            </h4>
            
            <div className="space-y-8">
              
              {/* Visual Symbols */}
              <div className="space-y-3">
                <span className="text-xs font-bold text-spa-400 uppercase tracking-widest">核心视觉符号</span>
                <div className="flex flex-wrap gap-2">
                  {logoData.analysis.visualSymbols.map((s, i) => (
                    <span key={i} className="bg-spa-50 text-spa-700 px-4 py-2 rounded-lg text-sm border border-spa-100 font-medium">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Color Palette */}
              <div className="space-y-3">
                 <span className="text-xs font-bold text-spa-400 uppercase tracking-widest">配色方案</span>
                 <div className="bg-gradient-to-r from-spa-50 to-white p-4 rounded-xl border border-spa-100">
                    <p className="text-spa-800 font-serif italic text-lg mb-1">{logoData.analysis.colorPalette}</p>
                 </div>
              </div>

              {/* Design Reasoning */}
              <div className="space-y-3">
                <span className="text-xs font-bold text-spa-400 uppercase tracking-widest">设计灵感阐述</span>
                <div className="text-spa-600 text-sm leading-7 space-y-2 bg-spa-50/50 p-5 rounded-xl border border-spa-100/50">
                  <p>{logoData.analysis.designReasoning}</p>
                </div>
              </div>
              
              {/* Internal Info */}
              <div className="pt-4 border-t border-spa-100">
                 <p className="text-xs text-spa-300">Internal Code: {logoData.analysis.englishTranslation}</p>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ResultView;
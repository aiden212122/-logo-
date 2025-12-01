import React from 'react';

interface LoadingStateProps {
  stage: 'analyzing' | 'painting';
}

const LoadingState: React.FC<LoadingStateProps> = ({ stage }) => {
  return (
    <div className="flex flex-col items-center justify-center py-24 animate-fade-in relative">
      
      {/* Background Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-96 h-96 bg-white rounded-full filter blur-3xl opacity-60"></div>
      </div>

      <div className="relative w-40 h-40 mb-10 z-10">
        {/* Outer Ripple 1 */}
        <div className="absolute inset-0 border border-spa-200/50 rounded-full animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
        {/* Outer Ripple 2 */}
        <div className="absolute inset-4 border border-spa-300/50 rounded-full animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite_1.5s]"></div>
        
        {/* Rotating Rings */}
        <div className="absolute inset-0 border-2 border-transparent border-t-spa-300 border-l-spa-200 rounded-full animate-spin-slow"></div>
        <div className="absolute inset-3 border-2 border-transparent border-b-gold-400 border-r-gold-200 rounded-full animate-[spin_4s_linear_infinite_reverse]"></div>

        {/* Center Icon */}
        <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg border border-spa-50">
                {stage === 'analyzing' ? (
                     <div className="text-spa-500 animate-pulse">
                        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
                     </div>
                ) : (
                    <div className="text-gold-500 animate-bounce">
                        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                    </div>
                )}
            </div>
        </div>
      </div>
      
      <div className="text-center space-y-3 z-10 max-w-lg px-4">
        <h3 className="text-3xl font-serif text-spa-800 tracking-wide">
          {stage === 'analyzing' ? '正在解构品牌基因' : '正在绘制视觉方案'}
        </h3>
        <p className="text-spa-500 font-light text-lg">
          {stage === 'analyzing' 
            ? 'AI 正在分析行业特征符号与专属配色方案...' 
            : 'Gemini 3 Pro 正在生成 2K 高清矢量质感图像...'}
        </p>
        
        {/* Progress Bar Mockup */}
        <div className="w-full h-1 bg-spa-100 rounded-full mt-6 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-spa-400 to-gold-400 w-1/2 animate-[shimmer_2s_infinite_linear] relative">
             <div className="absolute inset-0 bg-white/30 skew-x-12 transform -translate-x-full animate-[shimmer_1.5s_infinite]"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingState;
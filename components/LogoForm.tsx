import React, { useRef } from 'react';
import { SpaFormData, SpaStyle } from '../types';
import { COMMON_SERVICES, STYLE_OPTIONS } from '../constants';

interface LogoFormProps {
  formData: SpaFormData;
  setFormData: React.Dispatch<React.SetStateAction<SpaFormData>>;
  onSubmit: () => void;
  isSubmitting: boolean;
}

const LogoForm: React.FC<LogoFormProps> = ({ formData, setFormData, onSubmit, isSubmitting }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleService = (serviceId: string) => {
    setFormData(prev => {
      const exists = prev.services.includes(serviceId);
      if (exists) {
        return { ...prev, services: prev.services.filter(id => id !== serviceId) };
      } else {
        if (prev.services.length >= 3) return prev; 
        return { ...prev, services: [...prev.services, serviceId] };
      }
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, referenceImage: e.target.files![0] }));
    }
  };

  return (
    <div className="bg-white shadow-2xl shadow-stone-400/20 overflow-hidden min-h-[800px] flex flex-col md:flex-row animate-fade-in relative">
      
      {/* Left Column: Context & Progress (Sticky on Desktop) */}
      <div className="md:w-1/3 bg-spa-900 text-white p-10 md:p-14 flex flex-col justify-between relative overflow-hidden">
        {/* Abstract Deco */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-[0.03] rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold-500 opacity-[0.05] rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
        
        <div className="relative z-10">
          <h2 className="text-gold-400 text-sm tracking-[0.2em] uppercase font-bold mb-4">Design System</h2>
          <h1 className="text-4xl md:text-5xl font-serif leading-tight mb-6">
            构建您的<br/>
            <span className="italic text-gold-200">品牌美学</span>
          </h1>
          <p className="text-spa-200 font-light leading-relaxed max-w-xs text-sm">
            请输入您的品牌信息，Gemini AI 将为您提炼行业特征，定制高端视觉符号。
          </p>
        </div>

        <div className="relative z-10 mt-12 space-y-8 hidden md:block">
          <div className="flex items-start gap-4 opacity-100">
            <span className="text-gold-400 font-serif text-xl">01</span>
            <div>
              <h4 className="font-bold text-sm uppercase tracking-wider mb-1">Identity</h4>
              <p className="text-spa-300 text-xs">品牌名称与标语</p>
            </div>
          </div>
          <div className={`flex items-start gap-4 ${formData.storeName ? 'opacity-100' : 'opacity-40'} transition-opacity`}>
            <span className="text-gold-400 font-serif text-xl">02</span>
            <div>
              <h4 className="font-bold text-sm uppercase tracking-wider mb-1">Services</h4>
              <p className="text-spa-300 text-xs">核心服务项目 (最多3项)</p>
            </div>
          </div>
          <div className={`flex items-start gap-4 ${formData.services.length > 0 ? 'opacity-100' : 'opacity-40'} transition-opacity`}>
            <span className="text-gold-400 font-serif text-xl">03</span>
            <div>
              <h4 className="font-bold text-sm uppercase tracking-wider mb-1">Aesthetic</h4>
              <p className="text-spa-300 text-xs">视觉风格定调</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Interactive Form */}
      <div className="md:w-2/3 bg-white flex flex-col h-full">
        <div className="flex-1 overflow-y-auto p-8 md:p-14">
          <form className="space-y-16 max-w-2xl mx-auto">
            
            {/* Section 1: Brand Identity */}
            <section>
              <h3 className="text-3xl font-serif text-spa-900 mb-8">品牌基础信息</h3>
              <div className="space-y-10">
                <div className="group relative">
                  <input
                    type="text"
                    name="storeName"
                    id="storeName"
                    value={formData.storeName}
                    onChange={handleInputChange}
                    className="peer w-full bg-transparent border-b border-stone-300 py-3 text-2xl font-serif text-spa-900 placeholder-transparent focus:outline-none focus:border-spa-800 transition-colors"
                    placeholder="例如：云隐足道"
                  />
                  <label 
                    htmlFor="storeName"
                    className="absolute left-0 -top-3.5 text-xs font-bold text-stone-400 uppercase tracking-widest transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-stone-400 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-gold-600 peer-focus:text-xs"
                  >
                    店铺名称
                  </label>
                </div>

                <div className="group relative">
                  <input
                    type="text"
                    name="subText"
                    id="subText"
                    value={formData.subText}
                    onChange={handleInputChange}
                    className="peer w-full bg-transparent border-b border-stone-300 py-3 text-xl font-serif text-spa-900 placeholder-transparent focus:outline-none focus:border-spa-800 transition-colors"
                    placeholder="例如：养生 · SPA"
                  />
                  <label 
                    htmlFor="subText"
                    className="absolute left-0 -top-3.5 text-xs font-bold text-stone-400 uppercase tracking-widest transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-stone-400 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-gold-600 peer-focus:text-xs"
                  >
                    Slogan / 副标题
                  </label>
                </div>
              </div>
            </section>

            {/* Section 2: Services */}
            <section>
              <div className="flex justify-between items-end mb-6">
                <h3 className="text-2xl font-serif text-spa-900">核心服务</h3>
                <span className="text-xs font-medium text-gold-600 bg-gold-50 px-2 py-1 rounded-md">
                  已选 {formData.services.length}/3
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {COMMON_SERVICES.map((service) => {
                  const isSelected = formData.services.includes(service.label);
                  return (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => toggleService(service.label)}
                      className={`
                        py-3 px-2 text-sm transition-all duration-200 border
                        ${isSelected 
                          ? 'bg-spa-900 border-spa-900 text-white shadow-md' 
                          : 'bg-white border-stone-200 text-stone-600 hover:border-spa-400 hover:text-spa-800'
                        }
                      `}
                    >
                      {service.label}
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Section 3: Style */}
            <section>
              <h3 className="text-2xl font-serif text-spa-900 mb-6">视觉定调</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {STYLE_OPTIONS.map((option) => {
                  const isSelected = formData.style === option.id;
                  return (
                    <div
                      key={option.id}
                      onClick={() => setFormData(prev => ({ ...prev, style: option.id }))}
                      className={`
                        cursor-pointer relative p-6 border transition-all duration-300 flex items-start gap-4
                        ${isSelected 
                          ? 'border-gold-500 bg-white shadow-[0_4px_20px_-5px_rgba(197,160,40,0.3)]' 
                          : 'border-stone-200 bg-white hover:border-spa-300'
                        }
                      `}
                    >
                      <div className={`w-10 h-10 rounded-full flex-shrink-0 mt-1 ${option.previewColor}`}></div>
                      <div>
                        <h4 className={`font-serif font-bold text-lg mb-1 ${isSelected ? 'text-spa-900' : 'text-stone-700'}`}>
                          {option.label}
                        </h4>
                        <p className="text-xs text-stone-500 leading-relaxed font-light">
                          {option.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Section 4: Details */}
            <section className="space-y-8">
              <div>
                <label className="block text-xs font-bold text-stone-400 uppercase tracking-widest mb-3">其他定制要求</label>
                <textarea
                  name="additionalRequirements"
                  value={formData.additionalRequirements}
                  onChange={handleInputChange}
                  rows={2}
                  placeholder="请输入任何特殊要求..."
                  className="w-full bg-stone-50 border border-stone-200 px-4 py-3 text-stone-700 text-sm focus:bg-white focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500 transition-all resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-400 uppercase tracking-widest mb-3">参考图片 (可选)</label>
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className={`
                    group border border-dashed rounded-sm p-8 text-center cursor-pointer transition-all
                    ${formData.referenceImage ? 'border-gold-500 bg-gold-50/20' : 'border-stone-300 hover:border-spa-400 hover:bg-stone-50'}
                  `}
                >
                  <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
                  
                  {formData.referenceImage ? (
                    <div className="flex flex-col items-center gap-2">
                       <span className="text-gold-700 font-serif italic text-lg">{formData.referenceImage.name}</span>
                       <span className="text-xs text-gold-500 uppercase tracking-wider">点击更换</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <span className="text-spa-800 font-serif text-lg mb-1 group-hover:text-gold-600 transition-colors">Click to Upload Image</span>
                      <span className="text-stone-400 text-xs">支持 JPG, PNG 格式</span>
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* Bottom Spacer */}
            <div className="h-20"></div>
          </form>
        </div>

        {/* Sticky Action Footer */}
        <div className="sticky bottom-0 left-0 w-full bg-white/95 backdrop-blur-md border-t border-stone-100 p-6 md:px-14 flex items-center justify-between z-20">
             <div className="hidden md:block">
                <p className="text-xs text-stone-400 uppercase tracking-widest">
                   Est. Time: ~15 Seconds
                </p>
             </div>
             <button
              onClick={onSubmit}
              disabled={isSubmitting || !formData.storeName || formData.services.length === 0}
              className={`
                flex-1 md:flex-none md:w-64 py-4 text-sm font-bold tracking-[0.2em] uppercase transition-all duration-300
                ${isSubmitting || !formData.storeName || formData.services.length === 0
                  ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
                  : 'bg-spa-900 text-white hover:bg-gold-600 shadow-xl hover:shadow-2xl hover:-translate-y-1'
                }
              `}
            >
              {isSubmitting ? '正在生成...' : '开始生成设计'}
            </button>
        </div>
      </div>
    </div>
  );
};

export default LogoForm;
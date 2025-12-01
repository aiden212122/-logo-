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
    <div className="bg-white shadow-2xl shadow-stone-400/20 overflow-hidden min-h-[800px] flex flex-col md:flex-row animate-fade-in">
      
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
          <p className="text-spa-200 font-light leading-relaxed max-w-xs">
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
      <div className="md:w-2/3 p-8 md:p-14 overflow-y-auto bg-white">
        <form className="space-y-12 max-w-2xl mx-auto">
          
          {/* Section 1 */}
          <section>
            <h3 className="text-2xl font-serif text-spa-900 mb-6 flex items-center gap-3">
              <span className="w-8 h-[1px] bg-gold-400"></span> 品牌基础
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="group">
                <label className="block text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">店铺名称</label>
                <div className="relative">
                  <input
                    type="text"
                    name="storeName"
                    value={formData.storeName}
                    onChange={handleInputChange}
                    placeholder="例如：云隐足道"
                    className="w-full bg-stone-50 border-l-4 border-transparent focus:border-gold-400 px-5 py-4 text-lg font-serif placeholder-stone-300 focus:bg-white focus:shadow-lg focus:outline-none transition-all duration-300"
                  />
                </div>
              </div>
              <div className="group">
                <label className="block text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">Slogan / 副标题</label>
                <div className="relative">
                  <input
                    type="text"
                    name="subText"
                    value={formData.subText}
                    onChange={handleInputChange}
                    placeholder="例如：养生 · SPA"
                    className="w-full bg-stone-50 border-l-4 border-transparent focus:border-gold-400 px-5 py-4 text-lg font-serif placeholder-stone-300 focus:bg-white focus:shadow-lg focus:outline-none transition-all duration-300"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section>
            <h3 className="text-2xl font-serif text-spa-900 mb-6 flex items-center gap-3">
              <span className="w-8 h-[1px] bg-gold-400"></span> 核心服务
            </h3>
            <p className="text-stone-500 text-sm mb-4">请选择主要经营项目，AI 将提取相关视觉元素。</p>
            <div className="flex flex-wrap gap-3">
              {COMMON_SERVICES.map((service) => {
                const isSelected = formData.services.includes(service.label);
                return (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => toggleService(service.label)}
                    className={`
                      px-6 py-3 rounded-sm text-sm font-medium transition-all duration-300 border
                      ${isSelected 
                        ? 'bg-spa-800 text-white border-spa-800 shadow-lg scale-105 z-10' 
                        : 'bg-stone-50 text-stone-600 border-stone-100 hover:border-stone-300 hover:bg-white'
                      }
                    `}
                  >
                    {service.label}
                  </button>
                );
              })}
            </div>
          </section>

          {/* Section 3 */}
          <section>
            <h3 className="text-2xl font-serif text-spa-900 mb-6 flex items-center gap-3">
              <span className="w-8 h-[1px] bg-gold-400"></span> 视觉定调
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {STYLE_OPTIONS.map((option) => {
                const isSelected = formData.style === option.id;
                return (
                  <div
                    key={option.id}
                    onClick={() => setFormData(prev => ({ ...prev, style: option.id }))}
                    className={`
                      cursor-pointer group relative p-5 border transition-all duration-300
                      ${isSelected 
                        ? 'border-gold-400 bg-spa-50' 
                        : 'border-stone-200 hover:border-spa-300'
                      }
                    `}
                  >
                    <div className="flex items-center justify-between mb-2">
                       <span className={`font-serif font-bold text-lg ${isSelected ? 'text-spa-900' : 'text-stone-700'}`}>{option.label}</span>
                       <div className={`w-3 h-3 rounded-full ${option.previewColor}`}></div>
                    </div>
                    <p className="text-xs text-stone-500 leading-relaxed">{option.description}</p>
                    {isSelected && <div className="absolute top-0 left-0 w-1 h-full bg-gold-400"></div>}
                  </div>
                );
              })}
            </div>
          </section>

          {/* Section 4 */}
          <section>
            <h3 className="text-2xl font-serif text-spa-900 mb-6 flex items-center gap-3">
              <span className="w-8 h-[1px] bg-gold-400"></span> 定制细节
            </h3>
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">其他要求</label>
                <textarea
                  name="additionalRequirements"
                  value={formData.additionalRequirements}
                  onChange={handleInputChange}
                  rows={2}
                  placeholder="补充描述，例如：希望能体现“禅意”，避免使用过于鲜艳的红色..."
                  className="w-full bg-stone-50 border border-stone-200 px-5 py-4 text-stone-700 focus:bg-white focus:border-gold-400 focus:ring-0 transition-colors resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">参考图片</label>
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-stone-200 hover:border-gold-400 hover:bg-gold-50/10 rounded-sm p-6 text-center cursor-pointer transition-colors"
                >
                  <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
                  
                  {formData.referenceImage ? (
                    <div className="flex items-center justify-center gap-2 text-spa-700">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                      <span className="font-medium">{formData.referenceImage.name}</span>
                    </div>
                  ) : (
                    <div className="text-stone-400 flex flex-col items-center">
                      <svg className="w-8 h-8 mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                      <span className="text-sm">点击上传参考图片 (可选)</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Action */}
          <div className="pt-8 border-t border-stone-100">
            <button
              onClick={onSubmit}
              disabled={isSubmitting || !formData.storeName || formData.services.length === 0}
              className={`
                w-full py-5 text-lg font-serif font-bold tracking-widest uppercase transition-all duration-300
                ${isSubmitting || !formData.storeName || formData.services.length === 0
                  ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
                  : 'bg-spa-900 text-white hover:bg-gold-600 shadow-xl'
                }
              `}
            >
              {isSubmitting ? 'Generating...' : 'Start Design Process'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default LogoForm;

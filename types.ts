export enum SpaStyle {
  TRADITIONAL = 'Traditional',
  MODERN = 'Modern',
  LUXURY = 'Luxury',
  THAI = 'Thai',
  ZEN = 'Zen',
  MINIMALIST = 'Minimalist',
  CLASSICAL = 'Classical'
}

export interface SpaFormData {
  storeName: string;
  subText: string;
  services: string[];
  style: SpaStyle;
  referenceImage: File | null;
  additionalRequirements: string;
}

export interface AnalysisResult {
  visualSymbols: string[];
  colorPalette: string;
  englishTranslation: string;
  designReasoning: string;
}

export interface GeneratedLogo {
  imageUrl: string; // Base64 data URL
  promptUsed: string;
  analysis: AnalysisResult;
}

export interface ServiceOption {
  id: string;
  label: string;
}

export interface StyleDefinition {
  id: SpaStyle;
  label: string;
  description: string;
  previewColor: string;
}

declare global {
  interface AIStudio {
    hasSelectedApiKey: () => Promise<boolean>;
    openSelectKey: () => Promise<void>;
  }
  
  interface Window {
    aistudio?: AIStudio;
  }
}

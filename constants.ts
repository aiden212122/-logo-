import { SpaStyle, ServiceOption, StyleDefinition } from './types';

export const COMMON_SERVICES: ServiceOption[] = [
  { id: 'foot_massage', label: '足疗' },
  { id: 'chinese_massage', label: '中式推拿' },
  { id: 'thai_massage', label: '泰式按摩' },
  { id: 'cupping', label: '拔罐' },
  { id: 'guasha', label: '刮痧' },
  { id: 'ear_picking', label: '采耳' },
  { id: 'aroma_oil', label: '精油SPA' },
  { id: 'moxibustion', label: '艾灸' },
  { id: 'pedicure', label: '修脚' },
  { id: 'hot_stone', label: '热石' },
];

export const STYLE_OPTIONS: StyleDefinition[] = [
  {
    id: SpaStyle.TRADITIONAL,
    label: '新中式',
    description: '书法笔触，水墨质感，印章元素。',
    previewColor: 'bg-stone-800'
  },
  {
    id: SpaStyle.CLASSICAL,
    label: '古典典雅',
    description: '宫廷华贵，祥云瑞兽，深红色调。',
    previewColor: 'bg-red-900'
  },
  {
    id: SpaStyle.LUXURY,
    label: '轻奢风',
    description: '金箔质感，大理石，对称美学。',
    previewColor: 'bg-yellow-600'
  },
  {
    id: SpaStyle.MODERN,
    label: '现代简约',
    description: '几何图形，线条利落，清新渐变。',
    previewColor: 'bg-blue-500'
  },
  {
    id: SpaStyle.THAI,
    label: '泰式风情',
    description: '图腾花纹，暖橙紫色调，异域风。',
    previewColor: 'bg-orange-600'
  },
  {
    id: SpaStyle.ZEN,
    label: '禅意自然',
    description: '原石，水波纹，大地色系，宁静。',
    previewColor: 'bg-green-700'
  }
];

export const APP_NAME = "ZenLogo AI";
export const APP_TAGLINE = "High-End Spa & Wellness Branding System";

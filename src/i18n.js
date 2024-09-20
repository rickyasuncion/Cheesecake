import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from './locales/en/translation.json';
import translationZH from './locales/zh/translation.json';

// i18n.use(initReactI18next).init({
//   resources: {
//     en: { translation: translationEN },
//     zh: { translation: translationZH },
//   },
//   lng: 'en',
//   fallbackLng: 'en',
//   interpolation: { escapeValue: false },
// });
i18n.use(initReactI18next).init({
    resources: {
      'en-US': { translation: translationEN },
      'zh-CN': { translation: translationZH },
    },
    lng: 'en-US',  // 与 LanguageContext 中的语言代码保持一致
    fallbackLng: 'en-US',  // 设置默认语言
    interpolation: { escapeValue: false },
});

export default i18n;

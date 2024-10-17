import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from './locales/en/translation.json';
import translationZH from './locales/zh/translation.json';
import translationFR from './locales/fr/translation.json'; // Import French translations

i18n.use(initReactI18next).init({
    resources: {
      'en-US': { translation: translationEN },
      'zh-CN': { translation: translationZH },
      'fr': { translation: translationFR },  // Add French translations
    },
    lng: 'en-US',  
    fallbackLng: 'en-US',  
    interpolation: { escapeValue: false },
});

export default i18n;

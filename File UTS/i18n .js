import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import 'intl-pluralrules'; 
import * as Localization from 'expo-localization'; // Import expo-localization
import en from './locales/en.json';
import id from './locales/id.json';

const resources = {
  en: {
    translation: en,
  },
  id: {
    translation: id,
  },
};

i18n
  .use(initReactI18next) 
  .init({
    resources,
    lng: Localization.getLocales()[0].languageCode.startsWith('id') ? 'id' : 'en', 
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, 
    },
  });

export default i18n;

import i18n, { Namespace } from 'i18next';
import { initReactI18next, useTranslation as useTranslationI18n } from 'react-i18next';

import resources from '@/public/locales';

i18n.use(initReactI18next).init({
  resources,
  lng: 'ja',
  fallbackLng: 'ja',

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;

const useTranslation = (namespaces: Namespace) => useTranslationI18n(namespaces, { i18n });

export { useTranslation };

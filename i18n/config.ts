'use client';


import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enCommon from './locales/en/common.json';
import enAuth from './locales/en/auth.json';
import mnCommon from './locales/mn/common.json';
import mnAuth from './locales/mn/auth.json';
import enSobe from './locales/en/sobe.json';
import mnSobe from './locales/mn/sobe.json';
import mnNavbar from './locales/mn/navbar.json';
import enNavbar from './locales/en/navbar.json';

const resources = {
  en: {
    common: enCommon,
    auth: enAuth,
    sobe: enSobe,
    navbar: enNavbar,
  },
  mn: {
    common: mnCommon,
    auth: mnAuth,
    sobe: mnSobe,
    navbar: mnNavbar,
  },
};

if (!i18n.isInitialized) {
  i18n
    .use(initReactI18next)
    .init({
      fallbackLng: 'en',
      supportedLngs: ['en', 'mn'],
      debug: false,
      ns: ['common', 'auth', 'sobe', 'navbar'],
      defaultNS: 'common',
      resources,
      backend: false, // onemogući backend loader i na klijentu
      interpolation: {
        escapeValue: false,
      },
      react: {
        useSuspense: false,
      },
    });
}

export default i18n;

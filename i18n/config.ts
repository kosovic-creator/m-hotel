'use client';


import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enCommon from './locales/en/common.json';
import enAuth from './locales/en/auth.json';
import srCommon from './locales/sr/common.json';
import srAuth from './locales/sr/auth.json';
import enSobe from './locales/en/sobe.json';
import srSobe from './locales/sr/sobe.json';
import srNavbar from './locales/sr/navbar.json';
import enNavbar from './locales/en/navbar.json';

const resources = {
  en: {
    common: enCommon,
    auth: enAuth,
    sobe: enSobe,
    navbar: enNavbar,
  },
  sr: {
    common: srCommon,
    auth: srAuth,
    sobe: srSobe,
    navbar: srNavbar,
  },
};

if (!i18n.isInitialized) {
  i18n
    .use(initReactI18next)
    .init({
      fallbackLng: 'en',
      supportedLngs: ['en', 'sr'],
      debug: process.env.NODE_ENV === 'development',
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

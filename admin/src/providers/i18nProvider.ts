import polyglotI18nProvider from 'ra-i18n-polyglot';
import en from 'ra-language-english';
import sv from '../i18n/sv';
import { TranslationMessages } from 'react-admin';

const translations: { [key: string]: TranslationMessages } = { en, sv };

export const i18nProvider = polyglotI18nProvider(
  (locale) => translations[locale],
  'sv', // default locale
  [
    { locale: 'en', name: 'English' },
    { locale: 'sv', name: 'Svenska' },
  ]
);

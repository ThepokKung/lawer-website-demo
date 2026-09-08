import { th } from './th';
import { en } from './en';
import { zh } from './zh';

export const languages = {
  th: 'ไทย',
  en: 'English',
  zh: '中文'
} as const;

export type SupportedLang = keyof typeof languages;
export const defaultLang: SupportedLang = 'th';

export const translations = {
  th,
  en,
  zh
};

export function useTranslations(lang: SupportedLang = 'th') {
  return translations[lang] || translations[defaultLang];
}

export function getLangFromUrl(url: URL): SupportedLang {
  const [, lang] = url.pathname.split('/');
  if (lang in languages) return lang as SupportedLang;
  return defaultLang;
}

export function getCleanPathWithoutLang(pathname: string): string {
  const clean = pathname.replace(/^\/(th|en|zh)/, '');
  return clean === '' ? '/' : clean;
}

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

import { SITE_CONFIG } from '@/config/site';

export function useTranslations(lang: SupportedLang = 'th') {
  const base = translations[lang] || translations[defaultLang];
  const localizedAddress = lang === 'th'
    ? (SITE_CONFIG.addressTh || base.contact.addressValue)
    : lang === 'zh'
    ? (SITE_CONFIG.addressZh || base.contact.addressValue)
    : (SITE_CONFIG.addressEn || base.contact.addressValue);

  return {
    ...base,
    contact: {
      ...base.contact,
      emailValue: SITE_CONFIG.email,
      phoneValue: SITE_CONFIG.phone,
      phoneMobile: SITE_CONFIG.phoneMobile,
      lineValue: SITE_CONFIG.line,
      wechatValue: SITE_CONFIG.wechat,
      whatsappValue: SITE_CONFIG.whatsapp,
      addressValue: localizedAddress
    }
  };
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

import { th } from './th';
import { en } from './en';

export const languages = {
  th: 'ไทย',
  en: 'English'
} as const;

export type SupportedLang = keyof typeof languages;
export const defaultLang: SupportedLang = 'th';

export interface EducationItem {
  year: string;
  degree: string;
  institution: string;
}

export interface AdmissionItem {
  year: string;
  title: string;
}

export interface AttorneyProfile {
  slug: string;
  name: string;
  nameEn?: string;
  role: string;
  roleBadge: string;
  licenseNumber: string;
  image: string;
  quote: string;
  bio: string[];
  education: EducationItem[];
  admissions: AdmissionItem[];
  experienceHighlights: string[];
  practiceAreas: string[];
  languages: string[];
}

export const translations = {
  th,
  en
};

import { SITE_CONFIG } from '@/config/site';

export function useTranslations(lang: SupportedLang = 'th') {
  const base = translations[lang] || translations[defaultLang];
  const localizedAddress = lang === 'th'
    ? (SITE_CONFIG.addressTh || base.contact.addressValue)
    : (SITE_CONFIG.addressEn || base.contact.addressValue);

  return {
    ...base,
    contact: {
      ...base.contact,
      emailValue: SITE_CONFIG.email,
      phoneValue: SITE_CONFIG.phone,
      phoneMobile: SITE_CONFIG.phoneMobile,
      lineValue: SITE_CONFIG.line,
      whatsappValue: SITE_CONFIG.whatsapp,
      facebookValue: SITE_CONFIG.facebook,
      facebookLabel: SITE_CONFIG.facebookLabel,
      facebookHandle: SITE_CONFIG.facebookHandle,
      addressValue: localizedAddress
    }
  };
}

export function getCleanPathWithoutLang(pathname: string): string {
  return pathname.replace(/^\/(th|en)/, '') || '/';
}

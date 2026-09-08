import { trackEvent } from './tracking';

export interface CookieConsent {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
}

const CONSENT_STORAGE_KEY = 'ms_legal_cookie_consent';

export function getStoredConsent(): CookieConsent | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(CONSENT_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveConsent(analytics: boolean, marketing: boolean): CookieConsent {
  const consent: CookieConsent = {
    necessary: true,
    analytics,
    marketing,
    timestamp: new Date().toISOString()
  };

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(consent));

      // Update Google Consent Mode v2
      if (typeof (window as any).gtag === 'function') {
        (window as any).gtag('consent', 'update', {
          analytics_storage: analytics ? 'granted' : 'denied',
          ad_storage: marketing ? 'granted' : 'denied',
          ad_user_data: marketing ? 'granted' : 'denied',
          ad_personalization: marketing ? 'granted' : 'denied'
        });
      }

      // Dispatch to dataLayer
      trackEvent('cookie_consent_update', {
        analytics_storage: analytics ? 'granted' : 'denied',
        ad_storage: marketing ? 'granted' : 'denied'
      });

      // Dispatch window event for UI re-render
      window.dispatchEvent(new CustomEvent('vanguard-consent-changed', { detail: consent }));
    } catch (e) {
      console.error('Failed to save cookie consent', e);
    }
  }

  return consent;
}

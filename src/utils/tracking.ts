/**
 * Google Tag Manager / GA4 DataLayer Event Dispatcher
 */

declare global {
  interface Window {
    dataLayer: any[];
  }
}

export type TrackingEventName =
  | 'click_call'
  | 'click_email'
  | 'click_line'
  | 'click_wechat'
  | 'click_whatsapp'
  | 'form_submit_lead'
  | 'cookie_consent_update'
  | 'switch_language';

export function trackEvent(eventName: TrackingEventName, parameters: Record<string, any> = {}) {
  if (typeof window === 'undefined') return;

  window.dataLayer = window.dataLayer || [];
  const eventPayload = {
    event: eventName,
    timestamp: new Date().toISOString(),
    ...parameters
  };

  window.dataLayer.push(eventPayload);

  if (import.meta.env.DEV) {
    console.log(`[Tracking Event] %c${eventName}`, 'color: #DFBA73; font-weight: bold;', eventPayload);
  }
}

export function trackCall(phoneNumber: string) {
  trackEvent('click_call', {
    contact_method: 'phone',
    phone_number: phoneNumber
  });
}

export function trackEmail(emailAddress: string) {
  trackEvent('click_email', {
    contact_method: 'email',
    email_address: emailAddress
  });
}

export function trackLine(url: string) {
  trackEvent('click_line', {
    channel: 'line',
    link_url: url
  });
}

export function trackWeChat() {
  trackEvent('click_wechat', {
    channel: 'wechat'
  });
}

export function trackWhatsApp() {
  trackEvent('click_whatsapp', {
    channel: 'whatsapp'
  });
}

export function trackFormLead(serviceInterest: string, preferredLang: string) {
  trackEvent('form_submit_lead', {
    service_interest: serviceInterest,
    preferred_lang: preferredLang
  });
}

export function trackLanguageSwitch(fromLang: string, toLang: string) {
  trackEvent('switch_language', {
    from_lang: fromLang,
    to_lang: toLang
  });
}

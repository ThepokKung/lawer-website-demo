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
  window.dataLayer = window.dataLayer || [];
  const eventPayload = {
    event: eventName,
    timestamp: new Date().toISOString(),
    ...parameters
  };

  window.dataLayer.push(eventPayload);
}

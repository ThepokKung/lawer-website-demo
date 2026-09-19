/**
 * Centralized Site Configuration
 * All values are strictly driven by environment variables (.env).
 * Safe defaults are provided for local development preview.
 */

export const SITE_CONFIG = {
  // Public Site URL
  url: (import.meta.env.PUBLIC_SITE_URL || 'https://law.thepokkung.space').replace(/\/+$/, ''),

  // Firm Information
  firmName: 'THANPRAT LAWYER CO., LTD.',
  firmNameTh: 'บริษัท ธันปรัท ทนายความ จำกัด',

  // Addresses per locale
  addressTh: '1131/221 อาคารเทอดดำริ ถนนนครไชยศรี แขวงถนนนครไชยศรี เขตดุสิต กรุงเทพมหานคร 10300',
  addressEn: '1131/221 Theoddamri Bldg., Nakornchaisri Road, Thanon Nakornchaisri, Dusit, Bangkok 10300 Thailand',

  // Geographic Coordinates (THANPRAT LAWYER CO., LTD. - Dusit / Sam Sen)
  latitude: 13.7778516,
  longitude: 100.5288187,

  // Direct Contact Channels (Driven by .env with official defaults)
  email: import.meta.env.PUBLIC_CONTACT_EMAIL || 'thanprat.lawyer@gmail.com',
  phone: import.meta.env.PUBLIC_CONTACT_PHONE || '+66 82 156 5651',
  phoneMobile: import.meta.env.PUBLIC_CONTACT_PHONE_MOBILE || '+66 64 829 8888',
  line: import.meta.env.PUBLIC_CONTACT_LINE || '@thanpratlawyer',
  lineUrl: import.meta.env.PUBLIC_CONTACT_LINE_URL || 'https://line.me/ti/p/~thanprat.lawyer',
  facebook: import.meta.env.PUBLIC_CONTACT_FACEBOOK || 'https://www.facebook.com/thanprat.lawyer',
  facebookLabel: 'Facebook Page',
  facebookHandle: '@thanprat.lawyer',
  whatsapp: import.meta.env.PUBLIC_CONTACT_PHONE || '+66 82 156 5651',

  // Google Maps Embed & Direct Navigation
  mapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1500!2d100.5289472!3d13.778944!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e29bf9bb2166b5%3A0xe6c35fd5a2120d99!2zVEhBTlBSQVQgTEFXWUVSIENPLixMVEQuIOC4muC4o-C4tOC4qeC4seC4lyDguJjguLHguJnguJvguKPguLHguJcg4LiX4LiZ4Liy4Lii4LiE4Lin4Liy4LihIOC4iOC4s-C4geC4seC4lA!5e0!3m2!1sth!2sth',
  mapsDirectUrl: 'https://maps.app.goo.gl/d9LDF1XnfYZk5tBM7',

  // Google Apps Script Lead Webhook (Google Sheets + Email)
  googleScriptUrl: import.meta.env.PUBLIC_GOOGLE_SCRIPT_URL || '',

  // Tag Management (GTM handles GA4, Clarity, and all pixels)
  gtmId: (() => {
    const raw = (import.meta.env.PUBLIC_GTM_ID || '').trim();
    const isPlaceholder = !raw || /^(none|gtm-none|gtm-xxxxxxx)$/i.test(raw);
    const isValidFormat = /^GTM-[A-Z0-9]{4,10}$/i.test(raw);
    return !isPlaceholder && isValidFormat ? raw : '';
  })(),

  // Anti-Spam / Cloudflare Turnstile (Optional - falls back to invisible Honeypot + Time Trap)
  turnstileSiteKey: (() => {
    const raw = (import.meta.env.PUBLIC_TURNSTILE_SITE_KEY || '').trim();
    return raw && raw.toLowerCase() !== 'none' ? raw : '';
  })()
};

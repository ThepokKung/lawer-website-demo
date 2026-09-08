/**
 * Centralized Site Configuration
 * All values are strictly driven by environment variables (.env).
 * Safe defaults are provided for local development preview.
 */

export const SITE_CONFIG = {
  // Public Site URL
  url: (import.meta.env.PUBLIC_SITE_URL || 'https://law.thepokkung.space').replace(/\/+$/, ''),

  // Firm Information
  firmName: import.meta.env.PUBLIC_FIRM_NAME || 'Montclaire & Sterling Legal Counsel',
  firmNameTh: import.meta.env.PUBLIC_FIRM_NAME_TH || 'สำนักงานกฎหมาย มงต์แคลร์ แอนด์ สเตอร์ลิง',
  firmNameZh: import.meta.env.PUBLIC_FIRM_NAME_ZH || '蒙克莱尔·斯特林国际律师事务所',

  // Addresses per locale
  addressTh: import.meta.env.PUBLIC_OFFICE_ADDRESS_TH || 'อาคารสาทร สแควร์ ทาวเวอร์ ชั้น 28 ถนนสาทรเหนือ แขวงสีลม เขตบางรัก กรุงเทพมหานคร 10500',
  addressEn: import.meta.env.PUBLIC_OFFICE_ADDRESS_EN || 'Sathorn Square Tower, 28th Floor, North Sathorn Rd, Silom, Bang Rak, Bangkok 10500',
  addressZh: import.meta.env.PUBLIC_OFFICE_ADDRESS_ZH || '曼谷挽叻区是隆路北沙吞路沙吞广场大厦28层 邮编10500',

  // Geographic Coordinates
  latitude: parseFloat(import.meta.env.PUBLIC_OFFICE_LAT || '13.722588'),
  longitude: parseFloat(import.meta.env.PUBLIC_OFFICE_LNG || '100.528860'),

  // Direct Contact Channels
  email: import.meta.env.PUBLIC_CONTACT_EMAIL || 'contact@ms-legal.example.com',
  phone: import.meta.env.PUBLIC_CONTACT_PHONE || '+66 2 123 4567',
  phoneMobile: import.meta.env.PUBLIC_CONTACT_MOBILE || '+66 81 999 8888',
  line: import.meta.env.PUBLIC_CONTACT_LINE || '@mslegal',
  lineUrl: import.meta.env.PUBLIC_CONTACT_LINE_URL || 'https://line.me/R/ti/p/@mslegal',
  wechat: import.meta.env.PUBLIC_CONTACT_WECHAT || 'MSLegalBKK',
  whatsapp: import.meta.env.PUBLIC_CONTACT_WHATSAPP || '+66 81 999 8888',

  // Google Maps Embed & Direct Navigation
  mapsEmbedUrl: import.meta.env.PUBLIC_GOOGLE_MAPS_EMBED_URL || 'https://maps.google.com/maps?q=Sathorn+Square+Tower+Bangkok&t=&z=16&ie=UTF8&iwloc=&output=embed',
  mapsDirectUrl: import.meta.env.PUBLIC_GOOGLE_MAPS_DIRECT_URL || 'https://maps.google.com/?q=Sathorn+Square+Tower+Bangkok',

  // Google Apps Script Lead Webhook (Google Sheets + Email)
  googleScriptUrl: import.meta.env.PUBLIC_GOOGLE_SCRIPT_URL || '',

  // Tag Management (GTM handles GA4, Clarity, and all pixels)
  gtmId: import.meta.env.PUBLIC_GTM_ID || '',

  // Anti-Spam / Cloudflare Turnstile (Optional - falls back to invisible Honeypot + Time Trap)
  turnstileSiteKey: import.meta.env.PUBLIC_TURNSTILE_SITE_KEY || ''
};

/**
 * Centralized Site Configuration
 * All values are strictly driven by environment variables (.env).
 * Safe defaults are provided for local development preview.
 */

export const SITE_CONFIG = {
  // Public Site URL
  url: (import.meta.env.PUBLIC_SITE_URL || 'https://law.thepokkung.space').replace(/\/+$/, ''),

  // Firm Information
  firmName: 'Montclaire & Sterling Legal Counsel',
  firmNameTh: 'สำนักงานกฎหมาย มงต์แคลร์ แอนด์ สเตอร์ลิง',
  firmNameZh: '蒙克莱尔·斯特林国际律师事务所',

  // Addresses per locale
  addressTh: 'อาคารสาทร สแควร์ ทาวเวอร์ ชั้น 28 ถนนสาทรเหนือ แขวงสีลม เขตบางรัก กรุงเทพมหานคร 10500',
  addressEn: 'Sathorn Square Tower, 28th Floor, North Sathorn Rd, Silom, Bang Rak, Bangkok 10500',
  addressZh: '曼谷挽叻区是隆路北沙吞路沙吞广场大厦28层 邮编10500',

  // Geographic Coordinates
  latitude: 13.722588,
  longitude: 100.528860,

  // Direct Contact Channels
  email: 'contact@ms-legal.example.com',
  phone: '+66 2 123 4567',
  phoneMobile: '+66 81 999 8888',
  line: '@mslegal',
  lineUrl: 'https://line.me/R/ti/p/@mslegal',
  wechat: 'MSLegalBKK',
  whatsapp: '+66 81 999 8888',

  // Google Maps Embed & Direct Navigation
  mapsEmbedUrl: 'https://maps.google.com/maps?q=Sathorn+Square+Tower+Bangkok&t=&z=16&ie=UTF8&iwloc=&output=embed',
  mapsDirectUrl: 'https://maps.google.com/?q=Sathorn+Square+Tower+Bangkok',

  // Google Apps Script Lead Webhook (Google Sheets + Email)
  googleScriptUrl: import.meta.env.PUBLIC_GOOGLE_SCRIPT_URL || '',

  // Tag Management (GTM handles GA4, Clarity, and all pixels)
  gtmId: import.meta.env.PUBLIC_GTM_ID || '',

  // Anti-Spam / Cloudflare Turnstile (Optional - falls back to invisible Honeypot + Time Trap)
  turnstileSiteKey: import.meta.env.PUBLIC_TURNSTILE_SITE_KEY || ''
};

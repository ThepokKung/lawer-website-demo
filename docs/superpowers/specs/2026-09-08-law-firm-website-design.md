# Design Specification: High-Performance Multilingual Law Firm Website

**Date:** 2026-09-08  
**Project:** Vanguard & Partners Legal Counsel (สำนักงานกฎหมาย แวนการ์ด แอนด์ พาร์ทเนอร์ส / 先锋国际律师事务所)  
**Framework:** Astro 5 (Static Site Generation)  
**Aesthetic:** Prestige Executive (Midnight Navy & Champagne Gold) with Apple-grade smooth staggered motion  

---

## 1. Executive Summary & Goals

This project implements an ultra-fast, search-engine-optimized, multilingual website for a premium law firm catering to Thai domestic clients, international expats/enterprises, and Chinese investors.

Key objectives:
1. **Speed & Zero Runtime Bloat:** Pure Static Site Generation (SSG) in Astro with near-zero client-side JavaScript overhead. 100/100 Core Web Vitals target (LCP, INP, CLS).
2. **Trilingual Architecture (i18n):** Complete localized routing for Thai (`/th` and `/`), English (`/en`), and Chinese Simplified (`/zh`).
3. **Apple-Inspired Motion & Aesthetics:** Smooth, staggered viewport reveal animations (`cubic-bezier(0.16, 1, 0.3, 1)`), glassmorphic floating navigation, subtle border glows, and frictionless page transitions without third-party heavy animation libraries.
4. **Analytics & Tracking Readiness:** Direct integration with Google Tag Manager (GTM), Google Analytics 4 (GA4), and Microsoft Clarity, tracking high-intent conversion actions (`click_call`, `click_email`, `click_line`, `click_wechat`, `click_whatsapp`, `form_submit_lead`).
5. **PDPA & Cookie Compliance:** Dedicated Cookie Policy and Privacy Policy pages, coupled with a floating Apple-styled Cookie Consent banner synchronized with Google Consent Mode v2.

---

## 2. Architecture & Tech Stack

* **Core Engine:** Astro 5 (Static Output `output: 'static'`)
* **Styling:** Tailwind CSS with custom prestige design tokens
* **Motion & Interactions:** 
  * Astro View Transitions API for seamless SPA-like page changes without reloads
  * Native CSS hardware-accelerated animations (`transform`, `opacity`) triggered via a lightweight `IntersectionObserver` script
* **Internationalization:**
  * Astro Native i18n routing (`defaultLocale: 'th'`, `locales: ['th', 'en', 'zh']`)
  * Type-safe translation dictionaries (`src/i18n/th.ts`, `en.ts`, `zh.ts`)
* **Tracking & Analytics:**
  * Configurable GTM Container (`PUBLIC_GTM_ID`)
  * Configurable Microsoft Clarity Project ID (`PUBLIC_CLARITY_ID`)
  * GA4 configuration via GTM dataLayer
  * Custom TypeScript tracking dispatcher `trackEvent(eventName, params)`
* **Compliance:**
  * Persistent consent state in `localStorage`
  * Google Consent Mode v2 initialization (`ad_storage`, `analytics_storage`)

---

## 3. Visual Identity & Design System

### Color Palette (Prestige Executive)
* **Background Deep:** `#060D1E` (Dark Abyss) & `#0A142F` (Midnight Navy)
* **Surface / Glass:** `rgba(13, 27, 62, 0.65)` with `backdrop-blur-md` and `border: 1px solid rgba(197, 160, 89, 0.15)`
* **Accents & Metallics:**
  * Primary Gold: `#C5A059`
  * Warm Light Gold: `#DFBA73`
  * Dark Antique Gold: `#967433`
* **Typography:**
  * Headings & Primary Text: `#F8FAFC` (Slate 50)
  * Secondary / Muted: `#94A3B8` (Slate 400)
  * High-contrast highlights: Pure White `#FFFFFF`

### Motion System (Apple Vibe)
* **Easing Curve:** `cubic-bezier(0.16, 1, 0.3, 1)`
* **CSS Reveal Classes:**
  * `.reveal-init`: Hidden state with `opacity: 0; transform: translateY(24px);`
  * `.revealed`: Visible state with `opacity: 1; transform: translateY(0);`
  * `.stagger-1`, `.stagger-2`, `.stagger-3`, `.stagger-4`: Progressive delays (`100ms`, `200ms`, `300ms`, `400ms`)
* **Interactive Accents:**
  * Cards lift by `-4px` on hover with a glowing gold perimeter gradient.
  * Capsule language selector with sliding active pill state.

---

## 4. Site Structure & Routes

All routes exist in 3 localized prefixes (`/th/` [or root], `/en/`, `/zh/`):

1. **Homepage (`/{lang}/`)**
   * **Hero:** High-impact legal statement, credentials badge, primary CTA (Schedule Consultation / Emergency Call).
   * **Quick Trust Metrics:** "20+ Years Experience", "98% Success Rate", "1,500+ Corporate Clients", "THB 10B+ Assets Protected".
   * **Practice Areas Preview:** 6 core service cards with hover glow and instant detail links.
   * **Why Choose Us:** Discretion, Multilingual Advocates, Cross-Border Mastery, Fixed-Fee Transparency.
   * **Senior Partners Spotlight:** Profile cards for key attorneys with specialization tags.
   * **Quick Consultation CTA:** Inline booking/contact trigger.

2. **Practice Areas (`/{lang}/services/` & `/{lang}/services/[slug]/`)**
   * Overview grid of all services.
   * Dedicated detailed pages for 6 focus areas:
     1. `foreign-investment-boi` (Foreign Direct Investment, BOI, Visas & Work Permits)
     2. `litigation-dispute-resolution` (Civil, Criminal & Commercial Litigation)
     3. `real-estate-property` (Real Estate, Land Due Diligence, Condominium Law)
     4. `corporate-commercial-contracts` (M&A, Corporate Structuring & Commercial Contracts)
     5. `family-wealth-inheritance` (Estate Planning, Wills, Trusts & Family Law)
     6. `notarial-legal-translation` (Notarial Services & Certified Legal Translations)

3. **About Us (`/{lang}/about/`)**
   * Firm history, philosophy, code of ethics, attorney directory and bar admissions.

4. **Contact & Consultation (`/{lang}/contact/`)**
   * Direct contact channels (Phone, Email, LINE Official, WeChat QR, WhatsApp).
   * Consultation request form with real-time validation and `dataLayer` tracking.
   * Office address (Bangkok CBD / Sathorn-Silom financial district), opening hours, and embedded interactive map container.

5. **Compliance Pages (`/{lang}/cookie-policy/` & `/{lang}/privacy-policy/`)**
   * Comprehensive PDPA (Personal Data Protection Act) disclosures.
   * Cookie categorization (Strictly Necessary, Analytics, Marketing) with interactive consent toggle manager.

---

## 5. Analytics, Tracking & Compliance

### GTM & Script Loading
* In `<head>`: GTM script initialized with async priority.
* In `<body>`: `<noscript>` iframe fallback.
* Microsoft Clarity script: Embedded conditionally when `PUBLIC_CLARITY_ID` is present.

### DataLayer Event Schema
All conversion events follow standard GA4/GTM nomenclature:

| Event Name | Trigger | Payload / Parameters |
|---|---|---|
| `click_call` | User clicks any `tel:` link | `{ contact_method: 'phone', phone_number: '...' }` |
| `click_email` | User clicks any `mailto:` link | `{ contact_method: 'email', email_address: '...' }` |
| `click_line` | User clicks LINE Official link | `{ channel: 'line', link_url: '...' }` |
| `click_wechat` | User clicks/opens WeChat QR modal | `{ channel: 'wechat' }` |
| `click_whatsapp` | User clicks WhatsApp chat link | `{ channel: 'whatsapp' }` |
| `form_submit_lead` | User submits consultation form | `{ service_interest: '...', preferred_lang: '...' }` |
| `cookie_consent_update` | User updates cookie preferences | `{ analytics_storage: 'granted'/'denied', ad_storage: 'granted'/'denied' }` |
| `switch_language` | User changes language | `{ from_lang: '...', to_lang: '...' }` |

### Cookie Banner
* Apple-styled translucent glass banner floating at bottom screen.
* Options: "ยอมรับทั้งหมด" (Accept All), "ปฏิเสธ" (Decline Non-Essential), "ตั้งค่าคุกกี้" (Customize).
* Remembers selection for 365 days; immediately triggers GTM Consent Mode updates.

---

## 6. Multilingual SEO & Schema Markup

* **Hreflang Tags:** Explicit alternate links on every page for `th`, `en`, `zh-Hans`, and `x-default`.
* **JSON-LD Schema (`LegalService`):**
  * `@type: "LegalService"`
  * `name`, `alternateName` in 3 languages
  * `telephone`, `email`, `address` (Bangkok, Thailand)
  * `openingHoursSpecification`
  * `priceRange: "$$$$"`
  * `areaServed: "Thailand"`
  * `knowsLanguage: ["th", "en", "zh"]`
* **Canonical URLs:** Absolute canonical URL resolution for every route.
* **Sitemap & Robots:** Automatic XML sitemap generation via `@astrojs/sitemap`.

---

## 7. Verification & Success Criteria

1. **Build Verification:** `npm run build` completes with 0 errors and generates static HTML for all locales.
2. **Performance:** Clean zero-JS render for core layout; Core Web Vitals audit with green scores across mobile and desktop.
3. **Apple Motion Quality:** Smooth stagger reveal on scroll without layout shift (CLS = 0).
4. **DataLayer & GTM Verification:** Clicking phone, email, LINE, WeChat, WhatsApp, and form submission fires exact events into `window.dataLayer`.
5. **i18n Integrity:** Switching language maintains current page context (e.g. `/th/services/litigation` -> `/en/services/litigation` -> `/zh/services/litigation`).

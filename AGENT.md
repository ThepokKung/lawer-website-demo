# AGENT.md - Project Context & AI Agent Guidelines

**Project:** Vanguard & Partners Legal Counsel (สำนักงานกฎหมาย แวนการ์ด แอนด์ พาร์ทเนอร์ส / 先锋国际律师事务所)  
**Framework:** Astro 5 (Static Site Generation)  
**Design Paradigm:** Prestige Executive (Midnight Navy `#060D1E`, Champagne Gold `#C5A059`) with Apple-grade smooth micro-interactions.

---

## 1. Project Purpose & Scope

This project is an ultra-fast, search-engine-optimized, trilingual website for an executive international law firm in Thailand.
* **Locales:**
  * `th`: Thai (Default locale - domestic clients, Thai businesses)
  * `en`: English (Expats, multinational enterprises, foreign direct investment)
  * `zh`: Simplified Chinese (Chinese investors, cross-border corporate ventures)
* **Performance:** 100/100 Core Web Vitals target (SSG, zero runtime bloat, CSS hardware-accelerated transitions).
* **Analytics & Tracking:** Integrated with Google Tag Manager (GTM), Google Analytics 4 (GA4), Microsoft Clarity, and Google Consent Mode v2.
* **Compliance:** PDPA compliance, Cookie Policy, Privacy Policy, and floating Apple-style consent banner.

---

## 2. Directory & Architecture Map

```
d:\Work_Dir\Law\
├── docs/
│   └── superpowers/
│       ├── specs/
│       │   └── 2026-09-08-law-firm-website-design.md
│       └── plans/
│           └── 2026-09-08-law-firm-website.md
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Navbar.astro           # Translucent glass navbar with mobile menu
│   │   │   ├── Footer.astro           # Corporate footer with credentials, links, contacts
│   │   │   ├── LanguageSwitcher.astro # Pill-style language toggler (TH / EN / 中文)
│   │   │   └── CookieBanner.astro     # Apple glass consent banner with Consent Mode v2
│   │   ├── home/
│   │   │   ├── Hero.astro             # High-impact typography, trust badges, primary CTA
│   │   │   ├── StatsCounter.astro     # Staggered stats grid (Years, Cases, Assets)
│   │   │   ├── ServicesGrid.astro     # 6 core practice cards with gold hover glow
│   │   │   ├── WhyChooseUs.astro      # Key differentiators & ethics
│   │   │   └── TeamPreview.astro      # Senior partners spotlight
│   │   ├── contact/
│   │   │   ├── ConsultationForm.astro # Interactive consultation form with dataLayer push
│   │   │   └── ContactChannels.astro  # Phone, Email, LINE, WeChat, WhatsApp cards
│   │   └── services/
│   │       ├── ServiceDetailHero.astro
│   │       └── ServiceFaq.astro
│   ├── layouts/
│   │   └── BaseLayout.astro           # HTML shell, SEO Meta, Hreflang, GTM, Clarity, Observer script
│   ├── i18n/
│   │   ├── index.ts                   # i18n helpers and language router
│   │   ├── th.ts                      # Thai translation dictionary & services data
│   │   ├── en.ts                      # English translation dictionary & services data
│   │   └── zh.ts                      # Chinese translation dictionary & services data
│   ├── pages/
│   │   ├── index.astro                # Redirects / renders default locale (th)
│   │   ├── [lang]/
│   │   │   ├── index.astro            # Localized Homepage
│   │   │   ├── about.astro            # Firm history, ethics, full attorney roster
│   │   │   ├── contact.astro          # Inquiries, consultation form, map
│   │   │   ├── cookie-policy.astro    # Cookie disclosure & consent management
│   │   │   ├── privacy-policy.astro   # PDPA / GDPR legal privacy policy
│   │   │   └── services/
│   │   │       ├── index.astro        # All practice areas
│   │   │       └── [slug].astro       # Individual practice area detail pages
│   ├── styles/
│   │   └── global.css                 # Tailwind directives, custom glassmorphism, Apple motion curves
│   └── utils/
│       ├── tracking.ts                # Typed window.dataLayer event dispatcher
│       └── consent.ts                 # Cookie consent storage & Consent Mode v2 sync
├── public/
│   ├── favicon.svg
│   ├── images/
│   └── robots.txt
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
├── package.json
└── AGENT.md                           # This file
```

---

## 3. Development Commands

* **Install dependencies:** `npm install`
* **Local development server:** `npm run dev`
* **Build static production bundle:** `npm run build`
* **Preview production build:** `npm run preview`
* **Type checking:** `npm run check` (via `astro check`)

---

## 4. Key Implementation Rules for Agents

1. **Zero Bloat Motion (Apple Style):**
   * Do NOT add heavy animation libraries (e.g. three.js, massive framer bundles).
   * Use CSS transitions with `cubic-bezier(0.16, 1, 0.3, 1)` and `IntersectionObserver` via `.reveal-init` and `.revealed`.
   * Keep DOM lightweight and responsive.

2. **Strict i18n Protocol:**
   * Every user-facing string must reside in `src/i18n/{th,en,zh}.ts`.
   * When modifying or adding navigation items or practice areas, update all 3 locales in tandem.
   * Internal links must always include `/${lang}/...` helper.

3. **DataLayer & Tracking Standards:**
   * Never hardcode direct GTM scripts inline inside page components. Everything routes through `BaseLayout.astro` and `src/utils/tracking.ts`.
   * All CTA clicks must dispatch typed events (`click_call`, `click_email`, `click_line`, `click_wechat`, `click_whatsapp`, `form_submit_lead`).
   * Cookie banner must trigger `cookie_consent_update` and update `gtag('consent', 'update', ...)`.

4. **SEO & Schema Integrity:**
   * All pages must emit canonical URL, alternate hreflang tags for `th`, `en`, `zh-Hans`, and `x-default`.
   * `LegalService` JSON-LD schema must be injected in `BaseLayout.astro`.

# High-Performance Multilingual Law Firm Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build an ultra-fast, SEO-optimized, trilingual (TH/EN/ZH) website for Vanguard & Partners Legal Counsel using Astro 5, Tailwind CSS, Apple-grade staggered scroll motion, GTM/GA4/Clarity tracking, and PDPA/Cookie compliance.

**Architecture:** Static Site Generation (SSG) with Astro's native i18n routing (`/th/`, `/en/`, `/zh/`), custom hardware-accelerated CSS staggered reveal animations controlled by an IntersectionObserver, zero heavy animation libraries, and a robust client-side `dataLayer` dispatcher for conversion tracking.

**Tech Stack:** Astro 5, Tailwind CSS, TypeScript, View Transitions API, Google Tag Manager, Google Consent Mode v2, Google Analytics 4, Microsoft Clarity.

## Global Constraints

* Output: Pure static files (`output: 'static'`) for maximum speed and Core Web Vitals (100/100 target).
* Locales: Exactly three locales: `th` (default), `en`, `zh`.
* Primary Palette: Deep Midnight Navy (`#060D1E`, `#0A142F`), Slate (`#1E293B`), Champagne Gold (`#C5A059`, `#DFBA73`).
* Motion: Pure CSS keyframes & transitions with Apple curve `cubic-bezier(0.16, 1, 0.3, 1)`. No bloated animation libraries.
* Tracking: GTM ID and Clarity ID injected safely via environment/configuration. All conversion CTAs must dispatch typed events to `window.dataLayer`.
* Compliance: Cookie Consent banner synced with Google Consent Mode v2 and persistent in `localStorage`.

---

### Task 1: Project Scaffolding & Configuration

**Files:**
- Create: `package.json`
- Create: `astro.config.mjs`
- Create: `tsconfig.json`
- Create: `tailwind.config.mjs`
- Create: `.env.example`
- Create: `public/robots.txt`

**Interfaces:**
- Produces: Astro build configuration with `@astrojs/tailwind`, `@astrojs/sitemap`, native i18n configuration, and TypeScript setup.

- [ ] **Step 1: Create package.json with dependencies**
Create `package.json` with Astro 5, Tailwind CSS, `@astrojs/tailwind`, `@astrojs/sitemap`, and TypeScript.

```json
{
  "name": "vanguard-law-firm",
  "type": "module",
  "version": "1.0.0",
  "scripts": {
    "dev": "astro dev",
    "start": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "check": "astro check"
  },
  "dependencies": {
    "@astrojs/check": "^0.9.4",
    "@astrojs/sitemap": "^3.2.1",
    "@astrojs/tailwind": "^6.0.0",
    "astro": "^5.4.2",
    "tailwindcss": "^3.4.17",
    "typescript": "^5.7.3"
  }
}
```

- [ ] **Step 2: Create tsconfig.json, astro.config.mjs, and tailwind.config.mjs**
Configure Astro native i18n:
```js
// astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://vanguard-legal.example.com',
  output: 'static',
  i18n: {
    defaultLocale: 'th',
    locales: ['th', 'en', 'zh'],
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: true
    }
  },
  integrations: [
    tailwind({
      applyBaseStyles: false
    }),
    sitemap({
      i18n: {
        defaultLocale: 'th',
        locales: {
          th: 'th',
          en: 'en',
          zh: 'zh'
        }
      }
    })
  ]
});
```

Configure `tailwind.config.mjs` with Prestige Executive theme colors:
```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#040814',
          900: '#060D1E',
          850: '#0A142F',
          800: '#0E1D43',
          700: '#15295C',
          600: '#1F3B82'
        },
        gold: {
          300: '#F5E2B3',
          400: '#DFBA73',
          500: '#C5A059',
          600: '#A4823E',
          700: '#7F6229'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif']
      },
      transitionTimingFunction: {
        'apple-ease': 'cubic-bezier(0.16, 1, 0.3, 1)'
      }
    }
  },
  plugins: []
};
```

- [ ] **Step 3: Run npm install**
Run: `npm install`
Expected: Dependencies installed with no critical errors.

- [ ] **Step 4: Commit**
```bash
git add package.json package-lock.json astro.config.mjs tsconfig.json tailwind.config.mjs .env.example public/
git commit -m "chore: initialize Astro project with Tailwind, i18n, and sitemap"
```

---

### Task 2: Global Styles, Apple Motion Curves & BaseLayout

**Files:**
- Create: `src/styles/global.css`
- Create: `src/layouts/BaseLayout.astro`

**Interfaces:**
- Consumes: Tailwind config, Google fonts, GTM/Clarity IDs.
- Produces: `BaseLayout.astro` supporting `title`, `description`, `lang`, `canonical`, schema JSON-LD, GTM scripts, and Apple scroll reveal observer.

- [ ] **Step 1: Write src/styles/global.css**
Define custom scrollbar, glassmorphism styles, and hardware-accelerated Apple motion classes (`.reveal-init`, `.revealed`, `.stagger-1` through `.stagger-4`).
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer utilities {
  .glass-card {
    background: rgba(10, 20, 47, 0.65);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(197, 160, 89, 0.15);
  }
  .glass-card-hover {
    transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .glass-card-hover:hover {
    transform: translateY(-4px);
    border-color: rgba(197, 160, 89, 0.4);
    box-shadow: 0 16px 32px -8px rgba(0, 0, 0, 0.5), 0 0 20px -4px rgba(197, 160, 89, 0.2);
  }
}

/* Apple-style reveal animation rules */
.reveal-init {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1), transform 0.85s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: opacity, transform;
}
.revealed {
  opacity: 1 !important;
  transform: translateY(0) !important;
}
.stagger-1 { transition-delay: 100ms; }
.stagger-2 { transition-delay: 200ms; }
.stagger-3 { transition-delay: 300ms; }
.stagger-4 { transition-delay: 400ms; }
```

- [ ] **Step 2: Write src/layouts/BaseLayout.astro**
Include:
- ViewTransitions for seamless page changes
- Multilingual alternate `hreflang` tags
- `LegalService` Schema JSON-LD
- Google Tag Manager script in `<head>` & `<noscript>` in `<body>`
- Microsoft Clarity script (when `PUBLIC_CLARITY_ID` provided)
- Client-side `IntersectionObserver` that attaches to all `.reveal-init` elements and triggers `.revealed` on scroll.

- [ ] **Step 3: Commit**
```bash
git add src/styles/global.css src/layouts/BaseLayout.astro
git commit -m "feat: add global styles, Apple motion classes, and BaseLayout"
```

---

### Task 3: Tracking Utility, Consent Engine & Cookie Banner

**Files:**
- Create: `src/utils/tracking.ts`
- Create: `src/utils/consent.ts`
- Create: `src/components/common/CookieBanner.astro`

**Interfaces:**
- Produces: `trackEvent(name, params)` for conversion tracking (`click_call`, `click_email`, `click_line`, `click_wechat`, `click_whatsapp`, `form_submit_lead`).
- Produces: `getConsent()`, `setConsent(preferences)` synchronized with `gtag('consent', 'update', ...)`.
- Produces: `CookieBanner.astro` rendered floating at bottom of screen.

- [ ] **Step 1: Create src/utils/tracking.ts**
Implement typed tracking functions that push into `window.dataLayer` safely.
- [ ] **Step 2: Create src/utils/consent.ts**
Implement consent mode v2 initialization and persistence in `localStorage`.
- [ ] **Step 3: Create src/components/common/CookieBanner.astro**
Build an Apple-style frosted glass floating banner with "Accept All", "Decline Non-Essential", and "Cookie Settings".
- [ ] **Step 4: Commit**
```bash
git add src/utils/ src/components/common/CookieBanner.astro
git commit -m "feat: implement tracking utilities, consent mode v2, and cookie banner"
```

---

### Task 4: Trilingual Localization System (TH, EN, ZH)

**Files:**
- Create: `src/i18n/index.ts`
- Create: `src/i18n/th.ts`
- Create: `src/i18n/en.ts`
- Create: `src/i18n/zh.ts`

**Interfaces:**
- Produces: `useTranslations(lang)` providing localized dictionary and 6 detailed practice areas, attorney bios, firm statistics, FAQ, and privacy/cookie texts.

- [ ] **Step 1: Write src/i18n/index.ts**
Define language types (`'th' | 'en' | 'zh'`), helper `getLangFromUrl(url)`, and slug mappings.
- [ ] **Step 2: Write src/i18n/th.ts**
Complete Thai translations for all navigation, hero, stats, 6 practice areas, team profiles, contact options, cookie/privacy policy.
- [ ] **Step 3: Write src/i18n/en.ts**
Complete English translations.
- [ ] **Step 4: Write src/i18n/zh.ts**
Complete Simplified Chinese translations.
- [ ] **Step 5: Commit**
```bash
git add src/i18n/
git commit -m "feat: complete trilingual dictionaries for TH, EN, and ZH"
```

---

### Task 5: Common Navigation Components (Navbar, LanguageSwitcher, Footer)

**Files:**
- Create: `src/components/common/LanguageSwitcher.astro`
- Create: `src/components/common/Navbar.astro`
- Create: `src/components/common/Footer.astro`

**Interfaces:**
- Consumes: `src/i18n/` translations, `tracking.ts`.
- Produces: Responsive floating glass navbar, capsule language switch (TH | EN | 中文), and comprehensive legal footer.

- [ ] **Step 1: Create src/components/common/LanguageSwitcher.astro**
Implement pill-shaped active language selector maintaining current path across locales.
- [ ] **Step 2: Create src/components/common/Navbar.astro**
Implement sticky glassmorphism navbar with brand logo, nav links, CTA button ("นัดปรึกษา / Free Consultation"), and mobile drawer menu.
- [ ] **Step 3: Create src/components/common/Footer.astro**
Implement footer with firm credentials, practice area quicklinks, contact channels, PDPA & Cookie policy links, and copyright.
- [ ] **Step 4: Commit**
```bash
git add src/components/common/
git commit -m "feat: implement Navbar, LanguageSwitcher, and Footer"
```

---

### Task 6: Homepage Components & Localized Homepage Routes

**Files:**
- Create: `src/components/home/Hero.astro`
- Create: `src/components/home/StatsCounter.astro`
- Create: `src/components/home/ServicesGrid.astro`
- Create: `src/components/home/WhyChooseUs.astro`
- Create: `src/components/home/TeamPreview.astro`
- Create: `src/components/home/HomeCta.astro`
- Create: `src/pages/[lang]/index.astro`
- Create: `src/pages/index.astro`

**Interfaces:**
- Consumes: All homepage components, `BaseLayout.astro`.
- Produces: Localized homepages for `/th/`, `/en/`, `/zh/` and root redirect `/`.

- [ ] **Step 1: Implement Hero.astro and StatsCounter.astro**
Apple-style staggered typography, badges ("20+ Years", "98% Success", "THB 10B+ Assets"), consultation button.
- [ ] **Step 2: Implement ServicesGrid.astro, WhyChooseUs.astro, and TeamPreview.astro**
Interactive service cards with gold accents, differentiators, senior partners profile cards.
- [ ] **Step 3: Create src/pages/[lang]/index.astro & src/pages/index.astro**
Assemble sections on the homepage with `getStaticPaths()` for `th`, `en`, `zh`.
- [ ] **Step 4: Verify local dev build for homepages**
Run: `npm run build`
Expected: Static build generates `/th/index.html`, `/en/index.html`, `/zh/index.html`.
- [ ] **Step 5: Commit**
```bash
git add src/components/home/ src/pages/
git commit -m "feat: implement homepage components and localized homepage routes"
```

---

### Task 7: Practice Areas Overview & Detail Pages

**Files:**
- Create: `src/pages/[lang]/services/index.astro`
- Create: `src/pages/[lang]/services/[slug].astro`

**Interfaces:**
- Consumes: `src/i18n/{th,en,zh}.ts` practice area content.
- Produces: Overview listing page and 6 in-depth practice area pages per language with breadcrumbs, service highlights, process walkthrough, and inquiry CTA.

- [ ] **Step 1: Implement src/pages/[lang]/services/index.astro**
Full grid of all 6 legal services with filter tags, summary descriptions, and links to detailed slugs.
- [ ] **Step 2: Implement src/pages/[lang]/services/[slug].astro**
Dynamic route generating all 6 practice areas per language via `getStaticPaths()`. Contains detailed legal scope, key considerations for foreign/domestic clients, and direct consultation trigger.
- [ ] **Step 3: Commit**
```bash
git add src/pages/[lang]/services/
git commit -m "feat: implement practice area overview and individual service detail pages"
```

---

### Task 8: About Us & Contact Pages

**Files:**
- Create: `src/components/contact/ConsultationForm.astro`
- Create: `src/components/contact/ContactChannels.astro`
- Create: `src/pages/[lang]/about.astro`
- Create: `src/pages/[lang]/contact.astro`

**Interfaces:**
- Consumes: `tracking.ts` for all conversion channels.
- Produces: About page with history, core ethics & attorney roster; Contact page with form and tracked click actions for Phone, Email, LINE, WeChat, WhatsApp.

- [ ] **Step 1: Implement ContactChannels.astro & ConsultationForm.astro**
Interactive form with validation, success state, and `trackEvent('form_submit_lead', ...)`; Click cards for phone, email, LINE, WeChat, WhatsApp with respective `trackEvent(...)` handlers.
- [ ] **Step 2: Implement src/pages/[lang]/about.astro**
About Us page showcasing firm values, track record, leadership team, and bar association credentials.
- [ ] **Step 3: Implement src/pages/[lang]/contact.astro**
Contact page containing `ContactChannels`, `ConsultationForm`, Bangkok CBD office address, and business hours.
- [ ] **Step 4: Commit**
```bash
git add src/components/contact/ src/pages/[lang]/about.astro src/pages/[lang]/contact.astro
git commit -m "feat: implement about page, contact channels, and consultation form with GTM tracking"
```

---

### Task 9: Compliance Pages (Cookie Policy & Privacy Policy)

**Files:**
- Create: `src/pages/[lang]/cookie-policy.astro`
- Create: `src/pages/[lang]/privacy-policy.astro`

**Interfaces:**
- Consumes: `src/utils/consent.ts`, localized legal texts.
- Produces: Cookie Policy with interactive consent toggles and Privacy Policy conforming to Thailand PDPA guidelines.

- [ ] **Step 1: Implement src/pages/[lang]/cookie-policy.astro**
Detailed cookie categories (Necessary, Analytics, Marketing) with live toggle buttons allowing users to change preferences and sync with Google Consent Mode v2.
- [ ] **Step 2: Implement src/pages/[lang]/privacy-policy.astro**
Comprehensive PDPA privacy disclosures in Thai, English, and Chinese.
- [ ] **Step 3: Commit**
```bash
git add src/pages/[lang]/cookie-policy.astro src/pages/[lang]/privacy-policy.astro
git commit -m "feat: implement cookie policy with interactive consent toggles and PDPA privacy policy"
```

---

### Task 10: Full Build Verification, SEO Audit & GTM Check

**Files:**
- Modify: Any necessary tweaks discovered during verification.

- [ ] **Step 1: Run type checking**
Run: `npm run check`
Expected: 0 diagnostic errors.

- [ ] **Step 2: Run production static build**
Run: `npm run build`
Expected: Build completes successfully, generating all HTML files in `dist/` for `/th/`, `/en/`, `/zh/`.

- [ ] **Step 3: Verify static files and SEO markup**
Inspect `dist/th/index.html`, `dist/en/index.html`, and `dist/zh/index.html` to confirm:
- `hreflang` tags exist for `th`, `en`, `zh-Hans`, `x-default`
- `LegalService` JSON-LD schema is present
- GTM container snippet is rendered
- Canonical URLs match page paths

- [ ] **Step 4: Final commit**
```bash
git commit --allow-empty -m "chore: verify production build and SEO compliance"
```

# Montclaire & Sterling Legal Counsel Website Demo

An ultra-fast, architectural, executive-grade international law firm website built with Astro 5, Tailwind CSS, and optimized for Cloudflare Workers / Pages deployment.

## Key Features

- **Trilingual Localization (i18n):** Complete parity across Thai (/th/), English (/en/), and Simplified Chinese (/zh/).
- **Prestige Legal Typography:** Powered by Google Fonts with *Sarabun* (official Thai legal standard) and *Cormorant Garamond* (executive serif headings).
- **Zero-Friction Anti-Spam Shield:** Dual-layer honeypot and time-based protection on the consultation form with optional Cloudflare Turnstile integration.
- **Enterprise Analytics & Compliance:** Google Consent Mode v2, Google Tag Manager (GA4 & Clarity), and PDPA-compliant Cookie Policy.
- **100/100 Core Web Vitals:** Static Site Generation (SSG), Priority Hints (etchpriority="high"), lazy loading, and async decoding.
- **Cloudflare Edge Deployment Ready:** Edge 301 redirects, 1-year immutable caching for static assets, and zero-cost Workers Free Tier architecture.

## Getting Started

### 1. Install Dependencies
`ash
npm install
`

### 2. Run Local Development Server
`ash
npm run dev
`

### 3. Build Production Bundle
`ash
npm run build
`

### 4. Deploy to Cloudflare Workers / Pages
`ash
npm run deploy
`

## Environment Variables (.env)

See .env.example for details:
- PUBLIC_SITE_URL: Primary website URL
- PUBLIC_GOOGLE_SCRIPT_URL: Webhook for Google Sheets & Email lead forwarding
- PUBLIC_GTM_ID: Google Tag Manager container ID
- PUBLIC_TURNSTILE_SITE_KEY: (Optional) Cloudflare Turnstile managed challenge key

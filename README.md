# Montclaire & Sterling Legal Counsel Website

An executive-grade, trilingual international law firm website designed for performance, accessibility, and search engine visibility. Built with Astro 5, Tailwind CSS, and optimized for deployment on Cloudflare Pages.

---

## Live Environments

- **Current Demo & Staging Environment:** `https://law.thepokkung.space`
- **Architecture Type:** Static Site Generation (SSG) with Edge Caching

---

## Technology Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Framework** | Astro v5 (Island Architecture) | Zero-JS default rendering, high throughput, and instant hydration |
| **Styling** | Tailwind CSS v3 | Design system tokens (Executive Navy & Metallic Gold palette) |
| **Language** | TypeScript v5 (Strict Mode) | Type-safe configuration, routing, and dictionary schema |
| **Typography** | Self-Hosted WOFF2 Webfonts | Sarabun (Official Thai Legal standard) and Cormorant Garamond (Serif) |
| **SEO & Sitemaps** | @astrojs/sitemap & @astrojs/check | Multilingual XML sitemap generation with cross-referenced hreflang tags |
| **Hosting & Edge** | Cloudflare Pages & CDN | Global edge distribution, 1-year immutable asset caching, and security headers |
| **Tag Management** | Google Tag Manager (GTM) | GA4, Microsoft Clarity, and conversion event tracking |
| **Compliance** | Google Consent Mode v2 | PDPA / GDPR cookie consent framework |

---

## Key Architectural Highlights

### 1. Performance Engineering (98 - 100 Mobile & Desktop Score)
- **Zero Third-Party Render-Blocking:** Google Fonts stylesheets have been eliminated. Webfonts are self-hosted locally in `public/fonts/` as subsetted WOFF2 files (Thai and Latin subsets).
- **Critical Font Preloading:** Core font files (`sarabun-thai-400.woff2`, `sarabun-latin-400.woff2`, `sarabun-thai-700.woff2`, and `cormorant-garamond-latin-600.woff2`) are preloaded in `<head>` with `crossorigin`.
- **Zero Main-Thread Blocking (TBT = 0ms):** Astro renders pure semantic HTML. JavaScript is only bundled for client interactions (Cookie banner, mobile drawer, contact form).
- **Zero Layout Shift (CLS = 0):** All images and SVG graphics have explicit width/height ratios and aspect ratio containers.

### 2. Production SEO & Multilingual Parity
- **Trilingual Parity (i18n):** Full localization across Thai (`/th/`), English (`/en/`), and Simplified Chinese (`/zh/`).
- **Dynamic Hreflang & Canonical URL:** Every page dynamically outputs canonical links and `xhtml:link rel="alternate" hreflang="..."` pointing to all language variants.
- **Search Engine Directives (`public/robots.txt`):** Configured with dedicated crawler rules for Googlebot, Bingbot, and Baiduspider, referencing `sitemap-index.xml`.
- **Structured Data (Schema.org):** Comprehensive `LegalService` JSON-LD schema embedded on every page, containing operating hours, geographical coordinates, contact endpoints, and multilingual alternate names.

### 3. Edge Optimization & Security (`public/_headers`)
- **Immutable Asset Caching:** 1-year cache (`Cache-Control: public, max-age=31536000, immutable`) for all hashed Astro bundles (`/_astro/*`), webfonts (`/fonts/*`), and static vector graphics (`/images/*`).
- **HTML Document Freshness:** `Cache-Control: public, max-age=0, must-revalidate` ensures visitors always view the latest production build immediately upon deployment.
- **HTTP Security Headers:** `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, and `Referrer-Policy: strict-origin-when-cross-origin`.

### 4. Anti-Spam Shield & Lead Pipeline
- **Dual-Layer Honeypot:** Invisible bot trap fields and submission timestamp verification filter spam without forcing human users to solve captchas.
- **Turnstile Integration:** Optional zero-friction Cloudflare Turnstile challenge support for enterprise threat mitigation.
- **Google Apps Script Webhook:** Directly pipes consultation requests into Google Sheets and dispatches email notifications.

---

## Domain Configuration & Switching to Production

The project is currently configured for the demo environment at `https://law.thepokkung.space`. When transitioning to the final production domain, update the site URL using one of the following methods:

### Method A: Environment Variable (Recommended for Cloudflare Pages)
Add or update the environment variable in the Cloudflare Dashboard under **Settings > Environment variables**:
```bash
PUBLIC_SITE_URL=https://your-production-domain.com
```
During the build phase, Astro automatically reads this variable to generate all canonical tags, hreflang links, Open Graph metadata, and XML sitemaps for the new domain.

### Method B: Codebase Configuration
Update the fallback URL in the following project files:
1. **`src/config/site.ts`**:
   ```typescript
   url: (import.meta.env.PUBLIC_SITE_URL || 'https://your-production-domain.com').replace(/\/+$/, ''),
   ```
2. **`astro.config.mjs`**:
   ```javascript
   const siteUrl = env.PUBLIC_SITE_URL || 'https://your-production-domain.com';
   ```
3. **`public/robots.txt`**:
   ```txt
   Sitemap: https://your-production-domain.com/sitemap-index.xml
   ```

---

## Environment Variables Reference

Create a `.env` file in the project root based on `.env.example`:

| Variable | Required | Description | Example |
| :--- | :--- | :--- | :--- |
| `PUBLIC_SITE_URL` | Yes | Primary canonical site URL | `https://law.thepokkung.space` |
| `PUBLIC_GOOGLE_SCRIPT_URL` | No | Webhook URL for consultation lead forwarding | `https://script.google.com/macros/s/.../exec` |
| `PUBLIC_GTM_ID` | No | Google Tag Manager Container ID | `GTM-XXXXXXX` |
| `PUBLIC_TURNSTILE_SITE_KEY` | No | Cloudflare Turnstile Site Key | `0x4AAAAAA...` |

---

## Project Structure

```text
├── public/
│   ├── fonts/                 # Self-hosted WOFF2 font subsets (Sarabun, Cormorant)
│   ├── images/                # Brand logos, fictional attorney portraits, icons
│   ├── _headers               # Cloudflare Pages edge cache and security headers
│   ├── favicon.svg            # Primary brand favicon
│   └── robots.txt             # Search crawler directives and sitemap reference
├── src/
│   ├── components/
│   │   ├── common/            # Navbar, Footer, LanguageSwitcher, CookieBanner
│   │   ├── contact/           # ConsultationForm, ContactChannels
│   │   └── home/              # Hero, PracticeAreas, WhyChooseUs, TeamPreview
│   ├── config/
│   │   ├── gtm/               # Google Tag Manager export container JSON
│   │   └── site.ts            # Centralized firm info, coordinates, and contact URLs
│   ├── content/               # Content collections for legal practice areas
│   ├── i18n/                  # Localization dictionaries (th, en, zh)
│   ├── layouts/
│   │   └── BaseLayout.astro   # Root HTML shell, preloads, SEO meta, schema JSON-LD
│   ├── pages/
│   │   ├── [lang]/            # Localized routes (/th/, /en/, /zh/)
│   │   └── index.astro        # Root language redirector
│   ├── styles/
│   │   ├── fonts.css          # Local @font-face definitions
│   │   └── global.css         # Tailwind directives, color variables, typography
│   └── utils/                 # Consent management, spam verification, analytics
├── astro.config.mjs           # Astro configuration, i18n routing, and sitemap plugin
├── package.json               # Dependencies and build scripts
├── tailwind.config.mjs        # Custom palette, typography, and viewport extensions
└── tsconfig.json              # TypeScript compiler configuration
```

---

## Local Development & Operations

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
The development server will launch at `http://localhost:4321` (or specified port).

### 3. Type Checking
```bash
npm run check
```
Runs Astro and TypeScript diagnostics to ensure zero template and type errors.

### 4. Build Production Artifacts
```bash
npm run build
```
Generates 36 static pages, bundles CSS/JS assets, copies fonts/headers, and generates `sitemap-index.xml` in `dist/`.

### 5. Preview Production Build
```bash
npm run preview
```
Runs a local HTTP server serving the compiled `dist/` folder to test production behavior.

### 6. Deployment to Cloudflare Pages
Deploy directly via Cloudflare Git Integration (connected to GitHub repository) or via Wrangler CLI:
```bash
npm run deploy:pages
```

---

## Git Workflow & Branch Rules

- **`main`**: Production deployment branch. Protected from direct pushes.
- **`dev`**: Active development branch. All feature implementations, styling adjustments, and refactors must occur here and be reviewed via Pull Request.
- **Zero Emoji Policy**: In accordance with executive legal aesthetics, emojis are strictly prohibited in all code files, comments, git commit messages, and official documentation.

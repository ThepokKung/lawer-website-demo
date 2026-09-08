import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import { loadEnv } from 'vite';

const env = loadEnv(process.env.NODE_ENV || 'production', process.cwd(), '');
const siteUrl = env.PUBLIC_SITE_URL || 'https://law.thepokkung.space';

export default defineConfig({
  site: siteUrl,
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

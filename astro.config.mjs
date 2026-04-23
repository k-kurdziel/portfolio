// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://kamilkurdziel.me',
  integrations: [
    react(),
    sitemap({
      i18n: {
        defaultLocale: 'pl',
        locales: { pl: 'pl-PL', en: 'en-US' },
      },
      filter: (page) => !/^https:\/\/kamilkurdziel\.me\/?$/.test(page),
    }),
  ],
});

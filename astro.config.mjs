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
      serialize(item) {
        item.lastmod = new Date().toISOString();
        if (item.links && item.links.length > 0) {
          const hasXDefault = item.links.some((l) => l.lang === 'x-default');
          if (!hasXDefault) {
            const enLink = item.links.find((l) => l.lang === 'en-US');
            if (enLink) {
              item.links.push({ lang: 'x-default', url: enLink.url });
            }
          }
        }
        return item;
      },
    }),
  ],
});

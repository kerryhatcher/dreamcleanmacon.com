import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: process.env.ASTRO_SITE || 'https://www.dreamcleanmacon.com',
  base: process.env.ASTRO_BASE || '/',
  output: 'static',
  integrations: [sitemap({
    filter: page => !/\/404\/?$/.test(new URL(page).pathname),
  })],
  devToolbar: { enabled: false },
});

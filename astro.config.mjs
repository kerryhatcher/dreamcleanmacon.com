import { defineConfig } from 'astro/config';

export default defineConfig({
  site: process.env.ASTRO_SITE || 'https://www.dreamcleanmacon.com',
  base: process.env.ASTRO_BASE || '/',
  output: 'static',
  devToolbar: { enabled: false },
});

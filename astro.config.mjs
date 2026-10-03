import { defineConfig } from 'astro/config';

export default defineConfig({
  site: process.env.ASTRO_SITE || 'https://dreamcleanmacon.com',
  base: process.env.ASTRO_BASE || '/',
  output: 'static',
  devToolbar: { enabled: false },
});

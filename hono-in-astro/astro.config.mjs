// @ts-check
import { defineConfig } from 'astro/config';

import cloudflare from '@astrojs/cloudflare';

import alpinejs from '@astrojs/alpinejs';

// https://astro.build/config
export default defineConfig({
  adapter: cloudflare(),
  output: 'server',
  integrations: [alpinejs()],
});
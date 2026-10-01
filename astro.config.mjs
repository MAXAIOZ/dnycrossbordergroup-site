import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Cloudflare Pages serves `about.html` at the clean URL `/about`,
// so we emit flat files and never use trailing slashes.
export default defineConfig({
  site: 'https://dnycrossbordergroup.com',
  trailingSlash: 'never',
  build: { format: 'file' },
  integrations: [sitemap()],
});

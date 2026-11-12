import { defineConfig } from 'astro/config';

// A fully static site: Cloudflare serves ./dist as static assets. There is no server code.
export default defineConfig({
  site: 'https://everyimagine.com',
  trailingSlash: 'never',
  build: {
    // /privacy -> dist/privacy.html, which Cloudflare serves at /privacy (no trailing slash)
    format: 'file',
  },
});

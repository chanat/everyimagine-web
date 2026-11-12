import type { APIRoute } from 'astro';
import { apps } from '../data/apps';
import { languages, href, SITE_URL, type Lang } from '../i18n';

const paths = ['/', ...apps.flatMap((a) => [`/${a.slug}`, `/${a.slug}/privacy`]), '/support', '/privacy', '/terms'];
const langs = Object.keys(languages) as Lang[];

export const GET: APIRoute = () => {
  const urls = paths
    .flatMap((path) =>
      langs.map((lang) => {
        const alternates = langs
          .map((l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${SITE_URL}${href(l, path)}"/>`)
          .join('\n');
        return `  <url>\n    <loc>${SITE_URL}${href(lang, path)}</loc>\n${alternates}\n  </url>`;
      }),
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};

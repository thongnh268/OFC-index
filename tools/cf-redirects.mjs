// Post-build step for the Cloudflare Pages (static) deploy. The /news routes are
// RenderMode.Client (so the daily Sanity updates show live without a rebuild), which means CF
// Pages must serve the client-render shell for their deep-links instead of 404ing. This writes a
// _redirects file at the browser output root: an SPA fallback to the EXTENSIONLESS
// <locale>/index.csr per locale, plus a root -> default-locale redirect (the Express SSR server
// does this at runtime; a static host can't). CF Pages reads _redirects from the deploy output
// root.
//
// The fallback target must be extensionless (/vi/index.csr, NOT /vi/index.csr.html): CF Pages
// canonicalizes .html URLs, so a 200 rewrite to *.html is turned into a 308 redirect to the
// extensionless URL - which changes the address bar and drops the /news/:slug (the slug is lost,
// so the page renders "post not found"). Targeting the extensionless path keeps it a true 200
// rewrite with the original URL intact.
import { writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const BROWSER_DIR = 'dist/ofc-index/browser';
const LOCALES = ['en', 'vi'];
const DEFAULT_LOCALE = 'vi'; // root "/" lands here; swap to 'en' if the export site should default to English
const CLIENT_PATHS = ['news', 'subsidiaries']; // Angular RenderMode.Client routes; every other route is prerendered

if (!existsSync(BROWSER_DIR)) {
  console.error(`${BROWSER_DIR} not found - run "ng build" first.`);
  process.exit(1);
}

const lines = [`/  /${DEFAULT_LOCALE}/  302`];
for (const locale of LOCALES) {
  for (const p of CLIENT_PATHS) {
    lines.push(`/${locale}/${p}  /${locale}/index.csr  200`);
    lines.push(`/${locale}/${p}/*  /${locale}/index.csr  200`);
  }
}
const body = lines.join('\n') + '\n';
writeFileSync(join(BROWSER_DIR, '_redirects'), body);
console.log(`Wrote ${BROWSER_DIR}/_redirects:\n${body}`);

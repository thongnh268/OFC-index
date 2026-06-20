import { RenderMode, ServerRoute } from '@angular/ssr';

// /news content changes daily (the aggregator writes to Sanity on a cron) and the site is served
// as static files on Cloudflare Pages. Prerendering would freeze the news at build time via the
// hydration transfer-cache, so the news routes render on the client and fetch live; every other
// (static) route is prerendered for SEO and speed.
export const serverRoutes: ServerRoute[] = [
  { path: 'news', renderMode: RenderMode.Client },
  { path: 'news/:slug', renderMode: RenderMode.Client },
  { path: '**', renderMode: RenderMode.Prerender },
];

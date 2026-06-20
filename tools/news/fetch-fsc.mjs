// FSC news adapter — FSC has no RSS or JSON:API, so this scrapes the server-rendered Drupal
// newscentre listing. Each "search-result-item" row carries the article's title, link and the
// real publish date (views-field-created → <time datetime>); the per-article summary comes from
// the detail page's og:description. EN only. Standalone CI script (run by the GitHub Actions cron).
//
// Usage: node tools/news/fetch-fsc.mjs   (prints a sample; no Sanity write)
import { pathToFileURL } from 'node:url';
import { fetchText } from './http.mjs';

const ORIGIN = 'https://fsc.org';
const LIST_URL = `${ORIGIN}/en/newscentre`;
const UA = 'Mozilla/5.0 (compatible; OFC-news-bot/1.0)';
const MAX_ITEMS = 15; // a daily clone only needs the newest; the listing carries dozens

const decode = (s) =>
  String(s ?? '')
    .replace(/&#0*39;|&apos;/g, "'")
    .replace(/&#0*38;|&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#0*60;|&lt;/g, '<')
    .replace(/&#0*62;|&gt;/g, '>')
    .replace(/&nbsp;/g, ' ');
const stripHtml = (s) =>
  decode(String(s ?? '').replace(/<[^>]*>/g, ' '))
    .replace(/\s+/g, ' ')
    .trim();

// Pure: listing HTML -> [{title, sourceUrl, publishedAt}] for newscentre articles (real dates).
export function parseFscList(html) {
  const rows = html.match(/<div class="search-result-item">[\s\S]*?(?=<div class="search-result-item">|$)/g) ?? [];
  const seen = new Set();
  const items = [];
  for (const row of rows) {
    const href = (row.match(/views-field-title[\s\S]*?<a href="([^"#?]+)"/) ?? [])[1];
    if (!href || !/^\/en\/newscentre\/(stories|general-news)\//.test(href)) continue;
    const url = ORIGIN + href;
    if (seen.has(url)) continue;
    seen.add(url);
    const dt = (row.match(/<time datetime="([^"]+)"/) ?? [])[1];
    const titleRaw = (row.match(/views-field-title[\s\S]*?<a [^>]*>([\s\S]*?)<\/a>/) ?? [])[1];
    items.push({
      source: 'FSC',
      title: stripHtml(titleRaw),
      sourceUrl: url,
      publishedAt: dt ? new Date(dt).toISOString() : null,
    });
  }
  return items;
}

// Inner HTML of every <div> whose class contains `className`, via balanced-div matching (regex
// alone can't pair nested divs). Used to lift the article body out of the ~390 KB of page chrome.
function blocksByClass(html, className) {
  const out = [];
  const open = new RegExp(`<div\\b[^>]*class="[^"]*${className}[^"]*"[^>]*>`, 'g');
  const tag = /<\/?div\b[^>]*>/g;
  let m;
  while ((m = open.exec(html))) {
    const start = m.index + m[0].length;
    tag.lastIndex = start;
    let depth = 1;
    let t;
    while ((t = tag.exec(html))) {
      depth += t[0][1] === '/' ? -1 : 1;
      if (depth === 0) {
        out.push(html.slice(start, t.index));
        break;
      }
    }
  }
  return out;
}

// FSC article body = the text fields inside the article node, concatenated. Scoping to
// node__content keeps nav/footer/related-article chrome out. Empty for photo-only stories
// (the detail page then falls back to the excerpt).
export function extractFscBody(html) {
  const node = blocksByClass(html, 'node__content')[0] ?? html;
  return blocksByClass(node, 'field--name-field-text')
    .join('\n')
    .trim();
}

// Pure: detail HTML -> { excerpt (og:description), image (og:image), body (article HTML) }.
export function parseFscDetail(html) {
  const og = (html.match(/property="og:description"\s+content="([^"]*)"/) ?? [])[1] ?? '';
  const img = (html.match(/property="og:image"\s+content="([^"]*)"/) ?? [])[1] ?? '';
  return {
    excerpt: decode(og).replace(/\s+/g, ' ').trim(),
    image: decode(img).trim() || null,
    body: extractFscBody(html),
  };
}

const get = (url) => fetchText(url, { headers: { 'user-agent': UA }, label: url });

export async function fetchFsc() {
  const list = parseFscList(await get(LIST_URL)).slice(0, MAX_ITEMS);
  const out = [];
  // Sequential, polite (one source, once a day); a failed detail keeps the headline + date + link.
  for (const it of list) {
    let excerpt = '';
    let image = null;
    let body = '';
    try {
      const d = parseFscDetail(await get(it.sourceUrl));
      excerpt = d.excerpt;
      image = d.image;
      body = d.body;
    } catch {
      /* detail unavailable — fall back to title + date + link only */
    }
    out.push({ ...it, excerpt, contentHtml: body, image });
  }
  return out;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const items = await fetchFsc();
  console.log(`FSC items: ${items.length}\n`);
  for (const f of items.slice(0, 3)) {
    console.log(f.publishedAt, '|', f.title);
    console.log('   ', f.sourceUrl);
    console.log('   ', f.excerpt.slice(0, 140));
  }
}

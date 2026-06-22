// SBP news adapter — fetches the Sustainable Biomass Program RSS feed and normalizes each
// item to the shape the daily aggregator stores in Sanity. Standalone CI/build script (run by
// the GitHub Actions cron); not part of the Angular bundle.
//
// Usage: node tools/news/fetch-sbp.mjs   (prints a sample; no Sanity write yet)
import { XMLParser } from 'fast-xml-parser';
import { pathToFileURL } from 'node:url';
import { fetchText } from './http.mjs';

const FEED_URL = 'https://sbp-cert.org/feed/';

const stripHtml = (s) =>
  String(s ?? '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

// Pure: RSS XML string -> normalized items. Kept separate from the network call so it can be
// unit-tested with a fixture (and so the parsing can be verified without outbound access).
export function parseSbp(xml) {
  const parser = new XMLParser({ ignoreAttributes: false, cdataPropName: '__cdata' });
  const doc = parser.parse(xml);
  const raw = doc?.rss?.channel?.item ?? [];
  const items = Array.isArray(raw) ? raw : [raw];

  // CDATA fields (description, content:encoded) parse to { __cdata }, so unwrap to a string.
  const text = (v) => (v == null ? '' : typeof v === 'string' ? v : (v.__cdata ?? v['#text'] ?? ''));
  const cleanUrl = (u) =>
    text(u)
      .replace(/&#0*38;|&amp;/g, '&')
      .trim()
      .split('?')[0]; // drop the ?utm_* tracking query → canonical article URL (also the dedup key)

  // Featured image: prefer the RSS media tags, else the first <img> in the article HTML.
  const mediaUrl = (v) => (Array.isArray(v) ? v[0] : v)?.['@_url'] ?? null;
  const firstImg = (html) => {
    const m = String(html).match(/<img[^>]+src=["']([^"']+)["']/i);
    return m ? m[1].replace(/&#0*38;|&amp;/g, '&') : null;
  };

  return items.map((it) => {
    const content = text(it['content:encoded']) || text(it.description);
    return {
      source: 'SBP',
      title: stripHtml(text(it.title)),
      sourceUrl: cleanUrl(it.link),
      publishedAt: it.pubDate ? new Date(it.pubDate).toISOString() : null,
      excerpt: stripHtml(text(it.description)).slice(0, 300),
      contentHtml: content,
      image: mediaUrl(it['media:thumbnail']) || mediaUrl(it['media:content']) || firstImg(content) || null,
    };
  });
}

// og:image from an article page (SBP's RSS carries no images, so we read the page meta).
const ogImage = (html) => {
  const m =
    html.match(/property=["']og:image["'][^>]*\scontent=["']([^"']+)["']/i) ||
    html.match(/content=["']([^"']+)["'][^>]*\sproperty=["']og:image["']/i);
  return m ? m[1] : null;
};

export async function fetchSbp() {
  const xml = await fetchText(FEED_URL, { headers: { 'user-agent': 'OFC-news-bot/1.0' }, label: 'SBP feed' });
  const items = parseSbp(xml);
  // Enrich with the article's og:image (sequential, polite; a failure just leaves image null).
  for (const it of items) {
    if (it.image) continue;
    try {
      const html = await fetchText(it.sourceUrl, {
        headers: { 'user-agent': 'OFC-news-bot/1.0' },
        label: it.sourceUrl,
      });
      const img = ogImage(html);
      // SBP's per-article og:image is just the site logo (a cropped logo makes a poor card cover),
      // so skip logos - those cards fall back to the placeholder. Real photos still come through.
      it.image = img && !/logo/i.test(img) ? img : null;
    } catch {
      /* keep image null */
    }
  }
  return items;
}

// Run directly → print a sample so we can verify the extraction against the live feed.
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const items = await fetchSbp();
  console.log(`SBP items: ${items.length}\n`);
  const f = items[0];
  console.log('--- newest item ---');
  console.log('title   :', f.title);
  console.log('date    :', f.publishedAt);
  console.log('link    :', f.sourceUrl);
  console.log('excerpt :', f.excerpt.slice(0, 160));
  console.log('content :', f.contentHtml.length, 'chars |', stripHtml(f.contentHtml).slice(0, 200), '...');
}

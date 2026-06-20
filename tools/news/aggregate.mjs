// Daily news aggregator — fetches the configured sources, normalizes each article, and upserts
// it into Sanity as a `post`. Idempotent: the document `_id` is derived from the article URL, so
// re-running replaces rather than duplicates (dedup). Run by the GitHub Actions cron.
//
//   node tools/news/aggregate.mjs            # fetch + write (needs SANITY_WRITE_TOKEN)
//   node tools/news/aggregate.mjs --dry-run  # fetch + print mutations, no write
import { createHash } from 'node:crypto';
import { pathToFileURL } from 'node:url';
import { fetchSbp } from './fetch-sbp.mjs';
import { fetchFsc } from './fetch-fsc.mjs';

const PROJECT = 'a2vvkgqy';
const DATASET = 'production';
const API_VERSION = '2026-03-01';

// Reduce cloned source HTML to clean semantic prose (p/h2/h3/ul/ol/li/a/strong/em/blockquote).
// - Drop <figure>/<img>: source images use relative or lazy-loaded src → broken on our domain
//   (the cover lives in mainImage anyway).
// - Unwrap Drupal/WordPress wrapper divs and strip their classes: the Drupal `field` class
//   collides with the app's global `.field` box style (styles.css), boxing every paragraph.
const cleanHtml = (html) =>
  String(html ?? '')
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<figure[\s\S]*?<\/figure>/gi, '')
    .replace(/<img[^>]*>/gi, '')
    .replace(/<\/?(?:div|span|picture|source|figcaption)\b[^>]*>/gi, '')
    .replace(/\s(?:class|style|id|width|height|loading|srcset|sizes|data-[\w-]+)="[^"]*"/gi, '')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

const slugFromUrl = (url) => (url.replace(/\/+$/, '').split('/').pop() || '').slice(0, 80);

// Deterministic id → idempotent upsert (same article never duplicates). MUST NOT contain a dot:
// Sanity treats any _id with a "." as a private path (drafts./versions.), so dotted ids are only
// readable with a token - the public site would never see them. Use a hyphen.
const docId = (url) => 'news-' + createHash('sha1').update(url).digest('hex').slice(0, 24);

// Pure: normalized items -> Sanity createOrReplace mutations. EN-only content is mirrored into
// both locales (vi + en) so the VN site shows it too (no translation, per spec).
export function buildMutations(items) {
  return items
    // publishedAt is required: with createOrReplace + a deterministic _id, stamping a fresh "now"
    // on a dateless item would re-float it to the top of the newest-first list every daily run.
    .filter((it) => it.sourceUrl && it.title && it.publishedAt)
    .map((it) => {
      const t = it.title;
      const ex = it.excerpt || '';
      return {
        createOrReplace: {
          _id: docId(it.sourceUrl),
          _type: 'post',
          // Set only when the source image was uploaded (main()); ref to the Sanity asset so the
          // existing card/detail UI renders the optimized thumbnail + alt with no extra changes.
          ...(it.imageAssetId
            ? {
                mainImage: {
                  _type: 'image',
                  asset: { _type: 'reference', _ref: it.imageAssetId },
                  alt: { _type: 'localeString', vi: t, en: t },
                },
              }
            : {}),
          title: { _type: 'localeString', vi: t, en: t },
          slug: { _type: 'slug', current: `${it.source.toLowerCase()}-${slugFromUrl(it.sourceUrl)}`.slice(0, 96) },
          publishedAt: it.publishedAt,
          excerpt: { _type: 'localeText', vi: ex, en: ex },
          bodyHtml: cleanHtml(it.contentHtml),
          source: it.source,
          sourceUrl: it.sourceUrl,
        },
      };
    });
}

// Download a source image and upload it to Sanity as an image asset; returns the asset _id
// (or null on any failure - a missing image just means the card falls back to its placeholder).
// Sanity dedupes assets by content hash, so re-running daily never piles up duplicate uploads.
async function uploadImage(imageUrl, token) {
  if (!imageUrl || !/^https?:\/\//i.test(imageUrl)) return null;
  try {
    const res = await fetch(imageUrl, { headers: { 'user-agent': 'OFC-news-bot/1.0' } });
    if (!res.ok) return null;
    const ct = (res.headers.get('content-type') || '').split(';')[0].trim() || 'image/jpeg';
    if (!ct.startsWith('image/')) return null;
    const body = Buffer.from(await res.arrayBuffer());
    const up = await fetch(`https://${PROJECT}.api.sanity.io/v${API_VERSION}/assets/images/${DATASET}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': ct },
      body,
    });
    if (!up.ok) return null;
    return (await up.json())?.document?._id ?? null;
  } catch {
    return null;
  }
}

async function writeToSanity(mutations) {
  const token = process.env.SANITY_WRITE_TOKEN;
  if (!token) throw new Error('SANITY_WRITE_TOKEN is not set');
  const url = `https://${PROJECT}.api.sanity.io/v${API_VERSION}/data/mutate/${DATASET}?returnIds=true`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ mutations }),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(`Sanity write failed: ${res.status} ${JSON.stringify(json)}`);
  return json.results?.length ?? 0;
}

async function main() {
  const dryRun = process.argv.includes('--dry-run');

  // Each source is isolated: one failing must not stop the others (resilience for the daily run).
  const sources = [
    { name: 'SBP', fetch: fetchSbp },
    { name: 'FSC', fetch: fetchFsc },
  ];
  const items = [];
  for (const s of sources) {
    try {
      const got = await s.fetch();
      items.push(...got);
      console.log(`[${s.name}] ${got.length} items`);
    } catch (e) {
      console.error(`[${s.name}] FAILED: ${e.message}`);
    }
  }

  if (dryRun) {
    for (const it of items)
      console.log(`  ${it.source} | body:${(it.contentHtml || '').length} img:${it.image ? 'y' : 'n'} | ${it.title.slice(0, 46)}`);
    const mutations = buildMutations(items);
    console.log(`Built ${mutations.length} mutations from ${items.length} items.`);
    console.log(JSON.stringify(mutations[0], null, 2).slice(0, 900));
    return;
  }

  const token = process.env.SANITY_WRITE_TOKEN;
  if (!token) throw new Error('SANITY_WRITE_TOKEN is not set');
  // Upload each source image to Sanity first, then attach the asset ref in buildMutations.
  let uploaded = 0;
  for (const it of items) {
    it.imageAssetId = await uploadImage(it.image, token);
    if (it.imageAssetId) uploaded++;
  }
  console.log(`Uploaded ${uploaded}/${items.length} images.`);

  const mutations = buildMutations(items);
  console.log(`Built ${mutations.length} mutations from ${items.length} items.`);
  const wrote = await writeToSanity(mutations);
  console.log(`Wrote/updated ${wrote} posts in Sanity.`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((e) => {
    console.error(e);
    process.exit(1);
  });
}

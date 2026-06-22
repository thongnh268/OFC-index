// Tests for the FSC listing parser. Pure-function tests over trimmed real markup — no network.
// Run: node --test tools/news/fetch-fsc.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseFscList } from './fetch-fsc.mjs';

// Trimmed real markup from fsc.org/en/newscentre — the current ".news-article-item-container" feed.
// Order is research (older) then general-news (newer) then a campaign landing row, to exercise sort.
const FEED = `
<div class="view-content">
  <div class="views-row"><div class="news-article-item-container">
    <div class="news-article-thumb-img left"><img src="/r.jpg" alt="r" /></div>
    <div class="news-article-info right">
      <span class="published-on"><time datetime="2025-09-23T10:00:00+02:00" class="datetime">September 23, 2025</time></span>
      <span class="article-title"><a href="/en/newscentre/research/soundscapes-reveal-higher-biodiversity" hreflang="en">Soundscapes reveal higher biodiversity</a></span>
    </div>
  </div></div>
  <div class="views-row"><div class="news-article-item-container">
    <div class="news-article-thumb-img left"><img src="/w.jpg" alt="w" /></div>
    <div class="news-article-info right">
      <span class="published-on"><time datetime="2026-06-18T15:09:25+02:00" class="datetime">June 18, 2026</time></span>
      <span class="article-title"><a href="/en/newscentre/general-news/public-webinar-on-key-changes" hreflang="en">Public webinar on key changes to FSC&#039;s requirements</a></span>
    </div>
  </div></div>
  <div class="views-row"><div class="news-article-item-container">
    <div class="news-article-info right">
      <span class="published-on"><time datetime="2026-05-15T16:33:56+02:00" class="datetime">May 15, 2026</time></span>
      <span class="article-title"><a href="/en/fsc-at-london-climate-action-week" hreflang="en">FSC at London Climate Action Week</a></span>
    </div>
  </div></div>
</div>`;

// The pre-redesign markup the old parser read — must now yield nothing (documents the format change).
const LEGACY = `
<div class="search-result-item">
  <div class="views-field views-field-created"><time datetime="2025-11-05T10:00:00+01:00">November 5, 2025</time></div>
  <div class="views-field views-field-title"><a href="/en/newscentre/general-news/italys-estate">Italy's estate</a></div>
</div>`;

test('parses the current feed, newest first, with decoded title', () => {
  const items = parseFscList(FEED);
  assert.equal(items.length, 2); // campaign /en/ landing row excluded
  assert.equal(items[0].source, 'FSC');
  assert.equal(items[0].publishedAt, '2026-06-18T13:09:25.000Z'); // newest first (UTC of +02:00)
  assert.equal(
    items[0].sourceUrl,
    'https://fsc.org/en/newscentre/general-news/public-webinar-on-key-changes',
  );
  assert.equal(items[0].title, "Public webinar on key changes to FSC's requirements"); // &#039; decoded
});

test('includes categories beyond stories/general-news (the original bug)', () => {
  const items = parseFscList(FEED);
  assert.ok(items.some((i) => i.sourceUrl.includes('/newscentre/research/')));
});

test('excludes campaign/landing links without a /newscentre/<category>/ path', () => {
  const items = parseFscList(FEED);
  assert.ok(!items.some((i) => i.sourceUrl.includes('/en/fsc-at-london')));
});

test('ignores the legacy .search-result-item markup', () => {
  assert.deepEqual(parseFscList(LEGACY), []);
});

test('returns [] for empty input', () => {
  assert.deepEqual(parseFscList(''), []);
});

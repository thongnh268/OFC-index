// Shared fetch with a few retries. The sources (especially FSC behind Cloudflare) occasionally
// reset a connection mid-handshake ("fetch failed"); a daily unattended run shouldn't drop a
// whole source over one transient blip, so retry a couple of times with a short backoff.
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchText(url, { headers = {}, retries = 3, label = url } = {}) {
  let lastErr;
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const res = await fetch(url, { headers });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.text();
    } catch (e) {
      lastErr = e;
      if (attempt < retries) await sleep(500 * attempt);
    }
  }
  throw new Error(`fetch failed for ${label}: ${lastErr?.message ?? lastErr}`);
}

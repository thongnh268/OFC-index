/**
 * Serves the localized SSR builds: one Node process per locale server bundle,
 * fronted by a tiny reverse proxy on PORT (default 4000).
 *
 *   /vi/** -> vi server   /en/** -> en server   anything else -> /vi (default)
 */
import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import http from 'node:http';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = join(dirname(fileURLToPath(import.meta.url)), '..');
const DEFAULT_LOCALE = 'vi';
const LOCALES = [
  { id: 'vi', port: 4101 },
  { id: 'en', port: 4102 },
];
const port = Number(process.env.PORT ?? 4000);

for (const locale of LOCALES) {
  const serverEntry = join(rootDir, 'dist', 'ofc-index', 'server', locale.id, 'server.mjs');

  if (!existsSync(serverEntry)) {
    console.error(`Missing ${serverEntry} — run \`npm run build\` first.`);
    process.exit(1);
  }

  const child = spawn(process.execPath, [serverEntry], {
    env: { ...process.env, PORT: String(locale.port) },
    stdio: 'inherit',
  });

  child.on('exit', (code) => {
    console.error(`Locale server "${locale.id}" exited with code ${code}.`);
    process.exit(code ?? 1);
  });
}

const proxy = http.createServer((req, res) => {
  const url = req.url ?? '/';
  const locale = LOCALES.find(({ id }) => url === `/${id}` || url.startsWith(`/${id}/`));

  if (!locale) {
    res.writeHead(302, { Location: `/${DEFAULT_LOCALE}${url === '/' ? '/' : url}` });
    res.end();
    return;
  }

  const upstreamReq = http.request(
    {
      host: '127.0.0.1',
      port: locale.port,
      path: url,
      method: req.method,
      headers: req.headers,
    },
    (upstreamRes) => {
      res.writeHead(upstreamRes.statusCode ?? 502, upstreamRes.headers);
      upstreamRes.pipe(res);
    },
  );

  upstreamReq.on('error', () => {
    res.writeHead(502, { 'Content-Type': 'text/plain' });
    res.end(`Locale server "${locale.id}" unavailable`);
  });

  req.pipe(upstreamReq);
});

proxy.listen(port, () => {
  console.log(`OFC site (locales: vi default, en) on http://localhost:${port}`);
});

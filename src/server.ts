import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine, isMainModule } from '@angular/ssr/node';
import express from 'express';
import { basename, dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import bootstrap from './main.server';

const serverDistFolder = dirname(fileURLToPath(import.meta.url));
// Localized builds emit dist/<app>/server/<locale>/server.mjs; non-localized
// builds (e.g. dev) emit dist/<app>/server/server.mjs.
const localeId = basename(serverDistFolder);
const isLocalizedBuild = localeId !== 'server';
const browserDistFolder = isLocalizedBuild
  ? resolve(serverDistFolder, '../../browser', localeId)
  : resolve(serverDistFolder, '../browser');
const baseHref = isLocalizedBuild ? `/${localeId}/` : '/';
const indexHtml = join(serverDistFolder, 'index.server.html');

const app = express();
const commonEngine = new CommonEngine();

/**
 * Redirect the bare root to this build's locale prefix.
 */
app.get('/', (req, res, next) => {
  if (isLocalizedBuild) {
    res.redirect(302, baseHref);
    return;
  }

  next();
});

/**
 * Serve static files (incl. prerendered pages) from /browser under the locale prefix.
 */
app.use(
  isLocalizedBuild ? `/${localeId}` : '/',
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: 'index.html',
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.get('**', (req, res, next) => {
  const { protocol, originalUrl, headers } = req;

  commonEngine
    .render({
      bootstrap,
      documentFilePath: indexHtml,
      url: `${protocol}://${headers.host}${originalUrl}`,
      publicPath: browserDistFolder,
      providers: [{ provide: APP_BASE_HREF, useValue: baseHref }],
    })
    .then((html) => res.send(html))
    .catch((err) => next(err));
});

/**
 * Start the server if this module is the main entry point.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, () => {
    console.log(`Node Express server (${localeId}) listening on http://localhost:${port}`);
  });
}

export default app;

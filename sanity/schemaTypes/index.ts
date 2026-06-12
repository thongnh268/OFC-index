import { localeBlock, localeString, localeText } from './objects/locale';
import { author } from './documents/author';
import { category } from './documents/category';
import { post } from './documents/post';
import { siteSettings } from './singletons/site-settings';

// Document types edited in place — exactly one instance each (see structure.ts).
// Homepage editorial content is code-owned (src/app/pages/home/home-content.data.ts),
// not CMS-managed: it changes ~yearly and only with a designer/dev in the loop.
export const singletonTypes = new Set(['siteSettings']);

export const schemaTypes = [
  localeString,
  localeText,
  localeBlock,
  author,
  category,
  post,
  siteSettings,
];

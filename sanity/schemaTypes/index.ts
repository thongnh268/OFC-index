import { localeBlock, localeString, localeText } from './objects/locale';
import { author } from './documents/author';
import { category } from './documents/category';
import { post } from './documents/post';
import { recruitmentJob } from './documents/recruitment-job';
import { siteSettings } from './singletons/site-settings';
import { subsidiaries } from './singletons/subsidiaries';

// Document types edited in place - exactly one instance each (see structure.ts).
// Homepage editorial copy is code-owned (src/app/pages/home/home-content.data.ts);
// siteSettings only owns operational overrides and replaceable media such as hero image.
export const singletonTypes = new Set(['siteSettings', 'subsidiaries']);

export const schemaTypes = [
  localeString,
  localeText,
  localeBlock,
  author,
  category,
  post,
  recruitmentJob,
  siteSettings,
  subsidiaries,
];

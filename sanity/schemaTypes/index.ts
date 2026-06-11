import { localeBlock, localeString, localeText } from './objects/locale';
import { author } from './documents/author';
import { category } from './documents/category';
import { post } from './documents/post';
import { homepage } from './singletons/homepage';
import { siteSettings } from './singletons/site-settings';

// Document types edited in place — exactly one instance each (see structure.ts).
export const singletonTypes = new Set(['siteSettings', 'homepage']);

export const schemaTypes = [
  localeString,
  localeText,
  localeBlock,
  author,
  category,
  post,
  siteSettings,
  homepage,
];

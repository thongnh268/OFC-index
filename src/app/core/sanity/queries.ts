// GROQ queries. `$locale` ('vi' | 'en') is bound automatically by SanityService.fetch();
// project localized objects with coalesce(field[$locale], field.vi) — vi is the site default.
export const POSTS_QUERY = `*[_type == "post"] | order(publishedAt desc) {
  _id,
  "slug": slug.current,
  "title": coalesce(title[$locale], title.vi),
  "excerpt": coalesce(excerpt[$locale], excerpt.vi),
  publishedAt,
  "author": author->name
}`;

// Singleton — projects only fields that exist in the homepage schema today (hero).
// Grows section by section after the Figma freeze; sections without a CMS field fall
// back to HOME_CONTENT_PLACEHOLDER in HomeContentService.
export const HOME_QUERY = `*[_type == "homepage"][0] {
  "hero": {
    "heading": coalesce(hero.heading[$locale], hero.heading.vi),
    "subheading": coalesce(hero.subheading[$locale], hero.subheading.vi),
    "imageUrl": hero.image.asset->url
  }
}`;

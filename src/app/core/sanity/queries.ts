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

// GROQ queries. `$locale` ('vi' | 'en') is bound automatically by SanityService.fetch();
// project localized objects with coalesce(field[$locale], field.vi) - vi is the site default.

// Latest posts for the home "News & updates" carousel - includes aggregated/cloned news
// (SBP/FSC) alongside OFC's own posts, newest first, same pool as the /news index.
export const NEWS_QUERY = `*[_type == "post"] | order(publishedAt desc)[0...12] {
  "slug": slug.current,
  "title": coalesce(title[$locale], title.vi),
  "imageUrl": mainImage.asset->url,
  publishedAt
}`;

// Full blog index for the /news list page - every post, newest first, with card fields.
// `source` is set on aggregated/cloned news (SBP/FSC) and null on original OFC posts; the card
// shows it as a small badge.
export const POSTS_QUERY = `*[_type == "post"] | order(publishedAt desc) {
  _id,
  "slug": slug.current,
  "title": coalesce(title[$locale], title.vi),
  "excerpt": coalesce(excerpt[$locale], excerpt.vi),
  "imageUrl": mainImage.asset->url + "?w=800&q=75&auto=format",
  publishedAt,
  "author": author->name,
  source
}`;

export const POSTS_PAGE_QUERY = `{
  "items": *[_type == "post"] | order(publishedAt desc)[$start...$end] {
    _id,
    "slug": slug.current,
    "title": coalesce(title[$locale], title.vi),
    "excerpt": coalesce(excerpt[$locale], excerpt.vi),
    "imageUrl": mainImage.asset->url + "?w=800&q=75&auto=format",
    publishedAt,
    "author": author->name,
    source
  },
  "total": count(*[_type == "post"])
}`;

// Recruitment jobs are CMS-owned. The page intentionally has no code fallback:
// an empty result renders the empty state.
export const RECRUITMENT_JOBS_QUERY = `*[_type == "recruitmentJob" && coalesce(isActive, true)] | order(code asc) {
  code,
  "title": coalesce(title[$locale], title.vi),
  "responsibilities": coalesce(responsibilities[$locale], responsibilities.vi),
  "requirements": coalesce(requirements[$locale], requirements.vi),
  "compensation": coalesce(compensation[$locale], compensation.vi),
  "benefits": coalesce(benefits[$locale], benefits.vi)
}`;

// One post by slug for /news/[slug]. Original OFC posts carry Portable Text `body`; aggregated
// news (SBP/FSC) carries raw `bodyHtml` plus `source`/`sourceUrl` for the "Read original" link.
// body's inline image assets resolve to CDN-optimized URLs so the renderer can <img> them directly.
export const POST_BY_SLUG_QUERY = `*[_type == "post" && slug.current == $slug][0]{
  "slug": slug.current,
  "title": coalesce(title[$locale], title.vi),
  "excerpt": coalesce(excerpt[$locale], excerpt.vi),
  "imageUrl": mainImage.asset->url + "?w=1600&q=80&auto=format",
  "imageAlt": coalesce(mainImage.alt[$locale], mainImage.alt.vi),
  publishedAt,
  "author": author->name,
  bodyHtml,
  source,
  sourceUrl,
  "body": coalesce(body[$locale], body.vi)[]{
    ...,
    _type == "image" => { ..., "url": asset->url + "?w=1200&q=80&auto=format" }
  }
}`;

// Subsidiaries network - the single "subsidiaries" document holds the ports, each with its
// mills in order. Locale-independent (proper nouns + figures), so no $locale.
export const SUBSIDIARIES_QUERY = `*[_type == "subsidiaries"][0]{
  ports[]{
    name,
    subsidiaries[]{ name, location, capacity, distance, rawMaterial }
  }
}`;

// Site settings singleton - company/contact facts + replaceable site media.
// Every field is an optional override;
// SiteSettingsService overlays whatever the CMS returns onto the code-owned company defaults.
// The hero URL carries image-pipeline params (cap width, modern format, sane quality) so the
// CDN never serves a multi-MB original; a missing image stays null (GROQ propagates null through +).
export const SETTINGS_QUERY = `*[_type == "siteSettings"][0] {
  "siteTitle": coalesce(siteTitle[$locale], siteTitle.vi),
  "heroImageUrl": heroImage.asset->url + "?w=1920&q=75&auto=format&fit=max",
  "partnerLogos": partnerLogos[]{ name, "imageUrl": logo.asset->url + "?w=400&h=200&fit=max&auto=format" },
  "brand": coalesce(brand[$locale], brand.vi),
  "legalName": coalesce(legalName[$locale], legalName.vi),
  taxCode,
  "shortAddress": coalesce(shortAddress[$locale], shortAddress.vi),
  "logoUrl": logo.asset->url,
  "offices": offices[]{
    "label": coalesce(label[$locale], label.vi),
    "address": coalesce(address[$locale], address.vi),
    "isMain": coalesce(isMain, false)
  },
  hotline,
  opsName,
  opsPhone,
  email,
  website,
  "socials": socials[]{ platform, url }
}`;

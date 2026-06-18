/** Shape returned by POSTS_QUERY - localized fields are projected to plain strings. */
export interface PostSummary {
  readonly _id: string;
  readonly slug: string;
  readonly title: string | null;
  readonly excerpt: string | null;
  readonly imageUrl: string | null;
  /** ISO 8601 datetime, e.g. 2026-06-11T08:00:00Z */
  readonly publishedAt: string;
  readonly author: string | null;
}

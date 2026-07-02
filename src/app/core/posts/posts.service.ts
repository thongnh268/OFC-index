import { Injectable, inject } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import type { Observable } from 'rxjs';

import {
  NEWS_QUERY,
  POSTS_PAGE_QUERY,
  POSTS_QUERY,
  POST_BY_SLUG_QUERY,
  SanityService,
} from '../sanity';
import type { PortableTextNode, PostSummary } from '../sanity';

// A post as the home news carousel needs it. publishedAt is the ISO datetime string
// Sanity stores; templates format it with DatePipe.
export interface PostCard {
  readonly slug: string;
  readonly title: string;
  readonly imageUrl: string | null;
  readonly publishedAt: string;
}

interface PostCardDto {
  readonly slug: string | null;
  readonly title: string | null;
  readonly imageUrl: string | null;
  readonly publishedAt: string | null;
}

// A card on the /news index - like PostCard, plus excerpt + author for the list layout.
export interface PostListItem {
  readonly slug: string;
  readonly title: string;
  readonly excerpt: string | null;
  readonly imageUrl: string | null;
  readonly publishedAt: string;
  readonly author: string | null;
  // 'SBP' | 'FSC' for aggregated news, null for original OFC posts - shown as a card badge.
  readonly source: string | null;
}

export interface PostListPage {
  readonly items: readonly PostListItem[];
  readonly total: number;
}

interface PostListPageDto {
  readonly items: readonly PostSummary[] | null;
  readonly total: number | null;
}

// A single post for the /news/[slug] detail page. Original OFC posts render `body` (Portable
// Text); aggregated news (SBP/FSC) renders `bodyHtml` (sanitized) and links to `sourceUrl`.
export interface PostDetail {
  readonly slug: string;
  readonly title: string;
  readonly excerpt: string | null;
  readonly imageUrl: string | null;
  readonly imageAlt: string | null;
  readonly publishedAt: string;
  readonly author: string | null;
  readonly body: readonly PortableTextNode[];
  readonly bodyHtml: string | null;
  readonly source: string | null;
  readonly sourceUrl: string | null;
}

interface PostDetailDto {
  readonly slug: string | null;
  readonly title: string | null;
  readonly excerpt: string | null;
  readonly imageUrl: string | null;
  readonly imageAlt: string | null;
  readonly publishedAt: string | null;
  readonly author: string | null;
  readonly body: readonly PortableTextNode[] | null;
  readonly bodyHtml: string | null;
  readonly source: string | null;
  readonly sourceUrl: string | null;
}

@Injectable({ providedIn: 'root' })
export class PostsService {
  private readonly sanity = inject(SanityService);

  // Latest posts, newest first. Errors and half-filled drafts resolve to [] / get
  // dropped - the home page simply hides the news section when there is nothing to show.
  getLatest(): Observable<PostCard[]> {
    return this.sanity.fetch<readonly PostCardDto[] | null>(NEWS_QUERY).pipe(
      map((posts) =>
        (posts ?? [])
          .filter((post) => post.slug && post.title && post.publishedAt)
          .map((post) => ({
            slug: post.slug ?? '',
            title: post.title ?? '',
            imageUrl: post.imageUrl ?? null,
            publishedAt: post.publishedAt ?? '',
          })),
      ),
      catchError(() => of([])),
    );
  }

  // Every post for the /news index, newest first. Same resilience as getLatest:
  // half-filled drafts are dropped and any failure resolves to an empty list.
  getAll(): Observable<PostListItem[]> {
    return this.sanity.fetch<readonly PostSummary[] | null>(POSTS_QUERY).pipe(
      map((posts) => this.toPostListItems(posts ?? [])),
      catchError(() => of([])),
    );
  }

  // Server-side/CMS pagination for /news. Sanity returns only the requested range plus
  // the total count so the UI can render pagination without loading the whole archive.
  getPage(page: number, pageSize: number): Observable<PostListPage> {
    const safePage = Number.isInteger(page) && page > 0 ? page : 1;
    const safePageSize = Number.isInteger(pageSize) && pageSize > 0 ? pageSize : 1;
    const start = (safePage - 1) * safePageSize;
    const end = start + safePageSize;

    return this.sanity.fetch<PostListPageDto | null>(POSTS_PAGE_QUERY, { start, end }).pipe(
      map((result) => ({
        items: this.toPostListItems(result?.items ?? []),
        total: Math.max(0, result?.total ?? 0),
      })),
      catchError(() => of({ items: [], total: 0 })),
    );
  }

  // One post by slug, or null when it's missing / unpublished / half-filled - the detail
  // page renders a 404 for null.
  getBySlug(slug: string): Observable<PostDetail | null> {
    return this.sanity.fetch<PostDetailDto | null>(POST_BY_SLUG_QUERY, { slug }).pipe(
      map((post) => {
        if (!post?.slug || !post.title || !post.publishedAt) {
          return null;
        }
        return {
          slug: post.slug,
          title: post.title,
          excerpt: post.excerpt ?? null,
          imageUrl: post.imageUrl ?? null,
          imageAlt: post.imageAlt ?? null,
          publishedAt: post.publishedAt,
          author: post.author ?? null,
          body: post.body ?? [],
          bodyHtml: post.bodyHtml ?? null,
          source: post.source ?? null,
          sourceUrl: post.sourceUrl ?? null,
        };
      }),
      catchError(() => of(null)),
    );
  }

  private toPostListItems(posts: readonly PostSummary[]): PostListItem[] {
    return posts
      .filter((post) => post.slug && post.title && post.publishedAt)
      .map((post) => ({
        slug: post.slug,
        title: post.title ?? '',
        excerpt: post.excerpt ?? null,
        imageUrl: post.imageUrl ?? null,
        publishedAt: post.publishedAt,
        author: post.author ?? null,
        source: post.source ?? null,
      }));
  }
}

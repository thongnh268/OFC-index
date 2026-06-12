import { Injectable, inject } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import type { Observable } from 'rxjs';

import { NEWS_QUERY, SanityService } from '../sanity';

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

@Injectable({ providedIn: 'root' })
export class PostsService {
  private readonly sanity = inject(SanityService);

  // Latest posts, newest first. Errors and half-filled drafts resolve to [] / get
  // dropped — the home page simply hides the news section when there is nothing to show.
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
}

import { Injectable, inject } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import type { Observable } from 'rxjs';

import { HOME_QUERY, SanityService } from '../../core/sanity';
import { HOME_CONTENT_PLACEHOLDER } from './home-content.placeholder';
import type { HomeContent } from './home-content.model';

// What HOME_QUERY can return today (hero only; null when no homepage document exists).
interface HomeContentDto {
  readonly hero: {
    readonly heading: string | null;
    readonly subheading: string | null;
    readonly imageUrl: string | null;
  } | null;
}

@Injectable({ providedIn: 'root' })
export class HomeContentService {
  private readonly sanity = inject(SanityService);

  // CMS values overlay the placeholder field by field — a section (or single field) the
  // CMS hasn't filled keeps its placeholder, so the page never renders blank or breaks.
  getContent(): Observable<HomeContent> {
    return this.sanity.fetch<HomeContentDto | null>(HOME_QUERY).pipe(
      map((dto) => this.merge(dto)),
      catchError(() => of(HOME_CONTENT_PLACEHOLDER)),
    );
  }

  private merge(dto: HomeContentDto | null): HomeContent {
    const hero = dto?.hero;

    return {
      ...HOME_CONTENT_PLACEHOLDER,
      hero: {
        heading: hero?.heading ?? HOME_CONTENT_PLACEHOLDER.hero.heading,
        subheading: hero?.subheading ?? HOME_CONTENT_PLACEHOLDER.hero.subheading,
        imageUrl: hero?.imageUrl ?? HOME_CONTENT_PLACEHOLDER.hero.imageUrl,
      },
    };
  }
}

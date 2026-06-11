import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, LOCALE_ID, inject } from '@angular/core';
import { map } from 'rxjs/operators';
import type { Observable } from 'rxjs';

import { SANITY_CONFIG } from './config';

// Goes through HttpClient (not @sanity/client) so SSR responses are transfer-cached:
// the server fetches once and the browser hydrates without re-fetching.
@Injectable({ providedIn: 'root' })
export class SanityService {
  private readonly http = inject(HttpClient);

  /** Locale of this build ('vi' | 'en') — bound into every query as $locale. */
  readonly locale = inject(LOCALE_ID).startsWith('vi') ? 'vi' : 'en';

  private readonly queryUrl =
    `https://${SANITY_CONFIG.projectId}.apicdn.sanity.io` +
    `/v${SANITY_CONFIG.apiVersion}/data/query/${SANITY_CONFIG.dataset}`;

  /** Run a GROQ query against the published, CDN-cached dataset. */
  fetch<T>(query: string, params: Record<string, unknown> = {}): Observable<T> {
    let httpParams = new HttpParams().set('query', query).set('perspective', 'published');

    for (const [key, value] of Object.entries({ locale: this.locale, ...params })) {
      httpParams = httpParams.set(`$${key}`, JSON.stringify(value));
    }

    return this.http
      .get<{ result: T }>(this.queryUrl, { params: httpParams })
      .pipe(map((response) => response.result));
  }
}

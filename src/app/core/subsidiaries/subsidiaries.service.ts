import { Injectable, inject } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import type { Observable } from 'rxjs';

import { SUBSIDIARIES_QUERY, SanityService } from '../sanity';
import { SUBSIDIARY_PORTS } from './subsidiaries.data';
import type { Subsidiary, SubsidiaryPort } from './subsidiaries.data';

// Shape of the single "subsidiaries" document SUBSIDIARIES_QUERY returns.
interface SubsidiaryItemDto {
  readonly name: string | null;
  readonly location: string | null;
  readonly capacity: string | null;
  readonly distance: string | null;
  readonly rawMaterial: string | null;
}
interface PortDto {
  readonly name: string | null;
  readonly subsidiaries: readonly SubsidiaryItemDto[] | null;
}
interface SubsidiariesDto {
  readonly ports: readonly PortDto[] | null;
}

@Injectable({ providedIn: 'root' })
export class SubsidiariesService {
  private readonly sanity = inject(SanityService);

  // The CMS-managed network (single document, ports → mills). Falls back to the code-owned default
  // set when Sanity has no document (or on error), so the page is never empty.
  getPorts(): Observable<readonly SubsidiaryPort[]> {
    return this.sanity.fetch<SubsidiariesDto | null>(SUBSIDIARIES_QUERY).pipe(
      map((doc) => this.normalize(doc?.ports ?? [])),
      map((ports) => (ports.length ? ports : SUBSIDIARY_PORTS)),
      catchError(() => of(SUBSIDIARY_PORTS)),
    );
  }

  // Drop ports/mills missing a name and coerce nulls to undefined to match the view model.
  private normalize(ports: readonly PortDto[]): SubsidiaryPort[] {
    return ports
      .filter((port) => Boolean(port?.name))
      .map((port) => ({
        name: port.name as string,
        subsidiaries: (port.subsidiaries ?? [])
          .filter((item) => Boolean(item?.name))
          .map(
            (item): Subsidiary => ({
              name: item.name as string,
              location: item.location ?? undefined,
              capacity: item.capacity ?? undefined,
              distance: item.distance ?? undefined,
              rawMaterial: item.rawMaterial ?? undefined,
            }),
          ),
      }));
  }
}

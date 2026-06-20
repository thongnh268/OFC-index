import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';

import { IconComponent } from '../../shared/components/icon/icon.component';
import { InnerPageComponent } from '../../shared/components/inner-page/inner-page.component';
import type { BreadcrumbItem } from '../../shared/components/breadcrumb/breadcrumb.component';
import { SUBSIDIARY_COLLAPSE_LIMIT } from '../../core/subsidiaries';
import type { Subsidiary, SubsidiaryPort } from '../../core/subsidiaries';

// /subsidiaries - the port-grouped network of mills/companies inside the shared inner-page chrome.
// Ports are resolved from Sanity (route resolver, app.routes.ts) so the data is present before the
// router restores scroll; ports longer than the collapse limit show a "View more" toggle.
@Component({
  selector: 'app-subsidiaries',
  standalone: true,
  imports: [DecimalPipe, IconComponent, InnerPageComponent],
  templateUrl: './subsidiaries.component.html',
  styleUrl: './subsidiaries.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubsidiariesComponent {
  protected readonly ports = toSignal(
    inject(ActivatedRoute).data.pipe(map((d) => (d['ports'] ?? []) as readonly SubsidiaryPort[])),
    { initialValue: [] as readonly SubsidiaryPort[] },
  );
  protected readonly collapseLimit = SUBSIDIARY_COLLAPSE_LIMIT;
  protected readonly bannerImage = 'assets/images/hero-banner.webp';
  protected readonly title = $localize`:@@subsidiaries.title:Subsidiaries Network`;

  protected readonly breadcrumb: readonly BreadcrumbItem[] = [
    { label: $localize`:@@common.home:Home`, route: '/' },
    { label: this.title },
  ];

  private readonly expanded = signal<ReadonlySet<number>>(new Set<number>());

  protected isExpanded(portIndex: number): boolean {
    return this.expanded().has(portIndex);
  }

  // The slice shown for a port: all entries when expanded or short enough, else the first page.
  protected visible(subs: readonly Subsidiary[], portIndex: number): readonly Subsidiary[] {
    return this.isExpanded(portIndex) || subs.length <= this.collapseLimit
      ? subs
      : subs.slice(0, this.collapseLimit);
  }

  protected toggle(portIndex: number): void {
    this.expanded.update((set) => {
      const next = new Set(set);
      if (next.has(portIndex)) {
        next.delete(portIndex);
      } else {
        next.add(portIndex);
      }
      return next;
    });
  }
}

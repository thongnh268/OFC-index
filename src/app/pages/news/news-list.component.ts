import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';

import type { PostListItem } from '../../core/posts';
import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb.component';
import type { BreadcrumbItem } from '../../shared/components/breadcrumb/breadcrumb.component';

// /news index. Every published post, newest first, as a card grid. Convention layout
// (no Figma yet): breadcrumb + heading + cards. Aggregated news shows a source badge.
@Component({
  selector: 'app-news-list',
  standalone: true,
  imports: [DatePipe, RouterLink, BreadcrumbComponent],
  templateUrl: './news-list.component.html',
  styleUrl: './news-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsListComponent {
  // Posts are resolved by the route (app.routes.ts) so the grid is present before the router
  // restores scroll position on back/forward navigation.
  protected readonly posts = toSignal(
    inject(ActivatedRoute).data.pipe(map((d) => (d['posts'] ?? []) as readonly PostListItem[])),
    { initialValue: [] as readonly PostListItem[] },
  );

  protected readonly crumbs: readonly BreadcrumbItem[] = [
    { label: $localize`:@@common.home:Home`, route: '/' },
    { label: $localize`:@@nav.news:News` },
  ];
}

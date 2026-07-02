import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';

import type { PostListItem } from '../../core/posts';
import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb.component';
import type { BreadcrumbItem } from '../../shared/components/breadcrumb/breadcrumb.component';
import { PaginationComponent } from '../../shared/components/pagination/pagination.component';

const NEWS_PAGE_SIZE = 9;

// /news index. Every published post, newest first, as a card grid. Convention layout
// (no Figma yet): breadcrumb + heading + cards. Aggregated news shows a source badge.
@Component({
  selector: 'app-news-list',
  standalone: true,
  imports: [DatePipe, RouterLink, BreadcrumbComponent, PaginationComponent],
  templateUrl: './news-list.component.html',
  styleUrl: './news-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsListComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly queryParamMap = toSignal(this.route.queryParamMap, {
    initialValue: this.route.snapshot.queryParamMap,
  });

  // Posts are resolved by the route (app.routes.ts) so the grid is present before the router
  // restores scroll position on back/forward navigation.
  protected readonly posts = toSignal(
    this.route.data.pipe(map((d) => (d['posts'] ?? []) as readonly PostListItem[])),
    { initialValue: [] as readonly PostListItem[] },
  );

  protected readonly totalPages = computed(() => Math.ceil(this.posts().length / NEWS_PAGE_SIZE));

  private readonly requestedPage = computed(() => {
    const page = Number(this.queryParamMap().get('page'));
    return Number.isInteger(page) && page > 0 ? page : 1;
  });

  protected readonly currentPage = computed(() => {
    const totalPages = this.totalPages();

    if (totalPages <= 1) {
      return 1;
    }

    return Math.min(this.requestedPage(), totalPages);
  });

  protected readonly paginatedPosts = computed(() => {
    const start = (this.currentPage() - 1) * NEWS_PAGE_SIZE;
    return this.posts().slice(start, start + NEWS_PAGE_SIZE);
  });

  protected readonly crumbs: readonly BreadcrumbItem[] = [
    { label: $localize`:@@common.home:Home`, route: '/' },
    { label: $localize`:@@nav.news:News` },
  ];

  protected goToPage(page: number): void {
    void this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: page === 1 ? null : page },
      queryParamsHandling: 'merge',
    });
  }
}

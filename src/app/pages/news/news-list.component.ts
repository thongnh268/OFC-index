import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { distinctUntilChanged, filter, startWith, switchMap } from 'rxjs/operators';

import { PostsService } from '../../core/posts';
import type { PostListPage } from '../../core/posts';
import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb.component';
import type { BreadcrumbItem } from '../../shared/components/breadcrumb/breadcrumb.component';
import { PaginationComponent } from '../../shared/components/pagination/pagination.component';

const MIN_NEWS_ITEMS_PER_PAGE = 8;
const NEWS_ROWS_PER_PAGE = 3;

interface PageRequest {
  readonly page: number;
  readonly pageSize: number;
}

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
export class NewsListComponent implements OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly postsService = inject(PostsService);
  private readonly gridColumnCount = signal<number | null>(null);
  private gridResizeObserver: ResizeObserver | null = null;
  private readonly queryParamMap = toSignal(this.route.queryParamMap, {
    initialValue: this.route.snapshot.queryParamMap,
  });

  @ViewChild('newsGrid')
  private set newsGridRef(ref: ElementRef<HTMLElement> | undefined) {
    this.gridResizeObserver?.disconnect();
    this.gridResizeObserver = null;

    if (!ref) {
      return;
    }

    const grid = ref.nativeElement;
    const updateColumnCount = () => {
      this.gridColumnCount.set(this.getGridColumnCount(grid));
    };

    updateColumnCount();

    if (typeof ResizeObserver === 'undefined') {
      return;
    }

    this.gridResizeObserver = new ResizeObserver(updateColumnCount);
    this.gridResizeObserver.observe(grid);
  }

  private readonly itemsPerPage = computed(() => {
    const columnCount = this.gridColumnCount();

    if (columnCount === null) {
      return null;
    }

    const autoItemsPerPage = columnCount * NEWS_ROWS_PER_PAGE;
    return Math.max(MIN_NEWS_ITEMS_PER_PAGE, autoItemsPerPage);
  });

  private readonly requestedPage = computed(() => {
    const page = Number(this.queryParamMap().get('page'));
    return Number.isInteger(page) && page > 0 ? page : 1;
  });

  private readonly pageRequest = computed<PageRequest | null>(() => {
    const pageSize = this.itemsPerPage();

    if (pageSize === null) {
      return null;
    }

    return { page: this.requestedPage(), pageSize };
  });

  private readonly postPage = toSignal(
    toObservable(this.pageRequest).pipe(
      filter((request): request is PageRequest => request !== null),
      distinctUntilChanged(
        (previous, current) =>
          previous.page === current.page && previous.pageSize === current.pageSize,
      ),
      switchMap((request) => this.postsService.getPage(request.page, request.pageSize)),
      startWith(null as PostListPage | null),
    ),
  );

  protected readonly posts = computed(() => this.postPage()?.items ?? []);

  protected readonly hasLoaded = computed(() => this.postPage() !== null);

  protected readonly totalPages = computed(() => {
    const total = this.postPage()?.total ?? 0;
    const pageSize = this.itemsPerPage();

    return pageSize === null ? 0 : Math.ceil(total / pageSize);
  });

  protected readonly currentPage = computed(() => {
    const totalPages = this.totalPages();

    if (totalPages <= 1) {
      return 1;
    }

    return Math.min(this.requestedPage(), totalPages);
  });

  protected readonly paginatedPosts = computed(() => this.posts());

  protected readonly crumbs: readonly BreadcrumbItem[] = [
    { label: $localize`:@@common.home:Home`, route: '/' },
    { label: $localize`:@@nav.news:News` },
  ];

  private readonly clampPageEffect = effect(() => {
    const requestedPage = this.requestedPage();
    const totalPages = this.totalPages();

    if (totalPages > 0 && requestedPage > totalPages) {
      this.goToPage(totalPages);
    }
  });

  protected goToPage(page: number): void {
    void this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: page === 1 ? null : page },
      queryParamsHandling: 'merge',
    });
  }

  ngOnDestroy(): void {
    this.gridResizeObserver?.disconnect();
  }

  private getGridColumnCount(grid: HTMLElement): number {
    if (typeof getComputedStyle === 'undefined') {
      return Math.ceil(MIN_NEWS_ITEMS_PER_PAGE / NEWS_ROWS_PER_PAGE);
    }

    const template = getComputedStyle(grid).gridTemplateColumns;
    const repeatMatch = /^repeat\((\d+),/.exec(template);

    if (repeatMatch) {
      return Number(repeatMatch[1]);
    }

    const columns = template.split(' ').filter((column) => column && column !== 'none');

    return columns.length || Math.ceil(MIN_NEWS_ITEMS_PER_PAGE / NEWS_ROWS_PER_PAGE);
  }
}

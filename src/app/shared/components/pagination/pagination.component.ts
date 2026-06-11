import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';

import { IconComponent } from '../icon/icon.component';

type PageItem = number | 'gap';

// Presentational: emits the requested page, the consumer owns the state
// (route query param for the blog list).
@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent {
  readonly totalPages = input.required<number>();
  readonly currentPage = input.required<number>();
  readonly pageChanged = output<number>();

  // First, last and current±1 stay visible; runs longer than 1 collapse into a gap.
  protected readonly items = computed<PageItem[]>(() => {
    const total = this.totalPages();
    const current = this.currentPage();
    const visible = new Set(
      [1, total, current - 1, current, current + 1].filter((page) => page >= 1 && page <= total),
    );
    const pages = Array.from(visible).sort((a, b) => a - b);
    const result: PageItem[] = [];

    for (const [index, page] of pages.entries()) {
      if (index > 0 && page - pages[index - 1] > 1) {
        result.push('gap');
      }
      result.push(page);
    }

    return result;
  });

  protected goTo(page: number): void {
    if (page < 1 || page > this.totalPages() || page === this.currentPage()) {
      return;
    }

    this.pageChanged.emit(page);
  }

  protected pageLabel(page: number): string {
    return $localize`:@@pagination.page:Page ${page}:page:`;
  }
}

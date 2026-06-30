import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  computed,
  inject,
  signal,
  viewChild,
} from '@angular/core';

const AUTOPLAY_MS = 4000;

// Paged snap carousel for projected <li> cards. Consumers project the items and size
// them (flex-basis per breakpoint + scroll-snap-align: start); the carousel owns the
// track, dots, paging and autoplay.
//
// Paging is anchored to real elements: how many cards fit a page is MEASURED from the
// first card, and goTo scrolls the TRACK to the target card's measured edge. The target
// equals a snap position exactly, so CSS snap agrees with it - and scrolling the track
// (never scrollIntoView) means the page itself is never yanked toward the carousel.
//
// Autoplay advances every few seconds but only while the carousel is on screen
// (IntersectionObserver), pauses while hovered, stops for good once the user drags
// (they took control), and never starts under prefers-reduced-motion.
@Component({
  selector: 'app-carousel',
  standalone: true,
  template: `
    <ul
      #track
      class="carousel-track"
      (scroll)="schedulePageSync()"
      (mouseenter)="hovered.set(true)"
      (mouseleave)="hovered.set(false)"
      (pointerdown)="stopAutoplay()"
    >
      <ng-content />
    </ul>
    @if (pages() > 1) {
      <div class="carousel-dots">
        @for (dot of dots(); track dot) {
          <button
            type="button"
            class="carousel-dot"
            [class.is-active]="page() === dot"
            [attr.aria-label]="pageLabel + ' ' + (dot + 1)"
            (click)="goTo(dot)"
          ></button>
        }
      </div>
    }
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .carousel-track {
        display: flex;
        gap: var(--carousel-gap, 20px);
        list-style: none;
        margin: 0;
        overflow-x: auto;
        padding: 0;
        scroll-snap-type: x mandatory;
        scrollbar-width: none;
      }

      .carousel-track::-webkit-scrollbar {
        display: none;
      }

      .carousel-dots {
        display: flex;
        gap: 15px;
        justify-content: center;
        margin-top: 27px;
      }

      .carousel-dot {
        background: var(--color-border);
        border: 0;
        border-radius: 50%;
        cursor: pointer;
        height: 12px;
        padding: 0;
        width: 12px;
      }

      .carousel-dot.is-active {
        background: var(--color-accent);
      }
    `,
  ],
  host: { '(window:resize)': 'syncCarousel()' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarouselComponent {
  protected readonly pageLabel = $localize`:@@carousel.page:Page`;

  private readonly track = viewChild.required<ElementRef<HTMLElement>>('track');
  private readonly destroyRef = inject(DestroyRef);

  protected readonly page = signal(0);
  protected readonly pages = signal(1);
  protected readonly dots = computed(() => Array.from({ length: this.pages() }, (_, i) => i));

  protected readonly hovered = signal(false);
  private readonly visible = signal(false);
  private autoplayTimer: ReturnType<typeof setInterval> | null = null;
  private visibilityObserver: IntersectionObserver | null = null;
  private pageSyncFrame: number | null = null;
  private cardsPerPageValue = 1;
  private cardStrideValue = 1;

  constructor() {
    // Scroll metrics, observers + timers only exist in the browser (SSR-safe).
    afterNextRender(() => {
      this.syncCarousel();
      this.observeVisibility();
      this.startAutoplay();
    });
    this.destroyRef.onDestroy(() => {
      this.stopAutoplay();
      this.visibilityObserver?.disconnect();
      if (this.pageSyncFrame !== null) {
        cancelAnimationFrame(this.pageSyncFrame);
      }
    });
  }

  protected syncCarousel(): void {
    this.syncMetrics();
    this.syncPage();
  }

  protected schedulePageSync(): void {
    if (this.pageSyncFrame !== null) {
      return;
    }
    this.pageSyncFrame = requestAnimationFrame(() => {
      this.pageSyncFrame = null;
      this.syncPage();
    });
  }

  private syncMetrics(): void {
    const el = this.track().nativeElement;
    const first = el.firstElementChild as HTMLElement | null;
    if (!el.clientWidth || !first) {
      return;
    }
    const per = this.cardsPerPage(el, first);
    this.cardsPerPageValue = per;
    this.cardStrideValue = this.cardStride(el, first);
    const hasOverflow = el.scrollWidth > el.clientWidth + 1;
    const pages = hasOverflow ? Math.max(1, Math.ceil(el.children.length / per)) : 1;
    if (this.pages() !== pages) {
      this.pages.set(pages);
    }
    if (this.page() > pages - 1) {
      this.page.set(pages - 1);
    }
  }

  private syncPage(): void {
    const el = this.track().nativeElement;
    const pages = this.pages();
    const childCount = el.children.length;
    const maxStartIndex = Math.max(0, childCount - this.cardsPerPageValue);
    const leftmostCard = Math.min(maxStartIndex, Math.round(el.scrollLeft / this.cardStrideValue));
    let nextPage = 0;
    let nearestDistance = Number.POSITIVE_INFINITY;
    for (let i = 0; i < pages; i += 1) {
      const distance = Math.abs(
        leftmostCard - this.pageStartIndex(i, pages, childCount, this.cardsPerPageValue),
      );
      if (distance <= nearestDistance) {
        nearestDistance = distance;
        nextPage = i;
      }
    }
    if (this.page() !== nextPage) {
      this.page.set(nextPage);
    }
  }

  protected goTo(index: number): void {
    const el = this.track().nativeElement;
    const first = el.firstElementChild as HTMLElement | null;
    if (!first) {
      return;
    }
    const per = this.cardsPerPage(el, first);
    const pages = this.pages();
    const targetIndex = this.pageStartIndex(index, pages, el.children.length, per);
    const target = el.children[targetIndex];
    // Scroll the track only - scrollIntoView would also scroll the PAGE whenever the
    // carousel is off-screen. The measured card edge is exactly a snap position.
    const left =
      target.getBoundingClientRect().left - el.getBoundingClientRect().left + el.scrollLeft;
    el.scrollTo({ left, behavior: 'smooth' });
  }

  // The user grabbed the carousel - autoplay would fight them, so it stops for good.
  protected stopAutoplay(): void {
    if (this.autoplayTimer !== null) {
      clearInterval(this.autoplayTimer);
      this.autoplayTimer = null;
    }
  }

  // Autoplay only animates a carousel the user can actually see.
  private observeVisibility(): void {
    this.visibilityObserver = new IntersectionObserver(
      ([entry]) => this.visible.set(entry.isIntersecting),
      { threshold: 0.3 },
    );
    this.visibilityObserver.observe(this.track().nativeElement);
  }

  private startAutoplay(): void {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }
    this.autoplayTimer = setInterval(() => {
      if ((!this.visible() && !this.isTrackInViewport()) || this.hovered() || this.pages() < 2) {
        return;
      }
      this.goTo((this.page() + 1) % this.pages());
    }, AUTOPLAY_MS);
  }

  // How many whole cards fit one viewport - measured, so fractional widths stay exact.
  private cardsPerPage(el: HTMLElement, card: HTMLElement): number {
    return Math.max(1, Math.round((el.clientWidth + this.gap(el)) / this.cardStride(el, card)));
  }

  private cardStride(el: HTMLElement, card: HTMLElement): number {
    return card.getBoundingClientRect().width + this.gap(el);
  }

  private pageStartIndex(index: number, pages: number, childCount: number, per: number): number {
    const boundedPage = Math.min(Math.max(index, 0), Math.max(0, pages - 1));
    const maxStartIndex = Math.max(0, childCount - per);
    return Math.min(boundedPage * per, maxStartIndex);
  }

  private isTrackInViewport(): boolean {
    const rect = this.track().nativeElement.getBoundingClientRect();
    return rect.bottom > 0 && rect.top < window.innerHeight;
  }

  private gap(el: HTMLElement): number {
    return parseFloat(getComputedStyle(el).columnGap) || 0;
  }
}

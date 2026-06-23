import { isPlatformBrowser } from '@angular/common';
import {
  type AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  PLATFORM_ID,
  signal,
} from '@angular/core';

import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-scroll-to-top',
  standalone: true,
  imports: [IconComponent],
  template: `
    <button
      class="scroll-top"
      type="button"
      aria-label="Scroll to top"
      i18n-aria-label="@@scrollTop.label"
      [class.is-visible]="visible()"
      [attr.tabindex]="visible() ? 0 : -1"
      (click)="scrollToTop()"
    >
      <app-icon name="chevronDown" [size]="24" />
    </button>
  `,
  styles: [
    `
      .scroll-top {
        align-items: center;
        background: var(--color-accent);
        border: 0;
        border-radius: var(--radius-pill);
        bottom: 24px;
        box-shadow: var(--shadow-popover);
        color: var(--color-white);
        cursor: pointer;
        display: inline-flex;
        height: 44px;
        justify-content: center;
        opacity: 0;
        pointer-events: none;
        position: fixed;
        right: 24px;
        transform: translateY(10px);
        transition:
          background-color var(--duration-fast) var(--ease-out),
          opacity var(--duration-base) var(--ease-out),
          transform var(--duration-base) var(--ease-out);
        width: 44px;
        z-index: 35;
      }

      .scroll-top app-icon {
        transform: rotate(180deg);
      }

      .scroll-top.is-visible {
        opacity: 1;
        pointer-events: auto;
        transform: translateY(0);
      }

      .scroll-top:hover,
      .scroll-top:focus-visible {
        background: color-mix(in srgb, var(--color-accent) 88%, black);
      }

      @media (max-width: 767.98px) {
        .scroll-top {
          bottom: 16px;
          height: 40px;
          right: 16px;
          width: 40px;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScrollToTopComponent implements AfterViewInit {
  private readonly destroyRef = inject(DestroyRef);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  protected readonly visible = signal(false);

  ngAfterViewInit(): void {
    if (!this.isBrowser) {
      return;
    }

    const update = () => this.visible.set(window.scrollY > 420);
    window.addEventListener('scroll', update, { passive: true });
    update();
    this.destroyRef.onDestroy(() => window.removeEventListener('scroll', update));
  }

  protected scrollToTop(): void {
    if (!this.isBrowser) {
      return;
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

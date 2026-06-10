import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  afterRenderEffect,
  input,
  output,
  viewChild,
} from '@angular/core';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-mobile-drawer',
  standalone: true,
  imports: [IconComponent],
  template: `
    <button
      class="backdrop"
      type="button"
      aria-label="Close navigation"
      i18n-aria-label="@@drawer.close"
      [class.is-open]="open()"
      [attr.aria-hidden]="!open()"
      [attr.tabindex]="open() ? 0 : -1"
      (click)="closed.emit()"
    ></button>

    <aside
      #drawer
      class="drawer"
      role="dialog"
      [attr.aria-modal]="open() ? 'true' : null"
      [attr.aria-hidden]="!open()"
      [attr.aria-labelledby]="titleId() || null"
      [attr.inert]="open() ? null : ''"
      (keydown.tab)="trapFocus($event)"
      (keydown.shift.tab)="trapFocus($event)"
    >
      <header class="drawer-header">
        <p class="drawer-title" [attr.id]="titleId() || null">{{ heading() }}</p>
        <button
          #closeButton
          class="drawer-close"
          type="button"
          aria-label="Close navigation"
          i18n-aria-label="@@drawer.close"
          (click)="closed.emit()"
        >
          <app-icon name="close" />
        </button>
      </header>

      <div class="drawer-body">
        <ng-content />
      </div>
    </aside>
  `,
  styleUrl: './mobile-drawer.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileDrawerComponent {
  readonly open = input<boolean>(false);
  readonly heading = input<string>($localize`:@@drawer.heading:Menu`);
  readonly titleId = input<string>('');
  readonly closed = output<void>();

  private readonly drawer = viewChild.required<ElementRef<HTMLElement>>('drawer');
  private readonly closeButton = viewChild<ElementRef<HTMLButtonElement>>('closeButton');
  private previouslyFocused: HTMLElement | null = null;

  constructor() {
    // After render (browser only), so the drawer is no longer `inert` when focused.
    afterRenderEffect(() => {
      if (this.open()) {
        this.previouslyFocused = document.activeElement as HTMLElement | null;
        this.closeButton()?.nativeElement.focus();
      } else {
        this.previouslyFocused?.focus();
        this.previouslyFocused = null;
      }
    });
  }

  protected trapFocus(event: Event): void {
    const keyboardEvent = event as KeyboardEvent;
    const focusables = this.drawer().nativeElement.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );

    if (focusables.length === 0) {
      return;
    }

    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    if (keyboardEvent.shiftKey && document.activeElement === first) {
      keyboardEvent.preventDefault();
      last.focus();
    } else if (!keyboardEvent.shiftKey && document.activeElement === last) {
      keyboardEvent.preventDefault();
      first.focus();
    }
  }
}

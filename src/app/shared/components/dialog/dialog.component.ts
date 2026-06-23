import { A11yModule } from '@angular/cdk/a11y';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  PLATFORM_ID,
  effect,
  inject,
  input,
  output,
} from '@angular/core';

import { IconComponent } from '../icon/icon.component';

// Centered modal. Same declarative contract as app-mobile-drawer ([open]/(closed));
// focus trapping + restore delegated to CDK cdkTrapFocus.
@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [A11yModule, IconComponent],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogComponent {
  private readonly document = inject(DOCUMENT);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  readonly open = input<boolean>(false);
  readonly heading = input<string>('');
  readonly size = input<'default' | 'lightbox'>('default');
  /** Unique per page when several dialogs coexist - prefixes the title id. */
  readonly dialogId = input<string>('dialog');
  readonly closed = output<void>();

  private readonly scrollLock = effect((onCleanup) => {
    if (!this.isBrowser || !this.open()) {
      return;
    }

    const body = this.document.body;
    const previousOverflow = body.style.overflow;
    const previousPaddingRight = body.style.paddingRight;
    const scrollbarGap = window.innerWidth - this.document.documentElement.clientWidth;

    body.style.overflow = 'hidden';
    if (scrollbarGap > 0) {
      body.style.paddingRight = `${scrollbarGap}px`;
    }

    onCleanup(() => {
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPaddingRight;
    });
  });

  protected closeLightboxFromBody(event: MouseEvent): void {
    if (this.size() !== 'lightbox' || event.target !== event.currentTarget) {
      return;
    }

    this.closed.emit();
  }
}

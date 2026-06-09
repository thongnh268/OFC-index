import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
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
      [class.is-open]="open()"
      [attr.aria-hidden]="!open()"
      [attr.tabindex]="open() ? 0 : -1"
      (click)="closed.emit()"
    ></button>

    <aside
      class="drawer"
      role="dialog"
      [attr.aria-modal]="open()"
      [attr.aria-hidden]="!open()"
      [attr.aria-labelledby]="titleId() || null"
      [attr.inert]="open() ? null : ''"
    >
      <header class="drawer-header">
        @if (titleId(); as id) {
          <p [id]="id" class="drawer-title">{{ heading() }}</p>
        } @else {
          <p class="drawer-title">{{ heading() }}</p>
        }
        <button
          class="drawer-close"
          type="button"
          aria-label="Close navigation"
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
  readonly heading = input<string>('Menu');
  readonly titleId = input<string>('');
  readonly closed = output<void>();
}

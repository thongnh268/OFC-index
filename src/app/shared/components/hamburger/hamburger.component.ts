import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'app-hamburger',
  standalone: true,
  template: `
    <button
      class="hamburger-btn"
      type="button"
      [attr.aria-label]="ariaLabel()"
      [attr.aria-expanded]="active()"
      [attr.aria-controls]="controls()"
      [class.is-active]="active()"
      (click)="toggled.emit()"
    >
      <span></span>
      <span></span>
      <span></span>
    </button>
  `,
  styleUrl: './hamburger.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HamburgerComponent {
  readonly active = input<boolean>(false);
  readonly ariaLabel = input<string>($localize`:@@hamburger.openNav:Open navigation`);
  readonly controls = input<string>('');
  readonly toggled = output<void>();
}

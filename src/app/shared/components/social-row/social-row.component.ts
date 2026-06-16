import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { IconComponent } from '../icon/icon.component';
import type { SocialLink } from '../../../core/data';

@Component({
  selector: 'app-social-row',
  standalone: true,
  imports: [IconComponent],
  template: `
    <div
      class="social-row"
      [class.is-header]="variant() === 'header'"
      [class.is-plain]="variant() === 'plain'"
    >
      @for (link of links(); track link.name) {
        <a
          class="social-button"
          [href]="link.href"
          [attr.aria-label]="link.label"
          rel="noopener noreferrer"
          target="_blank"
        >
          <app-icon [name]="link.name" [size]="iconSize()" />
        </a>
      }
    </div>
  `,
  styleUrl: './social-row.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SocialRowComponent {
  readonly links = input.required<readonly SocialLink[]>();
  // 'header'/'footer' = white pill buttons; 'plain' = bare accent-green icons (e.g. breadcrumb bar).
  readonly variant = input<'header' | 'footer' | 'plain'>('footer');
  readonly iconSize = input<number>(20);
}

import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { IconComponent } from '../icon/icon.component';
import type { IconName } from '../icon/icon.component';

export interface SocialLink {
  readonly name: IconName;
  readonly label: string;
  readonly href: string;
}

@Component({
  selector: 'app-social-row',
  standalone: true,
  imports: [IconComponent],
  template: `
    <div class="social-row" [class.is-header]="variant() === 'header'">
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
  readonly variant = input<'header' | 'footer'>('footer');
  readonly iconSize = input<number>(20);
}

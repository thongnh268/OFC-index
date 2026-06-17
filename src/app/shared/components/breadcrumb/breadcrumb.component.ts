import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface BreadcrumbItem {
  readonly label: string;
  /** Omit on the current (last) page — it renders as plain text. */
  readonly route?: string;
}

// Inner-page breadcrumb (Homepage / Section / …), shared across pages. The last item is
// always the current page: rendered as text, not a link. Per Figma: every item stays regular
// weight (the current page is NOT bold) and the separators use the accent green.
@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [RouterLink],
  template: `
    <nav class="breadcrumb" aria-label="Breadcrumb">
      <ol>
        @for (item of items(); track $index; let last = $last) {
          <li>
            @if (item.route && !last) {
              <a [routerLink]="item.route">{{ item.label }}</a>
            } @else {
              <span aria-current="page">{{ item.label }}</span>
            }
            @if (!last) {
              <span class="breadcrumb__sep" aria-hidden="true">/</span>
            }
          </li>
        }
      </ol>
    </nav>
  `,
  styles: [
    `
      .breadcrumb ol {
        align-items: center;
        color: var(--color-text);
        display: flex;
        flex-wrap: wrap;
        font-size: 0.875rem;
        gap: 8px;
        list-style: none;
        margin: 0;
        padding: 0;
      }

      .breadcrumb li {
        align-items: center;
        display: flex;
        gap: 8px;
      }

      .breadcrumb a {
        color: var(--color-text);
        text-decoration: none;
      }

      .breadcrumb a:hover {
        color: var(--color-accent);
      }

      .breadcrumb [aria-current='page'] {
        color: var(--color-text);
      }

      .breadcrumb__sep {
        color: var(--color-accent);
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbComponent {
  readonly items = input.required<readonly BreadcrumbItem[]>();
}

import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { IconComponent, type IconName } from '../../../../shared/components/icon/icon.component';

export interface OrgItem {
  readonly icon: IconName;
  readonly label: string;
}

export interface OrgDepartment {
  readonly icon: IconName;
  readonly title: string;
  readonly items: readonly OrgItem[];
}

// Organisational chart for the Board page: a CEO box on top connected by a branching tree
// (vertical drop → horizontal bar → drop into each card) to a row of department cards. The
// connectors are pure CSS (half-segment borders) so they stay aligned at any width and are
// hidden when the cards stack on narrow screens.
@Component({
  selector: 'app-board-org-chart',
  standalone: true,
  imports: [IconComponent],
  template: `
    <div class="org">
      <div class="org__top">
        <div class="org__ceo">
          <app-icon name="people" [size]="22" />
          <span>{{ ceoLabel() }}</span>
        </div>
      </div>
      <ul class="org__departments">
        @for (dept of departments(); track dept.title) {
          <li class="org__col">
            <div class="org-card">
              <div class="org-card__head">
                <span class="org-card__icon"><app-icon [name]="dept.icon" [size]="20" /></span>
                <span class="org-card__title">{{ dept.title }}</span>
              </div>
              <ul class="org-card__items">
                @for (item of dept.items; track item.label) {
                  <li class="org-item">
                    <app-icon [name]="item.icon" [size]="18" />
                    <span>{{ item.label }}</span>
                  </li>
                }
              </ul>
            </div>
          </li>
        }
      </ul>
    </div>
  `,
  styles: [
    `
      .org {
        margin: 8px 0 24px;
      }

      .org__top {
        margin-bottom: 28px;
        position: relative;
        text-align: center;
      }

      .org__ceo {
        align-items: center;
        background: var(--color-accent);
        border-radius: 8px;
        color: var(--color-white);
        display: inline-flex;
        font-weight: 700;
        gap: 10px;
        justify-content: center;
        max-width: 440px;
        padding: 14px 24px;
        text-transform: uppercase;
      }

      /* vertical drop from the CEO row down to the horizontal bar — anchored to the
         full-width row centre (same 50% reference as the middle column) so it lines up
         pixel-for-pixel with the middle card's drop */
      .org__top::after {
        background: var(--color-primary);
        bottom: -28px;
        content: '';
        height: 28px;
        left: 50%;
        position: absolute;
        width: 1px;
      }

      .org__departments {
        display: flex;
        list-style: none;
        margin: 0;
        padding: 0;
      }

      /* each column carries half of the horizontal bar plus a drop into its own card */
      .org__col {
        flex: 1;
        padding-top: 28px;
        position: relative;
      }

      .org__col::before,
      .org__col::after {
        content: '';
        height: 28px;
        position: absolute;
        top: 0;
      }

      .org__col::before {
        border-top: 1px solid var(--color-primary);
        right: 50%;
        width: 50%;
      }

      .org__col::after {
        border-left: 1px solid var(--color-primary);
        border-top: 1px solid var(--color-primary);
        left: 50%;
        width: 50%;
      }

      .org__col:first-child::before {
        border-top: 0;
      }

      .org__col:last-child::after {
        border-top: 0;
      }

      .org-card {
        border: 1px solid var(--color-border);
        border-radius: 10px;
        margin: 0 10px;
        overflow: hidden;
      }

      .org-card__head {
        align-items: center;
        display: flex;
        gap: 12px;
        padding: 16px;
      }

      .org-card__icon {
        align-items: center;
        background: var(--color-accent);
        border-radius: 50%;
        color: var(--color-white);
        display: inline-flex;
        flex-shrink: 0;
        height: 40px;
        justify-content: center;
        width: 40px;
      }

      .org-card__title {
        color: var(--color-primary);
        font-size: 0.9rem;
        font-weight: 700;
        text-transform: uppercase;
      }

      .org-card__items {
        list-style: none;
        margin: 0;
        padding: 0;
      }

      .org-item {
        align-items: center;
        border-top: 1px solid var(--color-border);
        color: var(--color-text);
        display: flex;
        font-size: 0.875rem;
        gap: 12px;
        padding: 12px 16px;
      }

      .org-item app-icon {
        color: var(--color-accent);
      }

      @media (max-width: 767.98px) {
        .org__departments {
          flex-direction: column;
        }

        .org__col {
          padding-top: 0;
        }

        .org__col::before,
        .org__col::after {
          display: none;
        }

        .org__top {
          margin-bottom: 16px;
        }

        .org__top::after {
          display: none;
        }

        .org-card {
          margin: 0 0 16px;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrgChartComponent {
  readonly ceoLabel = input.required<string>();
  readonly departments = input.required<readonly OrgDepartment[]>();
}

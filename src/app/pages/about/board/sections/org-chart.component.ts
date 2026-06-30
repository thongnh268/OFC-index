import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { IconComponent, type IconName } from '../../../../shared/components/icon/icon.component';

export interface OrgRole {
  readonly icon: IconName;
  readonly label: string;
  readonly highlight?: boolean;
}

// Organisational chart for the Board page: two stacked leadership boxes (Chairman → Executive
// Board) feeding a vertical column of director roles, with a parallel column of factory/division
// managers branching off via dashed connectors. Connectors are pure CSS (spine + stubs) so they
// stay aligned at any width and collapse when the columns stack on narrow screens.
@Component({
  selector: 'app-board-org-chart',
  standalone: true,
  imports: [IconComponent],
  template: `
    <div class="org">
      <div class="org__leadership">
        <div class="org__box org__box--chairman">
          <span class="org__box-icon"><app-icon name="people" [size]="24" /></span>
          <span>{{ chairman() }}</span>
        </div>
        <div class="org__box org__box--executive">
          <span class="org__box-icon"><app-icon name="people" [size]="24" /></span>
          <span>{{ executive() }}</span>
        </div>
      </div>

      <div class="org__grid">
        <ul class="org__col org__col--directors">
          @for (role of directors(); track role.label) {
            <li class="org-node" [class.org-node--highlight]="role.highlight">
              <span class="org-node__icon"><app-icon [name]="role.icon" [size]="22" /></span>
              <span class="org-node__label">{{ role.label }}</span>
            </li>
          }
        </ul>

        <ul class="org__col org__col--managers">
          @for (role of managers(); track role.label) {
            <li class="org-node org-node--manager">
              <span class="org-node__icon"><app-icon [name]="role.icon" [size]="22" /></span>
              <span class="org-node__label">{{ role.label }}</span>
            </li>
          }
        </ul>
      </div>
    </div>
  `,
  styles: [
    `
      .org {
        margin: 8px 0 24px;
      }

      /* Stacked leadership boxes, connected by a short vertical drop. */
      .org__leadership {
        align-items: center;
        display: flex;
        flex-direction: column;
        margin-bottom: 28px;
      }

      .org__box {
        align-items: center;
        border-radius: 10px;
        color: var(--color-white);
        display: flex;
        font-weight: 700;
        gap: 12px;
        justify-content: center;
        max-width: 520px;
        padding: 16px 28px;
        text-align: center;
        text-transform: uppercase;
        width: 100%;
      }

      .org__box--chairman {
        background: var(--color-primary);
      }

      .org__box--executive {
        background: var(--color-accent);
        margin-top: 28px;
        position: relative;
      }

      /* drop between the two boxes, and from the executive box down into the columns */
      .org__box--executive::before,
      .org__box--executive::after {
        background: var(--color-primary);
        content: '';
        left: 50%;
        position: absolute;
        width: 2px;
      }

      .org__box--executive::before {
        height: 28px;
        top: -28px;
      }

      .org__box--executive::after {
        bottom: -28px;
        height: 28px;
      }

      .org__box-icon {
        align-items: center;
        background: rgb(255 255 255 / 0.18);
        border-radius: 50%;
        display: inline-flex;
        flex-shrink: 0;
        height: 44px;
        justify-content: center;
        width: 44px;
      }

      .org__grid {
        display: grid;
        gap: 28px 48px;
        grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
      }

      .org__col {
        display: flex;
        flex-direction: column;
        gap: 16px;
        list-style: none;
        margin: 0;
        padding: 0;
      }

      /* Left spine joining the executive box down to every director row. */
      .org__col--directors {
        padding-left: 28px;
        position: relative;
      }

      .org__col--directors::before {
        background: var(--color-primary);
        bottom: 28px;
        content: '';
        left: 0;
        position: absolute;
        top: 28px;
        width: 2px;
      }

      .org-node {
        align-items: center;
        background: var(--color-white);
        border: 1px solid var(--color-border);
        border-radius: 12px;
        display: flex;
        gap: 14px;
        padding: 12px 18px;
        position: relative;
      }

      /* horizontal stub from the director spine into each card */
      .org__col--directors .org-node::before {
        background: var(--color-primary);
        content: '';
        height: 2px;
        left: -28px;
        position: absolute;
        top: 50%;
        width: 28px;
      }

      .org-node__icon {
        align-items: center;
        border: 2px solid var(--color-primary);
        border-radius: 50%;
        color: var(--color-primary);
        display: inline-flex;
        flex-shrink: 0;
        height: 48px;
        justify-content: center;
        width: 48px;
      }

      .org-node__label {
        color: var(--color-primary);
        font-size: 0.9rem;
        font-weight: 700;
        text-transform: uppercase;
      }

      .org-node--highlight {
        background: color-mix(in srgb, var(--color-accent) 8%, var(--color-white));
        border-color: var(--color-accent);
      }

      .org-node--highlight .org-node__icon,
      .org-node--highlight .org-node__label {
        border-color: var(--color-accent);
        color: var(--color-accent);
      }

      /* Managers branch off the directors with green dashed connectors. */
      .org__col--managers {
        justify-content: center;
        padding-left: 28px;
        position: relative;
      }

      .org__col--managers::before {
        border-left: 2px dashed var(--color-accent);
        bottom: 32px;
        content: '';
        left: 0;
        position: absolute;
        top: 32px;
      }

      .org__col--managers .org-node {
        border-color: color-mix(in srgb, var(--color-accent) 35%, var(--color-border));
      }

      .org__col--managers .org-node::before {
        border-top: 2px dashed var(--color-accent);
        content: '';
        height: 0;
        left: -28px;
        position: absolute;
        top: 50%;
        width: 28px;
      }

      .org__col--managers .org-node__icon {
        border-color: var(--color-accent);
        color: var(--color-accent);
      }

      .org__col--managers .org-node__label {
        color: var(--color-accent);
      }

      @media (max-width: 767.98px) {
        .org__grid {
          gap: 16px;
          grid-template-columns: minmax(0, 1fr);
        }

        .org__col {
          gap: 12px;
        }

        .org__col--directors,
        .org__col--managers {
          padding-left: 0;
        }

        .org__col--directors::before,
        .org__col--managers::before,
        .org__col--directors .org-node::before,
        .org__col--managers .org-node::before {
          display: none;
        }

        .org__box--executive {
          margin-top: 20px;
        }

        .org__box--executive::before {
          height: 20px;
          top: -20px;
        }

        .org__box--executive::after {
          display: none;
        }

        .org__leadership {
          margin-bottom: 16px;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrgChartComponent {
  readonly chairman = input.required<string>();
  readonly executive = input.required<string>();
  readonly directors = input.required<readonly OrgRole[]>();
  readonly managers = input.required<readonly OrgRole[]>();
}

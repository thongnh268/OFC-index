import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { IconComponent, type IconName } from '../../../../shared/components/icon/icon.component';

export interface WorkflowStep {
  readonly icon: IconName;
  readonly number: string;
  readonly label: string;
}

// Horizontal numbered workflow (Receive inquiry → Quotation → Draft contract → Sign) with
// chevron separators between steps. Steps stack vertically on narrow screens.
@Component({
  selector: 'app-board-workflow',
  standalone: true,
  imports: [IconComponent],
  template: `
    <section class="workflow">
      <h2 class="inner-heading-center">{{ heading() }}</h2>
      <div class="workflow__steps">
        @for (step of steps(); track step.number; let last = $last) {
          <div class="workflow-step">
            <span class="workflow-step__icon"><app-icon [name]="step.icon" [size]="30" /></span>
            <span class="workflow-step__num">{{ step.number }}</span>
            <span class="workflow-step__label">{{ step.label }}</span>
          </div>
          @if (!last) {
            <span class="workflow__arrow" aria-hidden="true">
              <app-icon name="chevronRight" [size]="20" />
            </span>
          }
        }
      </div>
    </section>
  `,
  styles: [
    `
      .workflow__steps {
        align-items: flex-start;
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        justify-content: center;
      }

      .workflow-step {
        align-items: center;
        display: flex;
        flex: 1 1 130px;
        flex-direction: column;
        gap: 8px;
        max-width: 170px;
        text-align: center;
      }

      .workflow-step__icon {
        align-items: center;
        border: 2px solid var(--color-accent);
        border-radius: 50%;
        color: var(--color-accent);
        display: inline-flex;
        height: 72px;
        justify-content: center;
        width: 72px;
      }

      .workflow-step__num {
        color: var(--color-accent);
        font-size: 1.25rem;
        font-weight: 700;
      }

      .workflow-step__label {
        color: var(--color-primary);
        font-size: 0.8125rem;
        line-height: 1.4;
      }

      .workflow__arrow {
        align-self: center;
        color: var(--color-text-muted);
        flex: 0 0 auto;
        margin-top: 24px;
      }

      @media (max-width: 639.98px) {
        .workflow__steps {
          align-items: center;
          flex-direction: column;
        }

        .workflow-step {
          max-width: none;
        }

        .workflow__arrow {
          margin-top: 0;
          transform: rotate(90deg);
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkflowComponent {
  readonly heading = input.required<string>();
  readonly steps = input.required<readonly WorkflowStep[]>();
}

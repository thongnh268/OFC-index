import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { TextSegmentsComponent } from '../text-segments/text-segments.component';
import type { TextSegment } from '../text-segments/text-segments.component';

// Standard section opener (Figma 2:281/2:283/…): green uppercase eyebrow, navy
// heading, optional justified intro with per-segment emphasis. Sizes mirror Figma —
// 20px eyebrow, 24px heading, 14px/21px ink body.
@Component({
  selector: 'app-section-head',
  standalone: true,
  imports: [TextSegmentsComponent],
  template: `
    <p class="section-eyebrow">{{ eyebrow() }}</p>
    <h2 class="section-heading">{{ heading() }}</h2>
    @if (body().length) {
      <p class="section-body">
        <app-text-segments [segments]="body()" />
      </p>
    }
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .section-eyebrow {
        color: var(--color-accent);
        font-size: 1.25rem;
        font-weight: 700;
        line-height: 1.5;
        margin: 0;
        text-transform: uppercase;
      }

      .section-heading {
        color: var(--color-primary);
        font-size: 1.5rem;
        font-weight: 700;
        line-height: 1.25;
        margin: 6px 0 0;
      }

      .section-body {
        color: var(--color-text);
        font-size: 0.875rem;
        line-height: 1.5;
        margin: 20px 0 0;
        text-align: justify;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionHeadComponent {
  readonly eyebrow = input.required<string>();
  readonly heading = input.required<string>();
  readonly body = input<readonly TextSegment[]>([]);
}

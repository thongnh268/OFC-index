import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import { parseEmphasis, TextSegmentsComponent } from '../text-segments/text-segments.component';

// A content block for inner pages: an optional green sub-heading, prose paragraphs and an
// optional bullet list. Paragraph/list strings may carry <b>…</b> / <accent>…</accent> tags.
export interface InnerContentBlock {
  readonly id?: string;
  readonly heading?: string;
  readonly paragraphs?: readonly string[];
  readonly list?: readonly string[];
}

// Shared prose renderer for inner content pages (Board, Quality, Milestones, …). Emits plain
// semantic h2/p/ul that pick up the global `.inner-page__main` typography; inline emphasis is
// delegated to the shared app-text-segments. Reused so every inner page reads consistently.
@Component({
  selector: 'app-inner-content',
  standalone: true,
  imports: [TextSegmentsComponent],
  template: `
    @for (block of parsed(); track $index) {
      @if (block.heading) {
        <h2 [id]="block.id">{{ block.heading }}</h2>
      }
      @for (paragraph of block.paragraphs; track $index) {
        <p><app-text-segments [segments]="paragraph" /></p>
      }
      @if (block.list.length) {
        <ul>
          @for (item of block.list; track $index) {
            <li><app-text-segments [segments]="item" /></li>
          }
        </ul>
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InnerContentComponent {
  readonly blocks = input.required<readonly InnerContentBlock[]>();

  protected readonly parsed = computed(() =>
    this.blocks().map((block) => ({
      heading: block.heading,
      id: block.id,
      paragraphs: (block.paragraphs ?? []).map(parseEmphasis),
      list: (block.list ?? []).map(parseEmphasis),
    })),
  );
}

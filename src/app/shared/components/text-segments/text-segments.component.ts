import { ChangeDetectionStrategy, Component, input } from '@angular/core';

// Inline emphasis for editorial copy — a sentence is a list of segments, each picking
// one tone. Authors write ONE string with <b>…</b> (bold) and <accent>…</accent>
// (green) tags; parseEmphasis turns it into segments. Only these two tags are
// recognised — anything else stays literal text, so no raw HTML ever reaches the DOM.
export type TextTone = 'plain' | 'strong' | 'accent';

export interface TextSegment {
  readonly text: string;
  readonly tone: TextTone;
}

const EMPHASIS_PATTERN = /<(b|accent)>(.*?)<\/\1>/gis;

export function parseEmphasis(text: string): TextSegment[] {
  const segments: TextSegment[] = [];
  let cursor = 0;

  for (const match of text.matchAll(EMPHASIS_PATTERN)) {
    const index = match.index ?? 0;
    if (index > cursor) {
      segments.push({ tone: 'plain', text: text.slice(cursor, index) });
    }
    segments.push({
      tone: match[1].toLowerCase() === 'b' ? 'strong' : 'accent',
      text: match[2],
    });
    cursor = index + match[0].length;
  }

  if (cursor < text.length) {
    segments.push({ tone: 'plain', text: text.slice(cursor) });
  }

  return segments;
}

// Renders segments as inline spans; each segment carries its exact spacing and
// punctuation. display:contents keeps the spans in the parent paragraph's inline
// flow, so text-align: justify on the parent still works.
@Component({
  selector: 'app-text-segments',
  standalone: true,
  template: `@for (segment of segments(); track $index) {
    <span [class]="'tone-' + segment.tone">{{ segment.text }}</span>
  }`,
  styles: [
    `
      :host {
        display: contents;
      }

      .tone-strong {
        font-weight: 700;
      }

      .tone-accent {
        color: var(--color-accent);
        font-weight: 700;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextSegmentsComponent {
  readonly segments = input.required<readonly TextSegment[]>();
}

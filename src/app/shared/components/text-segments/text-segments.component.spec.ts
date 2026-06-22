import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { TextSegmentsComponent, parseEmphasis } from './text-segments.component';
import type { TextSegment } from './text-segments.component';

describe('parseEmphasis', () => {
  it('returns one plain segment for text without tags', () => {
    expect(parseEmphasis('Just plain text.')).toEqual([
      { tone: 'plain', text: 'Just plain text.' },
    ]);
  });

  it('parses <b> as strong and <accent> as accent, preserving exact spacing', () => {
    expect(parseEmphasis('Ship to <accent>Japan</accent> and <b>China</b>, fast.')).toEqual([
      { tone: 'plain', text: 'Ship to ' },
      { tone: 'accent', text: 'Japan' },
      { tone: 'plain', text: ' and ' },
      { tone: 'strong', text: 'China' },
      { tone: 'plain', text: ', fast.' },
    ]);
  });

  it('starts and ends with emphasis without losing surrounding text', () => {
    expect(parseEmphasis('<b>OFC</b> ships <accent>chips</accent>')).toEqual([
      { tone: 'strong', text: 'OFC' },
      { tone: 'plain', text: ' ships ' },
      { tone: 'accent', text: 'chips' },
    ]);
  });

  it('treats unknown or unmatched tags as literal text', () => {
    expect(parseEmphasis('Keep <i>this</i> and <b>unclosed')).toEqual([
      { tone: 'plain', text: 'Keep <i>this</i> and <b>unclosed' },
    ]);
  });

  it('is case-insensitive about tag names', () => {
    expect(parseEmphasis('<B>Bold</B>')).toEqual([{ tone: 'strong', text: 'Bold' }]);
  });

  it('returns an empty list for an empty string', () => {
    expect(parseEmphasis('')).toEqual([]);
  });
});

@Component({
  standalone: true,
  imports: [TextSegmentsComponent],
  template: `<p class="host-p"><app-text-segments [segments]="segments()" /></p>`,
})
class HostComponent {
  readonly segments = signal<readonly TextSegment[]>(
    parseEmphasis('A <b>B</b> <accent>C</accent>'),
  );
}

describe('TextSegmentsComponent', () => {
  it('renders segments inline with exact spacing and tone classes', () => {
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    const host = fixture.nativeElement as HTMLElement;

    expect(host.querySelector('.host-p')?.textContent).toBe('A B C');
    expect(host.querySelector('.tone-strong')?.textContent).toBe('B');
    expect(host.querySelector('.tone-accent')?.textContent).toBe('C');
  });
});

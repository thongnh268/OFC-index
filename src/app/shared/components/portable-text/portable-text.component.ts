import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

import type {
  PortableTextBlock,
  PortableTextImage,
  PortableTextLink,
  PortableTextNode,
  PortableTextSpan,
} from '../../../core/sanity';

// Consecutive list-item blocks of the same kind collapse into one <ul>/<ol>; everything
// else is its own group. Nested list levels render flat - fine for blog bodies.
type RenderGroup =
  | { readonly kind: 'block'; readonly node: PortableTextBlock }
  | { readonly kind: 'list'; readonly ordered: boolean; readonly items: PortableTextBlock[] }
  | { readonly kind: 'image'; readonly node: PortableTextImage };

// Renders Sanity Portable Text (the curated blog subset) to semantic HTML. Hand-rolled -
// no innerHTML - so every element is Angular-controlled and styled via the scoped prose CSS.
@Component({
  selector: 'app-portable-text',
  standalone: true,
  imports: [NgTemplateOutlet],
  templateUrl: './portable-text.component.html',
  styleUrl: './portable-text.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortableTextComponent {
  readonly value = input<readonly PortableTextNode[]>([]);

  protected readonly groups = computed<RenderGroup[]>(() => {
    const out: RenderGroup[] = [];
    for (const node of this.value()) {
      if (node._type === 'image') {
        out.push({ kind: 'image', node });
        continue;
      }
      if (node.listItem === 'bullet' || node.listItem === 'number') {
        const ordered = node.listItem === 'number';
        const last = out[out.length - 1];
        if (last?.kind === 'list' && last.ordered === ordered) {
          last.items.push(node);
        } else {
          out.push({ kind: 'list', ordered, items: [node] });
        }
        continue;
      }
      out.push({ kind: 'block', node });
    }
    return out;
  });

  protected isStrong(span: PortableTextSpan): boolean {
    return span.marks?.includes('strong') ?? false;
  }

  protected isEm(span: PortableTextSpan): boolean {
    return span.marks?.includes('em') ?? false;
  }

  // A span links if one of its marks references a link annotation in the block's markDefs.
  protected linkHref(
    span: PortableTextSpan,
    markDefs?: readonly PortableTextLink[],
  ): string | null {
    const marks = span.marks ?? [];
    return markDefs?.find((def) => def._type === 'link' && marks.includes(def._key))?.href ?? null;
  }

  protected isExternal(href: string): boolean {
    return /^https?:\/\//i.test(href);
  }
}

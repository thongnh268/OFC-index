import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  contentChildren,
  input,
  signal,
  viewChildren,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

import { TabComponent } from './tab.component';

@Component({
  selector: 'app-tab-group',
  standalone: true,
  imports: [NgTemplateOutlet],
  templateUrl: './tab-group.component.html',
  styleUrl: './tab-group.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabGroupComponent {
  /** Unique per page when several groups coexist - prefixes the tab/panel ids. */
  readonly groupId = input<string>('tabs');

  protected readonly tabs = contentChildren(TabComponent);
  protected readonly activeIndex = signal(0);
  protected readonly activeTab = computed(() => this.tabs()[this.activeIndex()] ?? null);

  private readonly triggers = viewChildren<ElementRef<HTMLButtonElement>>('trigger');

  protected select(index: number): void {
    this.activeIndex.set(index);
  }

  // APG tabs pattern: roving tabindex, arrows move + activate, Home/End jump.
  protected onKeydown(event: KeyboardEvent): void {
    const count = this.tabs().length;

    if (count === 0) {
      return;
    }

    const nextIndexByKey: Record<string, () => number> = {
      ArrowRight: () => (this.activeIndex() + 1) % count,
      ArrowLeft: () => (this.activeIndex() - 1 + count) % count,
      Home: () => 0,
      End: () => count - 1,
    };
    const nextIndex = nextIndexByKey[event.key];

    if (!nextIndex) {
      return;
    }

    event.preventDefault();
    const index = nextIndex();
    this.select(index);
    this.triggers()[index]?.nativeElement.focus();
  }
}

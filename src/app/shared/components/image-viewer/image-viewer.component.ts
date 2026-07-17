import { ChangeDetectionStrategy, Component, computed, input, model } from '@angular/core';

import { DialogComponent } from '../dialog/dialog.component';
import { IconComponent } from '../icon/icon.component';

export interface ImageViewerItem {
  readonly src?: string | null;
  readonly alt: string;
  readonly linkUrl?: string | null;
  readonly linkLabel?: string;
}

@Component({
  selector: 'app-image-viewer',
  standalone: true,
  imports: [DialogComponent, IconComponent],
  templateUrl: './image-viewer.component.html',
  styleUrl: './image-viewer.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageViewerComponent {
  private readonly wheelThreshold = 60;
  private wheelDelta = 0;

  readonly items = input.required<readonly ImageViewerItem[]>();
  readonly dialogId = input<string>('image-viewer');
  readonly selectedIndex = model<number | null>(null);

  protected readonly selected = computed(() => {
    const index = this.selectedIndex();
    return index === null ? null : (this.items()[index] ?? null);
  });

  protected readonly selectedPosition = computed(() => {
    const index = this.selectedIndex();
    return index === null ? 0 : index + 1;
  });

  protected close(): void {
    this.wheelDelta = 0;
    this.selectedIndex.set(null);
  }

  protected previous(): void {
    this.move(-1);
  }

  protected next(): void {
    this.move(1);
  }

  protected navigateByWheel(event: WheelEvent): void {
    if (event.ctrlKey) {
      return;
    }

    event.preventDefault();
    this.wheelDelta += event.deltaY;

    if (Math.abs(this.wheelDelta) < this.wheelThreshold) {
      return;
    }

    if (this.wheelDelta > 0) {
      this.next();
    } else {
      this.previous();
    }

    this.wheelDelta = 0;
  }

  private move(direction: 1 | -1): void {
    const count = this.items().length;
    const index = this.selectedIndex();

    if (count === 0 || index === null) {
      return;
    }

    this.selectedIndex.set((index + direction + count) % count);
  }
}

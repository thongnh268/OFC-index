import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';

import { DialogComponent } from '../dialog/dialog.component';
import { IconComponent } from '../icon/icon.component';

// One certificate in the grid. thumbnailUrl/pdfUrl are optional: when absent the card shows
// a placeholder (award icon + title) so the grid renders before real assets are supplied.
export interface CertificateItem {
  readonly title: string;
  readonly thumbnailUrl?: string | null;
  readonly pdfUrl?: string | null;
}

// Shared certificate grid (Figma: 3-column grid of A4-ish PDF previews). Cards open an in-page
// preview; a PDF URL, when supplied, is exposed inside the preview.
@Component({
  selector: 'app-certificate-grid',
  standalone: true,
  imports: [DialogComponent, IconComponent],
  templateUrl: './certificate-grid.component.html',
  styleUrl: './certificate-grid.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CertificateGridComponent {
  private readonly wheelThreshold = 60;
  private wheelDelta = 0;

  readonly items = input.required<readonly CertificateItem[]>();

  protected readonly selectedIndex = signal<number | null>(null);

  protected readonly selected = computed(() => {
    const index = this.selectedIndex();
    return index === null ? null : (this.items()[index] ?? null);
  });

  protected readonly selectedPosition = computed(() => {
    const index = this.selectedIndex();
    return index === null ? 0 : index + 1;
  });

  protected open(index: number): void {
    this.wheelDelta = 0;
    this.selectedIndex.set(index);
  }

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

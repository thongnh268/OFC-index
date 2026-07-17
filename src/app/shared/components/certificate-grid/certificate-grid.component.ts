import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';

import { IconComponent } from '../icon/icon.component';
import { ImageViewerComponent, type ImageViewerItem } from '../image-viewer/image-viewer.component';

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
  imports: [IconComponent, ImageViewerComponent],
  templateUrl: './certificate-grid.component.html',
  styleUrl: './certificate-grid.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CertificateGridComponent {
  readonly items = input.required<readonly CertificateItem[]>();

  protected readonly selectedIndex = signal<number | null>(null);
  protected readonly viewerItems = computed<readonly ImageViewerItem[]>(() =>
    this.items().map((item) => ({
      src: item.thumbnailUrl,
      alt: item.title,
      linkUrl: item.pdfUrl,
      linkLabel: $localize`:@@certGrid.openPdf:Open PDF`,
    })),
  );

  protected open(index: number): void {
    this.selectedIndex.set(index);
  }
}

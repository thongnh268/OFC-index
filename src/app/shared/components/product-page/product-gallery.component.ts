import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

import { CarouselComponent } from '../carousel/carousel.component';
import { ImageViewerComponent } from '../image-viewer/image-viewer.component';
import type { ProductGalleryImage } from './product-content.model';

@Component({
  selector: 'app-product-gallery',
  standalone: true,
  imports: [CarouselComponent, ImageViewerComponent],
  templateUrl: './product-gallery.component.html',
  styleUrl: './product-gallery.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductGalleryComponent {
  readonly images = input.required<readonly ProductGalleryImage[]>();

  protected readonly selectedIndex = signal<number | null>(null);

  protected open(index: number): void {
    this.selectedIndex.set(index);
  }
}

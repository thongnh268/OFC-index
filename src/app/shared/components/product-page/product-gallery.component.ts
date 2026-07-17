import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { CarouselComponent } from '../carousel/carousel.component';
import type { ProductGalleryImage } from './product-content.model';

@Component({
  selector: 'app-product-gallery',
  standalone: true,
  imports: [CarouselComponent],
  templateUrl: './product-gallery.component.html',
  styleUrl: './product-gallery.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductGalleryComponent {
  readonly images = input.required<readonly ProductGalleryImage[]>();
}

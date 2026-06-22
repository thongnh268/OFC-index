import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { IconComponent } from '../icon/icon.component';
import type { ProductContent } from './product-content.model';

// Product hero/banner shell: title, intro, trust badges and clipped media. Kept separate from
// ProductPageComponent so the large visual treatment owns its own encapsulated style budget.
@Component({
  selector: 'app-product-banner',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './product-banner.component.html',
  styleUrl: './product-banner.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductBannerComponent {
  readonly content = input.required<ProductContent>();
}

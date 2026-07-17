import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import type { ProductSpec } from './product-content.model';

@Component({
  selector: 'app-product-specs',
  standalone: true,
  templateUrl: './product-specs.component.html',
  styleUrl: './product-specs.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductSpecsComponent {
  readonly heading = input.required<string>();
  readonly specs = input.required<readonly ProductSpec[]>();
  readonly sectionId = input<string | null>(null);
}

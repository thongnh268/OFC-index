import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import type { ProductLine } from './product-content.model';

@Component({
  selector: 'app-product-lines',
  standalone: true,
  templateUrl: './product-lines.component.html',
  styleUrl: './product-lines.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductLinesComponent {
  readonly lines = input.required<readonly ProductLine[]>();
}

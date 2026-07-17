import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { tablerRosetteDiscountCheckFill } from '@ng-icons/tabler-icons/fill';

import type { ProductProcess } from './product-content.model';

@Component({
  selector: 'app-product-process',
  standalone: true,
  imports: [NgIcon],
  templateUrl: './product-process.component.html',
  styleUrl: './product-process.component.css',
  viewProviders: [provideIcons({ tablerRosetteDiscountCheckFill })],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductProcessComponent {
  readonly process = input.required<ProductProcess>();
}

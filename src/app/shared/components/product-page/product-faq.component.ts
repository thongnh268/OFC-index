import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { AccordionComponent, AccordionItemComponent } from '../accordion/accordion.component';
import type { ProductFaq } from './product-content.model';

@Component({
  selector: 'app-product-faq',
  standalone: true,
  imports: [AccordionComponent, AccordionItemComponent],
  templateUrl: './product-faq.component.html',
  styleUrl: './product-faq.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductFaqComponent {
  readonly items = input.required<readonly ProductFaq[]>();
}

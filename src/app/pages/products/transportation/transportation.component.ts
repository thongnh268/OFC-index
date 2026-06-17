import { ChangeDetectionStrategy, Component, inject, LOCALE_ID } from '@angular/core';

import { ProductPageComponent } from '../../../shared/components/product-page/product-page.component';
import { transportationContent } from './transportation-content.data';

@Component({
  selector: 'app-transportation-page',
  standalone: true,
  imports: [ProductPageComponent],
  template: `<app-product-page [content]="content" />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransportationComponent {
  protected readonly content = transportationContent(inject(LOCALE_ID));
}

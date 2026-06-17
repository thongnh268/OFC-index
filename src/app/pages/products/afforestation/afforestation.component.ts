import { ChangeDetectionStrategy, Component, inject, LOCALE_ID } from '@angular/core';

import { ProductPageComponent } from '../../../shared/components/product-page/product-page.component';
import { afforestationContent } from './afforestation-content.data';

@Component({
  selector: 'app-afforestation-page',
  standalone: true,
  imports: [ProductPageComponent],
  template: `<app-product-page [content]="content" />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AfforestationComponent {
  protected readonly content = afforestationContent(inject(LOCALE_ID));
}

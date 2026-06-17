import { ChangeDetectionStrategy, Component, inject, LOCALE_ID } from '@angular/core';

import { ProductPageComponent } from '../../../shared/components/product-page/product-page.component';
import { woodChipsContent } from './wood-chips-content.data';

@Component({
  selector: 'app-wood-chips-page',
  standalone: true,
  imports: [ProductPageComponent],
  template: `<app-product-page [content]="content" />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WoodChipsComponent {
  protected readonly content = woodChipsContent(inject(LOCALE_ID));
}

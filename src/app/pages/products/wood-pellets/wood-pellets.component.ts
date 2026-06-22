import { ChangeDetectionStrategy, Component, inject, LOCALE_ID } from '@angular/core';

import { ProductPageComponent } from '../../../shared/components/product-page/product-page.component';
import { woodPelletsContent } from './wood-pellets-content.data';

@Component({
  selector: 'app-wood-pellets-page',
  standalone: true,
  imports: [ProductPageComponent],
  template: `<app-product-page [content]="content" />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WoodPelletsComponent {
  protected readonly content = woodPelletsContent(inject(LOCALE_ID));
}

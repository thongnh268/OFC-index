import { ChangeDetectionStrategy, Component, inject, LOCALE_ID } from '@angular/core';

import { ProductPageComponent } from '../../../shared/components/product-page/product-page.component';
import { timberContent } from './timber-content.data';

@Component({
  selector: 'app-timber-page',
  standalone: true,
  imports: [ProductPageComponent],
  template: `<app-product-page [content]="content" />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimberComponent {
  protected readonly content = timberContent(inject(LOCALE_ID));
}

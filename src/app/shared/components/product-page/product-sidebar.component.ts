import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ButtonDirective } from '../../directives/button.directive';
import { IconComponent } from '../icon/icon.component';
import type { AnchorNavItem, ProductChrome } from './product-content.model';

// Right-hand product navigation and quote card. Owns click prevention for hash links so
// ProductPageComponent only handles the scroll target id.
@Component({
  selector: 'app-product-sidebar',
  standalone: true,
  imports: [RouterLink, ButtonDirective, IconComponent],
  templateUrl: './product-sidebar.component.html',
  styleUrl: './product-sidebar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductSidebarComponent {
  readonly chrome = input.required<ProductChrome>();
  readonly items = input.required<readonly AnchorNavItem[]>();
  readonly productName = input.required<string>();
  readonly activeId = input.required<string>();
  readonly sectionSelected = output<string>();

  protected selectSection(event: Event, id: string): void {
    event.preventDefault();
    this.sectionSelected.emit(id);
  }
}

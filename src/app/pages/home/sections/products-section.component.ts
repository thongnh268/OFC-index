import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { IconComponent } from '../../../shared/components/icon/icon.component';
import { SectionHeadComponent } from '../../../shared/components/section-head/section-head.component';
import type { ProductsContent } from '../home-content.model';

// "Products & Services" section (Figma node 2:283): shared section head over a row of
// five product cards (photo, title, description, Learn more). Content comes from the
// HomeContent boundary; card routes are validated against the fixed product pages.
@Component({
  selector: 'app-products-section',
  standalone: true,
  imports: [RouterLink, IconComponent, SectionHeadComponent],
  templateUrl: './products-section.component.html',
  styleUrl: './products-section.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsSectionComponent {
  readonly content = input.required<ProductsContent>();
}

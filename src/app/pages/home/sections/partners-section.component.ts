import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { CarouselComponent } from '../../../shared/components/carousel/carousel.component';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { SectionHeadComponent } from '../../../shared/components/section-head/section-head.component';
import type { PartnersContent } from '../home-content.model';

// "Partners & Certificates" + key figures (Figma node 5:272): partner logo carousel,
// the certificates card and the three-figure band. Content is code-owned; the
// "view all" route is fixed (subsidiaries page).
@Component({
  selector: 'app-partners-section',
  standalone: true,
  imports: [RouterLink, CarouselComponent, IconComponent, SectionHeadComponent],
  templateUrl: './partners-section.component.html',
  styleUrl: './partners-section.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PartnersSectionComponent {
  readonly content = input.required<PartnersContent>();
}

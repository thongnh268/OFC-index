import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { IconComponent } from '../../../shared/components/icon/icon.component';
import { ButtonDirective } from '../../../shared/directives/button.directive';
import type { HeroContent } from '../home-content.model';

// Presentational banner: clean background photo + HTML headline/CTA/figures over it.
// Content (heading, subheading, image, stats) comes from the HomeContent boundary;
// the CTA label is a UI string and its target route are code-owned.
// TODO(figma-freeze): tighten spacing/typography to node 1:1434 once design is frozen.
@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [RouterLink, IconComponent, ButtonDirective],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroSectionComponent {
  readonly content = input.required<HeroContent>();
}

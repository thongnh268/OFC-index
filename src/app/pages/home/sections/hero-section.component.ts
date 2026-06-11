import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import type { HeroContent } from '../home-content.model';

// Pure presentational banner — content comes from the HomeContent boundary.
// TODO(figma-freeze): tighten spacing/typography to node 1:1434 once design is frozen.
@Component({
  selector: 'app-hero-section',
  standalone: true,
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroSectionComponent {
  readonly content = input.required<HeroContent>();
}

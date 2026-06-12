import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { IconComponent } from '../../../shared/components/icon/icon.component';
import { ButtonDirective } from '../../../shared/directives/button.directive';
import type { CtaContent } from '../home-content.model';

// Closing call-to-action bar (Figma node 74:167): a navy panel with a heading + body
// on the left and a green "Get in touch" button to /contacts on the right.
@Component({
  selector: 'app-cta-section',
  standalone: true,
  imports: [RouterLink, IconComponent, ButtonDirective],
  templateUrl: './cta-section.component.html',
  styleUrl: './cta-section.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CtaSectionComponent {
  readonly content = input.required<CtaContent>();
}

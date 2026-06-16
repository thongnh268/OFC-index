import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ButtonDirective } from '../../directives/button.directive';
import { IconComponent } from '../icon/icon.component';

// Shared "Get a Quote" CTA band (Figma node 74:167): a navy panel with heading + body on
// the left and a green button to /contacts on the right. Copy is code-owned and identical
// on every page; rendered by the Home page and inner pages alike.
@Component({
  selector: 'app-quote-cta',
  standalone: true,
  imports: [RouterLink, IconComponent, ButtonDirective],
  template: `
    <section class="cta">
      <div class="container-content">
        <div class="cta-panel">
          <div class="cta-text">
            <h2 class="cta-heading" i18n="@@quoteCta.heading">
              Looking for a reliable wood supply partner?
            </h2>
            <p class="cta-body" i18n="@@quoteCta.body">
              Get in touch with OFC for competitive pricing, certified quality and on-time delivery.
            </p>
          </div>

          <a appButton variant="accent" class="cta-button" routerLink="/contacts">
            <span i18n="@@home.getInTouch">Get in touch</span>
            <app-icon name="chevronRight" [size]="18" />
          </a>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .cta {
        padding-block: clamp(2rem, 4vw, 3rem);
      }

      .cta-panel {
        align-items: center;
        background: var(--color-primary);
        border-radius: 10px;
        display: flex;
        flex-wrap: wrap;
        gap: 20px 32px;
        justify-content: space-between;
        padding: 20px 24px;
      }

      .cta-heading {
        color: var(--color-white);
        font-size: 1.5rem;
        font-weight: 700;
        line-height: 1.3;
        margin: 0;
      }

      .cta-body {
        color: var(--color-white);
        font-size: 0.875rem;
        line-height: 1.5;
        margin: 8px 0 0;
      }

      .cta-button {
        flex-shrink: 0;
        text-transform: uppercase;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuoteCtaComponent {}

import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ButtonDirective } from '../../directives/button.directive';
import { IconComponent, type IconName } from '../icon/icon.component';

// Optional per-page copy/target for the CTA band; unset fields fall back to the default
// Get-a-Quote text and the /contacts link.
export interface QuoteCtaConfig {
  readonly heading?: string;
  readonly body?: string;
  readonly buttonLabel?: string;
  readonly buttonRoute?: string;
  readonly buttonFragment?: string;
  readonly buttonIcon?: IconName;
  readonly variant?: 'compact' | 'default';
}

// Shared "Get a Quote" CTA band (Figma node 74:167): a navy panel with heading + body on
// the left and a green button to /contacts on the right. Copy defaults to code-owned text
// identical on every page; a page may override it via `config` (e.g. the Recruitment "Apply
// now" band). Rendered by the Home page and inner pages alike.
@Component({
  selector: 'app-quote-cta',
  standalone: true,
  imports: [RouterLink, IconComponent, ButtonDirective],
  template: `
    <section class="cta">
      <div class="container-content">
        <div class="cta-panel" [class.cta-panel--compact]="config()?.variant === 'compact'">
          <div class="cta-text">
            @if (config(); as cfg) {
              <h2 class="cta-heading">{{ cfg.heading }}</h2>
              @if (cfg.body) {
                <p class="cta-body">{{ cfg.body }}</p>
              }
            } @else {
              <h2 class="cta-heading" i18n="@@quoteCta.heading">
                Looking for a reliable wood supply partner?
              </h2>
              <p class="cta-body" i18n="@@quoteCta.body">
                Get in touch with OFC for competitive pricing, certified quality and on-time
                delivery.
              </p>
            }
          </div>

          <a
            appButton
            variant="accent"
            class="cta-button"
            [routerLink]="config()?.buttonRoute ?? '/contacts'"
            [fragment]="config()?.buttonFragment ?? undefined"
          >
            @if (config(); as cfg) {
              <span>{{ cfg.buttonLabel }}</span>
            } @else {
              <span i18n="@@home.getInTouch">Get in touch</span>
            }
            <app-icon [name]="config()?.buttonIcon ?? 'chevronRight'" [size]="18" />
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

      .cta-panel--compact {
        border-radius: 6px;
        gap: 16px 24px;
        padding: 16px 24px;
      }

      .cta-panel--compact .cta-text {
        flex: 1 1 320px;
      }

      .cta-heading {
        color: var(--color-white);
        font-size: 1.5rem;
        font-weight: 700;
        line-height: 1.3;
        margin: 0;
      }

      .cta-panel--compact .cta-heading {
        font-size: 0.875rem;
        font-weight: 500;
        line-height: 1.5;
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
export class QuoteCtaComponent {
  // Null/undefined fields fall back to the default Get-a-Quote copy and /contacts link.
  readonly config = input<QuoteCtaConfig | null>(null);
}
